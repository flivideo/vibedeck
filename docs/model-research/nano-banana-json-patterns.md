# Nano Banana Pro: JSON-Based Prompting Patterns

**Purpose**: Advanced JSON prompting techniques for Nano Banana Pro image generation
**Last Updated**: 2026-01-15

---

## Overview

**Nano Banana Pro** is a premium AI image generation model offering JSON-based prompt engineering for maximum control, precision, and repeatability.

**Key Differentiator**: Instead of natural language prompts, Nano Banana Pro accepts structured JSON "handles" that precisely control every aspect of generation.

---

## Why Nano Banana Pro?

### When to Use

**✓ Use Nano Banana Pro When**:
1. **Precision Critical**: Need exact control over specific elements
2. **Repeatability Required**: Must generate consistent series with one variable changed
3. **Technical Documentation**: Manufacturing references, CAD-style precision
4. **4K Native**: Need ultra-high resolution without upscaling
5. **Version Control**: Want to track prompt changes in Git

**✗ Avoid When**:
- Quick exploration (use DALL-E 3 or FLUX.2 Turbo instead)
- Budget constrained (~$0.08/image is expensive)
- Non-technical team members generating (steep learning curve)
- Artistic/creative work (DALL-E 3 better at interpretation)

---

### Advantages

**1. Deterministic Output**
- Same JSON → Consistent results
- Minimal variation between runs
- Predictable outcomes

**2. Handle-Based Control**
- Change ONE element without affecting others
- Iterate efficiently (test lighting without changing composition)
- Understand cause-and-effect

**3. Native 4K Resolution**
- 4096x4096 native generation
- No quality loss from upscaling
- Print-ready output

**4. Version Control Friendly**
- JSON files in Git
- Diff changes easily
- Roll back to previous versions

**5. Reusable Templates**
- Create library of working configs
- Share across team
- Document best practices

---

### Disadvantages

**1. Cost**
- ~$0.08 per image (10x more than FLUX.2 Turbo)
- Adds up quickly at scale

**2. Learning Curve**
- Must understand JSON structure
- Less intuitive than natural language
- Requires technical knowledge

**3. Slower Iteration**
- ~30 seconds per image (5x slower than FLUX.2 Turbo)
- Editing JSON is more verbose than tweaking text prompts

**4. Limited Artistic Interpretation**
- Literal interpretation of JSON
- Less "creative license" than DALL-E 3
- May feel robotic for artistic work

---

## JSON Structure Fundamentals

### Basic Template

```json
{
  "product": {
    "name": "VibeDeck Controller",
    "form": "compact handheld device, approximately 80mm x 60mm x 25mm",
    "materials": ["matte black ABS plastic housing", "brushed aluminum rotary knob"],
    "components": [
      {
        "name": "rotary_encoder",
        "position": "center of device",
        "description": "large rotary knob, brushed metal finish, 30mm diameter"
      },
      {
        "name": "buttons",
        "position": "below rotary knob in 2x2 grid",
        "description": "four tactile buttons labeled CTX1, CTX2, CTX3, CTX4"
      },
      {
        "name": "lcd_screen",
        "position": "top of device",
        "description": "small rectangular monochrome LCD, 128x64 pixels"
      }
    ]
  },
  "lighting": {
    "primary_light": {
      "type": "softbox",
      "position": "45 degrees above and to the left",
      "intensity": 80,
      "color_temperature": 5500
    }
  },
  "composition": {
    "camera_angle": "45-degree angle from slightly elevated position",
    "framing": "medium shot, device fills 60% of frame",
    "depth_of_field": "deep focus, f/8, everything sharp"
  },
  "background": {
    "type": "seamless_paper",
    "color": "neutral gray (18% gray)",
    "texture": "smooth matte"
  },
  "output": {
    "resolution": "4096x4096",
    "quality": "maximum",
    "format": "PNG"
  }
}
```

---

## The "Handle" System

### Concept: Handles as Control Knobs

Think of each JSON section as a "handle" you can adjust independently:

```
Product Handle → Changes: what the device looks like
Lighting Handle → Changes: how it's lit
Composition Handle → Changes: camera angle/framing
Background Handle → Changes: backdrop
```

**Key Benefit**: Change one handle, keep others constant

---

### Example: Lighting Variations

**Base JSON** (all handles filled):
```json
{
  "product": {...},
  "lighting": {
    "primary_light": {
      "type": "softbox",
      "position": "45 degrees front-left",
      "intensity": 80,
      "color_temperature": 5500
    },
    "fill_light": {
      "type": "reflector",
      "position": "opposite primary",
      "intensity": 40
    }
  },
  "composition": {...},
  "background": {...}
}
```

**Variation 1: High-Key Lighting** (change only lighting handle):
```json
{
  "lighting": {
    "primary_light": {
      "type": "large_softbox",
      "intensity": 100,
      "color_temperature": 6500
    },
    "fill_light": {
      "type": "reflector",
      "intensity": 90
    },
    "background_light": {
      "type": "flood",
      "intensity": 100
    }
  }
}
```

**Variation 2: Low-Key Dramatic** (change only lighting handle):
```json
{
  "lighting": {
    "primary_light": {
      "type": "spotlight",
      "position": "directly above",
      "intensity": 60,
      "color_temperature": 3200
    },
    "rim_light": {
      "type": "hard_light",
      "position": "back-left",
      "intensity": 70,
      "color_temperature": 8000
    }
  }
}
```

**Result**: Same device, composition, background → Only lighting changes

---

## Handle-Based Iteration Workflow

### Step 1: Start with Complete Template

Load base template with ALL handles filled:
```json
{
  "product": { /* complete product description */ },
  "lighting": { /* complete lighting setup */ },
  "composition": { /* complete composition */ },
  "background": { /* complete background */ }
}
```

Generate **Image A** (baseline)

---

### Step 2: Isolate One Variable

**Goal**: Test different camera angles

**Keep constant**:
- Product description
- Lighting setup
- Background

**Change only**:
- Composition handle (camera angle)

**Variation 1**: "45-degree angle from elevated"
**Variation 2**: "straight-on front view"
**Variation 3**: "overhead flat lay"
**Variation 4**: "low angle looking up"

Generate **Images B, C, D, E**

---

### Step 3: Compare and Select

Review all images, select best angle (e.g., Image C - overhead)

---

### Step 4: Iterate Next Handle

**Now keep constant**:
- Product description
- Lighting setup
- Background
- **Composition (now locked to overhead)**

**Change only**:
- Lighting handle

Test 3 lighting setups → Generate Images F, G, H

---

### Step 5: Continue Until Optimal

Repeat process for each handle until perfect result achieved.

**Total Iterations**: 4 (angle) + 3 (lighting) + 2 (background) = 9 images
**Cost**: 9 × $0.08 = $0.72
**Result**: Systematically optimized image

---

## VibeDeck-Specific JSON Patterns

### Pattern 1: Product Photography (Dimension 1)

**Use Case**: Kickstarter product shots from multiple angles

**Template**:
```json
{
  "product": {
    "name": "VibeDeck Controller",
    "form": "compact handheld controller, 80mm × 60mm × 25mm",
    "primary_material": "matte black ABS plastic",
    "finish": "subtle texture, non-reflective",
    "components": [
      {
        "component": "rotary_encoder",
        "material": "brushed aluminum",
        "diameter": "30mm",
        "position": "center of top surface",
        "details": "precise milled finish, tactile feedback visible"
      },
      {
        "component": "button_matrix",
        "count": 4,
        "layout": "2×2 grid below rotary",
        "labels": ["CTX1", "CTX2", "CTX3", "CTX4"],
        "font": "sans-serif, white on black",
        "details": "membrane buttons, slightly recessed"
      },
      {
        "component": "lcd_screen",
        "size": "128×64 pixels, approximately 25mm × 12mm",
        "type": "monochrome LCD",
        "position": "top edge above rotary knob",
        "display_content": "VibeDeck logo or status text",
        "details": "crisp white text on black background"
      },
      {
        "component": "usb_port",
        "type": "USB-C",
        "position": "bottom edge center",
        "details": "port visible, cable not shown"
      }
    ],
    "overall_aesthetic": "modern minimalist, professional industrial design"
  },
  "lighting": {
    "setup_type": "three_point_studio",
    "primary_key_light": {
      "type": "large_octagonal_softbox",
      "position": "45 degrees above and to camera-left",
      "distance": "1 meter from subject",
      "intensity": 80,
      "color_temperature": 5500,
      "diffusion": "double diffused, very soft shadows"
    },
    "fill_light": {
      "type": "white_reflector_card",
      "position": "camera-right, opposite key light",
      "intensity": 35,
      "purpose": "reduce shadow density, maintain detail in dark areas"
    },
    "rim_light": {
      "type": "small_spotlight",
      "position": "behind and above subject, from camera-right",
      "intensity": 60,
      "color_temperature": 6000,
      "purpose": "edge definition, separate subject from background"
    },
    "overall_mood": "bright professional studio, soft shadows, clean commercial photography"
  },
  "composition": {
    "camera_angle": "45-degree angle from slightly elevated position",
    "camera_height": "eye level + 20cm",
    "focal_length_equivalent": "85mm (medium telephoto for product)",
    "framing": "medium shot, device fills 60-70% of frame",
    "positioning": "device centered horizontally, slightly below vertical center",
    "depth_of_field": "f/8 aperture, deep focus, all elements sharp",
    "rule_of_thirds": "device positioned on upper-right intersection"
  },
  "surface": {
    "type": "invisible_acrylic_sheet",
    "appearance": "device appears to float, clean reflection below",
    "reflection_intensity": 15,
    "reflection_blur": "slight blur to avoid mirror effect"
  },
  "background": {
    "type": "seamless_paper_sweep",
    "color": "neutral gray (18% middle gray, RGB 118,118,118)",
    "gradient": "very subtle gradient from lighter top to slightly darker bottom",
    "texture": "completely smooth matte, no visible texture"
  },
  "technical_quality": {
    "sharpness": "crisp focus, high acutance",
    "dynamic_range": "high dynamic range, detail in highlights and shadows",
    "color_accuracy": "neutral color balance, accurate material representation",
    "no_artifacts": "no chromatic aberration, no noise, no distortion"
  },
  "output": {
    "resolution": "4096x4096",
    "bit_depth": "16-bit color",
    "format": "PNG",
    "color_space": "sRGB"
  }
}
```

**Usage**: Generate baseline, then iterate handles for variations

---

### Pattern 2: Material Variation Series (Dimension 2 - Skins)

**Use Case**: Show device in 10 different materials, everything else identical

**Strategy**: Lock all handles except product material

**Base JSON** (Wood Version):
```json
{
  "product": {
    "material_override": {
      "housing": "carved from single block of dark walnut wood",
      "surface_treatment": "hand-polished smooth finish",
      "grain": "natural wood grain visible, running horizontally",
      "color_tones": "rich dark brown with natural variation",
      "buttons": "inset wood pieces, slightly lighter shade",
      "knob": "turned wood, matching grain direction"
    }
  },
  "lighting": {...}, // LOCKED - same for all
  "composition": {...}, // LOCKED - same for all
  "background": {...} // LOCKED - same for all
}
```

**Metal Version** (change only material_override):
```json
{
  "product": {
    "material_override": {
      "housing": "CNC machined from solid aluminum block",
      "surface_treatment": "brushed finish, visible machining lines",
      "anodization": "matte black anodized coating",
      "buttons": "laser-etched aluminum, backlit",
      "knob": "knurled aluminum, aerospace-grade finish"
    }
  }
}
```

**Result**: 10 materials × $0.08 = $0.80 for complete series
All images perfectly aligned, only material changes

---

### Pattern 3: Design Variation (Dimension 3)

**Use Case**: Fundamentally different form factor

**Strategy**: Completely new product description, professional photography setup

```json
{
  "product": {
    "name": "VibeDeck Button Matrix Variant",
    "form": "desktop form factor, 150mm × 100mm × 20mm, sits flat on desk",
    "concept": "Stream Deck inspired button matrix with central rotary knob",
    "components": [
      {
        "component": "lcd_button_matrix",
        "layout": "3×4 grid (12 buttons total)",
        "button_size": "25mm × 25mm each",
        "button_type": "individual LCD screens per button, customizable icons",
        "spacing": "2mm gap between buttons"
      },
      {
        "component": "rotary_encoder",
        "position": "center of button matrix (replaces middle button)",
        "size": "larger 40mm diameter",
        "details": "knurled metal, RGB LED ring underneath"
      },
      {
        "component": "usb_connection",
        "type": "braided USB-C cable, permanently attached",
        "cable_length": "1.5 meters"
      }
    ],
    "housing_material": "matte black ABS plastic base with angled stand",
    "angle": "15-degree built-in tilt for ergonomic desktop viewing",
    "overall_aesthetic": "professional broadcast equipment, modular design"
  },
  "interaction_model": {
    "primary_input": "press LCD buttons for context/action selection",
    "secondary_input": "rotate knob for parameter adjustment",
    "visual_feedback": "button LEDs change based on active context",
    "use_case": "desktop control surface for content creators"
  },
  "lighting": {
    "setup": "desktop environment lighting",
    "ambient": "soft overhead office lighting",
    "device_self_illumination": "button LCDs glowing, RGB ring visible",
    "mood": "functional workspace, tech-focused"
  },
  "composition": {
    "camera_angle": "slightly elevated 30-degree angle",
    "context": "on desk with laptop edge visible in background",
    "focus": "device in sharp focus, background slightly blurred"
  },
  "background": {
    "context": "realistic desk workspace",
    "surface": "dark wood desk",
    "props": ["laptop keyboard edge", "coffee cup out of focus"],
    "lighting": "natural window light from left side"
  }
}
```

---

## Advanced JSON Techniques

### Technique 1: Component-Level Detail

Instead of describing device as whole, specify each component:

```json
{
  "components": [
    {
      "id": "rotary_knob",
      "material": "brushed aluminum 6061",
      "dimensions": "30mm diameter × 15mm height",
      "surface_finish": "concentric machining marks, #320 grit brush pattern",
      "edge_treatment": "chamfered edge, 1mm × 45 degrees",
      "top_surface": "slightly concave for finger grip",
      "shaft": "6mm D-shaft, visible from side"
    },
    {
      "id": "button_ctx1",
      "position": "top-left of 2×2 button grid",
      "type": "membrane switch with tactile dome",
      "cap_material": "black thermoplastic, matte texture",
      "label": {
        "text": "CTX1",
        "font": "DIN Bold, 8pt",
        "color": "white",
        "method": "pad printed",
        "alignment": "centered on button cap"
      },
      "led_backlight": "cool white LED, 5000K",
      "dimension": "12mm × 12mm × 2mm height"
    }
  ]
}
```

**Result**: Manufacturing-level precision, CAD-like specification

---

### Technique 2: Lighting Handles for Mood

Create reusable lighting configs:

**Config: Corporate Professional**
```json
{
  "lighting_preset": "corporate_professional",
  "characteristics": {
    "key_light": "large soft source, minimal shadows",
    "fill_ratio": "low contrast (3:1)",
    "color_temperature": "neutral daylight 5500K",
    "mood": "clean, trustworthy, professional"
  }
}
```

**Config: Tech Startup**
```json
{
  "lighting_preset": "tech_startup_edgy",
  "characteristics": {
    "key_light": "hard dramatic spotlight",
    "accent_lights": "colored LED accents (blue, cyan)",
    "fill_ratio": "high contrast (8:1)",
    "mood": "cutting-edge, innovation, bold"
  }
}
```

---

### Technique 3: JSON Diffing for A/B Testing

Use Git to track changes:

```bash
# Generate image A with lighting-v1.json
git add lighting-v1.json

# Modify lighting, save as lighting-v2.json
git diff lighting-v1.json lighting-v2.json
```

See exactly what changed:
```diff
-  "primary_light": { "intensity": 80 }
+  "primary_light": { "intensity": 100 }
```

**Benefit**: Understand cause of visual differences

---

## Cost Optimization with Nano Banana Pro

### Strategy 1: Use for Finals Only

1. Explore with DALL-E 3 or FLUX.2 Turbo (cheap)
2. Convert best concept to JSON
3. Generate final with Nano Banana Pro (4K quality)

**Savings**: $7.20 for 100 explorations (Turbo $0.80 vs Nano Banana $8)

---

### Strategy 2: Generate Series, Not Singles

If generating 20 material variations:
- Nano Banana Pro cost: $1.60
- Value: Perfect consistency (all aligned, same lighting)
- Alternative (FLUX.2 Pro): Inconsistent results even with same prompt

**ROI**: Worth premium for series work

---

### Strategy 3: Use for Manufacturing References

Generate 10 technical reference images:
- Nano Banana Pro: $0.80 (4K native, precision)
- FLUX.2 Pro: $0.80 (may need upscaling, less precision)

**ROI**: Same cost, better output for technical use

---

## Integration with VibeDeck Workflow

### When to Use Nano Banana Pro

**Dimension 1: Product Photography**
- Use for final hero images (4K quality)
- After angles selected via FLUX.2 Turbo

**Dimension 2: Skins** (Surface Treatments)
- Use for series generation (20 materials)
- Perfect consistency across variations

**Dimension 3: Design Variations**
- Skip (use FLUX.2 Turbo for exploration)
- Convert final selected concept to JSON for precision

**Dimension 4: Manufacturing Analysis**
- ✅ PRIMARY USE CASE
- Technical references, exploded views, CAD-style precision

---

## JSON Template Library

Create library of reusable JSONs:

```
poem/vibedeck-kickstarter-images/json-library/
├── base-product-shot.json (standard VibeDeck setup)
├── lighting-studio.json (professional studio)
├── lighting-dramatic.json (low-key dramatic)
├── lighting-high-key.json (bright clean)
├── composition-45deg.json (standard angle)
├── composition-overhead.json (flat lay)
├── background-gray.json (neutral studio)
├── background-desk.json (lifestyle context)
└── materials/
    ├── wood.json
    ├── metal.json
    ├── plastic.json
    └── glass.json
```

**Usage**: Mix and match modules, customize as needed

---

## Troubleshooting

### Issue: JSON Syntax Error

**Symptom**: Generation fails, error message
**Fix**: Validate JSON with linter (https://jsonlint.com)

---

### Issue: Output Doesn't Match Expectation

**Symptom**: Image looks different than intended
**Fix**:
1. Check each handle independently (comment out others)
2. Ensure no conflicting specifications
3. Be more explicit (add more detail)

---

### Issue: Repetitive Manual Editing

**Symptom**: Copying/pasting JSON, changing one field
**Fix**: Use JSON merge tool or script
```javascript
const base = require('./base.json');
const variant = { lighting: { primary_light: { intensity: 100 } } };
const merged = deepMerge(base, variant);
```

---

## Next Steps

1. **Review template**: See `docs/image-generation/templates/product-photography-template.json`
2. **Try example**: Use existing VibeDeck JSON to generate test image
3. **Create library**: Build collection of reusable handles
4. **Generate series**: Use for VibeDeck material variations
5. **Document results**: Track which patterns work best

---

## Resources

- **Full JSON Template**: `docs/image-generation/templates/product-photography-template.json`
- **JSON Prompting Concepts**: `docs/image-generation/reference/nano-banana-json-prompting.md`
- **API Implementation**: `docs/image-generation/reference/nano-banana-api-implementation.md`
- **Nano Banana Pro**: https://nanobana.io (platform link)

---

**Key Takeaway**: Nano Banana Pro is expensive but invaluable for technical precision, 4K output, and series generation with perfect consistency. Use selectively for finals and manufacturing references, not for exploration.
