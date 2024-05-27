import { ST } from "../state.js";
import { updateDisplay } from "../display.js";

export function handleNumber(numValue) {
  if ((numValue === "0" || numValue === "00") && displayText.innerHTML === "0") {
    return;
  }
  if (ST.operator === "%") {
    ST.displayValue += numValue
    updateDisplay(ST.displayValue);
    return;
  }
  if (ST.awaitingNewInput || ST.repeatLastOperation) {
    ST.displayValue = numValue;
    updateDisplay(ST.displayValue);
    ST.awaitingNewInput = false;
    ST.repeatLastOperation = false;
  } else {
    ST.displayValue += numValue;
    updateDisplay(ST.displayValue);
  }
  if (ST.operator && displayText.innerHTML === ST.firstNumber && ST.secondNumber === null) {
    ST.displayValue = numValue;
    updateDisplay(ST.displayValue);
  }
  if (!ST.operator) {
    ST.firstNumber = ST.displayValue;
  } else {
    ST.secondNumber = ST.displayValue;
  }
  ST.memoryRecallPressed = 0;
}