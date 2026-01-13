import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from '../../shared/types';
import { ConfigManager } from './config/ConfigManager';
import { WindowManager } from './managers/WindowManager';
import { ActionExecutor } from './managers/ActionExecutor';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Configuration
const PORT = process.env.PORT || 5501;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5500';
const CONFIG_FILE = path.join(__dirname, '../../config.json');
const DEFAULT_CONFIG_FILE = path.join(__dirname, '../../docs/default-config.json');

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Track active connections for clean shutdown
const connections = new Set<any>();
httpServer.on('connection', (conn) => {
  connections.add(conn);
  conn.on('close', () => {
    connections.delete(conn);
  });
});

// Initialize Socket.IO with typed events
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(express.json({ limit: '50mb' }));

// Serve static client files
app.use(express.static(path.join(__dirname, '../../client')));

// Initialize managers
console.log('Initializing VibeDeck server...');

const configManager = new ConfigManager(CONFIG_FILE, DEFAULT_CONFIG_FILE);
const windowManager = new WindowManager(io);
const actionExecutor = new ActionExecutor();

// Start window focus detection
windowManager.startPolling();

// Watch config for changes
configManager.watchConfig((newConfig) => {
  console.log('Config changed, broadcasting to clients...');
  io.emit('config:changed', newConfig);
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Send initial config
  socket.emit('config:loaded', configManager.getConfig());

  // Send current window focus
  const currentApp = windowManager.getCurrentApp();
  if (currentApp) {
    socket.emit('window:focus', {
      app: currentApp,
      title: '',
      connected: true
    });
  }

  // Handle config requests
  socket.on('config:request', (callback) => {
    callback(configManager.getConfig());
  });

  // Handle config updates
  socket.on('config:update', async (partialConfig) => {
    try {
      await configManager.saveConfig(partialConfig);
      const newConfig = configManager.getConfig();
      io.emit('config:changed', newConfig);
    } catch (error: any) {
      socket.emit('system:message', {
        level: 'error',
        message: `Failed to save config: ${error.message}`
      });
    }
  });

  // Handle action execution
  socket.on('action:execute', async (action, callback) => {
    console.log('Action execute requested:', action.type, action);

    try {
      const result = await actionExecutor.execute(action);

      callback(result);

      if (result.success) {
        // Emit success event
        socket.emit('action:success', { action });

        // If model changed, emit model:changed event
        if (action.type === 'model' && action.model) {
          socket.emit('model:changed', { model: action.model });
        }
      } else {
        // Emit error event
        socket.emit('action:error', {
          action,
          error: result.error || 'Unknown error'
        });
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Action execution failed';
      console.error('Error executing action:', errorMessage);

      callback({
        success: false,
        error: errorMessage
      });

      socket.emit('action:error', {
        action,
        error: errorMessage
      });
    }
  });

  // Handle voice transcription (placeholder - will implement in Phase 4)
  socket.on('voice:start', () => {
    console.log('Voice recording started');
  });

  socket.on('voice:stop', () => {
    console.log('Voice recording stopped');
  });

  socket.on('voice:chunk', async ({ audio }) => {
    console.log(`Voice chunk received: ${audio.byteLength} bytes`);

    // TODO: Implement GroqService in Phase 4
    socket.emit('transcription:update', {
      text: '(Voice transcription not yet implemented - Phase 4)',
      isFinal: true
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Graceful shutdown - handles SIGTERM/SIGINT cleanly
let isShuttingDown = false;

async function gracefulShutdown(signal: string) {
  // Prevent multiple shutdown calls
  if (isShuttingDown) {
    return;
  }
  isShuttingDown = true;

  console.log(`\n${signal} received. Shutting down gracefully...`);

  // Set force exit timeout
  const forceExitTimeout = setTimeout(() => {
    console.error('Forced exit after 3s timeout');
    process.exit(1);
  }, 3000);

  try {
    // Stop window manager polling
    console.log('Stopping window manager...');
    windowManager.stopPolling();

    // Close config watcher
    console.log('Closing config watcher...');
    configManager.close();

    // Close Socket.IO server
    console.log('Closing Socket.IO...');
    await new Promise<void>((resolve) => {
      io.close(() => {
        console.log('Socket.IO closed');
        resolve();
      });
    });

    // Destroy all active connections
    console.log(`Destroying ${connections.size} active connections...`);
    connections.forEach((conn) => {
      conn.destroy();
    });
    connections.clear();

    // Close HTTP server
    console.log('Closing HTTP server...');
    await new Promise<void>((resolve) => {
      httpServer.close((err) => {
        if (err) {
          // Ignore "Server is not running" error (happens after destroying connections)
          if ((err as NodeJS.ErrnoException).code === 'ERR_SERVER_NOT_RUNNING') {
            console.log('HTTP server already closed');
            resolve();
          } else {
            console.error('Error closing HTTP server:', err.message);
            resolve(); // Resolve anyway to continue shutdown
          }
        } else {
          console.log('HTTP server closed');
          resolve();
        }
      });
    });

    // Clear force exit timeout
    clearTimeout(forceExitTimeout);

    console.log('Shutdown complete');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    clearTimeout(forceExitTimeout);
    process.exit(1);
  }
}

// Register shutdown handlers
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server
httpServer.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🎛️  VibeDeck Server Running`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Server:  http://localhost:${PORT}`);
  console.log(`Client:  ${CLIENT_URL}`);
  console.log(`Config:  ${CONFIG_FILE}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});
