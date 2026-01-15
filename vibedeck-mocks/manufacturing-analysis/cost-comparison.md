# Manufacturing Cost Comparison for VibeDeck

**Purpose**: Comprehensive cost analysis across manufacturing methods to inform production decisions
**Last Updated**: 2026-01-15

---

## Executive Summary

| Manufacturing Method | Best For | Cost Range | Break-Even Point |
|---------------------|----------|------------|------------------|
| **SLS 3D Printing** | < 500 units | $48-60/unit | Always cheaper below 470 units |
| **MJF 3D Printing** | 100-500 units | $38-52/unit | 20-30% cheaper than SLS at volume |
| **Injection Molding** | > 500 units | $5-8/unit + $20K tooling | Cheaper above ~470 units |
| **CNC Machining** | Accents only | $3-5/knob | Not viable for housing |

**Recommended Strategy**: 3D print below 500 units, injection mold above 500 units

---

## Detailed Cost Breakdown

### VibeDeck Housing Components

**Parts List**:
- Main housing top half
- Main housing bottom half
- 4× button caps
- LCD bezel ring
- Rotary knob

**Total Volume**: ~45 cm³ (SLS/MJF pricing basis)

---

## Method 1: SLS 3D Printing (Nylon PA12)

### Unit Cost Structure

| Component | Volume (cm³) | Cost per cm³ | Total |
|-----------|-------------|--------------|-------|
| Housing top | 20 | $1.20 | $24.00 |
| Housing bottom | 20 | $1.20 | $24.00 |
| Button caps (4×) | 2 | $1.20 | $2.40 |
| LCD bezel ring | 3 | $1.20 | $3.60 |
| **3D Printing Subtotal** | 45 | | **$54.00** |

### Additional Costs

| Item | Cost |
|------|------|
| Heat-set brass inserts (4×) | $0.20 |
| Silicone membrane | $0.50 |
| Assembly labor | $2.00 |
| **Total Housing COGS** | **$56.70** |

### Volume Pricing

| Quantity | Price per Unit | Total Cost | Cost per Unit with Fixed Costs |
|----------|----------------|------------|-------------------------------|
| 10 | $60.00 | $600 | $62.70 |
| 50 | $52.00 | $2,600 | $54.70 |
| 100 | $48.00 | $4,800 | $50.70 |
| 250 | $45.00 | $11,250 | $47.70 |
| 500 | $42.00 | $21,000 | $44.70 |

### Lead Time

- First batch (10 units): 5 business days
- Repeat orders: 2-3 business days
- No tooling wait time

---

## Method 2: MJF 3D Printing (Nylon PA12)

### Unit Cost Structure

**Similar to SLS but 20-30% cheaper at volume**

| Quantity | SLS Price | MJF Price | Savings |
|----------|-----------|-----------|---------|
| 10 | $60.00 | $58.00 | $2.00 (3%) |
| 50 | $52.00 | $48.00 | $4.00 (8%) |
| 100 | $48.00 | $42.00 | $6.00 (13%) |
| 250 | $45.00 | $38.00 | $7.00 (16%) |
| 500 | $42.00 | $35.00 | $7.00 (17%) |

### Trade-offs

**MJF Advantages**:
- 20-30% cheaper at 100+ units
- Slightly better surface finish
- Faster build times

**MJF Disadvantages**:
- Less common (fewer vendors)
- Minimum order often 10+ parts

**Recommendation**: Use MJF if ordering 50+ units and vendor offers it

---

## Method 3: Injection Molding (ABS Plastic)

### Tooling Investment

| Mold Type | Cost | Capacity | Lifespan | Use Case |
|-----------|------|----------|----------|----------|
| **Aluminum Prototype** | $8K-12K | 500-2000 shots | 20K-50K shots | Beta/prototype |
| **Steel Single-Cavity** | $18K-25K | Production | 500K+ shots | First production |
| **Steel Multi-Cavity (4×)** | $35K-50K | 4× output | 500K+ shots | High volume |

**Assumption for analysis**: Steel single-cavity production mold at $20,000

---

### Unit Cost Structure (at 10,000 units)

| Component | Cost |
|-----------|------|
| **Material (ABS)** | |
| Raw plastic (52g @ $2.50/kg) | $0.13 |
| Colorant/additives | $0.02 |
| **Subtotal Material** | **$0.15** |
| | |
| **Molding Labor** | |
| Machine time (50 sec cycle, $60/hr machine) | $0.83 |
| Operator labor | $0.30 |
| Quality inspection | $0.20 |
| **Subtotal Labor** | **$1.33** |
| | |
| **Secondary Operations** | |
| Deflashing | $0.25 |
| Button cap molding (separate tool) | $0.50 |
| Pad printing labels (CTX1-4) | $0.50 |
| Heat-set inserts (4×) | $0.20 |
| Silicone membrane | $0.50 |
| Rotary knob (molded + metallic paint) | $0.80 |
| Final assembly | $1.20 |
| **Subtotal Operations** | **$3.95** |
| | |
| **Total Per-Unit COGS** | **$5.43** |

---

### Volume Analysis (Including Tooling)

| Quantity | Tooling Cost | Per-Unit Cost | Total Cost | Amortized Cost/Unit |
|----------|--------------|---------------|------------|-------------------|
| 100 | $20,000 | $5.43 | $20,543 | $205.43 |
| 250 | $20,000 | $5.43 | $21,358 | $85.43 |
| 500 | $20,000 | $5.43 | $22,715 | $45.43 |
| 1,000 | $20,000 | $5.43 | $25,430 | $25.43 |
| 2,000 | $20,000 | $5.43 | $30,860 | $15.43 |
| 5,000 | $20,000 | $5.43 | $47,150 | $9.43 |
| 10,000 | $20,000 | $5.43 | $74,300 | $7.43 |
| 50,000 | $20,000 | $5.43 | $291,500 | $5.83 |

**Key Insight**: Tooling cost dominates at low volume, becomes negligible at high volume

---

## Break-Even Analysis

### SLS vs Injection Molding

**SLS Cost**: $48/unit (no tooling)
**Injection Molding**: $5.43/unit + $20,000 tooling

**Break-even calculation**:
```
SLS total cost = Injection total cost
48 × Q = 5.43 × Q + 20,000
42.57 × Q = 20,000
Q = 470 units
```

**Break-even point**: **470 units**

Below 470 units: SLS is cheaper
Above 470 units: Injection molding is cheaper

---

### Cost Crossover Chart

| Units | SLS Total | Injection Total | Winner |
|-------|-----------|----------------|--------|
| 100 | $4,800 | $20,543 | SLS by $15,743 |
| 250 | $12,000 | $21,358 | SLS by $9,358 |
| 470 | $22,560 | $22,552 | **BREAK-EVEN** |
| 500 | $24,000 | $22,715 | Injection by $1,285 |
| 1,000 | $48,000 | $25,430 | Injection by $22,570 |
| 2,000 | $96,000 | $30,860 | Injection by $65,140 |
| 5,000 | $240,000 | $47,150 | Injection by $192,850 |
| 10,000 | $480,000 | $74,300 | Injection by $405,700 |

**Savings at 10,000 units**: $405,700 (85% cost reduction)

---

## Kickstarter Scenario Analysis

### Scenario 1: Campaign Raises 300 Units

**Manufacturing Decision**: SLS 3D Printing

| Item | Cost |
|------|------|
| 300 units @ $48 | $14,400 |
| Assembly/packaging @ $2.70 | $810 |
| **Total Manufacturing** | **$15,210** |
| Cost per unit | **$50.70** |

**If used injection molding instead**:
- Tooling: $20,000
- Units: 300 × $5.43 = $1,629
- Total: $21,629
- Cost per unit: $72.10

**Savings with SLS**: $6,419 (29% cheaper)

---

### Scenario 2: Campaign Raises 500 Units

**Manufacturing Decision**: Borderline - use 3D printing OR inject if expect repeat orders

**Option A: SLS**
- 500 units @ $42 = $21,000
- Total: $21,000
- Cost per unit: $42.00

**Option B: Injection Molding**
- Tooling: $20,000
- Units: 500 × $5.43 = $2,715
- Total: $22,715
- Cost per unit: $45.43 (with amortized tooling)

**SLS advantage**: $1,715 (8% cheaper)

**Recommendation**: Use SLS unless planning follow-up production runs (tooling already paid for future orders)

---

### Scenario 3: Campaign Raises 1,000 Units

**Manufacturing Decision**: Injection Molding

**Injection Molding**:
- Tooling: $20,000
- Units: 1,000 × $5.43 = $5,430
- Total: $25,430
- Cost per unit: $25.43

**SLS Alternative**:
- 1,000 units @ $48 = $48,000
- Cost per unit: $48.00

**Injection molding savings**: $22,570 (47% cheaper)

**Recommendation**: Order injection mold immediately at campaign launch

---

### Scenario 4: Campaign Raises 2,500 Units

**Manufacturing Decision**: Injection Molding (consider multi-cavity)

**Single-Cavity Mold**:
- Tooling: $20,000
- Units: 2,500 × $5.43 = $13,575
- Total: $33,575
- Cost per unit: $13.43

**SLS Alternative**:
- 2,500 units @ $45 = $112,500
- Cost per unit: $45.00

**Injection molding savings**: $78,925 (70% cheaper)

**Multi-Cavity Consideration**:
- 4-cavity mold: $45,000 (doubles/triples output)
- Payback: Worth it if producing >5,000 units total

---

## Manufacturing Timeline Comparison

| Method | Tooling Time | Production Time (500 units) | Total |
|--------|-------------|----------------------------|-------|
| **SLS** | 0 weeks | 1 week | **1 week** |
| **MJF** | 0 weeks | 1 week | **1 week** |
| **Injection (Aluminum)** | 8-10 weeks | 2 weeks | **10-12 weeks** |
| **Injection (Steel)** | 10-12 weeks | 2 weeks | **12-14 weeks** |

**Time advantage**: 3D printing delivers 11-13 weeks faster

**Kickstarter implication**:
- 3D print first 100 units for early backers (fast)
- Injection mold remaining 400+ (economics)
- Total timeline: 14 weeks (vs 1 week all-SLS or 14 weeks all-injection)

---

## Quality Comparison

| Aspect | SLS | MJF | Injection Molding |
|--------|-----|-----|------------------|
| **Surface Finish** | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent |
| **Dimensional Accuracy** | ±0.3mm | ±0.3mm | ±0.1mm |
| **Strength** | ⭐⭐⭐⭐ Strong | ⭐⭐⭐⭐ Strong | ⭐⭐⭐⭐⭐ Very Strong |
| **Texture** | Matte, slightly grainy | Matte, slightly grainy | Smooth or textured |
| **Color** | Gray (can dye black) | Gray (can dye black) | Any color, matched |
| **Perceived Quality** | ⭐⭐⭐⭐ Professional | ⭐⭐⭐⭐ Professional | ⭐⭐⭐⭐⭐ Premium |

**Quality verdict**: Injection molding produces highest quality, but SLS/MJF acceptable for VibeDeck

---

## Risk Comparison

| Risk Factor | SLS/MJF | Injection Molding |
|-------------|---------|------------------|
| **Upfront Investment** | ✓ Zero | ✗ $20K+ |
| **Design Flexibility** | ✓ Can iterate | ✗ Locked after tooling |
| **Volume Uncertainty** | ✓ No commitment | ✗ Need 500+ to justify |
| **Timeline Risk** | ✓ Fast (1 week) | ✗ Slow (12+ weeks) |
| **Per-Unit Cost** | ✗ Higher ($42-60) | ✓ Lower ($5-8) |
| **Quality Consistency** | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent |

**Risk verdict**: 3D printing is lower risk for Kickstarter, injection molding is lower risk for repeat production

---

## Hybrid Manufacturing Strategy

### Best of Both Worlds

**Phase 1: Beta Units (50 units)**
- Manufacturing: SLS natural gray
- Cost: $52 × 50 = $2,600
- Timeline: Week 1-2
- Purpose: Validate design, gather feedback

**Phase 2: Early Bird (100 units)**
- Manufacturing: MJF dyed black
- Cost: $48 × 100 = $4,800
- Timeline: Week 3-4
- Purpose: Reward early backers with fast delivery

**Phase 3: Main Fulfillment (850 units)**
- Manufacturing: Injection molded (steel mold)
- Tooling: $20,000 (ordered during Phase 1/2)
- Cost: $5.43 × 850 = $4,616
- Total with tooling: $24,616
- Timeline: Week 12-16 (tooling) + Week 17-18 (production)

**Total Project Cost**:
- SLS: $2,600
- MJF: $4,800
- Injection: $24,616
- **Grand Total**: $32,016 for 1,000 units
- **Average per unit**: $32.02

**Pure Injection Alternative**:
- 1,000 units × $5.43 + $20,000 = $25,430
- Per unit: $25.43

**Hybrid premium**: $6,586 (26% more expensive)
**Value**: 150 units delivered 14 weeks earlier (backer satisfaction)

**Verdict**: Hybrid approach worth premium for Kickstarter fulfillment timeline

---

## Complete BOM Cost (Full Device)

### Housing + Mechanical (Choose Method)

| Method | Housing Cost |
|--------|-------------|
| SLS (100 units) | $50.70 |
| MJF (100 units) | $44.70 |
| Injection (1,000 units) | $25.43 |
| Injection (10,000 units) | $7.43 |

### Electronics (Constant)

| Component | Cost |
|-----------|------|
| PCB assembly | $15.00 |
| Rotary encoder | $4.00 |
| LCD 128×64 | $6.00 |
| Microcontroller (RP2040) | $2.50 |
| USB-C connector | $0.50 |
| Passives | $1.50 |
| **Electronics Subtotal** | **$29.50** |

### Cable & Packaging (Constant)

| Item | Cost |
|------|------|
| USB-C cable 1.5m | $2.00 |
| Retail box | $1.50 |
| Foam insert | $0.50 |
| Quick start guide | $0.30 |
| **Subtotal** | **$4.30** |

---

### Total Device COGS

| Scenario | Housing | Electronics | Cable/Packaging | **Total** |
|----------|---------|-------------|----------------|-----------|
| **SLS (100 units)** | $50.70 | $29.50 | $4.30 | **$84.50** |
| **MJF (100 units)** | $44.70 | $29.50 | $4.30 | **$78.50** |
| **Injection (1K)** | $25.43 | $29.50 | $4.30 | **$59.23** |
| **Injection (10K)** | $7.43 | $29.50 | $4.30 | **$41.23** |

---

## Pricing Strategy Implications

### SLS/MJF Production (< 500 units)

**COGS**: $78.50 - $84.50

| Retail Price | Margin | Profit per Unit |
|--------------|--------|-----------------|
| $129 | 35% | $45-50 |
| $149 | 43% | $65-71 |
| $169 | 50% | $85-91 |

**Recommended**: $149 (43% margin)

---

### Injection Molding (1,000 units)

**COGS**: $59.23

| Retail Price | Margin | Profit per Unit |
|--------------|--------|-----------------|
| $99 | 40% | $40 |
| $119 | 50% | $60 |
| $139 | 57% | $80 |

**Recommended**: $119 (50% margin)

---

### Injection Molding (10,000 units)

**COGS**: $41.23

| Retail Price | Margin | Profit per Unit |
|--------------|--------|-----------------|
| $79 | 48% | $38 |
| $89 | 54% | $48 |
| $99 | 58% | $58 |

**Recommended**: $89 (54% margin, competitive pricing)

---

## Decision Matrix

### If Kickstarter Goal < 500 Units

**Recommended**: SLS or MJF 3D printing exclusively

**Rationale**:
- Zero tooling risk ($20K saved)
- Faster delivery (no 12-week tooling wait)
- Total cost lower despite higher per-unit

**Pricing**: $149 retail (43% margin on $78.50 COGS)

---

### If Kickstarter Goal 500-1,000 Units

**Recommended**: Hybrid approach

**Strategy**:
1. 3D print first 100 units (fast delivery for early backers)
2. Order steel mold during campaign
3. Injection mold remaining 400-900 units
4. Deliver all units within 18 weeks

**Pricing**:
- Early Bird: $129 (SLS units)
- Regular: $119 (injection molded)

---

### If Kickstarter Goal > 1,000 Units

**Recommended**: Injection molding for all units

**Strategy**:
1. Order steel single-cavity mold immediately at campaign launch
2. 12-week tooling timeline
3. Deliver all units week 16-18

**Pricing**: $99-119 retail (50-55% margin)

**Consider**: If >10,000 units, order multi-cavity mold ($45K) to quadruple capacity

---

## Key Takeaways

1. **Break-even is 470 units** - below: 3D print, above: injection mold
2. **Time vs money trade-off** - 3D print is 11× faster, injection mold is 8× cheaper at scale
3. **Hybrid strategy optimal for Kickstarter** - fast early delivery + economical bulk production
4. **Tooling is one-time cost** - after 10,000 units, per-unit cost drops to $7.43 (vs $48 for SLS)
5. **Risk mitigation** - 3D print eliminates $20K upfront investment risk
6. **Quality is comparable** - SLS/MJF acceptable for VibeDeck, injection molding slightly better
7. **Pricing flexibility** - 3D printing allows $149 retail, injection molding enables $89 retail

---

## Recommended Action Plan

1. **Launch Kickstarter** with conservative 250-unit goal
2. **If campaign < 500 units**: Fulfill entirely with SLS/MJF
3. **If campaign > 500 units**: Order injection mold by Day 30
4. **Stretch goals**:
   - 500 units: "Injection molded production quality unlocked!"
   - 1,000 units: "Lower price tier unlocked - $99 retail"
   - 5,000 units: "Multi-cavity mold - doubled production capacity"
   - 10,000 units: "Premium aluminum edition at $149"

---

**Bottom Line**: Plan for 3D printing, order injection mold if campaign succeeds. This strategy minimizes risk while maximizing economies of scale if volume justifies tooling investment.
