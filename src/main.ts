import "./style.css";

let previousTime = performance.now();
let meows: number = 0;
let meowsPerSecond = 0;

type Item = {
  key: string;
  name: string;
  cost: number;
  rateIncrease: number;
  countTotal: number;
  lore: string;
  button?: HTMLButtonElement;
};

const items: Item[] = [
  {
    key: "Tabby Scout",
    name: "Tabby Scout",
    cost: 10,
    rateIncrease: 0.1,
    countTotal: 0,
    lore: "First to emerge from the Cardboard Rift. Always hungry.",
  },
  {
    key: "Purrseus",
    name: "Purrseus",
    cost: 100,
    rateIncrease: 2.0,
    countTotal: 0,
    lore: "A constellation given flesh during the Great Yarnfall.",
  },
  {
    key: "Voidmew",
    name: "Voidmew",
    cost: 1000,
    rateIncrease: 50.0,
    countTotal: 0,
    lore: "Forgot to not exist. Emits inverse meows.",
  },
];

const mainButton = document.createElement("button");
mainButton.id = "main-button";
mainButton.textContent = "MEOW🐈‍⬛";

const counterTotal = document.createElement("div");
counterTotal.textContent = "0 MEOWS";

const rateElement = document.createElement("div"); // current growth rate display
const counterElement = document.createElement("div"); // per-item count display

const loreSpan = document.createElement("span");
loreSpan.className = "lore-tooltip";

document.body.appendChild(mainButton);
document.body.appendChild(counterTotal);
document.body.appendChild(rateElement);
document.body.appendChild(counterElement);
document.body.appendChild(loreSpan);

const shopContainer = document.createElement("div");
shopContainer.id = "shop-container";
document.body.appendChild(shopContainer);

for (const it of items) {
  const itemButton = document.createElement("button");
  itemButton.id = `item-${it.key}`;
  itemButton.textContent =
    `${it.name} ($-{it.cost} Meows) | +${it.rateIncrease}/s`;
  itemButton.disabled = true;
  itemButton.addEventListener("click", () => handleUpgradePurchase(it));
  it.button = itemButton;
  shopContainer.appendChild(itemButton);

  itemButton.addEventListener("mouseenter", () => {
    loreSpan.textContent = it.lore;
  });
  itemButton.addEventListener("mouseleave", () => {
    loreSpan.textContent = "";
  });
}

function updateUpgradeState() {
  for (const it of items) {
    if (it.button) {
      it.button.disabled = meows < it.cost;
    }
  }
}

function renderStatus() {
  counterTotal.textContent = `${meows.toFixed(1)} Meows`;
  rateElement.textContent = `Growth Rate: ${meowsPerSecond.toFixed(1)} Meows/s`;

  counterElement.textContent = items.map((it) => `${it.key}: ${it.countTotal}`)
    .join(" | ");

  for (const it of items) {
    if (it.button) {
      it.button.textContent =
        `${it.name} (-${it.cost} Meows) | +${it.rateIncrease}/s`;
    }
  }
}

function update(currentTime: number) {
  const deltaTime = (currentTime - previousTime) / 1000;
  previousTime = currentTime;

  meows += meowsPerSecond * deltaTime;

  renderStatus();
  updateUpgradeState();

  requestAnimationFrame(update);
}

function handleUpgradePurchase(it: Item) {
  if (meows >= it.cost) {
    meows -= it.cost;
    meowsPerSecond += it.rateIncrease;
    it.countTotal += 1;

    const nextCost = it.cost * 1.15;
    it.cost = Math.round(nextCost * 100) / 100;

    renderStatus();
    updateUpgradeState();
  }
}

function handleButtonClick() {
  meows += 1;
  renderStatus();
  updateUpgradeState();
}

mainButton.addEventListener("click", handleButtonClick);
requestAnimationFrame(update);
