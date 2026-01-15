# Injection Molding Guide for VibeDeck Hardware

**Purpose**: Design rules and feasibility guidelines for injection-molded VibeDeck components
**Last Updated**: 2026-01-15

---

## Overview

**Injection molding** is the primary manufacturing method for high-volume plastic production (1,000+ units). Understanding design constraints early prevents costly tooling revisions and enables accurate cost estimation.

**Key Advantage**: Low per-unit cost at scale ($5-12 per device at 10K units)
**Key Disadvantage**: High upfront tooling investment ($5K-50K depending on complexity)

---

## Injection Molding Fundamentals

### The Process

1. **Plastic pellets** heated until molten (~200-300°C)
2. **Injected** under high pressure into steel/aluminum mold cavity
3. **Cooled** until solidified (15-60 seconds typical)
4. **Ejected** from mold using ejector pins
5. **Repeat** for next part (cycle time: 30-90 seconds)

### Mold Structure

**Two halves**:
- **Cavity side** (A-side): Exterior surface, cosmetic appearance
- **Core side** (B-side): Interior features, bosses, ribs

**Parting line**: Where mold halves meet (visible seam on part)

---

## Design Rules for Injection Molding

### Rule 1: Wall Thickness

**Requirement**: Uniform wall thickness throughout part

**Guidelines**:
- **Minimum**: 1.0mm (thin-wall molding, requires expertise)
- **Typical**: 1.5mm - 3.0mm (standard electronics housing)
- **Maximum**: 5.0mm (avoid thick sections, causes sink marks)
- **Variation**: Keep within 25% (e.g., 2mm ± 0.5mm)

**VibeDeck Application**:
```
Main housing: 2.0mm nominal wall thickness
Button caps: 1.5mm (thinner for tactile feel)
LCD bezel: 2.5mm (structural reinforcement)
```

**Why It Matters**:
- Thick sections cool slower → sink marks, warping
- Thin sections may not fill completely
- Uniform thickness → even cooling → minimal warpage

---

### Rule 2: Draft Angles

**Requirement**: Tapered walls for mold release (wider at parting line)

**Guidelines**:
- **Minimum**: 0.5° (difficult, may stick)
- **Recommended**: 1° - 2° (smooth ejection)
- **Textured surfaces**: Add 1° per 0.025mm of texture depth

**VibeDeck Application**:
```
Exterior walls: 2° draft (easy release, invisible to eye)
Interior ribs: 3° draft (better release from core)
Button pockets: 5° draft (deep pockets need more taper)
```

**Measurement**:
```
Draft angle = arctan(taper / depth)
Example: 1° draft on 50mm tall wall = 0.87mm taper
```

---

### Rule 3: Radii (Rounded Corners)

**Requirement**: No sharp internal corners (stress concentrators)

**Guidelines**:
- **Internal corners**: Minimum 0.5mm radius (preferably 1mm+)
- **External corners**: 0.25mm - 0.5mm radius (cosmetic)
- **Rule of thumb**: Internal radius = 0.5 × wall thickness

**VibeDeck Application**:
```
Housing internal corners: 1.0mm radius (50% of 2mm wall)
Button pocket corners: 0.75mm radius
Mounting boss bases: 1.5mm radius (stress relief)
```

**Why It Matters**:
- Sharp corners concentrate stress → cracks
- Sharp corners don't fill well → voids
- Radii improve mold flow and part strength

---

### Rule 4: Undercuts (AVOID)

**Definition**: Features that prevent straight pull-out from mold

**Problem**: Require expensive mold features (side actions, lifters)

**Solutions**:
1. **Eliminate**: Redesign to avoid undercut
2. **Move to parting line**: Orient feature so it's not trapped
3. **Side action**: Use sliding core (adds $2K-10K to tooling)
4. **Lifter**: Angled slide (adds $1K-5K to tooling)

**VibeDeck Critical Areas**:
```
❌ LCD bezel with overhanging lip → UNDERCUT
✅ Solution: Use separate snap-fit bezel ring (no undercut)

❌ Button with side detent → UNDERCUT
✅ Solution: Vertical snap features only

❌ USB port recess with overhang → UNDERCUT
✅ Solution: Port opening perpendicular to parting line
```

**Cost Impact**: Each side action adds $2K-10K to tooling

---

### Rule 5: Ribs and Bosses

**Purpose**: Structural reinforcement, screw mounting

**Rib Guidelines**:
- **Height**: Maximum 3× wall thickness
- **Thickness**: 50-60% of adjacent wall
- **Draft**: 0.5° minimum per side (1° total)
- **Base radius**: 0.25× wall thickness

**Boss Guidelines**:
- **Outer diameter**: 2× screw diameter (M2 screw → 4mm OD)
- **Wall thickness**: 50% of boss OD
- **Base radius**: 0.5× wall thickness
- **Coring**: Through-hole or blind hole for screw

**VibeDeck Application**:
```
PCB mounting bosses (4 locations):
- M2 screw → 4mm outer diameter
- 2mm wall thickness (50% of 4mm)
- 1.5mm base radius
- Through-hole: 2.2mm for M2 screw

Interior ribs (structural support):
- 2mm wall → 1.2mm rib thickness (60%)
- Maximum 6mm rib height (3× wall)
- 3° draft per side
- 0.5mm base radius
```

---

### Rule 6: Parting Line Placement

**Definition**: Visible line where mold halves meet

**Guidelines**:
- Place on **least visible surface** (back, bottom, edge)
- Avoid placing across **cosmetic A-surfaces**
- Consider **flash** (thin excess plastic along parting line)

**VibeDeck Recommendation**:
```
Primary parting line: Around perimeter at mid-height
- Top half (A-side): Front face with LCD, buttons, knob
- Bottom half (B-side): Back surface with label area
- Parting line location: Side edge (minimally visible)
```

**Flash Management**:
- Typically 0.05mm - 0.15mm (barely visible)
- Can be deflashed (tumbling, hand trim)
- Budget $0.50-1.00 per unit for deflashing

---

### Rule 7: Texture and Surface Finish

**Options**:
- **Polished**: Glossy, mirror-like (SPI A-1, A-2, A-3)
- **Semi-gloss**: Slight sheen (SPI B-1, B-2, B-3)
- **Matte**: Low gloss (SPI C-1, C-2, C-3)
- **Textured**: Patterns like leather, wood grain (MT-11050, etc.)

**Guidelines**:
- Textured surfaces easier to manufacture (hide imperfections)
- Glossy surfaces show every defect (require premium mold)
- Add draft angle for texture depth

**VibeDeck Recommendation**:
```
Exterior housing: Matte texture (MT-11050 "fine leather")
- Hides fingerprints
- Professional appearance
- Adds grip
- Requires 2.5° draft (1° base + 1.5° for texture)

Button caps: Semi-gloss smooth
- Tactile feel
- Easy to clean

LCD bezel area: Glossy black
- Premium detail accent
- Requires A-2 polish (expensive)
```

**Cost Impact**:
- Textured: Standard cost
- Glossy A-2 polish: +$2K-5K tooling, +$0.50 per unit (polishing time)

---

## Material Selection

### Common Plastics for Electronics

| Material | Properties | Cost | VibeDeck Suitability |
|----------|-----------|------|---------------------|
| **ABS** | Tough, easy to mold, paintable | $ | ⭐⭐⭐⭐⭐ Excellent |
| **PC** | High impact, transparent, heat resistant | $$ | ⭐⭐⭐⭐ Good (overkill) |
| **PC-ABS** | Best of both, premium | $$ | ⭐⭐⭐⭐⭐ Excellent |
| **PP** | Flexible, chemical resistant, cheap | $ | ⭐⭐ Poor (too flexible) |
| **PA (Nylon)** | Strong, wear resistant, hygroscopic | $$ | ⭐⭐⭐ OK (absorbs moisture) |
| **POM** | Low friction, precise, expensive | $$$ | ⭐⭐⭐ OK (overkill) |

**Recommendation for VibeDeck**: **ABS** or **PC-ABS blend**

---

### ABS (Acrylonitrile Butadiene Styrene)

**Properties**:
- Tensile strength: 40 MPa
- Impact resistance: Good
- Heat deflection: 85°C
- Surface finish: Excellent
- Machinability: Good
- Paintability: Excellent

**Advantages for VibeDeck**:
✓ Low cost ($2-3/kg)
✓ Easy to mold (forgiving material)
✓ Good surface finish out of mold
✓ Can be painted or plated
✓ Accepts textured mold surfaces well
✓ Good dimensional stability

**Disadvantages**:
✗ Lower heat resistance (not a concern for VibeDeck)
✗ UV sensitive (indoor use only)
✗ Moderate chemical resistance

**Cost per unit** (material only):
- VibeDeck housing volume: ~50 cm³
- ABS density: 1.05 g/cm³
- Weight: 52.5g
- Material cost: $0.10-0.15 per device

---

### PC-ABS Blend

**Properties**:
- Combines PC toughness with ABS processability
- Higher impact resistance than pure ABS
- Better heat resistance than pure ABS

**Advantages for VibeDeck**:
✓ Premium feel and durability
✓ Better drop resistance (important for handheld)
✓ Wide processing window (easier tooling)

**Disadvantages**:
✗ 30-50% more expensive than ABS
✗ Slightly harder to mold (higher temperatures)

**When to use**: Premium VibeDeck variant, if drop testing shows ABS insufficient

---

## Tooling Cost Estimation

### Mold Complexity Factors

**Simple Mold** ($5K-15K):
- Single cavity (one part per shot)
- No side actions or lifters
- Minimal cosmetic requirements
- Soft aluminum tooling OK for prototyping

**Moderate Mold** ($15K-30K):
- Single cavity
- 1-2 side actions
- Good surface finish required
- Hardened steel for production

**Complex Mold** ($30K-80K):
- Multi-cavity (2-8 parts per shot)
- Multiple side actions
- High-cosmetic A-surfaces
- Premium finishes (A-2 polish, etc.)

---

### VibeDeck Housing Mold Estimate

**Complexity Analysis**:
- Main housing: 2-piece clamshell design
- Components: Top half + bottom half (2 molds or family mold)
- Side actions: Possibly 1-2 for USB port, button recesses
- Surface finish: Textured (standard cost)
- Cavity: Single cavity initially, 2-4 cavity for production

**Mold Configurations**:

**Option A: Prototype Mold (Aluminum)** - $8K-12K
- Single cavity
- Soft aluminum (20K-50K shots lifespan)
- Good for 500-2000 units
- 8-10 week lead time

**Option B: Production Mold (Steel, Single Cavity)** - $18K-25K
- Single cavity
- Hardened steel (500K+ shots lifespan)
- Good for full production run
- 10-12 week lead time
- 1 side action for LCD bezel area

**Option C: Production Mold (Steel, Multi-Cavity)** - $35K-50K
- 2-4 cavities (doubles/quadruples output)
- Hardened steel
- Amortized over higher volume
- 12-14 week lead time

---

### Kickstarter Decision Tree

**If Kickstarter Goal < 500 units**:
→ Skip injection molding, use 3D printing (see 3d-printing-guide.md)

**If Kickstarter Goal 500-2000 units**:
→ Aluminum prototype mold ($10K)
→ Cost: $10K tooling + $15/unit = $17.50/unit amortized at 1000 units

**If Kickstarter Goal 2000-10,000 units**:
→ Steel production mold, single cavity ($20K)
→ Cost: $20K tooling + $8/unit = $10/unit amortized at 10,000 units

**If Kickstarter Goal > 10,000 units**:
→ Steel multi-cavity mold ($45K)
→ Cost: $45K tooling + $6/unit = $10.50/unit amortized at 10,000 units
→ Future runs: $6/unit (tooling already paid)

---

## Per-Unit Cost Breakdown

### Cost Components

**Material** (ABS):
- Raw plastic: $0.10-0.15 per device
- Colorant/additives: $0.02-0.05
- **Subtotal**: $0.12-0.20

**Molding Labor**:
- Machine time: $0.50-1.50 per device (depending on cycle time, volume)
- Operator: $0.25-0.50
- Quality inspection: $0.15-0.30
- **Subtotal**: $0.90-2.30

**Secondary Operations**:
- Deflashing: $0.20-0.50 (if needed)
- Assembly (if multi-part): $0.50-1.50
- Pad printing labels: $0.30-0.80
- **Subtotal**: $1.00-2.80

**Packaging**:
- Box, foam insert, manual: $1.00-2.00

**Total Per-Unit** (at volume):
- **Low-cost scenario**: $3.00-4.00 per device (10K+ units, simple design)
- **Mid-cost scenario**: $5.00-8.00 per device (realistic for VibeDeck)
- **High-cost scenario**: $8.00-12.00 per device (complex design, low volume)

---

## VibeDeck-Specific Considerations

### LCD Bezel Area

**Challenge**: Screen surround with minimal clearance

**Design Options**:

**Option 1: Integrated Bezel** (More Complex)
```
Pro: Single-piece housing, cleaner look
Con: Requires side action for undercut ($5K+ extra tooling)
Con: Tight tolerances for LCD fit
```

**Option 2: Separate Snap-Fit Bezel** (Recommended)
```
Pro: No undercuts, simpler mold
Pro: Easier LCD assembly (snap in place)
Pro: Bezel can be different finish (glossy) than housing
Con: Visible seam line (minor)
```

**Recommendation**: Separate snap-fit bezel ring
- Reduces tooling cost by $5K
- Easier assembly
- Allows premium finish on bezel (glossy black) vs textured housing

---

### Button Area

**Challenge**: 4 buttons (CTX1-4) with tactile membrane switches

**Design Options**:

**Option 1: Molded Button Caps + Silicone Membrane**
```
Process:
1. Mold 4 button caps separately (simple mold)
2. Purchase silicone membrane with conductive pads
3. Assemble: membrane → PCB, caps snap onto membrane

Pro: Standard design, proven
Pro: Good tactile feel
Cost: Button cap mold $2K, membrane $0.50/unit
```

**Option 2: Integrated Membrane Buttons**
```
Process:
1. Housing has thin flexible sections for buttons
2. No separate caps needed

Pro: Fewer parts, cleaner look
Con: Poor tactile feel (soft plastic buttons)
Con: Not recommended for VibeDeck (tactile feedback important)
```

**Recommendation**: Molded button caps + silicone membrane (Option 1)

---

### Rotary Encoder Knob

**Challenge**: Knob needs to be separate part (different finish)

**Design**:
```
Main housing: Matte black ABS, textured
Rotary knob: Brushed aluminum (not molded)

Manufacturing:
- Housing molded plastic
- Knob: CNC machined aluminum or injection molded with metal finish paint
- Knob press-fits or screws onto encoder shaft
```

**Option 1: CNC Aluminum Knob**
```
Pro: Premium feel, durable, authentic metal
Con: $3-5 per knob (expensive)
Cost per unit: $3-5
```

**Option 2: Molded Knob with Metallic Paint**
```
Pro: Much cheaper ($0.50-1.00)
Pro: Can achieve convincing aluminum look
Con: Paint will wear over time
Cost per unit: $0.50-1.00
```

**Kickstarter Strategy**:
- Standard tier: Molded knob with metallic finish
- Premium tier: CNC aluminum knob (+$10 pledge level)

---

### USB-C Port

**Challenge**: Port recess with potential undercut

**Design Solution**:
```
Orient port perpendicular to parting line:
- Parting line at mid-height of device
- USB-C port on bottom edge
- Port opening parallel to core pull direction
- No undercut, no side action needed
```

**Strain Relief**:
```
Add internal cable channel:
- Molded feature guides cable
- Prevents stress on PCB solder joints
- No additional tooling cost (core feature)
```

---

## Quality and Defects

### Common Injection Molding Defects

**Sink Marks**:
- Cause: Thick sections cooling unevenly
- VibeDeck risk: Button areas, mounting bosses
- Solution: Uniform 2mm wall, cored bosses

**Flash**:
- Cause: Mold not fully closed, worn tooling
- VibeDeck risk: Parting line along perimeter
- Solution: Specify max 0.1mm flash, deflashing process

**Short Shots** (incomplete fill):
- Cause: Insufficient injection pressure, blocked flow
- VibeDeck risk: Thin areas (button caps, ribs)
- Solution: Adequate draft angles, radii at corners

**Warpage**:
- Cause: Uneven cooling, thick sections
- VibeDeck risk: Housing may bow if walls inconsistent
- Solution: Uniform 2mm wall, proper cooling time

**Surface Defects** (flow lines, weld lines):
- Cause: Multiple injection points, cold material flow
- VibeDeck risk: Visible lines on A-surface
- Solution: Single gate location on B-surface, adequate temperature

---

## Design Checklist for VibeDeck

Before finalizing design for tooling:

### Geometry
- [ ] Wall thickness: 1.5mm - 3.0mm, uniform ±25%
- [ ] Draft angles: 2° minimum on all walls
- [ ] Internal radii: 1.0mm minimum (50% of wall thickness)
- [ ] External radii: 0.5mm minimum
- [ ] No sharp corners anywhere

### Features
- [ ] Ribs: 60% of wall thickness, 3° draft, 3× wall height max
- [ ] Bosses: 4mm OD for M2 screws, 1.5mm base radius
- [ ] Snap fits: Vertical pull only, no side undercuts

### Parting Line & Mold
- [ ] Parting line on least visible edge
- [ ] All features pullable from 2-piece mold
- [ ] No undercuts OR budget for side actions
- [ ] Gate location on B-surface (back/inside)

### Surface Finish
- [ ] Texture specified (MT-11050 recommended)
- [ ] Draft increased for texture depth
- [ ] Cosmetic surfaces on A-side (cavity)

### Assembly
- [ ] Snap-fit LCD bezel (separate part)
- [ ] Button caps designed for membrane assembly
- [ ] USB-C port perpendicular to parting line
- [ ] Screw boss locations accessible

### Manufacturability
- [ ] Can be molded in 2-piece mold (no lifters)
- [ ] Estimated cycle time: 45-60 seconds
- [ ] Ejector pin locations planned (B-surface)
- [ ] Material: ABS or PC-ABS specified

---

## Cost Summary

### Tooling Investment

| Scenario | Tooling Cost | Production Volume | Amortized Cost/Unit |
|----------|-------------|-------------------|-------------------|
| **Prototype (Aluminum)** | $10,000 | 1,000 units | $10.00 |
| **Production (Steel, 1-cav)** | $20,000 | 5,000 units | $4.00 |
| **Production (Steel, 1-cav)** | $20,000 | 10,000 units | $2.00 |
| **Production (Steel, 4-cav)** | $45,000 | 20,000 units | $2.25 |

### Per-Unit Cost (at 10K volume)

| Component | Cost |
|-----------|------|
| Material (ABS, 52g) | $0.15 |
| Molding labor | $1.50 |
| Button caps (4×, molded) | $0.50 |
| Silicone membrane | $0.50 |
| Knob (molded, painted) | $0.80 |
| Deflashing & QC | $0.35 |
| Pad printing (labels) | $0.50 |
| Assembly labor | $1.20 |
| **Total Housing** | **$5.50** |

Add PCB, LCD, encoder, etc. for complete BOM.

---

## Recommendations for VibeDeck

### Design Approach

1. **Start with 3D printing** for first 50-100 units (beta backers)
   - Validates design, no tooling cost
   - See 3d-printing-guide.md

2. **Order aluminum prototype mold** once Kickstarter hits 500 units
   - $10K investment
   - Delivers first production units in 10-12 weeks

3. **Upgrade to steel mold** if campaign exceeds 2,000 units
   - $20K investment
   - Supports full production run
   - Payback after 2,000 units

### Minimum Viable Kickstarter Goal

**To justify injection molding**: 1,000 units minimum
- Tooling: $10K (aluminum mold)
- Per-unit: $5.50
- Total COGS (housing only): $15.50/unit including tooling amortization

**Below 1,000 units**: Use 3D printing (SLS Nylon)
- No tooling investment
- $45-65 per unit (higher, but no upfront risk)

---

## Next Steps

1. **Review 3D CAD** against checklist above
2. **Identify any undercuts** (fix design or budget for side actions)
3. **Get mold quote** from 3+ manufacturers
4. **Order mold flow analysis** ($500-1000) to predict defects
5. **Plan for first article inspection** (T1 samples from tooling)

---

## Resources

- **Protolabs Design Guide**: https://www.protolabs.com/resources/design-tips/
- **Injection Molding Standards**: ISO 294, ASTM D955
- **Material Datasheets**: BASF, SABIC, LG Chem (ABS grades)
- **VibeDeck CAD**: (link to design files)

---

**Key Takeaway**: Design for manufacturability from day one. Every undercut, every sharp corner, every non-uniform wall thickness adds cost and risk. VibeDeck can be injection molded for $5-8/unit at 10K volume if designed correctly.
