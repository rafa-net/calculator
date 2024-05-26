import { calcState } from "./stateManagement.js";
import { displayText } from "../main.js";
import { updateDisplay, clearAll, clearEntry, clearOne } from "./displayBuffer.js";
import * as MATH from "./mathOps.js";

function handleNumber(numValue) {
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
      if (displayText.innerHTML === "0" && !calcState.displayValue.includes(".")) {
        calcState.displayValue = "0.";
      }
      if (!calcState.displayValue.includes(".") && calcState.awaitingNewInput && calcState.firstNumber !== 0) {
        calcState.displayValue = "0.";
      }
      if (!calcState.displayValue.includes(".")) {
        calcState.displayValue += ".";
      }
      updateDisplay(calcState.displayValue);
      break;
    case "=":
      handleOperator(null);
      break;
  }
  calcState.memoryRecallPressed = 0;
}

function handleOperator(symbol) {
  if (symbol === "sqrt") {
    MATH.handleSqrtOperation();
  } else if (symbol === '%' && !calcState.operator) {
    return;
  } else if (symbol === '%' && calcState.operator !== "%" && calcState.firstNumber !== null && calcState.displayValue !== "") {
    MATH.handlePercentageOperation();
  } else if (symbol === null && calcState.repeatLastOperation && calcState.operator) {
    MATH.handleRepeatLastOperation();
  } else {
    MATH.handleStandardOperation(symbol);
  }

  if (symbol === null) {
    calcState.repeatLastOperation = true;
  }
  calcState.awaitingNewInput = true;
  calcState.memoryRecallPressed = 0;
}

function handleMemory(memory) {
  if (memory === "GT") {
    calcState.displayValue = grandTotal;
    calcState.firstNumber = calcState.displayValue;
    updateDisplay(calcState.displayValue);
    calcState.displayValue = "";
  }
  if (calcState.memoryRecallPressed > 1) {
    calcState.memoryNumber = 0;
    calcState.memoryPlusPressed = 0;
    calcState.memoryMinusPressed = 0;
  }
  if (memory === "MR" && calcState.memoryNumber === 0) {
    calcState.firstNumber = null;
    calcState.operator = null;
    calcState.secondNumber = null;
    calcState.lastOperator = null;
    calcState.lastSecondNumber = null;
    calcState.awaitingNewInput = null;
    calcState.repeatLastOperation = false;
    calcState.memoryRecallPressed = 0;
    calcState.memoryPlusPressed = 0;
    calcState.memoryMinusPressed = 0;
    calcState.displayValue = "0";
    updateDisplay(calcState.displayValue);
  } else if (memory === "MR" && calcState.memoryNumber !== 0) {
    calcState.displayValue = calcState.memoryNumber;
    updateDisplay(calcState.displayValue);
    calcState.memoryRecallPressed++;
    return;
  }
  if (memory === "M-" && calcState.memoryNumber === 0) {
    return;
  }
  else if (memory === "M-") {
    calcState.memoryNumber = (Number(calcState.memoryNumber) - Number(calcState.displayValue));
    calcState.displayValue = calcState.memoryNumber.toString();
    return;
  }

  if (memory === "M+" && calcState.memoryPlusPressed === 0) {
    calcState.memoryNumber = calcState.displayValue;
    calcState.memoryPlusPressed++;
    calcState.displayValue = "";
  } else if (memory === "M+" && calcState.memoryPlusPressed !== 0) {
    calcState.memoryNumber = (Number(calcState.displayValue) + Number(calcState.memoryNumber));
    calcState.displayValue = calcState.memoryNumber.toString();
    calcState.memoryPlusPressed++;
  }

}

export { handleNumber, handleSpecial, handleOperator, handleMemory }