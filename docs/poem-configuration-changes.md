# POEM Configuration Changes for VibeDeck

**Date**: 2026-01-15
**Status**: Complete
**Related Plan**: `~/.claude/plans/swift-toasting-tarjan.md` (Action 4)

---

## Summary

Updated `.poem-core/poem-core-config.yaml` to add a new workflow (`vibedeck-kickstarter-images`) with references to all VibeDeck knowledge bases created during the research phase.

This enables Penny (the Prompt Engineer agent) to access model research, manufacturing guidelines, and design concepts when generating image generation prompts.

---

## Changes Made

### 1. Added New Workflow: `vibedeck-kickstarter-images`

**Location in config**: Lines 65-94 (after `nano-banana` workflow)

**Workspace paths**:
```yaml
prompts: poem/vibedeck-kickstarter-images/prompts
schemas: poem/vibedeck-kickstarter-images/schemas
mockData: poem/vibedeck-kickstarter-images/mock-data
workflowData: poem/vibedeck-kickstarter-images/workflow-data
```

**Note**: Uses `poem/` prefix (production mode) instead of `dev-workspace/` since this is an active project workflow, not development/testing.

---

### 2. Added Six Reference Material Sources

Reference materials are document islands that Penny can access when generating prompts. They're prioritized (higher priority wins conflicts).

#### **Priority 30: Model Research** (Highest Priority)
```yaml
- path: docs/model-research/
  type: local
  description: AI model selection guide, best practices, cost optimization for image generation
  priority: 30
```

**Contents**:
- `model-comparison.md` - Model router explanation, comparison matrix
- `flux2-best-practices.md` - FLUX.2 Turbo/Pro prompting patterns
- `dalle3-best-practices.md` - ChatGPT workflows, typography limitations
- `model-selection-guide.md` - Decision trees for model selection
- `cost-speed-quality-matrix.md` - Comprehensive cost/quality comparison
- `nano-banana-json-patterns.md` - JSON-based precision prompting

**Why highest priority**: Model selection is critical for cost/quality optimization.

---

#### **Priority 25: Manufacturing Analysis**
```yaml
- path: vibedeck-mocks/manufacturing-analysis/
  type: local
  description: Manufacturing feasibility, cost analysis, injection molding and 3D printing guidelines
  priority: 25
```

**Contents**:
- `injection-molding-guide.md` - Design rules for injection molding
- `3d-printing-guide.md` - SLS/MJF/FDM/SLA comparison, break-even analysis
- `evaluation-template.json` - Template for design feasibility evaluation
- `cost-comparison.md` - Detailed cost breakdowns by volume

**Why high priority**: Manufacturing constraints affect design generation prompts (e.g., "design must have uniform wall thickness for injection molding").

---

#### **Priority 20: Design Variations**
```yaml
- path: vibedeck-mocks/design-variations/
  type: local
  description: Design innovation concepts, notes, and manufacturing evaluations
  priority: 20
```

**Contents** (to be populated):
- Individual design folders (e.g., `arcade-mini/`, `rotary-minimalist/`)
- Each folder contains: concept.png, concept.json, notes.md, manufacturing-analysis.json

**Why medium-high priority**: Existing design variations inform new concept generation (learn from previous iterations).

---

#### **Priority 15: Skins/Surface Treatments**
```yaml
- path: vibedeck-mocks/skins/
  type: local
  description: Surface treatment examples (25 artistic style variations)
  priority: 15
```

**Contents**:
- 25 artistic style variations (carved-wood, resin-flowers, vaporwave, etc.)
- Each with PNG + JSON metadata

**Why medium priority**: Examples of successful surface treatments, but less critical than model/manufacturing knowledge.

---

#### **Priority 10: Product Photography References**
```yaml
- path: vibedeck-mocks/reference-images/
  type: local
  description: Product photography reference images
  priority: 10
```

**Contents**:
- canonical.png - Clean product shot reference
- Other reference angles and contexts

**Why lower priority**: Visual references useful but not essential for prompt generation.

---

#### **Priority 5: General Image Generation KB**
```yaml
- path: docs/image-generation/
  type: local
  description: General image generation knowledge base
  priority: 5
```

**Contents**:
- General image generation best practices (not VibeDeck-specific)

**Why lowest priority**: Generic knowledge, overridden by VibeDeck-specific docs.

---

## How Penny Uses This Configuration

### Activation Workflow

When user activates Penny for VibeDeck work:

1. **Switch to VibeDeck workflow**:
   ```
   /poem/agents/penny
   *switch vibedeck-kickstarter-images
   ```

2. **View available references**:
   ```
   *context --reference
   ```
   Shows all 6 reference paths with descriptions and priorities.

3. **Generate prompts with context**:
   Penny now has access to:
   - Model selection criteria (which model for which task)
   - Manufacturing constraints (design rules to mention in prompts)
   - Existing designs (for consistency and inspiration)
   - Cost optimization strategies

---

### Example: Generating a Design Variation Prompt

**User request**: "Generate prompt for arcade-mini design concept"

**Penny's workflow** (with new config):

1. **Reads model-research/** → Determines FLUX.2 Turbo is best for design exploration
2. **Reads manufacturing-analysis/** → Notes injection molding constraints (draft angles, uniform walls)
3. **Reads design-variations/** → Checks if arcade-mini already exists, learns from similar concepts
4. **Generates prompt** incorporating:
   - FLUX.2 Turbo-optimized structure
   - Manufacturing-aware design details (no sharp undercuts, uniform wall thickness)
   - VibeDeck design language (rotary encoder, 4 buttons, LCD screen)
   - Arcade aesthetic keywords (colorful, retro, playful)

5. **Outputs**:
   - Complete prompt text
   - Recommended model: FLUX.2 Turbo
   - Estimated cost: $0.008
   - Manufacturing notes: "Consider snap-fit arcade cabinet shell for tooling cost reduction"

---

## Validation

### Testing the Configuration

Run these commands to verify the config works:

```bash
# 1. Activate Penny
/poem/agents/penny

# 2. List all workflows (should include vibedeck-kickstarter-images)
*workflows

# 3. Switch to VibeDeck workflow
*switch vibedeck-kickstarter-images

# 4. View context and reference materials
*context --reference

# Expected output:
# Current Workflow: vibedeck-kickstarter-images
# Reference Materials:
#   [30] docs/model-research/ - AI model selection guide...
#   [25] vibedeck-mocks/manufacturing-analysis/ - Manufacturing feasibility...
#   [20] vibedeck-mocks/design-variations/ - Design innovation concepts...
#   [15] vibedeck-mocks/skins/ - Surface treatment examples...
#   [10] vibedeck-mocks/reference-images/ - Product photography reference...
#   [5]  docs/image-generation/ - General image generation KB...
```

---

## Future Enhancements

### Potential Additions (Not Implemented Yet)

1. **Shared Prompts** (Story 4.9):
   - Cross-workflow reusable prompts for common tasks
   - Location: `dev-workspace/shared/prompts/`

2. **Custom Penny Commands**:
   - `*model-suggest <dimension>` - Suggests best model for task
   - `*manufacturing-check <design>` - Loads manufacturing analysis
   - `*dimension <type>` - Sets generation context

3. **Second Brain Integration**:
   - `/ad/brains/image-generation/` - Curated best practices
   - `/ad/brains/product-photography/` - Professional photo techniques

4. **External API Integration**:
   - Direct Fal.AI/Kie.AI model selection from Penny
   - Cost estimation API calls

---

## Troubleshooting

### Common Issues

**Issue**: "Workflow not found: vibedeck-kickstarter-images"
**Solution**: Config file may not be reloaded. Restart POEM application or re-read config.

**Issue**: Reference materials not accessible
**Solution**: Verify paths are relative to project root (`/Users/davidcruwys/dev/ad/flivideo/vibedeck/`). Absolute paths should start with `/` for second brains.

**Issue**: Penny doesn't mention model research when generating prompts
**Solution**: Explicitly ask Penny to reference model research: "Use model-research knowledge to suggest best model for this task"

---

## Related Documentation

- **Main Plan**: `~/.claude/plans/swift-toasting-tarjan.md`
- **POEM Core Config**: `.poem-core/poem-core-config.yaml`
- **Penny Agent Definition**: `.poem-core/agents/penny.md`
- **Model Research Docs**: `docs/model-research/`
- **Manufacturing Guidelines**: `vibedeck-mocks/manufacturing-analysis/`

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-15 | 1.0 | Initial configuration for vibedeck-kickstarter-images workflow |

---

**Status**: ✓ Configuration complete, ready for Penny activation and prompt generation workflows.
