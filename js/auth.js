
function showLogin() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('signupForm').style.display = 'none';
}

function showSignup() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'block';
}

const params = new URLSearchParams(window.location.search);
const mode = params.get('mode');
if (mode === 'signup') {
  showSignup();
} else {
  showLogin();
}

function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const role = document.getElementById('loginRole').value;

  if (!email || !password) {
    document.getElementById('loginError').innerText = 'Please enter email and password';
    return;
  }

  localStorage.setItem('userEmail', email);
  localStorage.setItem('userRole', role);

  window.location.href = 'Exam-portal.html';
}


function signup() {
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const role = document.getElementById('signupRole').value;

  if (!email || !password) {
    document.getElementById('signupError').innerText = 'Please enter email and password';
    return;
  }

  localStorage.setItem('userEmail', email);
  localStorage.setItem('userRole', role);

  window.location.href = 'Exam-portal.html';
}
