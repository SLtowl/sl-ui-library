import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-cart\" data-state=\"idle\">\n  <button class=\"pb-btn pb-add\" type=\"button\"><span class=\"pb-t\" data-label=\"idle\">Add to cart</span></button>\n  <div class=\"pb-stepper\" role=\"group\" aria-label=\"Quantity\">\n    <button class=\"pb-step\" type=\"button\" data-step=\"-1\" aria-label=\"Remove one\" tabindex=\"-1\">−</button>\n    <span class=\"pb-qty\"><span class=\"pb-n\"><span>1</span></span> in cart</span>\n    <button class=\"pb-step\" type=\"button\" data-step=\"1\" aria-label=\"Add one\" tabindex=\"-1\">+</button>\n  </div>\n  <span class=\"pb-sr\" data-status role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Add to cart. Pass onChange(quantity) to update the cart; 0 means removed. Set max to limit the quantity. */
export default function Cart({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLCart.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
