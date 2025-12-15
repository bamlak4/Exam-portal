
const userEmail = localStorage.getItem('userEmail');
const userRole = localStorage.getItem('userRole');

if (!userEmail) {

  window.location.href = 'login-signup.html';
} else {
 
  document.getElementById('welcomeMsg').innerText = `Welcome ${userRole.toUpperCase()} - ${userEmail}`;
}
