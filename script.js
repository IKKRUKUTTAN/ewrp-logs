const apiBase = "https://raw.githubusercontent.com/RIGHTGAMER/ewrp-logs/main";
const sessionDuration = 5 * 60 * 1000; // 5 minutes in ms

// ✅ Attempt session restore
window.onload = () => {
  const session = localStorage.getItem("panel_session");
  const expire = localStorage.getItem("panel_expiry");

  if (session === "active" && expire && Date.now() < parseInt(expire)) {
    showPanel();
  } else {
    logout(); // auto-expired
  }
};

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user !== 'admin' || pass !== 'IKKRUDEV') {
    alert('❌ Wrong credentials');
    return;
  }

  // ✅ Set session with 5 min expiry
  localStorage.setItem("panel_session", "active");
  localStorage.setItem("panel_expiry", (Date.now() + sessionDuration).toString());

  showPanel();
}

function showPanel() {
  document.getElementById('login-box').style.display = 'none';
  document.getElementById('panel').style.display = 'flex';
}

function logout() {
  localStorage.removeItem("panel_session");
  localStorage.removeItem("panel_expiry");
  location.reload();
}

let currentLog = '';

function loadLog(logName) {
  currentLog = logName;
  fetchLog();
}

function loadLogPrompt() {
  const date = prompt('Enter log file name (e.g. 10-04-2025.log):');
  if (date) loadLog(date);
}

function fetchLog() {
  if (!currentLog) return;

  fetch(`${apiBase}/${currentLog}`, {
    headers: {
      'Authorization': 'Basic ' + btoa('admin:IKKRUDEV')
    }
  })
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

// 🔁 Auto-refresh logs every 5 seconds
setInterval(() => {
  if (currentLog) fetchLog();
}, 5000);
