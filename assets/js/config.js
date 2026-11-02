/* =====================================================================
   ESTEP'S AERIAL — SITE SETTINGS
   Edit the values below to change site-wide settings. No other code
   needs to change. Leave a value as "" to hide that feature.
   ===================================================================== */
window.SITE_CONFIG = {

  // ---- Contact & quote forms -----------------------------------------
  // Paste your Formspree form URL here (e.g. "https://formspree.io/f/abcdwxyz").
  // Until this is set, the forms open the visitor's email app instead,
  // and the site tells them so (it never claims a message was sent).
  formEndpoint: "https://formspree.io/f/xpppoabq",
  contactEmail: "bestep@estepssolutionsllc.com",

  // ---- Service area ----------------------------------------------------
  serviceAreaShort: "Stafford, Fredericksburg & Spotsylvania, VA",
  serviceAreaLong: "Stafford, Fredericksburg, Spotsylvania and surrounding Northern Virginia communities",

  // ---- Homepage hero background ---------------------------------------
  // Use YOUR OWN footage only. Put files in /assets/hero/ and list them here.
  // poster = still image shown while the video loads (and on reduced-motion devices).
  hero: {
    videoMp4: "",      // e.g. "assets/hero/hero.mp4"
    videoWebm: "",     // e.g. "assets/hero/hero.webm"  (optional)
    poster: "assets/projects/golden-hour-water/photo-01-1920.webp",
    posterAlt: "Aerial view at sunset over a calm lake in Virginia"
  },

  // ---- About section ----------------------------------------------------
  // Your portrait, e.g. "assets/img/brandon.webp". Leave "" to show the logo instead.
  pilotPortrait: "",

  // ---- Flight Studio showcase -------------------------------------------
  flightStudio: {
    url: "https://flightstudio-us.com/",
    youtubeId: ""      // e.g. "dQw4w9WgXcQ" — the part after watch?v= in a YouTube link
  },

  // ---- Construction monitoring ------------------------------------------
  // Link to the sample report PDF. Set to "" to hide the button.
  sampleReportUrl: "assets/reports/sample-construction-progress-report.pdf",
  sampleReportIsDemo: true,   // set to false once you replace it with a real (client-approved) report

  // Package prices. Leave "" to show "Request Pricing" only.
  packages: {
    single:  { price: "" },   // e.g. "Starting at $___"
    monthly: { price: "" },
    custom:  { price: "" }
  }
};
