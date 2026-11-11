import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-dnd sr\">\n  <button class=\"sr-row\" type=\"button\" role=\"switch\" aria-checked=\"false\" aria-label=\"Do not disturb\">\n    <svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path class=\"moon-fill\" d=\"M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z\"/><path d=\"M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z\"/></svg>\n    <span class=\"sr-label\">Do not disturb</span>\n    <span class=\"sr-status\"><span data-s=\"on\">Silenced</span></span>\n    <span class=\"sr-sw\" aria-hidden=\"true\"></span>\n  </button>\n</div>";

/** Do not disturb. Read onChange(on). Pass on: true to start silenced. */
export default function DoNotDisturb({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLDoNotDisturb.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
