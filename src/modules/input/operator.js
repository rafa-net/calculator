import { ST } from "../state.js"
import * as MATH from "../instructions/advancedMath.js";
import { compute } from "../processor/cpu.js";

export function handleOperator(symbol) {
  if (symbol === "sqrt") {
    MATH.handleSqrtOperation();
  } else if (symbol === '%' && !ST.operator) {
    return;
  } else if (symbol === '%' && ST.operator !== "%" && ST.firstNumber !== null && ST.displayValue !== "") {
    MATH.handlePercentageOperation();
  } else if (symbol === null && ST.repeatLastOperation && ST.secondNumber !== null) {
    MATH.handleRepeatLastOperation();
  } else {
    compute(symbol);
  }

  if (symbol === null) {
    ST.repeatLastOperation = true;
  }
  ST.awaitingNewInput = true;
  ST.memoryRecallPressed = 0;
}
