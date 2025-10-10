import "./style.css";

let previousTime = performance.now();
let counter: number = 0;
let growthRate = 0;

const UPGRADE_COST = 10;
const button = document.createElement("button");
button.id = "button";
const upgradeButton = document.createElement("button");
upgradeButton.disabled = true;
upgradeButton.id = "upgradeButton";
const counterElement = document.createElement("div");

button.textContent = "🐈‍⬛";
upgradeButton.textContent = `Upgrade Cat Rate by 1! (-${UPGRADE_COST})`;
counterElement.textContent = "0 cats";

function updateUpgradeState() {
  upgradeButton.disabled = counter < UPGRADE_COST;
}

function update(currentTime: number) {
  const deltaTime = (currentTime - previousTime) / 1000;
  previousTime = currentTime;

  counter += growthRate * deltaTime;
  counterElement.textContent = `${counter.toFixed(1)} cats`;

  updateUpgradeState();
  requestAnimationFrame(update);
}

function handleUpgradePurchase() {
  if (counter >= UPGRADE_COST) {
    counter -= UPGRADE_COST;
    growthRate += 1;
    counterElement.textContent = `${counter.toFixed(1)} cats`;

    updateUpgradeState();
  }
}

function handleButtonClick() {
  counter += 1;
  counterElement.textContent = `${counter.toFixed(1)} cats`;
}

button.addEventListener("click", handleButtonClick);
upgradeButton.addEventListener("click", handleUpgradePurchase);

requestAnimationFrame(update);

document.body.appendChild(button);
document.body.appendChild(upgradeButton);
document.body.appendChild(counterElement);
