import { ST } from "../state.js";
import { updateDisplay } from "../display.js";

export function handleNumberInput(numValue) {
  if ((numValue === "0" || numValue === "00") && displayText.innerHTML === "0" && !ST.displayValue.includes(".")) {
    return;
  }

  if (ST.awaitingNewInput || ST.repeatLastOperation) {
    ST.displayValue = "";
    ST.awaitingNewInput = false;
    ST.repeatLastOperation = false;
  }

  ST.displayValue += numValue;
  updateDisplay(ST.displayValue);

  if (!ST.operator) {
    ST.firstNumber = ST.displayValue;
  } else {
    ST.secondNumber = ST.displayValue;
  }
  
  ST.memoryRecallPressed = 0;
}
