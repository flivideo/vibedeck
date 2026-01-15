# VibeDeck Mockups - 5 Dimensions Framework

**Purpose**: Comprehensive design exploration system for VibeDeck hardware controller
**Status**: Reorganized to 5-dimension framework (2026-01-15)
**Total Assets**: 25 surface treatment variations, 7 reference images

---

## Overview

This directory contains generated product images for the VibeDeck hardware controller, organized according to a **5-dimension framework** that separates decorative variations from fundamental design innovation.

**Critical Distinction**:
- **Skins** (Dimension 2) = Surface treatments on same design (like iPhone cases)
- **Design Variations** (Dimension 3) = Fundamental design exploration (different form factors, interaction models, industrial design languages)

---

## The 5 Dimensions

### Dimension 1: Product Photography Angles
**Purpose**: Multiple views of ONE design for Kickstarter marketing
**Location**: `reference-images/`
**Status**: 7 reference images (canonical, cyberpunk, desk-setup, detail-closeup, etc.)

### Dimension 2: Skins / Surface Treatments ✓
**Purpose**: Visual customization of established design
**Location**: `skins/`
**Status**: ✓ 25 variations complete (carved-wood, resin-flowers, vaporwave, day-of-the-dead, etc.)

### Dimension 3: Design Variations ⭐ THE INNOVATION
**Purpose**: Fundamentally different product concepts
**Location**: `design-variations/` (empty - to be generated)
**Examples to explore**:
- Rotary-minimalist (current concept refined)
- Touchscreen-tablet (iPad-like flat approach)
- Button-matrix (Stream Deck style - 3x4, 4x4 grids)
- Hybrid-rotary-matrix (central rotary + button grid)
- Voice-orb (microphone-focused, voice-first interaction)
- Slider-bank (mixing desk style, multiple linear controls)
- Clip-on-pendant (wearable, always-accessible)
- Arcade-mini (Pac-Man console inspiration)
- Clamshell-protective (Game & Watch fold-open)

**Interaction Models to Explore**:
- Rotary-centric (current concept)
- Touchscreen dominant
- Voice-first with minimal buttons
- Button-matrix (Stream Deck influence)
- Slider-based controls
- Gesture-based
- Hybrid approaches

### Dimension 4: Manufacturing Practicality
**Purpose**: Can this be built? At what cost? At what scale?
**Location**: `manufacturing-analysis/` (empty - to be created)
**Evaluates**: Injection molding, 3D printing, CNC machining feasibility and costs

### Dimension 5: Model Selection & Optimization
**Purpose**: Which AI model for which task? Model-specific best practices
**Location**: `docs/model-research/` (to be populated)
**Focus**: Kie.AI and Fal.AI model routers, top 10 models, cost/quality optimization

---

## Directory Structure

```
vibedeck-mocks/
├── README.md (this file)
├── AUDIT-REPORT.md (verification report)
├── REORGANIZATION-COMPLETE.md (reorganization history)
│
├── reference-images/                    # Dimension 1: Product Photography
│   ├── canonical.png (base layout reference)
│   ├── cyberpunk.png (dramatic lighting variant)
│   ├── desk-setup.png (lifestyle context)
│   ├── detail-closeup.png (macro detail)
│   ├── variant-2b.png
│   ├── variant-2c.png
│   └── variant-2d.png
│
├── skins/                               # Dimension 2: Surface Treatments ✓
│   ├── alien-artifact.json/png (biomechanical HR Giger)
│   ├── art-deco.json/png (1920s geometric gold)
│   ├── candy-land.json/png (made of candy)
│   ├── carved-wood.json/png (walnut wood grain)
│   ├── concrete-brutalist.json/png (raw concrete)
│   ├── coral-reef.json/png (underwater bioluminescence)
│   ├── day-of-the-dead.json/png (sugar skull patterns)
│   ├── filipino-jeepney.json/png (chrome decorations)
│   ├── graffiti.json/png (spray paint street art)
│   ├── japanese-ukiyo-e.json/png (Great Wave woodblock)
│   ├── lego-bricks.json/png (built from LEGO)
│   ├── made-by-child.json/png (crayon drawings)
│   ├── melting-dali.json/png (Salvador Dali melting)
│   ├── mexican-talavera.json/png (hand-painted pottery)
│   ├── moroccan-tiles.json/png (zellige mosaics)
│   ├── origami-paper.json/png (folded paper)
│   ├── overgrown-nature.json/png (moss and plants)
│   ├── plush-toy.json/png (soft fleece stuffed)
│   ├── resin-flowers.json/png (embedded flowers)
│   ├── scandinavian-minimal.json/png (pale birch)
│   ├── stained-glass.json/png (colorful glass)
│   ├── studio-ghibli.json/png (magical artifact)
│   ├── vaporwave.json/png (90s internet aesthetic)
│   ├── volcanic-lava.json/png (obsidian with lava)
│   └── wizard-tower.json/png (spellbook leather)
│
├── design-variations/                   # Dimension 3: Innovation (empty)
│   └── (to be generated - fundamental design exploration)
│
└── manufacturing-analysis/              # Dimension 4: Feasibility (empty)
    └── (to be created - injection molding, 3D printing analysis)
```

**External**: `docs/model-research/` - Dimension 5 knowledge base

---

## File Naming Conventions

**Congruent Naming**: Every mockup has matching JSON and PNG files
- Example: `carved-wood.json` pairs with `carved-wood.png`
- JSON contains: model used, prompt, generation date, rationale
- PNG contains: generated image at high resolution

**Alphabetically Sorted**: All files sorted for easy navigation

---

## Using These Images

### In VibeDeck Application

Reference images directly:
```javascript
// Skins (surface treatments)
const skinImagePath = './vibedeck-mocks/skins/carved-wood.png';

// Product photography (canonical reference)
const heroImagePath = './vibedeck-mocks/reference-images/canonical.png';
```

### For Kickstarter Campaign

**Product Photography** (Dimension 1):
- Hero images from different angles
- Lifestyle context shots
- Detail close-ups for quality demonstration

**Skins** (Dimension 2):
- Stretch goal rewards (custom materials/finishes)
- Backer tier exclusives
- Design flexibility demonstration

**Design Variations** (Dimension 3) - to be generated:
- Fundamental product concepts
- Different form factors
- Alternative interaction models
- Industrial design exploration

---

## Image Metadata

### JSON Structure
Each `.json` file contains:
```json
{
  "id": "M1",
  "file": "carved-wood.png",
  "name": "Carved Wood",
  "category": "Materials & Textures",
  "model": "ChatGPT (DALL-E 3)",
  "date": "2026-01-14",
  "prompt": "Full DALL-E 3 prompt...",
  "why": "Design rationale..."
}
```

### Image Quality
- **Resolution**: 1024x1024 typical, higher for production
- **Format**: PNG (high quality, lossless)
- **Models Used**: DALL-E 3 (current), FLUX.2, Nano Banana Pro (planned)

---

## Current Status

### ✓ Completed
- **25 Skins** (Dimension 2): All surface treatment variations generated and organized
- **7 Reference Images** (Dimension 1): Product photography angles
- **Audit Complete**: 100% accuracy verification of JSON-PNG pairs
- **Reorganization Complete**: Flat structure → 5-dimension framework

### ⏳ In Progress
- **Model Research** (Dimension 5): Kie.AI/Fal.AI model routers, top 10 models
- **Manufacturing Guidelines** (Dimension 4): Injection molding, 3D printing feasibility

### 🔜 Upcoming
- **Design Variations** (Dimension 3): 10-30 fundamental design concepts
- **FliDeck Visualization**: Gallery system for viewing/comparing mockups
- **Manufacturing Analysis**: Feasibility evaluation for each design variation

---

## Contributing New Mockups

### Generation Workflow

**For Skins** (Dimension 2):
1. Select artistic style from `docs/vibedeck-artistic-styles-reference.md`
2. Generate using ChatGPT, FLUX.2, or Nano Banana Pro
3. Save to `skins/[descriptive-name].json` and `.png`
4. Update JSON metadata

**For Design Variations** (Dimension 3):
1. Conceptualize fundamental design approach (form factor, interaction model)
2. Consult model-research guide for best model choice
3. Generate image with design exploration prompt
4. Save to `design-variations/[concept-name]/` folder
5. Create notes.md documenting design rationale
6. Evaluate manufacturing feasibility

### Quality Standards

- ✅ Device clearly visible and recognizable as VibeDeck concept
- ✅ Button labels readable (CTX buttons, action buttons)
- ✅ LCD screen visible with display content
- ✅ Professional quality (campaign-ready resolution)
- ✅ Style/design consistency with concept
- ✅ JSON metadata complete and accurate

---

## Stream Deck Influence

**Hardware Research**: VibeDeck team has purchased 10 Stream Deck devices (Elgato + Chinese variants) for design exploration.

**Key Learnings**:
- Button matrix configurations: 2x3, 3x5, 4x4, 4x8
- Control types: LCD buttons, rotary encoders, sliders, recording buttons
- Microphone integration for voice/recording workflows
- Hybrid layouts: buttons + rotaries, buttons + sliders
- Use cases: Streamers, video editors, audio producers, developers, AI users

**Design Implications**: Future design variations (Dimension 3) should explore button-matrix + rotary hybrids, slider integrations, voice/recording-first designs.

---

## Documentation Links

- **Artistic Styles**: `docs/vibedeck-artistic-styles-reference.md` (80+ styles)
- **Project Overview**: `docs/vibedeck-project.md`
- **Image Generation KB**: `docs/image-generation/`
- **Model Research**: `docs/model-research/` (to be created)
- **Manufacturing Analysis**: `manufacturing-analysis/` (to be created)
- **POEM Workflow**: `poem/vibedeck-kickstarter-images/`

---

## Next Steps

1. **Complete Model Research** - Document Kie.AI/Fal.AI routers, identify top 10 models
2. **Create Manufacturing Guidelines** - Injection molding, 3D printing, cost analysis
3. **Generate Design Variations** - 10-30 fundamental design concepts
4. **Manufacturing Analysis** - Evaluate feasibility for each design variation
5. **FliDeck Integration** - Build visualization gallery for mockup review

---

**Last Updated**: 2026-01-15 (Reorganized to 5-dimension framework)
**Framework**: Research plan at `~/.claude/plans/swift-toasting-tarjan.md`
**Status**: Phase 1 in progress - immediate actions executing
