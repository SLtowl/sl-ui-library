import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-follow\" data-state=\"idle\">\n  <button class=\"pb-btn\" type=\"button\" aria-pressed=\"false\">\n    <span class=\"pb-t\" data-label=\"idle\">Follow</span>\n    <span class=\"pb-t\" data-label=\"on\" aria-hidden=\"true\">Following</span>\n    <span class=\"pb-t\" data-label=\"off\" aria-hidden=\"true\">Unfollow</span>\n  </button>\n  <span class=\"pb-sr\" data-status role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Follow. Pass onFollow(following, { signal }). The button changes at once; reject and it changes back with a shake. */
export default function Follow({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLFollow.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
