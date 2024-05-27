import * as MATH from "../cpu/alu.js";
import { ST } from "../state.js";

export function handleOperatorInput(symbol) {
  if (symbol === null) {

    if (ST.repeatLastOperation) {
      MATH.handleMathOperation("repeatLast");
    } else {
      ST.repeatLastOperation = true;
    }

    MATH.compute(symbol);
    
  } else {
    ST.repeatLastOperation = false;

    switch (symbol) {
      case '%':
        if (ST.operator && ST.firstNumber !== null && ST.displayValue !== "") {
          MATH.handleMathOperation("percentage");
        }
        break;
      case 'sqrt':
        MATH.handleMathOperation("sqrt");
        break;
      default:
        MATH.compute(symbol);
        break;
    }

  }

  ST.awaitingNewInput = true;
  ST.memoryRecallPressed = 0;
}
