import { handleNumber } from "./input/number.js";
import { handleSpecial } from "./input/special.js";
import { handleOperator } from "./input/operator.js";
import { handleMemory } from "./input/memory.js";

function handleUserInput(e) {
  const target = e.target;
  const value = target.dataset.value;

  if (target.classList.contains("number")) {
    handleNumber(value);
  } else if (target.classList.contains("special")) {
    handleSpecial(value);
  } else if (target.classList.contains("operator")) {
    handleOperator(value);
  } else if (target.classList.contains("memory")) {
    handleMemory(value);
  }
}

export function setupUserInteraction() {
  const displayDigits = document.getElementById('displayText');
  const allButtons = document.querySelectorAll(".button:not(#color-scheme-toggle)");

  allButtons.forEach(button => {
    button.addEventListener("click", event => handleUserInput(event, displayDigits));
    button.addEventListener("mousedown", () => {
      button.classList.add('keyboard-active');
      displayDigits.classList.add('display-blink');
    });

    button.addEventListener("mouseup", () => {
      button.classList.remove('keyboard-active');
      displayDigits.classList.remove('display-blink');
    });

    button.addEventListener("mouseleave", () => {
      button.classList.remove('keyboard-active');
      displayDigits.classList.remove('display-blink');
    });
  });

  document.addEventListener('keydown', (e) => {
    const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
    if (buttonPressed) {
      buttonPressed.click();
      buttonPressed.classList.add('keyboard-active');
      displayDigits.classList.add('display-blink');
    }
  });

  document.addEventListener('keyup', (e) => {
    const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
    if (buttonPressed) {
      buttonPressed.classList.remove('keyboard-active');
      displayDigits.classList.remove('display-blink');
    }
  });
}
