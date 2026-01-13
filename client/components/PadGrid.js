/**
 * PadGrid.js - 6-Pad Grid Component (with dial in center)
 */

export class PadGrid {
  constructor(state) {
    this.state = state;
    this.container = document.getElementById('pad-grid');
    this.listeners = {};
  }

  render() {
    const pads = this.state.getCurrentPads();

    // Grid layout: 3 columns x 2 rows
    // Positions: [0] [1] [2]
    //            [3] [4] [5]
    // Dial is at grid position [1] spanning rows 1-2 (CSS handles this)

    // We need to render pads at positions: [0], skip [1] for dial, [2], [3], skip [4] for dial, [5]
    // Actually, let's render all 6 pads and let CSS grid handle the dial placement

    let html = '';

    pads.forEach((pad, index) => {
      // Skip position 1 and 4 (where dial will be)
      // Actually no, let's render in order: 0, 1, 2 (top row), 3, 4, 5 (bottom row)
      // Dial takes column 2, rows 1-2
      // So pads are at: [0] = col 1 row 1, [1] = col 3 row 1, [2] = col 1 row 2, [3] = col 3 row 2

      html += `
        <div class="pad pad-${index}" data-pad-id="${pad.id}">
          <div class="pad-label">${pad.label}</div>
        </div>
      `;
    });

    // Find dial element first (it's already in the grid from HTML)
    const existingDial = this.container.querySelector('.dial-controller');

    // Set grid content (pads)
    this.container.innerHTML = html;

    // Re-append dial to keep it in the grid
    if (existingDial) {
      this.container.appendChild(existingDial);
    }

    // Add click handlers to pads
    this.container.querySelectorAll('.pad').forEach((el) => {
      el.addEventListener('click', () => {
        const padId = el.dataset.padId;
        const pad = pads.find(p => p.id === padId);
        if (pad) {
          this.emit('pad:click', pad);
        }
      });
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
