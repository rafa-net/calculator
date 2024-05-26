import { calcState } from "../state.js";
import { updateDisplay } from "../buffer.js";
import { clearAll, clearEntry, clearOne } from "../buffer.js";
import { handleOperator } from "./operator.js";

export function handleSpecial(specialValue) {
  switch (specialValue) {
    case "AC":
      clearAll();
      break;
    case "CE":
      clearEntry();
    case "bksp":
      clearOne();
      break;
    case ".":
      if (displayText.innerHTML === "0" && !calcState.displayValue.includes(".")) {
        calcState.displayValue = "0.";
      }
      if (!calcState.displayValue.includes(".") && calcState.awaitingNewInput && calcState.firstNumber !== 0) {
        calcState.displayValue = "0.";
      }
      if (!calcState.displayValue.includes(".")) {
        calcState.displayValue += ".";
      }
      updateDisplay(calcState.displayValue);
      break;
    case "=":
      handleOperator(null);
      break;
  }
  calcState.memoryRecallPressed = 0;
}