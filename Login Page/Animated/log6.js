// Toggle password visibility for Sign Up form
const toggleSignUpPassword = document.getElementById('toggleSignUpPassword');
const signUpPassword = document.getElementById('signUpPassword');

toggleSignUpPassword.addEventListener('click', () => {
    const type = signUpPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    signUpPassword.setAttribute('type', type);
    toggleSignUpPassword.textContent = type === 'password' ? '👁️' : '🙈';
});

// Toggle password visibility for Sign In form
const toggleSignInPassword = document.getElementById('toggleSignInPassword');
const signInPassword = document.getElementById('signInPassword');

toggleSignInPassword.addEventListener('click', () => {
    const type = signInPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    signInPassword.setAttribute('type', type);
    toggleSignInPassword.textContent = type === 'password' ? '👁️' : '🙈';
});

// Toggle between sign-up and sign-in forms
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});
