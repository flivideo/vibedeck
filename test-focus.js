const activeWin = require('active-win');

console.log('Starting window focus detection test...');
console.log('Switch between applications to see focus changes.\n');
console.log('Press Ctrl+C to exit.\n');

let lastApp = null;
let lastTitle = null;

async function checkFocus() {
  try {
    const win = await activeWin();

    if (win) {
      const appName = win.owner.name;
      const title = win.title;

      // Only log when focus changes
      if (appName !== lastApp || title !== lastTitle) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`APP:   ${appName}`);
        console.log(`TITLE: ${title}`);
        console.log(`PID:   ${win.owner.processId}`);
        console.log(`PATH:  ${win.owner.path}`);
        console.log(`TIME:  ${new Date().toLocaleTimeString()}`);

        lastApp = appName;
        lastTitle = title;
      }
    }
  } catch (error) {
    console.error('Error detecting window:', error.message);

    if (error.message.includes('permission')) {
      console.log('\n⚠️  PERMISSION ISSUE DETECTED ⚠️');
      console.log('On macOS, you need to grant Accessibility permissions:');
      console.log('1. Open System Preferences > Security & Privacy > Privacy');
      console.log('2. Select "Accessibility" from the left panel');
      console.log('3. Click the lock to make changes');
      console.log('4. Add Terminal (or your terminal app) to the list');
      console.log('5. Restart this script\n');
      process.exit(1);
    }
  }
}

// Initial check
checkFocus();

// Poll every 500ms for changes
setInterval(checkFocus, 500);
