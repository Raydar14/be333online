/* ===========================================================
   BE333 - shared chrome + interactions
   Injects the header and footer into every page, marks the
   active nav link, runs the mobile menu, and reveals sections
   on scroll. Page content lives in each HTML file; only the
   shared chrome is injected here.
   =========================================================== */
(function () {
  "use strict";

  // Brand wordmark: zoomed lotus mark + combined BE333 mark, tightly kerned
  var BRAND_MARK =
    '<img class="brand__lotus" src="assets/logo/lotus-mark.svg" alt="" aria-hidden="true">' +
    '<img class="brand__be333" src="assets/logo/be333.svg"      alt="" aria-hidden="true">';

  // Nav links (one source of truth). external:true → renders as the gold
  // primary CTA, opens in a new tab, and is never marked aria-current.
  var LINKS = [
    { href: "index.html",      label: "Home" },
    { href: "research.html",   label: "Research" },
    { href: "https://be333.app", label: "Open App", external: true }
  ];

  // Which page are we on?
  function currentFile() {
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf("/") + 1);
    if (file === "" || file === "/") return "index.html";
    return file;
  }

  function buildHeader() {
    var cur = currentFile();
    var items = LINKS.map(function (l) {
      var active = !l.external && l.href === cur ? ' aria-current="page"' : "";
      var cls    = l.external ? ' class="btn btn--primary"' : "";
      var extra  = l.external ? ' target="_blank" rel="noopener"' : "";
      return '<a href="' + l.href + '"' + active + cls + extra + ">" + l.label + "</a>";
    }).join("");

    return (
      '<header class="site-header">' +
        '<div class="site-header__inner">' +
          '<a class="brand" href="index.html" aria-label="BE333 home">' +
            BRAND_MARK +
          "</a>" +
          '<nav class="nav" aria-label="Primary">' +
            '<button class="nav-toggle" aria-expanded="false" aria-controls="navlinks" aria-label="Menu">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' +
              '<path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
            "</button>" +
            '<div class="nav__links" id="navlinks">' + items + "</div>" +
          "</nav>" +
        "</div>" +
      "</header>"
    );
  }

  function buildFooter() {
    var year = new Date().getFullYear();
    return (
      '<footer class="site-footer">' +
        '<div class="site-footer__inner">' +
          "<div>" +
            '<a class="brand" href="index.html" aria-label="BE333 home">' +
              BRAND_MARK +
            "</a>" +
            '<p class="foot-tag">A 3-minute meditation habit, created by a clinical psychologist. Pause. Breathe. Be.</p>' +
          "</div>" +
          '<div class="foot-col">' +
            "<h4>Explore</h4>" +
            '<a href="index.html">Home</a>' +
            '<a href="research.html">The research</a>' +
            '<a href="download.html">Download</a>' +
          "</div>" +
          '<div class="foot-col">' +
            "<h4>Follow</h4>" +
            '<a href="https://www.instagram.com/be333app"    rel="me" target="_blank">Instagram</a>' +
            '<a href="https://www.tiktok.com/@be333app"      rel="me" target="_blank">TikTok</a>' +
            '<a href="https://www.youtube.com/@Be333app"     rel="me" target="_blank">YouTube</a>' +
            '<a href="https://www.facebook.com/Be333app"     rel="me" target="_blank">Facebook</a>' +
            '<a href="https://www.reddit.com/user/Be333app"  rel="me" target="_blank">Reddit</a>' +
          "</div>" +
        "</div>" +
        '<div class="foot-bottom">' +
          '<div class="foot-bottom__inner">' +
            "<span>&copy; " + year + " BE333 &middot; Just sit &amp; be for 3.</span>" +
            '<span>Hand-built &middot; <a href="download.html">Get the app</a></span>' +
          "</div>" +
        "</div>" +
      "</footer>"
    );
  }

  function injectChrome() {
    document.body.insertAdjacentHTML("afterbegin", buildHeader());
    document.body.insertAdjacentHTML("beforeend", buildFooter());
  }

  function wireMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("navlinks");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function wireReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  function init() {
    injectChrome();
    wireMobileNav();
    wireReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
