import "./style.css";

let previousTime = performance.now();
let counter: number = 0;
let growthRate = 0;

type Item = {
  key: string;
  name: string;
  cost: number;
  rateIncrease: number;
  countTotal: number;
  button?: HTMLButtonElement;
};

const items: Item[] = [
  { key: "Kitten", name: "Kitten", cost: 10, rateIncrease: 0.1, countTotal: 0 },
  { key: "Cat", name: "Cat", cost: 100, rateIncrease: 2.0, countTotal: 0 },
  {
    key: "Fat Cat",
    name: "Fat Cat",
    cost: 1000,
    rateIncrease: 50.0,
    countTotal: 0,
  },
];

const mainButton = document.createElement("button");
mainButton.id = "main-button";
mainButton.textContent = "🐈‍⬛";

const counterTotal = document.createElement("div");
counterTotal.textContent = "0 Cats";

const rateElement = document.createElement("div"); // current growth rate display
const counterElement = document.createElement("div"); // per-item count display

document.body.appendChild(mainButton);
document.body.appendChild(counterTotal);
document.body.appendChild(rateElement);
document.body.appendChild(counterElement);

const shopContainer = document.createElement("div");
shopContainer.id = "shop-container";
document.body.appendChild(shopContainer);

for (const it of items) {
  const itemButton = document.createElement("button");
  itemButton.id = `item-${it.key}`;
  itemButton.textContent =
    `${it.name} ($-{it.cost} Cats) | +${it.rateIncrease}/s`;
  itemButton.disabled = true;
  itemButton.addEventListener("click", () => handleUpgradePurchase(it));
  it.button = itemButton;
  shopContainer.appendChild(itemButton);
}

function updateUpgradeState() {
  for (const it of items) {
    if (it.button) {
      it.button.disabled = counter < it.cost;
    }
  }
}

function renderStatus() {
  counterTotal.textContent = `${counter.toFixed(1)} Cats`;
  rateElement.textContent = `Growth Rate: ${growthRate.toFixed(1)} Cats/s`;

  counterElement.textContent = items.map((it) => `${it.key}: ${it.countTotal}`)
    .join(" | ");

  for (const it of items) {
    if (it.button) {
      it.button.textContent =
        `${it.name} (-${it.cost} Cats) | +${it.rateIncrease}/s`;
    }
  }
}

function update(currentTime: number) {
  const deltaTime = (currentTime - previousTime) / 1000;
  previousTime = currentTime;

  counter += growthRate * deltaTime;

  renderStatus();
  updateUpgradeState();

  requestAnimationFrame(update);
}

function handleUpgradePurchase(it: Item) {
  if (counter >= it.cost) {
    counter -= it.cost;
    growthRate += it.rateIncrease;
    it.countTotal += 1;

    const nextCost = it.cost * 1.15;
    it.cost = Math.round(nextCost * 100) / 100;

    renderStatus();
    updateUpgradeState();
  }
}

function handleButtonClick() {
  counter += 1;
  renderStatus();
  updateUpgradeState();
}

mainButton.addEventListener("click", handleButtonClick);
requestAnimationFrame(update);
