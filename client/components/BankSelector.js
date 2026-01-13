/**
 * BankSelector.js - Bank Switching Component
 */

export class BankSelector {
  constructor(state) {
    this.state = state;
    this.buttons = document.querySelectorAll('.bank-btn');
    this.listeners = {};
    this.setupHandlers();
  }

  setupHandlers() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const bankId = btn.dataset.bank;
        this.emit('bank:select', bankId);
        this.render();
      });
    });
  }

  render() {
    this.buttons.forEach(btn => {
      if (btn.dataset.bank === this.state.activeBank) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  on(event, callback) {
    this.listeners[event] = callback;
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event](data);
    }
  }
}
