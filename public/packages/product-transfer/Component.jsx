import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-transfer am\" data-sheet=\"closed\">\n  <div class=\"am-plate\">\n    <div class=\"am-clip am-shade-clip\" aria-hidden=\"true\"><div class=\"am-shade\"></div></div>\n    <div class=\"am-clip\" aria-hidden=\"true\"><div class=\"am-sheet\"></div></div>\n    <div class=\"am-head\">\n      <div class=\"am-well cur\"><span class=\"am-ring\" aria-hidden=\"true\"></span><button class=\"am-cur\" type=\"button\" aria-haspopup=\"listbox\" aria-controls=\"pb-transfer-list\" aria-expanded=\"false\"></button></div>\n      <label class=\"am-well num\"><span class=\"am-ring\" aria-hidden=\"true\"></span><span class=\"am-meter\" aria-hidden=\"true\"><i></i></span><input type=\"text\" inputmode=\"decimal\" aria-label=\"Amount to send\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"Amount to send\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\" data-form-type=\"other\"><button class=\"am-max\" type=\"button\">Max</button><span class=\"am-note\" aria-hidden=\"true\">Over limit</span></label>\n    </div>\n    <div class=\"am-reveal\"><div class=\"am-list\" id=\"pb-transfer-list\" role=\"listbox\" aria-label=\"Currencies\"><span class=\"am-knob\" aria-hidden=\"true\"></span></div></div>\n  </div>\n  <span class=\"pb-sr\" role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Transfer. Pass max for the available balance and read onChange({ amount, currency, valid, over }). Call setMax(value) whenever the balance changes. Without max there is no meter and no Max button. */
export default function Transfer({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLTransfer.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
