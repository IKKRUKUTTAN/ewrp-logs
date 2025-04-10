const apiBase = "https://raw.githubusercontent.com/RIGHTGAMER/ewrp-logs/main";
const sessionDuration = 5 * 60 * 1000; // 5 minutes in ms

// ✅ On load: try to resume session
window.onload = () => {
  const session = localStorage.getItem("panel_session");
  const expire = localStorage.getItem("panel_expiry");

  if (session === "active" && expire && Date.now() < parseInt(expire)) {
    showPanel();
  } else {
    showLogin(); // show login page instead of reloading
  }
};

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user !== 'admin' || pass !== 'IKKRUDEV') {
    alert('❌ Wrong credentials');
    return;
  }

  // ✅ Start new session
  localStorage.setItem("panel_session", "active");
  localStorage.setItem("panel_expiry", (Date.now() + sessionDuration).toString());

  showPanel();
}

function logout() {
  localStorage.removeItem("panel_session");
  localStorage.removeItem("panel_expiry");
  showLogin(); // avoid reload spam
}

function showPanel() {
  document.getElementById('login-box').style.display = 'none';
  document.getElementById('panel').style.display = 'flex';
}

function showLogin() {
  document.getElementById('login-box').style.display = 'flex';
  document.getElementById('panel').style.display = 'none';
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
  const session = localStorage.getItem("panel_session");
  const expire = localStorage.getItem("panel_expiry");
  if (session === "active" && Date.now() < parseInt(expire)) {
    if (currentLog) fetchLog();
  } else {
    logout(); // expire session cleanly
  }
}, 5000);
