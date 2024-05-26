import { calcState } from "./state.js";

function updateDisplay(value) {
  if (calcState.awaitingNewInput) {
    displayText.innerHTML = "";
    calcState.awaitingNewInput = false;
  }
  calcState.displayValue = value.toString();
  if (calcState.displayValue.length > 14) {
    calcState.displayValue = calcState.displayValue.substring(0, 14);
  }
  if (displayText.innerHTML !== calcState.displayValue) {
    displayText.innerHTML = calcState.displayValue;
  }
}

function clearAll() {
  calcState.firstNumber = null;
  calcState.operator = null;
  calcState.secondNumber = null;
  calcState.awaitingNewInput = null;
  calcState.lastOperator = null;
  calcState.lastSecondNumber = null;
  calcState.repeatLastOperation = false;
  calcState.memoryNumber = 0;
  calcState.memoryRecallPressed = 0;
  calcState.memoryPlusPressed = 0;
  calcState.memoryMinusPressed = 0;
  calcState.grandTotal = 0;
  calcState.displayValue = "";
  displayText.innerHTML = "0";
}

function clearEntry() {
  displayText.innerHTML = "0";
  calcState.displayValue = "";
  if (calcState.operator) {
    calcState.secondNumber = null;
  } else {
    calcState.firstNumber = null;
  }
}

function clearOne() {
  if (displayText.innerHTML.length === 1 || displayText.innerHTML === "0") {
    calcState.displayValue = "";
    displayText.innerHTML = "0";
    if (calcState.operator) {
      calcState.secondNumber = null;
    } else {
      calcState.firstNumber = null;
    }
  } else {
    calcState.displayValue = displayText.innerHTML.slice(0, -1);
    if (calcState.operator) {
      calcState.secondNumber = calcState.displayValue;
    } else {
      calcState.firstNumber = calcState.displayValue;
    }
    updateDisplay(calcState.displayValue);
  }
}

export { updateDisplay, clearAll, clearEntry, clearOne }