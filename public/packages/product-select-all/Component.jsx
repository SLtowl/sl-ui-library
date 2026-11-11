import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-selectall ck ck-plate\">\n  <label class=\"ck-row ck-head\"><input type=\"checkbox\"><span class=\"ck-box\"><span class=\"ck-dash\"></span><svg viewBox=\"0 0 22 22\" aria-hidden=\"true\"><path class=\"ck-tick\" pathLength=\"1\" d=\"M6 11.5l3.5 3.5L16 7.5\"/></svg></span><span class=\"ck-text\">All files</span><span class=\"ck-side ck-count\"><span>None</span><span>1 of 3</span><span>2 of 3</span><span>All 3</span></span></label>\n  <label class=\"ck-row ck-kid\" style=\"--i:0\"><input type=\"checkbox\" checked><span class=\"ck-box\"><svg viewBox=\"0 0 22 22\" aria-hidden=\"true\"><path class=\"ck-tick\" pathLength=\"1\" d=\"M6 11.5l3.5 3.5L16 7.5\"/></svg></span><span class=\"ck-text\">Report.pdf</span></label>\n  <label class=\"ck-row ck-kid\" style=\"--i:1\"><input type=\"checkbox\"><span class=\"ck-box\"><svg viewBox=\"0 0 22 22\" aria-hidden=\"true\"><path class=\"ck-tick\" pathLength=\"1\" d=\"M6 11.5l3.5 3.5L16 7.5\"/></svg></span><span class=\"ck-text\">Photo.png</span></label>\n  <label class=\"ck-row ck-kid\" style=\"--i:2\"><input type=\"checkbox\"><span class=\"ck-box\"><svg viewBox=\"0 0 22 22\" aria-hidden=\"true\"><path class=\"ck-tick\" pathLength=\"1\" d=\"M6 11.5l3.5 3.5L16 7.5\"/></svg></span><span class=\"ck-text\">Notes.txt</span></label>\n</div>";

/** Select all. Read onChange(selected), a list of the chosen item names. Add or remove rows in the markup; keep --i counting from 0. */
export default function SelectAll({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLSelectAll.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
