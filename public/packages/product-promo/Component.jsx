import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<form class=\"pb pb-promo\" data-bwignore=\"true\" data-state=\"idle\" novalidate>\n  <input class=\"pb-field\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\" data-form-type=\"other\" type=\"text\" name=\"pb-promo\" autocomplete=\"off\" autocapitalize=\"characters\" spellcheck=\"false\" placeholder=\"Try SPRING20\" aria-label=\"Promo\" tabindex=\"-1\">\n  <button class=\"pb-btn\" type=\"submit\" aria-expanded=\"false\">\n    <span class=\"pb-t\" data-label=\"idle\">Have a code?</span>\n    <span class=\"pb-t\" data-label=\"apply\" aria-hidden=\"true\">Apply</span>\n    <span class=\"pb-t pb-dots\" aria-hidden=\"true\"><i></i><i></i><i></i></span>\n    <span class=\"pb-t\" data-label=\"done\" aria-hidden=\"true\">Code applied</span>\n    <span class=\"pb-t\" data-label=\"remove\" aria-hidden=\"true\">Remove code</span>\n  </button>\n  <span class=\"pb-sr\" data-status role=\"status\" aria-live=\"polite\"></span>\n</form>";

/** Promo code. Pass onApply(code, { signal }); resolve with { label: '−20%' } for a good code, throw for a bad one. Hovering an applied code offers Remove code; onRemove(code) runs then. */
export default function Promo({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLPromo.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
