// document.addEventListener("DOMContentLoaded", function () {
//     setTimeout(() => {
//         const hiddenText = document.getElementById("p1-text");
//         let text = [" A Hard Worker", " Determined", "Problem Solver"]; // The hidden text
//         hiddenText.innerText = ""; // Clear content before typing
//         hiddenText.style.visibility = "visible"; // Make visible before typing

//         let i = 0;

//         let typingInterval = setInterval(() => {
//             if (i < text.length) {
//                 hiddenText.textContent += text[i]; // Append character (spaces included)
//                 i++;
//             } else {
//                 clearInterval(typingInterval); // Stop interval when done
//             }
//         }, 100); // Adjust typing speed here
//     }, 2000); // Delay before the text starts appearing
// });

document.addEventListener("DOMContentLoaded", function () {
    const heading = document.getElementById("p1-text");
    const texts = [" A Hard Worker", " Determined", " Problem Solver"]

    heading.style.fontSize = "1.5em";
    heading.style.visibility = "visible";
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = texts[textIndex];
        const visibleText = currentText.substring(0, charIndex);
        heading.innerHTML = visibleText + "<span class='cursor'>|</span>"; // Update text

        if (!isDeleting) {
            if (charIndex < currentText.length) {
                charIndex++;
            } else {
                isDeleting = true;
                setTimeout(typeEffect, 2000); // Wait 2s before deleting
                return;
            }
        } else {
            if (charIndex > 0) {
                charIndex--;
            } else {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length; // Move to next text
            }
        }
        setTimeout(typeEffect, isDeleting ? 10 : 100); // Typing speed (faster deletion)
    }

    typeEffect(); // Start animation
});
