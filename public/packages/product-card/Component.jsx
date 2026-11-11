import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<form class=\"pb pb-f cp pb-cardplate\" data-step=\"number\" novalidate>\n  <div class=\"cp-plate\">\n    <div class=\"cp-row\">\n      <label class=\"cp-well\">\n        <input class=\"cp-num\" type=\"text\" inputmode=\"numeric\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"Card number\" aria-label=\"Card number\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\">\n        <span class=\"cp-brand\" aria-hidden=\"true\"><span></span></span>\n        <span class=\"cp-sweep\" aria-hidden=\"true\"></span>\n        <span class=\"cp-line\"><b></b><span class=\"cp-state\" aria-hidden=\"true\"><i class=\"wait\">Linking</i><i class=\"ok\"><svg viewBox=\"0 0 24 24\"><path pathLength=\"1\" d=\"m5 12.5 4.5 4.5L19 7.5\"/></svg>Linked</i></span><button class=\"cp-edit\" type=\"button\" tabindex=\"-1\">Change</button></span>\n      </label>\n    </div>\n    <div class=\"cp-fold\"><div><div class=\"cp-row\">\n      <label class=\"cp-well\"><input class=\"cp-exp\" type=\"text\" inputmode=\"numeric\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"MM / YY\" aria-label=\"Expiry, month and year\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\"></label>\n      <label class=\"cp-well\"><input class=\"cp-cvc\" type=\"text\" inputmode=\"numeric\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"CVC\" aria-label=\"Security code\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\"></label>\n    </div></div></div>\n  </div>\n  <span class=\"pb-sr\" data-status role=\"status\" aria-live=\"polite\"></span>\n</form>";

/** Card. Pass onLink({ number, expiry, cvc, brand, last4 }, { signal }); hand the values straight to your payment provider and never store them yourself. Throw to mark the card as refused. */
export default function CardPlate({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLCardPlate.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
