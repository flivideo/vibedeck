# FLUX.2 Best Practices for VibeDeck Image Generation

**Purpose**: Comprehensive guide to using FLUX.2 models for VibeDeck mockup generation
**Last Updated**: 2026-01-15

---

## Overview

**FLUX.2** is a family of cutting-edge image generation models released in November 2025, representing state-of-the-art quality with exceptional typography, prompt adherence, and photorealism.

**Key Advantage for VibeDeck**: Superior text rendering makes FLUX.2 ideal for product mockups where button labels, LCD displays, and branding must be legible and professional.

---

## FLUX.2 Model Family

### FLUX.2 [dev] Turbo ⚡ THE WORKHORSE

**Strengths**:
- **Speed**: 6.6 seconds for 1024x1024 image
- **Cost**: $0.008 per image (cheapest on market)
- **Quality**: 4-star (outperforms many larger models)
- **Use Case**: Rapid iteration, design exploration, cost-effective production

**When to Use**:
- Design variation exploration (Dimension 3)
- Batch generating skins (Dimension 2)
- A/B testing different concepts
- Early stakeholder presentations
- Manufacturing concept visualization

**When NOT to Use**:
- Final Kickstarter hero images (use Pro instead)
- Typography-critical packaging design (use Pro instead)
- Maximum quality requirement (use Pro instead)

---

### FLUX.2 [pro] 🏆 THE PERFECTIONIST

**Strengths**:
- **Quality**: 5-star (highest quality in FLUX family)
- **Typography**: Best-in-class text rendering
- **Detail**: Exceptional fine detail and material textures
- **Use Case**: Final production assets, marketing materials

**When to Use**:
- Final Kickstarter hero images
- Packaging design with text/labels
- Marketing materials for print
- High-resolution renders (posters, banners)
- When typography/text is critical
- Product photography angles (Dimension 1)

**When NOT to Use**:
- Early exploration (use Turbo for cost savings)
- Quick throwaway tests
- Budget constraints

**Cost**: Higher than Turbo (exact pricing TBD via Fal.AI)
**Speed**: ~15 seconds typical (slower than Turbo, faster than competitors)

---

### FLUX.1 [schnell] ⚡⚡ ULTRA-FAST PROTOTYPING

**Strengths**:
- **Speed**: 2-4 seconds (fastest in family)
- **Cost**: Very low
- **Quality**: 3-star (acceptable for prototypes)

**When to Use**:
- Ultra-rapid iteration
- Concept sketching
- Quick visual ideas
- Non-critical experimentation

**When NOT to Use**:
- Anything customer-facing
- Final production assets

---

## FLUX.2 vs Competitors

### FLUX.2 Turbo vs DALL-E 3

| Feature | FLUX.2 Turbo | DALL-E 3 |
|---------|--------------|----------|
| **Speed** | 6.6s | 15-30s |
| **Cost** | $0.008/image | ~$0.04/image |
| **Typography** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐ Good (can warp) |
| **Prompt Adherence** | ⭐⭐⭐⭐⭐ Superior | ⭐⭐⭐⭐ Good |
| **Ease of Use** | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent (ChatGPT) |
| **Photorealism** | ⭐⭐⭐⭐ High | ⭐⭐⭐⭐ High |

**Winner**: FLUX.2 Turbo for production, DALL-E 3 for exploration

---

### FLUX.2 Pro vs Midjourney v7

| Feature | FLUX.2 Pro | Midjourney v7 |
|---------|------------|---------------|
| **Quality** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐⭐ Excellent |
| **Typography** | ⭐⭐⭐⭐⭐ Best-in-class | ⭐⭐⭐⭐ Good |
| **Ease of Use** | ⭐⭐⭐⭐ API/CLI | ⭐⭐⭐ Discord interface |
| **Speed** | 15s | 30-60s |
| **Cost** | Per-image | Subscription |
| **Automation** | ✓ Easy | Limited |

**Winner**: FLUX.2 Pro for product design, Midjourney for artistic work

---

## Prompting Patterns for FLUX.2

### Basic Prompt Structure

```
[Subject] + [Style] + [Details] + [Technical Parameters]
```

**Example for VibeDeck**:
```
A VibeDeck hardware controller on a clean studio backdrop.
The device is a sleek handheld controller with a prominent rotary knob,
four labeled buttons (CTX1, CTX2, CTX3, CTX4), and a small LCD screen.
Professional product photography, soft studio lighting, 45-degree angle.
High-resolution, sharp focus, neutral gray background.
```

---

### Typography Best Practices

**CRITICAL**: FLUX.2 handles text better than any model, but you must be explicit.

#### ✓ DO: Be Specific About Text
```
The device has four buttons clearly labeled in sans-serif font:
- "CTX1" on the top-left button
- "CTX2" on the top-right button
- "CTX3" on the bottom-left button
- "CTX4" on the bottom-right button

The LCD screen displays "VibeDeck" in crisp white text on black background.
```

#### ✗ DON'T: Be Vague
```
The device has some buttons with labels.
```

#### ✓ DO: Specify Font Characteristics
```
Button labels in clean, modern sans-serif font (similar to Helvetica).
High contrast: white text on dark buttons.
Crisp, legible, professional appearance.
```

#### ✗ DON'T: Rely on Inference
```
Professional button labels.
```

---

### Material and Texture Specification

FLUX.2 excels at realistic materials. Be descriptive:

**Plastic**:
```
Matte black ABS plastic housing with slight texture.
No fingerprints, clean surface.
Subtle sheen but not glossy.
```

**Metal**:
```
Brushed aluminum finish with visible grain direction.
Soft anodized surface, aerospace-grade look.
Cool metallic sheen, professional industrial design.
```

**Wood**:
```
Dark walnut wood with visible natural grain patterns.
Smooth polished finish, hand-carved details.
Warm tones, organic texture, craftsman quality.
```

---

### Lighting Specifications

FLUX.2 responds well to photography terminology:

**Studio Lighting** (Product Photography):
```
Professional studio lighting setup:
- Key light at 45 degrees, soft diffused
- Fill light to reduce shadows
- Rim light for edge definition
- Clean neutral gray backdrop (18% gray)
- f/8 depth of field, everything in focus
```

**Natural Lighting** (Lifestyle):
```
Soft natural window light from the left.
Golden hour warmth, 5500K color temperature.
Gentle shadows, inviting atmosphere.
Shallow depth of field (f/2.8), device in sharp focus, background softly blurred.
```

**Dramatic Lighting** (Artistic):
```
Moody low-key lighting, single spotlight from above.
Deep shadows, high contrast.
Cyberpunk neon accents (blue and pink glow).
Cinematic feel, 2700K warm key light.
```

---

### Camera Angle Specifications

Be explicit about perspective:

**Product Shot (Standard)**:
```
45-degree angle view from slightly above.
Device centered in frame, all controls visible.
Medium shot, device fills 60% of frame.
```

**Detail Close-up**:
```
Macro close-up of the rotary knob.
Shallow depth of field (f/2.8), knob in sharp focus.
Background elements softly blurred.
Fill frame, emphasize texture and craftsmanship.
```

**Lifestyle Context**:
```
Device on a wooden desk, shot from above (flat lay).
Include context: laptop keyboard edge, coffee mug, notebook.
Natural lighting from window, warm inviting scene.
Device positioned in lower-right third of composition.
```

---

## VibeDeck-Specific Prompt Templates

### Template 1: Clean Product Shot (Kickstarter Hero)

```
A VibeDeck handheld hardware controller photographed in professional studio setting.

Device details:
- Compact rectangular form factor (approx 80mm x 60mm)
- Matte black plastic housing with subtle texture
- Large rotary encoder knob in center (brushed metal finish)
- Four membrane buttons arranged in 2x2 grid, labeled "CTX1" "CTX2" "CTX3" "CTX4" in white sans-serif font
- Small monochrome LCD screen at top (displaying "VibeDeck")
- USB-C cable port at bottom
- Rounded ergonomic edges

Photography:
- 45-degree angle from slightly above
- Professional studio lighting (soft key light, fill light, rim light)
- Neutral gray backdrop (18% gray)
- High resolution, sharp focus throughout (f/8)
- Clean commercial product photography aesthetic
- No clutter, device is hero

Technical:
- Photorealistic rendering
- Accurate proportions and scale
- Professional color grading
- High dynamic range (HDR)
```

**Use Case**: Kickstarter campaign hero image, product page

---

### Template 2: Design Variation (Dimension 3)

```
A VibeDeck hardware controller reimagined as [DESIGN CONCEPT].

Core concept:
[Describe fundamental design approach - e.g., "button-matrix Stream Deck style with 3x4 LCD buttons and central rotary knob"]

Form factor:
[Describe physical form - e.g., "Desktop form factor, larger than original, sits on desk with 15-degree built-in tilt"]

Interaction model:
[Describe how user interacts - e.g., "Hybrid approach: press LCD buttons for context selection, rotate knob for parameter adjustment"]

Key features:
- [List specific features]
- [Include dimensions if relevant]
- [Specify materials]

Photography:
- [Standard studio lighting or other]
- [Angle that shows interaction model clearly]
- [Context if relevant]

Technical:
- Photorealistic, could be manufactured
- Professional industrial design aesthetic
- Attention to ergonomics and usability
```

**Use Case**: Exploring fundamental design alternatives

---

### Template 3: Skin Variation (Dimension 2)

```
A VibeDeck controller with [ARTISTIC STYLE] aesthetic.

Base design:
- Standard VibeDeck form factor and layout
- Rotary knob, 4 buttons (CTX1-4), LCD screen
- Same proportions as canonical design

Style treatment:
[Describe surface aesthetic - e.g., "Carved from single block of dark walnut wood. Visible wood grain, polished smooth finish. Buttons are inset wood pieces. Screen bezel integrated into wood grain. Natural organic beauty."]

Materials:
[Specify materials]

Photography:
- [Appropriate lighting for style]
- [Context if style requires it]
- [Angle that showcases style best]

Mood:
[Emotional tone - e.g., "Warm, luxurious, craftsman quality"]
```

**Use Case**: Kickstarter stretch goals, backer tier variations

---

## Advanced Techniques

### Negative Prompts

FLUX.2 supports negative prompts (what to avoid):

```
Negative prompt: low quality, blurry, distorted text, watermark, signature, amateur, plastic toy appearance, cartoonish, unrealistic proportions
```

**Best practices**:
- Use sparingly (positive prompts are stronger)
- Avoid common issues: "blurry", "distorted text", "low quality"
- Don't over-specify (can limit creativity)

---

### Multi-Step Generation

For complex concepts, break into stages:

**Stage 1**: Generate base concept
```
A modern handheld hardware controller, sleek industrial design, black matte finish.
```

**Stage 2**: Refine with details (img2img or new prompt)
```
[Use Stage 1 output as reference]
Same device but with these specific details:
- Four buttons labeled CTX1, CTX2, CTX3, CTX4
- Central rotary knob with brushed metal
- LCD screen at top displaying "VibeDeck"
```

---

### Batch Variations

To generate multiple variations efficiently:

**Base Prompt** (consistent across all):
```
A VibeDeck controller, professional product photography, studio lighting, neutral backdrop, high resolution.
```

**Variable Elements**:
1. Angle: "45-degree angle" → "straight-on front view" → "overhead flat lay"
2. Lighting: "soft studio" → "dramatic spotlight" → "natural window light"
3. Context: "clean backdrop" → "on wooden desk" → "held in hand"
4. Style: "matte black" → "brushed aluminum" → "walnut wood"

Generate 4 variations by changing one variable each time.

---

## Quality Control Checklist

After generating with FLUX.2, verify:

- [ ] **Typography**: All text is legible, correct spelling, no duplicates
- [ ] **Proportions**: Device looks manufacturable, realistic scale
- [ ] **Materials**: Textures look realistic, not cartoonish
- [ ] **Lighting**: Professional, not overly dramatic unless intentional
- [ ] **Focus**: Sharp where intended, appropriate depth of field
- [ ] **Composition**: Device positioned well, not cut off
- [ ] **Details**: All specified elements present (buttons, knob, screen, etc.)
- [ ] **Artifacts**: No weird glitches, distortions, or unwanted elements

---

## Common Issues and Fixes

### Issue: Text is duplicated or warped

**Fix**: Be more explicit about text placement
```
✗ "Four buttons with labels"
✓ "Four distinct buttons, each with one label:
   Top-left: CTX1
   Top-right: CTX2
   Bottom-left: CTX3
   Bottom-right: CTX4
   No other text anywhere else on the device."
```

---

### Issue: Device looks toy-like or cartoonish

**Fix**: Add professional photography keywords
```
Add: "professional product photography, photorealistic rendering, commercial quality, could be manufactured, aerospace-grade materials"
```

---

### Issue: Proportions seem off

**Fix**: Specify dimensions and comparisons
```
Add: "Compact handheld device, approximately the size of a computer mouse (80mm x 60mm). Ergonomic proportions for one-handed use. Realistic scale."
```

---

### Issue: Background is distracting

**Fix**: Be explicit about backdrop
```
Add: "Clean neutral gray backdrop (18% gray), no distractions, device is only subject, professional studio setting"
```

---

## Cost Optimization Strategies

### Strategy 1: Use Turbo for Iteration, Pro for Finals

1. Generate 10 variations with FLUX.2 Turbo ($0.08 total)
2. Select best 2 concepts
3. Regenerate those 2 with FLUX.2 Pro (~$0.20 total)
4. Total cost: $0.28 vs $2.00 if all generated with Pro

**Savings**: 86%

---

### Strategy 2: Batch Similar Prompts

Generate multiple angles of same design in one session:
- Front view
- Side view
- Top view
- Detail close-up

API calls can be parallelized, reducing wall-clock time.

---

### Strategy 3: Reuse Base Prompts

Create library of tested prompts:
- `vibedeck-base-product-shot.txt`
- `vibedeck-lifestyle-desk.txt`
- `vibedeck-detail-closeup.txt`

Modify only variable elements (style, material, angle).

---

## API Integration Example

```javascript
import * as fal from "@fal-ai/serverless-client";

fal.config({
  credentials: process.env.FAL_KEY
});

async function generateVibeDeckMockup(styleDescription, model = "flux-2-turbo") {
  const basePrompt = `
    A VibeDeck hardware controller, professional product photography.
    Compact handheld device with rotary knob, four buttons (CTX1-4), LCD screen.
    ${styleDescription}
    Studio lighting, neutral backdrop, high resolution, sharp focus.
  `;

  const result = await fal.subscribe(model, {
    input: {
      prompt: basePrompt,
      image_size: "square_hd", // 1024x1024
      num_inference_steps: 28,
      guidance_scale: 3.5,
      num_images: 1
    }
  });

  return result.images[0].url;
}

// Usage
const woodSkinUrl = await generateVibeDeckMockup(
  "Carved from dark walnut wood with visible grain, polished finish.",
  "flux-2-turbo"
);

const heroImageUrl = await generateVibeDeckMockup(
  "Matte black ABS plastic, sleek modern design.",
  "flux-2-pro" // Use Pro for final hero
);
```

---

## Model Selection Decision Tree

```
START
  ↓
Is this a final production asset? (Kickstarter hero, packaging, print)
  ├─ YES → Use FLUX.2 Pro
  └─ NO → Continue
      ↓
  Is typography critical? (Button labels must be perfect)
    ├─ YES → Use FLUX.2 Pro
    └─ NO → Continue
        ↓
    Is speed critical? (Generating 50+ variations)
      ├─ YES → Use FLUX.2 Turbo
      └─ NO → Continue
          ↓
      Is this just a quick concept sketch?
        ├─ YES → Use FLUX.1 Schnell
        └─ NO → Use FLUX.2 Turbo (default)
```

---

## Next Steps

1. **Test FLUX.2 Turbo**: Generate 5 design variations
2. **Test FLUX.2 Pro**: Generate 2 hero images
3. **Compare to DALL-E 3**: Side-by-side evaluation
4. **Document results**: Update cost-speed-quality matrix
5. **Create prompt library**: Save successful prompts for reuse

---

## Resources

- **Fal.AI FLUX Documentation**: https://fal.ai/models/flux
- **FLUX.2 Release Notes**: Check Fal.AI blog for updates
- **Prompting Community**: Reddit r/StableDiffusion, Discord servers
- **VibeDeck Prompt Library**: `poem/vibedeck-kickstarter-images/prompts/`

---

**Status**: Best practices documented, ready for implementation
**Next**: Generate first design variation using FLUX.2 Turbo
