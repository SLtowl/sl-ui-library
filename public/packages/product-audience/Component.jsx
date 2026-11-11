import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-audience au\" data-private=\"false\">\n  <button class=\"au-btn\" type=\"button\" role=\"switch\" aria-checked=\"false\" aria-label=\"Private\">\n    <span class=\"au-faces\" aria-hidden=\"true\">\n      <span class=\"au-f me\"><span class=\"au-c\">You</span></span>\n      <span class=\"au-f\" style=\"--i:1;--c:#e0784a\"><span class=\"au-c\">M</span></span>\n      <span class=\"au-f\" style=\"--i:2;--c:#1e9e5a\"><span class=\"au-c\">K</span></span>\n      <span class=\"au-f\" style=\"--i:3;--c:#8a5cf0\"><span class=\"au-c\">T</span></span>\n      <span class=\"au-f\" style=\"--i:4;--c:#d94a7c\"><span class=\"au-c\">A</span></span>\n    </span>\n    <span class=\"au-note\"><span class=\"v-pub\">Anyone with the link</span><span class=\"v-prv\" aria-hidden=\"true\">Only you</span></span>\n  </button>\n</div>";

/** Audience. Read onChange(isPrivate). Pass private: true to start with only you and text to rename the two lines. Replace the letters in the markup with your people. Set --au-note on the root to match a dark page. */
export default function Audience({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLAudience.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
