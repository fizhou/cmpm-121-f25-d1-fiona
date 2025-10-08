import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

let counter: number = 0;

const button = document.createElement("button");
const counterElement = document.createElement("counter");
button.textContent = "🐈‍⬛";

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = `${counter} cats`;
});

document.body.appendChild(button);
document.body.appendChild(counterElement);