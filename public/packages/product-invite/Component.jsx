import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<form class=\"pb pb-invite\" data-bwignore=\"true\" data-state=\"idle\" novalidate>\n  <input class=\"pb-field\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\" data-form-type=\"other\" type=\"text\" inputmode=\"email\" name=\"pb-invitee\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"teammate@company.com\" aria-label=\"Who to invite\" tabindex=\"-1\">\n  <button class=\"pb-role\" type=\"button\" tabindex=\"-1\"><span class=\"pb-rn\"><span>Editor</span></span></button>\n  <button class=\"pb-btn\" type=\"submit\" aria-expanded=\"false\">\n    <span class=\"pb-t\" data-label=\"idle\">Invite</span>\n    <span class=\"pb-t\" data-label=\"send\" aria-hidden=\"true\">Send</span>\n    <span class=\"pb-t pb-dots\" aria-hidden=\"true\"><i></i><i></i><i></i></span>\n    <span class=\"pb-t\" data-label=\"done\" aria-hidden=\"true\">Invite sent</span>\n  </button>\n  <span class=\"pb-sr\" data-status role=\"status\" aria-live=\"polite\"></span>\n</form>";

/** Invite. Pass onInvite({ email, role }, { signal }); resolve once the invitation is sent. Set roles to the choices your app has; the role pill cycles through them. */
export default function Invite({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLInvite.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
