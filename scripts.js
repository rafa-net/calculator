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
  displayValue += numValue;
  updateDisplay(numValue);
}

// AC, CE, floats and equals
function handleSpecial(value) {

}

// +, -, *, /, etc.
function handleOperation(value) {

}

function updateDisplay(number) {
  if (display.innerHTML === "0") {
    display.innerHTML = number;
  } else {
    display.innerHTML = displayValue;
  }
}