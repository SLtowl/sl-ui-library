import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-date dt\" data-sheet=\"closed\">\n  <div class=\"dt-plate\">\n    <div class=\"dt-clip dt-shade-clip\" aria-hidden=\"true\"><div class=\"dt-shade\"></div></div>\n    <div class=\"dt-clip\" aria-hidden=\"true\"><div class=\"dt-sheet\"></div></div>\n    <div class=\"dt-head\"><div class=\"dt-well\">\n      <span class=\"dt-ring\" aria-hidden=\"true\"></span>\n      <span class=\"dt-ghost\" aria-hidden=\"true\"><b></b><span></span></span>\n      <input type=\"text\" inputmode=\"numeric\" aria-label=\"Date, month day year\" autocomplete=\"off\" spellcheck=\"false\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\" data-form-type=\"other\">\n      <span class=\"dt-rel\" aria-hidden=\"true\"></span>\n    </div></div>\n    <div class=\"dt-reveal\"><div class=\"dt-pick\">\n      <div class=\"dt-top\"><span class=\"dt-title\" aria-live=\"polite\"></span>\n        <button class=\"dt-nav prev\" type=\"button\" aria-label=\"Previous month\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"m15 6-6 6 6 6\"/></svg></button>\n        <button class=\"dt-nav next\" type=\"button\" aria-label=\"Next month\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"m9 6 6 6-6 6\"/></svg></button>\n      </div>\n      <div class=\"dt-week\" aria-hidden=\"true\"></div>\n      <div class=\"dt-days\" role=\"grid\"><span class=\"dt-knob\" aria-hidden=\"true\"></span></div>\n    </div></div>\n  </div>\n  <span class=\"pb-sr\" role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Date. Read onChange({ date, iso, valid }). Pass min and max as Date objects to limit the days that can be chosen. */
export default function Date({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLDate.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
