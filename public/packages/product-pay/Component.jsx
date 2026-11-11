import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-pay\" data-state=\"idle\" data-amount=\"49\" data-currency=\"$\">\n  <button class=\"pb-btn\" type=\"button\">\n    <span class=\"pb-fill\" aria-hidden=\"true\"></span>\n    <span class=\"pb-t\" data-label=\"idle\">Pay $49</span>\n    <span class=\"pb-t\" data-label=\"amount\" aria-hidden=\"true\">$49.00</span>\n    <span class=\"pb-t\" data-label=\"done\" aria-hidden=\"true\">Paid</span>\n    <span class=\"pb-t\" data-label=\"fail\" aria-hidden=\"true\">Card declined</span>\n  </button>\n  <span class=\"pb-sr\" data-status role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Pay. Pass onPay({ amount, signal }); resolve once the payment is confirmed, reject when it is declined. The bar waits for your answer. */
export default function Pay({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLPay.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
