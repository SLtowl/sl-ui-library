import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-rating sd sd-plate\"><div class=\"sd-swap sd-word\"><span>Poor</span><span>Fair</span><span>Good</span><span class=\"on\">Great</span><span>Excellent</span></div><span class=\"sd-rail\" role=\"slider\" tabindex=\"0\" aria-label=\"Rating\"><span class=\"sd-line\"><i></i></span><span class=\"sd-stops\"><i></i><i></i><i></i><i></i><i></i></span><span class=\"sd-run\"><span class=\"sd-thumb\"></span></span></span></div>";

/** Rating. Pass value from 1 to 5 and read onChange(value). */
export default function Rating({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLRating.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
