# 3D Printing Guide for VibeDeck Hardware

**Purpose**: 3D printing processes, costs, and design guidelines for VibeDeck prototypes and low-volume production
**Last Updated**: 2026-01-15

---

## Overview

**3D printing** (additive manufacturing) is ideal for prototypes, beta units, and low-volume production (<1,000 units). No tooling investment required, enabling rapid iteration and risk-free testing.

**Key Advantage**: Zero upfront tooling cost, fast turnaround (2-5 days)
**Key Disadvantage**: Higher per-unit cost ($45-65 per device)

---

## 3D Printing Technologies

### Comparison Matrix

| Technology | Material | Surface Quality | Strength | Cost/Unit | Best For |
|-----------|----------|----------------|----------|-----------|----------|
| **FDM** | PLA/ABS/PETG | ⭐⭐ Poor | ⭐⭐⭐ Good | $ | Prototypes |
| **SLS** | Nylon (PA12) | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐ Excellent | $$ | Production |
| **MJF** | Nylon (PA12) | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐ Excellent | $$ | Production |
| **SLA** | Resin | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐ Fair | $$ | Display models |
| **PolyJet** | Resin | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐ Good | $$$ | Cosmetic |

**Recommendation for VibeDeck**: **SLS (Nylon)** or **MJF (Nylon)** for production-quality parts

---

## SLS (Selective Laser Sintering)

### Technology

- **Process**: Laser fuses nylon powder layer-by-layer
- **Material**: PA12 (Nylon 12) powder
- **Build volume**: 300mm × 300mm × 300mm typical
- **Layer thickness**: 0.1mm (100 microns)
- **No supports needed**: Powder supports itself during build

### Advantages

✓ **No support structures**: Parts can have complex geometry
✓ **Strong and durable**: Nylon is tough, functional material
✓ **Good surface finish**: Better than FDM, no layer lines visible
✓ **Isotropic strength**: Same strength in all directions
✓ **Multiple parts per build**: Pack many devices in one build (cost-effective)

### Disadvantages

✗ **Slightly rough texture**: Not as smooth as injection molding
✗ **Porous**: Absorbs moisture, can be mitigated with sealing
✗ **Gray color only**: Natural PA12 is gray, can be dyed or painted
✗ **Dimensional accuracy**: ±0.3mm typical (acceptable for VibeDeck)

---

### VibeDeck SLS Specifications

**Material**: PA12 (Nylon 12)

**Properties**:
- Tensile strength: 48 MPa
- Elongation at break: 18%
- Flexural modulus: 1700 MPa
- Heat deflection: 80°C (sufficient for electronics)
- Surface finish: Matte gray, slightly textured

**Design Guidelines**:
- **Min wall thickness**: 0.7mm (but 1.5mm+ recommended for durability)
- **Min feature size**: 0.5mm
- **Clearances**: 0.5mm between moving parts
- **Threads**: M2 or larger (smaller threads may not resolve cleanly)
- **Surface finish**: As-printed is acceptable, can be smoothed

**Typical Accuracy**: ±0.3mm or ±0.3%, whichever is greater

---

### Cost Estimation (SLS)

**Pricing model**: Volumetric (pay for material used)

**VibeDeck housing volume estimate**:
- Main housing: ~40 cm³
- Button caps (4×): ~2 cm³
- LCD bezel ring: ~3 cm³
- **Total volume**: ~45 cm³

**SLS pricing** (via service bureaus):
- $0.80 - $1.50 per cm³
- **VibeDeck cost**: 45 cm³ × $1.20 = **$54 per unit**

**Volume discounts**:
- 1-10 units: $60-70 each (setup fees amortized)
- 10-50 units: $50-60 each
- 50-100 units: $45-55 each
- 100-500 units: $40-50 each

**Lead time**:
- First batch: 3-5 business days
- Repeat orders: 2-3 business days

---

## MJF (Multi Jet Fusion)

### Technology

- **Process**: HP inkjet deposits fusing agent, infrared lamps fuse powder
- **Material**: PA12 (Nylon 12), similar to SLS
- **Build volume**: 380mm × 284mm × 380mm
- **Layer thickness**: 0.08mm (80 microns)
- **Faster than SLS**: 10× faster build times

### Advantages Over SLS

✓ **Faster production**: Lower cost at higher volumes
✓ **Better detail**: Finer features than SLS
✓ **More uniform**: Consistent mechanical properties
✓ **Better surface finish**: Slightly smoother than SLS

### Disadvantages

✗ **Less common**: Fewer service bureaus offer MJF
✗ **Minimum order**: Often 10+ parts to fill build chamber economically

---

### VibeDeck MJF Specifications

**Material**: PA12 (same as SLS)

**Cost**: Similar to SLS at low volume, **20-30% cheaper at 100+ units**
- 10 units: $55 each
- 50 units: $45 each
- 100 units: $35 each
- 500 units: $28 each

**Recommendation**: Use MJF if ordering 50+ units, otherwise SLS

---

## FDM (Fused Deposition Modeling)

### Technology

- **Process**: Melted plastic extruded through nozzle, layer-by-layer
- **Materials**: PLA, ABS, PETG, Nylon, TPU
- **Build volume**: Varies (200mm - 400mm typical)
- **Layer thickness**: 0.1mm - 0.3mm
- **Requires supports**: Overhangs >45° need support structures

### Advantages

✓ **Cheap**: $20-40 per device for VibeDeck
✓ **Fast iteration**: Desktop printers in-house
✓ **Material variety**: Many filament options

### Disadvantages

✗ **Poor surface finish**: Visible layer lines
✗ **Weak z-axis**: Parts split along layer lines
✗ **Support marks**: Where supports attach
✗ **Not production-quality**: Acceptable for prototypes only

---

### VibeDeck FDM Use Cases

**✓ Use FDM for**:
- Early form/fit prototypes (validate size, ergonomics)
- Internal testing (functionality, not appearance)
- Mockups for photography (if post-processed)
- Jigs and fixtures (assembly tooling)

**✗ Don't use FDM for**:
- Kickstarter beta units (looks unprofessional)
- Production devices (not durable enough)
- Customer-facing demos (poor finish)

**FDM Best Practices for VibeDeck**:
```
Material: PETG (good strength, printability)
Layer height: 0.15mm (balance quality/speed)
Infill: 30% gyroid (strong, material-efficient)
Supports: Everywhere, remove carefully
Post-processing: Sand 120→220→400 grit, prime, paint
```

**Cost**: $25-35 per device (material + time)

---

## SLA (Stereolithography)

### Technology

- **Process**: UV laser cures liquid resin layer-by-layer
- **Materials**: Photopolymer resins (various types)
- **Build volume**: 145mm × 145mm × 175mm typical
- **Layer thickness**: 0.025mm - 0.1mm (extremely fine)
- **Requires supports**: Must be removed, leaves marks

### Advantages

✓ **Excellent surface finish**: Smooth, near-injection-molded quality
✓ **High detail**: Fine features, text, thin walls
✓ **Good for display models**: Cosmetic excellence

### Disadvantages

✗ **Brittle**: Standard resins are fragile (not functional parts)
✗ **Expensive tough resins**: Engineering resins cost 3-5× more
✗ **Post-processing**: Washing, curing, support removal
✗ **Not durable**: Not suitable for production devices

---

### VibeDeck SLA Use Cases

**✓ Use SLA for**:
- Hero mockups for photography (cosmetic excellence)
- Kickstarter campaign images (looks professional)
- Trade show display models (impressive appearance)
- Design validation (button spacing, ergonomics)

**✗ Don't use SLA for**:
- Functional prototypes (too brittle)
- Beta units for users (will break)
- Production (not durable)

**SLA Materials for VibeDeck**:
```
Standard resin: $40-50 per device (cosmetic only, brittle)
Tough resin: $70-90 per device (functional, but still inferior to nylon SLS)
```

**Recommendation**: SLA for photography mockups only, not functional testing

---

## Material Comparison

| Property | SLS Nylon | MJF Nylon | FDM PETG | SLA Tough Resin | Injection ABS |
|----------|-----------|-----------|----------|----------------|---------------|
| **Tensile Strength** | 48 MPa | 48 MPa | 50 MPa | 55 MPa | 40 MPa |
| **Elongation** | 18% | 18% | 5% | 6% | 3% |
| **Impact Resistance** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Surface Quality** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Durability** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Cost/Unit** | $50 | $45 | $30 | $80 | $6 |

**Winner for VibeDeck production**: SLS or MJF Nylon (best balance of quality, cost, durability)

---

## Design Guidelines for 3D Printing

### Wall Thickness

**SLS/MJF**:
- Minimum: 0.7mm (technical minimum)
- Recommended: 1.5mm - 3.0mm (same as injection molding)
- VibeDeck design: 2.0mm walls (strong, material-efficient)

**FDM**:
- Minimum: 1.0mm (2× nozzle diameter)
- Recommended: 2.0mm+ (multiple wall perimeters)

**SLA**:
- Minimum: 0.5mm (technical minimum)
- Recommended: 1.5mm+ (avoid fragility)

---

### Overhangs and Bridges

**SLS/MJF**: No supports needed, any geometry printable
**FDM**: Requires supports for overhangs >45°
**SLA**: Requires supports for overhangs >30°

**VibeDeck advantage with SLS/MJF**:
- USB port recess: No supports needed
- Button pockets: No supports needed
- Complex internal features: No problem

---

### Snap Fits

**SLS/MJF Nylon**: Excellent material for snap fits
- Can bend 5-10° without breaking
- Durable over repeated cycles

**Design**:
```
Cantilever snap:
- Length: 10mm
- Thickness: 1.5mm
- Deflection: 0.5mm (achievable)
- Cycles: 50+ insertions (sufficient for device)
```

**VibeDeck Applications**:
- LCD bezel snap-fit to housing ✓
- Button caps snap onto membrane ✓
- Housing halves snap together (4 locations) ✓

---

### Threads

**SLS/MJF**:
- M2 threads: Marginal (0.4mm pitch, may not resolve cleanly)
- M3 threads: Good (0.5mm pitch, reliable)
- Recommendation: Use M2 threaded inserts (heat-set brass inserts)

**VibeDeck Approach**:
```
PCB mounting:
- Design boss with 3.5mm through-hole
- Press-fit M2 heat-set insert ($0.05 each × 4 = $0.20)
- Screw M2 × 6mm into insert
- Advantage: Metal threads, not plastic (more durable)
```

---

### Surface Finish

**As-Printed (SLS/MJF)**:
- Matte gray surface
- Slightly grainy texture
- Professional appearance (acceptable for beta units)

**Post-Processing Options**:

**Dyeing** ($2-5 per part):
- Black dye (most common)
- Hides layer texture
- Professional appearance

**Vapor smoothing** ($5-10 per part):
- Chemical vapor smooths surface
- Near-injection-molded finish
- Expensive, usually unnecessary

**Painting** ($8-15 per part):
- Primer → paint → clear coat
- Any color desired
- Best surface finish
- Most expensive

**VibeDeck Recommendation**:
- Beta units (50-100): SLS as-printed gray (save cost)
- Kickstarter fulfillment (500+): Switch to injection molding
- Premium limited edition: SLS dyed black or vapor smoothed

---

## Cost Breakdown: SLS Production

### Single VibeDeck Unit (SLS PA12)

| Component | Volume (cm³) | Cost |
|-----------|-------------|------|
| **Main housing top** | 20 | $24 |
| **Main housing bottom** | 20 | $24 |
| **Button caps (4×)** | 2 | $2.40 |
| **LCD bezel ring** | 3 | $3.60 |
| **Total 3D printing** | 45 | **$54** |

### Additional Costs

| Item | Cost |
|------|------|
| Heat-set inserts (4×) | $0.20 |
| Silicone membrane | $0.50 |
| Assembly labor | $2.00 |
| Packaging | $1.50 |
| **Total COGS (housing only)** | **$58.20** |

### Volume Pricing

| Quantity | Price per Unit | Total Cost |
|----------|----------------|------------|
| 10 | $60 | $600 |
| 50 | $52 | $2,600 |
| 100 | $48 | $4,800 |
| 250 | $45 | $11,250 |
| 500 | $42 | $21,000 |

**Break-even with injection molding**:
- Injection molding: $20K tooling + $5.50/unit
- 3D printing: $0 tooling + $48/unit (100 qty)

**Crossover**: ~470 units

Below 470 units → 3D printing is cheaper
Above 470 units → Injection molding is cheaper

---

## Kickstarter Strategy: Phased Manufacturing

### Phase 1: Beta Testing (50 units)

**Manufacturing**: SLS Nylon, as-printed gray
- Cost: $52 per device × 50 = $2,600
- Lead time: 5 days
- Validation: Form, fit, function

**Why 3D print**:
- Zero tooling risk
- Fast turnaround
- Can iterate design based on feedback

---

### Phase 2: Early Bird Backers (100-250 units)

**Manufacturing**: MJF Nylon, dyed black
- Cost: $45-48 per device
- Lead time: 7-10 days (batch production)
- Appearance: Professional black finish

**Why still 3D print**:
- Kickstarter total unknown yet
- Avoid $20K tooling risk
- MJF quality acceptable for customers

---

### Phase 3: Full Production (500+ units)

**Manufacturing**: Injection molding (steel mold)
- Tooling: $20,000 (one-time)
- Per-unit: $5.50
- Lead time: 12 weeks tooling + 2 weeks production

**Break-even**: 470 units
**ROI**: Every unit after 470 saves $42 vs 3D printing

**Kickstarter decision point**:
- If campaign reaches 500+ backers → Order mold immediately
- If campaign stays below 500 → Fulfill with 3D printing

---

## Service Bureaus

### Recommended Vendors (SLS/MJF)

**Shapeways** (USA/EU):
- SLS PA12
- Online instant quotes
- Good for 1-50 units
- $55-65 per VibeDeck device

**Protolabs** (USA/EU/Asia):
- MJF and SLS
- Fast turnaround (3 days)
- Good for 10-500 units
- $45-55 per device at 100 qty

**Xometry** (USA):
- Marketplace, multiple vendors
- Competitive pricing
- $40-50 per device at 100+ qty

**JLC3DP** (China):
- Cheapest option
- MJF and SLS
- $30-40 per device at 100+ qty
- 7-10 day shipping to USA

**Recommendation**: Get quotes from all four, compare

---

## Quality Control for 3D Printed Parts

### Inspection Checklist

**Dimensional Accuracy**:
- [ ] Overall dimensions within ±0.5mm
- [ ] Snap-fit features function (not too tight/loose)
- [ ] PCB mounting holes align with board
- [ ] LCD fits into bezel recess

**Surface Quality**:
- [ ] No visible warping
- [ ] Smooth surface (no blobs, zits)
- [ ] Uniform color (no discoloration)
- [ ] No cracks or fractures

**Functionality**:
- [ ] Housing halves snap together securely
- [ ] Button caps have good tactile feel
- [ ] Rotary knob fits encoder shaft
- [ ] All screw bosses accept M2 inserts

**Common Defects in SLS/MJF**:
- Warping (rare, usually from design issues)
- Powder residue (clean with compressed air)
- Incomplete fusion (weak layers, reject part)

---

## Post-Processing Workflow

### For Beta Units (SLS Natural Gray)

1. **Receive parts** from vendor
2. **Inspect** against checklist above
3. **Clean** with compressed air (remove powder)
4. **Press-fit inserts** (heat with soldering iron, press into boss)
5. **Assemble** with PCB, membrane, screen
6. **Test** functionality
7. **Ship** to beta testers

**No additional finishing needed** - natural gray is acceptable

---

### For Kickstarter Units (Dyed Black)

1. **Receive dyed parts** from vendor (specify black dye)
2. **Inspect** against checklist
3. **Clean** with compressed air
4. **Press-fit inserts**
5. **Apply matte clear coat** (optional, protects surface)
6. **Assemble**
7. **Test**
8. **Package** in retail box

**Total added cost**: $2-3 per device (dyeing, clear coat, labor)

---

## Hybrid Approach: 3D Print + CNC

**Concept**: Use different manufacturing for different components

**VibeDeck Hybrid Strategy**:
```
Main housing: SLS Nylon (complex geometry, good for 3D printing)
Rotary knob: CNC aluminum (premium feel, worth the cost)
Button caps: SLS Nylon (simple, cheap)
LCD bezel: CNC aluminum or SLS with metallic paint (premium accent)
```

**Cost**:
- Housing (SLS): $48
- Knob (CNC aluminum): $5
- Bezel (CNC aluminum): $4
- **Total**: $57 (vs $54 all-SLS)

**Value**: Premium feel for only $3 extra per unit

---

## Design Checklist for 3D Printing

### Geometry
- [ ] Wall thickness: 1.5mm - 3.0mm (SLS) or 2.0mm+ (FDM)
- [ ] No sharp corners: 0.5mm radii minimum
- [ ] Overhangs < 45° if using FDM (no limit for SLS)
- [ ] Clearances: 0.5mm between moving parts

### Features
- [ ] Snap fits: Design for nylon flexibility
- [ ] Threaded inserts: 3.5mm holes for M2 heat-set inserts
- [ ] Embossed text: 0.5mm depth minimum
- [ ] Recessed text: 0.8mm depth, 1.0mm width minimum

### Orientation
- [ ] SLS/MJF: Any orientation (self-supporting powder)
- [ ] FDM: Minimize supports (expensive in time)
- [ ] SLA: Minimize supports (leave marks)

### Post-Processing
- [ ] SLS: Specify dyeing if needed (black recommended)
- [ ] Powder removal: Design accessible cavities
- [ ] Insert installation: Plan for heat-set inserts

---

## Timeline Comparison

| Manufacturing Method | Prototype (10 units) | Production (500 units) | Lead Time |
|---------------------|---------------------|----------------------|-----------|
| **SLS** | 5 days | 7-10 days | Fast ✓ |
| **MJF** | 5 days | 7-10 days | Fast ✓ |
| **FDM (in-house)** | 2 days | 30 days | Manual labor |
| **Injection Molding** | N/A | 12 weeks tooling + 2 weeks | Slow ✗ |

**Winner for speed**: 3D printing (SLS/MJF) by 10× over injection molding

---

## Recommendations for VibeDeck

### Decision Matrix

**If Kickstarter < 500 units**:
→ **Use SLS/MJF exclusively**
- No tooling risk
- Faster time-to-market
- Total cost lower (no $20K tooling)

**If Kickstarter 500-1000 units**:
→ **Hybrid: 3D print first 100, injection mold remaining**
- First 100 units: SLS ($48 each = $4,800)
- Remaining 400-900: Injection mold ($5.50 each + $20K tooling)
- Gives time to order tooling during campaign

**If Kickstarter > 1000 units**:
→ **Order injection mold immediately**
- Tooling pays for itself
- Per-unit savings significant
- Professional finish for all backers

---

## Key Takeaways

1. **SLS/MJF Nylon is production-quality** for VibeDeck (not just prototyping)
2. **Cost crossover is ~470 units** (below: 3D print, above: injection mold)
3. **Zero tooling risk** makes 3D printing ideal for Kickstarter uncertainty
4. **MJF is 20-30% cheaper than SLS** at 100+ units (use MJF if available)
5. **Natural gray SLS is acceptable** for beta units (save money, skip dyeing)
6. **Black dyed SLS looks professional** for customer-facing units
7. **FDM is prototype-only**, don't use for beta/production
8. **SLA is cosmetic-only**, use for photography mockups

---

## Next Steps

1. **Get quotes** from Shapeways, Protolabs, Xometry, JLC3DP
2. **Order test prints** (2-3 units) to validate design
3. **Test assembly** with real PCB, membrane, components
4. **Decide on finish** (natural gray vs dyed black)
5. **Plan phased production** based on Kickstarter trajectory

---

**Bottom Line**: 3D print (SLS Nylon) the first 500 VibeDeck units. Only switch to injection molding if Kickstarter exceeds 500 backers and justifies the $20K tooling investment.
