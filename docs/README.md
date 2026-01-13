# VibeDeck Documentation

## Overview

VibeDeck is exploring autonomous control of Claude Code. This documentation provides comprehensive guides on how to remotely control Claude Code based on analysis of three production applications.

## Documentation Files

### 1. [Remote Control Analysis](./remote-control-analysis.md)
**Deep dive comparison of three production applications**

- Comparative analysis of Vibe Kanban, AutoClaude, and Claudear
- Architecture patterns and design decisions
- Advantages and limitations of each approach
- Decision framework for choosing the right approach
- Hybrid architecture recommendations

**Read this if:**
- You want to understand different architectural approaches
- You're deciding which pattern to implement
- You need to justify technical decisions

---

### 2. [Remote Control Implementation Guide](./claude-code-remote-control-guide.md)
**Complete implementation guide with working code examples**

Covers three approaches:
1. **Direct CLI with JSONL Streaming** (Simple)
   - Process spawning and streaming
   - Tool activity tracking
   - Blocking detection

2. **Agent SDK Integration** (Balanced)
   - SDK-based implementation
   - Multi-agent pipelines
   - Authentication patterns

3. **Bidirectional Protocol** (Advanced)
   - Protocol peer implementation
   - Advanced permission control
   - Runtime mode switching

Plus practical patterns for:
- Concurrency and task isolation
- Real-time monitoring with WebSocket
- Security best practices
- Complete production example

**Read this if:**
- You're implementing remote control from scratch
- You need working code examples
- You want to understand implementation details

---

### 3. [Quick Reference](./claude-code-remote-control-quick-reference.md)
**Handy cheat sheet for common patterns**

Quick access to:
- CLI invocation methods
- Python code snippets
- Authentication patterns
- Common patterns (worktrees, concurrency, blocking)
- Agent SDK usage
- Security checklist
- Protocol messages reference
- Performance tips
- Debugging techniques

**Read this if:**
- You need quick syntax reference
- You're looking for copy-paste code snippets
- You want a security checklist

---

## Quick Start

### 1. Choose Your Approach

**Simple automation?**
```bash
claude --print --output-format stream-json --dangerously-skip-permissions
```

**Multi-agent workflows?**
```python
from claude_agent_sdk import ClaudeSDKClient
client = ClaudeSDKClient(...)
```

**Maximum control?**
```bash
claude --print --permission-prompt-tool stdio --output-format stream-json
```

### 2. Read the Right Doc

| Your Goal | Start Here |
|-----------|------------|
| Understand options | [Remote Control Analysis](./remote-control-analysis.md) |
| Build a system | [Implementation Guide](./claude-code-remote-control-guide.md) |
| Quick reference | [Quick Reference](./claude-code-remote-control-quick-reference.md) |

### 3. Study the Examples

All three applications are available locally:
- **Vibe Kanban**: `/Users/davidcruwys/dev/tools/vibe-kanban`
- **AutoClaude**: `/Users/davidcruwys/dev/tools/AutoClaude`
- **Claudear**: `/Users/davidcruwys/dev/tools/claudear`

---

## Key Findings

### Three Proven Approaches

1. **Vibe Kanban: The Protocol Engineer**
   - Bidirectional JSON-RPC over stdin/stdout
   - Fine-grained permission control
   - Runtime mode switching
   - **Best for:** Enterprise security, multi-tenant SaaS

2. **AutoClaude: The SDK Orchestrator**
   - Claude Agent SDK for high-level control
   - Multi-agent pipeline (Planner → Coder → QA)
   - Graphiti knowledge graph memory
   - **Best for:** Rich desktop apps, multi-agent systems

3. **Claudear: The Integration Specialist**
   - Direct CLI with JSONL streaming
   - Linear/Notion integration
   - Pattern-based blocking detection
   - **Best for:** Simple automation, PM integration

### Decision Matrix

```
┌─────────────────────────────────────────────────────┐
│                 Complexity vs Control               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  High Control  │  Vibe Kanban                       │
│                │  (Protocol)                        │
│                │  ⚙️⚙️⚙️⚙️⚙️                          │
│                │                                    │
│                │  AutoClaude                        │
│                │  (Agent SDK)                       │
│  Medium        │  ⚙️⚙️⚙️                              │
│                │                                    │
│                │  Claudear                          │
│  Low Control   │  (Direct CLI)                      │
│                │  ⚙️                                 │
│                └────────────────────────────────────│
│                Low          Medium          High    │
│                        Complexity                   │
└─────────────────────────────────────────────────────┘
```

---

## Common Use Cases

### 1. Autonomous Task Execution
```python
# Watch project management system, auto-implement tasks
await watch_linear_issues()  # Claudear pattern
```

### 2. Multi-Agent Development
```python
# Planner → Coder → QA pipeline
await run_multi_agent_pipeline(feature)  # AutoClaude pattern
```

### 3. Controlled Execution
```python
# Fine-grained permission control
peer = ProtocolPeer(on_tool_request=approval_service)  # Vibe Kanban pattern
```

### 4. Parallel Task Execution
```python
# Multiple tasks in isolated worktrees
tasks = [run_in_worktree(task_id, prompt) for task_id in task_ids]
```

---

## Security Considerations

All three applications demonstrate:
- ✅ OAuth token management
- ✅ Git worktree isolation
- ✅ Permission control (varying levels)
- ✅ Input validation
- ✅ Audit logging

**Key Takeaway:** Never use `--dangerously-skip-permissions` in production without isolation.

---

## Next Steps

1. **Understand the landscape**: Read [Remote Control Analysis](./remote-control-analysis.md)
2. **Learn implementation**: Read [Implementation Guide](./claude-code-remote-control-guide.md)
3. **Build your system**: Use [Quick Reference](./claude-code-remote-control-quick-reference.md)
4. **Study examples**: Explore the three applications in `/Users/davidcruwys/dev/tools/`

---

## Contributing

This documentation is part of the VibeDeck project exploring autonomous AI development.

**Maintainer**: David Cruwys
**Last Updated**: 2026-01-12

---

## Related Projects

### In This Repo
- VibeDeck: Autonomous development orchestration (this project)

### External (Analyzed)
- [Vibe Kanban](https://github.com/musistudio/vibe-kanban): Protocol-based orchestration
- [AutoClaude](https://github.com/autoclaudeai/autoclaude): Multi-agent development
- [Claudear](https://github.com/ckreiling/claudear): PM integration automation

---

## License

See repository LICENSE file.
