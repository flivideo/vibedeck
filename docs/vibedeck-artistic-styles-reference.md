

# VibeDeck Artistic Styles Reference

**Purpose**: Comprehensive reference for all VibeDeck product image style variations

**Total Styles**: 80+ variations across 3 distinct approaches

**Output Location**: `vibedeck-mocks/` (see organization below)

---

## Table of Contents

1. [Photography & Lighting Styles (30)](#photography--lighting-styles) - CI-01 through CI-30
2. [Artistic Material Variations - Part 1 (25)](#artistic-material-variations---part-1) - M1-M5, A1-A5, W1-W5, C1-C5, U1-U5
3. [Artistic Material Variations - Part 2 (25)](#artistic-material-variations---part-2) - M6-M10, A6-A10, W6-W10, C6-C10, U6-U10
4. [Image Organization](#image-organization)
5. [Quick Reference Tables](#quick-reference-tables)

---

## Photography & Lighting Styles

**Source**: `custom-instructions-30-styles.md`
**Approach**: Photography techniques and lighting styles (system-agnostic)
**Best for**: Varying the presentation while keeping device design consistent

### Global Camera Constraint (All Styles)

```
Product must occupy 65-75% of frame.
Close-up hero shot, magazine-grade framing.
Camera distance: Close enough to see button labels, textures, and display content clearly.
```

### 🎯 Anchor Styles (Test First)

These 5 styles are baseline evaluators - test on any new model/approach first:

- **CI-01: Apple Minimalism** - Gold standard for product photography
- **CI-04: Ultra-Close Macro Detail** - Tests detail rendering and texture quality
- **CI-06: High-Key Studio Bright** - Tests color accuracy and clean lighting
- **CI-09: Isometric Technical** - Tests geometric precision and technical rendering
- **CI-14: Soft Natural Window Light** - Tests natural lighting and approachability

### Style Catalog (CI-01 through CI-30)

#### Photography Styles (1-10)

**CI-01: Apple Minimalism** [STYLE SAFE] 🎯
- Risk: Low | Cost: Low | Reliability: High
- Pure white background, pristine lighting, zero harsh shadows, zen-like negative space

**CI-02: Cyberpunk Noir** [STYLE SAFE]
- Risk: Low | Cost: Low | Reliability: High
- Heavy contrast, deep shadows, neon accents, rain-slicked urban hints, cyan/green practical lights

**CI-03: Retro-Tech Magazine Editorial** [STYLE SAFE]
- Risk: Low | Cost: Low | Reliability: High
- 1980s-90s tech magazine style, warmer 3200K tungsten, wood-paneled office, retro props

**CI-04: Ultra-Close Macro Detail** [STYLE SAFE] 🎯
- Risk: Low | Cost: Low | Reliability: High
- Extreme close-up on rotary encoder, macro lens (100mm), f/2.8, brushed aluminum texture detail

**CI-05: Lifestyle Action Shot** [STYLE SAFE]
- Risk: Medium | Cost: Medium | Reliability: Medium
- Device being used, hands visible, eye-level perspective, actual coding environment background

**CI-06: High-Key Studio Bright** [STYLE SAFE] 🎯
- Risk: Low | Cost: Low | Reliability: High
- Flood lighting, white/light gray background, minimal shadows, product floating in clean space

**CI-07: Dramatic Low-Key** [STYLE SAFE]
- Risk: Low | Cost: Low | Reliability: High
- Mostly darkness, strategic lighting, black background, rim lights, practical lights as primary source

**CI-08: Overhead Flat Lay** [STYLE SAFE]
- Risk: Low | Cost: Low | Reliability: High
- 90 degrees overhead, organized grid, complementary items, Instagram aesthetic

**CI-09: Isometric Technical** [STYLE SAFE] 🎯
- Risk: Low | Cost: Low | Reliability: High
- 30-45 degree angle, geometric precision, grid/blueprint texture, f/11-f/16 sharp focus

**CI-10: Moody Cinematic** [STYLE SAFE]
- Risk: Low | Cost: Low | Reliability: High
- Film noir aesthetic, dramatic side lighting, atmospheric shadows, cinematic color grading

#### Lighting & Effects (11-20)

**CI-11: Soft Ambient Glow** [STYLE SAFE]
- Diffused omnidirectional light, no harsh shadows, ethereal floating quality

**CI-12: Hard Direct Sunlight** [STYLE SAFE]
- Strong directional light, sharp shadows, outdoor midday feel, high contrast

**CI-13: Golden Hour Warm** [STYLE SAFE]
- Warm orange/yellow tones, soft directional light, sunset glow, nostalgic warmth

**CI-14: Soft Natural Window Light** [STYLE SAFE] 🎯
- Diffused window light from side, soft shadows, approachable natural aesthetic

**CI-15: Studio Strobe Flash** [STYLE SAFE]
- Clean studio flash, freezes motion, commercial product photography, crisp details

**CI-16: Colored Gel Lighting** [STYLE SAFE]
- Dramatic colored gels (cyan, magenta, orange), creative lighting, editorial boldness

**CI-17: Rim Light Emphasis** [STYLE SAFE]
- Strong rim/edge lighting, silhouette-like contours, dimensional separation

**CI-18: Reflected Light Play** [STYLE SAFE]
- Multiple reflective surfaces, bounced light creating complexity, premium glass aesthetic

**CI-19: Spotlight Hero** [STYLE SAFE]
- Single spotlight on dark stage, theatrical presentation, concert lighting vibe

**CI-20: Gradient Background** [STYLE SAFE]
- Smooth color gradient backdrop, transitions from warm to cool, modern abstract

#### Technical & Experimental (21-30)

**CI-21: Transparent Tech Aesthetic** [NANO-ONLY]
- Risk: High | Requires: Nano Banana Pro
- Wireframe overlays, transparent shell revealing internals, blueprint callouts

**CI-22: Floating Components** [STYLE SAFE]
- Buttons and knobs hovering in space, separated but aligned, deconstructed view

**CI-23: Reflection on Glass** [STYLE SAFE]
- Device on glossy black glass surface, perfect mirror reflection, premium doubling

**CI-24: Water Droplets** [STYLE SAFE]
- Fresh from unboxing, condensation droplets, splash-resistant aesthetic

**CI-25: Scale Reference** [STYLE SAFE]
- Hand, coin, or ruler visible for size context, human-scale perspective

**CI-26: Exploded View Diagram** [NANO-ONLY]
- Risk: High | Requires: Nano Banana Pro
- Components separated showing assembly, technical illustration style

**CI-27: Context in Use** [STYLE SAFE]
- Full desk setup visible, multiple monitors, ergonomic workspace, lifestyle integration

**CI-28: Dynamic Action Blur** [NANO-ONLY]
- Risk: High | Requires: Nano Banana Pro
- Motion capture, knob being turned, buttons being pressed, action photography

**CI-29: Monochrome High Contrast** [STYLE SAFE]
- Black and white only, dramatic contrast, timeless fine art photography

**CI-30: Atmospheric Haze** [NANO-ONLY]
- Risk: High | Requires: Nano Banana Pro
- Volumetric lighting, atmospheric fog/haze, dramatic light rays

---

## Artistic Material Variations - Part 1

**Source**: First 25 styles documented in BATCH-*.md files
**Approach**: Wildly different device designs based on materials and art styles
**Generated**: 2026-01-14 using ChatGPT (DALL-E 3)
**Location**: `vibedeck-mocks/phase-2-materials/`

### Base Device Description (Used in All Prompts)

```
A handheld hardware controller device with:
- Small LCD screen at top
- Large central rotary knob/dial
- 6 context buttons (CTX 1-6) around knob
- Bottom row of action buttons (YES, NO, OTHER, mic, SEND, CHAT)
- Colorful LED backlighting
- Coiled cable attached
```

### Categories

#### Materials & Textures (M1-M5)

**M1: Carved Wood** | File: `1A-carved-wood/`
- Concept: Luxury carved from single block of walnut wood
- Appeal: Premium craftsmanship, audiophile/luxury market
- Prompt: "Carved entirely from rich dark walnut wood, like a luxury chess piece. Rotary knob polished smooth with visible grain. Buttons are inlaid lighter maple with burned-in labels."

**M2: Resin with Embedded Flowers** | File: `1B-resin-flowers/`
- Concept: Clear resin with preserved flowers frozen inside
- Appeal: Unique art piece, feminine aesthetic, nature meets tech
- Prompt: "Clear epoxy resin with real dried flowers, leaves, petals embedded inside. Pink roses, lavender, baby's breath suspended in clear material."

**M3: Stained Glass** | File: `1C-stained-glass/`
- Concept: Medieval church window aesthetic
- Appeal: Sacred/artistic feel, dramatic visual impact
- Prompt: "Designed like stained glass church window. Colorful glass pieces held by dark lead caming. Deep reds, blues, golds, greens. Light shines through."

**M4: LEGO Bricks** | File: `1D-lego-bricks/`
- Concept: Actually constructed from LEGO pieces
- Appeal: Playful, nostalgic, appeals to makers/builders
- Prompt: "Built entirely from colorful LEGO bricks. Red, blue, yellow, green pieces snapped together. Rotary knob is large round LEGO piece. Visible studs."

**M5: Concrete Brutalist** | File: `1E-concrete-brutalist/`
- Concept: Raw poured concrete, architectural monument
- Appeal: Bold statement piece, appeals to architects/designers
- Prompt: "Made of raw poured concrete, brutalist architecture style. Heavy, monolithic, gray with visible form marks and aggregate texture."

#### Art Movements (A1-A5)

**A1: Art Deco**
- Concept: 1920s luxury, geometric patterns, gold and black
- Prompt: "Art Deco style with geometric zigzag patterns, gold and black color scheme, sunburst motifs, stepped forms, glamorous 1920s aesthetic."

**A2: Studio Ghibli**
- Concept: Hayao Miyazaki animation style, whimsical
- Prompt: "In Studio Ghibli animation style. Soft painted look, whimsical design, nature elements like moss and flowers growing on it, magical forest vibe."

**A3: Vaporwave**
- Concept: 90s internet aesthetic, pink/cyan, Greek busts
- Prompt: "Vaporwave aesthetic. Pink and cyan colors, geometric grids, Greek statue fragments, palm trees, retro computer graphics, 90s internet nostalgia."

**A4: Graffiti**
- Concept: Street art, spray paint, urban
- Prompt: "Covered in vibrant graffiti and street art. Spray paint tags, bold colors, urban aesthetic, bubble letters, drips and overspray visible."

**A5: Day of the Dead**
- Concept: Día de Muertos, sugar skull decorations
- Prompt: "Día de Muertos style. Decorated with sugar skull patterns, bright marigold orange, deep purple, intricate floral designs, Mexican folk art."

#### Worlds & Universes (W1-W5)

**W1: Coral Reef**
- Concept: Underwater, covered in coral and sea life
- Prompt: "Appears to be underwater, covered in colorful coral, barnacles, anemones. Blues and teals. Small tropical fish swimming nearby. Submerged treasure aesthetic."

**W2: Wizard Artifact**
- Concept: Fantasy RPG, magical runes, spell book
- Prompt: "Fantasy wizard artifact. Aged leather binding, glowing runes carved into surface, crystal orb as rotary knob, mystical purple energy emanating."

**W3: Volcanic Lava**
- Concept: Made of cooling lava, cracks glowing orange
- Prompt: "Made of black volcanic rock with glowing orange/red lava cracks between cooling magma. Heat shimmer, volcanic stone texture, molten core visible."

**W4: Candy Land**
- Concept: Made entirely of candy and sweets
- Prompt: "Made entirely of candy. Gummy bear buttons, lollipop knob, licorice edges, frosting details, peppermint swirls. Colorful, delicious, whimsical."

**W5: Alien Artifact**
- Concept: Extraterrestrial technology, unknown materials
- Prompt: "Alien artifact from another world. Otherworldly materials, bioluminescent elements, organic-tech hybrid, strange symbols, non-human design language."

#### Cultural & Regional (C1-C5)

**C1: Moroccan Tiles**
- Concept: Intricate zellige mosaic patterns
- Prompt: "Decorated with traditional Moroccan zellige tile patterns. Intricate geometric mosaics, blues, teals, golds. Islamic geometric art, luxurious tilework."

**C2: Filipino Jeepney**
- Concept: Colorful Philippine jeepney decorations
- Prompt: "Decorated like a Filipino jeepney. Chrome horse ornaments, vibrant colors, religious icons, family names, reflective decorations, festive maximalism."

**C3: Japanese Ukiyo-e**
- Concept: Traditional woodblock print art
- Prompt: "In style of Japanese ukiyo-e woodblock prints. Wave patterns, Mount Fuji, cherry blossoms, traditional Japanese art aesthetic, bold outlines."

**C4: Scandinavian**
- Concept: Nordic minimalism, hygge, natural materials
- Prompt: "Scandinavian design. Clean lines, natural wood and white, minimal ornamentation, functional beauty, hygge coziness, Nordic aesthetic."

**C5: Mexican Talavera**
- Concept: Hand-painted ceramic pottery patterns
- Prompt: "Hand-painted Talavera pottery style. Cobalt blue and white ceramic, floral and geometric Mexican folk patterns, glossy glazed finish."

#### Unexpected & Weird (U1-U5)

**U1: Overgrown Nature**
- Concept: Abandoned in forest, nature reclaiming it
- Prompt: "Abandoned in forest, overgrown with moss, vines, mushrooms growing from cracks. Nature reclaiming technology. Green, earthy, post-human aesthetic."

**U2: Melting Dali**
- Concept: Salvador Dalí surrealism, melting clocks
- Prompt: "In Salvador Dalí surrealist style. The device appears to be melting like his famous clocks. Distorted, dreamlike, reality-bending, desert landscape."

**U3: Origami Paper**
- Concept: Folded from single sheet of paper
- Prompt: "Folded from single sheet of origami paper. Visible crease lines, paper texture, geometric folds, Japanese paper crafts, delicate and precise."

**U4: Plush Toy**
- Concept: Soft fabric toy with button eyes
- Prompt: "Made as a soft plush toy. Felt fabric, stitching visible, button eyes, soft and huggable, craft aesthetic, handmade sewn toy."

**U5: Made by Child**
- Concept: Crafted in elementary school art class
- Prompt: "Appears to be crafted by a child in art class. Construction paper, popsicle sticks, glue visible, imperfect but charming, crayon labels, elementary school craft project."

---

## Artistic Material Variations - Part 2

**Source**: `25-ARTISTIC-STYLES-PART2.md`
**Approach**: 25 MORE wildly different device designs
**Generated**: 2026-01-14 using ChatGPT (DALL-E 3)
**Location**: `vibedeck-mocks/phase-3-variations/` (future)

### Categories

#### Materials & Textures (M6-M10)

**M6: Chrome Mirror Finish**
- Concept: Liquid chrome, everything reflects like a mirror
- Prompt: "Made entirely of polished liquid chrome, like mercury sculpture. Every surface mirror-reflective, distorted reflections. Rotary knob is perfect chrome sphere. Futuristic automotive show car aesthetic."

**M7: Woven Rattan & Bamboo**
- Concept: Handwoven natural fibers, beach resort aesthetic
- Prompt: "Woven from natural rattan and bamboo fibers. Tightly woven herringbone pattern. Buttons are polished bamboo circles. Carved bamboo sphere knob. Bohemian sustainable aesthetic."

**M8: Frozen Ice Crystal**
- Concept: Carved from pure ice, frozen in time
- Prompt: "Carved entirely from clear blue ice. Frost patterns visible, translucent with air bubbles frozen inside. Ice cube buttons glowing from within. Condensation droplets. Winter wonderland aesthetic."

**M9: Vintage Leather & Brass**
- Concept: Old library, antique explorer equipment
- Prompt: "Wrapped in aged brown leather with brass hardware. Worn leather patina, brass rivets and corners. Brass ship's wheel rotary knob. Victorian explorer, steampunk aesthetic."

**M10: Neon Acrylic Lucite**
- Concept: 80s Miami, transparent neon plastic
- Prompt: "Made of transparent neon-colored acrylic. Hot pink, electric blue, lime green lucite layers. See-through to internals. 80s Miami Vice aesthetic. UV light reactive."

#### Art Movements & Artists (A6-A10)

**A6: Pop Art (Warhol/Lichtenstein)**
- Concept: Bold colors, Ben-Day dots, comic book style
- Prompt: "Pop Art style. Bold primary colors, Ben-Day dots pattern, thick black comic outlines. 'POW!' style text. Target/bullseye patterns. Flat graphic, no gradients."

**A7: Art Nouveau**
- Concept: Organic curves, Alphonse Mucha, nature motifs
- Prompt: "Art Nouveau style from 1900. Flowing organic curves, whiplash lines. Decorative vines, flowers, peacock feathers. Sinuous curves, nothing straight. Gold and deep green."

**A8: Bauhaus Geometric**
- Concept: Primary colors, geometric shapes, form follows function
- Prompt: "Bauhaus design style. Pure geometric shapes - circles, squares, triangles. Primary colors only on white/black. Sans-serif typography. No decoration, pure function."

**A9: Impressionist Garden**
- Concept: Monet's water lilies, soft brushstrokes, dreamy
- Prompt: "Painted in Impressionist style like Claude Monet. Soft visible brushstrokes covering surfaces. Pastel colors, water lily motifs. Painterly quality, slightly soft focus. Dreamy peaceful."

**A10: Blade Runner Cyberpunk**
- Concept: Neon rain, dystopian future, tech noir
- Prompt: "Blade Runner cyberpunk aesthetic. Dark black with glowing neon accents - pink, cyan, orange. Rain droplets reflecting neon. Holographic displays, glitchy elements. Gritty used future."

#### Worlds & Universes (W6-W10)

**W6: Ancient Egyptian Artifact**
- Concept: Pharaoh's treasure, hieroglyphics, gold and lapis
- Prompt: "Ancient Egyptian artifact from pharaoh's tomb. Gold plating, lapis lazuli inlays. Hieroglyphics carved. Scarab beetle rotary knob. Ankh and Eye of Horus buttons. Cobra and lotus motifs."

**W7: Post-Apocalyptic Wasteland**
- Concept: Mad Max, scavenged parts, rust and survival
- Prompt: "Built from scavenged post-apocalyptic parts. Rusted metal bolted together. Mismatched buttons, duct tape repairs. Scratches and battle damage. Survival aesthetic from available parts."

**W8: Tron Digital Grid**
- Concept: Inside the computer, glowing circuits, digital world
- Prompt: "From inside Tron digital world. Black surfaces with glowing cyan circuit lines. Digital grid aesthetic. Rotary knob pulses like data disc. Light trails emanating. Pure black background."

**W9: Fairy Garden Miniature**
- Concept: Tiny enchanted world, mushrooms, fairy lights
- Prompt: "Exists in tiny fairy garden. Covered with tiny mushrooms, acorn caps, moss. Miniature flowers in cracks. Firefly lights hovering. Toadstool cap rotary knob. Tiny door suggests fairies inside."

**W10: Space Station Module**
- Concept: NASA/SpaceX, zero gravity, astronaut equipment
- Prompt: "Designed for space station use. White/gray panels like ISS modules. NASA red and blue accents. Velcro strips for zero gravity. Safety locks. Large gloved-hand buttons. Earth visible through window behind."

#### Cultural & Regional (C6-C10)

**C6: Indian Mehndi Henna**
- Concept: Intricate henna patterns, wedding celebration
- Prompt: "Decorated with intricate Indian mehndi henna patterns. Burgundy/brown henna on cream/gold. Paisley, peacocks, mandala designs. Gold accents, mirror work. Wedding celebration aesthetic."

**C7: African Kente Cloth**
- Concept: Bold geometric patterns, woven textile, Ghana heritage
- Prompt: "Wrapped in Ghanaian Kente cloth patterns. Bold geometric stripes in gold, green, red, black. Woven textile texture. Adinkra symbols integrated. Proud cultural heritage aesthetic."

**C8: Russian Fabergé Egg**
- Concept: Imperial luxury, enamel and gems, Tsarist opulence
- Prompt: "Decorated like Fabergé egg. Guilloche enamel in royal blue/white. Gold filigree borders. Tiny diamonds, rubies, emeralds set in surface. Pearl rotary knob. Imperial Russian luxury."

**C9: Australian Aboriginal Dot Art**
- Concept: Dreamtime stories, earth colors, dot painting
- Prompt: "Painted in Australian Aboriginal dot art style. Earth tones - ochre, terracotta, white, black. Dot patterns forming animals and dreamtime symbols. Concentric circles. Connection to land and ancestors."

**C10: Chinese Blue & White Porcelain**
- Concept: Ming dynasty ceramics, delicate paintings, tea culture
- Prompt: "Made of Chinese blue and white porcelain. Delicate cobalt blue paintings on white ceramic. Traditional scenes of mountains, pagodas, cherry blossoms. Dragon and phoenix motifs. Ming dynasty elegance."

#### Unexpected & Weird (U6-U10)

**U6: X-Ray Transparent**
- Concept: See-through to internal components, medical scan aesthetic
- Prompt: "Shown as if under X-ray. Outer shell transparent/ghostly, revealing all internals. Circuit boards, wires, chips visible. X-ray blue/cyan tones on black. Medical/technical scan aesthetic."

**U7: Japanese Bento Box**
- Concept: Made entirely of food, sushi and rice
- Prompt: "Made entirely of Japanese food like bento box. Body is molded white rice. Rotary knob is salmon nigiri sushi. Buttons are different sushi pieces. Nori seaweed wrapping. Chopsticks beside it. Delicious playful."

**U8: Grandma's Knitted Cozy**
- Concept: Hand-knitted wool, cozy and warm, craft aesthetic
- Prompt: "Completely covered in hand-knitted wool. Chunky cable knit in autumn colors - mustard, burnt orange, cream. Knitted pom-pom on rotary knob. Little knitted owl on top. Cozy handmade grandmother's love."

**U9: Cardboard DIY Prototype**
- Concept: Made from cardboard boxes, maker prototype, lo-fi
- Prompt: "Built entirely from cardboard and tape. Brown corrugated cardboard. Hand-drawn marker labels. Buttons are cardboard circles with brass fasteners. Toilet paper roll rotary knob. Hot glue visible. Charming maker prototype."

**U10: Deep Sea Bioluminescent**
- Concept: Anglerfish and jellyfish, glowing in the abyss
- Prompt: "From deep ocean abyss. Completely dark except bioluminescent glowing parts. Translucent alien texture. Rotary knob glows like anglerfish lure. Buttons pulse with jellyfish bioluminescence. Tentacle-like cables. Marine snow particles floating."

---

## Image Organization

### Directory Structure

```
vibedeck-mocks/
├── phase-1-initial-7/          # Early experimental images
│   ├── 1A.png, 1B.png, etc.
│   └── (archived from old/ folder)
│
├── phase-2-materials/          # First 25 artistic styles (generated)
│   ├── 1A-carved-wood/
│   │   ├── 1A.png
│   │   ├── 1A-carved-wood.json
│   │   └── BATCH-1-MATERIALS.md
│   ├── 1B-resin-flowers/
│   ├── 1C-stained-glass/
│   ├── 1D-lego-bricks/
│   ├── 1E-concrete-brutalist/
│   └── ... (more to be added)
│
└── phase-3-variations/         # Second 25 artistic styles (future)
    └── (to be generated)
```

### File Naming Convention

**Format**: `[Phase][Letter]-[descriptive-name]/`

Examples:
- `1A-carved-wood` = Phase 1, Variation A, Carved Wood design
- `2C-cyberpunk-noir` = Phase 2, Variation C, Cyberpunk Noir photography style

**Within each folder**:
- `[Code].png` - The generated image
- `[Code]-[name].json` - The prompt/parameters used
- `BATCH-[#]-[CATEGORY].md` - Documentation for that batch

---

## Quick Reference Tables

### Photography Styles Quick Reference

| Code | Style Name | Risk Level | Best For |
|------|------------|------------|----------|
| CI-01 | Apple Minimalism 🎯 | Low | Hero images, clean presentation |
| CI-04 | Ultra-Close Macro 🎯 | Low | Detail shots, texture showcase |
| CI-06 | High-Key Studio 🎯 | Low | Catalog images, color accuracy |
| CI-09 | Isometric Technical 🎯 | Low | Technical specs, precision view |
| CI-14 | Natural Window Light 🎯 | Low | Lifestyle, approachable aesthetic |
| CI-21 | Transparent Tech | High | Technical diagrams (Nano only) |
| CI-26 | Exploded View | High | Assembly guide (Nano only) |
| CI-28 | Dynamic Action Blur | High | Action shots (Nano only) |
| CI-30 | Atmospheric Haze | High | Dramatic mood (Nano only) |

### Artistic Variations Quick Reference - Part 1

| Code | Category | Style Name | File Location |
|------|----------|------------|---------------|
| M1 | Materials | Carved Wood | 1A-carved-wood/ |
| M2 | Materials | Resin Flowers | 1B-resin-flowers/ |
| M3 | Materials | Stained Glass | 1C-stained-glass/ |
| M4 | Materials | LEGO Bricks | 1D-lego-bricks/ |
| M5 | Materials | Concrete Brutalist | 1E-concrete-brutalist/ |
| A1-A5 | Art Movements | Art Deco, Ghibli, Vaporwave, Graffiti, Day of Dead | (to be generated) |
| W1-W5 | Worlds | Coral Reef, Wizard, Volcanic, Candy, Alien | (to be generated) |
| C1-C5 | Cultural | Moroccan, Jeepney, Ukiyo-e, Scandinavian, Talavera | (to be generated) |
| U1-U5 | Unexpected | Overgrown, Melting Dali, Origami, Plush Toy, Child-made | (to be generated) |

### Artistic Variations Quick Reference - Part 2

| Code | Category | Style Name | Priority |
|------|----------|------------|----------|
| M6 | Materials | Chrome Mirror | High |
| M7 | Materials | Rattan Bamboo | Medium |
| M8 | Materials | Frozen Ice | High |
| M9 | Materials | Leather Brass | Medium |
| M10 | Materials | Neon Acrylic | High |
| A6 | Art | Pop Art | High |
| A7 | Art | Art Nouveau | Medium |
| A8 | Art | Bauhaus | Medium |
| A9 | Art | Impressionist | Medium |
| A10 | Art | Blade Runner | High |
| W6 | Worlds | Ancient Egyptian | High |
| W7 | Worlds | Post-Apocalyptic | Medium |
| W8 | Worlds | Tron Digital Grid | High |
| W9 | Worlds | Fairy Garden | Medium |
| W10 | Worlds | Space Station | High |
| C6 | Cultural | Indian Mehndi | Medium |
| C7 | Cultural | African Kente | Medium |
| C8 | Cultural | Russian Fabergé | High |
| C9 | Cultural | Aboriginal Dot Art | Medium |
| C10 | Cultural | Chinese Porcelain | High |
| U6 | Unexpected | X-Ray Transparent | High |
| U7 | Unexpected | Japanese Bento | Medium |
| U8 | Unexpected | Knitted Cozy | Medium |
| U9 | Unexpected | Cardboard DIY | Medium |
| U10 | Unexpected | Bioluminescent | High |

---

## Usage Notes

1. **Photography styles (CI-01 to CI-30)**: System-agnostic, work across different image generation platforms. Use for consistent device design with varied presentation.

2. **Artistic variations (M/A/W/C/U codes)**: Wildly different device designs. Each creates a completely different aesthetic version of the VibeDeck controller.

3. **Mixing approaches**: Can combine photography styles with artistic variations (e.g., "Carved Wood device with Apple Minimalism photography style")

4. **Cost considerations**: [STYLE SAFE] prompts work on cheaper models. [NANO-ONLY] requires Nano Banana Pro for proper execution.

5. **For Kickstarter campaign**: Focus on 🎯 Anchor styles for main images. Use High priority artistic variations for stretch goals and backer rewards visualization.

---

**Last Updated**: 2026-01-15
**Maintained By**: David & Jan
**Related Documentation**:
- Image generation knowledge base: `docs/image-generation/`
- Mock images: `vibedeck-mocks/`
- POEM workflow: `poem/vibedeck-kickstarter-images/`
