import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-billing bl\" data-period=\"monthly\">\n  <div class=\"bl-price\"><span class=\"bl-num\"><span class=\"mo\">$15</span><span class=\"yr\" aria-hidden=\"true\">$12</span></span><span class=\"bl-per\">/ month</span></div>\n  <div class=\"bl-plate\">\n    <div class=\"bl-seg\" role=\"radiogroup\" aria-label=\"Billing period\"><i></i>\n      <button class=\"bl-opt\" type=\"button\" role=\"radio\" aria-checked=\"true\" data-period=\"monthly\">Monthly</button>\n      <button class=\"bl-opt\" type=\"button\" role=\"radio\" aria-checked=\"false\" tabindex=\"-1\" data-period=\"yearly\">Yearly</button>\n    </div>\n  </div>\n  <div class=\"bl-note\"><span class=\"mo\">Save 20% with Yearly</span><span class=\"yr\" aria-hidden=\"true\">You save $36 a year</span></div>\n</div>";

/** Billing. Pass prices and notes for your plan and read onChange(period), which gives 'monthly' or 'yearly'. Set --bl-text and --bl-note on the root to match a dark page. */
export default function Billing({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLBilling.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
