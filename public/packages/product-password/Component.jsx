import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-password pw\" data-phase=\"idle\">\n  <div class=\"pw-plate\">\n    <div class=\"pw-clip pw-shade-clip\" aria-hidden=\"true\"><div class=\"pw-shade\"></div></div>\n    <div class=\"pw-clip\" aria-hidden=\"true\"><div class=\"pw-sheet\"></div></div>\n    <div class=\"pw-head\"><div class=\"pw-well\">\n      <span class=\"pw-ring\" aria-hidden=\"true\"></span>\n      <input type=\"password\" aria-label=\"Password\" autocomplete=\"new-password\" spellcheck=\"false\" placeholder=\"Create a password\">\n      <svg class=\"pw-ok\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path pathLength=\"1\" d=\"m5 12.5 4.5 4.5L19 7.5\"/></svg>\n      <button class=\"pw-show\" type=\"button\" aria-pressed=\"false\" aria-label=\"Show password\"><svg class=\"morph\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path class=\"a\"/><path class=\"b\"/><circle class=\"mid\" cx=\"12\" cy=\"12\" r=\"1.8\"/></svg></button>\n    </div></div>\n    <div class=\"pw-reveal\"><ul class=\"pw-rules\"></ul></div>\n  </div>\n  <span class=\"pb-sr\" role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Password. Read onChange({ value, valid }); send the password only when valid is true. Pass rules as { label, test(value) } to replace the built-in three. */
export default function Password({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLPassword.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
