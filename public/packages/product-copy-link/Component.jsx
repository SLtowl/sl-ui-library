import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-copy\" data-state=\"idle\" data-link=\"https://sl-ui.dev/invite/8fK2\">\n  <button class=\"pb-btn\" type=\"button\">\n    <span class=\"pb-t\" data-label=\"idle\">Copy link</span>\n    <span class=\"pb-t pb-link\" aria-hidden=\"true\"><span class=\"pb-select\"></span><span class=\"pb-url\">sl-ui.dev/invite/8fK2</span></span>\n    <span class=\"pb-t\" data-label=\"done\" aria-hidden=\"true\">Copied</span>\n    <span class=\"pb-t\" data-label=\"fail\" aria-hidden=\"true\">Copy failed</span>\n  </button>\n  <span class=\"pb-sr\" data-status role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Copy link. Put the address in data-link or pass link. The button writes it to the clipboard on click and shows Copy failed if the browser refuses. */
export default function CopyLink({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLCopyLink.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
