import { useEffect, useRef } from 'react';
import './buttons.css';
import './buttons.js';

const markup = "<div class=\"pb pb-f pb-search ss\" data-phase=\"idle\">\n  <div class=\"ss-plate\">\n    <div class=\"ss-clip ss-shade-clip\" aria-hidden=\"true\"><div class=\"ss-shade\"></div></div>\n    <div class=\"ss-clip\" aria-hidden=\"true\"><div class=\"ss-sheet\"></div></div>\n    <div class=\"ss-head\"><div class=\"ss-well\">\n      <span class=\"ss-ring\" aria-hidden=\"true\"></span>\n      <input type=\"text\" role=\"combobox\" aria-label=\"Search components\" aria-expanded=\"false\" aria-autocomplete=\"list\" aria-controls=\"pb-search-list\" autocomplete=\"off\" spellcheck=\"false\" placeholder=\"Search components\" data-bwignore=\"true\" data-1p-ignore=\"true\" data-lpignore=\"true\" data-form-type=\"other\">\n    </div></div>\n    <div class=\"ss-tools\"><span class=\"ss-count\" aria-hidden=\"true\"><span></span></span><button class=\"ss-clear\" type=\"button\" aria-label=\"Clear search\" tabindex=\"-1\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"m6 6 12 12M18 6 6 18\"/></svg></button></div>\n    <div class=\"ss-reveal\"><div class=\"ss-list\" id=\"pb-search-list\" role=\"listbox\" aria-label=\"Results\"><span class=\"ss-knob\" aria-hidden=\"true\"></span><p class=\"ss-none\"></p></div></div>\n  </div>\n  <span class=\"pb-sr\" role=\"status\" aria-live=\"polite\"></span>\n</div>";

/** Search. Pass items, as strings or { name, tag }, or search(query, { signal }) for server results. suggest fills the list before typing. onPick(item) runs when a result is chosen. */
export default function Search({ options = {}, className, style }) {
  const host = useRef(null), latest = useRef(options);
  latest.current = options;
  useEffect(() => {
    const live = Object.fromEntries(Object.keys(latest.current).map(key => [key, typeof latest.current[key] === 'function' ? (...args) => latest.current[key](...args) : latest.current[key]]));
    const controller = globalThis.SLSearch.mount(host.current.firstElementChild, live);
    return () => controller.destroy();
  }, []);
  return <div ref={host} className={className} style={style} dangerouslySetInnerHTML={{ __html: markup }} />;
}
