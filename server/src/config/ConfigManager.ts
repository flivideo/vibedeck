import chokidar, { FSWatcher } from 'chokidar';
import fs from 'fs-extra';
import path from 'path';
import { Config, isValidConfig } from '../../../shared/types';

export class ConfigManager {
  private config: Config;
  private watcher: FSWatcher | null = null;
  private debounceTimeout: NodeJS.Timeout | null = null;

  constructor(
    private configPath: string,
    private defaultConfigPath: string
  ) {
    this.config = this.loadConfig();
  }

  /**
   * Load configuration from config.json, falling back to default-config.json
   */
  loadConfig(): Config {
    try {
      // Try loading user config
      if (fs.existsSync(this.configPath)) {
        console.log(`Loading config from: ${this.configPath}`);
        const userConfig = fs.readJsonSync(this.configPath);

        if (isValidConfig(userConfig)) {
          return userConfig;
        } else {
          console.warn('Invalid user config, falling back to default');
        }
      }

      // Fall back to default config
      console.log(`Loading default config from: ${this.defaultConfigPath}`);
      const defaultConfig = fs.readJsonSync(this.defaultConfigPath);

      if (isValidConfig(defaultConfig)) {
        return defaultConfig;
      }

      throw new Error('Default config is invalid');
    } catch (error) {
      console.error('Error loading config:', error);
      throw error;
    }
  }

  /**
   * Watch config file for changes and trigger callback
   */
  watchConfig(callback: (config: Config) => void): void {
    if (this.watcher) {
      console.warn('Config watcher already started');
      return;
    }

    console.log(`Watching config file: ${this.configPath}`);

    this.watcher = chokidar.watch(this.configPath, {
      persistent: true,
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 100
      }
    });

    this.watcher.on('change', () => {
      // Debounce to avoid multiple reloads
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }

      this.debounceTimeout = setTimeout(() => {
        try {
          console.log('Config file changed, reloading...');
          const newConfig = this.loadConfig();
          this.config = newConfig;
          callback(newConfig);
        } catch (error) {
          console.error('Error reloading config:', error);
        }
      }, 300);
    });

    this.watcher.on('error', (error) => {
      console.error('Config watcher error:', error);
    });
  }

  /**
   * Get current configuration
   */
  getConfig(): Config {
    return this.config;
  }

  /**
   * Update configuration (in memory and save to file)
   */
  async saveConfig(config: Partial<Config>): Promise<void> {
    try {
      // Merge with existing config
      this.config = { ...this.config, ...config };

      // Validate before saving
      if (!isValidConfig(this.config)) {
        throw new Error('Invalid config structure');
      }

      // Ensure directory exists
      const dir = path.dirname(this.configPath);
      await fs.ensureDir(dir);

      // Save to file
      await fs.writeJson(this.configPath, this.config, { spaces: 2 });
      console.log('Config saved successfully');
    } catch (error) {
      console.error('Error saving config:', error);
      throw error;
    }
  }

  /**
   * Close watcher and cleanup
   */
  close(): void {
    // Clear any pending debounce timeout
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }

    // Close file watcher
    if (this.watcher) {
      console.log('Closing config watcher');
      this.watcher.close();
      this.watcher = null;
    }
  }
}
