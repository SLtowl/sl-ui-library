import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<form class=\"pb pb-subscribe\" data-bwignore=\"true\" data-state=\"idle\" novalidate>\n  <input class=\"pb-field\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\" data-form-type=\"other\" type=\"text\" inputmode=\"email\" name=\"pb-updates-to\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"you@company.com\" aria-label=\"Where to send updates\" tabindex=\"-1\">\n  <button class=\"pb-btn\" type=\"submit\" aria-expanded=\"false\">\n    <span class=\"pb-t\" data-label=\"idle\">Subscribe</span>\n    <span class=\"pb-t pb-dots\" aria-hidden=\"true\"><i></i><i></i><i></i></span>\n    <span class=\"pb-t\" data-label=\"done\" aria-hidden=\"true\">You're in</span>\n  </button>\n  <span class=\"pb-sr\" data-status role=\"status\" aria-live=\"polite\"></span>\n</form>";

/** Subscribe. Pass onSubscribe(email, { signal }); resolve once your mailing service accepts the address, reject to let the person try again. */
export default function Subscribe({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLSubscribe.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
