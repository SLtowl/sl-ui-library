import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-upload\" data-state=\"idle\">\n  <input class=\"pb-file\" type=\"file\" tabindex=\"-1\" aria-hidden=\"true\" hidden>\n  <button class=\"pb-btn\" type=\"button\">\n    <span class=\"pb-fill\" aria-hidden=\"true\"></span>\n    <span class=\"pb-t\" data-label=\"idle\">Upload file</span>\n    <span class=\"pb-t\" data-label=\"drop\" aria-hidden=\"true\">Drop to upload</span>\n    <span class=\"pb-t pb-name\" aria-hidden=\"true\"><span class=\"pb-fname\">file</span><span class=\"pb-pct\">0%</span></span>\n    <span class=\"pb-t\" data-label=\"done\" aria-hidden=\"true\">Uploaded</span>\n    <span class=\"pb-t\" data-label=\"fail\" aria-hidden=\"true\">Upload failed</span>\n  </button>\n  <span class=\"pb-sr\" data-status role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Upload. Pass onUpload(file, { signal, progress }); call progress(0…1) while sending and resolve when the server has it. Set accept to limit file types. */
export default function Upload({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLUpload.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
