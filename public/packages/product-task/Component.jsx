import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-task ck ck-plate ck-one\">\n  <label class=\"ck-row\"><input type=\"checkbox\"><span class=\"ck-box\"><svg viewBox=\"0 0 22 22\" aria-hidden=\"true\"><path class=\"ck-tick\" pathLength=\"1\" d=\"M6 11.5l3.5 3.5L16 7.5\"/></svg></span><span class=\"ck-text\">Review the contract</span></label>\n</div>";

/** Task. Read onChange(checked) to save the task. */
export default function Task({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLTask.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
