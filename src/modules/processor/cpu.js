import { ST } from "../state.js";
import * as CALC from "../instructions/basicMath.js"
import { updateDisplay } from "../display.js";
import { formatResult } from "../utils.js";

export function operate(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (op === "+") {
    ST.grandTotal += CALC.add(a, b);
    return CALC.add(a, b);
  } else if (op === "-") {
    return CALC.subtract(a, b);
  } else if (op === "*") {
    ST.grandTotal += CALC.multiply(a, b);
    return CALC.multiply(a, b);
  } else if (op === "/") {
    if (b === 0) {
      alert(`Oops! Dividing ${a} by ${b} is like trying to split zero cookies among friends—it just doesn't work. Try a different divisor.`);
      return 0;
    }
    ST.grandTotal += CALC.divide(a, b);
    return CALC.divide(a, b);
  }
}

export function compute(symbol) {
  if (ST.operator && ST.firstNumber !== null && ST.displayValue !== "") {
    ST.secondNumber = ST.displayValue;
    let result = operate(ST.operator, ST.firstNumber, ST.secondNumber);
    ST.displayValue = formatResult(result);
    result = ST.displayValue;
    updateDisplay(ST.displayValue);
    ST.firstNumber = result;
    ST.lastSecondNumber = ST.secondNumber;
    ST.lastOperator = ST.operator;
    ST.displayValue = "";
  } else if (ST.firstNumber === null && ST.displayValue !== "") {
    ST.firstNumber = ST.displayValue;
    ST.displayValue = "";
  }
  ST.operator = symbol;
}