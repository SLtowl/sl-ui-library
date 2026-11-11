import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-color cl\" data-sheet=\"closed\">\n  <div class=\"cl-plate\">\n    <div class=\"cl-clip cl-shade-clip\" aria-hidden=\"true\"><div class=\"cl-shade\"></div></div>\n    <div class=\"cl-clip\" aria-hidden=\"true\"><div class=\"cl-sheet\"></div></div>\n    <div class=\"cl-head\"><div class=\"cl-well\">\n      <span class=\"cl-ring\" aria-hidden=\"true\"></span>\n      <span class=\"cl-paint\" aria-hidden=\"true\"><span class=\"cl-base\"></span></span>\n      <input type=\"text\" aria-label=\"Color code\" autocomplete=\"off\" autocapitalize=\"characters\" spellcheck=\"false\" placeholder=\"Color\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\" data-form-type=\"other\">\n      <button class=\"cl-swatch\" type=\"button\" aria-label=\"Choose a color\" aria-expanded=\"false\"></button>\n    </div></div>\n    <div class=\"cl-reveal\"><div class=\"cl-pick\"><div class=\"cl-grid\" role=\"group\" aria-label=\"Ready colors\"></div><div class=\"cl-sv\" tabindex=\"-1\" role=\"slider\" aria-label=\"Vividness and brightness\"><span class=\"cl-knob\"></span></div><div class=\"cl-hue\" tabindex=\"-1\" role=\"slider\" aria-label=\"Hue\" aria-valuemin=\"0\" aria-valuemax=\"360\"><span class=\"cl-knob\"></span></div></div></div>\n  </div>\n  <span class=\"pb-sr\" role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Color. Read onChange({ hex, valid }). Pass palette as a list of #RRGGBB to replace the ready colors. Call set(value) to start with a color. */
export default function Color({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLColor.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
