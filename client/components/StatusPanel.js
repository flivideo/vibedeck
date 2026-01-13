/**
 * StatusPanel.js - Left Status Panel Component
 */

export class StatusPanel {
  constructor(state) {
    this.state = state;
    this.modelValue = document.getElementById('model-value');
    this.bankValue = document.getElementById('bank-value');
    this.transcriptionText = document.getElementById('transcription-text');
    this.terminalStatus = document.getElementById('terminal-status');
  }

  render() {
    // Update model
    this.modelValue.textContent = this.state.currentModel;

    // Update bank
    this.bankValue.textContent = this.state.activeBank;

    // Update transcription
    if (this.state.transcription) {
      this.transcriptionText.textContent = this.state.transcription;
    }

    // Update terminal status
    if (this.state.windowFocus.connected) {
      this.terminalStatus.textContent = `${this.state.windowFocus.app.toUpperCase()}: CONNECTED`;
      this.terminalStatus.classList.add('connected');
    } else {
      this.terminalStatus.textContent = this.state.windowFocus.app
        ? `${this.state.windowFocus.app.toUpperCase()}: NOT CONNECTED`
        : 'NOT CONNECTED';
      this.terminalStatus.classList.remove('connected');
    }
  }
}
