document.addEventListener("DOMContentLoaded", function () {
    const faqData = [
        { question: "What is your return policy?", answer: "We offer a 30-day money-back guarantee." },
        { question: "How can I contact support?", answer: "You can reach us via email at support@example.com." },
        { question: "Do you offer international shipping?", answer: "Yes, we ship worldwide with standard rates." }
    ];

    const faqContainer = document.getElementById("faq-container");

    faqData.forEach(item => {
        const faqItem = document.createElement("div");
        faqItem.classList.add("faq-item");
        
        faqItem.innerHTML = `
            <div class="question">${item.question}</div>
            <div class="answer">${item.answer}</div>
        `;

        faqContainer.appendChild(faqItem);
    });
});