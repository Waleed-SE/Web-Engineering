# 3D Product Card with Dark Mode

## Introduction
I implemented this project to create a visually engaging product card that features a 3D flip animation. The product card dynamically displays product details using JavaScript, and a dark mode toggle is included for a better user experience.

## Features
- **3D Flip Animation**: The product card flips smoothly when hovered, revealing additional details.
- **Dynamic Content**: Product details are loaded from a JavaScript object instead of hardcoded HTML.
- **CSS Grid Layout**: The product card's content is structured using CSS Grid for proper alignment.
- **Dark Mode Toggle**: A button allows users to switch between light and dark themes.
- **Buy Now Button**: Clicking this button logs the selected product's name to the console.

## File Structure
```
├── index.html       # Main HTML file
├── styles.css       # Styles for layout, animation, and dark mode
├── script.js        # JavaScript for dynamic content and interactivity
├── README.md        # Project documentation
```

## Implementation Details
### **1. HTML (index.html)**
I structured the webpage with a container for product cards and a button for toggling dark mode. The `<script>` tag at the end of the body loads JavaScript functionality.

### **2. CSS (styles.css)**
I used CSS Grid to align the product cards properly. The 3D flip animation is achieved using the `transform-style: preserve-3d` and `rotateY(180deg)` properties. Dark mode is handled with a `.dark-mode` class that changes background colors.

### **3. JavaScript (script.js)**
- I stored product details in an array of objects.
- The script dynamically generates product cards and inserts them into the DOM.
- The dark mode toggle is implemented by adding/removing a `.dark-mode` class to the `<body>`.
- Clicking the "Buy Now" button logs the selected product's name to the console.

## How to Run
1. Open `index.html` in a web browser.
2. Hover over a product card to see the flip animation.
3. Click the "Toggle Dark Mode" button to switch themes.
4. Click "Buy Now" to log the selected product's name in the console.

## Conclusion
This project showcases how CSS and JavaScript can be combined to create an interactive and visually appealing product card. The dynamic content and dark mode toggle enhance the user experience.

