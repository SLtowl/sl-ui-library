import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-lock lk\" data-private=\"false\">\n  <button class=\"lk-btn\" type=\"button\" role=\"switch\" aria-checked=\"false\" aria-label=\"Private\">\n    <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path class=\"lk-shackle\" pathLength=\"100\" d=\"M8 14V7.5a4 4 0 0 1 8 0V14\"/><rect class=\"lk-body\" x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2.6\"/></svg>\n  </button>\n  <div class=\"lk-word\"><span class=\"v-pub\">Public</span><span class=\"v-prv\" aria-hidden=\"true\">Private</span></div>\n</div>";

/** Lock. Read onChange(isPrivate). Pass private: true to start locked and text to rename the two words. Set --lk-text on the root to match a dark page. */
export default function Lock({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLLock.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
