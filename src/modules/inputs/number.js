import { calcState } from "../state.js";
import { updateDisplay } from "../buffer.js";

export function handleNumber(numValue) {
  if ((numValue === "0" || numValue === "00") && displayText.innerHTML === "0") {
    return;
  }
  if (calcState.operator === "%") {
    calcState.displayValue += numValue
    updateDisplay(calcState.displayValue);
    return;
  }
  if (calcState.awaitingNewInput || calcState.repeatLastOperation) {
    calcState.displayValue = numValue;
    updateDisplay(calcState.displayValue);
    calcState.awaitingNewInput = false;
    calcState.repeatLastOperation = false;
  } else {
    calcState.displayValue += numValue;
    updateDisplay(calcState.displayValue);
  }
  if (calcState.operator && displayText.innerHTML === calcState.firstNumber && calcState.secondNumber === null) {
    calcState.displayValue = numValue;
    updateDisplay(calcState.displayValue);
  }
  if (!calcState.operator) {
    calcState.firstNumber = calcState.displayValue;
  } else {
    calcState.secondNumber = calcState.displayValue;
  }
  calcState.memoryRecallPressed = 0;
}