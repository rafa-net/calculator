// store relevant nodes in useful variables
const numberButtons = document.querySelectorAll(".button.number");
const specialButtons = document.querySelectorAll('.button.special');
const operatorButtons = document.querySelectorAll('.button.operator');
const display = document.getElementById("display");

// initialize main variables to null for complete erasing of the memory
let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = "";

// function declarations of all arithmetical operations to be used
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
  a = parseFloat(a); // process string to number before computation,
  b = parseFloat(b); // without affecting the main calculator variables

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
  // attach event listener through function call for organization purposes, call the function 3 times with 3 different parameters, representing the 3 differentiated inputs
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
  const value = button.dataset.value; // here is one of the cruxes of the code, the statement that contains the button value is stored in a variable that is passed to different function representing the 3 different inputs
  console.log("Button clicked! Value: ", value);

  if (button.classList.contains("number")) {
    handleNumber(value); // code for numbers
  } else if (button.classList.contains("special")) {
    handleSpecial(value); // code for equals etc.
  } else if (button.classList.contains("operator")) {
    handleOperator(value); // code for operators
  }
}

function handleNumber(numValue) {
  if (operator && display.innerHTML == firstNumber && secondNumber === null) {
    displayValue = "";
    display.innerHTML = "";
  }

  if (display.innerHTML.length > 7) {
    return;
  }

  displayValue += numValue;
  updateDisplay(displayValue);

  if (!operator) {
    firstNumber = displayValue;
  } else {
    secondNumber = displayValue;
  }

  console.log("Display value: ", displayValue, "First number: ", firstNumber, "Second number: ", secondNumber, "Operator: ", operator);
}

// AC, CE, floats and equals
function handleSpecial(specialValue) {
  switch (specialValue) {
    case "AC":
      clearAll();
      break;
    case "CE":
      clearOne();
      break;
    case ".":
      if (!displayValue.includes(".")) {
        displayValue += ".";
      }
      updateDisplay();
      break;
    case "=":
      performCalculationAndUpdate(null);
    break;
  }
}

// +, -, *, /, etc.
function handleOperator(symbol) {
  performCalculationAndUpdate(symbol);
}

function performCalculationAndUpdate(newSymbol) {
  if (operator && firstNumber !== null) {
    if (displayValue !== "") {
      secondNumber = displayValue;
    }
    let result = operate(operator, firstNumber, secondNumber);
    displayValue = formatResult(result);  // new result formatting function
    updateDisplay(displayValue);
    firstNumber = result;
    displayValue = "";
  } else if (firstNumber === null) {
    firstNumber = displayValue;
  }
  operator = newSymbol;
}

function formatResult(result) {
  if (Number.isInteger(result)) {
    return result.toString();  // return integers as strings
  } else {
    let resultString = result.toString();
    let [integerPart, fractionalPart] = resultString.split(".");
    fractionalPart = fractionalPart || "";  // handle undefined fractional part
    let maxDecimalPlaces = 6 - (integerPart.length);
    if (maxDecimalPlaces < 0) {
      maxDecimalPlaces = 0;
    }
    return result.toFixed(maxDecimalPlaces);
  }
}


function updateDisplay(number) {
  displayValue = number.toString();
  if (displayValue.length > 7) {
    displayValue = displayValue.substring(0, 7);
  }
  if (display.innerHTML !== displayValue) {
    display.innerHTML = displayValue;
  }
}

function clearAll() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  displayValue = "";
  display.innerHTML = "0";
}

function clearOne() {
  if (display.innerHTML.length === 1 || display.innerHTML === "0") {
    displayValue = "";
    display.innerHTML = "0";
  } else {
    displayValue = display.innerHTML.slice(0, -1);
    updateDisplay(displayValue);
  }
}