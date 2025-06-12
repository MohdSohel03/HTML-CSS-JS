function toggleMode() {
    document.body.classList.toggle('light');
}

function toggleMenu() {
    document.getElementById('nav-links').classList.toggle('show');
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});

(function () {
    emailjs.init("gfw60VbCzbF5d1FJX"); //  EmailJS user ID
})();

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    emailjs.sendForm('service_rs7spkg', 'template_85tk6aj', this) // 'service_xxx', 'template_abc123'
        .then(() => alert('Message sent successfully!'))
        .catch((error) => alert('Message failed: ' + error));
});