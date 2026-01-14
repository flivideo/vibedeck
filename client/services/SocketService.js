/**
 * SocketService.js - Socket.IO Client Wrapper
 */

export class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
    this.listeners = {};
  }

  /**
   * Connect to Socket.IO server (same origin as the page)
   */
  connect() {
    // Connect to same server that served this page (no hardcoded port!)
    this.socket = io();

    this.socket.on('connect', () => {
      console.log('Connected to VibeDeck server');
      this.connected = true;
      this.updateConnectionStatus(true);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.connected = false;
      this.updateConnectionStatus(false);
    });

    // Forward server events to listeners
    this.setupEventForwarding();
  }

  /**
   * Setup event forwarding from Socket.IO to internal listeners
   */
  setupEventForwarding() {
    const events = [
      'config:loaded',
      'config:changed',
      'window:focus',
      'transcription:update',
      'model:changed',
      'action:success',
      'action:error',
      'system:message'
    ];

    events.forEach(event => {
      this.socket.on(event, (data) => {
        this.emit(event, data);
      });
    });
  }

  /**
   * Request config from server
   */
  async requestConfig() {
    return new Promise((resolve) => {
      this.socket.emit('config:request', (config) => {
        resolve(config);
      });
    });
  }

  /**
   * Execute action on server
   */
  async executeAction(action) {
    return new Promise((resolve) => {
      this.socket.emit('action:execute', action, (result) => {
        resolve(result);
      });
    });
  }

  /**
   * Update connection status indicator
   */
  updateConnectionStatus(connected) {
    const dot = document.getElementById('status-dot');
    if (dot) {
      if (connected) {
        dot.classList.add('connected');
      } else {
        dot.classList.remove('connected');
      }
    }
  }

  /**
   * Register event listener
   */
  on(event, callback) {
    this.listeners[event] = callback;
  }

  /**
   * Emit event to internal listeners
   */
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event](data);
    }
  }

  /**
   * Get socket instance (for direct access if needed)
   */
  getSocket() {
    return this.socket;
  }
}
