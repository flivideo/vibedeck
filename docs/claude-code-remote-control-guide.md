# Claude Code Remote Control Implementation Guide

## Overview

This guide demonstrates how to implement autonomous control of Claude Code based on patterns from three production applications: **Vibe Kanban**, **AutoClaude**, and **Claudear**.

You'll learn:
1. How to spawn and control Claude Code processes
2. Communication protocols (stdin/stdout, Agent SDK, CLI)
3. Permission handling and security
4. Real-time monitoring and blocking detection
5. Multi-agent orchestration patterns

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Approach 1: Direct CLI with JSONL Streaming](#approach-1-direct-cli-with-jsonl-streaming)
3. [Approach 2: Agent SDK Integration](#approach-2-agent-sdk-integration)
4. [Approach 3: Bidirectional Protocol](#approach-3-bidirectional-protocol)
5. [Authentication Patterns](#authentication-patterns)
6. [Concurrency & Task Isolation](#concurrency--task-isolation)
7. [Real-Time Monitoring](#real-time-monitoring)
8. [Blocking & Human-in-Loop](#blocking--human-in-loop)
9. [Multi-Agent Patterns](#multi-agent-patterns)
10. [Security Best Practices](#security-best-practices)

---

## Quick Start

### Prerequisites

```bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version

# Set OAuth token
export CLAUDE_CODE_OAUTH_TOKEN="sk-ant-oat01-..."
```

### Simplest Example

```python
import asyncio
import subprocess

async def run_claude_simple(prompt: str, cwd: str):
    """Simplest possible Claude Code automation"""
    process = await asyncio.create_subprocess_exec(
        "claude",
        "--print",                          # Non-interactive mode
        "--output-format", "stream-json",   # JSONL output
        "--dangerously-skip-permissions",   # Auto-accept (use carefully!)
        stdin=asyncio.subprocess.PIPE,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
        cwd=cwd
    )

    # Send prompt
    process.stdin.write(prompt.encode() + b'\n')
    await process.stdin.drain()
    process.stdin.close()

    # Read output
    output = []
    async for line in process.stdout:
        output.append(line.decode())

    await process.wait()
    return ''.join(output)

# Usage
result = asyncio.run(run_claude_simple(
    "Fix the bug in authentication.py",
    "/path/to/project"
))
```

**When to use:**
- ✅ Quick scripts and prototypes
- ✅ Single-task automation
- ✅ Trusted environments
- ❌ Production systems (no permission control)
- ❌ Multi-user environments

---

## Approach 1: Direct CLI with JSONL Streaming

**Based on:** Claudear
**Complexity:** Low
**Control Level:** Basic

### 1.1 Process Spawning with Streaming

```python
import asyncio
import json
from typing import Optional, Callable
from dataclasses import dataclass

@dataclass
class ClaudeMessage:
    type: str  # "text", "tool_use", "tool_result"
    content: str
    tool_name: Optional[str] = None

class ClaudeRunner:
    def __init__(self, cwd: str):
        self.cwd = cwd
        self.process: Optional[asyncio.subprocess.Process] = None

    async def run(
        self,
        prompt: str,
        on_message: Optional[Callable[[ClaudeMessage], None]] = None,
        on_blocked: Optional[Callable[[str], None]] = None,
        on_complete: Optional[Callable[[], None]] = None
    ):
        """Run Claude with real-time message streaming"""

        # Spawn process
        self.process = await asyncio.create_subprocess_exec(
            "claude",
            "--print",
            "--verbose",                        # Required for stream-json
            "--output-format", "stream-json",
            "--dangerously-skip-permissions",
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=self.cwd
        )

        # Send prompt
        self.process.stdin.write(prompt.encode() + b'\n')
        await self.process.stdin.drain()
        self.process.stdin.close()

        # Stream JSONL output
        async for line in self.process.stdout:
            try:
                data = json.loads(line.decode())
                message = self._parse_message(data)

                # Callback for every message
                if on_message:
                    on_message(message)

                # Detect blocking
                if self._is_blocked(message.content):
                    reason = self._extract_blocking_reason(message.content)
                    if on_blocked:
                        on_blocked(reason)

                # Detect completion
                if self._is_complete(message.content):
                    if on_complete:
                        on_complete()
                    break

            except json.JSONDecodeError:
                continue  # Skip non-JSON lines

        await self.process.wait()

    def _parse_message(self, data: dict) -> ClaudeMessage:
        """Parse JSONL message from Claude Code"""
        if "message" in data and "content" in data["message"]:
            content_items = data["message"]["content"]

            for item in content_items:
                if item.get("type") == "text":
                    return ClaudeMessage(
                        type="text",
                        content=item.get("text", "")
                    )
                elif item.get("type") == "tool_use":
                    return ClaudeMessage(
                        type="tool_use",
                        content=str(item.get("input", {})),
                        tool_name=item.get("name")
                    )

        return ClaudeMessage(type="unknown", content=str(data))

    def _is_blocked(self, text: str) -> bool:
        """Detect if Claude is blocked"""
        blocked_patterns = [
            "BLOCKED:",
            "I need clarification",
            "I cannot proceed without",
            "Could you please clarify",
            "I'm not sure about",
        ]
        return any(pattern.lower() in text.lower() for pattern in blocked_patterns)

    def _extract_blocking_reason(self, text: str) -> str:
        """Extract the reason Claude is blocked"""
        # Simple extraction - look for sentence containing blocked pattern
        sentences = text.split('.')
        for sentence in sentences:
            if any(pattern.lower() in sentence.lower()
                   for pattern in ["BLOCKED", "clarification", "cannot proceed"]):
                return sentence.strip()
        return "Unknown blocking reason"

    def _is_complete(self, text: str) -> bool:
        """Detect if task is complete"""
        completion_patterns = [
            "TASK_COMPLETE",
            "successfully completed",
            "task is done",
            "finished implementing",
        ]
        return any(pattern.lower() in text.lower() for pattern in completion_patterns)

# Usage example
async def main():
    runner = ClaudeRunner(cwd="/path/to/project")

    def handle_message(msg: ClaudeMessage):
        print(f"[{msg.type}] {msg.content[:100]}...")
        if msg.tool_name:
            print(f"  Tool: {msg.tool_name}")

    def handle_blocked(reason: str):
        print(f"⚠️  BLOCKED: {reason}")
        # Could post to Linear, send notification, etc.

    def handle_complete():
        print("✅ Task complete!")

    await runner.run(
        prompt="Implement user authentication with JWT tokens",
        on_message=handle_message,
        on_blocked=handle_blocked,
        on_complete=handle_complete
    )

asyncio.run(main())
```

### 1.2 Tool Activity Tracking

```python
from enum import Enum

class ToolActivity(Enum):
    READING = "🔍 Reading files"
    EDITING = "✏️ Editing code"
    TESTING = "🧪 Running tests"
    SEARCHING = "🔎 Searching codebase"
    THINKING = "🤔 Analyzing"
    UNKNOWN = "⚙️ Working"

class ActivityTracker:
    TOOL_TO_ACTIVITY = {
        "Read": ToolActivity.READING,
        "Edit": ToolActivity.EDITING,
        "Write": ToolActivity.EDITING,
        "Bash": ToolActivity.TESTING,
        "Glob": ToolActivity.SEARCHING,
        "Grep": ToolActivity.SEARCHING,
    }

    def __init__(self):
        self.current_activity: ToolActivity = ToolActivity.THINKING
        self.activity_counts = {activity: 0 for activity in ToolActivity}

    def update_from_tool(self, tool_name: str):
        """Update activity based on tool usage"""
        self.current_activity = self.TOOL_TO_ACTIVITY.get(
            tool_name,
            ToolActivity.UNKNOWN
        )
        self.activity_counts[self.current_activity] += 1

    def get_summary(self) -> str:
        """Get activity summary for progress reports"""
        return "\n".join([
            f"{activity.value}: {count} times"
            for activity, count in self.activity_counts.items()
            if count > 0
        ])

# Integrate with ClaudeRunner
async def run_with_activity_tracking(prompt: str, cwd: str):
    runner = ClaudeRunner(cwd)
    tracker = ActivityTracker()

    def handle_message(msg: ClaudeMessage):
        if msg.type == "tool_use" and msg.tool_name:
            tracker.update_from_tool(msg.tool_name)
            print(f"Current activity: {tracker.current_activity.value}")

    await runner.run(prompt, on_message=handle_message)

    print("\n📊 Activity Summary:")
    print(tracker.get_summary())
```

### 1.3 Advantages & Limitations

**Advantages:**
✅ Simple implementation (~100 lines)
✅ No external dependencies
✅ Direct CLI control
✅ Easy debugging

**Limitations:**
❌ No permission control
❌ Fragile pattern matching
❌ Manual OAuth handling
❌ No session resumption

---

## Approach 2: Agent SDK Integration

**Based on:** AutoClaude
**Complexity:** Medium
**Control Level:** High-level abstraction

### 2.1 SDK-Based Implementation

```python
from claude_agent_sdk import ClaudeSDKClient, ClaudeAgentOptions
from typing import Optional, Dict, Any
import os

class ClaudeAgentManager:
    def __init__(
        self,
        project_dir: str,
        model: str = "claude-sonnet-4-5",
        security_mode: str = "acceptEdits"
    ):
        self.project_dir = project_dir
        self.model = model
        self.security_mode = security_mode
        self.client: Optional[ClaudeSDKClient] = None

    def create_client(
        self,
        agent_type: str = "coder",
        mcp_servers: Optional[Dict[str, Any]] = None
    ):
        """Create SDK client with configuration"""

        options = ClaudeAgentOptions(
            model=self.model,
            project_dir=self.project_dir,

            # Security settings
            security_settings={
                "defaultMode": self.security_mode,
                "allowedPaths": [self.project_dir]
            },

            # MCP servers for tool integration
            mcp_servers=mcp_servers or {},

            # OAuth from environment
            oauth_token=os.getenv("CLAUDE_CODE_OAUTH_TOKEN"),
        )

        self.client = ClaudeSDKClient(options=options)
        return self.client

    async def run_session(
        self,
        prompt: str,
        session_name: str = "default-session"
    ) -> Dict[str, Any]:
        """Run an agent session"""

        if not self.client:
            self.create_client()

        # Create session
        response = await self.client.create_agent_session(
            name=session_name,
            starting_message=prompt
        )

        return {
            "session_id": response.session_id,
            "output": response.output,
            "tool_uses": response.tool_uses,
            "status": response.status
        }

# Usage
async def run_with_sdk():
    manager = ClaudeAgentManager(
        project_dir="/path/to/project",
        model="claude-sonnet-4-5",
        security_mode="acceptEdits"
    )

    # Configure MCP servers for additional tools
    mcp_servers = {
        "context7": {  # Documentation search
            "command": "npx",
            "args": ["-y", "@upstash/context7-mcp"]
        }
    }

    manager.create_client(
        agent_type="coder",
        mcp_servers=mcp_servers
    )

    result = await manager.run_session(
        prompt="Implement user authentication with JWT",
        session_name="auth-implementation"
    )

    print(f"Session: {result['session_id']}")
    print(f"Status: {result['status']}")
    print(f"Tools used: {len(result['tool_uses'])}")
```

### 2.2 Multi-Agent Pipeline

```python
from enum import Enum
from dataclasses import dataclass
from typing import List, Optional

class AgentType(Enum):
    PLANNER = "planner"
    CODER = "coder"
    QA_REVIEWER = "qa_reviewer"
    QA_FIXER = "qa_fixer"

@dataclass
class Subtask:
    id: str
    description: str
    status: str  # "pending", "in_progress", "completed", "failed"
    branch: Optional[str] = None
    pr_url: Optional[str] = None

class MultiAgentPipeline:
    def __init__(self, project_dir: str):
        self.project_dir = project_dir
        self.agents = {}

    def create_agent(self, agent_type: AgentType) -> ClaudeAgentManager:
        """Create specialized agent with specific prompt"""

        # Different MCP servers per agent type
        mcp_configs = {
            AgentType.PLANNER: {},
            AgentType.CODER: {
                "context7": {
                    "command": "npx",
                    "args": ["-y", "@upstash/context7-mcp"]
                }
            },
            AgentType.QA_REVIEWER: {
                "puppeteer": {  # For E2E testing
                    "command": "npx",
                    "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
                }
            },
            AgentType.QA_FIXER: {}
        }

        agent = ClaudeAgentManager(
            project_dir=self.project_dir,
            model="claude-sonnet-4-5"
        )

        agent.create_client(
            agent_type=agent_type.value,
            mcp_servers=mcp_configs.get(agent_type, {})
        )

        self.agents[agent_type] = agent
        return agent

    async def run_pipeline(self, feature_description: str) -> List[Subtask]:
        """Execute full pipeline: Plan → Code → QA → Fix"""

        # 1. Planning phase
        planner = self.create_agent(AgentType.PLANNER)
        plan_result = await planner.run_session(
            prompt=f"""Create an implementation plan for: {feature_description}

Break this down into 3-5 subtasks. For each subtask:
- Clear description
- Acceptance criteria
- Files to modify

Output format:
SUBTASK 1: [description]
SUBTASK 2: [description]
...""",
            session_name="planning"
        )

        # Parse subtasks from output
        subtasks = self._parse_subtasks(plan_result["output"])

        # 2. Implementation phase (parallel)
        coder = self.create_agent(AgentType.CODER)

        for subtask in subtasks:
            subtask.status = "in_progress"

            result = await coder.run_session(
                prompt=f"""Implement: {subtask.description}

Context: {feature_description}

Make sure to:
- Write clean, tested code
- Follow project conventions
- Add appropriate error handling

When done, output: SUBTASK_COMPLETE""",
                session_name=f"subtask-{subtask.id}"
            )

            if "SUBTASK_COMPLETE" in result["output"]:
                subtask.status = "completed"
            else:
                subtask.status = "failed"

        # 3. QA Review phase
        qa_reviewer = self.create_agent(AgentType.QA_REVIEWER)

        qa_result = await qa_reviewer.run_session(
            prompt=f"""Review the implementation of: {feature_description}

Verify:
- All subtasks completed
- Acceptance criteria met
- No regressions
- Tests pass

Output issues found or QA_PASSED if all good.""",
            session_name="qa-review"
        )

        # 4. Fix phase (if needed)
        if "QA_PASSED" not in qa_result["output"]:
            qa_fixer = self.create_agent(AgentType.QA_FIXER)

            await qa_fixer.run_session(
                prompt=f"""Fix QA issues: {qa_result['output']}

Original feature: {feature_description}""",
                session_name="qa-fix"
            )

        return subtasks

    def _parse_subtasks(self, plan_output: str) -> List[Subtask]:
        """Parse subtasks from planner output"""
        subtasks = []
        lines = plan_output.split('\n')

        for i, line in enumerate(lines):
            if line.startswith("SUBTASK"):
                description = line.split(':', 1)[1].strip()
                subtasks.append(Subtask(
                    id=f"subtask-{i}",
                    description=description,
                    status="pending"
                ))

        return subtasks

# Usage
async def run_pipeline():
    pipeline = MultiAgentPipeline("/path/to/project")

    subtasks = await pipeline.run_pipeline(
        "Add user authentication with JWT tokens and refresh tokens"
    )

    print(f"Completed {len(subtasks)} subtasks:")
    for task in subtasks:
        print(f"  [{task.status}] {task.description}")
```

### 2.3 Authentication & Credential Management

```python
import os
import subprocess
import json
from typing import Optional

class AuthManager:
    """Handle OAuth token resolution (multi-source)"""

    @staticmethod
    def get_oauth_token() -> Optional[str]:
        """Get OAuth token from multiple sources in priority order"""

        # Priority 1: Environment variable
        token = os.getenv("CLAUDE_CODE_OAUTH_TOKEN")
        if token and token.startswith("sk-ant-oat01-"):
            return token

        # Priority 2: System credential store (macOS)
        token = AuthManager._get_from_keychain_macos()
        if token:
            return token

        # Priority 3: Windows credential manager
        token = AuthManager._get_from_windows_credential_manager()
        if token:
            return token

        raise ValueError(
            "No OAuth token found. Set CLAUDE_CODE_OAUTH_TOKEN or "
            "run 'claude login' to authenticate."
        )

    @staticmethod
    def _get_from_keychain_macos() -> Optional[str]:
        """Read OAuth token from macOS Keychain"""
        try:
            result = subprocess.run(
                [
                    "/usr/bin/security",
                    "find-generic-password",
                    "-s", "claude-code",
                    "-w"  # Output password only
                ],
                capture_output=True,
                text=True,
                check=False
            )

            if result.returncode == 0:
                return result.stdout.strip()
        except Exception:
            pass

        return None

    @staticmethod
    def _get_from_windows_credential_manager() -> Optional[str]:
        """Read OAuth token from Windows Credential Manager"""
        credentials_path = os.path.expanduser(
            "~/.claude/.credentials.json"
        )

        if not os.path.exists(credentials_path):
            return None

        try:
            with open(credentials_path, 'r') as f:
                data = json.load(f)
                return data.get("oauth_token")
        except Exception:
            return None

# Usage
token = AuthManager.get_oauth_token()
os.environ["CLAUDE_CODE_OAUTH_TOKEN"] = token
```

### 2.4 Advantages & Limitations

**Advantages:**
✅ High-level API (SDK handles complexity)
✅ Built-in OAuth management
✅ Security profiles abstraction
✅ MCP server integration
✅ Multi-agent support

**Limitations:**
❌ SDK dependency
❌ Less low-level control
❌ Black box for protocol
❌ Release cycle dependency

---

## Approach 3: Bidirectional Protocol

**Based on:** Vibe Kanban
**Complexity:** High
**Control Level:** Maximum

### 3.1 Protocol Peer Implementation

```python
import asyncio
import json
from typing import Optional, Callable, Dict, Any
from dataclasses import dataclass
from enum import Enum

class PermissionMode(Enum):
    DEFAULT = "default"
    ACCEPT_EDITS = "acceptEdits"
    PLAN = "plan"
    BYPASS_PERMISSIONS = "bypassPermissions"

@dataclass
class ControlRequest:
    """Request from Claude Code to our system"""
    id: str
    type: str  # "CanUseTool", "HookCallback"
    tool_name: Optional[str] = None
    input: Optional[Dict[str, Any]] = None
    tool_use_id: Optional[str] = None

@dataclass
class ControlResponse:
    """Response to Claude Code"""
    id: str
    result: str  # "allow", "deny"
    message: Optional[str] = None
    updated_input: Optional[Dict[str, Any]] = None

class ProtocolPeer:
    """Bidirectional control protocol with Claude Code"""

    def __init__(
        self,
        on_tool_request: Callable[[ControlRequest], ControlResponse]
    ):
        self.on_tool_request = on_tool_request
        self.process: Optional[asyncio.subprocess.Process] = None
        self.permission_mode = PermissionMode.DEFAULT

    async def spawn(
        self,
        cwd: str,
        prompt: str,
        hooks: Optional[Dict[str, Any]] = None
    ):
        """Spawn Claude Code with stdio control"""

        # Spawn with permission prompt tool = stdio
        self.process = await asyncio.create_subprocess_exec(
            "claude",
            "--print",
            "--verbose",
            "--output-format", "stream-json",
            "--permission-prompt-tool", "stdio",  # KEY: Enable protocol
            stdin=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=cwd
        )

        # Initialize with hooks
        if hooks:
            await self.send_control_request({
                "type": "Initialize",
                "hooks": hooks
            })

        # Set permission mode
        await self.set_permission_mode(self.permission_mode)

        # Send prompt
        await self.send_user_message(prompt)

        # Start reader loop
        asyncio.create_task(self._reader_loop())

    async def _reader_loop(self):
        """Read and handle control requests from Claude"""

        async for line in self.process.stdout:
            try:
                data = json.loads(line.decode())

                # Check if this is a control request
                if "controlRequest" in data:
                    request = self._parse_control_request(data["controlRequest"])
                    response = self.on_tool_request(request)
                    await self._send_control_response(response)

                # Regular message
                elif "message" in data:
                    # Handle regular output
                    pass

            except json.JSONDecodeError:
                continue

    def _parse_control_request(self, data: dict) -> ControlRequest:
        """Parse control request from Claude"""
        return ControlRequest(
            id=data.get("id", ""),
            type=data.get("type", ""),
            tool_name=data.get("tool_name"),
            input=data.get("input"),
            tool_use_id=data.get("tool_use_id")
        )

    async def _send_control_response(self, response: ControlResponse):
        """Send control response to Claude"""
        data = {
            "controlResponse": {
                "id": response.id,
                "result": response.result
            }
        }

        if response.message:
            data["controlResponse"]["message"] = response.message

        if response.updated_input:
            data["controlResponse"]["updatedInput"] = response.updated_input

        await self.send_json(data)

    async def send_json(self, data: dict):
        """Send JSON to Claude stdin"""
        json_str = json.dumps(data) + '\n'
        self.process.stdin.write(json_str.encode())
        await self.process.stdin.drain()

    async def send_user_message(self, content: str):
        """Send user message to Claude"""
        await self.send_json({
            "message": {
                "role": "user",
                "content": [{"type": "text", "text": content}]
            }
        })

    async def send_control_request(self, request: dict):
        """Send SDK control request to Claude"""
        await self.send_json({"sdkControlRequest": request})

    async def set_permission_mode(self, mode: PermissionMode):
        """Change permission mode at runtime"""
        self.permission_mode = mode
        await self.send_control_request({
            "type": "SetPermissionMode",
            "mode": mode.value
        })

    async def interrupt(self):
        """Gracefully interrupt Claude"""
        await self.send_control_request({"type": "Interrupt"})

# Usage with approval service
class ApprovalService:
    """Decide whether to allow tool usage"""

    def __init__(self, auto_approve: bool = False):
        self.auto_approve = auto_approve
        self.approved_tools = {"Read", "Glob", "Grep"}  # Safe tools
        self.dangerous_tools = {"Bash", "Write", "Edit"}  # Need approval

    def handle_tool_request(self, request: ControlRequest) -> ControlResponse:
        """Decide whether to allow tool usage"""

        # Auto-approve mode
        if self.auto_approve:
            return ControlResponse(
                id=request.id,
                result="allow"
            )

        # Safe tools always allowed
        if request.tool_name in self.approved_tools:
            return ControlResponse(
                id=request.id,
                result="allow"
            )

        # Dangerous tools - could inspect input and decide
        if request.tool_name in self.dangerous_tools:
            # Example: Block writes to sensitive files
            if request.tool_name == "Write":
                file_path = request.input.get("file_path", "")
                if ".env" in file_path or "credentials" in file_path:
                    return ControlResponse(
                        id=request.id,
                        result="deny",
                        message="Cannot write to sensitive files"
                    )

            # Example: Block dangerous bash commands
            if request.tool_name == "Bash":
                command = request.input.get("command", "")
                dangerous = ["rm -rf", "sudo", "dd if="]
                if any(cmd in command for cmd in dangerous):
                    return ControlResponse(
                        id=request.id,
                        result="deny",
                        message="Dangerous bash command blocked"
                    )

            # Allow if checks pass
            return ControlResponse(
                id=request.id,
                result="allow"
            )

        # Unknown tool - deny by default
        return ControlResponse(
            id=request.id,
            result="deny",
            message=f"Unknown tool: {request.tool_name}"
        )

async def run_with_protocol():
    approval_service = ApprovalService(auto_approve=False)

    peer = ProtocolPeer(
        on_tool_request=approval_service.handle_tool_request
    )

    # Configure hooks for pre-tool-use interception
    hooks = {
        "PreToolUse": {
            "matcher": "tool_approval",
            "description": "Intercept all tool uses for approval"
        }
    }

    await peer.spawn(
        cwd="/path/to/project",
        prompt="Implement user authentication",
        hooks=hooks
    )

    # Can change permission mode at runtime
    await asyncio.sleep(30)  # Let it work in default mode
    await peer.set_permission_mode(PermissionMode.BYPASS_PERMISSIONS)
```

### 3.2 Advanced Permission Control

```python
from typing import List, Dict, Any
import re

class AdvancedPermissionPolicy:
    """Sophisticated permission policy with input modification"""

    def __init__(self):
        self.allowed_patterns = {
            "Read": [r".*\.py$", r".*\.js$", r".*\.md$"],
            "Edit": [r"src/.*\.py$", r"tests/.*\.py$"],
            "Bash": [r"^pytest", r"^npm test", r"^git status"]
        }
        self.denied_patterns = {
            "Read": [r".*\.env$", r".*credentials.*"],
            "Write": [r".*\.env$", r".*config\.yaml$"],
            "Bash": [r".*rm -rf.*", r".*sudo.*"]
        }

    def evaluate(self, request: ControlRequest) -> ControlResponse:
        """Evaluate with pattern matching and input modification"""

        tool_name = request.tool_name

        # Check denied patterns first
        if self._matches_denied(tool_name, request.input):
            return ControlResponse(
                id=request.id,
                result="deny",
                message=f"Denied by policy: {tool_name}"
            )

        # Check allowed patterns
        if self._matches_allowed(tool_name, request.input):
            # Optionally modify input before allowing
            modified_input = self._modify_input(tool_name, request.input)

            return ControlResponse(
                id=request.id,
                result="allow",
                updated_input=modified_input if modified_input else None
            )

        # Default deny
        return ControlResponse(
            id=request.id,
            result="deny",
            message=f"No policy match for {tool_name}"
        )

    def _matches_denied(self, tool_name: str, input_data: Dict[str, Any]) -> bool:
        """Check if matches denied patterns"""
        if tool_name not in self.denied_patterns:
            return False

        # Get the relevant input field
        check_value = self._get_check_value(tool_name, input_data)
        if not check_value:
            return False

        patterns = self.denied_patterns[tool_name]
        return any(re.match(pattern, check_value) for pattern in patterns)

    def _matches_allowed(self, tool_name: str, input_data: Dict[str, Any]) -> bool:
        """Check if matches allowed patterns"""
        if tool_name not in self.allowed_patterns:
            return False

        check_value = self._get_check_value(tool_name, input_data)
        if not check_value:
            return False

        patterns = self.allowed_patterns[tool_name]
        return any(re.match(pattern, check_value) for pattern in patterns)

    def _get_check_value(self, tool_name: str, input_data: Dict[str, Any]) -> str:
        """Extract the value to check from input"""
        if tool_name in ["Read", "Write", "Edit"]:
            return input_data.get("file_path", "")
        elif tool_name == "Bash":
            return input_data.get("command", "")
        return ""

    def _modify_input(
        self,
        tool_name: str,
        input_data: Dict[str, Any]
    ) -> Optional[Dict[str, Any]]:
        """Modify tool input before execution"""

        # Example: Add timeout to bash commands
        if tool_name == "Bash":
            modified = input_data.copy()
            # Add 5 minute timeout if not specified
            if "timeout" not in modified:
                modified["timeout"] = 300000  # 5 minutes in ms
            return modified

        # Example: Limit file read size
        if tool_name == "Read":
            modified = input_data.copy()
            # Add line limit if not specified
            if "limit" not in modified:
                modified["limit"] = 1000  # Max 1000 lines
            return modified

        return None

# Usage
async def run_with_advanced_policy():
    policy = AdvancedPermissionPolicy()

    peer = ProtocolPeer(on_tool_request=policy.evaluate)

    await peer.spawn(
        cwd="/path/to/project",
        prompt="Analyze the codebase and suggest improvements"
    )
```

### 3.3 Advantages & Limitations

**Advantages:**
✅ Maximum control over execution
✅ Fine-grained security policies
✅ Input modification capabilities
✅ Graceful interrupt mechanism
✅ Runtime permission mode switching

**Limitations:**
❌ High implementation complexity
❌ Protocol maintenance required
❌ More code to maintain
❌ Requires deep understanding

---

## Authentication Patterns

### Pattern 1: Multi-Source Resolution

```python
def resolve_auth() -> str:
    """Resolve authentication from multiple sources"""

    # 1. Environment variable (highest priority)
    token = os.getenv("CLAUDE_CODE_OAUTH_TOKEN")
    if token:
        return token

    # 2. Config file
    config_path = os.path.expanduser("~/.claude/config.json")
    if os.path.exists(config_path):
        with open(config_path) as f:
            config = json.load(f)
            if "oauth_token" in config:
                return config["oauth_token"]

    # 3. System credential store (platform-specific)
    token = get_from_credential_store()
    if token:
        return token

    raise ValueError("No authentication found. Run 'claude login' first.")
```

### Pattern 2: Token Refresh

```python
import time
from typing import Optional

class TokenManager:
    def __init__(self, oauth_token: str, refresh_token: Optional[str] = None):
        self.oauth_token = oauth_token
        self.refresh_token = refresh_token
        self.expires_at: Optional[float] = None

    async def get_valid_token(self) -> str:
        """Get valid token, refreshing if needed"""

        # Check if token is still valid
        if self.expires_at and time.time() < self.expires_at:
            return self.oauth_token

        # Refresh if we have refresh token
        if self.refresh_token:
            await self._refresh()
            return self.oauth_token

        # Otherwise use existing token (might be expired)
        return self.oauth_token

    async def _refresh(self):
        """Refresh the OAuth token"""
        # Implementation depends on Anthropic's OAuth flow
        # This is a simplified example
        async with aiohttp.ClientSession() as session:
            async with session.post(
                "https://api.anthropic.com/oauth/token",
                json={
                    "grant_type": "refresh_token",
                    "refresh_token": self.refresh_token
                }
            ) as resp:
                data = await resp.json()
                self.oauth_token = data["access_token"]
                self.refresh_token = data.get("refresh_token", self.refresh_token)
                self.expires_at = time.time() + data.get("expires_in", 3600)
```

---

## Concurrency & Task Isolation

### Git Worktree Pattern

```python
import subprocess
from pathlib import Path
from typing import Optional

class WorktreeManager:
    """Manage isolated git worktrees for parallel tasks"""

    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.worktrees_dir = self.repo_path / ".worktrees"
        self.worktrees_dir.mkdir(exist_ok=True)

    def create_worktree(self, task_id: str, branch_name: str) -> Path:
        """Create isolated worktree for task"""

        worktree_path = self.worktrees_dir / task_id

        # Create branch if doesn't exist
        subprocess.run(
            ["git", "checkout", "-b", branch_name],
            cwd=self.repo_path,
            check=False  # Ignore if branch exists
        )

        # Create worktree
        subprocess.run(
            ["git", "worktree", "add", str(worktree_path), branch_name],
            cwd=self.repo_path,
            check=True
        )

        return worktree_path

    def cleanup_worktree(self, task_id: str):
        """Remove worktree after task completion"""

        worktree_path = self.worktrees_dir / task_id

        # Remove worktree
        subprocess.run(
            ["git", "worktree", "remove", str(worktree_path)],
            cwd=self.repo_path,
            check=True
        )

# Usage
async def run_with_worktree(task_id: str, prompt: str, repo_path: str):
    manager = WorktreeManager(repo_path)

    # Create isolated environment
    branch_name = f"feature/{task_id}"
    worktree_path = manager.create_worktree(task_id, branch_name)

    try:
        # Run Claude in worktree
        runner = ClaudeRunner(cwd=str(worktree_path))
        await runner.run(prompt)

        # Push branch
        subprocess.run(
            ["git", "push", "-u", "origin", branch_name],
            cwd=worktree_path,
            check=True
        )

    finally:
        # Cleanup
        manager.cleanup_worktree(task_id)
```

### Concurrency Control

```python
class ConcurrencyController:
    """Control maximum concurrent Claude sessions"""

    def __init__(self, max_concurrent: int = 5):
        self.semaphore = asyncio.Semaphore(max_concurrent)
        self.active_tasks: Dict[str, ClaudeRunner] = {}

    async def run_task(
        self,
        task_id: str,
        prompt: str,
        cwd: str
    ) -> Any:
        """Run task with concurrency control"""

        async with self.semaphore:
            runner = ClaudeRunner(cwd)
            self.active_tasks[task_id] = runner

            try:
                result = await runner.run(prompt)
                return result
            finally:
                del self.active_tasks[task_id]

    def get_active_count(self) -> int:
        """Get number of active tasks"""
        return len(self.active_tasks)

    async def cancel_task(self, task_id: str):
        """Cancel a running task"""
        if task_id in self.active_tasks:
            runner = self.active_tasks[task_id]
            if runner.process:
                runner.process.terminate()
                await runner.process.wait()

# Usage
controller = ConcurrencyController(max_concurrent=5)

# Can run up to 5 tasks concurrently
tasks = [
    controller.run_task("task-1", "Implement auth", "/project"),
    controller.run_task("task-2", "Add tests", "/project"),
    controller.run_task("task-3", "Update docs", "/project"),
]

results = await asyncio.gather(*tasks)
```

---

## Real-Time Monitoring

### WebSocket Streaming

```python
from fastapi import FastAPI, WebSocket
from fastapi.websockets import WebSocketDisconnect
import json

app = FastAPI()

class ClaudeMonitor:
    """Real-time monitoring via WebSocket"""

    def __init__(self):
        self.connections: Dict[str, WebSocket] = {}

    async def connect(self, task_id: str, websocket: WebSocket):
        """Register WebSocket connection"""
        await websocket.accept()
        self.connections[task_id] = websocket

    async def disconnect(self, task_id: str):
        """Unregister WebSocket connection"""
        if task_id in self.connections:
            del self.connections[task_id]

    async def broadcast(self, task_id: str, event: dict):
        """Send event to connected client"""
        if task_id in self.connections:
            websocket = self.connections[task_id]
            await websocket.send_json(event)

monitor = ClaudeMonitor()

@app.websocket("/ws/tasks/{task_id}")
async def websocket_endpoint(websocket: WebSocket, task_id: str):
    await monitor.connect(task_id, websocket)

    try:
        while True:
            # Keep connection alive
            await websocket.receive_text()
    except WebSocketDisconnect:
        await monitor.disconnect(task_id)

# When running Claude, broadcast events
async def run_with_monitoring(task_id: str, prompt: str, cwd: str):
    runner = ClaudeRunner(cwd)

    def handle_message(msg: ClaudeMessage):
        asyncio.create_task(monitor.broadcast(task_id, {
            "type": "message",
            "content": msg.content,
            "tool": msg.tool_name
        }))

    def handle_blocked(reason: str):
        asyncio.create_task(monitor.broadcast(task_id, {
            "type": "blocked",
            "reason": reason
        }))

    await runner.run(
        prompt,
        on_message=handle_message,
        on_blocked=handle_blocked
    )
```

---

## Security Best Practices

### 1. Input Validation

```python
def validate_prompt(prompt: str) -> bool:
    """Validate prompt before sending to Claude"""

    # Check for command injection attempts
    dangerous_patterns = [
        r"```bash\s+rm\s+-rf",
        r"sudo\s+",
        r"eval\s*\(",
    ]

    for pattern in dangerous_patterns:
        if re.search(pattern, prompt, re.IGNORECASE):
            raise ValueError(f"Dangerous pattern detected: {pattern}")

    return True
```

### 2. Filesystem Sandboxing

```python
def validate_path(path: str, allowed_roots: List[str]) -> bool:
    """Ensure path is within allowed directories"""

    resolved = Path(path).resolve()

    for root in allowed_roots:
        root_path = Path(root).resolve()
        try:
            resolved.relative_to(root_path)
            return True
        except ValueError:
            continue

    raise ValueError(f"Path {path} is outside allowed directories")
```

### 3. Command Allowlisting

```python
SAFE_COMMANDS = {
    "git": ["status", "diff", "log", "show", "branch"],
    "npm": ["test", "run", "install", "ci"],
    "pytest": ["--maxfail=1", "-v", "-x"],
}

def validate_bash_command(command: str) -> bool:
    """Validate bash command against allowlist"""

    parts = command.split()
    program = parts[0]

    if program not in SAFE_COMMANDS:
        raise ValueError(f"Command not allowed: {program}")

    # Check subcommand/flags
    allowed_args = SAFE_COMMANDS[program]
    if len(parts) > 1 and not any(arg in parts[1] for arg in allowed_args):
        raise ValueError(f"Subcommand not allowed: {parts[1]}")

    return True
```

---

## Complete Example: Production System

Here's a complete example combining the best patterns:

```python
import asyncio
from typing import Dict, Optional
from pathlib import Path

class ProductionClaudeOrchestrator:
    """Production-grade Claude Code orchestration"""

    def __init__(
        self,
        repo_path: str,
        max_concurrent: int = 5,
        enable_monitoring: bool = True
    ):
        self.repo_path = Path(repo_path)
        self.worktree_manager = WorktreeManager(str(self.repo_path))
        self.concurrency_controller = ConcurrencyController(max_concurrent)
        self.monitor = ClaudeMonitor() if enable_monitoring else None
        self.approval_service = ApprovalService(auto_approve=False)

    async def run_task(
        self,
        task_id: str,
        title: str,
        description: str
    ) -> Dict[str, Any]:
        """Run a complete task with all safety measures"""

        # 1. Create isolated worktree
        branch_name = f"feature/{task_id}"
        worktree_path = self.worktree_manager.create_worktree(
            task_id,
            branch_name
        )

        # 2. Setup protocol peer with approval service
        peer = ProtocolPeer(
            on_tool_request=self.approval_service.handle_tool_request
        )

        # 3. Configure monitoring
        events = []

        def log_event(event: dict):
            events.append(event)
            if self.monitor:
                asyncio.create_task(
                    self.monitor.broadcast(task_id, event)
                )

        # 4. Run with concurrency control
        try:
            result = await self.concurrency_controller.run_task(
                task_id,
                prompt=f"""Task: {title}

Description:
{description}

Instructions:
- Implement the feature following project conventions
- Write tests for all new code
- Ensure all tests pass
- Output TASK_COMPLETE when finished
""",
                cwd=str(worktree_path)
            )

            # 5. Create PR if successful
            if result.get("status") == "completed":
                pr_url = await self._create_pr(
                    branch_name,
                    title,
                    description
                )

                return {
                    "status": "completed",
                    "branch": branch_name,
                    "pr_url": pr_url,
                    "events": events
                }
            else:
                return {
                    "status": "failed",
                    "error": result.get("error"),
                    "events": events
                }

        finally:
            # 6. Cleanup (unless PR created)
            # Keep worktree for PR review
            pass

    async def _create_pr(
        self,
        branch: str,
        title: str,
        description: str
    ) -> str:
        """Create GitHub PR"""

        # Push branch
        subprocess.run(
            ["git", "push", "-u", "origin", branch],
            cwd=self.repo_path,
            check=True
        )

        # Create PR with gh CLI
        result = subprocess.run(
            [
                "gh", "pr", "create",
                "--title", title,
                "--body", description,
                "--head", branch
            ],
            cwd=self.repo_path,
            capture_output=True,
            text=True,
            check=True
        )

        return result.stdout.strip()

# Usage
async def main():
    orchestrator = ProductionClaudeOrchestrator(
        repo_path="/path/to/project",
        max_concurrent=5,
        enable_monitoring=True
    )

    result = await orchestrator.run_task(
        task_id="TASK-123",
        title="Implement JWT authentication",
        description="Add JWT-based authentication with refresh tokens"
    )

    print(f"Status: {result['status']}")
    if result.get('pr_url'):
        print(f"PR: {result['pr_url']}")

asyncio.run(main())
```

---

## Conclusion

You now have three proven approaches for remotely controlling Claude Code:

1. **Direct CLI (Simple)** - Best for prototypes and scripts
2. **Agent SDK (Balanced)** - Best for multi-agent systems
3. **Protocol (Advanced)** - Best for production security

Choose based on your needs:
- **Quick automation** → Direct CLI
- **Multi-agent workflows** → Agent SDK
- **Enterprise security** → Protocol

All three approaches are production-proven by Vibe Kanban, AutoClaude, and Claudear respectively.

---

## Next Steps

1. Review `/Users/davidcruwys/dev/tools/vibe-kanban` for protocol implementation
2. Review `/Users/davidcruwys/dev/tools/AutoClaude` for SDK patterns
3. Review `/Users/davidcruwys/dev/tools/claudear` for simple automation
4. Read `remote-control-analysis.md` for detailed comparison

Happy automating! 🚀
