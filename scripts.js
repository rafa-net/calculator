// store relevant nodes in useful variables
const numberButtons = document.querySelectorAll(".button.number");
const specialButtons = document.querySelectorAll('.button.special');
const operatorButtons = document.querySelectorAll('.button.operation');
const display = document.getElementById("display");

// initialize main variables to null for complete erasing of the memory
let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = "";

// basic arithmetical function declarations for clarity
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
});

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
  } else if (button.classList.contains("operation")) {
    handleOperation(value); // code for operators
  }
}

// declare function to handle numbers, which is the most common input
function handleNumber(numValue) {
  // check for overflow here
  if (display.innerHTML.length > 6) {
    return;
  }
} // automatic screen populating after user types the first number and presses an operator
if (operator && display.innerHTML == firstNumber && secondNumber === null) {
  displayValue = "";
  display.innerHTML = "";
}
displayValue += numValue;
if (firstNumber !== null && secondNumber === null) { // check for the first calculation and update the second number
  secondNumber = displayValue;
} else if (firstNumber !== null && secondNumber !== null) { // first number is the "primary memory", stays static, second number gets refreshed in real time...
  secondNumber = displayValue; // ...because display value always gets updated first, by appending the contents of numValue (immediate user input) onto itself, it is the guiding light of this code, and the value all variables orbit around
  updateDisplay(numValue);
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
function handleOperation(symbol) {
  performCalculationAndUpdate(symbol);
}

function performCalculationAndUpdate(symbol) {
  if (operator && firstNumber !== null && displayValue !== "") {
    secondNumber = displayValue;
  }
  displayValue = String(operate(operator, firstNumber, secondNumber));
  updateDisplay(displayValue);
  firstNumber = displayValue;
  operator = symbol;
  displayValue = "";
}

function updateDisplay(number) {
  if (display.innerHTML === "0") {
    display.innerHTML = number;
  } else {
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
  if (display.innerHTML.length === 1 || display.innerHTML === 0) {
    displayValue = "";
    display.innerHTML = "0";
  } else {
    displayValue = display.innerHTML.slice(0, -1);
    updateDisplay(displayValue);
  }
}