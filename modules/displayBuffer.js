function updateDisplay(value) {
  if (awaitingNewInput) {
    displayText.innerHTML = "";
    awaitingNewInput = false;
  }
  displayValue = value.toString();
  if (displayValue.length > 14) {
    displayValue = displayValue.substring(0, 14);
  }
  if (displayText.innerHTML !== displayValue) {
    displayText.innerHTML = displayValue;
  }
}

function clearAll() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  awaitingNewInput = null;
  lastOperator = null;
  lastSecondNumber = null;
  repeatLastOperation = false;
  memoryNumber = 0;
  memoryRecallPressed = 0;
  memoryPlusPressed = 0;
  displayValue = "";
  displayText.innerHTML = "0";
}

function clearEntry() {
  displayText.innerHTML = "0";
  displayValue = "";
  if (operator) {
    secondNumber = null;
  } else {
    firstNumber = null;
  }
}

function clearOne() {
  if (displayText.innerHTML.length === 1 || displayText.innerHTML === "0") {
    displayValue = "";
    displayText.innerHTML = "0";
    if (operator) {
      secondNumber = null;
    } else {
      firstNumber = null;
    }
  } else {
    displayValue = displayText.innerHTML.slice(0, -1);
    if (operator) {
      secondNumber = displayValue;
    } else {
      firstNumber = displayValue;
    }
    updateDisplay(displayValue);
  }
}