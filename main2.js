import { formatResult, clearAll, clearEntry, clearOne } from "./modules/utils";
import { setupDarkTheme, keyboardSupport, displayBlink } from "./modules/ui";
import { handleNumber, handleSpecial, handleOperator, handleMemory } from "./modules/handlers";  // Assuming these are exported from handlers module

/* Initialize UI */
setupDarkTheme();
keyboardSupport();
displayBlink();

/* Get user input values */
document.addEventListener("DOMContentLoaded", () => {
  const numberButtons = document.querySelectorAll(".button.number");
  const specialButtons = document.querySelectorAll('.button.special');
  const operatorButtons = document.querySelectorAll('.button.operator');
  const memoryButtons = document.querySelectorAll('.button.memory');

  valueGetter(numberButtons);
  valueGetter(specialButtons);
  valueGetter(operatorButtons);
  valueGetter(memoryButtons);
});

function valueGetter(buttons) {
  buttons.forEach(button => {
    button.addEventListener("click", function (event) {
      const target = event.target;
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
    });
  });
}
