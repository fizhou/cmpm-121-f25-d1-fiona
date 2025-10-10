import "./style.css";

let counter: number = 0;

const button = document.createElement("button");
const counterElement = document.createElement("counter");
button.textContent = "🐈‍⬛";

function handleButtonClick() {
  counter += 1;
  counterElement.textContent = `${counter} cats`;
}

button.addEventListener("click", handleButtonClick);

setInterval(handleButtonClick, 1000);

document.body.appendChild(button);
document.body.appendChild(counterElement);
