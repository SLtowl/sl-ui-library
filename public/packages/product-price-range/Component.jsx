import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-pricerange sd sd-plate\" style=\"--a:.1;--b:.4\"><div class=\"sd-head\"><span>Price</span><span class=\"sd-num\">$20 to $80</span></div><span class=\"sd-rail sd-both\"><span class=\"sd-line\"><b></b></span><span class=\"sd-run\" style=\"--p:var(--a)\"><span class=\"sd-thumb\" role=\"slider\" tabindex=\"0\" aria-label=\"Lowest price\"></span></span><span class=\"sd-run\" style=\"--p:var(--b)\"><span class=\"sd-thumb\" role=\"slider\" tabindex=\"0\" aria-label=\"Highest price\"></span></span></span></div>";

/** Price range. Pass from and to, then read onChange({ from, to }). */
export default function PriceRange({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLPriceRange.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
