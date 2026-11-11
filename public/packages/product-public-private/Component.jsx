import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-publicprivate vp\" data-value=\"public\">\n  <div class=\"vp-seg\" role=\"radiogroup\" aria-label=\"Visibility\"><i></i>\n    <button class=\"vp-opt\" type=\"button\" role=\"radio\" aria-checked=\"true\" data-value=\"public\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><ellipse cx=\"12\" cy=\"12\" rx=\"4\" ry=\"9\"/><path d=\"M3 12h18\"/></svg>Public</button>\n    <button class=\"vp-opt\" type=\"button\" role=\"radio\" aria-checked=\"false\" tabindex=\"-1\" data-value=\"private\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2.6\"/><path d=\"M8 11V7.5a4 4 0 0 1 8 0V11\"/></svg>Private</button>\n  </div>\n</div>";

/** Public / Private. Read onChange(value), which gives 'public' or 'private'. Pass value to start on Private. */
export default function PublicPrivate({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLPublicPrivate.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
