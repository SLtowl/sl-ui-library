import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-phone ph\" data-phase=\"idle\">\n  <div class=\"ph-plate\">\n    <div class=\"ph-clip ph-shade-clip\" aria-hidden=\"true\"><div class=\"ph-shade\"></div></div>\n    <div class=\"ph-clip\" aria-hidden=\"true\"><div class=\"ph-sheet\"></div></div>\n    <div class=\"ph-head\">\n      <label class=\"ph-well code\"><span class=\"ph-ring\" aria-hidden=\"true\"></span><input class=\"ph-cc\" type=\"text\" role=\"combobox\" aria-label=\"Country or code\" aria-expanded=\"false\" aria-autocomplete=\"list\" aria-controls=\"pb-phone-list\" autocomplete=\"off\" spellcheck=\"false\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\" data-form-type=\"other\"></label>\n      <label class=\"ph-well\"><span class=\"ph-ring\" aria-hidden=\"true\"></span><span class=\"ph-ghost\" aria-hidden=\"true\"><b></b><span></span></span><input class=\"ph-n\" type=\"text\" inputmode=\"tel\" aria-label=\"Phone number\" autocomplete=\"off\" spellcheck=\"false\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\" data-form-type=\"other\"><svg class=\"ph-ok\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path pathLength=\"1\" d=\"m5 12.5 4.5 4.5L19 7.5\"/></svg></label>\n    </div>\n    <div class=\"ph-reveal\"><div class=\"ph-list\" id=\"pb-phone-list\" role=\"listbox\" aria-label=\"Countries\"><span class=\"ph-knob\" aria-hidden=\"true\"></span><p class=\"ph-none\"></p></div></div>\n  </div>\n  <span class=\"pb-sr\" role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Phone. Read onChange({ country, code, number, e164, complete }) to get the number. Pass countries as { iso, name, code, mask } to replace the built-in list, common for the short list, country for the starting country. */
export default function Phone({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLPhone.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
