/* ===========================================================
   BE333 - shared chrome + interactions
   Injects the header and footer into every page, marks the
   active nav link, runs the mobile menu, and reveals sections
   on scroll. Page content lives in each HTML file; only the
   shared chrome is injected here.
   =========================================================== */
(function () {
  "use strict";

  // Lotus mark reused in header + footer (matches be333.app branding)
  var LOTUS = '<img class="brand__lotus" src="assets/lotus.svg" alt="" aria-hidden="true">';

  // Nav links (one source of truth)
  var LINKS = [
    { href: "index.html",    label: "Home" },
    { href: "research.html", label: "Research" },
    { href: "download.html", label: "Download" }
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
      var active = l.href === cur ? ' aria-current="page"' : "";
      var cls = l.href === "download.html" ? ' class="btn btn--primary"' : "";
      return '<a href="' + l.href + '"' + active + cls + ">" + l.label + "</a>";
    }).join("");

    return (
      '<header class="site-header">' +
        '<div class="site-header__inner">' +
          '<a class="brand" href="index.html" aria-label="BE333 home">' +
            LOTUS +
            '<span class="brand__word">BE<b>333</b></span>' +
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
              LOTUS + '<span class="brand__word">BE<b>333</b></span>' +
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
            // TODO: replace # with your real profile URLs
            '<a href="#" rel="me">Bluesky</a>' +
            '<a href="#" rel="me">Goodreads</a>' +
            '<a href="#" rel="me">Reddit</a>' +
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
