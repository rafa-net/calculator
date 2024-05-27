import { ST } from "../state.js";
import { updateDisplay } from "../display.js";
import { handleOperator } from "./operator.js";

export function handleSpecial(specialValue) {
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
      break;
    case "=":
      handleOperator(null);
      break;
  }
  ST.memoryRecallPressed = 0;
}

function clearAll() {
  ST.firstNumber = null;
  ST.operator = null;
  ST.secondNumber = null;
  ST.awaitingNewInput = null;
  ST.lastOperator = null;
  ST.lastSecondNumber = null;
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