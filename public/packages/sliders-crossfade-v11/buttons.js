(() => {
  'use strict';
  function mount(root, options = {}) {
    if (!root || root.dataset.kind !== 'sliders-crossfade-v11') throw new TypeError('Expected the Source crossfade root.');
    if (options.onChange !== undefined && typeof options.onChange !== 'function') throw new TypeError('onChange must be a function.');
    if (options.disabled !== undefined && typeof options.disabled !== 'boolean') throw new TypeError('disabled must be a boolean.');
    const fields = [["Mix toward source B",0,100,1,50,"%"]];
    const q = selector => root.querySelector(selector);
    const inputs = [...root.querySelectorAll('input[type="range"]')];
    const buttons = [...root.querySelectorAll('button[data-action]')];
    if (inputs.length !== fields.length) throw new TypeError('Incomplete range markup.');
    const view = root.ownerDocument.defaultView;
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
    const snap = (v, i) => { const [,min,max,step] = fields[i]; return Number(clamp(min + Math.round((v-min)/step)*step,min,max).toFixed(6)); };
    function validate(next) {
      if (!Array.isArray(next) || next.length !== fields.length || next.some(v => typeof v !== 'number' || !Number.isFinite(v))) throw new TypeError('values must contain '+fields.length+' finite numbers.');
      return next.map(snap);
    }
    let values = validate(options.values ?? fields.map(f => f[4]));
    let flags = {"equalPower":true}, disabled = options.disabled ?? false, destroyed = false;
    function normalize() {  values = values.map(v => Number(v.toFixed(6))); }
    normalize();
    const initial = [...values], initialDisabled = disabled;
    // A local disposal event replaces an earlier mount without a global registry.
    root.dispatchEvent(new view.CustomEvent('sl:dispose'));
    const removers = [];
    function listen(element, type, handler) { element.addEventListener(type,handler); removers.push(() => element.removeEventListener(type,handler)); }
    const text = (name, value) => { q('[data-'+name+']').textContent = String(value); };
    const button = name => q('[data-action="'+name+'"]');
    function bounds(i) { return [fields[i][1],fields[i][2]]; }
    function gains(){const t=values[0]/100;return flags.equalPower ? [t===1?0:Math.cos(t*Math.PI/2),t===0?0:Math.sin(t*Math.PI/2)] : [1-t,t];} function db(v){return v===0 ? "−∞ dB" : Number((20*Math.log10(v)).toFixed(1)).toFixed(1)+" dB";}
    function format(v, i) { return (fields[i][3]<1 ? v.toFixed(1) : String(v))+" "+fields[i][5]; }
    function derived() { return { gains:gains(), equalPower:flags.equalPower }; }
    function state() { return { values:[...values], disabled, ...derived() }; }
    function render() {
      root.dataset.disabled = String(disabled);
      inputs.forEach((input,i) => {
        input.value = String(values[i]); input.disabled = disabled;
        const [min,max] = bounds(i);
        input.setAttribute('aria-valuemin',String(min)); input.setAttribute('aria-valuemax',String(max));
        input.setAttribute('aria-valuetext',format(values[i],i));
        q('[data-value="'+i+'"]').textContent = format(values[i],i);
        q('[data-track="'+i+'"]').style.setProperty('--fill', ((values[i]-fields[i][1])/(fields[i][2]-fields[i][1])*100)+'%');
      });
      buttons.forEach(b => { b.disabled = disabled; });
      const [a,b]=gains(); text("a",a.toFixed(3)+"×");text("b",b.toFixed(3)+"×");text("adb",db(a));text("bdb",db(b)); q("[data-meter-a]").style.transform=`scaleX(${a})`;q("[data-meter-b]").style.transform=`scaleX(${b})`;text("summary",flags.equalPower ? "Equal power · A² + B² = "+(a*a+b*b).toFixed(2) : "Linear · A + B = "+(a+b).toFixed(2));button("curve").setAttribute("aria-pressed",String(flags.equalPower));
    }
    function emit() {
      root.dispatchEvent(new view.CustomEvent('sliderchange', { bubbles:true, composed:true, detail:state() }));
      options.onChange?.(state());
    }
    function change(i, value) {
      if (destroyed || disabled || inputs[i].disabled) return;
      const [min,max] = bounds(i), next = Number(clamp(snap(value,i),min,max).toFixed(6));
      const before = values.join(',');
      values[i] = next;
      values = values.map(v => Number(v.toFixed(6)));
      render(); if (before !== values.join(',')) emit();
    }
    inputs.forEach((input,i) => {
      listen(input,'input',() => change(i,input.valueAsNumber));
      listen(input,'keydown',event => {
        if (disabled || input.disabled) return;
        const direction = { ArrowRight:1, ArrowUp:1, ArrowLeft:-1, ArrowDown:-1, PageUp:10, PageDown:-10 }[event.key];
        if (direction === undefined && event.key !== 'Home' && event.key !== 'End') return;
        event.preventDefault();
        const [min,max] = bounds(i);
        change(i,event.key === 'Home' ? min : event.key === 'End' ? max : values[i] + direction*fields[i][3]);
      });
    });
    buttons.forEach(b => listen(b,'click',() => {
      if (destroyed || disabled || b.disabled) return;
      const action = b.dataset.action, before = JSON.stringify(state());
      if(action==="curve") flags.equalPower=!flags.equalPower; if(action==="center") values=[50];
      render(); if (before !== JSON.stringify(state())) emit();
    }));
    function reset() { if (destroyed) return; values=[...initial]; flags={"equalPower":true}; disabled=initialDisabled; render(); }
    function destroy() { if (destroyed) return; destroyed=true; removers.splice(0).forEach(remove=>remove()); }
    listen(root,'sl:dispose',destroy);
    render();
    return {
      get state() { return state(); }, reset, destroy,
      setValues(next) { if (destroyed) return; values=validate(next); normalize(); render(); },
      setDisabled(next) { if (destroyed) return; if (typeof next !== 'boolean') throw new TypeError('disabled must be a boolean.'); disabled=next; render(); }
    };
  }
  function mountPreview(root) { return mount(root); }
  window.SLComponent = { mount, mountPreview };
})();
