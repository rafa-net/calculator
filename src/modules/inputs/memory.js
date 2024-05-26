import { calcState } from "../state.js";
import { updateDisplay } from "../buffer.js";

export function handleMemory(memory) {
  if (memory === "GT") {
    calcState.displayValue = calcState.grandTotal;
    calcState.firstNumber = calcState.displayValue;
    updateDisplay(calcState.displayValue);
    calcState.displayValue = "";
  }
  if (calcState.memoryRecallPressed > 1) {
    calcState.memoryNumber = 0;
    calcState.memoryPlusPressed = 0;
    calcState.memoryMinusPressed = 0;
  }
  if (memory === "MR" && calcState.memoryNumber === 0) {
    calcState.firstNumber = null;
    calcState.operator = null;
    calcState.secondNumber = null;
    calcState.lastOperator = null;
    calcState.lastSecondNumber = null;
    calcState.awaitingNewInput = null;
    calcState.repeatLastOperation = false;
    calcState.memoryRecallPressed = 0;
    calcState.memoryPlusPressed = 0;
    calcState.memoryMinusPressed = 0;
    calcState.displayValue = "0";
    updateDisplay(calcState.displayValue);
  } else if (memory === "MR" && calcState.memoryNumber !== 0) {
    calcState.displayValue = calcState.memoryNumber;
    updateDisplay(calcState.displayValue);
    calcState.memoryRecallPressed++;
    return;
  }
  if (memory === "M-" && calcState.memoryNumber === 0) {
    return;
  }
  else if (memory === "M-") {
    calcState.memoryNumber = (Number(calcState.memoryNumber) - Number(calcState.displayValue));
    calcState.displayValue = calcState.memoryNumber.toString();
    return;
  }

  if (memory === "M+" && calcState.memoryPlusPressed === 0) {
    calcState.memoryNumber = calcState.displayValue;
    calcState.memoryPlusPressed++;
    calcState.displayValue = "";
  } else if (memory === "M+" && calcState.memoryPlusPressed !== 0) {
    calcState.memoryNumber = (Number(calcState.displayValue) + Number(calcState.memoryNumber));
    calcState.displayValue = calcState.memoryNumber.toString();
    calcState.memoryPlusPressed++;
  }
}