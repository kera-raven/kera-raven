// Minimal enhancements: external links are already safe via rel="noopener noreferrer".
(function () {
  "use strict";
  // Fallback if the logo file is missing: hide broken image icon gracefully.
  var logo = document.querySelector(".logo");
  if (logo) logo.addEventListener("error", function () { logo.style.visibility = "hidden"; });
})();
