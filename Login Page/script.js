function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const eyeIcon = passwordField.parentElement.querySelector('.eye-btn');

    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passwordField.type = "password";
        eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function switchForm(formType) {
    document.querySelector('.login').classList.toggle('active', formType === 'login');
    document.querySelector('.signup').classList.toggle('active', formType === 'signup');
}