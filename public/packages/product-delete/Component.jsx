import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-delete\" data-state=\"idle\">\n  <button class=\"pb-cancel pb-quiet\" type=\"button\" tabindex=\"-1\" aria-hidden=\"true\">Cancel</button>\n  <button class=\"pb-btn\" type=\"button\">\n    <span class=\"pb-t\" data-label=\"idle\">Delete project</span>\n    <span class=\"pb-t\" data-label=\"confirm\" aria-hidden=\"true\">Yes, delete</span>\n    <span class=\"pb-t pb-dots\" aria-hidden=\"true\"><i></i><i></i><i></i></span>\n    <span class=\"pb-t\" data-label=\"done\" aria-hidden=\"true\">Deleted</span>\n  </button>\n  <span class=\"pb-sr\" data-status role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Delete. Pass onDelete({ signal }); resolve once the item is gone, reject to put the button back. The confirmation closes by itself after a few seconds. */
export default function Delete({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLDelete.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
