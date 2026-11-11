import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-link lk\" data-state=\"edit\">\n  <div class=\"lk-plate\"><div class=\"lk-well\">\n    <span class=\"lk-ring\" aria-hidden=\"true\"></span>\n    <input type=\"text\" inputmode=\"url\" aria-label=\"Link\" autocomplete=\"off\" autocapitalize=\"none\" spellcheck=\"false\" placeholder=\"Paste a link\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\" data-form-type=\"other\">\n    <button class=\"lk-row\" type=\"button\"><span class=\"lk-line\"><span class=\"lk-pre\"></span><span class=\"lk-run\"><span class=\"lk-host\"></span><span class=\"lk-tail\"></span></span></span><span class=\"lk-badge\" aria-hidden=\"true\"></span></button>\n    <button class=\"lk-clear\" type=\"button\" aria-label=\"Clear link\" tabindex=\"-1\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"m6 6 12 12M18 6 6 18\"/></svg></button>\n  </div></div>\n  <span class=\"pb-sr\" role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Link. Read onChange({ url, host, valid }); url always includes https://. Pass icon(url) to return an image for the site badge. */
export default function Link({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLLink.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
