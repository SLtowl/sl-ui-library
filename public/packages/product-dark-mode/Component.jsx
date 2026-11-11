import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-darkmode dk\">\n  <button class=\"dk-switch\" type=\"button\" role=\"switch\" aria-checked=\"false\" aria-label=\"Dark mode\">\n    <span class=\"rail\"><span class=\"ball\"><span class=\"grip\"><span class=\"roll\">\n      <svg class=\"s\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4\"/></svg>\n      <svg class=\"m\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z\"/></svg>\n    </span></span></span></span>\n  </button>\n</div>";

/** Dark mode. Pass target for the surface the night spreads over and read onChange(on) to apply your theme. Pass on to start in dark mode. */
export default function DarkMode({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLDarkMode.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
