import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-lightdark ld\" data-on=\"false\">\n  <div class=\"ld-plate\">\n    <button class=\"ld-switch\" type=\"button\" role=\"switch\" aria-checked=\"false\" aria-label=\"Dark mode\"><span class=\"ld-seg\"><i></i><span class=\"day\">Light</span><span class=\"night\">Dark</span></span></button>\n  </div>\n</div>";

/** Light / Dark. Pass target for the surface the night spreads over and read onChange(on) to apply your theme. Pass on to start in dark mode. */
export default function LightDark({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLLightDark.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
