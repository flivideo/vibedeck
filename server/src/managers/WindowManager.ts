import activeWin from 'active-win';
import { Server } from 'socket.io';
import { ServerToClientEvents, ClientToServerEvents } from '../../../shared/types';

type TypedServer = Server<ClientToServerEvents, ServerToClientEvents>;

export class WindowManager {
  private lastApp: string | null = null;
  private lastTitle: string | null = null;
  private lastTargetApp: string | null = null; // Remember last target (ANY app except VibeDeck)
  private pollInterval: NodeJS.Timeout | null = null;
  private errorCount: number = 0;
  private maxErrors: number = 3; // Stop after 3 consecutive errors

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
        // Reset error count on success
        this.errorCount = 0;

        const appName = win.owner.name;
        const title = win.title;

        // Only emit when focus changes (reduces Socket.IO traffic)
        if (appName !== this.lastApp || title !== this.lastTitle) {
          // Check if current window is VibeDeck itself
          const isVibeDeck = this.isVibeDeckApp(appName, title);

          // If NOT VibeDeck, this becomes the new target
          if (!isVibeDeck) {
            this.lastTargetApp = appName;
          }

          // Display the target app (or current if no target set yet)
          const displayApp = this.lastTargetApp || appName;
          const connected = this.lastTargetApp !== null;

          console.log(`Focus: ${appName} ${isVibeDeck ? '(VIBEDECK - keeping target)' : '(NEW TARGET)'} | Target: ${this.lastTargetApp || 'none'}`);

          // Emit to all connected clients
          this.io.emit('window:focus', {
            app: displayApp,
            title: isVibeDeck && this.lastTargetApp ? `(VibeDeck active, target: ${this.lastTargetApp})` : title,
            connected
          });

          this.lastApp = appName;
          this.lastTitle = title;
        }
      }
    } catch (error: any) {
      this.errorCount++;

      // Only log first error to avoid spam
      if (this.errorCount === 1) {
        console.error('⚠️  Window detection failed (likely missing Screen Recording permission)');
        console.error('Window focus detection will be disabled after 3 errors.');
        console.error('To enable: System Settings > Privacy & Security > Screen Recording > Add Terminal\n');
      }

      // Stop polling after max errors
      if (this.errorCount >= this.maxErrors) {
        console.error(`❌ Window detection failed ${this.errorCount} times. Disabling window focus detection.`);
        console.error('VibeDeck will still work, but won\'t detect active window.\n');
        this.stopPolling();
      }
    }
  }

  /**
   * Check if current window is VibeDeck itself
   * We detect this by checking if:
   * 1. App is a browser (Chrome, Safari, Firefox, etc.)
   * 2. Title contains "VibeDeck" or "localhost:5500"
   */
  private isVibeDeckApp(appName: string, title: string): boolean {
    const isBrowser = /chrome|safari|firefox|edge|brave/i.test(appName);
    if (!isBrowser) return false;

    const titleLower = title.toLowerCase();
    return titleLower.includes('vibedeck') ||
           titleLower.includes('localhost:5500') ||
           titleLower.includes('127.0.0.1:5500');
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
   * Get current target app (for debugging)
   * This is the app where actions will be sent
   */
  getCurrentApp(): string | null {
    return this.lastTargetApp;
  }
}
