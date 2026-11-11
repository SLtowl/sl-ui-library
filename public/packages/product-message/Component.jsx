import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-message ms\" data-state=\"empty\">\n  <div class=\"ms-plate\">\n    <div class=\"ms-clip\" aria-hidden=\"true\"><div class=\"ms-sheet\"></div></div>\n    <div class=\"ms-head\"><div class=\"ms-well\">\n      <span class=\"ms-bg\" aria-hidden=\"true\"></span>\n      <span class=\"ms-ring\" aria-hidden=\"true\"></span>\n      <textarea rows=\"1\" aria-label=\"Message\" autocomplete=\"off\" placeholder=\"Write a message\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\" data-form-type=\"other\"></textarea>\n      <span class=\"ms-mirror\" aria-hidden=\"true\"></span>\n      <span class=\"ms-sent\" aria-hidden=\"true\"></span>\n      <span class=\"ms-done\" aria-hidden=\"true\"><svg viewBox=\"0 0 24 24\"><path pathLength=\"1\" d=\"m5 12.5 4.5 4.5L19 7.5\"/></svg>Sent</span>\n      <button class=\"ms-send\" type=\"button\">Send</button>\n    </div></div>\n  </div>\n  <span class=\"pb-sr\" role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Message. Pass onSend(text, { signal }) and throw to keep the text and mark it as not sent. Enter sends, Shift + Enter adds a line. */
export default function Message({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLMessage.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
