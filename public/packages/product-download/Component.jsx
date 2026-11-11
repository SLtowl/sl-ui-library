import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-download\" data-state=\"idle\">\n  <button class=\"pb-btn\" type=\"button\">\n    <span class=\"pb-fill\" aria-hidden=\"true\"></span>\n    <span class=\"pb-t\" data-label=\"idle\">Download</span>\n    <span class=\"pb-t\" data-label=\"pct\" aria-hidden=\"true\">0%</span>\n    <span class=\"pb-t\" data-label=\"cancel\" aria-hidden=\"true\">Cancel</span>\n    <span class=\"pb-t\" data-label=\"done\" aria-hidden=\"true\">Open file</span>\n  </button>\n  <span class=\"pb-sr\" data-status role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Download. Pass onDownload({ signal, progress }); call progress(0…1) as bytes arrive and resolve when the file is saved. Clicking during the download aborts the signal. onOpen() runs from Open file. */
export default function Download({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLDownload.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
