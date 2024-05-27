import { ST } from "../state.js";
import { operate } from "../processor/cpu.js";
import { updateDisplay } from "../display.js";
import { formatResult } from "../utils.js";

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

function handlePercentageOperation() {
  let result = applyPercentage(ST.operator, parseFloat(ST.firstNumber), parseFloat(ST.displayValue));
  ST.grandTotal += result;
  ST.displayValue = result.toString();
  updateDisplay(ST.displayValue);
  ST.firstNumber = result;
  ST.displayValue = "";
  ST.awaitingNewInput = true;
  ST.operator = null;
}

function handleSqrtOperation() {
  let result = Math.sqrt(ST.firstNumber);
  ST.displayValue = result.toString();
  updateDisplay(ST.displayValue);
  ST.firstNumber = result;
  ST.displayValue = "";
  ST.awaitingNewInput = true;
  ST.operator = null;
}

function handleRepeatLastOperation() {
  let result = operate(ST.lastOperator, ST.firstNumber, ST.lastSecondNumber);
  ST.displayValue = formatResult(result);
  result = ST.displayValue;
  updateDisplay(ST.displayValue);
  ST.firstNumber = result;
}

export { handlePercentageOperation, handleSqrtOperation,
         handleRepeatLastOperation }