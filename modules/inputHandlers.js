function handleNumber(numValue) {
  if ((numValue === "0" || numValue === "00") && displayText.innerHTML === "0") {
    return;
  }
  if (operator === "%") {
    displayValue += numValue
    updateDisplay(displayValue);
    return;
  }
  if (awaitingNewInput || repeatLastOperation) {
    displayValue = numValue;
    updateDisplay(displayValue);
    awaitingNewInput = false;
    repeatLastOperation = false;
  } else {
    displayValue += numValue;
    updateDisplay(displayValue);
  }
  if (operator && displayText.innerHTML === firstNumber && secondNumber === null) {
    displayValue = numValue;
    updateDisplay(displayValue);
  }
  if (!operator) {
    firstNumber = displayValue;
  } else {
    secondNumber = displayValue;
  }
  memoryRecallPressed = 0;
}

function handleSpecial(specialValue) {
  switch (specialValue) {
    case "AC":
      clearAll();
      break;
    case "CE":
      clearEntry();
    case "bksp":
      clearOne();
      break;
    case ".":
      if (displayText.innerHTML === "0" && !displayValue.includes(".")) {
        displayValue = "0.";
      }
      if (!displayValue.includes(".") && awaitingNewInput && firstNumber !== 0) {
        displayValue = "0.";
      }
      if (!displayValue.includes(".")) {
        displayValue += ".";
      }
      updateDisplay(displayValue);
      break;
    case "=":
      handleOperator(null);
      break;
  }
  memoryRecallPressed = 0;
}

function handleOperator(symbol) {
  if (symbol === "sqrt") {
    handleSqrtOperation();
  } else if (symbol === '%' && !operator) {
    return;
  } else if (symbol === '%' && operator !== "%" && firstNumber !== null && displayValue !== "") {
    handlePercentageOperation();
  } else if (symbol === null && repeatLastOperation) {
    handleRepeatLastOperation();
  } else {
    handleStandardOperation(symbol);
  }

  if (symbol === null) {
    repeatLastOperation = true;
  }
  awaitingNewInput = true;
  memoryRecallPressed = 0;
}

function handleMemory(memory) {
  if (memory === "GT") {
    displayValue = grandTotal;
    firstNumber = displayValue;
    updateDisplay(displayValue);
    displayValue = "";
  }
  if (memoryRecallPressed > 1) {
    memoryNumber = 0;
    memoryPlusPressed = 0;
    memoryMinusPressed = 0;
  }
  if (memory === "MR" && memoryNumber === 0) {
    firstNumber = null;
    operator = null;
    secondNumber = null;
    lastOperator = null;
    lastSecondNumber = null;
    awaitingNewInput = null;
    repeatLastOperation = false;
    memoryRecallPressed = 0;
    memoryPlusPressed = 0;
    memoryMinusPressed = 0;
    displayValue = "0";
    updateDisplay(displayValue);
  } else if (memory === "MR" && memoryNumber !== 0) {
    displayValue = memoryNumber;
    updateDisplay(displayValue);
    memoryRecallPressed++;
    return;
  }
  if (memory === "M-" && memoryNumber === 0) {
    return;
  }
  else if (memory === "M-") {
    memoryNumber = (Number(memoryNumber) - Number(displayValue));
    displayValue = memoryNumber.toString();
    return;
  }

  if (memory === "M+" && memoryPlusPressed === 0) {
    memoryNumber = displayValue;
    memoryPlusPressed++;
    displayValue = "";
  } else if (memory === "M+" && memoryPlusPressed !== 0) {
    memoryNumber = (Number(displayValue) + Number(memoryNumber));
    displayValue = memoryNumber.toString();
    memoryPlusPressed++;
  }

}