import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-privacyrow pr\" data-private=\"false\">\n  <button class=\"pr-btn\" type=\"button\" role=\"switch\" aria-checked=\"false\">\n    <span class=\"pr-text\"><strong>Private project</strong><span class=\"pr-sub\"><span class=\"v-pub\">Anyone with the link can view</span><span class=\"v-prv\" aria-hidden=\"true\">Only you can view</span></span></span>\n    <span class=\"pr-sw\" aria-hidden=\"true\"></span>\n  </button>\n</div>";

/** Project privacy. Read onChange(isPrivate). Pass private: true to start on and text to rename the two lines under the title. */
export default function PrivacyRow({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLPrivacyRow.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
