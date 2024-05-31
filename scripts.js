export { handleNumberInput } from "./number.js";
export { handleSpecialInput } from "./special.js";
export { handleOperatorInput } from "./operator.js";

export const state = {
  firstNumber: null,
  operator: null,
  secondNumber: null,
  previousOperand: null,
  previousOperator: null,
  previousOperation: null,
  awaitingNewInput: false,
  repeatLastOperation: false,
  numberBox: "",
  memoryNumber: 0,
  memoryRecallPressed: 0,
  memoryPlusPressed: 0,
  memoryMinusPressed: 0,
  grandTotal: 0
};

window.myCalculatorState = state;

import { handleNumberInput, handleOperatorInput, handleSpecialInput }
  from './modules/input/index.js';
import { toggleDarkMode, setSizeController } from './modules/utils.js';

const displayText = document.getElementById("displayText");
const displayDigits = document.getElementById('displayText');
const allButtons = document.querySelectorAll(".button:not(#color-scheme-toggle)");

allButtons.forEach(button => {
  button.addEventListener("click", event => handleUserInput(event, displayDigits));
  button.addEventListener("mousedown", () => {
    button.classList.add('keyboard-active');
    displayDigits.classList.add('display-blink');
  });

  button.addEventListener("mouseup", () => {
    button.classList.remove('keyboard-active');
    displayDigits.classList.remove('display-blink');
  });

  button.addEventListener("mouseleave", () => {
    button.classList.remove('keyboard-active');
    displayDigits.classList.remove('display-blink');
  });
});

document.addEventListener('keydown', (e) => {
  const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
  if (buttonPressed) {
    buttonPressed.click();
    buttonPressed.classList.add('keyboard-active');
    displayDigits.classList.add('display-blink');
  }
});

document.addEventListener('keyup', (e) => {
  const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
  if (buttonPressed) {
    buttonPressed.classList.remove('keyboard-active');
    displayDigits.classList.remove('display-blink');
  }
});

toggleDarkMode();
setSizeController();

function handleUserInput(e) {
  const target = e.target;
  const value = target.dataset.value;

  if (target.classList.contains("number")) {
    handleNumberInput(value);
  } else if (target.classList.contains("special")) {
    handleSpecialInput(value);
  } else if (target.classList.contains("operator")) {
    handleOperatorInput(value);
  } else if (target.classList.contains("memory")) {
    handleMemoryInput(value);
  }
}



function toggleDarkMode() {
  document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('color-scheme-toggle');
    toggleButton.addEventListener('click', function () {
      this.classList.toggle('dark-mode');
      const bodyElement = document.body;
      const themeText = document.getElementById('theme-text');
      if (bodyElement.classList.contains('dark-mode') && display.classList.contains('dark-mode')
        && themeText.classList.contains('dark-mode-text')) {
        bodyElement.classList.remove('dark-mode');
        bodyElement.classList.add('light-mode');
        display.classList.remove('dark-mode');
        display.classList.add('light-mode');
        themeText.classList.remove('dark-mode-text');
        themeText.classList.add('light-mode-text');
        themeText.textContent = "light";
      } else {
        bodyElement.classList.remove('light-mode');
        bodyElement.classList.add('dark-mode');
        display.classList.remove('light-mode');
        display.classList.add('dark-mode');
        themeText.classList.remove('light-mode-text');
        themeText.classList.add('dark-mode-text');
        themeText.textContent = "dark";
      }
    });
  });
}

function setSizeController() {
  document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('scale-slider');
    const element = document.getElementById('container');

    slider.addEventListener('input', function () {
      const scaleValue = this.value;
      element.style.transform = `scale(${scaleValue})`;
    });
  });
}

export { toggleDarkMode, setSizeController };

import * as CMD from "./src/modules/cpu/rom.js";

export function handleSpecialInput(specialValue) {
  switch (specialValue) {
    case "AC":
      CMD.clearAll();
      break;
    case "CE":
      CMD.clearEntry();
    case "bksp":
      CMD.clearOne();
      break;
    case ".":
      CMD.addPoint();
      break;
  }
}

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
    if (String(result).length > 10) {
      let processedInteger = result.toString();
      processedInteger = processedInteger.substring(0, 10);
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
  if (state.numberBox.length > 10) {
    state.numberBox = state.numberBox.substring(0, 10);
  }
  if (displayText.innerHTML !== state.numberBox) {
    displayText.innerHTML = state.numberBox;
  }
}

export { clearAll, clearEntry, clearOne, addPoint, processResult, displayRefresh };

import * as MATH from "./src/modules/cpu/alu.js";
import { state } from "./src/modules/state.js";

export function handleOperatorInput(symbol) {
  if (symbol === "=") {
    MATH.organizeCalculations(symbol);
    state.repeatLastOperation ? MATH.handleRepeatedEquals("sequentialEquality") : state.repeatLastOperation = true;
  } else {
    state.repeatLastOperation = false;
    if (symbol === "%") {
      MATH.handlePercentage();
    } else if (symbol === "sqrt") {
      MATH.handleSquareRoot();
    } else {
      MATH.organizeCalculations(symbol);
    }
  }
  state.awaitingNewInput = true;
}

import { state } from "./src/modules/state.js";
import { displayRefresh } from "./src/modules/cpu/rom.js";

// zero against zero won't work
export function handleNumberInput(number) {

  if ((number === "0" || number === "00") &&
    displayText.innerHTML === "0" &&
    !state.numberBox.includes(".")) {
    return;
  }

  if (state.awaitingNewInput || state.repeatLastOperation) {
    state.numberBox = "";
    state.awaitingNewInput = false;
    state.repeatLastOperation = false;
  }

  state.numberBox += number;
  displayRefresh(state.numberBox);

  if (!state.operator) {
    state.firstNumber = state.numberBox;
  } else {
    state.secondNumber = state.numberBox;
  }

}

import { state } from "../state.js";
import { displayRefresh } from "../cpu/rom.js";
import { processResult } from "./rom.js";

function computeAllThree(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b === 0 ? 0 : a / b;
  }
}
function applyPercentage(op, num, pctValue) {

  num = parseFloat(num);
  pctValue = parseFloat(pctValue);

  let result = null;
  let decimalEquivalent = pctValue / 100;

  switch (op) {
    // This yields x +
    case '+':
    case '-':
      result = num * decimalEquivalent;
      return op === '-' ? num - result : num + result;
    // Example: x is 20% of 225. This yields x.
    case '*':
      result = num * decimalEquivalent;
      return result;
    case '/': // Example: 35 is 50% of x. This yields x.
      result = num / decimalEquivalent;
      return result;
    default:
      return;
  }
}

function organizeCalculations(symbol) {

  if (state.operator && state.firstNumber !== null && state.numberBox !== "") {
    state.secondNumber = state.numberBox;
    let result = computeAllThree(state.operator, state.firstNumber, state.secondNumber);

    finalizeOperation(result, symbol);
  }

  // if we still have numbers in the number box, give them to operand one
  else if (state.firstNumber === null && state.numberBox !== "") {
    state.firstNumber = state.numberBox;
    state.numberBox = "";
    state.awaitingNewInput = true;
  }

  state.operator = symbol;
}

function handlePercentage() {
  let result = null;
  state.previousOperand = state.firstNumber;
  state.previousOperator = state.operator;
  result = applyPercentage(state.operator, state.firstNumber, state.numberBox);
  finalizeOperation(result, "%");
}

function handleRepeatedEquals() {
  let result = 0;

  if (state.previousOperator === "*") {
    result = computeAllThree(state.previousOperator, state.previousOperand, state.firstNumber);
  } else {
    result = computeAllThree(state.previousOperator, state.firstNumber, state.previousOperand);
  }
  finalizeOperation(result, "sequentialEquality");
}

function handleSquareRoot() {
  state.previousOperand = state.firstNumber;
  state.previousOperator = state.operator;
  let result = Math.sqrt(parseFloat(state.firstNumber));
  finalizeOperation(result, "sqrt");
}

function finalizeOperation(result, operation) {

  // the aim is to capture only the first equals press
  if (operation === "=" && state.operator === "*") {
    state.previousOperand = state.firstNumber;
    state.previousOperator = state.operator;
  } else if (operation === "=" && (state.operator === "+" || state.operator === "-" || state.operator === "/")) {
    state.previousOperand = state.secondNumber;
    state.previousOperator = state.operator;
  }

  state.numberBox = processResult(result);
  displayRefresh(state.numberBox);
  state.firstNumber = state.numberBox;
  state.numberBox = "";
  state.awaitingNewInput = true;
  state.operator = operation;
}

export { organizeCalculations, handlePercentage, handleRepeatedEquals, handleSquareRoot }

