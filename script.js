// Logo glitch: short burst roughly every 20s, followed by a few seconds of red neon glow.
// The 20s timer restarts after each glitch. Disabled for prefers-reduced-motion.
(function () {
  "use strict";
  var logo = document.querySelector(".logo-animation");
  if (!logo) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var GLITCH_MS = 380, GLOW_MS = 3600, INTERVAL_MS = 20000;

  function glitch() {
    logo.classList.remove("logo-neon", "logo-glitch");
    void logo.offsetWidth;                       // restart animations
    logo.classList.add("logo-glitch");
    setTimeout(function () {
      logo.classList.remove("logo-glitch");
      logo.classList.add("logo-neon");           // blood-red glow right after the glitch
      setTimeout(function () { logo.classList.remove("logo-neon"); }, GLOW_MS);
      setTimeout(glitch, INTERVAL_MS);           // restart the 20s timer
    }, GLITCH_MS);
  }
  setTimeout(glitch, INTERVAL_MS);
})();

// Touch feedback: show the red neon state on finger press and keep it visible briefly (~0.45s),
// even when the tap navigates away or releases quickly. Cancelled when the user starts scrolling.
(function () {
  "use strict";
  var list = document.querySelector(".links");
  if (!list) return;
  var MIN_MS = 450, active = null, t0 = 0, timer = 0;

  function clear() {
    clearTimeout(timer);
    if (active) { active.classList.remove("is-pressed"); active = null; }
  }
  function release() {
    if (!active) return;
    var wait = Math.max(0, MIN_MS - (Date.now() - t0));
    clearTimeout(timer);
    timer = setTimeout(clear, wait);
  }
  list.addEventListener("pointerdown", function (e) {
    var li = e.target.closest("li");
    if (!li) return;
    clear();
    active = li; t0 = Date.now();
    li.classList.add("is-pressed");
  }, { passive: true });
  list.addEventListener("pointerup", release, { passive: true });
  list.addEventListener("pointercancel", clear, { passive: true });   // fires when a scroll gesture starts
  list.addEventListener("pointerleave", release, { passive: true });
  window.addEventListener("pagehide", clear);                         // clean state when coming back (bfcache)
})();
