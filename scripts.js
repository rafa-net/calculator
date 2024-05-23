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
      if (operator && firstNumber !== null) { 
        secondNumber = displayValue; // assign the display value to second number, this is the case of a normal calculation flow: 'number, operator, number, equals'
      }
      displayValue = operate(operator, firstNumber, secondNumber); // all three data present; time to operate and simulaneously assign the results to display value for
      updateDisplay(displayValue); // ... updating the display
      firstNumber = displayValue; // ... using the value as the first number of the subsequent operations
      displayValue = ""; // purge display value
      break;
  }
}

// +, -, *, /, etc.
function handleOperation(symbol) {
  if (operator && firstNumber !== null && displayValue !== firstNumber) { // first number already present, let's try to update the second number without checking it, even if we did check it, its value is irrelevant, an operator was pressed and a first number is present, so we need to update the second number accordingly
    secondNumber = displayValue; // we have the three pieces of data, operate every time this happens
    displayValue = String(operate(operator, firstNumber, secondNumber)); // operate and store the results on display value to update the display and use in the next calculation
    updateDisplay(displayValue); // update the display

    firstNumber = displayValue; // update the first number, by storing within it the result of the previous calculation for usage in the next
    operator = symbol; // update operator with the one just pressed that triggered the function: first number and operator are now fresh, time to fetch the second number
    displayValue = ""; // this clears the screen on subsequent button presses, thus making the calculator realistic but pragmatically this purges the value of the variable to prepare to receive the second number
  } 
  
  else if (firstNumber === null) { // first number absent; it's the first calculation
    firstNumber = displayValue; // update the first number by storing within it the updated result of the display value, which represents the updated operand chosen by the user
  } 
  operator = symbol; // replace previous operator, if any, with the current
  displayValue = ""; // prepare to receive the second number     
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