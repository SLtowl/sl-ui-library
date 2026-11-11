import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-textsize sd sd-plate\"><div class=\"sd-sample\"><span>Read at a glance</span></div><div class=\"sd-row\"><span class=\"sd-rail\" role=\"slider\" tabindex=\"0\" aria-label=\"Text size\"><span class=\"sd-line\"><i></i></span><span class=\"sd-run\"><span class=\"sd-thumb\"></span></span></span><span class=\"sd-num\">16 px</span></div></div>";

/** Text size. Pass value in pixels from 12 to 24 and read onChange(value). */
export default function TextSize({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLTextSize.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
