/**
 * VibeDeck - Main Application
 *
 * Tactile stream deck for Claude Code
 * Inspired by Teenage Engineering KO II
 */

import { SocketService } from './services/SocketService.js';
import { AppState } from './utils/state.js';
import { DialController } from './components/DialController.js';
import { Modal } from './components/Modal.js';
import { PadGrid } from './components/PadGrid.js';
import { StatusPanel } from './components/StatusPanel.js';
import { BankSelector } from './components/BankSelector.js';

class VibeDeckApp {
  constructor() {
    console.log('🎛️  Initializing VibeDeck...');

    // Initialize state
    this.state = new AppState();

    // Initialize Socket.IO
    this.socket = new SocketService();

    // Initialize components
    this.dialController = new DialController();
    this.modal = new Modal(this.state);
    this.padGrid = new PadGrid(this.state);
    this.statusPanel = new StatusPanel(this.state);
    this.bankSelector = new BankSelector(this.state);

    // Start app
    this.init();
  }

  async init() {
    try {
      // Connect to Socket.IO server
      this.socket.connect();

      // Request initial config
      const config = await this.socket.requestConfig();
      this.state.setConfig(config);
      console.log('Config loaded:', config);

      // Setup event listeners
      this.setupSocketListeners();
      this.setupUIEventHandlers();

      // Initial render
      this.render();

      console.log('✅ VibeDeck initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing VibeDeck:', error);
    }
  }

  setupSocketListeners() {
    // Config updates
    this.socket.on('config:loaded', (config) => {
      console.log('Config loaded from server');
      this.state.setConfig(config);
      this.render();
    });

    this.socket.on('config:changed', (config) => {
      console.log('Config changed, reloading UI');
      this.state.setConfig(config);
      this.render();
    });

    // Window focus changes
    this.socket.on('window:focus', (data) => {
      console.log('Window focus:', data.app, data.connected ? '(CONNECTED)' : '');
      this.state.setWindowFocus(data);
      this.statusPanel.render();
    });

    // Model changes
    this.socket.on('model:changed', (data) => {
      console.log('Model changed:', data.model);
      this.state.setModel(data.model);
      this.statusPanel.render();
    });

    // Transcription updates
    this.socket.on('transcription:update', (data) => {
      console.log('Transcription:', data.text);
      this.state.updateTranscription(data.text, data.isFinal);
      this.statusPanel.render();
    });

    // Action results
    this.socket.on('action:success', (data) => {
      console.log('Action success:', data.action);
    });

    this.socket.on('action:error', (data) => {
      console.error('Action error:', data.error);
      alert(`Action failed: ${data.error}`);
    });

    // System messages
    this.socket.on('system:message', (data) => {
      console.log(`[${data.level.toUpperCase()}]`, data.message);
      if (data.level === 'error') {
        alert(data.message);
      }
    });
  }

  setupUIEventHandlers() {
    // Pad clicks open modal
    this.padGrid.on('pad:click', (pad) => {
      console.log('Pad clicked:', pad.label);
      this.state.openModal(pad);
      this.modal.render();
    });

    // Bank switching
    this.bankSelector.on('bank:select', (bankId) => {
      console.log('Bank switched:', bankId);
      this.state.setActiveBank(bankId);
      this.padGrid.render();
      this.statusPanel.render();
    });

    // Dial rotation navigates modal options
    this.dialController.on('dial:rotate', (delta) => {
      if (this.state.isModalOpen) {
        this.state.navigateOptions(delta);
        this.modal.render();
      }
    });

    // Dial click selects option
    this.dialController.on('dial:click', () => {
      if (this.state.isModalOpen && this.state.selectedOption) {
        console.log('Dial clicked, executing action:', this.state.selectedOption.action);
        this.executeAction(this.state.selectedOption.action);
      }
    });

    // ESC button
    document.getElementById('esc-btn').addEventListener('click', () => {
      console.log('ESC pressed');
      this.state.closeModal();
      this.modal.render();
    });

    // ACCEPT button
    document.getElementById('accept-btn').addEventListener('click', () => {
      if (this.state.selectedOption) {
        console.log('ACCEPT pressed, executing action:', this.state.selectedOption.action);
        this.executeAction(this.state.selectedOption.action);
      }
    });

    // ENTER button
    document.getElementById('enter-btn').addEventListener('click', () => {
      console.log('ENTER pressed');
      this.socket.executeAction({
        type: 'combo',
        key: 'return',
        modifiers: []
      });
    });

    // ESC key also closes options panel
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.state.isModalOpen) {
        this.state.closeModal();
        this.modal.render();
      }
    });

    // Hide options panel initially
    document.getElementById('options-section').style.display = 'none';
  }

  async executeAction(action) {
    try {
      const result = await this.socket.executeAction(action);

      if (result.success) {
        // Close modal on success
        this.state.closeModal();
        this.modal.render();
      } else {
        console.error('Action failed:', result.error);
        alert(`Action failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error executing action:', error);
      alert(`Error: ${error.message}`);
    }
  }

  render() {
    this.padGrid.render();
    this.bankSelector.render();
    this.statusPanel.render();
    this.modal.render();
  }
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new VibeDeckApp();
  });
} else {
  new VibeDeckApp();
}
