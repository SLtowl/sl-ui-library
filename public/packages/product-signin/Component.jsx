import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<form class=\"pb pb-f si pb-signin\" data-state=\"email\" novalidate>\n  <div class=\"si-top\">\n    <label class=\"si-label\" for=\"pb-signin-mail\">Email</label>\n    <span class=\"si-chip\"></span>\n    <button class=\"si-change\" type=\"button\" tabindex=\"-1\">Change</button>\n    <button class=\"si-resend\" type=\"button\" tabindex=\"-1\" disabled>Resend</button>\n  </div>\n  <div class=\"si-box\">\n    <input class=\"si-input\" id=\"pb-signin-mail\" type=\"text\" inputmode=\"email\" autocomplete=\"off\" autocapitalize=\"none\" spellcheck=\"false\" placeholder=\"you@company.com\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\">\n    <button class=\"si-go\" type=\"submit\" tabindex=\"-1\"><span class=\"t go\">Continue</span><span class=\"t dots\" aria-hidden=\"true\"><i></i><i></i><i></i></span></button>\n    <div class=\"si-cells\" role=\"group\" aria-label=\"Code from the email\">\n      <input class=\"si-cell\" type=\"text\" inputmode=\"numeric\" maxlength=\"6\" autocomplete=\"one-time-code\" aria-label=\"Digit 1\" tabindex=\"-1\">\n      <input class=\"si-cell\" type=\"text\" inputmode=\"numeric\" maxlength=\"1\" autocomplete=\"off\" aria-label=\"Digit 2\" tabindex=\"-1\">\n      <input class=\"si-cell\" type=\"text\" inputmode=\"numeric\" maxlength=\"1\" autocomplete=\"off\" aria-label=\"Digit 3\" tabindex=\"-1\">\n      <input class=\"si-cell\" type=\"text\" inputmode=\"numeric\" maxlength=\"1\" autocomplete=\"off\" aria-label=\"Digit 4\" tabindex=\"-1\">\n      <input class=\"si-cell\" type=\"text\" inputmode=\"numeric\" maxlength=\"1\" autocomplete=\"off\" aria-label=\"Digit 5\" tabindex=\"-1\">\n      <input class=\"si-cell\" type=\"text\" inputmode=\"numeric\" maxlength=\"1\" autocomplete=\"off\" aria-label=\"Digit 6\" tabindex=\"-1\">\n      <span class=\"si-ring\" aria-hidden=\"true\"></span>\n    </div>\n    <span class=\"si-done\" aria-hidden=\"true\">Signed in</span>\n  </div>\n  <span class=\"pb-sr\" data-status role=\"status\" aria-live=\"polite\"></span>\n</form>";

/** Email sign-in. Pass onSend(email, { signal }) to email the code and onVerify(code, { signal }) to check it. Throw from onVerify for a wrong code. */
export default function SignIn({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLSignIn.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
