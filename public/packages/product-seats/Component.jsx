import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-seats sd sd-plate\"><div class=\"sd-head\"><span class=\"sd-count\">12 seats</span><span class=\"sd-num\">$96 / month</span></div><span class=\"sd-rail\" role=\"slider\" tabindex=\"0\" aria-label=\"Seats\"><span class=\"sd-line\"><i></i></span><span class=\"sd-run\"><span class=\"sd-thumb\"></span></span></span><div class=\"sd-swap\"><span class=\"on\">$7 a seat from 20 seats</span><span>You pay $7 a seat</span></div></div>";

/** Seats. Pass value, rate, betterRate and betterFrom, then read onChange({ seats, price }). */
export default function Seats({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLSeats.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
