import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-addons ck ck-plate\">\n  <label class=\"ck-row\"><input type=\"checkbox\" data-price=\"4\"><span class=\"ck-box\"><svg viewBox=\"0 0 22 22\" aria-hidden=\"true\"><path class=\"ck-tick\" pathLength=\"1\" d=\"M6 11.5l3.5 3.5L16 7.5\"/></svg></span><span class=\"ck-text\">Extra storage</span><span class=\"ck-side\">+$4</span></label>\n  <label class=\"ck-row\"><input type=\"checkbox\" data-price=\"9\"><span class=\"ck-box\"><svg viewBox=\"0 0 22 22\" aria-hidden=\"true\"><path class=\"ck-tick\" pathLength=\"1\" d=\"M6 11.5l3.5 3.5L16 7.5\"/></svg></span><span class=\"ck-text\">Priority support</span><span class=\"ck-side\">+$9</span></label>\n  <div class=\"ck-total\"><span>Total per month</span><b>$15</b></div>\n</div>";

/** Add-ons. Set each price with data-price in the markup, pass base for the starting amount and read onChange({ total, selected }). */
export default function Addons({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLAddons.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
