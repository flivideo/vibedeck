# Claude Code Remote Control - Quick Reference

## CLI Invocation Methods

### 1. Basic (Non-Interactive)
```bash
claude --print --dangerously-skip-permissions
```
- Reads prompt from stdin
- Auto-accepts all permissions
- ⚠️ Use only in trusted environments

### 2. Streaming JSON Output
```bash
claude --print --verbose --output-format stream-json
```
- Outputs JSONL (JSON Lines) format
- Each line is a JSON object
- Enables real-time tool detection

### 3. Protocol Mode (Bidirectional Control)
```bash
claude --print --permission-prompt-tool stdio --output-format stream-json
```
- Enables bidirectional stdin/stdout protocol
- Intercepts tool permission requests
- Allows allow/deny/modify decisions
- Most sophisticated control

---

## Python Code Snippets

### Simplest: Direct Execution
```python
import subprocess

result = subprocess.run(
    ["claude", "--print", "--dangerously-skip-permissions"],
    input="Fix the bug in auth.py",
    capture_output=True,
    text=True,
    cwd="/path/to/project"
)
print(result.stdout)
```

### Async with Streaming
```python
import asyncio
import json

async def run_claude(prompt: str, cwd: str):
    process = await asyncio.create_subprocess_exec(
        "claude", "--print", "--output-format", "stream-json",
        "--dangerously-skip-permissions",
        stdin=asyncio.subprocess.PIPE,
        stdout=asyncio.subprocess.PIPE,
        cwd=cwd
    )

    # Send prompt
    process.stdin.write(prompt.encode())
    await process.stdin.drain()
    process.stdin.close()

    # Stream output
    async for line in process.stdout:
        data = json.loads(line.decode())
        print(data)

    await process.wait()
```

### Protocol Mode with Permission Control
```python
class ProtocolPeer:
    async def spawn(self, cwd: str, prompt: str):
        self.process = await asyncio.create_subprocess_exec(
            "claude", "--print", "--permission-prompt-tool", "stdio",
            "--output-format", "stream-json",
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            cwd=cwd
        )

        # Send prompt
        await self.send_user_message(prompt)

        # Listen for control requests
        asyncio.create_task(self._reader_loop())

    async def _reader_loop(self):
        async for line in self.process.stdout:
            data = json.loads(line.decode())

            if "controlRequest" in data:
                # Claude asking permission for tool use
                request = data["controlRequest"]
                response = self._decide_permission(request)
                await self._send_control_response(response)

    async def send_user_message(self, text: str):
        await self.send_json({
            "message": {
                "role": "user",
                "content": [{"type": "text", "text": text}]
            }
        })

    async def send_json(self, data: dict):
        json_str = json.dumps(data) + '\n'
        self.process.stdin.write(json_str.encode())
        await self.process.stdin.drain()
```

---

## Authentication

### OAuth Token Sources (Priority Order)

1. **Environment Variable** (Highest)
   ```bash
   export CLAUDE_CODE_OAUTH_TOKEN="sk-ant-oat01-..."
   ```

2. **macOS Keychain**
   ```bash
   security find-generic-password -s "claude-code" -w
   ```

3. **Windows Credential Manager**
   ```
   ~/.claude/.credentials.json
   ```

4. **Config File**
   ```
   ~/.claude/config.json
   ```

### Multi-Source Resolution (Python)
```python
import os
import subprocess

def get_oauth_token() -> str:
    # 1. Environment
    token = os.getenv("CLAUDE_CODE_OAUTH_TOKEN")
    if token:
        return token

    # 2. macOS Keychain
    try:
        result = subprocess.run(
            ["/usr/bin/security", "find-generic-password", "-s", "claude-code", "-w"],
            capture_output=True, text=True, check=False
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except:
        pass

    # 3. Config file
    config_path = os.path.expanduser("~/.claude/config.json")
    if os.path.exists(config_path):
        with open(config_path) as f:
            config = json.load(f)
            if "oauth_token" in config:
                return config["oauth_token"]

    raise ValueError("No OAuth token found")
```

---

## Common Patterns

### Git Worktree Isolation
```python
import subprocess
from pathlib import Path

def create_worktree(repo_path: str, task_id: str, branch: str) -> Path:
    """Create isolated worktree for task"""
    worktree_path = Path(repo_path) / ".worktrees" / task_id

    # Create branch
    subprocess.run(["git", "checkout", "-b", branch], cwd=repo_path, check=False)

    # Create worktree
    subprocess.run(
        ["git", "worktree", "add", str(worktree_path), branch],
        cwd=repo_path, check=True
    )

    return worktree_path

def cleanup_worktree(repo_path: str, task_id: str):
    """Remove worktree"""
    worktree_path = Path(repo_path) / ".worktrees" / task_id
    subprocess.run(
        ["git", "worktree", "remove", str(worktree_path)],
        cwd=repo_path, check=True
    )
```

### Concurrency Control
```python
import asyncio

class ConcurrencyController:
    def __init__(self, max_concurrent: int = 5):
        self.semaphore = asyncio.Semaphore(max_concurrent)

    async def run(self, task_func, *args):
        async with self.semaphore:
            return await task_func(*args)

# Usage
controller = ConcurrencyController(max_concurrent=3)

tasks = [
    controller.run(run_claude, "Task 1", "/project"),
    controller.run(run_claude, "Task 2", "/project"),
    controller.run(run_claude, "Task 3", "/project"),
]

results = await asyncio.gather(*tasks)
```

### Blocking Detection
```python
import re

def detect_blocked(text: str) -> tuple[bool, str]:
    """Detect if Claude is blocked and extract reason"""
    blocked_patterns = [
        (r"BLOCKED:\s*(.+)", "explicit block"),
        (r"I need clarification on:\s*(.+)", "needs clarification"),
        (r"I cannot proceed without\s*(.+)", "missing information"),
    ]

    for pattern, category in blocked_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            reason = match.group(1) if match.lastindex else text
            return True, reason

    return False, ""

# Usage
for line in output:
    is_blocked, reason = detect_blocked(line)
    if is_blocked:
        print(f"Blocked: {reason}")
        # Handle: post comment, notify user, etc.
```

### Activity Tracking
```python
from enum import Enum

class Activity(Enum):
    READING = "🔍 Reading"
    EDITING = "✏️ Editing"
    TESTING = "🧪 Testing"
    SEARCHING = "🔎 Searching"

TOOL_TO_ACTIVITY = {
    "Read": Activity.READING,
    "Edit": Activity.EDITING,
    "Write": Activity.EDITING,
    "Bash": Activity.TESTING,
    "Glob": Activity.SEARCHING,
    "Grep": Activity.SEARCHING,
}

def track_activity(tool_name: str) -> Activity:
    return TOOL_TO_ACTIVITY.get(tool_name, Activity.READING)
```

---

## Agent SDK (Alternative Approach)

### Installation
```bash
pip install claude-agent-sdk
```

### Basic Usage
```python
from claude_agent_sdk import ClaudeSDKClient, ClaudeAgentOptions

# Create client
client = ClaudeSDKClient(
    options=ClaudeAgentOptions(
        model="claude-sonnet-4-5",
        project_dir="/path/to/project",
        oauth_token=os.getenv("CLAUDE_CODE_OAUTH_TOKEN"),
        security_settings={
            "defaultMode": "acceptEdits",
            "allowedPaths": ["/path/to/project"]
        }
    )
)

# Run session
response = await client.create_agent_session(
    name="task-session",
    starting_message="Implement authentication"
)

print(f"Session: {response.session_id}")
print(f"Output: {response.output}")
```

### With MCP Servers
```python
mcp_servers = {
    "context7": {
        "command": "npx",
        "args": ["-y", "@upstash/context7-mcp"]
    },
    "puppeteer": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
}

client = ClaudeSDKClient(
    options=ClaudeAgentOptions(
        model="claude-sonnet-4-5",
        project_dir="/path/to/project",
        mcp_servers=mcp_servers
    )
)
```

---

## Security Checklist

### ✅ DO
- Use `--permission-prompt-tool stdio` for production
- Implement approval policies for dangerous tools
- Validate inputs before sending to Claude
- Use git worktrees for filesystem isolation
- Set timeouts on bash commands
- Log all tool usage for auditing
- Use allowlists for bash commands

### ❌ DON'T
- Use `--dangerously-skip-permissions` in production
- Allow Claude to write to sensitive files (.env, credentials)
- Run without filesystem restrictions
- Allow arbitrary bash commands
- Expose API keys in prompts
- Run multiple tasks in same directory

### Permission Policy Example
```python
APPROVED_TOOLS = {"Read", "Glob", "Grep"}  # Always safe
RESTRICTED_TOOLS = {"Edit", "Write"}       # Need validation
DANGEROUS_TOOLS = {"Bash"}                 # Heavy restrictions

def evaluate_permission(tool_name: str, input_data: dict) -> str:
    if tool_name in APPROVED_TOOLS:
        return "allow"

    if tool_name in RESTRICTED_TOOLS:
        file_path = input_data.get("file_path", "")
        if any(sensitive in file_path for sensitive in [".env", "credentials"]):
            return "deny"
        return "allow"

    if tool_name == "Bash":
        command = input_data.get("command", "")
        if any(dangerous in command for dangerous in ["rm -rf", "sudo", "dd"]):
            return "deny"
        return "allow"

    return "deny"  # Default deny
```

---

## Tool Detection from JSONL

### Parse Tool Events
```python
def parse_jsonl_stream(line: str) -> dict:
    """Parse JSONL line from Claude Code"""
    data = json.loads(line)

    if "message" not in data:
        return {}

    message = data["message"]
    content_items = message.get("content", [])

    for item in content_items:
        if item.get("type") == "tool_use":
            return {
                "type": "tool_use",
                "name": item.get("name"),
                "input": item.get("input", {}),
                "id": item.get("id")
            }
        elif item.get("type") == "tool_result":
            return {
                "type": "tool_result",
                "tool_use_id": item.get("tool_use_id"),
                "content": item.get("content"),
                "is_error": item.get("is_error", False)
            }
        elif item.get("type") == "text":
            return {
                "type": "text",
                "text": item.get("text")
            }

    return {}
```

### Track Tool Usage
```python
class ToolUsageTracker:
    def __init__(self):
        self.tool_counts = {}
        self.tool_errors = []

    def on_tool_use(self, tool_name: str):
        self.tool_counts[tool_name] = self.tool_counts.get(tool_name, 0) + 1

    def on_tool_error(self, tool_name: str, error: str):
        self.tool_errors.append({
            "tool": tool_name,
            "error": error,
            "timestamp": time.time()
        })

    def get_summary(self) -> dict:
        return {
            "total_tools": sum(self.tool_counts.values()),
            "unique_tools": len(self.tool_counts),
            "tools": self.tool_counts,
            "errors": len(self.tool_errors)
        }
```

---

## Protocol Messages Reference

### User Message (stdin → Claude)
```json
{
  "message": {
    "role": "user",
    "content": [
      {"type": "text", "text": "Your prompt here"}
    ]
  }
}
```

### Control Request (Claude → stdout)
```json
{
  "controlRequest": {
    "id": "req-123",
    "type": "CanUseTool",
    "tool_name": "Edit",
    "input": {
      "file_path": "/path/to/file.py",
      "old_string": "...",
      "new_string": "..."
    },
    "tool_use_id": "toolu_xyz"
  }
}
```

### Control Response (stdin → Claude)
```json
{
  "controlResponse": {
    "id": "req-123",
    "result": "allow"
  }
}
```

Or deny:
```json
{
  "controlResponse": {
    "id": "req-123",
    "result": "deny",
    "message": "Cannot edit this file"
  }
}
```

### SDK Control Request (stdin → Claude)
```json
{
  "sdkControlRequest": {
    "type": "SetPermissionMode",
    "mode": "bypassPermissions"
  }
}
```

Permission modes:
- `"default"` - Ask for permissions
- `"acceptEdits"` - Auto-accept Edit/Write
- `"plan"` - Plan mode
- `"bypassPermissions"` - Accept all

### Initialize with Hooks
```json
{
  "sdkControlRequest": {
    "type": "Initialize",
    "hooks": {
      "PreToolUse": {
        "matcher": "tool_approval",
        "description": "Intercept all tool uses"
      }
    }
  }
}
```

### Interrupt
```json
{
  "sdkControlRequest": {
    "type": "Interrupt"
  }
}
```

---

## Common Use Cases

### 1. Automated PR Creation
```python
async def create_pr_with_claude(issue_title: str, issue_body: str, repo_path: str):
    # Create worktree
    task_id = f"task-{uuid.uuid4().hex[:8]}"
    branch = f"feature/{task_id}"
    worktree = create_worktree(repo_path, task_id, branch)

    # Run Claude
    await run_claude(
        prompt=f"Implement: {issue_title}\n\n{issue_body}",
        cwd=str(worktree)
    )

    # Push and create PR
    subprocess.run(["git", "push", "-u", "origin", branch], cwd=worktree, check=True)
    subprocess.run(
        ["gh", "pr", "create", "--title", issue_title, "--body", issue_body],
        cwd=worktree, check=True
    )
```

### 2. Linear/Notion Integration
```python
async def watch_linear_issues():
    """Watch Linear for new issues and auto-implement"""
    while True:
        issues = await linear_client.get_issues(state="Todo")

        for issue in issues:
            # Update to "In Progress"
            await linear_client.update_issue(issue.id, state="In Progress")

            # Run Claude
            await run_claude_with_monitoring(
                task_id=issue.id,
                prompt=f"{issue.title}\n\n{issue.description}",
                on_complete=lambda: handle_complete(issue)
            )

        await asyncio.sleep(30)  # Poll every 30s

async def handle_complete(issue):
    # Create PR
    pr_url = await create_pr(issue.title, issue.description)

    # Update Linear
    await linear_client.update_issue(issue.id, state="In Review")
    await linear_client.post_comment(issue.id, f"PR created: {pr_url}")
```

### 3. Multi-Agent Pipeline
```python
async def run_multi_agent_pipeline(feature: str):
    # 1. Planner
    plan = await run_claude("Create implementation plan for: " + feature)

    # 2. Parallel coders
    subtasks = parse_plan(plan)
    coder_results = await asyncio.gather(*[
        run_claude(f"Implement: {subtask}") for subtask in subtasks
    ])

    # 3. QA Reviewer
    qa_result = await run_claude("Review implementation and test")

    # 4. Fixer (if needed)
    if "ISSUES_FOUND" in qa_result:
        await run_claude(f"Fix issues: {qa_result}")

    return {"status": "complete"}
```

---

## Debugging Tips

### Enable Verbose Logging
```bash
export DEBUG=claude:*
claude --print --verbose ...
```

### Capture stderr
```python
process = await asyncio.create_subprocess_exec(
    ...,
    stderr=asyncio.subprocess.PIPE
)

async def log_stderr():
    async for line in process.stderr:
        print(f"[stderr] {line.decode()}")

asyncio.create_task(log_stderr())
```

### Session Resumption
```bash
# Get session ID from first run
claude --print --output-format stream-json ...
# Session: claudear-abc123

# Resume later
claude --resume claudear-abc123 --print
```

### Test Protocol Locally
```bash
# Send messages manually to test protocol
echo '{"message":{"role":"user","content":[{"type":"text","text":"Hello"}]}}' | \
  claude --print --permission-prompt-tool stdio
```

---

## Performance Tips

### 1. Limit Output
```python
# Add line limits to Read tool
"Read": {
    "file_path": "/path/to/file",
    "limit": 1000  # Only first 1000 lines
}
```

### 2. Use Glob Instead of Grep
```python
# Faster for file discovery
"Glob": {"pattern": "**/*.py"}

# Use Grep only for content search
"Grep": {"pattern": "def authenticate", "path": "src/"}
```

### 3. Set Timeouts
```python
# Add timeout to bash commands
"Bash": {
    "command": "pytest",
    "timeout": 300000  # 5 minutes
}
```

### 4. Parallel Execution
```python
# Use worktrees + semaphore for parallel tasks
tasks = [run_in_worktree(task_id, prompt) for task_id in task_ids]
results = await asyncio.gather(*tasks)
```

---

## Resources

### Official Documentation
- Claude Code CLI: https://github.com/anthropics/claude-code
- Agent SDK: https://github.com/anthropics/agent-sdk

### Example Applications
- **Vibe Kanban**: `/Users/davidcruwys/dev/tools/vibe-kanban`
  - Protocol-based control
  - Rust + TypeScript
  - Production-grade

- **AutoClaude**: `/Users/davidcruwys/dev/tools/AutoClaude`
  - Agent SDK integration
  - Multi-agent pipeline
  - Python + TypeScript

- **Claudear**: `/Users/davidcruwys/dev/tools/claudear`
  - Direct CLI
  - Linear/Notion integration
  - Python

### Related Documentation
- `remote-control-analysis.md` - Detailed comparison
- `claude-code-remote-control-guide.md` - Full implementation guide

---

## Quick Decision Tree

```
Need remote control of Claude Code?
│
├─ Quick prototype/script?
│  └─ Use Direct CLI with --dangerously-skip-permissions
│
├─ Multi-agent workflows?
│  └─ Use Agent SDK with pipeline pattern
│
├─ Maximum security/control?
│  └─ Use Protocol mode with stdio control
│
└─ PM integration (Linear/Notion)?
   └─ Use Direct CLI + JSONL streaming + webhooks
```

---

Last updated: 2026-01-12
