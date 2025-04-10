const apiBase = "https://raw.githubusercontent.com/RIGHTGAMER/ewrp-logs/main/logs";

let lastActivityTime = Date.now();  // To track the last activity time
let logoutTimer;  // Variable to hold the logout timer

// Function to reset the logout timer
function resetLogoutTimer() {
  clearTimeout(logoutTimer);  // Clear the previous timer
  lastActivityTime = Date.now();  // Reset the last activity time
  startLogoutTimer();  // Start a new logout timer
}

// Function to start a 5-minute (300000ms) timer
function startLogoutTimer() {
  logoutTimer = setTimeout(() => {
    alert("You have been logged out due to inactivity.");
    logout();  // Log out the user after 5 minutes
  }, 300000);  // 5 minutes in milliseconds
}

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user !== 'admin' || pass !== 'IKKRUDEV') {
    alert('Wrong credentials');
    return;
  }

  document.getElementById('login-box').style.display = 'none';
  document.getElementById('panel').style.display = 'flex';

  // Start the logout timer after login
  resetLogoutTimer();
}

let currentLog = '';
function loadLog(logName) {
  currentLog = logName;
  fetchLog();
}

function fetchLog() {
  if (!currentLog) return;

  // Reset the logout timer every time a log is loaded
  resetLogoutTimer();

  fetch(`${apiBase}/${currentLog}`)
    .then(res => {
      if (!res.ok) throw new Error('Failed to load log.');
      return res.text();
    })
    .then(data => {
      document.getElementById('logDisplay').textContent = data;
    })
    .catch(err => {
      document.getElementById('logDisplay').textContent = `Error: ${err.message}`;
    });
}

// Auto-refresh logs every 5 seconds
setInterval(() => {
  if (currentLog) fetchLog();
}, 5000);

// Function to log out the user
function logout() {
  document.getElementById('panel').style.display = 'none';
  document.getElementById('login-box').style.display = 'flex';
  currentLog = '';  // Clear the current log
  document.getElementById('logDisplay').textContent = '';  // Clear the log display
}

// Track user activity (e.g., mouse movement, key press, etc.)
document.addEventListener('mousemove', resetLogoutTimer);
document.addEventListener('keydown', resetLogoutTimer);
