# VibeDeck Image Generation Workflow

**Project**: VibeDeck Kickstarter Product Photography
**Date**: 2026-01-13
**Team**: David (Product Owner), Jen (Image Generation)

---

## Overview

This document explains the complete workflow for generating VibeDeck product images using the nano-banana JSON prompting system with custom style instructions.

---

## The Four-Lever System

As David described, there are four key components:

### 1. Data Document (Input)
**Location**: `input-complex.txt`
- Natural language description of the VibeDeck
- Contains all the product details: dimensions, materials, colors, components
- This is the "what" we're photographing

### 2. Template JSON (Structure)
**Location**: `template-product-photography.json`
- JSON schema with all the "handles" for controlling the image
- Sections: lighting, composition, surface, background, props, effects, mood
- This is the "how" we structure the prompt

### 3. Compilation Prompt (Agent)
**Location**: `agent-nano-banana-product-photography.md`
- The agent that merges Data + Template
- Understands how to fill in the template with data
- Produces complete JSON ready for Nano Banana

### 4. Custom Instructions (Style Variations)
**Location**: `custom-instructions-30-styles.md`
- 30 different style directives
- These are swapped in one at a time
- Allow generating multiple variations while keeping data/template static
- **This is the key to cost-effective style exploration**

---

## How It Works

```
┌─────────────────┐     ┌──────────────────────┐
│  Data Document  │     │  Custom Instruction  │
│  (VibeDeck desc)│     │  (e.g., CI-01)       │
└────────┬────────┘     └──────────┬───────────┘
         │                         │
         └─────────┬───────────────┘
                   │
                   ▼
         ┌─────────────────────┐
         │ Compilation Prompt  │
         │  (Merges all three) │
         └─────────┬───────────┘
                   │
                   ▼
         ┌─────────────────────┐
         │   Complete JSON     │
         │ (Ready for Nano     │
         │  Banana or DALL-E)  │
         └─────────────────────┘
```

---

## Directory Structure

```
docs/nano-banana/jan/
├── README.md                              # Original workflow instructions
├── agent-nano-banana-product-photography.md  # The compilation agent
├── template-product-photography.json      # JSON template structure
├── input-complex.txt                      # VibeDeck description (data)
├── input-simple.txt                       # Simple test data
├── output-vibedeck-example.json           # Example complete output
├── custom-instructions-30-styles.md       # 30 style variations (NEW)
├── VIBEDECK-IMAGE-GENERATION-WORKFLOW.md  # This document (NEW)
├── images/                                # Generated images go here (NEW)
│   ├── 1A-apple-minimalism.png
│   ├── 1B-cyberpunk-noir.png
│   ├── 1C-retro-tech-magazine.png
│   └── ... (more as generated)
└── notes/                                 # Documentation & tracking (NEW)
    ├── image-tracking-log.md             # Master tracking log
    └── json/                             # Prompts for each image
        ├── 1A-apple-minimalism-prompt.json
        ├── 1B-cyberpunk-noir-prompt.json
        ├── 1C-retro-tech-magazine-prompt.json
        └── ... (more as generated)
```

---

## Workflow Steps

### Step 1: Choose a Custom Instruction
From `custom-instructions-30-styles.md`, select one style to test.

Example:
- CI-01: Apple Minimalism
- CI-02: Cyberpunk Noir
- CI-16: Thailand Edition

### Step 2: Generate the JSON
Merge the following:
- Base VibeDeck data (from `input-complex.txt`)
- Template structure (from `template-product-photography.json`)
- Selected custom instruction (e.g., CI-01)

The agent (`agent-nano-banana-product-photography.md`) does this merge automatically when you load it in Claude Code.

**Result**: Complete JSON file saved to `notes/json/[ID]-[style]-prompt.json`

### Step 3: Generate the Image

#### Option A: Nano Banana Pro (High Quality, Expensive)
- Cost: ~$0.09 per image
- Best for: Final production images, detailed schematics
- Use when: We've finalized the style and need the absolute best quality

#### Option B: DALL-E 3 or Stable Diffusion (Good Quality, Cheaper)
- Cost: $0.04-0.20 per image
- Best for: Style exploration, testing variations
- Use when: We're experimenting with styles (NOW)

#### Option C: Other Models
- MidJourney, Imagen, etc.
- Research needed for cost/quality tradeoff

### Step 4: Save and Document
1. Save image to `images/[ID]-[style].png`
2. Log it in `notes/image-tracking-log.md`
3. Note: Image ID, Custom Instruction used, Model, Cost, Date

### Step 5: Get David's Feedback
David reviews and says things like:
- "I love 1A"
- "12C is great"
- "Mix 3B with 12C"

### Step 6: Iterate
Based on feedback:
- Generate refined versions
- Combine elements from favorites
- Create new custom instructions if needed

### Step 7: Final Production
Once style is locked in:
- Use Nano Banana Pro for final high-quality renders
- Generate multiple angles/variations of winning style
- Produce Kickstarter marketing assets

---

## Current Status (2026-01-13)

### ✅ Completed
- [x] Created 30 custom style instructions
- [x] Set up directory structure (images/, notes/, notes/json/)
- [x] Created documentation system (image tracking log)
- [x] Generated JSON prompts for first batch (1A, 1B, 1C)
- [x] Documented the workflow

### 🎨 Ready to Generate
- [ ] Image 1A: Apple Minimalism (CI-01)
- [ ] Image 1B: Cyberpunk Noir (CI-02)
- [ ] Image 1C: Retro-Tech Magazine (CI-03)
- [ ] Image 2A: Thailand Edition (CI-16)
- [ ] Image 2B: Philippines/Tagalog Edition (CI-17)

### ⏳ Pending
- Need to choose image generation model (DALL-E? Stable Diffusion?)
- Need API access/budget allocation
- Awaiting David's feedback on first batch

---

## Key Design Decisions

### Camera Distance: Close-up Product Shot
- Yesterday's image was TOO FAR AWAY
- Target: Product fills 60-70% of frame
- Reference style: Magazine product shot (like Apple product photography)
- NOT a lifestyle scene from far away

### Cost Management Strategy
1. **Phase 1 (NOW)**: Style exploration with cheap models
   - Goal: Find 2-3 style directions David loves
   - Cost target: Under $10 for 30-50 style tests

2. **Phase 2**: Refinement with mid-tier models
   - Iterate on favorites
   - Cost target: $20-30 for 10-20 refinements

3. **Phase 3**: Final production with Nano Banana Pro
   - Produce Kickstarter assets
   - Cost target: $50-100 for 5-10 final perfect images

### Labeling System
- Format: [Batch][Variant]
- Example: 1A, 1B, 1C (Batch 1, variants A, B, C)
- Each batch explores a theme (minimalism, lighting, country-specific, etc.)
- Variants within batch are related styles

---

## Custom Instruction Categories

### Photography Styles (CI-01 to CI-10)
- Apple Minimalism, Cyberpunk Noir, Retro-Tech Magazine
- Macro Detail, Lifestyle Action, High-Key Studio
- Dramatic Low-Key, Overhead Flat Lay, Isometric Technical
- Moody Cinematic

### Lighting Moods (CI-11 to CI-15)
- Golden Hour Warmth, Cool Laboratory Clinical
- RGB Gaming (Tasteful), Soft Natural Window Light
- Dramatic Rembrandt

### Country/Cultural Themes (CI-16 to CI-20)
- Thailand, Philippines/Tagalog, Japan Minimal Zen
- Nordic Minimalist, Brazilian Vibrant

### Background/Environment (CI-21 to CI-25)
- Transparent Tech, Coffee Shop Developer
- Corporate Boardroom, Hacker Basement Matrix
- Nature Meets Tech

### Technical/Compositional (CI-26 to CI-30)
- Exploded View Diagram, Reflection Study
- Dynamic Action Blur, Grid Pattern Modernist
- Atmospheric Haze

---

## Questions for David

1. **Which image generation model should I use for style tests?**
   - DALL-E 3? (OpenAI)
   - Stable Diffusion XL? (Stability AI)
   - MidJourney? (Discord-based)
   - Other?

2. **What's the budget for Phase 1 style exploration?**
   - How much can I spend on testing?

3. **Preferred aspect ratio for Kickstarter?**
   - 4:3 (current default)?
   - 16:9 (wider)?
   - 1:1 (square for Instagram)?

4. **Country editions - translation requirements?**
   - Should button labels show actual Thai/Tagalog text?
   - Or just aesthetic/cultural themes with English labels?

5. **Timeline?**
   - When do you need to review first batch?
   - When is Kickstarter launch target?

---

## Next Steps

### Immediate (Waiting on David)
1. Get model selection and API access
2. Get budget approval for generation
3. Get answers to questions above

### Once Approved
1. Generate Batch 1 (1A, 1B, 1C) - Initial style explorations
2. Generate Batch 2 (2A, 2B) - Country-specific themes
3. Generate Batch 3 (3A, 3B, 3C) - Lighting variations
4. Present to David for feedback

### After Feedback
1. Identify 2-3 favorite styles
2. Generate refinement variations
3. Iterate based on feedback
4. Prepare for final Nano Banana Pro production

---

## Resources

- **Nano Banana Pro**: [Access via Kai, Fal, or Google AI Studio]
- **Image Tracking Log**: `notes/image-tracking-log.md`
- **Custom Instructions**: `custom-instructions-30-styles.md`
- **Agent Prompt**: `agent-nano-banana-product-photography.md`

---

**Status**: System ready, awaiting green light to generate images.

**Contact**: Jen (Image Generation), David (Product Owner & Final Approval)
