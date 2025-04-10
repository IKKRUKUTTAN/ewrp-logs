const apiBase = "https://raw.githubusercontent.com/RIGHTGAMER/ewrp-logs/main/logs"; // Updated URL to fetch logs

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user !== 'admin' || pass !== 'IKKRUDEV') {
    alert('Wrong credentials');
    return;
  }

  document.getElementById('login-box').style.display = 'none';
  document.getElementById('panel').style.display = 'flex';
}

let currentLog = '';  // Store the current log file to fetch

function loadLog(logName) {
  currentLog = logName; // Set the selected log file name
  fetchLog();  // Fetch and display the log data
}

function loadLogPrompt() {
  const date = prompt('Enter log file name (e.g. 10-04-2025.log):');
  if (date) loadLog(date);  // If date is entered, load that log
}

function fetchLog() {
  if (!currentLog) return;  // If no log is selected, exit the function

  // Construct the URL for fetching the log file from GitHub
  const logUrl = `${apiBase}/${currentLog}`;

  // Fetch the log file from GitHub using the constructed URL
  fetch(logUrl, {
    headers: {
      'Authorization': 'Basic ' + btoa('admin:IKKRUDEV') // Optional: Authentication
    }
  })
  .then(res => {
    if (!res.ok) throw new Error('Failed to load log.');  // If there's an error fetching, throw an error
    return res.text();  // Otherwise, return the log content as text
  })
  .then(data => {
    document.getElementById('logDisplay').textContent = data;  // Display the log content
  })
  .catch(err => {
    document.getElementById('logDisplay').textContent = `Error: ${err.message}`;  // Display any errors
  });
}

// Auto-refresh logs every 5s (optional, remove if unnecessary)
setInterval(() => {
  if (currentLog) fetchLog();  // Automatically fetch the log every 5 seconds if one is selected
}, 5000);
