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
