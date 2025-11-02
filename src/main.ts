import "./style.css";

// --- Game State Variables ---
let previousTime = performance.now();
let currency: number = 0;
let growthRate = 0;

// --- Item Definitions ---
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
    key: "Cat",
    name: "Tabby Scout",
    cost: 10,
    rateIncrease: 0.1,
    countTotal: 0,
    lore: "First to emerge from the Cardboard Rift. Always hungry.",
  },
  {
    key: "Constellation",
    name: "Purrseus",
    cost: 100,
    rateIncrease: 2.0,
    countTotal: 0,
    lore: "A constellation given flesh during the Great Yarnfall.",
  },
  {
    key: "Entity",
    name: "Voidmew",
    cost: 1000,
    rateIncrease: 50.0,
    countTotal: 0,
    lore: "Forgot to not exist. Emits inverse meows.",
  },
];

// --- DOM Element Creation ---
const mainButton = document.createElement("button");
mainButton.id = "main-button";
mainButton.textContent = "MEOW🐈‍⬛";

const counterTotal = document.createElement("div");
counterTotal.textContent = "0 MEOWS";

const rateElement = document.createElement("div"); // current growth rate display
const counterElement = document.createElement("div"); // per-item count display

const loreSpan = document.createElement("span");
loreSpan.className = "lore-tooltip";
loreSpan.style.display = "none";

document.body.appendChild(mainButton);
document.body.appendChild(counterTotal);
document.body.appendChild(rateElement);
document.body.appendChild(counterElement);
document.body.appendChild(loreSpan);

const shopContainer = document.createElement("div");
shopContainer.id = "shop-container";
document.body.appendChild(shopContainer);

// --- UI Event Listeners ---
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
    showLore(it.lore);
  });
  itemButton.addEventListener("mouseleave", () => {
    clearLore();
  });
}

// --- Lore tooltip helpers ---
function showLore(text: string) {
  loreSpan.textContent = text;
  loreSpan.style.display = "inline";
}

function clearLore() {
  setTimeout(() => {
    loreSpan.textContent = "";
    loreSpan.style.display = "none";
  }, 150);
}

// --- Game Loop and Update Logic ---
function updateUpgradeState() {
  for (const it of items) {
    if (it.button) {
      it.button.disabled = currency < it.cost;
    }
  }
}

function renderStatus() {
  counterTotal.textContent = `${currency.toFixed(1)} Meows`;
  rateElement.textContent = `Growth Rate: ${growthRate.toFixed(1)} Meows/s`;

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

  currency += growthRate * deltaTime;

  renderStatus();
  updateUpgradeState();

  requestAnimationFrame(update);
}

function handleUpgradePurchase(it: Item) {
  if (currency >= it.cost) {
    currency -= it.cost;
    growthRate += it.rateIncrease;
    it.countTotal += 1;

    const nextCost = it.cost * 1.15;
    it.cost = Math.round(nextCost * 100) / 100;

    renderStatus();
    updateUpgradeState();
  }
}

function handleButtonClick() {
  currency += 1;
  renderStatus();
  updateUpgradeState();
}

mainButton.addEventListener("click", handleButtonClick);
requestAnimationFrame(update);
