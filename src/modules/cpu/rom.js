import { ST } from "../state.js";
import { updateDisplay } from "../display.js";

function clearAll() {
  ST.firstNumber = null;
  ST.operator = null;
  ST.secondNumber = null;
  ST.awaitingNewInput = null;
  ST.lastOperator = null;
  ST.lastOperand = null;
  ST.repeatLastOperation = false;
  ST.memoryNumber = 0;
  ST.memoryRecallPressed = 0;
  ST.memoryPlusPressed = 0;
  ST.memoryMinusPressed = 0;
  ST.grandTotal = 0;
  ST.displayValue = "";
  displayText.innerHTML = "0";
}

function clearEntry() {
  displayText.innerHTML = "0";
  ST.displayValue = "";
  if (ST.operator) {
    ST.secondNumber = null;
  } else {
    ST.firstNumber = null;
  }
}

function clearOne() {
  if (displayText.innerHTML.length === 1 || displayText.innerHTML === "0") {
    ST.displayValue = "";
    displayText.innerHTML = "0";
    if (ST.operator) {
      ST.secondNumber = null;
    } else {
      ST.firstNumber = null;
    }
  } else {
    ST.displayValue = displayText.innerHTML.slice(0, -1);
    if (ST.operator) {
      ST.secondNumber = ST.displayValue;
    } else {
      ST.firstNumber = ST.displayValue;
    }
    updateDisplay(ST.displayValue);
  }
}

function addPoint() {
  if (displayText.innerHTML === "0" && !ST.displayValue.includes(".")) {
    ST.displayValue = "0.";
  }
  if (!ST.displayValue.includes(".") && ST.awaitingNewInput && ST.firstNumber !== 0) {
    ST.displayValue = "0.";
  }
  if (!ST.displayValue.includes(".")) {
    ST.displayValue += ".";
  }
  updateDisplay(ST.displayValue);
}

function formatResult(result) {
  if (Number.isInteger(result)) {
    if (String(result).length > 14) {
      let processedInteger = result.toString();
      processedInteger = processedInteger.substring(0, 14);
      return processedInteger;
    }
    return result.toString();
  } else {
    let resultString = result.toString();
    let [integerPart, fractionalPart] = resultString.split(".");
    fractionalPart = fractionalPart || "";
    let maxDecimalPlaces = 13 - (integerPart.length);
    if (maxDecimalPlaces < 0) {
      maxDecimalPlaces = 0;
    }
    return result.toFixed(maxDecimalPlaces);
  }
}

export { clearAll, clearEntry, clearOne, addPoint, formatResult };