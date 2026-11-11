import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-notifications sr\">\n  <button class=\"sr-row\" type=\"button\" role=\"switch\" aria-checked=\"true\" aria-label=\"Notifications\">\n    <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><g class=\"sr-ring\"><path d=\"M6 10a6 6 0 0 1 12 0c0 5.5 2 7 2 7H4s2-1.5 2-7\"/><path d=\"M10 20.5a2.2 2.2 0 0 0 4 0\"/></g><path class=\"sr-gap\" pathLength=\"1\" d=\"M3.5 3.5l17 17\"/><path class=\"sr-slash\" pathLength=\"1\" d=\"M3.5 3.5l17 17\"/><circle class=\"sr-dot\" cx=\"18\" cy=\"5.5\" r=\"3.3\"/></svg>\n    <span class=\"sr-label\">Notifications</span>\n    <span class=\"sr-sw\" aria-hidden=\"true\"></span>\n  </button>\n</div>";

/** Notifications. Read onChange(on). Pass on: false to start muted. */
export default function Notifications({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLNotifications.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
