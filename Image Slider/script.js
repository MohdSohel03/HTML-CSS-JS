let angle = 0;

function rotateCarousel(direction) {
    angle += direction * 60;
    document.querySelector(".carousel").style.transform = `rotateY(${angle}deg)`;
}

setInterval(() => {
    rotateCarousel(1);
}, 5000); // Auto-slide every 5 seconds