# VibeDeck Kickstarter Images - POEM Workspace

**Workflow**: vibedeck-kickstarter-images
**Purpose**: Generate product images for VibeDeck Kickstarter campaign
**Status**: Active
**Output Destination**: `../../vibedeck-mocks/`

---

## Overview

This is a POEM (Prompt Orchestration and Engineering Method) workspace for generating VibeDeck product images systematically. POEM provides structured workflows, agents, and tools for prompt engineering at scale.

---

## Workspace Structure

```
poem/vibedeck-kickstarter-images/
├── README.md (this file)
│
├── config/
│   ├── poem.yaml              # POEM configuration
│   └── providers/             # Provider configurations (API keys, etc.)
│
├── mock-data/
│   └── scenarios/             # Test scenarios and mock data
│
├── prompts/                   # Generated/working prompts
│   └── (generated prompts stored here)
│
├── schemas/
│   └── dictionaries/          # Schema definitions and dictionaries
│
└── workflow-data/             # Workflow state and data
    └── (workflow execution data)
```

---

## How POEM Works

### The POEM System

POEM consists of three layers:

1. **POEM Core** (`../../.poem-core/`)
   - Framework components (agents, workflows, skills, commands)
   - Reusable across all projects
   - Never project-specific

2. **POEM Workspace** (THIS directory)
   - Project-specific instance
   - Config, prompts, data for this workflow
   - Links to POEM Core for execution

3. **Knowledge Base** (`../../docs/image-generation/`)
   - Templates, reference materials
   - System-agnostic best practices
   - Shared across projects

### Workflow Execution

```
User Input
    ↓
POEM Agent (from .poem-core/agents/)
    ↓
Uses Template (from docs/image-generation/templates/)
    ↓
Generates Prompt (stored in ./prompts/)
    ↓
Image Generation Platform (Nano Banana, ChatGPT, etc.)
    ↓
Output Image (saved to ../../vibedeck-mocks/)
```

---

## Getting Started

### Prerequisites

1. **POEM installed**: Ensure `.poem-core/` is present in project root
2. **Knowledge base**: Templates available in `docs/image-generation/`
3. **Configuration**: `config/poem.yaml` configured with workspace path

### Basic Usage

#### 1. Activate POEM Agent

In Claude Code:
```
Load the Product Photography Agent from:
../../.poem-core/agents/[agent-name].md

You are now the [Agent Name]. Read your instructions and await my input.
```

#### 2. Provide Input

Natural language description:
```
Generate a VibeDeck controller image with:
- Carved wood design (walnut)
- Soft natural window lighting
- Positioned on marble surface
```

#### 3. Agent Generates Prompt

Agent uses template from `docs/image-generation/templates/` and creates complete JSON prompt.

#### 4. Generate Image

Copy JSON to image generation platform (Nano Banana Pro, ChatGPT, etc.).

#### 5. Save Output

Store generated image in `vibedeck-mocks/[style-name]/`.

---

## Configuration

### poem.yaml

**File**: `config/poem.yaml`

```yaml
version: "0.1.0"
workspace: ./poem

server:
  port: 4321
  host: localhost

providers: []
```

**Key settings**:
- `workspace`: Points to parent poem/ directory
- `server`: For POEM app if using web interface
- `providers`: API configurations for image generation platforms

---

## Workflows

### Available Workflows

#### 1. Product Photography Workflow

**Agent**: Product Photography Agent
**Template**: `product-photography-template.json`
**Best for**: Hero images, catalog shots, clean presentation
**Output**: Professional studio-quality product photos

**Steps**:
1. Describe desired image in natural language
2. Agent fills product photography template
3. Generate using preferred platform
4. Save to `vibedeck-mocks/`

#### 2. Artistic Variation Workflow

**Agent**: Product Photography Agent (with style modifications)
**Template**: `product-photography-template.json` + style variations
**Best for**: Creative exploration, marketing materials
**Output**: Same device in different artistic styles

**Steps**:
1. Select style from `../../docs/artistic-styles-reference.md`
2. Provide style description to agent
3. Agent adapts template for that style
4. Generate and save

---

## Prompts Directory

### Purpose

The `prompts/` directory stores:
- Generated prompts (JSON files)
- Working drafts
- Successful prompts for reuse
- Iteration history

### Organization

```
prompts/
├── hero-shots/
│   ├── apple-minimalism-v1.json
│   ├── apple-minimalism-v2.json
│   └── final-hero-shot.json
│
├── artistic-variations/
│   ├── carved-wood-prompt.json
│   ├── resin-flowers-prompt.json
│   └── ...
│
└── experiments/
    └── test-prompts.json
```

---

## Integration with Knowledge Base

This workspace leverages the system-agnostic knowledge base:

### Templates

**Source**: `../../docs/image-generation/templates/`
**Usage**: Agents load templates from here

**Available templates**:
- `product-photography-template.json` - Comprehensive product shot template

### Reference Materials

**Source**: `../../docs/image-generation/reference/`
**Purpose**: Best practices, techniques, platform docs

**Key references**:
- `nano-banana-json-prompting.md` - JSON prompt concepts
- `nano-banana-api-implementation.md` - API usage

### Workflows

**Source**: `../../docs/image-generation/workflows/`
**Purpose**: Agent instruction files

**Available workflows**:
- `agent-product-photography.md` - Product photography agent

---

## Output Management

### Where Images Go

**Primary output location**: `../../vibedeck-mocks/`

**NOT stored in POEM workspace** because:
- Images are deliverables, not workflow artifacts
- Need to be accessible to VibeDeck application
- Keep workspace clean and focused on prompts/data

### Output Organization

```
vibedeck-mocks/
├── retro-plastic-70s/        # Grey plastic 70s/80s Akai style
├── carved-wood/              # Carved walnut wood
├── resin-flowers/            # Clear resin with flowers
├── stained-glass/            # Stained glass design
├── lego-bricks/              # LEGO construction
├── concrete-brutalist/       # Raw concrete brutalist
└── [other-styles]/           # Additional material variations
```

See `../../vibedeck-mocks/README.md` for detailed organization.

---

## Project-Specific Data

### Kickstarter Campaign Requirements

**Hero images needed**:
1. Apple Minimalism style (CI-01)
2. Ultra-Close Macro detail (CI-04)
3. High-Key Studio bright (CI-06)
4. Isometric Technical view (CI-09)
5. Soft Natural Window Light lifestyle (CI-14)

**Artistic variations priority**:
- Phase 2: Materials & Textures (M1-M5) - IN PROGRESS
- Phase 2: Art Movements (A1-A5) - NEXT
- Phase 3: All remaining categories

### Style Reference

**Complete style catalog**: `../../docs/artistic-styles-reference.md`

**80+ styles** across:
- 30 Photography & Lighting styles
- 25 Artistic Material Variations (Part 1)
- 25 Artistic Material Variations (Part 2)

---

## Troubleshooting

### Agent not loading
- Verify `.poem-core/` directory exists
- Check agent file path is correct
- Ensure Claude Code has access to files

### Template not found
- Check `docs/image-generation/templates/` exists
- Verify template file name matches agent expectations

### Image generation fails
- Validate JSON syntax (use JSONLint)
- Check API keys/credentials in `config/providers/`
- Try simpler prompt first to isolate issue

### Output location unclear
- Images go to `../../vibedeck-mocks/` NOT in POEM workspace
- Prompts stay in `./prompts/`
- Configuration stays in `./config/`

---

## Best Practices

1. **Use agents**: Don't manually write JSON, let agents do it
2. **Save successful prompts**: Store in `./prompts/` for reuse
3. **Reference knowledge base**: Check `docs/image-generation/` for techniques
4. **Iterate systematically**: Change one variable at a time
5. **Document learnings**: Update knowledge base with discoveries

---

## Related Documentation

### POEM System
- **POEM Core**: `../../.poem-core/` - Framework components
- **POEM Config**: `../../.poem-core/poem-core-config.yaml` - Core configuration

### Project Docs
- **VibeDeck Project**: `../../docs/vibedeck-project.md` - Project overview and workflow
- **Artistic Styles**: `../../docs/artistic-styles-reference.md` - All 80+ styles
- **Knowledge Base**: `../../docs/image-generation/` - Templates and techniques

### Output
- **Mock Images**: `../../vibedeck-mocks/` - All generated images
- **Mock README**: `../../vibedeck-mocks/README.md` - Image organization guide

---

## Quick Commands

### Start a new prompt generation session
1. Open Claude Code
2. Load agent: `../../.poem-core/agents/[agent-name].md`
3. Describe image: natural language input
4. Copy JSON: from agent output
5. Generate: paste into image platform
6. Save: to `../../vibedeck-mocks/[style-name]/`

### Review existing prompts
```bash
ls prompts/
cat prompts/artistic-variations/carved-wood-prompt.json
```

### Check workspace status
```bash
ls -la
cat config/poem.yaml
```

---

## Development Notes

### For Claude/AI Agents

When working in this workspace:
- Load templates from `../../docs/image-generation/templates/`
- Save generated prompts to `./prompts/`
- Reference styles from `../../docs/artistic-styles-reference.md`
- Output images go to `../../vibedeck-mocks/` NOT here
- Use POEM Core agents from `../../.poem-core/agents/`

### For Human Developers

- This workspace is agent-driven, minimal manual editing needed
- Configuration in `config/poem.yaml`
- Review agent outputs in `prompts/` before using
- Check `.poem-core/README.md` for POEM framework details

---

## Success Metrics

### Workflow Success
- ✅ Agent generates valid JSON on first try
- ✅ JSON produces high-quality image when used
- ✅ Image matches description/requirements
- ✅ Process repeatable for similar requests

### Campaign Success
- 🎯 5 hero images generated (photography styles)
- 🎯 25 artistic variations generated (Phase 2)
- 🎯 10-15 finalist images selected for campaign
- 🎯 Kickstarter campaign launched with images

---

**Last Updated**: 2026-01-15
**Workflow Owner**: David
**Image Generation**: Jan
**POEM Version**: 0.1.0
