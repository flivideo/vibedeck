# 30 Custom Style Instructions for VibeDeck Product Photography

**Purpose**: These custom instructions are the "fourth lever" in our prompt engineering system. Use them with the compilation prompt to generate style variations while keeping data and template static.

**Usage**: Include ONE custom instruction at a time with the compilation prompt to generate different styled outputs.

---

## 🎯 ANCHOR STYLES (Start Here)

These 5 styles are your baseline evaluators - test these FIRST on any new model/approach:

- **CI-01: Apple Minimalism** - The gold standard for product photography
- **CI-04: Ultra-Close Macro Detail** - Tests detail rendering and texture quality
- **CI-06: High-Key Studio Bright** - Tests color accuracy and clean lighting
- **CI-09: Isometric Technical** - Tests geometric precision and technical rendering
- **CI-14: Soft Natural Window Light** - Tests natural lighting and approachability

These map to your core Kickstarter needs: hero image, detail shot, technical view, lifestyle context.

---

## ⚠️ CRITICAL: Risk Levels & Model Selection

**[STYLE SAFE]** = Works well on cheap models (DALL-E 3, Stable Diffusion) - use for Phase 1 exploration
**[NANO-ONLY]** = Requires Nano Banana Pro to execute properly - save for Phase 2+

**DO NOT waste budget on [NANO-ONLY] instructions during style exploration phase.**

### [NANO-ONLY] Instructions (Avoid Until Phase 2)
- **CI-21**: Transparent Tech Aesthetic (wireframe overlays)
- **CI-26**: Exploded View Diagram (component separation)
- **CI-28**: Dynamic Action Blur (motion capture complexity)
- **CI-30**: Atmospheric Haze (volumetric lighting precision)

---

## 📐 GLOBAL CAMERA CONSTRAINT (Non-Negotiable)

**ALL custom instructions must respect this baseline:**

```
Product must occupy 65-75% of frame.
Close-up hero shot, magazine-grade framing.
NOT too far away - this is product photography, not environmental photography.
Camera distance: Close enough to see button labels, textures, and display content clearly.
```

This prevents regressions when swapping CIs. Camera distance is NOT negotiable per-style.

---

## Photography Style Variations (1-10)

### CI-01: Apple Minimalism [STYLE SAFE] 🎯 ANCHOR
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Apply extreme minimalism in the style of Apple product photography. Pure white background, perfectly balanced composition, no visible props except the product. Lighting should be absolutely pristine with zero harsh shadows. Create negative space that's zen-like in its simplicity.

### CI-02: Cyberpunk Noir [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Heavy contrast with deep shadows and neon accents. Background should hint at a dark, rain-slicked urban environment (heavily blurred). Emphasize the cyan and green practical lights from the device. Add subtle purple/magenta rim lighting. Moody, dystopian-future aesthetic.

### CI-03: Retro-Tech Magazine Editorial [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Style reminiscent of 1980s-90s tech magazines (Byte, Popular Science). Warmer color temperature (3200K tungsten). Background suggests a wood-paneled home office. Include retro props like partially visible CRT monitor glow. Nostalgic but professional.

### CI-04: Ultra-Close Macro Detail [STYLE SAFE] 🎯 ANCHOR
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Extreme close-up focusing on the rotary encoder and surrounding buttons. Camera distance: macro lens (100mm), shallow depth of field (f/2.8). Display visible but blurred in background. Show texture detail of brushed aluminum, keycap legends sharp and crisp.

### CI-05: Lifestyle Action Shot [STYLE SAFE]
**Risk**: Medium | **Cost Sensitivity**: Medium | **Model Reliability**: Medium

Device being actively used - show hands hovering over or touching the rotary encoder. Camera at user's perspective (eye-level, slight angle). Background shows actual coding environment with monitor displaying code. More candid, less staged.

### CI-06: High-Key Studio Bright [STYLE SAFE] 🎯 ANCHOR
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Flood the scene with light. White or very light gray background. Minimal shadows, high key lighting. Product appears to float in clean, airy space. Professional catalog photography style. Colors should be accurate but the overall tone is bright and optimistic.

### CI-07: Dramatic Low-Key [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Mostly darkness with strategic lighting revealing only key features. Black or very dark gray background. Rim lights define edges. The device's practical lights (OLED, underglow) are the primary light sources creating dramatic glow effects. Mysterious, premium.

### CI-08: Overhead Flat Lay [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Camera positioned directly above (90 degrees overhead). Device centered. Arrange complementary items around it in organized grid (mechanical keyboard, coffee mug, notebook, pen). Instagram flat-lay aesthetic. Surface: light wood or marble.

### CI-09: Isometric Technical [STYLE SAFE] 🎯 ANCHOR
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Camera angle suggesting isometric perspective (30-45 degrees). Emphasize geometric shapes and technical precision. Background: subtle grid pattern or blueprint texture (faint, not distracting). Clinical, architectural feeling. Sharp focus throughout (f/11-f/16).

### CI-10: Moody Cinematic [STYLE SAFE]
**Risk**: Medium | **Cost Sensitivity**: Medium | **Model Reliability**: Medium

Cinematic aspect ratio (2.39:1 or 16:9). Dramatic side lighting creating strong shadows. Color grading: teal shadows, warm highlights. Background suggests noir film set - venetian blind light patterns, atmospheric haze. Premium entertainment tech aesthetic.

---

## Lighting Mood Variations (11-15)

### CI-11: Golden Hour Warmth [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

All lighting simulates golden hour sun. Color temperature: 2700K warm. Soft, diffused sunlight from low angle. Background hints at warm interior with natural light streaming in. Cozy, inviting, human-focused.

### CI-12: Cool Laboratory Clinical [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Pure white light, 6500K daylight balanced. Even illumination, minimal shadows. Background suggests tech lab or clean room (blurred). Emphasize precision and scientific quality. Reflections on surface are clean and controlled.

### CI-13: RGB Gaming (Tasteful) [STYLE SAFE]
**Risk**: Medium | **Cost Sensitivity**: Medium | **Model Reliability**: Medium

Incorporate subtle multi-color lighting but keep it sophisticated, not garish. Background: deep blue-purple gradient. Add magenta and cyan rim lights. The device's own lights remain primary focus. Modern gaming setup aesthetic without going over-the-top.

### CI-14: Soft Natural Window Light [STYLE SAFE] 🎯 ANCHOR
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Primary light source: large diffused window (camera left). Soft, wrapping light with gentle shadows. Background: hints of indoor plants, bookshelf (blurred). Natural, comfortable, home office vibes. Color temperature: 5000K slightly warm daylight.

### CI-15: Dramatic Rembrandt [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Classic Rembrandt lighting setup (45-degree key light creating triangle of light on far side). Strong directional light with defined shadows. Background fades to darkness. Emphasizes volume and three-dimensionality. Fine art portrait lighting applied to product.

---

## Country/Cultural Themes (16-20)

### CI-16: Thailand Edition [STYLE SAFE]
**Risk**: Medium | **Cost Sensitivity**: Medium | **Model Reliability**: Medium

Integrate Thai cultural elements: Background hints at warm teak wood and silk textures (blurred). Color palette: incorporate Thai flag colors subtly - red, white, blue accents in rim lighting. If displaying button labels, use Thai script where appropriate. Warm, golden lighting suggesting tropical ambiance.

### CI-17: Philippines/Tagalog Edition [STYLE SAFE]
**Risk**: Medium | **Cost Sensitivity**: Medium | **Model Reliability**: Medium

Filipino cultural integration: Background suggests capiz shell texture or bamboo elements (subtle, blurred). Color palette: Philippine flag inspiration - red, blue, yellow, white. Button labels in Tagalog script. Warm lighting with hints of sunset colors (pastels - pink, orange).

### CI-18: Japan Minimal Zen [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Ultra-refined Japanese aesthetic. Background: subtle hints of shoji screen texture or wabi-sabi wood grain. Lighting: soft, indirect, avoiding harsh contrast. Color palette: muted earth tones with occasional accent (single red element). Emphasis on ma (negative space) and balance.

### CI-19: Nordic Minimalist [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Scandinavian design influence. Background: light blonde wood or white. Cool color temperature (5500-6500K). Clean, functional aesthetic. Lighting is bright but soft. Overall feeling: hyggelig (cozy minimalism). Palette: whites, grays, light wood tones with single accent color.

### CI-20: Brazilian Vibrant [STYLE SAFE]
**Risk**: Medium | **Cost Sensitivity**: Medium | **Model Reliability**: Medium

Energetic, colorful aesthetic drawing from Brazilian visual culture. Background hints at tropical colors (blurred). Lighting: warm and bright. While keeping the VibeDeck design intact, the overall scene has more energy and color saturation. Verde e amarelo accents in environment.

---

## Background/Environment Variations (21-25)

### CI-21: Transparent Tech Aesthetic [NANO-ONLY] ⚠️
**Risk**: High | **Cost Sensitivity**: High | **Model Reliability**: Low
**DO NOT use on cheap models - wireframe overlays require Nano Banana precision**

Background is pure black or very dark. Product appears to float. Emphasize transparency and technical diagrams - add subtle wireframe or circuit board patterns in background (faint, glowing lines). Sci-fi UI overlay aesthetic.

### CI-22: Coffee Shop Developer [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Environment: warm café setting (heavily blurred). Background hints: espresso cup (out of focus), warm Edison bulb lighting, light wood table. Casual creative workspace. Natural window light mixed with warm interior lighting. Approachable, indie developer vibe.

### CI-23: Corporate Boardroom Premium [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Sleek, expensive environment. Surface: black marble or polished dark wood. Background: hints of modern office architecture (glass, steel, blurred). Cool, professional lighting. The VibeDeck as executive-level tool. Sophisticated, powerful aesthetic.

### CI-24: Hacker Basement Matrix [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Darker environment suggesting underground tech space. Background: hints of server racks, cable management, multiple monitors with green terminal text (blurred). Cooler color temperature. Emphasize the matrix green display. Tech-underground aesthetic.

### CI-25: Nature Meets Tech [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Unexpected contrast: high-tech device in natural setting. Surface: rough-sawn wood or stone. Background: very blurred natural elements (plants, outdoor light). The juxtaposition creates interest. Lighting: natural daylight, soft shadows. Digital nomad, work-from-anywhere aesthetic.

---

## Technical/Compositional Variations (26-30)

### CI-26: Exploded View Diagram [NANO-ONLY] ⚠️
**Risk**: High | **Cost Sensitivity**: High | **Model Reliability**: Low
**DO NOT use on cheap models - component separation requires Nano Banana precision**

Show the device with components slightly separated (floating apart) as if in technical exploded diagram. Each component clearly visible with subtle connecting lines. Background: clean white or light gray. Technical documentation aesthetic. All elements sharp focus.

### CI-27: Reflection Study [STYLE SAFE]
**Risk**: Medium | **Cost Sensitivity**: Medium | **Model Reliability**: Medium

Surface: high-gloss black acrylic or mirror. Perfect reflection of device below. Emphasize symmetry and reflection quality. Minimal background (dark gradient). Focus on the interplay between device and reflection. Artistic, contemplative composition.

### CI-28: Dynamic Action Blur [NANO-ONLY] ⚠️
**Risk**: High | **Cost Sensitivity**: High | **Model Reliability**: Low
**DO NOT use on cheap models - motion capture complexity requires Nano Banana**

Suggest motion: hands reaching for the device (slightly motion-blurred) or the rotary encoder mid-turn. Device itself is sharp. Background shows code scrolling on screen (motion blur). Conveys active use and energy. Camera: fast shutter on subject, slower on action elements.

### CI-29: Grid Pattern Modernist [STYLE SAFE]
**Risk**: Low | **Cost Sensitivity**: Low | **Model Reliability**: High

Composition emphasizes geometric precision. Background: subtle grid or graph paper pattern. Device aligned to grid. Additional elements (cable, props) follow geometric relationships. Bauhaus-inspired. Clean lines, mathematical precision. Flattering but structural lighting.

### CI-30: Atmospheric Haze [NANO-ONLY] ⚠️
**Risk**: High | **Cost Sensitivity**: High | **Model Reliability**: Low
**DO NOT use on cheap models - volumetric lighting requires Nano Banana precision**

Add subtle atmospheric effects: light rays cutting through space (volumetric lighting), slight haze or fog in background creating depth. Practical lights from device create visible beam paths through haze. Cinematic, moody. Not too heavy - still product-focused but with atmosphere.

---

## Usage Notes - Phase 1 (Style Exploration)

### CRITICAL RULES FOR PHASE 1:

**One CI. One Image. One Lesson.**

- **ONE at a time**: Use ONLY ONE custom instruction per generation. NO combining yet.
- **Why no combining?** Combining CIs blurs causality. You won't know why something worked.
- **Feedback clarity**: When David says "I love 3B", you need clean attribution to that single CI.
- **Only [STYLE SAFE]**: Skip [NANO-ONLY] instructions completely during Phase 1 - they waste budget.
- **Cheap models first**: Use DALL-E 3 (~$0.04) or Stable Diffusion for all [STYLE SAFE] instructions.
- **Camera distance is global**: All CIs must respect the 65-75% frame rule. No exceptions.
- **Track everything**: Label each output (1A, 1B, etc.) and document which CI was used.

### Phase 2 (Later - After Feedback):
- Mix and combine CIs ("3B lighting with 1A composition")
- Use [NANO-ONLY] instructions for selected favorites
- Generate refinements and variations
- Create final production assets

---

## Reproduction Template

When documenting each generated image, use this format:

```
Image ID: [1A]
Custom Instruction: [CI-01: Apple Minimalism]
Model Used: [e.g., DALL-E 3, Stable Diffusion XL]
Cost: [$X.XX]
Date: [YYYY-MM-DD]
Notes: [What worked, what didn't]
Reproduce: [Yes/No - can this be regenerated with same settings?]
```

---

---

## 🎯 Strategic Value: This Is Your Kickstarter Playbook

**You've accidentally built something rare:**

Each CI maps cleanly to Kickstarter campaign needs:
- **CI-01, 06**: Hero images (clean, premium, trustworthy)
- **CI-04, 09**: Technical/detail shots (for specs section)
- **CI-05, 22, 25**: Lifestyle images (showing real-world use)
- **CI-16, 17**: Country variant images (stretch goals)
- **CI-07, 23**: Premium tier positioning

This document doubles as:
- Marketing brief ("What visual styles do we need?")
- Art direction guide ("How should each shot look?")
- Contractor handoff doc ("Here's exactly what to produce")
- Campaign asset checklist

**Keep this structure.** It's more valuable than just prompt engineering.

---

## Summary: Start Smart

### Phase 1 Priority Order:
1. **Test the 5 Anchor Styles first** (CI-01, 04, 06, 09, 14)
2. **Generate 10-15 [STYLE SAFE] variations** (~$0.50-1.50 budget)
3. **Get David's feedback** ("I love 1A, 3B, 7C...")
4. **Iterate on favorites** (2-3 variations each)
5. **Save [NANO-ONLY] for Phase 2** (after style direction is locked)

### Cost Protection:
- 26 out of 30 CIs are **[STYLE SAFE]** = cheap to test
- Only 4 CIs are **[NANO-ONLY]** = expensive, skip for now
- This saves ~$20-30 in Phase 1 exploration

**Next Step**: Feed these custom instructions ONE AT A TIME into your compilation process to generate different styled variations of the VibeDeck product shot.
