import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-brightness sd\"><span class=\"sd-rail sd-fat\" role=\"slider\" tabindex=\"0\" aria-label=\"Brightness\"><span class=\"sd-face\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path class=\"rays\" d=\"M12 2.500v2M12 19.500v2M2.500 12h2M19.500 12h2M5.300 5.300l1.400 1.400M17.300 17.300l1.400 1.400M5.300 18.700l1.400-1.400M17.300 6.700l1.400-1.400\"/></svg><b class=\"sd-val\">64%</b></span><span class=\"sd-fill\"><span class=\"sd-back\"><span class=\"sd-face sd-on\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path class=\"rays\" d=\"M12 2.500v2M12 19.500v2M2.500 12h2M19.500 12h2M5.300 5.300l1.400 1.400M17.300 17.300l1.400 1.400M5.300 18.700l1.400-1.400M17.300 6.700l1.400-1.400\"/></svg><b class=\"sd-val\">64%</b></span></span></span></span></div>";

/** Brightness. Pass value from 0 to 100 and read onChange(value). */
export default function Brightness({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLBrightness.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
