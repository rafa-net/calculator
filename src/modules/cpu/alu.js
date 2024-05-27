import { ST } from "../state.js";
import { updateDisplay } from "../display.js";
import { formatResult } from "./rom.js";

function operate(op, a, b) {
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

export function compute(symbol) {
  if (ST.operator && ST.firstNumber !== null && ST.displayValue !== "") {
    ST.secondNumber = ST.displayValue;
    let result = operate(ST.operator, ST.firstNumber, ST.secondNumber);
    finalizeOperation(result, symbol);
  } else if (ST.firstNumber === null && ST.displayValue !== "") {
    ST.firstNumber = ST.displayValue;
    ST.displayValue = "";
    ST.awaitingNewInput = true;
  }
  ST.operator = symbol;
}

export function handleMathOperation(operation) {
  let result;

  switch (operation) {
    case "percentage":
      result = applyPercentage(ST.operator, parseFloat(ST.firstNumber), parseFloat(ST.displayValue));
      break;
    case "repeatLast":
      if (ST.previousOperator === "*") {
        result = operate(ST.previousOperator, ST.previousOperand, ST.firstNumber);
      } else {
        result = operate(ST.previousOperator, ST.firstNumber, ST.previousOperand);
      }
      break;
    case "sqrt":
      result = Math.sqrt(parseFloat(ST.displayValue || ST.firstNumber));
      break;
  }
  finalizeOperation(result, operation);
}

function finalizeOperation(result, operation) {
  
  if (operation === null && ST.operator === "*") {
    ST.previousOperand = ST.firstNumber;
    ST.previousOperator = ST.operator;
  } else if (operation === null && ST.operator !== "*") {
    ST.previousOperand = ST.secondNumber;
    ST.previousOperator = ST.operator;
  }

  ST.displayValue = formatResult(result);
  updateDisplay(ST.displayValue);
  ST.firstNumber = ST.displayValue;
  ST.displayValue = "";
  ST.awaitingNewInput = true;
  ST.operator = (operation === "sqrt" || operation === "percentage") ? null : operation;
}
