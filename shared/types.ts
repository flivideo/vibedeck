// VibeDeck Shared Types
// Type-safe Socket.IO events and config structures

// ============================================================================
// Socket.IO Event Types
// ============================================================================

// Server → Client Events
export interface ServerToClientEvents {
  'config:loaded': (config: Config) => void;
  'config:changed': (config: Config) => void;
  'window:focus': (data: WindowFocusData) => void;
  'transcription:update': (data: TranscriptionData) => void;
  'model:changed': (data: { model: string }) => void;
  'action:success': (data: { action: Action }) => void;
  'action:error': (data: { action: Action; error: string }) => void;
  'system:message': (data: SystemMessage) => void;
}

// Client → Server Events
export interface ClientToServerEvents {
  'action:execute': (action: Action, callback: (result: ActionResult) => void) => void;
  'voice:start': () => void;
  'voice:stop': () => void;
  'voice:chunk': (data: { audio: ArrayBuffer }) => void;
  'config:request': (callback: (config: Config) => void) => void;
  'config:update': (config: Partial<Config>) => void;
}

// ============================================================================
// Action Types
// ============================================================================

export type ActionType = 'model' | 'slash' | 'keystroke' | 'combo' | 'permission';

export interface Action {
  type: ActionType;
  model?: string;           // For 'model': 'opus' | 'sonnet' | 'haiku'
  command?: string;         // For 'slash': '/clear', '/commit', etc.
  text?: string;            // For 'keystroke': any string
  key?: string;             // For 'combo': 'return', 't', 'f1', etc.
  modifiers?: string[];     // For 'combo': ['option', 'shift', 'command', 'control']
  response?: string;        // For 'permission': '1', '2', '3'
}

export interface ActionResult {
  success: boolean;
  error?: string;
}

// ============================================================================
// Configuration Types
// ============================================================================

export interface Config {
  banks: BankCollection;
  actionButtons: ActionButtonConfig;
  preferences: PreferencesConfig;
  storedPrompts: StoredPrompt[];
}

export interface BankCollection {
  A: Pad[];
  B: Pad[];
  C: Pad[];
  D: Pad[];
}

export interface Pad {
  id: string;
  label: string;
  icon: string;
  options: Option[];
}

export interface Option {
  id: string;
  label: string;
  action: Action;
}

export interface ActionButtonConfig {
  accept: Action;
  enter: Action;
  discard: Action;
}

export interface PreferencesConfig {
  terminal: 'terminal' | 'cursor';
  defaultModel: 'opus' | 'sonnet' | 'haiku';
  whisperModel: string;
}

export interface StoredPrompt {
  id: string;
  label: string;
  text: string;
}

// ============================================================================
// Event Data Types
// ============================================================================

export interface WindowFocusData {
  app: string;
  title: string;
  connected: boolean;
}

export interface TranscriptionData {
  text: string;
  isFinal: boolean;
}

export interface SystemMessage {
  level: 'info' | 'warning' | 'error';
  message: string;
}

// ============================================================================
// Type Guards
// ============================================================================

export function isValidAction(action: any): action is Action {
  if (!action || typeof action !== 'object') return false;
  if (!['model', 'slash', 'keystroke', 'combo', 'permission'].includes(action.type)) return false;
  return true;
}

export function isValidConfig(config: any): config is Config {
  if (!config || typeof config !== 'object') return false;
  if (!config.banks || typeof config.banks !== 'object') return false;
  if (!config.actionButtons || typeof config.actionButtons !== 'object') return false;
  if (!config.preferences || typeof config.preferences !== 'object') return false;
  return true;
}
