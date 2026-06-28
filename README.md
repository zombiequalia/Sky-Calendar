# Sky-Calendar

# Sky Calendar Volvelle — Desktop Bundle

## Quick start
Open `volvelle.html` in any browser. It works immediately (loads its two
libraries from the internet the first time).

## Going fully offline
Download these two files into this same folder, next to volvelle.html:

1. p5.js — save as `p5.min.js`
   https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js

2. astronomy-engine — save as `astronomy.browser.min.js`
   https://cdn.jsdelivr.net/npm/astronomy-engine@2.1.19/astronomy.browser.min.js

(Right-click each link → Save As, or open and Ctrl+S.)

Once both files are present, volvelle.html uses them automatically and never
touches the network again. The instrument is then fully self-contained —
VSOP87 planetary theory and all, running from a folder.

## Editing the skin
All presentation lives in the THEME object and the C_* color constants near
the top of the file's script. The drawing is organized as one function per
ring layer (drawStarRing, drawSignRing, drawPlanetRing, drawSolarRing,
drawLunarRing, drawCompassRose...). The astronomy beneath never needs touching.

## Graphical editing (Inkscape / Illustrator)
Use the "Export SVG" button in the controls. It saves the disc's current
state as a layered SVG — each ring on its own named layer — ready for vector
editing, skinning, or physical-disc production. Design artwork there (the
wyrm node-markers, chase-animals on the rim), then fold finished shapes back
into the code as drawing functions so the live instrument uses them.
