// variable declarations
const allButtons = document.querySelectorAll(".button:not(#color-scheme-toggle)");
const displayText = document.getElementById("displayText");
const toggleButton = document.getElementById('color-scheme-toggle');
const slider = document.getElementById('scale-slider');
const themeText = document.getElementById('theme-text');
const bodyElement = document.body;
const smallDisplayText = document.getElementById("smallDisplayText")

let firstNumber = null;
let operator = null;
let secondNumber = null;
let previousOperand = null;
let previousOperator = null;
let previousOperation = null;
let awaitingNewInput = false;
let repeatLastOperation = false;
let numberBox = "";
let memoryNumber = 0;
let memoryRecallPressed = 0;
let grandTotal = 0;

// attach event listeners to all buttons
document.addEventListener('DOMContentLoaded', function () {

  allButtons.forEach(button => {
    button.addEventListener("click", handleUserInput);
    button.addEventListener("mousedown", () => {
      button.classList.add('keyboard-active');
      displayText.classList.add('display-blink');
    });

    button.addEventListener("mouseup", () => {
      button.classList.remove('keyboard-active');
      displayText.classList.remove('display-blink');
    });
  });

  document.addEventListener('keydown', (e) => {
    const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
    if (buttonPressed) {
      buttonPressed.click();
      buttonPressed.classList.add('keyboard-active');
      displayText.classList.add('display-blink');
    }
  });

  document.addEventListener('keyup', (e) => {
    const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
    if (buttonPressed) {
      buttonPressed.classList.remove('keyboard-active');
      displayText.classList.remove('display-blink');
    }
  });

  toggleButton.addEventListener('click', function () {

    toggleButton.classList.toggle('dark-mode');

    const isDarkMode = bodyElement.classList.contains('dark-mode');
    const newMode = isDarkMode ? 'light-mode' : 'dark-mode';
    const newText = isDarkMode ? 'light' : 'dark';

    bodyElement.classList.remove(isDarkMode ? 'dark-mode' : 'light-mode');
    bodyElement.classList.add(newMode);

    display.classList.remove(isDarkMode ? 'dark-mode' : 'light-mode');
    display.classList.add(newMode);

    themeText.classList.remove(isDarkMode ? 'dark-mode-text' : 'light-mode-text');
    themeText.classList.add(isDarkMode ? 'light-mode-text' : 'dark-mode-text');
    themeText.textContent = newText;

  });

  slider.addEventListener('input', function () {

    const calculator = document.getElementById('container');
    const scaleValue = this.value;
    calculator.style.transform = `scale(${scaleValue})`;

  });
});

// get button type and value
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

// button handlers
function handleNumberInput(number) {
  if ((number === "0" || number === "00") &&
    displayText.innerHTML === "0" &&
    !numberBox.includes(".")) {
    return;
  }
  if (awaitingNewInput || repeatLastOperation) {
    numberBox = "";
    awaitingNewInput = false;
    repeatLastOperation = false;
  }
  numberBox += number;
  displayRefresh(numberBox);
  operatorCheck();
}

function handleSpecialInput(specialValue) {
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
      addPoint();
      break;
    case "=":
      handleOperatorInput(specialValue);
      break;
  }
}

function handleOperatorInput(symbol) {
  if (symbol === "=") {
    organizeCalculations(symbol);
    repeatLastOperation ? handleRepeatedEquals("sequentialEquality") : repeatLastOperation = true;
  } else {
    repeatLastOperation = false;
    if (symbol === "%") {
      handlePercentage();
    } else if (symbol === "sqrt") {
      handleSquareRoot();
    } else {
      organizeCalculations(symbol);
    }
  }
  awaitingNewInput = true;
}

function handleMemoryInput(memoryValue) {
  switch (memoryValue) {
    case "MR":
      if (memoryRecallPressed === 0) {
        numberBox = memoryNumber.toString();
        displayRefresh(numberBox);
        memoryRecallPressed = 1;
      } else {
        memoryRecallPressed = 0;
        memoryPlusPressed = 0;
        memoryMinusPressed = 0;
        memoryNumber = 0;
      }
      break;
    case "M+":
      memoryNumber += parseFloat(numberBox);
      break;
    case "M-":
      if (memoryNumber === 0) {
        return;
      } else {
        memoryNumber -= parseFloat(numberBox);
      }
      break;
  }
}

function organizeCalculations(symbol) {

  if (operator && firstNumber !== null && numberBox !== "") {
    secondNumber = numberBox;
    let result = computeAllThree(operator, firstNumber, secondNumber);

    finalizeOperation(result, symbol);
  }

  // if we still have numbers in the number box, give them to operand one
  else if (firstNumber === null && numberBox !== "") {
    firstNumber = numberBox;
    numberBox = "";
    awaitingNewInput = true;
  }

  operator = symbol;
}



// calculation functions
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

function handleRepeatedEquals() {
  let result = 0;

  if (previousOperator === "*") {
    result = computeAllThree(previousOperator, previousOperand, firstNumber);
  } else {
    result = computeAllThree(previousOperator, firstNumber, previousOperand);
  }
  finalizeOperation(result, "sequentialEquality");
}

function handlePercentage() {
  let result = null;
  previousOperand = firstNumber;
  previousOperator = operator;
  result = applyPercentage(operator, firstNumber, numberBox);
  finalizeOperation(result, "%");
}

function handleSquareRoot() {
  previousOperand = firstNumber;
  previousOperator = operator;
  let result = sqrt(parseFloat(firstNumber));
  finalizeOperation(result, "sqrt");
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

function finalizeOperation(result, operation) {
  // the goal is to capture only the first equals press
  if (operation === "=" && operator === "*") {
    previousOperand = firstNumber;
    previousOperator = operator;
  } else if (operation === "=" && (operator === "+" || operator === "-" || operator === "/")) {
    previousOperand = secondNumber;
    previousOperator = operator;
  }
  numberBox = processResult(result);
  displayRefresh(numberBox);
  firstNumber = numberBox;
  numberBox = "";
  awaitingNewInput = true;
  operator = operation;
}

// utility functions
function clearAll() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  previousOperand = null;
  previousOperator = null;
  awaitingNewInput = false;
  repeatLastOperation = false;
  numberBox = "";
  grandTotal = 0;
  displayText.innerHTML = "0";
}

function clearEntry() {
  displayText.innerHTML = "0";
  numberBox = "";
  operatorCheck();
}

function clearOne() {
  if (displayText.innerHTML.length === 1 || displayText.innerHTML === "0") {
    numberBox = "";
    displayText.innerHTML = "0";
  } else {
    numberBox = displayText.innerHTML.slice(0, -1);
    displayRefresh(numberBox);
  }
  operatorCheck();
}

function addPoint() {
  if (displayText.innerHTML === "0" && !numberBox.includes(".")) {
    numberBox = "0.";
  }
  if (!numberBox.includes(".") && awaitingNewInput && firstNumber !== 0) {
    numberBox = "0.";
  }
  if (!numberBox.includes(".")) {
    numberBox += ".";
  }
  displayRefresh(numberBox);
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
  if (awaitingNewInput) {
    displayText.innerHTML = "";
    awaitingNewInput = false;
  }
  numberBox = value.toString();
  if (numberBox.length > 10) {
    numberBox = numberBox.substring(0, 10);
  }
  if (displayText.innerHTML !== numberBox) {
    displayText.innerHTML = numberBox;
  }
}

function operatorCheck() {
  operator ? secondNumber = null : firstNumber = null;
}

