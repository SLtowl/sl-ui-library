import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-playback sd sd-plate\"><span class=\"sd-rail\" role=\"slider\" tabindex=\"0\" aria-label=\"Playback position\"><span class=\"sd-line\"><u></u><i></i></span><span class=\"sd-run\"><span class=\"sd-thumb\"></span><b class=\"sd-tip\">1:24</b></span></span><div class=\"sd-ends\"><span class=\"sd-now\">1:24</span><span>3:40</span></div></div>";

/** Playback. Pass value and total in seconds and read onChange(value). Call set(value) as the media plays. */
export default function Playback({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLPlayback.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
