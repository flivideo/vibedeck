/**
 * Modal.js - Options Display Component (in left panel, not overlay)
 */

export class Modal {
  constructor(state) {
    this.state = state;
    this.optionsSection = document.getElementById('options-section');
    this.optionsLabel = document.getElementById('options-label');
    this.optionsList = document.getElementById('options-list');
    this.listeners = {};
  }

  on(event, callback) {
    this.listeners[event] = callback;
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event](data);
    }
  }

  render() {
    if (!this.state.isModalOpen || !this.state.currentPad) {
      // Hide options section when no pad selected
      this.optionsSection.style.display = 'none';
      return;
    }

    // Show options section
    this.optionsSection.style.display = 'flex';
    this.optionsLabel.textContent = `${this.state.currentPad.label}:`;

    const options = this.state.currentPad.options || [];
    this.optionsList.innerHTML = options.map((option, i) => `
      <li class="option ${i === this.state.selectedIndex ? 'selected' : ''}"
          data-index="${i}">
        ${option.label}
      </li>
    `).join('');

    // Add click handlers
    this.optionsList.querySelectorAll('.option').forEach((el, i) => {
      el.addEventListener('click', () => {
        this.state.selectedIndex = i;
        this.state.selectedOption = options[i];

        // Execute action immediately on click
        console.log('Option clicked:', options[i].label);
        this.emit('option:select', options[i]);

        this.render();
      });
    });
  }
}
