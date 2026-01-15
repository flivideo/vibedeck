# Custom Instructions Improvements - 2026-01-13 18:15

## What Changed

Based on strategic analysis, the custom instructions system has been **significantly upgraded** with risk management, cost protection, and clearer Phase 1 discipline.

---

## Key Improvements

### 1. ✅ Risk Level Tagging System

**Every CI now has metadata:**
- **Risk**: Low / Medium / High
- **Cost Sensitivity**: Low / Medium / High
- **Model Reliability**: High / Medium / Low

**Two categories:**
- **[STYLE SAFE]** - 26 CIs that work well on cheap models (DALL-E 3, Stable Diffusion)
- **[NANO-ONLY]** - 4 CIs that require Nano Banana Pro precision

### 2. ✅ Identified 5 Anchor Styles

These become baseline evaluators to test FIRST on any new approach:

1. **CI-01: Apple Minimalism** - Gold standard for product photography
2. **CI-04: Ultra-Close Macro Detail** - Tests detail rendering and texture quality
3. **CI-06: High-Key Studio Bright** - Tests color accuracy and clean lighting
4. **CI-09: Isometric Technical** - Tests geometric precision
5. **CI-14: Soft Natural Window Light** - Tests natural lighting and approachability

These map directly to Kickstarter needs: hero image, detail shot, technical view, lifestyle context.

### 3. ✅ Global Camera Constraint (Non-Negotiable)

**Prevents regression across all CIs:**
```
Product must occupy 65-75% of frame.
Close-up hero shot, magazine-grade framing.
NOT too far away - this is product photography, not environmental photography.
```

Camera distance is NO LONGER negotiable per-style. It's baked into the system.

### 4. ✅ Phase 1 Discipline Rules

**CRITICAL: One CI. One Image. One Lesson.**

- Only ONE CI per generation during Phase 1
- NO combining yet (blurs causality)
- Skip [NANO-ONLY] instructions completely in Phase 1
- Use cheap models only (~$0.04/image)
- Track everything for clean attribution

**Why?** When David says "I love 3B", you need to know exactly why. Combining CIs early prevents learning.

### 5. ✅ Cost Protection Built-In

**Phase 1 Budget Safety:**
- 26 out of 30 CIs are [STYLE SAFE] = cheap to test
- Only 4 CIs need expensive Nano Banana Pro
- Saves ~$20-30 in exploration phase

**[NANO-ONLY] CIs to avoid in Phase 1:**
- CI-21: Transparent Tech (wireframe overlays)
- CI-26: Exploded View (component separation)
- CI-28: Dynamic Action Blur (motion capture)
- CI-30: Atmospheric Haze (volumetric lighting)

These fail silently on cheap models and waste money.

### 6. ✅ Strategic Recognition: Kickstarter Playbook

**Each CI maps to campaign needs:**
- CI-01, 06: Hero images
- CI-04, 09: Technical/detail shots
- CI-05, 22, 25: Lifestyle images
- CI-16, 17: Country variants (stretch goals)
- CI-07, 23: Premium tier positioning

This document is now:
- Marketing brief
- Art direction guide
- Contractor handoff doc
- Campaign asset checklist

---

## Impact on Workflow

### Before:
- ❌ No cost protection (could waste budget on wrong CIs)
- ❌ No priority order (which to test first?)
- ❌ Temptation to combine CIs too early (blurs learning)
- ❌ Camera distance could regress per-style

### After:
- ✅ Clear risk levels prevent waste
- ✅ 5 anchor styles = test these first
- ✅ Phase 1 rules = one CI at a time, no combining
- ✅ Global camera constraint prevents regressions
- ✅ Cost protection: 26 cheap to test, 4 expensive to skip

---

## Recommended Phase 1 Execution Order

1. **Test 5 Anchor Styles first** (CI-01, 04, 06, 09, 14) - ~$0.20
2. **Generate 10-15 more [STYLE SAFE] variations** - ~$0.40-0.60
3. **Get David's feedback** ("I love 1A, 3B, 7C")
4. **Iterate on favorites** (2-3 variations each) - ~$0.30-0.50
5. **Total Phase 1 cost**: ~$1.00-1.50 (instead of $27 if using Nano Banana for everything)

**Phase 2 (after David's feedback):**
- Mix and combine winning CIs
- Use [NANO-ONLY] instructions for selected favorites
- Generate final production assets with Nano Banana Pro

---

## Files Updated

1. **custom-instructions-30-styles.md**
   - Added risk level tags to all 30 CIs
   - Marked 5 anchor styles with 🎯
   - Added global camera constraint section
   - Updated usage notes with Phase 1 discipline
   - Added strategic value section (Kickstarter playbook)

2. **STATUS-FOR-DAVID.md**
   - Updated with "UPGRADED" status
   - Highlighted new risk level system
   - Called out cost protection benefits

3. **IMPROVEMENTS-2026-01-13.md** (this file)
   - Documents all changes made today
   - Provides rationale for improvements

---

## Why These Changes Matter

### Cost Efficiency
- Prevents wasting $0.09/image on CIs that fail on Nano Banana during exploration
- Enables testing 20+ styles for the price of 2-3 Nano Banana images

### Learning Clarity
- One CI per image = clean attribution
- When David says "I love this", you know exactly why
- No confounded variables

### Quality Control
- Global camera constraint prevents "too far away" regressions
- Anchor styles ensure baseline quality on any model
- Risk levels guide decision-making

### Strategic Alignment
- Recognized this is actually a Kickstarter marketing playbook
- Each CI maps to campaign asset needs
- Document becomes art direction for entire campaign

---

## Next Steps

**Still waiting on:**
1. Model choice (recommend DALL-E 3 @ $0.04/image)
2. API access/credentials
3. Budget approval (~$1-2 for Phase 1)

**Once approved:**
1. Generate 5 anchor styles first (CI-01, 04, 06, 09, 14)
2. Show David for quick validation
3. Continue with 10-15 more [STYLE SAFE] variations
4. Collect feedback
5. Iterate on winners

---

**Summary**: The system is now production-ready with cost protection, clear priorities, and strategic recognition of its value beyond just prompt engineering.
