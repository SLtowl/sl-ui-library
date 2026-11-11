import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-topics ck\" role=\"group\" aria-label=\"Topics\">\n  <label class=\"ck-chip\"><input type=\"checkbox\" checked><i></i><b>Design</b></label>\n  <label class=\"ck-chip\"><input type=\"checkbox\"><i></i><b>Product</b></label>\n  <label class=\"ck-chip\"><input type=\"checkbox\"><i></i><b>Engineering</b></label>\n  <label class=\"ck-chip\"><input type=\"checkbox\" checked><i></i><b>Marketing</b></label>\n  <label class=\"ck-chip\"><input type=\"checkbox\"><i></i><b>Sales</b></label>\n  <label class=\"ck-chip\"><input type=\"checkbox\"><i></i><b>Support</b></label>\n</div>";

/** Topics. Read onChange(selected), a list of the chosen topic names. Add or remove chips in the markup. */
export default function Topics({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLTopics.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
