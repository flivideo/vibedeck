/**
 * DialController.js - Rotary Dial Navigation
 *
 * The unique interaction model for VibeDeck.
 * Rotate to navigate options, click center to select.
 */

export class DialController {
  constructor() {
    this.container = document.getElementById('dial-controller');
    this.dial = this.container.querySelector('.dial');
    this.centerButton = document.getElementById('dial-center');

    this.rotation = 0;
    this.listeners = {};

    this.setupKeyboardEmulation();
    this.setupMouseEmulation();
    this.setupCenterButton();
  }

  /**
   * Setup keyboard emulation (Arrow keys = dial rotation, Enter/Space = center click)
   */
  setupKeyboardEmulation() {
    document.addEventListener('keydown', (e) => {
      // Prevent default for navigation keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        this.rotate(1);  // Rotate forward
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        this.rotate(-1); // Rotate backward
      } else if (e.key === 'Enter' || e.key === ' ') {
        this.click();    // Center button click
      }
    });
  }

  /**
   * Setup mouse emulation (Click + drag to rotate)
   */
  setupMouseEmulation() {
    let isDragging = false;
    let lastY = 0;

    this.dial.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastY = e.clientY;
      this.dial.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaY = lastY - e.clientY; // Up = positive
        if (Math.abs(deltaY) > 5) { // Threshold to avoid jitter
          this.rotate(Math.sign(deltaY));
          lastY = e.clientY;
        }
      }
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        this.dial.style.cursor = 'grab';
      }
    });

    // Prevent default drag behavior
    this.dial.addEventListener('dragstart', (e) => e.preventDefault());
  }

  /**
   * Setup center button click
   */
  setupCenterButton() {
    this.centerButton.addEventListener('click', () => {
      this.click();
    });
  }

  /**
   * Rotate the dial by delta steps
   * @param {number} delta - +1 for forward, -1 for backward
   */
  rotate(delta) {
    this.rotation += delta * 30; // 30 degrees per step
    this.dial.style.transform = `rotate(${this.rotation}deg)`;
    this.emit('dial:rotate', delta);
  }

  /**
   * Handle center button click
   */
  click() {
    // Visual feedback
    this.centerButton.classList.add('clicked');
    setTimeout(() => {
      this.centerButton.classList.remove('clicked');
    }, 300);

    this.emit('dial:click');
  }

  /**
   * Register event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    this.listeners[event] = callback;
  }

  /**
   * Emit event to registered listeners
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event](data);
    }
  }

  /**
   * Reset dial rotation to 0
   */
  reset() {
    this.rotation = 0;
    this.dial.style.transform = 'rotate(0deg)';
  }
}
