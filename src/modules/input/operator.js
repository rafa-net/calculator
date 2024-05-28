import * as MATH from "../cpu/alu.js";
import { state } from "../state.js";

export function handleOperatorInput(symbol) {
  if (symbol === "=") {
    MATH.organizeCalculations(symbol);
    state.repeatLastOperation ? MATH.handleRepeatedEquals("sequentialEquality") : state.repeatLastOperation = true;
  } else {
    state.repeatLastOperation = false;
    if (symbol === "%") {
      MATH.handlePercentage();
    } else if (symbol === "sqrt") {
      MATH.handleSquareRoot();
    } else {
      MATH.organizeCalculations(symbol);
    }
  }
  state.awaitingNewInput = true;
}


  

