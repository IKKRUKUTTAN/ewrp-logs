const apiBase = "https://raw.githubusercontent.com/RIGHTGAMER/ewrp-logs/main/logs";

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
