import { ST } from "../state.js"
import * as MATH from "../instructions/advancedMath.js";
import { compute } from "../processor/cpu.js";

export function handleOperator(symbol) {
  if (symbol === '%' && !ST.operator) {
    return;
  } else if (symbol === "sqrt") {
    MATH.handleMathOperation("sqrt");
  } else if (symbol === '%' && ST.operator !== "%" && ST.firstNumber !== null && ST.displayValue !== "") {
    MATH.handleMathOperation("percentage");
  } else if (symbol === null && ST.repeatLastOperation && ST.secondNumber !== null) {
    MATH.handleMathOperation("repeatLast");
  } else {
    compute(symbol);
  }

  if (symbol === null) {
    ST.repeatLastOperation = true;
  }
  ST.awaitingNewInput = true;
  ST.memoryRecallPressed = 0;
}
