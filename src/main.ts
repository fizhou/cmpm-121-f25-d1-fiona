import "./style.css";

let previousTime = performance.now();
let counter: number = 0;

const button = document.createElement("button");
const counterElement = document.createElement("div");
button.textContent = "🐈‍⬛";
counterElement.textContent = "0 cats";

function update(currentTime: number) {
  const deltaTime = (currentTime - previousTime) / 1000;
  previousTime = currentTime;

  counter += deltaTime;
  counterElement.textContent = `${counter.toFixed(1)} cats`;
  requestAnimationFrame(update);
}

function handleButtonClick() {
  counter += 1;
  counterElement.textContent = `${counter.toFixed(1)} cats`;
}

button.addEventListener("click", handleButtonClick);

requestAnimationFrame(update);
document.body.appendChild(button);
document.body.appendChild(counterElement);
