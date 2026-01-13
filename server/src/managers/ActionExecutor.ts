/**
 * ActionExecutor.ts - Execute actions via AppleScript
 *
 * Handles 5 action types:
 * - model: Switch Claude model (/model opus)
 * - slash: Execute slash commands (/clear, /commit)
 * - keystroke: Type arbitrary text
 * - combo: Keyboard combinations (Cmd+K, Opt+T)
 * - permission: Quick responses (1, 2, 3)
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import type { Action, ActionResult } from '../../../shared/types.js';

const execAsync = promisify(exec);

export class ActionExecutor {
  /**
   * Execute an action based on its type
   */
  async execute(action: Action): Promise<ActionResult> {
    try {
      console.log(`[ActionExecutor] Executing action:`, action);

      switch (action.type) {
        case 'model':
          return await this.executeModel(action);
        case 'slash':
          return await this.executeSlash(action);
        case 'keystroke':
          return await this.executeKeystroke(action);
        case 'combo':
          return await this.executeCombo(action);
        case 'permission':
          return await this.executePermission(action);
        default:
          return {
            success: false,
            error: `Unknown action type: ${(action as any).type}`,
          };
      }
    } catch (error) {
      console.error('[ActionExecutor] Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Switch Claude model
   * Example: { type: 'model', model: 'opus' }
   */
  private async executeModel(action: Action): Promise<ActionResult> {
    if (!action.model) {
      return { success: false, error: 'No model specified' };
    }

    const command = `/model ${action.model}`;
    return await this.typeString(command + '\n');
  }

  /**
   * Execute slash command
   * Example: { type: 'slash', command: '/clear' }
   */
  private async executeSlash(action: Action): Promise<ActionResult> {
    if (!action.command) {
      return { success: false, error: 'No command specified' };
    }

    return await this.typeString(action.command + '\n');
  }

  /**
   * Type arbitrary text (no newline)
   * Example: { type: 'keystroke', text: 'Hello world' }
   */
  private async executeKeystroke(action: Action): Promise<ActionResult> {
    if (!action.text) {
      return { success: false, error: 'No text specified' };
    }

    return await this.typeString(action.text);
  }

  /**
   * Execute keyboard combination
   * Example: { type: 'combo', key: 'k', modifiers: ['command'] }
   */
  private async executeCombo(action: Action): Promise<ActionResult> {
    if (!action.key) {
      return { success: false, error: 'No key specified' };
    }

    const modifiers = action.modifiers || [];
    const key = action.key;

    // Build AppleScript command
    // Example: keystroke "k" using {command down}
    const modifierMap: Record<string, string> = {
      command: 'command down',
      option: 'option down',
      control: 'control down',
      shift: 'shift down',
    };

    const modifierParts = modifiers
      .map((mod) => modifierMap[mod.toLowerCase()])
      .filter(Boolean);

    let script: string;
    if (modifierParts.length > 0) {
      const modifierString = `{${modifierParts.join(', ')}}`;
      script = `tell application "System Events" to keystroke "${this.escapeForAppleScript(key)}" using ${modifierString}`;
    } else {
      script = `tell application "System Events" to keystroke "${this.escapeForAppleScript(key)}"`;
    }

    return await this.executeAppleScript(script);
  }

  /**
   * Send permission response (1, 2, 3)
   * Example: { type: 'permission', response: '2' }
   */
  private async executePermission(action: Action): Promise<ActionResult> {
    if (!action.response) {
      return { success: false, error: 'No response specified' };
    }

    return await this.typeString(action.response + '\n');
  }

  /**
   * Type a string using AppleScript
   */
  private async typeString(text: string): Promise<ActionResult> {
    // Split into lines and type each line with newline handling
    const lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.length > 0) {
        // Type the line content
        const script = `tell application "System Events" to keystroke "${this.escapeForAppleScript(line)}"`;
        const result = await this.executeAppleScript(script);
        if (!result.success) {
          return result;
        }
      }

      // Add newline if not last line or if original text ended with newline
      if (i < lines.length - 1 || text.endsWith('\n')) {
        const returnScript = `tell application "System Events" to keystroke return`;
        const result = await this.executeAppleScript(returnScript);
        if (!result.success) {
          return result;
        }
      }
    }

    return { success: true };
  }

  /**
   * Execute AppleScript command
   */
  private async executeAppleScript(script: string): Promise<ActionResult> {
    try {
      console.log(`[ActionExecutor] Executing AppleScript:`, script);
      const { stdout, stderr } = await execAsync(`osascript -e '${script}'`);

      if (stderr) {
        console.error('[ActionExecutor] AppleScript stderr:', stderr);
        return { success: false, error: stderr };
      }

      console.log('[ActionExecutor] AppleScript success');
      return { success: true };
    } catch (error) {
      console.error('[ActionExecutor] AppleScript error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'AppleScript execution failed',
      };
    }
  }

  /**
   * Escape special characters for AppleScript strings
   */
  private escapeForAppleScript(text: string): string {
    return text
      .replace(/\\/g, '\\\\') // Backslash
      .replace(/"/g, '\\"')   // Double quote
      .replace(/\n/g, '\\n')  // Newline
      .replace(/\r/g, '\\r')  // Carriage return
      .replace(/\t/g, '\\t'); // Tab
  }
}
