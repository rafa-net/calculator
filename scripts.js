
function toggleColorScheme() {
  const bodyElement = document.body;
  if (bodyElement.classList.contains('dark-mode') && display.classList.contains('dark-mode')) {
    bodyElement.classList.remove('dark-mode');
    bodyElement.classList.add('light-mode');
    display.classList.remove('dark-mode');
    display.classList.add('light-mode');
  } else {
    bodyElement.classList.remove('light-mode');
    bodyElement.classList.add('dark-mode');
    display.classList.remove('light-mode');
    display.classList.add('dark-mode');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('color-scheme-toggle');
  toggleButton.addEventListener('click', toggleColorScheme);
});

document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('color-scheme-toggle');
  toggleButton.addEventListener('click', function () {
    this.classList.toggle('dark-mode');
  });
});


const numberButtons = document.querySelectorAll(".button.number");
const specialButtons = document.querySelectorAll(".button.special");
const operatorButtons = document.querySelectorAll(".button.operator");
const memoryButtons = document.querySelectorAll(".button.memory");
const displayText = document.getElementById("displayText");
const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let secondNumber = null;
let lastOperator = null;
let lastSecondNumber = null;
let awaitingNewInput = null;
let repeatLastOperation = false;
let memoryNumber = "";
let displayValue = "";
let memoryRecallPressed = 0;
let grandTotal = 0;


function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function power(a, b) {
  return a ** b;
}

function percentage(a, b) {
  return (100 * a) / b;
}

function applyPercentage(operator, baseValue, percentageValue) {
  let result;
  let percentageDecimal = percentageValue / 100;
  switch (operator) {
    case '+':
    case '-':
      result = baseValue * percentageDecimal;
      return operator === '-' ? baseValue - result : baseValue + result;
    case '*':
      result = baseValue * percentageDecimal;
      return result;
    case '/':
      result = baseValue / percentageDecimal;
      return result;
    default:
      return;
  }
}

function operate(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (op === "+") {
    return add(a, b);
  } else if (op === "-") {
    return subtract(a, b);
  } else if (op === "*") {
    return multiply(a, b);
  } else if (op === "/") {
    if (b === 0) {
      alert(`Oops! Dividing ${a} by ${b} is like trying to split zero cookies among friends—it just doesn't work. Try a different divisor.`);
      return 0;
    }
    return divide(a, b);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupButtonListeners(numberButtons);
  setupButtonListeners(specialButtons);
  setupButtonListeners(operatorButtons);
  setupButtonListeners(memoryButtons);
  document.addEventListener('keydown', handleGlobalKeyDown);
  document.addEventListener('keyup', handleGlobalKeyUp);
});

function handleGlobalKeyDown(e) {
  console.log("Key pressed: " + e.key);
  const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
  if (buttonPressed) {
    buttonPressed.click();
    buttonPressed.classList.add('keyboard-active');
    displayText.classList.add(`display-blink`);
  }
}

function handleGlobalKeyUp(e) {
  const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
  if (buttonPressed) {
    buttonPressed.classList.remove('keyboard-active');
    displayText.classList.remove(`display-blink`);
  }
}

function setupButtonListeners(buttons) {
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      handleButtonClick(button);
    });
    button.addEventListener("mousedown", () => {
      displayText.classList.add(`display-blink`);
    });
    button.addEventListener("mouseup", () => {
      displayText.classList.remove(`display-blink`);
    });
  });
}

function handleButtonClick(button) {
  const value = button.dataset.value;

  if (button.classList.contains("number")) {
    handleNumber(value);
  } else if (button.classList.contains("special")) {
    handleSpecial(value);
  } else if (button.classList.contains("operator")) {
    handleOperator(value);
  } else if (button.classList.contains("memory")) {
    handleMemory(value);
  }
}

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
      if (!displayValue.includes(".") && awaitingNewInput) {
        displayValue += "0.";
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
  if (memoryRecallPressed > 1) {
    memoryNumber = 0;
  }
  


  if (memory === "MR") {
    displayValue = memoryNumber;
    updateDisplay(displayValue);
    displayValue = "";
    memoryRecallPressed++;
    return;
  }
  if (memory === "M-" && memoryNumber === 0) {
    return;
  }
  if (memory === "M+") {
    memoryNumber += displayValue;
    updateDisplay(displayValue);
  } else if (memory === "M-") {
    memoryNumber -= displayValue;
    updateDisplay(displayValue);
  }
}

function handleSqrtOperation() {
  let result = Math.sqrt(firstNumber);
  displayValue = result.toString();
  updateDisplay(displayValue);
  firstNumber = result;
  displayValue = "";
  awaitingNewInput = true;
  operator = null;
}

function handlePercentageOperation() {
  let result = applyPercentage(operator, parseFloat(firstNumber), parseFloat(displayValue));
  displayValue = result.toString();
  updateDisplay(displayValue);
  firstNumber = result;
  displayValue = "";
  awaitingNewInput = true;
  operator = null;
}

function handleRepeatLastOperation() {
  let result = operate(lastOperator, firstNumber, lastSecondNumber);
  displayValue = formatResult(result);
  result = displayValue;
  updateDisplay(displayValue);
  firstNumber = result;
}

function handleStandardOperation(symbol) {
  if (operator && firstNumber !== null && displayValue !== "") {
    secondNumber = displayValue;
    let result = operate(operator, firstNumber, secondNumber);
    displayValue = formatResult(result);
    result = displayValue;
    updateDisplay(displayValue);
    firstNumber = result;
    lastSecondNumber = secondNumber;
    lastOperator = operator;
    displayValue = "";
  } else if (firstNumber === null && displayValue !== "") {
    firstNumber = displayValue;
    displayValue = "";
  }
  operator = symbol;
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

function clearAll() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  awaitingNewInput = null;
  lastOperator = null;
  lastSecondNumber = null;
  repeatLastOperation = false;
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
