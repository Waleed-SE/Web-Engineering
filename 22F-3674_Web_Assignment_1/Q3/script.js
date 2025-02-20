document
  .getElementById("transform-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const string = document.getElementById("string").value.trim();
    let skipInterval;
    if (document.getElementById("toggle-button").value === "0") {
      skipInterval = document
        .getElementById("skip-setting")
        .value.trim()
        .match(/\d+/g)
        ?.join("")
        .split("")
        .map((digit) => parseInt(digit))
        .reduce((sum, num) => sum + num, 0);
    } else {
      skipInterval = document.getElementById("skip-setting").value.trim();
    }
    // console.log(skipInterval);

    displayResult(
      string,
      transformAfterRemovingString(string, skipInterval),
      transformBeforeRemovingString(string, skipInterval)
    );
  });

const transformAfterRemovingString = (string, skipInterval) => {
  const transformedString = string
    .split("")
    .map((char, index) => {
      return (index + 1) % skipInterval == 0 ? "" : char;
    })
    .reverse(); // I am Not clear about first reverse then delete skipinteval cahracter or first remove skipinterval character than reverse So Giving Both But Just Commenting 1

  return transformedString.join("");
};

const transformBeforeRemovingString = (string, skipInterval) => {
  const transformedString = string
    .split("")
    .reverse()
    .map((char, index) => {
      return (index + 1) % skipInterval == 0 ? "" : char;
    }); // I am Not clear about first reverse then delete skipinteval cahracter or first remove skipinterval character than reverse So Giving Both But Just Commenting 1

  return transformedString.join("");
};

const displayResult = (
  originalString,
  transformedString,
  transformedString2
) => {
  const resultList = document.getElementById("string-list");
  const listItem = document.createElement("li");
  listItem.innerHTML = `<strong>Original:</strong> ${originalString} <br><strong>Transformed First Reverse Than Remove:</strong> ${transformedString}<br><strong>Transformed First Remove Than Reverse:</strong> ${transformedString2}`;
  resultList.appendChild(listItem);
};

document.getElementById("toggle-button").addEventListener("click", () => {
  const rollNoLabel = document.querySelector('label[for="skip-setting"]');
  const rollNoInput = document.getElementById("skip-setting");

  if (rollNoLabel.textContent === "Enter your roll number:") {
    rollNoLabel.textContent = "Enter skip interval:";
    rollNoInput.placeholder = "Enter manual skip interval";
    document.getElementById("toggle-button").value = 1;
  } else {
    rollNoLabel.textContent = "Enter your roll number:";
    rollNoInput.placeholder = "Enter Only Numbers Without Any space or Comma";
    document.getElementById("toggle-button").value = 0;
  }
});
