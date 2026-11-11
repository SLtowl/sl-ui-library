import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-weekdays ck\">\n  <div class=\"ck-days\" role=\"group\" aria-label=\"Days of the week\">\n    <label class=\"ck-day\"><input type=\"checkbox\" checked aria-label=\"Monday\"><i></i><b aria-hidden=\"true\">M</b></label>\n    <label class=\"ck-day\"><input type=\"checkbox\" checked aria-label=\"Tuesday\"><i></i><b aria-hidden=\"true\">T</b></label>\n    <label class=\"ck-day\"><input type=\"checkbox\" checked aria-label=\"Wednesday\"><i></i><b aria-hidden=\"true\">W</b></label>\n    <label class=\"ck-day\"><input type=\"checkbox\" checked aria-label=\"Thursday\"><i></i><b aria-hidden=\"true\">T</b></label>\n    <label class=\"ck-day\"><input type=\"checkbox\" checked aria-label=\"Friday\"><i></i><b aria-hidden=\"true\">F</b></label>\n    <label class=\"ck-day\"><input type=\"checkbox\" aria-label=\"Saturday\"><i></i><b aria-hidden=\"true\">S</b></label>\n    <label class=\"ck-day\"><input type=\"checkbox\" aria-label=\"Sunday\"><i></i><b aria-hidden=\"true\">S</b></label>\n  </div>\n  <div class=\"ck-swap\" aria-live=\"polite\"><span class=\"on\">Every weekday</span><span></span></div>\n</div>";

/** Weekdays. Read onChange(days), a list of the chosen day names. */
export default function Weekdays({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLWeekdays.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
