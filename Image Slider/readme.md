# 🎠 3D Image Slider

A **stunning 3D image carousel** built with **HTML, CSS, and JavaScript**. This rotating slider creates an immersive experience using perspective and rotation, enhanced with smooth transitions and navigation controls.

---

## ✨ Features

- 🎞️ **3D Rotating Carousel** effect using `rotateY` and `translateZ`
- 🖼️ **6 images** displayed in a circular layout
- 🔁 **Auto-slide** every 5 seconds
- ⏪ Manual **Previous/Next** buttons with smooth rotation
- 🖌️ Modern design with subtle shadows and rounded corners
- 🌙 Dark theme background using linear gradient

---

## 📁 File Structure

```
📁 3D-Image-Slider/
├── index.html       # Main HTML structure
├── style.css        # Styles for layout, 3D effect, and design
├── script.js        # JavaScript for rotating the carousel
├── images/          # Folder with images (City.jpg, Animal.webp, etc.)
└── README.md        # Project documentation
```

---

## 🔧 How It Works

- Each image is positioned using CSS `transform: rotateY(...) translateZ(...)` for 3D depth.
- The carousel is rotated by modifying the `rotateY` value dynamically via JavaScript.
- `setInterval()` auto-rotates the carousel every 5 seconds.
- Manual buttons (`Prev`, `Next`) trigger clockwise/counter-clockwise rotation.

---

## 🚀 How to Run

1. Clone or download the project.
    git clone https://github.com/MohdSohel03/HTML-CSS-JS/tree/4839c13fc8e14826a10fbd26e5bf5718cd65cff1/Image%20Slider
2. Add your own images to the directory or use the ones already present.
3. Open `index.html` in any modern browser.
4. Enjoy the 3D sliding effect!

---

## 📱 Responsive Note

This slider is currently optimized for desktop view. For mobile responsiveness and swipe support, consider:
- Media queries for dynamic scaling
- Adding swipe gesture listeners via JavaScript or a library like Hammer.js

---

## 📌 Customization Tips

- 🔄 Change `rotateY(60deg)` to a different angle to adjust spacing between slides.
- ⏱️ Modify the `setInterval()` duration in `script.js` to control slide speed.
- 🎨 Update background and colors in `style.css` to match your brand.

---

## 🪪 License

This project is open-source and available under the **MIT License**.  
Feel free to use, modify, and share it!

---

## ⭐ Feedback & Support

If you like the project or use it in your work, give it a ⭐ on GitHub and feel free to reach out for improvements, suggestions, or questions!

