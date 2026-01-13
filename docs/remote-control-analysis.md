# Claude Code Remote Control: Comparative Analysis

## Executive Summary

This document analyzes three sophisticated applications that remotely control Claude Code for autonomous development:

1. **Vibe Kanban** - Bidirectional protocol-based orchestration
2. **AutoClaude** - Agent SDK multi-agent system
3. **Claudear** - Project management integration automation

Each application represents a different architectural approach to achieving autonomous AI-driven development.

---

## Comparison Matrix

| Aspect | Vibe Kanban | AutoClaude | Claudear |
|--------|-------------|------------|----------|
| **Control Method** | JSON-RPC over stdin/stdout | Claude Agent SDK | Direct CLI invocation |
| **Architecture** | Rust backend + React frontend | Python backend + Electron frontend | FastAPI backend |
| **Communication** | Bidirectional protocol (ProtocolPeer) | SDK subprocess spawning | JSONL streaming |
| **Authentication** | OAuth with token refresh | OAuth + credential store | API keys in env |
| **Permission Control** | Runtime interception via hooks | SDK security profiles | Skip permissions flag |
| **Concurrency** | Semaphore-based runner pool | Multi-session parallel execution | Worktree-based isolation |
| **Task Isolation** | Git worktrees | Git worktrees | Git worktrees |
| **Real-time Updates** | JSON patches, WebSocket | IPC + stdout parsing | Activity labels + comments |
| **Blocking Handling** | CanUseTool permission requests | Hook callbacks | Pattern detection + polling |
| **MCP Integration** | Exposes as MCP server | Per-agent MCP config | Not implemented |
| **Multi-Agent** | Single agent focus | Multi-agent pipeline | Single agent per task |
| **Memory System** | None (stateless) | Graphiti knowledge graph | SQLite task persistence |
| **Language** | Rust + TypeScript | Python + TypeScript | Python |
| **Maturity** | Production-grade | Production-grade | Early production |

---

## Detailed Comparison

### 1. Control Method & Communication

#### Vibe Kanban: Bidirectional Protocol
**Most Sophisticated Approach**

```rust
// Spawns Claude Code with stdio control
npx -y @anthropic-ai/claude-code@2.0.76 --permission-prompt-tool=stdio

// Creates ProtocolPeer that manages stdin/stdout
pub struct ProtocolPeer {
    stdin: ChildStdin,
    stdout_receiver: UnboundedReceiver<ControlRequest>,
}

// Bidirectional message flow:
Claude Code → ControlRequest(CanUseTool) → Vibe Kanban
Vibe Kanban → ControlResponse(Allow/Deny) → Claude Code
```

**Key Features:**
- Real-time permission interception
- Can modify tool inputs before execution
- Graceful interrupt via control protocol
- Permission mode switching at runtime

**Advantages:**
✅ Fine-grained control over every tool use
✅ Can enforce security policies dynamically
✅ Clean interrupt mechanism
✅ No reliance on output parsing

**Disadvantages:**
❌ Complex protocol implementation
❌ Requires maintaining protocol compatibility
❌ Higher cognitive load for developers

---

#### AutoClaude: Agent SDK
**High-Level Abstraction**

```python
from claude_agent_sdk import ClaudeSDKClient, ClaudeAgentOptions

client = ClaudeSDKClient(options=ClaudeAgentOptions(
    model="claude-sonnet-4-5",
    project_dir=project_dir,
    security_settings={
        "defaultMode": "acceptEdits",
        "allowedPaths": [project_dir]
    }
))

response = client.create_agent_session(
    name="coder-agent-session",
    starting_message="Implement the authentication feature"
)
```

**Key Features:**
- SDK handles all protocol complexity
- Built-in OAuth management
- Automatic MCP server configuration
- Security profiles abstraction

**Advantages:**
✅ Simple API, low cognitive overhead
✅ SDK maintains compatibility
✅ Built-in security abstractions
✅ Handles token refresh automatically

**Disadvantages:**
❌ Less control over low-level behavior
❌ Black box for protocol details
❌ Dependent on SDK release cycle
❌ Limited customization options

---

#### Claudear: Direct CLI + JSONL Streaming
**Simplest Approach**

```python
# Direct CLI invocation
cmd = [
    "claude",
    "--print",                           # Non-interactive mode
    "--verbose",                         # Required for stream-json
    "--output-format", "stream-json",    # JSONL output
    "--dangerously-skip-permissions"     # Auto-accept
]

process = await asyncio.create_subprocess_exec(
    *cmd,
    stdin=asyncio.subprocess.PIPE,
    stdout=asyncio.subprocess.PIPE,
    cwd=worktree_path
)

# Send prompt, stream JSONL output
process.stdin.write(prompt.encode())
async for line in process.stdout:
    data = json.loads(line)
    # Parse for tool events and blocking patterns
```

**Key Features:**
- No SDK dependency
- Direct control over CLI flags
- JSONL parsing for real-time events
- Pattern-based detection for blocking

**Advantages:**
✅ Extremely simple implementation
✅ No external dependencies
✅ Direct CLI access
✅ Easy to understand and debug

**Disadvantages:**
❌ Fragile pattern-based detection
❌ No permission control
❌ Manual OAuth handling
❌ Limited observability

---

### 2. Authentication & Security

#### Vibe Kanban
```rust
// Multi-layer authentication
pub struct AuthConfig {
    oauth_token: Option<String>,           // From env or store
    access_token: Option<String>,          // Runtime token
    refresh_token: Option<String>,         // For renewal
}

// Permission interception
pub enum PermissionResult {
    Allow { updated_input: Value },
    Deny { message: String, interrupt: bool },
}
```

**Security Features:**
- HMAC signature verification for webhooks
- Runtime permission interception
- Can modify tool inputs before execution
- Token refresh with automatic retry
- Configurable permission modes

---

#### AutoClaude
```python
# Priority order for authentication
1. CLAUDE_CODE_OAUTH_TOKEN (env var)
2. ANTHROPIC_AUTH_TOKEN (enterprise)
3. System credential store (macOS Keychain, Windows)

# Security layers
- OS sandbox via SDK
- Filesystem restrictions (project directory only)
- Dynamic command allowlist based on project stack
- Custom MCP server validation (blocks dangerous commands)
```

**Security Features:**
- Multi-source credential resolution
- Stack-specific command allowlists
- MCP server command validation
- Blocks dangerous shell interpreters
- No direct ANTHROPIC_API_KEY support (prevents silent billing)

---

#### Claudear
```python
# Simple environment variable approach
LINEAR_API_KEY=lin_api_xxxx
GITHUB_TOKEN=ghp_xxxx
CLAUDE_CODE_OAUTH_TOKEN=sk-ant-oat01-xxxx

# Security
- HMAC SHA-256 for Linear webhooks
- --dangerously-skip-permissions (full trust)
- Git worktree isolation
```

**Security Features:**
- HMAC webhook verification
- API keys in `.env` (gitignored)
- Git worktree isolation
- Limited scope (no permission control)

---

### 3. Concurrency & Task Isolation

#### Vibe Kanban
```rust
pub struct ClaudeRunnerPool {
    semaphore: Semaphore,  // Max concurrent limit
    runners: HashMap<Uuid, ClaudeRunner>,
}

// Each task gets isolated worktree
.worktrees/{workspace-id}/
```

**Concurrency Model:**
- Semaphore-based concurrency control
- Configurable max concurrent tasks (default: 5)
- Git worktrees for filesystem isolation
- Shared MsgStore for log aggregation
- Real-time log processing with JSON patches

---

#### AutoClaude
```typescript
// Electron spawns multiple Python processes
const childProcess = spawn(pythonCommand, args, { cwd, env });

// Each spec gets isolated worktree
.auto-claude/specs/{spec-id}/
├── worktree/     # Git worktree on branch auto-claude/{spec-name}
├── spec.md
├── implementation_plan.json
└── qa_report.md
```

**Concurrency Model:**
- Multi-process via Electron IPC
- Each Python backend process spawns SDK subprocess
- Git worktrees per spec (parallel builds)
- Graphiti memory shared across sessions

---

#### Claudear
```python
class ClaudeRunnerPool:
    def __init__(self, max_concurrent: int = 5):
        self._semaphore = asyncio.Semaphore(max_concurrent)

    async def start_runner(...):
        async with self._semaphore:
            runner = ClaudeRunner(...)
            return await runner.run()
```

**Concurrency Model:**
- Async semaphore for concurrency limit
- Git worktrees per task: `repo/.worktrees/{task-id}`
- Single instance handles all providers
- SQLite for task coordination

---

### 4. Real-Time Updates & Observability

#### Vibe Kanban
```rust
// JSON patches for real-time UI updates
pub struct LogProcessor {
    fn generate_patch(&self, entry: LogEntry) -> JsonPatch
}

// WebSocket streaming
ws://localhost/api/workspaces/{id}/stream
```

**Real-Time Features:**
- JSON patch streaming (RFC 6902)
- WebSocket for live updates
- Normalized log entries with tool mapping
- Session ID extraction from output
- Entry indexing for historical replay

---

#### AutoClaude
```typescript
// Frontend monitors stdout for phase markers
childProcess.stdout?.on('data', (data) => {
    const text = data.toString();

    // Phase detection
    if (text.includes('[PHASE:')) {
        this.handlePhaseTransition(text);
    }

    // Rate limit detection
    if (text.includes('Rate limit exceeded')) {
        this.handleRateLimit(taskId);
    }
});
```

**Real-Time Features:**
- IPC event emission to renderer
- Phase transition tracking
- Auto-profile switching on rate limits
- Progress bars and status indicators
- Real-time terminal output in UI

---

#### Claudear
```python
# Activity labels posted to Linear
TOOL_NAME_TO_ACTIVITY = {
    "Read": ActivityLabel.READING,      # "🔍 Reading files"
    "Edit": ActivityLabel.EDITING,      # "✏️ Editing code"
    "Bash": ActivityLabel.TESTING,      # "🧪 Running tests"
}

# Comments posted at key milestones
await provider.post_comment(
    task_id,
    "Starting work on this issue\n\n**Branch:** feature/task-123"
)
```

**Real-Time Features:**
- Linear labels show current activity
- Progress comments at milestones
- Blocked state detection with reasons
- PR link posted on completion
- Polling for human responses when blocked

---

### 5. Blocking & Error Handling

#### Vibe Kanban
```rust
// Permission-based blocking
pub enum ControlRequestType {
    CanUseTool {
        tool_name: String,
        input: Value,
        permission_suggestions: Vec<PermissionUpdate>,
    },
}

// Approval service decides
pub trait ExecutorApprovalService {
    async fn on_tool_use(&self, tool: String, input: Value)
        -> PermissionResult;
}
```

**Blocking Strategy:**
- Intercepts every tool use
- Approval service can Allow/Deny/Ask
- Permission mode switching (Plan → Bypass → Default)
- Graceful interrupt via control protocol

---

#### AutoClaude
```python
# Hook callbacks for pre-tool-use
hooks = {
    "PreToolUse": {
        "matcher": "auto_approve",
        "callback": "on_tool_use"
    }
}

# Security settings per agent
security_settings = {
    "defaultMode": "acceptEdits",      # Auto-accept Edit tool
    "allowedPaths": [project_dir]
}
```

**Blocking Strategy:**
- Hook-based interception
- SDK handles security validation
- QA review step for validation
- Fixer agent for iterative corrections

---

#### Claudear
```python
# Pattern-based detection
def detect_blocked(text: str) -> BlockedDetection:
    patterns = [
        r"BLOCKED:",
        r"I need clarification",
        r"I cannot proceed",
    ]
    # Returns: BlockedDetection(is_blocked=True, reason="...")

# Polling for human response
async def poll_for_unblock():
    while blocked:
        comment = await provider.get_latest_comment()
        if comment.is_from_human():
            await resume(comment.body)
            break
        await asyncio.sleep(30)  # Poll every 30s
```

**Blocking Strategy:**
- Regex pattern matching on output
- Posts comment asking for help
- Polls for human comments every 30 seconds
- Resumes session with user input
- Timeout after 1 hour (configurable)

---

### 6. Multi-Agent Orchestration

#### Vibe Kanban
**Single-Agent Focus**
- Supports multiple executors (Claude, Gemini, Codex)
- But each workspace runs single agent
- No built-in multi-agent pipeline
- MCP tools allow agents to spawn sub-tasks

---

#### AutoClaude
**Multi-Agent Pipeline**

```python
# Agent types
1. Planner → Creates implementation plan with subtasks
2. Coder → Implements subtasks (can spawn parallel subagents)
3. QA Reviewer → Validates acceptance criteria
4. QA Fixer → Fixes issues found by reviewer

# Pipeline flow
Planner.plan()
  → Coder.implement(subtask_1) ∥ Coder.implement(subtask_2)
  → QA_Reviewer.validate()
  → if issues: QA_Fixer.fix() → QA_Reviewer.validate()
  → Done
```

**Multi-Agent Features:**
- Different prompts per agent type
- Graphiti memory shared across agents
- MCP servers configured per agent
- Subagent parallelization

---

#### Claudear
**Single-Agent Per Task**
- One Claude session per task
- No agent specialization
- Can resume blocked sessions
- Linear/Notion integration only

---

### 7. Memory & Knowledge Systems

#### Vibe Kanban
**Stateless**
- No persistent memory between sessions
- MsgStore for current session logs
- Task context provided via MCP tools

---

#### AutoClaude
**Graphiti Knowledge Graph**

```python
from graphiti_core import Graphiti

graphiti = Graphiti(
    llm_client=OpenAI(),   # Or Anthropic, Azure, etc.
    embedder=OpenAI()
)

# After session
insights = extract_insights(session_output)
await graphiti.add_episode(
    name="Implementation of authentication",
    content=insights,
    source="auto-claude-session"
)

# Retrieve for future sessions
relevant_context = await graphiti.search(
    query="authentication patterns",
    limit=10
)
```

**Memory Features:**
- Cross-session learning
- Semantic search for context
- Embedded LadybugDB (no Docker)
- Multi-provider support

---

#### Claudear
**SQLite Task Database**

```python
@dataclass
class TaskRecord:
    provider: ProviderType
    instance_id: str
    task_identifier: str
    title: str
    description: str
    branch_name: str
    state: TaskState
    pr_number: Optional[int]
    session_id: Optional[str]
```

**Memory Features:**
- Task persistence
- Session tracking
- State machine history
- No cross-task learning

---

## Architectural Patterns Summary

### Vibe Kanban: The Protocol Engineer
**Philosophy:** "Control everything at the protocol level"

```
Strengths:
✅ Maximum control and observability
✅ Fine-grained security policies
✅ Clean separation of concerns
✅ Production-grade reliability

Weaknesses:
❌ High implementation complexity
❌ Protocol maintenance burden
❌ Steep learning curve
```

**Best For:**
- Enterprise deployments requiring strict security
- Teams needing full auditability
- Multi-tenant SaaS applications
- High-concurrency workloads

---

### AutoClaude: The SDK Orchestrator
**Philosophy:** "Leverage the SDK, focus on agent pipelines"

```
Strengths:
✅ Rapid development with SDK
✅ Multi-agent workflows
✅ Knowledge graph memory
✅ Rich UI (Electron desktop)

Weaknesses:
❌ SDK dependency lock-in
❌ Less low-level control
❌ Complex multi-process architecture
```

**Best For:**
- Feature-rich desktop applications
- Teams wanting multi-agent pipelines
- Projects needing cross-session learning
- Rapid prototyping

---

### Claudear: The Integration Specialist
**Philosophy:** "Simple, focused PM integration"

```
Strengths:
✅ Extremely simple implementation
✅ Linear/Notion integration
✅ Real-time activity labels
✅ Webhook + polling support

Weaknesses:
❌ Limited control and security
❌ Fragile pattern detection
❌ No multi-agent support
❌ Basic error handling
```

**Best For:**
- Teams using Linear or Notion
- Simple automation workflows
- Small teams (<5 concurrent tasks)
- Quick prototypes

---

## Decision Framework

### Choose Vibe Kanban if:
- ✅ You need maximum control and security
- ✅ You're building a multi-tenant SaaS
- ✅ You require fine-grained permission policies
- ✅ You have Rust expertise
- ✅ You need to support multiple AI providers
- ❌ You don't want SDK lock-in

### Choose AutoClaude if:
- ✅ You want multi-agent workflows
- ✅ You need cross-session learning
- ✅ You prefer Python + TypeScript stack
- ✅ You want a rich desktop UI
- ✅ You're OK with SDK dependency
- ❌ You don't need protocol-level control

### Choose Claudear if:
- ✅ You use Linear or Notion for PM
- ✅ You want simple automation
- ✅ You need fast setup (<1 hour)
- ✅ You have small teams
- ✅ You prefer Python-only
- ❌ You don't need advanced features

---

## Hybrid Approaches

### Best of All Three

If building from scratch, consider:

1. **Use Vibe Kanban's protocol approach** for control layer
   - Bidirectional stdin/stdout communication
   - Permission interception hooks
   - Graceful interrupt mechanism

2. **Use AutoClaude's multi-agent pattern** for orchestration
   - Planner → Coder → QA pipeline
   - Per-agent prompt specialization
   - Graphiti memory integration

3. **Use Claudear's PM integration** for task sources
   - Webhook + polling event sources
   - Activity labels for real-time status
   - Blocked state handling with human-in-loop

### Example Hybrid Architecture

```
┌─────────────────────────────────────────┐
│  Event Sources (Linear, Notion, Jira)  │
│  (Claudear's webhook + polling)         │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│  Task Orchestrator                      │
│  (AutoClaude's multi-agent pipeline)    │
│  ┌──────────────────────────────────┐   │
│  │ Planner → Coder → QA Pipeline    │   │
│  └──────────────────────────────────┘   │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│  Protocol Layer (ProtocolPeer)          │
│  (Vibe Kanban's bidirectional control)  │
│  ┌──────────────────────────────────┐   │
│  │ Permission Interception          │   │
│  │ Runtime Policy Enforcement       │   │
│  └──────────────────────────────────┘   │
└────────────┬────────────────────────────┘
             │
    ┌────────┴────────┐
    │  Claude Code    │
    │  (Process)      │
    └─────────────────┘
```

This combines:
- Claudear's PM integration simplicity
- AutoClaude's multi-agent sophistication
- Vibe Kanban's protocol-level control

---

## Conclusion

All three applications demonstrate mature approaches to remotely controlling Claude Code:

- **Vibe Kanban** excels at protocol-level control and security
- **AutoClaude** excels at multi-agent orchestration and memory
- **Claudear** excels at simplicity and PM integration

The "smartest" approach depends on your specific needs:
- **Maximum control** → Vibe Kanban's protocol
- **Maximum intelligence** → AutoClaude's multi-agent + memory
- **Maximum simplicity** → Claudear's direct CLI

For most sophisticated autonomous systems, a **hybrid approach** combining elements of all three will yield the best results.
