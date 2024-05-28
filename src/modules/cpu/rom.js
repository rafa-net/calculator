import { state } from "../state.js";

function clearAll() {
  state.firstNumber = null;
  state.operator = null;
  state.secondNumber = null;
  state.previousOperand = null;
  state.previousOperator = null;
  state.awaitingNewInput = false;
  state.repeatLastOperation = false;
  state.numberBox = "";
  state.grandTotal = 0;
  displayText.innerHTML = "0";
}

function clearEntry() {
    displayText.innerHTML = "0";
    state.numberBox = "";
    if (!state.operator) {
      state.firstNumber = null;
    } else {
      state.secondNumber = null;
    }
  }

function clearOne() {
  if (displayText.innerHTML.length === 1 || displayText.innerHTML === "0") {
    state.numberBox = "";
    displayText.innerHTML = "0";

    if (state.operator) {
      state.secondNumber = null;
    } else {
      state.firstNumber = null;
    }

  } else {
    state.numberBox = displayText.innerHTML.slice(0, -1);

    if (state.operator) {
      state.secondNumber = state.numberBox;
    } else {
      state.firstNumber = state.numberBox;
    }

    displayRefresh(state.numberBox);
  }
}

function addPoint() {

  if (displayText.innerHTML === "0" && !state.numberBox.includes(".")) {
    state.numberBox = "0.";
  }
  if (!state.numberBox.includes(".") && state.awaitingNewInput && state.firstNumber !== 0) {
    state.numberBox = "0.";
  }
  if (!state.numberBox.includes(".")) {
    state.numberBox += ".";
  }

  displayRefresh(state.numberBox);
}

function processResult(result) {
  if (result === undefined) return result + "";
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

function displayRefresh(value) {
  if (state.awaitingNewInput) {
    displayText.innerHTML = "";
    state.awaitingNewInput = false;
  }
  state.numberBox = value.toString();
  if (state.numberBox.length > 14) {
    state.numberBox = state.numberBox.substring(0, 14);
  }
  if (displayText.innerHTML !== state.numberBox) {
    displayText.innerHTML = state.numberBox;
  }
}

export { clearAll, clearEntry, clearOne, addPoint, processResult, displayRefresh };