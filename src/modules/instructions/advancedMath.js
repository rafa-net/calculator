import { ST } from "../state.js";
import { applyPercentage, operate } from "../processor/cpu.js";
import { updateDisplay } from "../display.js";
import { formatResult } from "../utils.js";

export function handleMathOperation(operation) {
  let result;

  if (operation === "percentage") {
    result = applyPercentage(ST.operator, parseFloat(ST.firstNumber), parseFloat(ST.displayValue));
    ST.grandTotal += result;
  } else if (operation === "sqrt") {
      if (ST.operator === null) {
        result = Math.sqrt(parseFloat(ST.firstNumber));
      } else if (ST.displayValue !== "") {
        result = Math.sqrt(parseFloat(ST.displayValue));
      }
  } else if (operation === "repeatLast") {
    result = operate(ST.lastOperator, ST.firstNumber, ST.lastSecondNumber);
  }

  ST.displayValue = formatResult(result);
  updateDisplay(ST.displayValue);
  ST.firstNumber = ST.displayValue;
  ST.displayValue = "";
  ST.awaitingNewInput = true;
  ST.operator = null;
}