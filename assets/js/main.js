/* Estep's Aerial — site behavior (no build step, no dependencies) */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");
  var CFG = window.SITE_CONFIG || {};
  var BASE = document.body.getAttribute("data-base") || "";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var SERVICES = {
    "real-estate": "Real Estate & Property Photography",
    "construction": "Construction Progress Monitoring",
    "documentation": "Roof & Property Documentation",
    "video": "Cinematic Drone Video",
    "business": "Business & Event Promotion",
    "flight-data": "Flight Data & Reporting",
    "other": "Not sure yet / Something else"
  };

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function asset(p) { if (!p) return ""; return /^(https?:|\/|data:|blob:)/.test(p) ? p : BASE + p; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function imgSet(o, sizes) {
    if (!o) return { src: "" };
    if (o.file && o.widths && o.widths.length) {
      var w = o.widths.slice().sort(function (a, b) { return a - b; });
      return {
        src: asset(o.file + "-" + w[Math.min(1, w.length - 1)] + ".webp"),
        full: asset(o.file + "-" + w[w.length - 1] + ".webp"),
        srcset: w.map(function (x) { return asset(o.file + "-" + x + ".webp") + " " + x + "w"; }).join(", "),
        sizes: sizes || "(max-width: 700px) 100vw, 33vw"
      };
    }
    return { src: asset(o.src), full: asset(o.full || o.src) };
  }
  function imgTag(o, sizes, extra) {
    var s = imgSet(o, sizes);
    return '<img src="' + esc(s.src) + '"' + (s.srcset ? ' srcset="' + esc(s.srcset) + '" sizes="' + esc(s.sizes) + '"' : "") +
      ' alt="' + esc(o.alt || "") + '" loading="lazy" decoding="async" width="1600" height="1000"' + (extra || "") + ">";
  }
  function youtubeId(url) {
    if (!url) return "";
    var m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : (/^[A-Za-z0-9_-]{11}$/.test(url) ? url : "");
  }
  function ytEmbed(id) { return "https://www.youtube-nocookie.com/embed/" + id + "?rel=0&modestbranding=1"; }

  /* ---------- config-driven text ---------- */
  $$("[data-config]").forEach(function (el) { var v = CFG[el.getAttribute("data-config")]; if (v) el.textContent = v; });
  $$("[data-email]").forEach(function (el) {
    var e = CFG.contactEmail || "bestep@estepssolutionsllc.com";
    if (el.tagName === "A") el.href = "mailto:" + e;
    var t = $(".email-text", el) || el; t.textContent = e;
  });
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- header & nav ---------- */
  var header = $(".site-header");
  if (header && !header.classList.contains("solid")) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }
  var menuBtn = $(".menu-btn"), menu = $("#nav-links");
  if (menuBtn && menu) {
    var setMenu = function (open) { menu.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", open ? "true" : "false"); menuBtn.innerHTML = open ? "&times;" : "&#9776;"; };
    menuBtn.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
    $$("a", menu).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); menuBtn.focus(); } });
  }

  /* ---------- reveal on scroll ---------- */
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); }

  /* ---------- hero media ---------- */
  var heroMedia = $("#hero-media");
  if (heroMedia && CFG.hero) {
    var h = CFG.hero, hero = heroMedia.closest(".hero");
    if ((h.videoMp4 || h.videoWebm) && !reduceMotion) {
      var v = document.createElement("video");
      v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true; v.setAttribute("playsinline", ""); v.setAttribute("muted", "");
      v.setAttribute("aria-hidden", "true"); v.preload = "metadata";
      if (h.poster) v.poster = asset(h.poster);
      if (h.videoWebm) { var s1 = document.createElement("source"); s1.src = asset(h.videoWebm); s1.type = "video/webm"; v.appendChild(s1); }
      if (h.videoMp4) { var s2 = document.createElement("source"); s2.src = asset(h.videoMp4); s2.type = "video/mp4"; v.appendChild(s2); }
      heroMedia.appendChild(v); hero.classList.add("has-media");
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    } else if (h.poster) {
      var im = new Image(); im.src = asset(h.poster); im.alt = h.posterAlt || ""; im.setAttribute("fetchpriority", "high");
      heroMedia.appendChild(im); hero.classList.add("has-media");
    }
  }

  /* ---------- about portrait ---------- */
  var portrait = $("#portrait");
  if (portrait && CFG.pilotPortrait) {
    portrait.innerHTML = '<img src="' + esc(asset(CFG.pilotPortrait)) + '" alt="Brandon Estep, FAA Part 107 remote pilot for Estep\'s Aerial" loading="lazy" decoding="async">';
  }

  /* ---------- Flight Studio video ---------- */
  var fsBox = $("#fs-visual");
  if (fsBox && CFG.flightStudio) {
    var fid = youtubeId(CFG.flightStudio.youtubeId);
    if (fid) fsBox.innerHTML = '<iframe src="' + ytEmbed(fid) + '" title="Flight Studio demonstration video" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    $$("[data-fs-link]").forEach(function (a) { a.href = CFG.flightStudio.url || "https://flightstudio-us.com/"; });
  }

  /* ---------- sample report & package prices ---------- */
  $$("[data-sample-report]").forEach(function (el) {
    if (!CFG.sampleReportUrl) { el.hidden = true; return; }
    var a = $("a", el); if (a) a.href = asset(CFG.sampleReportUrl);
    var tag = $("[data-demo-tag]", el); if (tag) tag.hidden = !CFG.sampleReportIsDemo;
  });
  $$("[data-price]").forEach(function (el) {
    var k = el.getAttribute("data-price"), pk = (CFG.packages || {})[k];
    el.textContent = pk && pk.price ? pk.price : "Custom quote";
  });

  /* ---------- service preselect ---------- */
  function selectService(id) {
    if (!id || !SERVICES[id]) return;
    $$("select[name='service']").forEach(function (sel) { sel.value = id; });
  }
  try { selectService(new URLSearchParams(location.search).get("service")); } catch (e) {}
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-service]");
    if (t) selectService(t.getAttribute("data-service"));
  });

  /* ---------- "help me choose" ---------- */
  var tips = {
    sell: ["Real Estate & Property Photography", "Aerial photos and a short video help a listing stand out and show the home, lot and neighborhood.", "real-estate"],
    build: ["Construction Progress Monitoring", "Scheduled flights from the same viewpoints give you a clear, dated record of your build.", "construction"],
    roof: ["Roof & Property Documentation", "Detailed photos of roofs and hard-to-reach areas, without anyone climbing a ladder.", "documentation"],
    promo: ["Cinematic Video & Promotions", "Eye-catching aerial footage for your website, events and social media.", "video"],
    other: ["Let's talk it through", "Family land, a special place or a creative idea: tell me what you're picturing and we'll plan it together.", "other"]
  };
  var answer = $("#answer");
  $$(".choice").forEach(function (c) {
    c.addEventListener("click", function () {
      $$(".choice").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      c.setAttribute("aria-pressed", "true");
      var t = tips[c.getAttribute("data-k")]; if (!t || !answer) return;
      $("h3", answer).textContent = "Sounds like: " + t[0];
      $("p", answer).textContent = t[1];
      var b = $("[data-answer-quote]", answer); b.setAttribute("data-service", t[2]);
      var more = $("[data-answer-more]", answer); if (more) more.hidden = t[2] !== "construction";
      answer.hidden = false;
    });
  });

  /* ---------- lightbox ---------- */
  var LB = (function () {
    var root = document.createElement("div");
    root.className = "lb"; root.setAttribute("role", "dialog"); root.setAttribute("aria-modal", "true"); root.setAttribute("aria-label", "Image viewer");
    root.innerHTML = '<button class="lb-btn lb-close" aria-label="Close viewer">&times;</button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous image">&#8249;</button>' +
      '<div class="lb-stage"><div class="lb-holder"></div><p class="lb-cap"></p><p class="lb-count" aria-live="polite"></p></div>' +
      '<button class="lb-btn lb-next" aria-label="Next image">&#8250;</button>';
    document.body.appendChild(root);
    var items = [], idx = 0, lastFocus = null, holder = $(".lb-holder", root);
    function render() {
      var it = items[idx];
      if (it.type === "video") {
        holder.innerHTML = '<iframe class="lb-frame" src="' + ytEmbed(it.id) + '&autoplay=1" title="' + esc(it.caption || "Video") + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
      } else {
        var s = imgSet(it.img, "100vw");
        holder.innerHTML = '<img class="lb-media" src="' + esc(s.full || s.src) + '"' + (s.srcset ? ' srcset="' + esc(s.srcset) + '" sizes="100vw"' : "") + ' alt="' + esc(it.img.alt || "") + '">';
      }
      $(".lb-cap", root).innerHTML = (it.title ? "<b>" + esc(it.title) + "</b>" + (it.caption ? " · " : "") : "") + esc(it.caption || "");
      $(".lb-count", root).textContent = items.length > 1 ? (idx + 1) + " of " + items.length : "";
      $(".lb-prev", root).hidden = $(".lb-next", root).hidden = items.length < 2;
    }
    function setInert(on) { $$("body > header, body > main, body > footer, .skip").forEach(function (el) { if (on) el.setAttribute("inert", ""); else el.removeAttribute("inert"); }); }
    function open(list, start) {
      items = list; idx = start || 0; lastFocus = document.activeElement;
      render(); root.classList.add("open"); setInert(true); document.body.style.overflow = "hidden";
      $(".lb-close", root).focus();
    }
    function close() {
      root.classList.remove("open"); holder.innerHTML = ""; setInert(false); document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function go(d) { if (items.length < 2) return; idx = (idx + d + items.length) % items.length; render(); }
    $(".lb-close", root).addEventListener("click", close);
    $(".lb-prev", root).addEventListener("click", function () { go(-1); });
    $(".lb-next", root).addEventListener("click", function () { go(1); });
    root.addEventListener("click", function (e) { if (e.target === root || e.target.classList.contains("lb-stage")) close(); });
    document.addEventListener("keydown", function (e) {
      if (!root.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Tab") {
        var f = $$("button:not([hidden]), iframe", root); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var sx = null;
    root.addEventListener("pointerdown", function (e) { sx = e.clientX; });
    root.addEventListener("pointerup", function (e) { if (sx === null) return; var dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); });
    return { open: open };
  })();

  /* ---------- portfolio ---------- */
  var gallery = $("#gallery");
  if (gallery) {
    var projects = (window.PORTFOLIO_PROJECTS || []).slice().sort(function (a, b) {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || String(b.date || "").localeCompare(String(a.date || ""));
    });
    var cats = window.PORTFOLIO_CATEGORIES || [{ id: "all", label: "All Projects" }];
    var catLabel = {}; cats.forEach(function (c) { catLabel[c.id] = c.label; });
    var filterBar = $("#filters"), current = "all";
    filterBar.innerHTML = cats.map(function (c) {
      var n = c.id === "all" ? projects.length : projects.filter(function (p) { return p.category === c.id; }).length;
      return '<button class="filter" type="button" data-f="' + c.id + '" aria-pressed="' + (c.id === "all") + '">' + esc(c.label) + '<span class="count">' + n + "</span></button>";
    }).join("");
    function fmtDate(d) {
      if (!d) return ""; var p = String(d).split("-"); if (p.length < 2) return d;
      var m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(p[1], 10) - 1];
      return m ? m + " " + p[0] : d;
    }
    function draw() {
      var list = projects.filter(function (p) { return current === "all" || p.category === current; });
      if (!list.length) {
        var lbl = catLabel[current] || "this category";
        gallery.innerHTML = '<div class="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 7h3l2-3h8l2 3h3v13H3z"/><circle cx="12" cy="13" r="4"/></svg>' +
          "<h3>" + esc(lbl) + " projects are on the way</h3><p>New work is being edited and will be published here soon. Want your project to be one of the first?</p>" +
          '<a class="btn btn-primary btn-sm" href="#quote" data-service="' + ({ "real-estate": "real-estate", construction: "construction", documentation: "documentation", video: "video", commercial: "business" }[current] || "other") + '">Discuss your project</a></div>';
        return;
      }
      gallery.innerHTML = list.map(function (p, i) {
        var meta = ['<span class="proj-cat">' + esc(catLabel[p.category] || p.category) + "</span>"];
        if (p.location) meta.push("<span>" + esc(p.location) + "</span>");
        if (p.date) meta.push("<span>" + esc(fmtDate(p.date)) + "</span>");
        return '<button type="button" class="proj reveal in" data-i="' + projects.indexOf(p) + '" aria-label="Open ' + esc(p.title) + ' gallery">' +
          '<div class="proj-thumb">' + imgTag(p.thumbnail || (p.images || [])[0] || {}, "(max-width: 700px) 100vw, 33vw") + "</div>" +
          (p.sampleProject ? '<span class="badge">Demo · Illustration</span>' : "") +
          (youtubeId(p.videoUrl) ? '<span class="badge video">&#9654; Video</span>' : "") +
          '<div class="proj-info"><div class="proj-meta">' + meta.join("<span aria-hidden=\"true\">·</span>") + "</div><h3>" + esc(p.title) + "</h3>" +
          (p.description ? "<p>" + esc(p.description) + "</p>" : "") + "</div></button>";
      }).join("");
    }
    filterBar.addEventListener("click", function (e) {
      var b = e.target.closest(".filter"); if (!b) return;
      current = b.getAttribute("data-f");
      $$(".filter", filterBar).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      draw();
    });
    gallery.addEventListener("click", function (e) {
      var card = e.target.closest(".proj"); if (!card) return;
      var p = projects[+card.getAttribute("data-i")]; if (!p) return;
      var items = (p.images || []).map(function (im) { return { type: "img", img: im, title: p.title, caption: im.caption || "" }; });
      var vid = youtubeId(p.videoUrl);
      if (vid) items.unshift({ type: "video", id: vid, title: p.title, caption: "Video" });
      if (!items.length && p.thumbnail) items.push({ type: "img", img: p.thumbnail, title: p.title });
      if (items.length) LB.open(items, 0);
    });
    draw();
  }

  /* ---------- construction timeline ---------- */
  var tl = $("#timeline"), SC = window.CONSTRUCTION_SHOWCASE;
  if (tl && SC && SC.visits && SC.visits.length) {
    var panel = $("#tl-panel"), cur = 0;
    if (!SC.sample) $$("[data-demo-only]").forEach(function (el) { el.hidden = true; });
    var note = $("#sc-note"); if (note && SC.sampleNote) note.textContent = SC.sampleNote;
    tl.innerHTML = SC.visits.map(function (v, i) {
      return '<button type="button" role="tab" class="tl-btn" id="tab-' + i + '" aria-controls="tl-panel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '"><b>' + esc(v.label) + "</b><span>" + esc(v.title) + "</span></button>";
    }).join("");
    var check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
    function visitItems(v) {
      return [{ type: "img", img: v.image, title: v.label + ": " + v.title, caption: v.when || "" }].concat((v.extra || []).map(function (x) { return { type: "img", img: x, title: v.label, caption: x.caption || "" }; }));
    }
    function show(i, focus) {
      cur = i; var v = SC.visits[i];
      $$(".tl-btn", tl).forEach(function (b, j) { b.setAttribute("aria-selected", j === i ? "true" : "false"); b.tabIndex = j === i ? 0 : -1; });
      panel.setAttribute("aria-labelledby", "tab-" + i);
      panel.innerHTML = '<button type="button" class="tl-main" aria-label="View ' + esc(v.label) + ' images full screen">' + imgTag(v.image, "(max-width: 900px) 100vw, 66vw") + '<span class="zoom">&#x2922; Full screen</span></button>' +
        '<div class="tl-info"><span class="when">' + esc(v.label) + (v.when ? " · " + esc(v.when) : "") + "</span><h3>" + esc(v.title) + "</h3><p>" + esc(v.description) + "</p>" +
        "<ul>" + (v.milestones || []).map(function (m) { return "<li>" + check + "<span>" + esc(m) + "</span></li>"; }).join("") + "</ul>" +
        ((v.extra || []).length ? '<div class="tl-thumbs">' + v.extra.map(function (x, k) { return '<button type="button" class="tl-thumb" data-k="' + (k + 1) + '" aria-label="View ' + esc(x.caption || "supporting image") + '">' + imgTag(x, "120px") + "</button>"; }).join("") + "</div>" : "") +
        "</div>";
      $(".tl-main", panel).addEventListener("click", function () { LB.open(visitItems(v), 0); });
      $$(".tl-thumb", panel).forEach(function (t) { t.addEventListener("click", function () { LB.open(visitItems(v), +t.getAttribute("data-k")); }); });
      if (focus) $$(".tl-btn", tl)[i].focus();
    }
    tl.addEventListener("click", function (e) { var b = e.target.closest(".tl-btn"); if (b) show($$(".tl-btn", tl).indexOf(b)); });
    tl.addEventListener("keydown", function (e) {
      var n = SC.visits.length;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); show((cur + 1) % n, true); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); show((cur - 1 + n) % n, true); }
      else if (e.key === "Home") { e.preventDefault(); show(0, true); }
      else if (e.key === "End") { e.preventDefault(); show(n - 1, true); }
    });
    show(0);

    /* before / after */
    var cw = $("#compare-wrap"), c = SC.compare || {};
    var A = SC.visits[(c.before || 0) - 1], B = SC.visits[(c.after || 0) - 1];
    if (cw && c.enabled && A && B && A.image && B.image) {
      var box = $("#compare", cw);
      box.innerHTML = imgTag(A.image, "100vw", ' class="before"') + imgTag(B.image, "100vw", ' class="after"') +
        '<div class="handle" aria-hidden="true"></div><span class="cmp-label l">' + esc(A.label) + '</span><span class="cmp-label r">' + esc(B.label) + "</span>" +
        '<input type="range" min="0" max="100" value="50" aria-label="Compare ' + esc(A.label) + " and " + esc(B.label) + ': move left or right to reveal more of each">';
      $$("img", box).forEach(function (im) { im.removeAttribute("loading"); });
      var rng = $("input", box);
      var upd = function () { box.style.setProperty("--pos", rng.value + "%"); rng.setAttribute("aria-valuetext", rng.value + "% " + B.label); };
      rng.addEventListener("input", upd); upd();
      var cap = $("#compare-cap", cw); if (cap) cap.textContent = "Drag the handle, or use the arrow keys, to compare " + A.label + " (" + A.title.toLowerCase() + ") with " + B.label + " (" + B.title.toLowerCase() + ").";
    } else if (cw) { cw.hidden = true; }
  }

  /* ---------- forms ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  $$("form[data-quote-form]").forEach(function (form) {
    var status = $(".form-status", form), btn = $("button[type=submit]", form), busy = false, lastSent = 0;
    var btnLabel = btn.innerHTML;
    function setErr(field, msg) {
      var wrap = field.closest(".field"), err = wrap && $(".err", wrap);
      if (wrap) wrap.classList.toggle("invalid", !!msg);
      field.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) err.textContent = msg || "";
    }
    function check(field) {
      var v = (field.value || "").trim(), msg = "";
      if (field.required && !v) msg = "Please fill in your " + (field.getAttribute("data-label") || "answer") + ".";
      else if (v && field.type === "email" && !EMAIL_RE.test(v)) msg = "Please enter a valid email address, like name@example.com.";
      else if (v && field.type === "url" && !/^https?:\/\/\S+\.\S+/.test(v)) msg = "Please enter a full link starting with https://";
      else if (v && field.type === "tel" && v.replace(/\D/g, "").length < 7) msg = "That phone number looks too short.";
      setErr(field, msg); return !msg;
    }
    $$("input, select, textarea", form).forEach(function (f) {
      if (f.classList.contains("hp-input") || f.type === "checkbox" || f.type === "hidden") return;
      f.addEventListener("blur", function () { if (f.value) check(f); });
      f.addEventListener("input", function () { if (f.getAttribute("aria-invalid") === "true") check(f); });
    });
    function show(kind, html) { status.className = "form-status " + kind; status.innerHTML = html; status.hidden = false; status.focus(); }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (busy) return;
      var hp = $(".hp-input", form); if (hp && hp.value) return; // bot
      var fields = $$("input, select, textarea", form).filter(function (f) { return !f.classList.contains("hp-input") && f.type !== "checkbox" && f.type !== "hidden"; });
      var ok = true, firstBad = null;
      fields.forEach(function (f) { if (!check(f)) { ok = false; firstBad = firstBad || f; } });
      if (!ok) { firstBad.focus(); return; }
      if (Date.now() - lastSent < 30000) { show("info", "Your request was just sent. Please wait a few seconds before sending another."); return; }

      var data = new FormData(form);
      var svc = form.elements.service ? (SERVICES[form.elements.service.value] || form.elements.service.value) : (form.getAttribute("data-subject") || "Quote request");
      var subject = "Estep's Aerial quote request: " + svc;
      data.set("_subject", subject);
      if (form.elements.service) data.set("service", svc);
      var email = CFG.contactEmail || "bestep@estepssolutionsllc.com";

      if (!CFG.formEndpoint) {
        var lines = [];
        data.forEach(function (v, k) { if (k.charAt(0) !== "_" && String(v).trim()) lines.push(k.replace(/_/g, " ").replace(/^\w/, function (c) { return c.toUpperCase(); }) + ": " + v); });
        var href = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
        show("info", "<b>One more step:</b> your email app should open with your request filled in. Press <b>Send</b> there to deliver it. If nothing opened, email <a href=\"" + esc(href) + "\">" + esc(email) + "</a> directly.");
        window.location.href = href;
        return;
      }

      busy = true; btn.disabled = true; btn.textContent = "Sending…";
      fetch(CFG.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (res.ok) {
            lastSent = Date.now();
            var name = (form.elements.name && form.elements.name.value.trim().split(" ")[0]) || "there";
            form.reset(); $$("select[name='service']", form).forEach(function (s) { s.selectedIndex = 0; });
            show("ok", "<b>Thanks, " + esc(name) + "!</b> Your request was received. You'll get a reply at the email you provided, usually within one business day.");
          } else {
            return res.json().catch(function () { return {}; }).then(function (j) {
              var msg = j && j.errors ? j.errors.map(function (x) { return x.message; }).join(" ") : "";
              show("bad", "<b>Sorry, your request didn't go through.</b> " + esc(msg) + " Please try again, or email <a href=\"mailto:" + esc(email) + "\">" + esc(email) + "</a>.");
            });
          }
        })
        .catch(function () { show("bad", "<b>We couldn't reach the server.</b> Check your connection and try again, or email <a href=\"mailto:" + esc(email) + "\">" + esc(email) + "</a>."); })
        .then(function () { busy = false; btn.disabled = false; btn.innerHTML = btnLabel; });
    });
  });
})();
