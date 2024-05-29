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
