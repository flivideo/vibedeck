/**
 * AppState.js - Client-side state management
 */

export class AppState {
  constructor() {
    this.config = null;
    this.activeBank = 'A';
    this.currentModel = 'SONNET';
    this.isModalOpen = false;
    this.currentPad = null;
    this.selectedOption = null;
    this.selectedIndex = 0;
    this.transcription = '';
    this.windowFocus = { app: '', title: '', connected: false };
  }

  setConfig(config) {
    this.config = config;
    if (config.preferences?.defaultModel) {
      this.currentModel = config.preferences.defaultModel.toUpperCase();
    }
  }

  setActiveBank(bankId) {
    this.activeBank = bankId;
  }

  setModel(model) {
    this.currentModel = model.toUpperCase();
  }

  openModal(pad) {
    this.isModalOpen = true;
    this.currentPad = pad;
    this.selectedIndex = 0;
    this.selectedOption = pad.options?.[0] || null;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentPad = null;
    this.selectedOption = null;
    this.selectedIndex = 0;
  }

  selectOption(option) {
    this.selectedOption = option;
  }

  navigateOptions(delta) {
    if (!this.currentPad?.options) return;

    const options = this.currentPad.options;
    this.selectedIndex = Math.max(0, Math.min(options.length - 1, this.selectedIndex + delta));
    this.selectedOption = options[this.selectedIndex];
  }

  updateTranscription(text, isFinal) {
    if (isFinal) {
      this.transcription = text;
    } else {
      this.transcription = text + '...';
    }
  }

  setWindowFocus(data) {
    this.windowFocus = data;
  }

  getCurrentPads() {
    if (!this.config) return [];
    return this.config.banks[this.activeBank] || [];
  }
}
