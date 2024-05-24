const numberButtons = document.querySelectorAll(".button.number");
const specialButtons = document.querySelectorAll('.button.special');
const operatorButtons = document.querySelectorAll('.button.operator');
const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let secondNumber = null;
let lastOperator = null;
let lastSecondNumber = null;
let awaitingNewInput = null;
let repeatLastOperation = false;
let displayValue = "";

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
  return a * (b / 100);
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
  } else if (op === "**") {
    return power(a, b);
  } else if (op === "%") {
    return percentage(a, b);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupButtonListeners(numberButtons);
  setupButtonListeners(specialButtons);
  setupButtonListeners(operatorButtons);
  document.addEventListener('keydown', handleGlobalKeyDown);
  document.addEventListener('keyup', handleGlobalKeyUp);
});

function handleGlobalKeyDown(e) {
  const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
  if (buttonPressed) {
    buttonPressed.click();
    buttonPressed.classList.add('keyboard-active');
  }
}

function handleGlobalKeyUp(e) {
  const buttonPressed = document.querySelector(`.button[data-key="${e.key}"]`);
  if (buttonPressed) {
    buttonPressed.classList.remove('keyboard-active');
  }
}

function setupButtonListeners(buttons) {
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      handleButtonClick(button);
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
  }
}

function handleNumber(numValue) {
  if (awaitingNewInput || repeatLastOperation) {
    displayValue = numValue; 
    updateDisplay(displayValue);
    awaitingNewInput = false;
    repeatLastOperation = false;
  } else {
    displayValue += numValue;
    updateDisplay(displayValue);
  }
  if (operator && display.innerHTML === firstNumber && secondNumber === null) {
    displayValue = numValue;
    updateDisplay(displayValue);
  }
  if (!operator) {
    firstNumber = displayValue;  
  } else {
    secondNumber = displayValue;
  }
}

function handleSpecial(specialValue) {
  switch (specialValue) {
    case "AC":
      clearAll();
      break;
    case "CE":
      clearOne();
      break;
    case ".":
      if (display.innerHTML === "0" && !displayValue.includes(".") ||
          firstNumber !== null && operator) {
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
}

function handleOperator(symbol) {
  if (symbol === null && repeatLastOperation) {
    let result = operate(lastOperator, firstNumber, lastSecondNumber);
    displayValue = formatResult(result);
    result = displayValue;
    updateDisplay(displayValue);
    firstNumber = result; 
    return;  
  }
  repeatLastOperation = false;
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
  if (symbol === null) {
    repeatLastOperation = true;
  }
  awaitingNewInput = true;
}


function formatResult(result) {
  if (Number.isInteger(result)) {
    if (String(result).length > 7) {
      let processedInteger = result.toString();
      processedInteger = processedInteger.substring(0, 7);
      return processedInteger;
    }
    return result.toString();
  } else {
    let resultString = result.toString();
    let [integerPart, fractionalPart] = resultString.split(".");
    fractionalPart = fractionalPart || "";
    let maxDecimalPlaces = 6 - (integerPart.length);
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
  display.innerHTML = "0";
}

function clearOne() {
  if (display.innerHTML.length === 1 || display.innerHTML === "0") {

    displayValue = "";
    display.innerHTML = "0";

    if (operator) {
      secondNumber = null;
    } else {
      firstNumber = null;
    }
  } else {

    displayValue = display.innerHTML.slice(0, -1);


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
    display.innerHTML = "";
    awaitingNewInput = false; 
  }
  displayValue = value.toString();
  if (displayValue.length > 7) {
    displayValue = displayValue.substring(0, 7);
  }
  if (display.innerHTML !== displayValue) {
    display.innerHTML = displayValue;
  }
}
