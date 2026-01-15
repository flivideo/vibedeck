# Image Generation Knowledge Base

**Purpose**: System-agnostic knowledge base for AI image generation
**Scope**: Reusable across projects and platforms
**Status**: Active knowledge curation

---

## Overview

This directory contains templates, best practices, and reference materials for generating high-quality product images using AI image generation systems. The techniques documented here work across multiple platforms (Nano Banana Pro, ChatGPT/DALL-E, Midjourney, Stable Diffusion, etc.).

**NOT project-specific**: While originally developed for VibeDeck, these resources apply to any product photography or image generation project.

---

## Directory Structure

```
docs/image-generation/
├── README.md (this file)
├── PLAN.md                                  # Original project plan
│
├── templates/                               # Reusable prompt templates
│   └── product-photography-template.json    # Comprehensive JSON template
│
├── reference/                               # Domain knowledge & best practices
│   ├── nano-banana-json-prompting.md        # JSON prompt engineering concepts
│   ├── nano-banana-api-implementation.md    # API technical details
│   └── (future additions)
│
├── workflows/                               # Agent-based workflows
│   └── agent-product-photography.md         # Product photography agent
│
└── examples/                                # Reference examples
    ├── vibedeck-example.json                # Complete VibeDeck JSON example
    ├── input-simple.txt                     # Simple test input
    └── input-complex.txt                    # Complex test input
```

---

## Core Concepts

### JSON-Based Prompt Engineering

Traditional prompts: "A VibeDeck controller on a wooden desk with soft lighting"

**JSON-structured prompts**: Explicit control over every aspect:
```json
{
  "product": {...},
  "lighting": {
    "primary_light": {...},
    "fill_light": {...},
    "rim_light": {...}
  },
  "composition": {...},
  "surface": {...},
  "background": {...},
  "effects": {...}
}
```

**Benefits**:
- **Deterministic**: Same JSON → consistent results
- **Controllable**: Adjust specific aspects without affecting others
- **Iterative**: Change one "handle" (e.g., lighting) while keeping rest constant
- **Transferable**: Works across different AI systems

See `reference/nano-banana-json-prompting.md` for detailed concepts.

---

## Templates

### Product Photography Template

**File**: `templates/product-photography-template.json`

**Comprehensive JSON schema** covering:
- Product description (form, materials, components)
- Lighting setup (key, fill, rim, practical lights)
- Composition (camera angle, framing, depth of field)
- Surface and background
- Props and context elements
- Effects (glow, reflections, atmospheric)
- Style reference and mood
- Output format specifications

**Usage**: Fill in template with your product details, generate image using any compatible platform.

---

## Reference Materials

### Nano Banana JSON Prompting

**File**: `reference/nano-banana-json-prompting.md`

**Topics covered**:
- "Renderer" vs "Vibes" approach
- Handle-based control system
- JSON schema structure
- Best practices for deterministic output
- Iterative refinement techniques

### Nano Banana API Implementation

**File**: `reference/nano-banana-api-implementation.md`

**Technical details**:
- Python SDK usage
- API request/response patterns
- Authentication and configuration
- Error handling
- Batch processing

---

## Workflows

### Product Photography Agent

**File**: `workflows/agent-product-photography.md`

**MVC Pattern Implementation**:
- **Agent (Controller)**: Merges template + data, generates complete JSON
- **Template (View)**: JSON schema with best practices
- **Data (Input)**: Natural language description of desired image

**How to use**:
1. Load agent in Claude Code: point to `agent-product-photography.md`
2. Provide input: natural language description of what you want
3. Agent generates: complete JSON ready for image generation platform
4. Generate image: paste JSON into Nano Banana Pro or compatible system

See `workflows/agent-product-photography.md` for detailed instructions.

---

## Examples

### VibeDeck Example

**File**: `examples/vibedeck-example.json`

Complete JSON for VibeDeck product shot showing:
- Dark gray housing with cyan blue LED backlighting
- Matrix green OLED display
- Professional studio lighting setup
- Dark wood desk surface
- Composition details

**Purpose**: Reference example demonstrating all template sections filled in.

### Test Inputs

**Simple input** (`examples/input-simple.txt`):
```
The quick brown fox jumps over the lazy dog
```

**Complex input** (`examples/input-complex.txt`):
```
Detailed VibeDeck product description with specific requirements...
```

**Usage**: Test agent workflow with these inputs to verify setup works before using own prompts.

---

## Compatible Platforms

### Tested & Working

✅ **Nano Banana Pro** - Full JSON support, best control, higher cost
✅ **ChatGPT (DALL-E 3)** - Good JSON interpretation, affordable, excellent results

### Should Work (Untested)

🔸 **Midjourney** (via structured prompts)
🔸 **Stable Diffusion** (via weighted prompts)

---

## Best Practices

1. **Start With Template**: Begin with complete template, don't build from scratch
2. **Use the Agent**: Let agent do heavy lifting, provide natural language input
3. **Iterate on Handles**: Change ONE thing at a time to understand impact
4. **Save Successful Prompts**: Build library of working JSONs
5. **Test Across Platforms**: Compare results to optimize approach

---

## Integration with POEM

This knowledge base supports POEM (Prompt Orchestration and Engineering Method) workflows:

- **POEM Core**: Framework and agents (`.poem-core/`)
- **POEM Workspaces**: Project-specific workflows (`poem/[workflow-name]/`)
- **Knowledge Base**: Reusable templates and reference (THIS directory)

---

## Related Documentation

- **VibeDeck Project**: `../vibedeck-project.md` - VibeDeck-specific workflow and overview
- **Artistic Styles**: `../artistic-styles-reference.md` - 80+ style variations catalog
- **Sample Images**: `../../vibedeck-mocks/` - Generated sample images
- **POEM Core**: `../../.poem-core/` - Framework
- **POEM Workspaces**: `../../poem/` - Active projects

---

## Quick Start Guide

1. **Read concepts**: Start with `reference/nano-banana-json-prompting.md`
2. **Review template**: Open `templates/product-photography-template.json`
3. **Try example**: Use `examples/vibedeck-example.json` in ChatGPT or Nano Banana
4. **Load agent**: Follow instructions in `workflows/agent-product-photography.md`
5. **Generate your first image**: Provide description, get JSON, generate image

---

**Last Updated**: 2026-01-15
**Maintained By**: David & contributors
