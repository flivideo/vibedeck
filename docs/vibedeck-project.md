# VibeDeck Project Documentation

**Project**: VibeDeck Hardware Controller
**Goal**: Generate product images for Kickstarter campaign
**Status**: Active image generation phase

---

## Overview

VibeDeck is a handheld hardware controller designed for "vibe coding" - a seamless interface for interacting with AI models through physical controls.

### Device Features

- Small LCD screen displaying AI model information
- Large central rotary knob/dial for navigation
- 6 context buttons (CTX 1-6) arranged around knob
- Bottom row of action buttons (YES, NO, OTHER, microphone, SEND, CHAT)
- Colorful LED backlighting under buttons
- Coiled cable connection

---

## Image Generation for Kickstarter

### Goals

1. **Hero Images**: Clean, professional product photography for main campaign page
2. **Style Variations**: 50+ artistic interpretations showing design flexibility
3. **Detail Shots**: Close-ups highlighting craftsmanship and features
4. **Lifestyle Context**: Device in use, real-world scenarios

### Current Status

**6 material style variations generated:**
- ✅ Retro Plastic 70s/80s (7 sample images)
- ✅ Carved Wood
- ✅ Resin Flowers
- ✅ Stained Glass
- ✅ LEGO Bricks
- ✅ Concrete Brutalist

**70+ additional styles available** in `artistic-styles-reference.md` for future generation.

---

## Documentation Structure

### In This Directory

- **`vibedeck-project.md`** (this file) - Project overview and workflow guide
- **`vibedeck-artistic-styles-reference.md`** - Comprehensive reference for all 80+ style variations
- **`image-generation/`** - System-agnostic image generation knowledge base

### Related Directories

- **`../vibedeck-mocks/`** - All generated sample images (flat structure by style)
- **`../poem/vibedeck-kickstarter-images/`** - POEM workflow workspace
- **`../.poem-core/`** - POEM framework

---

## Workflow: Generating New Images

### Using the POEM Workflow

1. **Activate POEM workspace**: Navigate to `poem/vibedeck-kickstarter-images/`
2. **Select style**: Choose from `vibedeck-artistic-styles-reference.md`
3. **Generate prompt**: Use templates from `docs/image-generation/templates/`
4. **Create image**: Use chosen image generation platform (Nano Banana, ChatGPT, etc.)
5. **Save output**: Store in `vibedeck-mocks/[style-name]/` folder (flat structure)

### Image Generation Platforms

- **Nano Banana Pro**: Best for complex prompts with precise control
- **ChatGPT (DALL-E 3)**: Good for artistic variations, cost-effective
- **Midjourney**: Alternative for specific aesthetic styles
- **Stable Diffusion**: Local generation option

See `docs/image-generation/` for platform-specific guides and templates.

---

## Style Categories

### 1. Photography & Lighting Styles (30 variations)

**Approach**: Same device design, different presentation techniques
**Best for**: Hero images, product catalog, technical documentation
**See**: `vibedeck-artistic-styles-reference.md` → Photography & Lighting Styles section

**Key styles**:
- CI-01: Apple Minimalism (hero images)
- CI-04: Ultra-Close Macro (detail shots)
- CI-06: High-Key Studio (catalog photography)
- CI-09: Isometric Technical (technical specs)

### 2. Artistic Material Variations (50 variations)

**Approach**: Completely different device designs based on materials and art styles
**Best for**: Stretch goals visualization, style exploration, creative marketing
**See**: `vibedeck-artistic-styles-reference.md` → Artistic Material Variations sections

**Categories**:
- **Materials & Textures** (M1-M10): Wood, resin, glass, LEGO, concrete, chrome, ice, leather, acrylic
- **Art Movements** (A1-A10): Art Deco, Ghibli, Vaporwave, Pop Art, Bauhaus, Cyberpunk
- **Worlds & Universes** (W1-W10): Coral reef, wizard, volcanic, candy, Egyptian, Tron, fairy, space
- **Cultural & Regional** (C1-C10): Moroccan, Filipino, Japanese, Scandinavian, Indian, African, Russian, Aboriginal, Chinese
- **Unexpected & Weird** (U1-U10): Overgrown, melting, origami, plush, X-ray, bento, knitted, cardboard, bioluminescent

---

## File Organization

### Output Images Location

All generated images are stored at project root: **`../vibedeck-mocks/`**

Organized as flat structure by style name:
- `vibedeck-mocks/retro-plastic-70s/`
- `vibedeck-mocks/carved-wood/`
- `vibedeck-mocks/resin-flowers/`
- etc.

This location allows:
- Easy access for VibeDeck application/server
- High visibility in repository
- Simple, flat organization

See `../vibedeck-mocks/README.md` for detailed organization.

---

## Quick Links

- **Artistic Styles Reference**: `vibedeck-artistic-styles-reference.md`
- **Sample Images**: `../vibedeck-mocks/`
- **Image Generation Knowledge**: `image-generation/`
- **POEM Workflow**: `../poem/vibedeck-kickstarter-images/`
- **POEM Core Framework**: `../.poem-core/`

---

## For Team Members

### Jan's Workflow

1. **Review styles**: Check `vibedeck-artistic-styles-reference.md` for next priority styles
2. **Generate images**: Use preferred platform (ChatGPT, Nano Banana Pro)
3. **Save outputs**: Create/use folder `vibedeck-mocks/[style-name]/`
4. **Include files**:
   - Images: PNG files (any naming convention)
   - Prompt (optional): JSON file with generation details
   - Notes (optional): Markdown documentation for the style

### David's Review Process

1. **Check new images**: Review `vibedeck-mocks/` for new additions
2. **Provide feedback**: Comment on style effectiveness for Kickstarter
3. **Select finalists**: Choose best 10-15 for campaign use
4. **Update tracking**: Mark status in `artistic-styles-reference.md` tables

---

## Success Criteria

**Kickstarter Campaign Needs:**

✅ **Essential (Must Have)**:
- 3-5 hero images using photography styles (CI-01, CI-04, CI-06, CI-09, CI-14)
- 2-3 detail/macro shots showing craftsmanship
- 1-2 lifestyle/context shots showing device in use

🎯 **Stretch Goals (Nice to Have)**:
- 10-15 artistic variation images for backer reward tiers
- Material/finish options visualization
- Color variation examples

🚀 **Aspirational (Future)**:
- All 80+ style variations generated
- Complete style library for marketing materials
- Customization visualizer using generated images

---

**Last Updated**: 2026-01-15
**Project Lead**: David
**Image Generation**: Jan
**Status**: Active development - 6 styles complete, 70+ available
