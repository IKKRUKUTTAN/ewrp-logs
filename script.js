const apiBase = "https://raw.githubusercontent.com/RIGHTGAMER/ewrp-logs/main/logs";

// Check if the admin is already logged in (on page reload)
if (localStorage.getItem('loggedIn') === 'true') {
  document.getElementById('login-box').style.display = 'none';
  document.getElementById('panel').style.display = 'flex';
  startInactivityTimer();  // Start the inactivity timer if logged in
}

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user !== 'admin' || pass !== 'IKKRUDEV') {
    alert('Wrong credentials');
    return;
  }

  // Successful login, set the logged-in state in localStorage
  localStorage.setItem('loggedIn', 'true');

  // Hide the login box and show the log panel
  document.getElementById('login-box').style.display = 'none';
  document.getElementById('panel').style.display = 'flex';

  startInactivityTimer();  // Start the inactivity timer upon login
}

let currentLog = '';
function loadLog(logName) {
  currentLog = logName;
  fetchLog();
}

function fetchLog() {
  if (!currentLog) return;
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

// Auto-refresh logs every 5s
setInterval(() => {
  if (currentLog) fetchLog();
}, 5000);

// Inactivity Timer - Logs out the admin after 5 minutes of inactivity
let inactivityTimer;
function startInactivityTimer() {
  clearTimeout(inactivityTimer);  // Clear any existing timeout
  inactivityTimer = setTimeout(logout, 5 * 60 * 1000);  // Logout after 5 minutes
}

// Function to logout the admin
function logout() {
  localStorage.removeItem('loggedIn');  // Remove login state from localStorage
  document.getElementById('login-box').style.display = 'flex';  // Show the login box again
  document.getElementById('panel').style.display = 'none';  // Hide the log panel
  alert('You have been logged out due to inactivity.');
}

// Reset the inactivity timer on any panel interaction (e.g., click or log fetch)
document.getElementById('panel').addEventListener('click', startInactivityTimer);
