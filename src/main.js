import { handleNumberInput, handleOperatorInput, handleSpecialInput } 
from './modules/input/index.js';
import { toggleDarkMode, setSizeController } from './modules/utils.js';
  
const displayText = document.getElementById("displayText");
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

toggleDarkMode();
setSizeController();

function handleUserInput(e) {
  const target = e.target;
  const value = target.dataset.value;

  if (target.classList.contains("number")) {
    handleNumberInput(value);
  } else if (target.classList.contains("special")) {
    handleSpecialInput(value);
  } else if (target.classList.contains("operator")) {
    handleOperatorInput(value);
  } else if (target.classList.contains("memory")) {
    handleMemoryInput(value);
  }
}