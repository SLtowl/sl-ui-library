import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-confirmdelete ck ck-plate\" data-done=\"false\">\n  <label class=\"ck-row\"><input type=\"checkbox\"><span class=\"ck-box\"><svg viewBox=\"0 0 22 22\" aria-hidden=\"true\"><path class=\"ck-tick\" pathLength=\"1\" d=\"M6 11.5l3.5 3.5L16 7.5\"/></svg></span><span class=\"ck-text\">I know this can't be undone</span></label>\n  <button class=\"ck-go\" type=\"button\" disabled><span class=\"ck-idle\">Delete project</span><span class=\"ck-done\">Deleted</span></button>\n</div>";

/** Confirm delete. Pass onConfirm for the real deletion. Pass resetAfter in milliseconds if the form should return afterwards. */
export default function ConfirmDelete({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLConfirmDelete.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
