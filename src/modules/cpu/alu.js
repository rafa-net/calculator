import { state } from "../state.js";
import { displayRefresh } from "../cpu/rom.js";
import { processResult } from "./rom.js";

function combineAllThree(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (op === "+") {
    return a + b;
  } else if (op === "-") {
    return a - b;
  } else if (op === "*") {
    return a * b;
  } else if (op === "/") {
    if (b === 0) {
      alert(`Oops! Dividing ${a} by ${b} is like trying to split zero cookies among friends—it just doesn't work. Try a different divisor.`);
      return 0;
    }
    return a / b;
  }
}

function applyPercentage(operator, baseValue, percentageValue) {
  
  baseValue = parseFloat(baseValue);
  percentageValue = parseFloat(percentageValue);

  let result = null;
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

function organizeCalculations(symbol) {

  if (state.operator && state.firstNumber !== null && state.numberBox !== "") {
    state.secondNumber = state.numberBox;
    let result = combineAllThree(state.operator, state.firstNumber, state.secondNumber);

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
    result = combineAllThree(state.previousOperator, state.previousOperand, state.firstNumber);
  } else {
    result = combineAllThree(state.previousOperator, state.firstNumber, state.previousOperand);
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
