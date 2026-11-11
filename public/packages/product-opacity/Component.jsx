import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-opacity sd sd-plate sd-row\"><span class=\"sd-chip\"><i></i></span><span class=\"sd-rail\" role=\"slider\" tabindex=\"0\" aria-label=\"Opacity\"><span class=\"sd-check\"><i></i></span><span class=\"sd-run\"><span class=\"sd-thumb\"></span></span></span><span class=\"sd-num\">64%</span></div>";

/** Opacity. Pass value from 0 to 100, set --sd-color on the root and read onChange(value). */
export default function Opacity({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLOpacity.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
