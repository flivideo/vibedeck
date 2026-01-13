# VibeDeck Design Guide

## Overview

VibeDeck is a tactile control interface for Claude Code, inspired by the Teenage Engineering KO II sampler. It transforms command-line interactions into a visual, button-based workflow with voice transcription capabilities.

## Design Philosophy

**From Command Line to Tactile Control**

Traditional CLI workflow:
```
Type command → Press Enter → Wait for response
```

VibeDeck workflow:
```
Press pad → Select option → Hit ACCEPT → Execute action
OR
Press MIC → Speak → Review transcription → Hit ACCEPT
```

The design emphasizes:
- **Muscle memory** - Consistent pad positions for common actions
- **Visual feedback** - Clear state indication (model, bank, connection status)
- **Modal interaction** - One action at a time, clear focus
- **Voice-first** - Seamless voice input with visual confirmation

## Architecture: Server + Client

VibeDeck runs as a **local Express server with Socket.IO + web browser client**:

### Server Responsibilities
- Window focus detection (using `active-win`)
- Whisper transcription processing
- Claude API communication
- File system access
- Keystroke simulation (sending commands to Terminal/Cursor)
- Configuration management
- Real-time state sync via WebSocket

### Client Responsibilities
- UI rendering (pads, modals, status)
- User input capture (clicks, keyboard, voice)
- Real-time display updates from server
- Audio recording (Web Audio API)

**Key Insight**: The browser is just the UI layer. The Express server provides all system-level capabilities (file access, window focus, etc.) and communicates via Socket.IO.

## Layout Structure

### Main Components

```
┌─────────────────────────────────────────────────────┐
│  VIBEDECK v1.0                                   ⚙️  │
├───────────────────┬─────────────────────────────────┤
│                   │                                 │
│  LEFT PANEL       │       PAD GRID (6 pads)         │
│                   │                                 │
│  MODEL: SONNET    │    ┌───────┐  ┌───────┐        │
│  BANK: A          │    │ MODEL │  │ SLASH │        │
│                   │    └───────┘  └───────┘        │
│  TRANSCRIBED:     │                                 │
│  [text feed]      │    ┌───────┐  ┌───────┐        │
│                   │    │LAUNCH │  │ THINK │        │
│                   │    └───────┘  └───────┘        │
│                   │         ┌─────┐                │
│                   │         │ ⚪  │ (center dial)   │
│  TERMINAL:        │         └─────┘                │
│  NOT CONNECTED    │    ┌───────┐  ┌───────┐        │
│                   │    │ MODE  │  │ PERM  │        │
│                   │    └───────┘  └───────┘        │
│                   │                                 │
│                   │              BANK               │
│                   │            ┌───┐               │
│                   │            │ A │               │
│                   │            ├───┤               │
│                   │            │ B │               │
│                   │            ├───┤               │
│                   │            │ C │               │
│                   │            ├───┤               │
│                   │            │ D │               │
│                   │            └───┘               │
├───────────────────┴─────────────────────────────────┤
│                                                     │
│  ┌─────┐    ┌──────────────────┐    ┌───────┐  ⚪  │
│  │ ESC │    │     ACCEPT       │    │ ENTER │  MIC │
│  └─────┘    └──────────────────┘    └───────┘     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Component Details

#### 1. Left Panel (Status & Feedback)
- **Model indicator**: Current AI model (Opus/Sonnet/Haiku)
- **Bank indicator**: Active bank (A/B/C/D)
- **Transcription feed**: Real-time voice-to-text display
- **Terminal status**: Connection state to target terminal
- **System messages**: Errors, confirmations, status updates

#### 2. Pad Grid (6 Main Buttons)
Each pad represents a category of actions:
- **Label**: Displayed on pad (e.g., "MODEL", "SLASH")
- **Icon**: Visual indicator of function
- **Options**: Sub-menu opened when clicked
- **State**: Active/inactive, selected state

Pad grid changes based on active bank (A/B/C/D).

#### 3. Bank Selector (Right Side)
4 banks (A/B/C/D) provide different pad configurations:
- **Bank A**: Primary actions (model, slash commands, think modes)
- **Bank B**: Development tools (git, test, docs, navigation)
- **Bank C**: Custom agents
- **Bank D**: Stored prompts

Only one bank active at a time. Currently selected bank is highlighted.

#### 4. Center Dial
Multi-purpose control (implementation TBD):
- Option navigation in modal
- Volume control for transcription
- Scroll through transcription history
- Parameter adjustment

#### 5. Action Buttons (Bottom Bar)
- **ESC**: Cancel current action, close modal, return to idle
- **ACCEPT**: Execute selected action (big orange button)
- **ENTER**: Submit input, send message
- **MIC**: Toggle voice recording (visual indicator when active)

## Configuration System

VibeDeck is fully configurable via JSON files:

### Configuration Files

**`default-config.json`**
- Shipped default configuration
- Complete example of all features
- Reference for creating custom configs

**`config.json`**
- User's active configuration
- Overrides defaults
- Modified through UI or manual editing

### Configuration Structure

```json
{
  "banks": {
    "A": [ /* 6 pad definitions */ ],
    "B": [ /* 6 pad definitions */ ],
    "C": [ /* 6 pad definitions */ ],
    "D": [ /* 6 pad definitions */ ]
  },
  "actionButtons": {
    "accept": { /* action definition */ },
    "enter": { /* action definition */ },
    "discard": { /* action definition */ }
  },
  "preferences": {
    "terminal": "terminal",        // Target app: "terminal" or "cursor"
    "defaultModel": "sonnet",       // Default AI model
    "whisperModel": "base"          // Whisper transcription model
  },
  "storedPrompts": [ /* saved prompts */ ]
}
```

### Pad Definition

```json
{
  "id": "model",              // Unique identifier
  "label": "MODEL",           // Display text
  "icon": "cpu",              // Icon identifier
  "options": [                // Sub-menu items
    {
      "id": "sonnet",
      "label": "Sonnet",
      "action": {
        "type": "model",
        "model": "sonnet"
      }
    }
  ]
}
```

## Action Types

VibeDeck supports 5 action types:

### 1. Model Switch
```json
{
  "type": "model",
  "model": "opus" | "sonnet" | "haiku"
}
```
Changes the active Claude model for the session.

### 2. Slash Command
```json
{
  "type": "slash",
  "command": "/clear" | "/commit" | "/review" | etc.
}
```
Executes a Claude Code slash command.

### 3. Keystroke
```json
{
  "type": "keystroke",
  "text": "any string"
}
```
Types text into the target application (Terminal/Cursor).

### 4. Keyboard Combo
```json
{
  "type": "combo",
  "key": "t",
  "modifiers": ["option", "shift", "command", "control"]
}
```
Sends a keyboard shortcut to the target application.

### 5. Permission Response
```json
{
  "type": "permission",
  "response": "1" | "2" | "3"
}
```
Responds to Claude Code permission prompts:
- "1" = Yes (once)
- "2" = Always
- "3" = No

## Interaction Patterns

### Pattern 1: Pad → Option → Accept

**Example: Switch to Haiku model**

1. Click **MODEL** pad
2. Modal opens with options: [Opus, Sonnet, Haiku, Cancel]
3. Click **Haiku**
4. Haiku option highlights
5. Click **ACCEPT**
6. Action executes, modal closes
7. Left panel updates: "MODEL: HAIKU"

### Pattern 2: Voice → Review → Accept

**Example: Ask a question via voice**

1. Click **MIC** button (turns orange, recording starts)
2. Speak: "Explain how this function works"
3. Real-time transcription appears in left panel
4. Click **MIC** again (recording stops)
5. Final transcription shown
6. Click **ACCEPT**
7. Text sent to Claude Code in target terminal
8. Response appears in terminal

### Pattern 3: Bank Switch → Pad Selection

**Example: Commit code**

1. Click **Bank B** (Development bank)
2. Pad grid updates to show: [GIT, TEST, DOCS, NAV, EDIT, MISC]
3. Click **GIT** pad
4. Modal opens: [/commit, /pr, /diff]
5. Click **/commit**
6. Click **ACCEPT**
7. `/commit` command executed in terminal

### Pattern 4: Direct Action

**Example: Press ENTER to submit**

1. Type message in terminal
2. Click **ENTER** button in VibeDeck
3. Return key sent to target app
4. Message submitted

## State Management

### Application States

**IDLE**
- No modal open
- Waiting for user input
- All pads clickable

**MODAL_OPEN**
- Pad clicked, options displayed
- User selecting from options
- ESC cancels, ACCEPT executes

**RECORDING**
- MIC active, capturing audio
- Transcription updating in real-time
- MIC click stops recording

**EXECUTING**
- Action being performed
- Visual feedback (spinner, etc.)
- Brief state before returning to IDLE

**DISCONNECTED**
- Terminal not detected/connected
- Limited functionality
- Warning displayed

### State Transitions

```
IDLE → (click pad) → MODAL_OPEN
MODAL_OPEN → (click option) → (option selected)
MODAL_OPEN → (click ACCEPT) → EXECUTING → IDLE
MODAL_OPEN → (click ESC) → IDLE

IDLE → (click MIC) → RECORDING
RECORDING → (click MIC) → (transcription ready)
RECORDING → (click ACCEPT) → EXECUTING → IDLE
RECORDING → (click ESC) → IDLE

IDLE ↔ DISCONNECTED (based on terminal detection)
```

## Visual Design Principles

### Color Palette (KO II-Inspired)

**Primary Colors:**
- Black (#000000): Background, main pads
- White (#FFFFFF): Labels, text
- Orange (#FF5500): Active states, ACCEPT button, RECORD button
- Dark Gray (#333333): Inactive elements
- Light Gray (#CCCCCC): Secondary pads (numbers, +/-)

**Status Colors:**
- Blue (#0066FF): Connected status
- Red (#FF0000): Error, disconnected
- Green (#00FF00): Success, active recording
- Yellow (#FFCC00): Warning

### Typography

**Monospace Font (Courier/Monaco-style):**
- Pad labels: Bold, uppercase, 14px
- Option labels: Regular, 12px
- Status text: Regular, 11px
- Transcription: Regular, 10px

Reasoning: Matches terminal/code aesthetic, high legibility.

### Spacing & Layout

**Grid System:**
- 6 pads in 2×3 grid
- Equal spacing between pads
- Center dial positioned between pads
- Bank selector aligned right

**Proportions:**
- Left panel: 30% width
- Pad area: 60% width
- Bank selector: 10% width
- Action buttons: Full width, 15% height

**Touch Targets:**
- Minimum pad size: 80×80px
- Minimum button size: 60×60px
- Action button height: 60px

### Animation & Feedback

**Interactions:**
- Pad click: Scale down (0.95), bounce back
- Modal open: Fade in + slide up
- Modal close: Fade out + slide down
- Bank switch: Slide animation
- Recording pulse: Subtle glow animation on MIC
- Status updates: Fade in/out transitions

**Timing:**
- Click animations: 150ms
- Modal transitions: 250ms
- Status updates: 300ms fade

## Accessibility Considerations

### Keyboard Navigation
- Tab through pads and buttons
- Enter to open modal
- Arrow keys to navigate options
- Spacebar to select
- Escape to cancel

### Visual Indicators
- High contrast text
- Clear selected state
- Status indicators (color + text)
- Loading states

### Voice Alternatives
- All voice actions have button equivalents
- Visual feedback for recording state
- Text confirmation of transcription

## Technical Architecture

### Socket.IO Events

**Client → Server:**
```javascript
socket.emit('pad:click', { bankId, padId })
socket.emit('option:select', { padId, optionId })
socket.emit('action:execute', { action })
socket.emit('voice:start')
socket.emit('voice:stop')
socket.emit('voice:data', { audioBlob })
```

**Server → Client:**
```javascript
socket.emit('window:focus', { app, title })
socket.emit('transcription:update', { text, isFinal })
socket.emit('terminal:status', { connected, app })
socket.emit('model:changed', { model })
socket.emit('error', { message })
```

### Server Capabilities

**Window Management:**
- Detect active window using `active-win`
- Poll for focus changes (500ms interval)
- Push updates to client via Socket.IO

**Keystroke Simulation:**
- Use `robotjs` or AppleScript
- Send text to active terminal
- Execute keyboard shortcuts

**Voice Transcription:**
- Receive audio from client
- Process with Whisper (local or API)
- Stream transcription updates

**File System:**
- Read/write config files
- Watch for config changes
- Serve static assets

### Client Capabilities

**Audio Recording:**
```javascript
navigator.mediaDevices.getUserMedia({ audio: true })
// Capture audio stream
// Send chunks to server via Socket.IO
```

**UI Rendering:**
- React/Svelte/Vue component structure
- Real-time state updates
- Modal management
- Animation handling

## Implementation Phases

### Phase 1: Core UI (MVP)
- Static pad grid rendering
- Bank switching
- Modal open/close
- Basic action execution (console log)

### Phase 2: Server Integration
- Express + Socket.IO setup
- Config file loading
- Action execution (keystroke simulation)
- Terminal connection detection

### Phase 3: Voice Integration
- Audio recording in browser
- Whisper transcription (server-side)
- Real-time transcription display
- Voice command execution

### Phase 4: Advanced Features
- Custom agent support
- Stored prompts system
- Center dial functionality
- Config editor UI

### Phase 5: Polish
- Animations & transitions
- Error handling & recovery
- Keyboard shortcuts
- Settings panel

## Design Decisions & Rationale

### Why Modal-Based UI?
**Decision:** Options appear in modal instead of inline expansion.

**Rationale:**
- Clear focus - one action at a time
- Prevents UI clutter
- Matches KO II workflow (select → modify → commit)
- Easy to cancel (ESC)

### Why Socket.IO vs REST?
**Decision:** WebSocket-based communication via Socket.IO.

**Rationale:**
- Real-time updates (transcription, status)
- Bidirectional communication
- Server can push to client
- Lower latency than polling

### Why Express Server vs Pure Electron?
**Decision:** Express server + web client vs Electron app.

**Rationale:**
- Access from multiple devices (iPad, phone)
- No code signing/notarization
- Faster development iteration
- Network-first design (FliHub/FliDeck pattern)
- All Node.js capabilities available server-side

**Trade-off:** No global keyboard shortcuts (requires app focus).

### Why 4 Banks?
**Decision:** Exactly 4 banks (A/B/C/D), not more.

**Rationale:**
- Matches KO II hardware (4 banks)
- Enough variety without overwhelming
- Easy to remember: A=Primary, B=Dev, C=Agents, D=Prompts
- Physical metaphor (like hardware device)

### Why 6 Pads Per Bank?
**Decision:** 6 main pads per bank, not 8 or 9.

**Rationale:**
- Balanced grid layout (2×3)
- Enough options without crowding
- Large enough touch targets
- Leaves room for center dial

## Future Enhancements

### Hardware Integration
- MIDI controller support (actual KO II or similar)
- Hardware button mapping
- Knob/dial integration
- Foot pedal support

### Multi-User
- Multiple connected clients
- Shared sessions
- Collaborative prompting

### Analytics
- Usage tracking (most-used actions)
- Voice transcription accuracy metrics
- Session history

### AI Enhancements
- Context-aware pad suggestions
- Smart prompt completion
- Learning user patterns

### Mobile App
- Native iOS/Android app
- Same Socket.IO backend
- Touch-optimized UI
- On-the-go Claude control

---

## Quick Reference

### Default Bank Configuration

**Bank A - Primary:**
MODEL, SLASH, THINK, PERM, MODE, LAUNCH

**Bank B - Development:**
GIT, TEST, DOCS, NAV, EDIT, MISC

**Bank C - Agents:**
AGENT (+ 5 empty slots)

**Bank D - Prompts:**
PROMPT (+ 5 empty slots)

### Keyboard Shortcuts

- `Escape` = ESC button
- `Space` = ACCEPT button (when modal open)
- `Return` = ENTER button
- `M` = Toggle MIC
- `A/B/C/D` = Switch banks
- `1-6` = Select pad 1-6

### Permissions Required

**macOS:**
- Screen Recording (for `active-win` window detection)
- Microphone (for voice recording)
- Accessibility (for keystroke simulation)

---

**Version:** 1.0
**Last Updated:** 2026-01-12
**Author:** David Cruwys
