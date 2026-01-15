# VibeDeck Mocks Audit Report

**Date**: 2026-01-15
**Status**: ✓ Complete verification of all 25 JSON-PNG pairs

---

## Executive Summary

✓ **All 25 JSON-PNG pairs match perfectly** - Every image accurately represents its JSON description
✗ **Folder structure is completely wrong** - Folder names don't match their contents
✓ **File naming within JSON is correct** - The descriptive names in the JSON "name" field are accurate
✗ **File prefixes (1A, 2B, etc.) are unnecessary and should be removed**

---

## Current Structure Problems

### Problem 1: Misnamed Folders
Current folders are named after the FIRST item they contain, not the category:

- `carved-wood/` → Contains ALL 5 "Materials & Textures" styles (not just carved wood)
- `resin-flowers/` → Contains ALL 5 "Art Movements" styles (not just resin)
- `stained-glass/` → Contains ALL 5 "Worlds & Universes" styles (not just stained glass)
- `lego-bricks/` → Contains ALL 5 "Cultural & Regional" styles (not just LEGO)
- `concrete-brutalist/` → Contains ALL 5 "Unexpected & Weird" styles (not just concrete)

### Problem 2: Unnecessary Prefixes
Files are named like `1A-carved-wood.json` and `1A.png` when they should be `carved-wood.json` and `carved-wood.png`.

### Problem 3: Reference Images Unlabeled
`retro-plastic-70s/` contains 7 reference images with no JSON metadata or clear documentation.

---

## Verified File Inventory

### Materials & Textures (Currently in carved-wood/)
1. ✓ `1A-carved-wood.json` + `1A.png` → Dark walnut wood with visible grain
2. ✓ `1B-resin-flowers.json` + `1B.png` → Clear resin with embedded flowers
3. ✓ `1C-stained-glass.json` + `1C.png` → Colorful glass with lead caming
4. ✓ `1D-lego-bricks.json` + `1D.png` → Built from LEGO bricks
5. ✓ `1E-concrete-brutalist.json` + `1E.png` → Raw poured concrete

### Art Movements (Currently in resin-flowers/)
6. ✓ `2A-art-deco.json` + `2A.png` → 1920s geometric gold and black
7. ✓ `2B-studio-ghibli.json` + `2B.png` → Magical artifact with brass and runes
8. ✓ `2C-vaporwave.json` + `2C.png` → Pink/purple gradient with 90s aesthetics
9. ✓ `2D-graffiti.json` + `2D.png` → Spray paint street art
10. ✓ `2E-day-of-the-dead.json` + `2E.png` → Sugar skull patterns and marigolds

### Worlds & Universes (Currently in stained-glass/)
11. ✓ `3A-coral-reef.json` + `3A.png` → Underwater with coral and bioluminescence
12. ✓ `3B-wizard-tower.json` + `3B.png` → Spellbook leather with glowing runes
13. ✓ `3C-volcanic-lava.json` + `3C.png` → Black obsidian with molten lava
14. ✓ `3D-candy-land.json` + `3D.png` → Made entirely of candy
15. ✓ `3E-alien-artifact.json` + `3E.png` → HR Giger biomechanical design

### Cultural & Regional (Currently in lego-bricks/)
16. ✓ `4A-moroccan-tiles.json` + `4A.png` → Zellige tile mosaics
17. ✓ `4B-filipino-jeepney.json` + `4B.png` → Chrome and bright hand-painted decorations
18. ✓ `4C-japanese-ukiyo-e.json` + `4C.png` → Great Wave woodblock print style
19. ✓ `4D-scandinavian-minimal.json` + `4D.png` → Pale birch and white minimalism
20. ✓ `4E-mexican-talavera.json` + `4E.png` → Hand-painted pottery flowers

### Unexpected & Weird (Currently in concrete-brutalist/)
21. ✓ `5A-overgrown-nature.json` + `5A.png` → Covered in moss and plants
22. ✓ `5B-melting-dali.json` + `5B.png` → Melting like Salvador Dali clock
23. ✓ `5C-origami-paper.json` + `5C.png` → Folded from paper with visible creases
24. ✓ `5D-plush-toy.json` + `5D.png` → Soft fleece stuffed toy version
25. ✓ `5E-made-by-child.json` + `5E.png` → Decorated with crayon drawings

### Reference Images (Currently in retro-plastic-70s/)
- `1A.png` → **PRIMARY REFERENCE** - Clean silver/gray modern design (canonical layout)
- `1B.png` → Cyberpunk neon cityscape version
- `1C.png` → Retro desk setup with warm lighting
- `2A.png` → Close-up detail shot
- `2B.png` → Unknown variant
- `2C.png` → Unknown variant
- `2D.png` → Unknown variant

**Note**: 1A.png is the canonical reference design that establishes the VibeDeck layout used in all variations.

---

## Recommended Actions

### Option 1: Flat Structure (RECOMMENDED)
Remove all folders and prefixes. Create a single flat directory:

```
vibedeck-mocks/
├── reference-images/
│   ├── canonical.png (currently 1A.png)
│   ├── cyberpunk.png (currently 1B.png)
│   ├── desk-setup.png (currently 1C.png)
│   └── ... (remaining reference images)
├── carved-wood.json
├── carved-wood.png
├── resin-flowers.json
├── resin-flowers.png
├── stained-glass.json
├── stained-glass.png
... (all 25 pairs)
```

**Pros**: Simple, no confusing categories, alphabetically sorted
**Cons**: 50+ files in one directory (but manageable)

### Option 2: Category-Based Structure
Organize by actual categories:

```
vibedeck-mocks/
├── reference-images/
│   └── (7 reference PNGs)
├── materials-textures/
│   ├── carved-wood.json/png
│   ├── resin-flowers.json/png
│   ├── stained-glass.json/png
│   ├── lego-bricks.json/png
│   └── concrete-brutalist.json/png
├── art-movements/
│   ├── art-deco.json/png
│   ├── studio-ghibli.json/png
│   ├── vaporwave.json/png
│   ├── graffiti.json/png
│   └── day-of-the-dead.json/png
├── worlds-universes/
│   ├── coral-reef.json/png
│   ├── wizard-tower.json/png
│   ├── volcanic-lava.json/png
│   ├── candy-land.json/png
│   └── alien-artifact.json/png
├── cultural-regional/
│   ├── moroccan-tiles.json/png
│   ├── filipino-jeepney.json/png
│   ├── japanese-ukiyo-e.json/png
│   ├── scandinavian-minimal.json/png
│   └── mexican-talavera.json/png
└── unexpected-weird/
    ├── overgrown-nature.json/png
    ├── melting-dali.json/png
    ├── origami-paper.json/png
    ├── plush-toy.json/png
    └── made-by-child.json/png
```

**Pros**: Organized by theme, good for browsing
**Cons**: More complex, categories may not be meaningful long-term

---

## Naming Convention Changes

### Current Naming (WRONG)
- JSON: `1A-carved-wood.json`
- PNG: `1A.png`
- **Problem**: Prefix doesn't match, not descriptive

### Recommended Naming (CORRECT)
- JSON: `carved-wood.json`
- PNG: `carved-wood.png`
- **Benefit**: Congruent, self-documenting, sortable

---

## JSON Structure Analysis

Each JSON contains:
- `id`: Batch identifier (M1-M5, A1-A5, W1-W5, C1-C5, U1-U5)
- `file`: Original filename reference
- `name`: Descriptive name (THIS IS THE CORRECT NAME TO USE)
- `category`: Batch category
- `model`: "ChatGPT (DALL-E 3)"
- `date`: "2026-01-14"
- `prompt`: Full DALL-E prompt (contains both material/style AND device layout description)
- `why`: Marketing/design rationale

**Key Finding**: The `name` field in JSON is the source of truth for filenames.

---

## Next Steps

1. **Decide on structure**: Flat (Option 1) or Categorized (Option 2)
2. **Rename all files** to remove prefixes and use descriptive names
3. **Update JSON `file` field** in each JSON to match new filenames
4. **Organize reference images** into dedicated folder with descriptive names
5. **Delete old folder structure** after migration
6. **Create index/catalog** (optional) for easy browsing

---

## Verification Status

- ✓ All 25 JSON-PNG pairs verified for accuracy
- ✓ All images match their JSON descriptions
- ✓ Reference design identified (1A.png = canonical)
- ✓ Naming conventions documented
- ⏳ Awaiting decision on reorganization approach
