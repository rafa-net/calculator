// variable declarations
const allButtons = document.querySelectorAll(".button:not(#color-scheme-toggle)");
const displayText = document.getElementById("displayText");
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
let memoryPlusPressed = 0;
let memoryMinusPressed = 0;
let grandTotal = 0;

// attach event listeners to all buttons
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('color-scheme-toggle');
  const slider = document.getElementById('scale-slider');
  const themeText = document.getElementById('theme-text');
  const bodyElement = document.body;

  toggleButton.addEventListener('click', function () {

    this.classList.toggle('dark-mode');
    if (bodyElement.classList.contains('dark-mode') &&
      display.classList.contains('dark-mode')
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

  slider.addEventListener('input', function () {
    const calculator = document.getElementById('container');
    const scaleValue = this.value;
    calculator.style.transform = `scale(${scaleValue})`;
  });

  allButtons.forEach(button => {
    button.addEventListener("click", (e) => write(e, displayText))
    button.addEventListener("mousedown", () => {
      button.classList.add('keyboard-active');
      displayText.classList.add('display-blink');
    });

    button.addEventListener("mouseup", () => {
      button.classList.remove('keyboard-active');
      displayText.classList.remove('display-blink');
    });

    button.addEventListener("mouseleave", () => {
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

  if (!operator) {
    firstNumber = numberBox;
  } else {
    secondNumber = numberBox;
  }

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

function handlePercentage() {
  let result = null;
  previousOperand = firstNumber;
  previousOperator = operator;
  result = applyPercentage(operator, firstNumber, numberBox);
  finalizeOperation(result, "%");
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

function handleSquareRoot() {
  previousOperand = firstNumber;
  previousOperator = operator;
  let result = sqrt(parseFloat(firstNumber));
  finalizeOperation(result, "sqrt");
}

function finalizeOperation(result, operation) {

  // the aim is to capture only the first equals press
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
  if (!operator) {
    firstNumber = null;
  } else {
    secondNumber = null;
  }
}

function clearOne() {
  if (displayText.innerHTML.length === 1 || displayText.innerHTML === "0") {
    numberBox = "";
    displayText.innerHTML = "0";
    if (operator) {
      secondNumber = null;
    } else {
      firstNumber = null;
    }
  } else {
    numberBox = displayText.innerHTML.slice(0, -1);
    if (operator) {
      secondNumber = numberBox;
    } else {
      firstNumber = numberBox;
    }
    displayRefresh(numberBox);
  }
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


