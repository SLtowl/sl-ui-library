import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-username un\" data-state=\"empty\">\n  <div class=\"un-plate\">\n    <div class=\"un-clip un-shade-clip\" aria-hidden=\"true\"><div class=\"un-shade\"></div></div>\n    <div class=\"un-clip\" aria-hidden=\"true\"><div class=\"un-sheet\"></div></div>\n    <div class=\"un-head\"><label class=\"un-well\">\n      <span class=\"un-ring\" aria-hidden=\"true\"></span>\n      <input type=\"text\" role=\"combobox\" aria-label=\"Username\" aria-expanded=\"false\" aria-autocomplete=\"list\" aria-controls=\"pb-username-list\" autocomplete=\"off\" autocapitalize=\"none\" spellcheck=\"false\" maxlength=\"20\" placeholder=\"Username\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\" data-form-type=\"other\">\n      <svg class=\"un-ok\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path pathLength=\"1\" d=\"m5 12.5 4.5 4.5L19 7.5\"/></svg>\n      <span class=\"un-taken\" aria-hidden=\"true\">Taken</span>\n    </label></div>\n    <div class=\"un-reveal\"><div class=\"un-list\" id=\"pb-username-list\" role=\"listbox\" aria-label=\"Free names\"><span class=\"un-knob\" aria-hidden=\"true\"></span></div></div>\n  </div>\n  <span class=\"pb-sr\" role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Username. Pass check(name, { signal }) and return true for free, false for taken, or { free, suggest: [names] }. Read onChange({ name, free }). */
export default function Username({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLUsername.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
