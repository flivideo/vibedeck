import activeWin from 'active-win';
import { Server } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents } from '../../../shared/types';

type TypedServer = Server<ClientToServerEvents, ServerToClientEvents>;

export class WindowManager {
  private lastApp: string | null = null;
  private lastTitle: string | null = null;
  private pollInterval: NodeJS.Timeout | null = null;
  private targetApps: string[] = ['Terminal', 'Cursor'];

  constructor(private io: TypedServer) {}

  /**
   * Start polling for window focus changes (500ms interval)
   */
  startPolling(): void {
    if (this.pollInterval) {
      console.warn('Window polling already started');
      return;
    }

    console.log('Starting window focus detection (500ms polling)');

    // Initial check
    this.checkFocus();

    // Poll every 500ms (same as test-focus.js)
    this.pollInterval = setInterval(() => {
      this.checkFocus();
    }, 500);
  }

  /**
   * Check current focused window and emit Socket.IO event if changed
   */
  private async checkFocus(): Promise<void> {
    try {
      const win = await activeWin();

      if (win) {
        const appName = win.owner.name;
        const title = win.title;

        // Only emit when focus changes (reduces Socket.IO traffic)
        if (appName !== this.lastApp || title !== this.lastTitle) {
          const connected = this.isTargetApp(appName);

          console.log(`Focus changed: ${appName} ${connected ? '(CONNECTED)' : '(not connected)'}`);

          // Emit to all connected clients
          this.io.emit('window:focus', {
            app: appName,
            title,
            connected
          });

          this.lastApp = appName;
          this.lastTitle = title;
        }
      }
    } catch (error: any) {
      console.error('Error detecting window:', error.message);

      // Check for permission errors (macOS Screen Recording permission)
      if (error.message && error.message.toLowerCase().includes('permission')) {
        console.error('\n⚠️  PERMISSION ISSUE DETECTED ⚠️');
        console.error('On macOS, you need to grant Screen Recording permissions:');
        console.error('1. Open System Settings > Privacy & Security > Screen Recording');
        console.error('2. Add Terminal (or your terminal app) to the list');
        console.error('3. Restart the server\n');

        // Emit error to clients
        this.io.emit('system:message', {
          level: 'error',
          message: 'Window focus detection failed: Screen Recording permission required'
        });

        // Stop polling to avoid flooding logs
        this.stopPolling();
      }
    }
  }

  /**
   * Check if app is a target app (Terminal or Cursor)
   */
  private isTargetApp(appName: string): boolean {
    return this.targetApps.some(targetApp =>
      appName.toLowerCase().includes(targetApp.toLowerCase())
    );
  }

  /**
   * Add custom target app
   */
  addTargetApp(appName: string): void {
    if (!this.targetApps.includes(appName)) {
      this.targetApps.push(appName);
      console.log(`Added target app: ${appName}`);
    }
  }

  /**
   * Stop polling for window focus changes
   */
  stopPolling(): void {
    if (this.pollInterval) {
      console.log('Stopping window focus detection');
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  /**
   * Get current focused app (for debugging)
   */
  getCurrentApp(): string | null {
    return this.lastApp;
  }
}
