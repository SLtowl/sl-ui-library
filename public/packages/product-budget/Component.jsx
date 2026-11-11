import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-budget sd sd-plate\"><div class=\"sd-big\">$1,200</div><span class=\"sd-rail\" role=\"slider\" tabindex=\"0\" aria-label=\"Budget\"><span class=\"sd-line\"><i></i></span><span class=\"sd-run\"><span class=\"sd-thumb\"></span></span></span><div class=\"sd-ends\"><span>$0</span><span>$5,000</span></div></div>";

/** Budget. Pass value and read onChange(value). */
export default function Budget({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLBudget.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
