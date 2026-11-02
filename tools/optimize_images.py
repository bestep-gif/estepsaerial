#!/usr/bin/env python3
"""
Estep's Aerial — photo optimizer

Turns full-size drone photos into fast-loading WebP sizes for the website
and prints a ready-to-paste snippet for assets/js/projects.js.

Usage
-----
    pip install pillow
    python tools/optimize_images.py <folder-of-originals> <project-slug>

Example
-------
    python tools/optimize_images.py ~/Pictures/lakefront-originals lakefront-listing

This creates:
    assets/projects/lakefront-listing/photo-01-640.webp
    assets/projects/lakefront-listing/photo-01-1280.webp
    assets/projects/lakefront-listing/photo-01-1920.webp
    ...
Your originals are never modified. Keep them backed up outside the website.
"""
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is required:  pip install pillow")

WIDTHS = [640, 1280, 1920]
QUALITY = 82
EXTS = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp", ".dng"}


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    src = Path(sys.argv[1]).expanduser()
    slug = sys.argv[2].strip().lower().replace(" ", "-")
    site_root = Path(__file__).resolve().parent.parent
    out = site_root / "assets" / "projects" / slug
    out.mkdir(parents=True, exist_ok=True)

    files = sorted(p for p in src.iterdir() if p.suffix.lower() in EXTS)
    if not files:
        sys.exit(f"No images found in {src}")

    entries = []
    for n, f in enumerate(files, 1):
        name = f"photo-{n:02d}"
        with Image.open(f) as im:
            im = ImageOps.exif_transpose(im).convert("RGB")
            made = []
            for w in WIDTHS:
                if im.width < w and made:
                    break  # never upscale beyond the original
                target = min(w, im.width)
                h = round(im.height * target / im.width)
                im.resize((target, h), Image.LANCZOS).save(out / f"{name}-{w}.webp", "WEBP", quality=QUALITY, method=6)
                made.append(w)
        print(f"  {f.name} -> {name} ({', '.join(map(str, made))} px)")
        entries.append((name, made, f.stem))

    print("\nPaste into the project's images list in assets/js/projects.js")
    print("(edit the alt text and captions):\n")
    for name, made, stem in entries:
        print(f'      {{ file: "assets/projects/{slug}/{name}", widths: [{", ".join(map(str, made))}], '
              f'alt: "DESCRIBE THE PHOTO", caption: "{stem}" }},')


if __name__ == "__main__":
    main()
