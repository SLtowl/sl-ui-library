import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-volume sd sd-plate sd-row\"><svg class=\"sd-speaker\" width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 9.500v5h3.500L12 18.500v-13L7.500 9.500H4Z\"/><path class=\"w1\" d=\"M15.200 9.500a3.600 3.600 0 0 1 0 5\"/><path class=\"w2\" d=\"M17.800 7a7.200 7.200 0 0 1 0 10\"/><path class=\"cross\" pathLength=\"1\" d=\"M15.500 9.500l5 5M20.500 9.500l-5 5\"/></svg><span class=\"sd-rail\" role=\"slider\" tabindex=\"0\" aria-label=\"Volume\"><span class=\"sd-line\"><i></i></span><span class=\"sd-run\"><span class=\"sd-thumb\"></span></span></span><span class=\"sd-num\">64</span></div>";

/** Volume. Pass value from 0 to 100 and read onChange(value). */
export default function Volume({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLVolume.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
