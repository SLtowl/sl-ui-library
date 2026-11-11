import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-zoom sd sd-plate sd-row\"><button class=\"sd-step\" type=\"button\" aria-label=\"Zoom out\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5.500 12h13\"/></svg></button><span class=\"sd-rail\" role=\"slider\" tabindex=\"0\" aria-label=\"Zoom\"><span class=\"sd-line\"><i></i></span><span class=\"sd-run\"><span class=\"sd-thumb\"></span></span></span><button class=\"sd-step\" type=\"button\" aria-label=\"Zoom in\"><svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5.500 12h13M12 5.500v13\"/></svg></button><span class=\"sd-num\">100%</span></div>";

/** Zoom. Pass value as a percentage from 25 to 200 and read onChange(value). */
export default function Zoom({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLZoom.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
