/* =====================================================================
   ESTEP'S AERIAL — PORTFOLIO PROJECTS
   Add a project by copying one of the templates at the bottom of this
   file into the PORTFOLIO_PROJECTS list. The gallery, filters and
   lightbox update automatically.

   Fields
   ------
   id            unique short id, e.g. "p-2026-01"
   title         shown on the card
   slug          folder name under assets/projects/, e.g. "stafford-listing"
   category      one of: "real-estate", "construction", "documentation",
                 "video", "commercial", "scenic"
   location      general area only, e.g. "Stafford, VA" (no client addresses)
   date          "YYYY-MM" or "YYYY-MM-DD"
   description   optional, one or two sentences
   thumbnail     image object (see below) used on the card
   images        list of image objects shown in the lightbox
   videoUrl      optional YouTube link (any normal youtube.com / youtu.be URL)
   featured      true = shown first
   sampleProject true = demonstration content; gets a visible "Demo" label

   Image objects
   -------------
   Either a single file:
     { src: "assets/projects/slug/photo.jpg", alt: "...", caption: "..." }
   or responsive sizes made by tools/optimize_images.py:
     { file: "assets/projects/slug/photo-01", widths: [640, 1280, 1920],
       alt: "...", caption: "..." }
   ===================================================================== */

window.PORTFOLIO_CATEGORIES = [
  { id: "all",           label: "All Projects" },
  { id: "real-estate",   label: "Real Estate" },
  { id: "construction",  label: "Construction" },
  { id: "documentation", label: "Property Documentation" },
  { id: "video",         label: "Cinematic Video" },
  { id: "commercial",    label: "Commercial Projects" },
  { id: "scenic",        label: "Scenic & Landmarks" }
];

window.PORTFOLIO_PROJECTS = [
  {
    id: "p-golden-hour",
    title: "Golden Hour Over the Water",
    slug: "golden-hour-water",
    category: "scenic",
    location: "",
    date: "",
    description: "Sunset aerial with the sky mirrored across calm water.",
    thumbnail: { file: "assets/projects/golden-hour-water/photo-01", widths: [640, 1280, 1920, 2560], alt: "Aerial view at sunset over a calm, reflective lake lined with trees" },
    images: [
      { file: "assets/projects/golden-hour-water/photo-01", widths: [640, 1280, 1920, 2560], alt: "Aerial view at sunset over a calm, reflective lake lined with trees", caption: "Golden hour over the water" }
    ],
    videoUrl: "",
    featured: true,
    sampleProject: false
  },
  {
    id: "p-rail-bridge",
    title: "Rappahannock River Rail Bridge",
    slug: "rappahannock-rail-bridge",
    category: "scenic",
    location: "Rappahannock River, VA",
    date: "",
    description: "The historic concrete arch railroad bridge, captured from above the tree line.",
    thumbnail: { file: "assets/projects/rappahannock-rail-bridge/photo-01", widths: [640, 1280, 1920, 2560], alt: "Aerial view of a concrete arch railroad bridge over the Rappahannock River" },
    images: [
      { file: "assets/projects/rappahannock-rail-bridge/photo-01", widths: [640, 1280, 1920, 2560], alt: "Aerial view of a concrete arch railroad bridge over the Rappahannock River", caption: "Concrete arch rail bridge over the Rappahannock River" }
    ],
    videoUrl: "",
    featured: true,
    sampleProject: false
  },
  {
    id: "p-water-tower",
    title: "Stafford Water Tower",
    slug: "stafford-water-tower",
    category: "documentation",
    location: "Stafford, VA",
    date: "",
    description: "Structure documentation: a clear, full-height view of the tower and surrounding site.",
    thumbnail: { file: "assets/projects/stafford-water-tower/photo-01", widths: [640, 1280, 1920, 2560], alt: "Aerial view of the Stafford, Virginia water tower and its fenced site" },
    images: [
      { file: "assets/projects/stafford-water-tower/photo-01", widths: [640, 1280, 1920, 2560], alt: "Aerial view of the Stafford, Virginia water tower and its fenced site", caption: "Full-height view of the Stafford water tower" }
    ],
    videoUrl: "",
    featured: true,
    sampleProject: false
  },
  {
    id: "p-neighborhood",
    title: "Neighborhood Overview",
    slug: "neighborhood-overview",
    category: "real-estate",
    location: "",
    date: "2026-07",
    description: "A wide aerial showing homes, lots and the tree-lined setting, the kind of context buyers love.",
    thumbnail: { file: "assets/projects/neighborhood-overview/photo-01", widths: [640, 1280, 1920, 2560], alt: "Wide aerial of a wooded residential neighborhood with large lots" },
    images: [
      { file: "assets/projects/neighborhood-overview/photo-01", widths: [640, 1280, 1920, 2560], alt: "Wide aerial of a wooded residential neighborhood with large lots", caption: "Wide neighborhood context shot" }
    ],
    videoUrl: "",
    featured: false,
    sampleProject: false
  },
  {
    id: "p-top-down",
    title: "Top-Down Property & Roof View",
    slug: "top-down-property",
    category: "documentation",
    location: "",
    date: "2026-08",
    description: "A straight-down view of a home, roof and yard, useful for roof documentation and lot layout.",
    thumbnail: { file: "assets/projects/top-down-property/photo-01", widths: [640, 1280, 1920, 2560], alt: "Straight-down aerial view of a house roof, driveway and backyard surrounded by trees" },
    images: [
      { file: "assets/projects/top-down-property/photo-01", widths: [640, 1280, 1920, 2560], alt: "Straight-down aerial view of a house roof, driveway and backyard surrounded by trees", caption: "Top-down view of roof, driveway and yard" }
    ],
    videoUrl: "",
    featured: false,
    sampleProject: false
  },
  {
    id: "p-retail",
    title: "Retail Center Overview",
    slug: "retail-center-overview",
    category: "commercial",
    location: "",
    date: "",
    description: "A commercial overview of a shopping center, parking and road access.",
    thumbnail: { file: "assets/projects/retail-center-overview/photo-01", widths: [640, 1280, 1920, 2560], alt: "Aerial overview of a shopping center with parking lots and surrounding roads" },
    images: [
      { file: "assets/projects/retail-center-overview/photo-01", widths: [640, 1280, 1920, 2560], alt: "Aerial overview of a shopping center with parking lots and surrounding roads", caption: "Retail center, parking and access roads" }
    ],
    videoUrl: "",
    featured: false,
    sampleProject: false
  },
  {
    id: "p-lakeside",
    title: "Lakeside Community",
    slug: "lakeside-community",
    category: "scenic",
    location: "",
    date: "",
    description: "Summer afternoon over a neighborhood lake, dam and shoreline.",
    thumbnail: { file: "assets/projects/lakeside-community/photo-01", widths: [640, 1280, 1920, 2560], alt: "Aerial view of a calm neighborhood lake with a grassy dam and wooded shoreline" },
    images: [
      { file: "assets/projects/lakeside-community/photo-01", widths: [640, 1280, 1920, 2560], alt: "Aerial view of a calm neighborhood lake with a grassy dam and wooded shoreline", caption: "Lake, dam and shoreline on a summer afternoon" }
    ],
    videoUrl: "",
    featured: false,
    sampleProject: false
  },
  {
    id: "demo-construction",
    title: "Residential Construction Progress",
    slug: "construction-demo",
    category: "construction",
    location: "Illustrated example",
    date: "",
    description: "An illustrated walkthrough of how four scheduled drone visits document a home from foundation to finished property. Illustrations only; not client work.",
    thumbnail: { src: "assets/projects/construction-demo/visit-3.svg", alt: "Illustration of a roofed house under construction seen from above" },
    images: [
      { src: "assets/projects/construction-demo/visit-1.svg", alt: "Illustration: cleared lot with poured foundation and excavator", caption: "Visit 1: Site preparation & foundation (illustration)" },
      { src: "assets/projects/construction-demo/visit-2.svg", alt: "Illustration: house framing with partial roof sheathing", caption: "Visit 2: Framing & roof construction (illustration)" },
      { src: "assets/projects/construction-demo/visit-3.svg", alt: "Illustration: roofed house with gravel driveway", caption: "Visit 3: Exterior finishing & site work (illustration)" },
      { src: "assets/projects/construction-demo/visit-4.svg", alt: "Illustration: completed home with lawn, driveway and landscaping", caption: "Visit 4: Completed property (illustration)" }
    ],
    videoUrl: "",
    featured: false,
    sampleProject: true
  }

  /* ---- TEMPLATE: photo project (copy, paste above, remove the comment marks) ----
  ,{
    id: "p-2026-01",
    title: "Lakefront Listing Aerials",
    slug: "lakefront-listing",
    category: "real-estate",
    location: "Stafford, VA",
    date: "2026-11",
    description: "Twilight aerials and a 60-second listing video.",
    thumbnail: { file: "assets/projects/lakefront-listing/photo-01", widths: [640, 1280, 1920], alt: "Aerial of a lakefront home" },
    images: [
      { file: "assets/projects/lakefront-listing/photo-01", widths: [640, 1280, 1920], alt: "Front aerial of the home", caption: "Front elevation at golden hour" },
      { file: "assets/projects/lakefront-listing/photo-02", widths: [640, 1280, 1920], alt: "Overhead of the lot", caption: "Lot overview" }
    ],
    videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
    featured: false,
    sampleProject: false
  }
  ---------------------------------------------------------------------------- */
];

/* =====================================================================
   CONSTRUCTION PROGRESS SHOWCASE (construction-monitoring page)
   Replace these visits with a real project later (with client approval).
   Set sample:false when the content is real client work.
   compare.before / compare.after are visit numbers (1-based) whose
   photos share roughly the same camera position. Set enabled:false to
   hide the before/after slider.
   ===================================================================== */
window.CONSTRUCTION_SHOWCASE = {
  title: "Residential Construction Progress",
  sample: true,
  sampleNote: "Demonstration using illustrations, not photographs of a client project.",
  visits: [
    {
      label: "Visit 1", when: "Example: Week 1",
      title: "Site preparation & foundation",
      description: "Baseline flight after clearing and excavation. Establishes the fixed camera positions reused on every later visit.",
      milestones: ["Lot cleared and silt fence installed", "Foundation poured", "Equipment staging documented"],
      image: { src: "assets/projects/construction-demo/visit-1.svg", alt: "Illustration: cleared lot with poured foundation and excavator" },
      extra: [{ src: "assets/projects/construction-demo/visit-1-detail.svg", alt: "Illustration: closer view of the foundation", caption: "Detail: foundation close-up" }]
    },
    {
      label: "Visit 2", when: "Example: Week 6",
      title: "Framing & roof construction",
      description: "Walls are framed and roof sheathing is underway. The same overhead angle makes progress easy to compare.",
      milestones: ["Exterior walls framed", "Roof sheathing ~50% complete", "Lumber delivery and dumpster placement logged"],
      image: { src: "assets/projects/construction-demo/visit-2.svg", alt: "Illustration: house framing with partial roof sheathing" },
      extra: [{ src: "assets/projects/construction-demo/visit-2-detail.svg", alt: "Illustration: closer view of framing", caption: "Detail: framing and sheathing" }]
    },
    {
      label: "Visit 3", when: "Example: Week 12",
      title: "Exterior finishing & site improvements",
      description: "Roof is complete and the building is dried-in. Driveway base and erosion control are visible.",
      milestones: ["Roofing complete", "Gravel driveway base installed", "Seed and straw on disturbed areas"],
      image: { src: "assets/projects/construction-demo/visit-3.svg", alt: "Illustration: roofed house with gravel driveway" },
      extra: [{ src: "assets/projects/construction-demo/visit-3-detail.svg", alt: "Illustration: closer view of finished roof", caption: "Detail: roof complete" }]
    },
    {
      label: "Visit 4", when: "Example: Week 20",
      title: "Completed residential property",
      description: "Final documentation flight: finished home, concrete driveway, lawn and landscaping.",
      milestones: ["Concrete driveway and walkway", "Lawn established", "Landscape beds and patio complete"],
      image: { src: "assets/projects/construction-demo/visit-4.svg", alt: "Illustration: completed home with lawn, driveway and landscaping" },
      extra: [{ src: "assets/projects/construction-demo/visit-4-detail.svg", alt: "Illustration: closer view of the finished home", caption: "Detail: finished home" }]
    }
  ],
  compare: { enabled: true, before: 1, after: 4 }
};
