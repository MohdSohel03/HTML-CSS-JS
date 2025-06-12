function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let amPm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Add leading zeros
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let timeString = `${hours}:${minutes}:${seconds} ${amPm}`;
    document.getElementById("digital-clock").textContent = timeString;

    // Integer Date Format (DD/MM/YYYY)
    let day = now.getDate();
    let month = now.getMonth() + 1; // Months are 0-based in JS
    let year = now.getFullYear();

    // Add leading zero to date/month if needed
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    let dateString = `${day}/${month}/${year}`;
    document.getElementById("date").textContent = dateString;

    // Get Day Name
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayName = days[now.getDay()];
    document.getElementById("day").textContent = dayName;
}

// Light/Dark Mode Toggle
document.getElementById("theme-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Change button icon
    let button = document.getElementById("theme-toggle");
    button.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Update clock every second
setInterval(updateClock, 1000);
updateClock();
