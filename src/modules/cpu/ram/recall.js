import { ST } from "../../state.js";
import { updateDisplay } from "../../display.js";

export function memoryRecall() {
  if (ST.memoryRecallPressed > 1) {
    ST.memoryNumber = 0;
    ST.memoryPlusPressed = 0;
    ST.memoryMinusPressed = 0;
  }
  if (ST.memoryNumber === 0) {
    ST.firstNumber = null;
    ST.operator = null;
    ST.secondNumber = null;
    ST.lastOperator = null;
    ST.lastOperand = null;
    ST.awaitingNewInput = null;
    ST.repeatLastOperation = false;
    ST.memoryRecallPressed = 0;
    ST.memoryPlusPressed = 0;
    ST.memoryMinusPressed = 0;
    ST.displayValue = "0";
    updateDisplay(ST.displayValue);
  } else {
    ST.displayValue = ST.memoryNumber;
    updateDisplay(ST.displayValue);
    ST.memoryRecallPressed++;
    return;
  }
}