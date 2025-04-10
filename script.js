const apiBase = "https://raw.githubusercontent.com/RIGHTGAMER/ewrp-logs/main/logs"; // Correct the path to 'logs/'

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  // Checking the login credentials
  if (user !== 'admin' || pass !== 'IKKRUDEV') {
    alert('Wrong credentials');
    return;
  }

  // Hide login box and show panel after successful login
  document.getElementById('login-box').style.display = 'none';
  document.getElementById('panel').style.display = 'flex';
}

let currentLog = ''; // Track the current log being viewed

// Function to load a specific log based on file name
function loadLog(logName) {
  currentLog = logName;
  fetchLog();
}

// Prompt for entering log file name
function loadLogPrompt() {
  const date = prompt('Enter log file name (e.g. 10-04-2025.log):');
  if (date) loadLog(date);
}

// Fetch the log from GitHub repository
function fetchLog() {
  if (!currentLog) return; // If no log selected, do nothing

  // Fetch the log file from the GitHub repository
  fetch(`${apiBase}/${currentLog}`, {
    headers: {
      'Authorization': 'Basic ' + btoa('admin:IKKRUDEV') // Basic auth (username:password) encoded in base64
    }
  })
  .then(res => {
    if (!res.ok) throw new Error('Failed to load log.');
    return res.text();
  })
  .then(data => {
    // Display the log content in the logDisplay element
    document.getElementById('logDisplay').textContent = data;
  })
  .catch(err => {
    // In case of error, display the error message
    document.getElementById('logDisplay').textContent = `Error: ${err.message}`;
  });
}

// Auto-refresh logs every 5 seconds to keep them updated
setInterval(() => {
  if (currentLog) fetchLog();
}, 5000);
