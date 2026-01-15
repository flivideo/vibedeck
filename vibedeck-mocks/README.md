# VibeDeck Sample Images

**Purpose**: Sample images for VibeDeck application and Kickstarter campaign
**Location**: Project root for easy application/server access
**Status**: 6 material style variations generated

---

## Overview

This directory contains generated product images for the VibeDeck hardware controller showing different material and design variations. Images serve two primary purposes:

1. **Application Integration**: VibeDeck server/application can easily reference these images
2. **Kickstarter Campaign**: Marketing materials, hero images, style variations

---

## Directory Structure

```
vibedeck-samples/
├── README.md (this file)
│
├── retro-plastic-70s/           # Grey plastic, 70s/80s Akai-style design
│   ├── 1A.png
│   ├── 1B.png
│   ├── 1C.png
│   ├── 2A.png
│   ├── 2B.png
│   ├── 2C.png
│   └── 2D.png
│
├── carved-wood/                 # Carved from walnut wood
│   ├── 1A.png
│   ├── 1A-carved-wood.json
│   └── BATCH-1-MATERIALS.md
│
├── resin-flowers/               # Clear resin with embedded flowers
│   ├── 1B.png
│   ├── 1B-resin-flowers.json
│   └── BATCH-2-ART-MOVEMENTS.md
│
├── stained-glass/               # Stained glass window design
│   ├── 1C.png
│   ├── 1C-stained-glass.json
│   └── BATCH-3-WORLDS.md
│
├── lego-bricks/                 # Built from LEGO pieces
│   ├── 1D.png
│   ├── 1D-lego-bricks.json
│   └── BATCH-4-CULTURAL.md
│
└── concrete-brutalist/          # Raw poured concrete, brutalist architecture
    ├── 1E.png
    ├── 1E-concrete-brutalist.json
    └── BATCH-5-UNEXPECTED.md
```

---

## Sample Styles

### 1. Retro Plastic (70s/80s)

**Folder**: `retro-plastic-70s/`
**Images**: 7 variations (1A.png through 2D.png)
**Style**: Grey plastic design reminiscent of 70s/80s Akai video players and recording machines
**Appeal**: Nostalgic, retro-tech aesthetic

### 2. Carved Wood

**Folder**: `carved-wood/`
**Concept**: Luxury carved from single block of walnut wood
**Style**: Premium craftsmanship, visible wood grain, polished finish
**Appeal**: Audiophile/luxury market, natural materials

### 3. Resin with Embedded Flowers

**Folder**: `resin-flowers/`
**Concept**: Clear epoxy resin with preserved flowers frozen inside
**Style**: Ethereal, romantic, nature meets technology
**Appeal**: Unique art piece, feminine aesthetic

### 4. Stained Glass

**Folder**: `stained-glass/`
**Concept**: Medieval church window aesthetic
**Style**: Colorful glass pieces, lead caming, dramatic backlighting
**Appeal**: Sacred/artistic feel, dramatic visual impact

### 5. LEGO Bricks

**Folder**: `lego-bricks/`
**Concept**: Actually constructed from LEGO pieces
**Style**: Playful, nostalgic, colorful building blocks
**Appeal**: Maker/builder audience, childhood nostalgia

### 6. Concrete Brutalist

**Folder**: `concrete-brutalist/`
**Concept**: Raw poured concrete, architectural monument
**Style**: Heavy, monolithic, industrial minimalism
**Appeal**: Architects/designers, bold statement piece

---

## File Organization

### Within Each Folder

**Image files**: Original PNG images from generation
- Example: `1A.png`, `1B.png`, `2D.png`

**Prompt files** (where available): JSON prompt/parameters used
- Example: `1A-carved-wood.json`
- Contains full generation details for reproducibility

**Batch documentation** (where available): Design notes and rationale
- Example: `BATCH-1-MATERIALS.md`
- Concept, prompt, and reasoning for the style

---

## Using These Images

### In VibeDeck Application

The VibeDeck server can reference these images directly:

```javascript
// Example path reference
const sampleImagePath = './vibedeck-mocks/carved-wood/1A.png';
```

Located at project root for easy relative path access from server code.

### For Kickstarter Campaign

**Style Variations**: Use to demonstrate:
- Design flexibility
- Potential customization options
- Stretch goal rewards (custom materials/finishes)
- Backer tier exclusives

**Marketing Materials**:
- Website product galleries
- Social media teasers showing different styles
- Email campaign visuals
- Crowdfunding page design variations

---

## Image Metadata

### Standard Dimensions
- **Resolution**: Typically 1024x1024 or similar
- **Format**: PNG (high quality)
- **Aspect Ratio**: Varies by style

### Generation Details

Where `.json` files are present, they contain:
- **Model used**: ChatGPT (DALL-E 3), Nano Banana Pro, etc.
- **Prompt text**: Full prompt including base description + style instructions
- **Parameters**: Resolution, quality settings, style modifiers
- **Generation date**: When image was created

---

## Style Reference

For complete style descriptions, prompts, and additional style variations, see:
**`docs/vibedeck/artistic-styles-reference.md`**

This reference includes 80+ total style variations across multiple categories:
- Photography & Lighting styles (30 variations)
- Artistic Material Variations (50+ variations)

---

## Contributing New Samples

### Generation Workflow

1. **Select style**: Choose from `docs/vibedeck/artistic-styles-reference.md`
2. **Generate image**: Use preferred platform (ChatGPT, Nano Banana Pro, etc.)
3. **Create folder**: `[descriptive-name]/` (use kebab-case)
4. **Save files**:
   - Image: `[code].png` or descriptive name
   - Prompt (optional): `[name].json`
   - Docs (optional): `BATCH-[#]-[CATEGORY].md`

### Quality Standards

- ✅ **Device clearly visible**: VibeDeck controller recognizable
- ✅ **Button labels readable**: CTX buttons, action buttons visible
- ✅ **LCD screen shown**: Display visible with content
- ✅ **Professional quality**: Campaign-ready resolution and composition
- ✅ **Style consistency**: Follows design concept accurately

---

## Current Status

**Total Samples**: 6 style variations
**Total Images**: 32 individual images
**Generation Models**: ChatGPT (DALL-E 3), experimental

**Completed Styles**:
- ✅ Retro Plastic 70s/80s (7 images)
- ✅ Carved Wood
- ✅ Resin Flowers
- ✅ Stained Glass
- ✅ LEGO Bricks
- ✅ Concrete Brutalist

**Potential Future Styles**: See `docs/vibedeck/artistic-styles-reference.md` for 70+ additional style variations that could be generated.

---

## Quick Links

- **Style Reference**: `docs/vibedeck/artistic-styles-reference.md` (80+ styles)
- **Project Documentation**: `docs/vibedeck/README.md`
- **Image Generation Knowledge**: `docs/image-generation/`
- **POEM Workflow**: `poem/vibedeck-kickstarter-images/`

---

**Last Updated**: 2026-01-15
**Maintained By**: Jan (image generation), David (curation)
**For Questions**: See project docs or contact team leads
