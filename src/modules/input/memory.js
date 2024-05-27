import { ST } from "../state.js";
import { updateDisplay } from "../display.js";

export function handleMemory(memory) {
  if (memory === "GT") {
    ST.displayValue = ST.grandTotal;
    ST.firstNumber = ST.displayValue;
    updateDisplay(ST.displayValue);
    ST.displayValue = "";
  }
  if (ST.memoryRecallPressed > 1) {
    ST.memoryNumber = 0;
    ST.memoryPlusPressed = 0;
    ST.memoryMinusPressed = 0;
  }
  if (memory === "MR" && ST.memoryNumber === 0) {
    ST.firstNumber = null;
    ST.operator = null;
    ST.secondNumber = null;
    ST.lastOperator = null;
    ST.lastSecondNumber = null;
    ST.awaitingNewInput = null;
    ST.repeatLastOperation = false;
    ST.memoryRecallPressed = 0;
    ST.memoryPlusPressed = 0;
    ST.memoryMinusPressed = 0;
    ST.displayValue = "0";
    updateDisplay(ST.displayValue);
  } else if (memory === "MR" && ST.memoryNumber !== 0) {
    ST.displayValue = ST.memoryNumber;
    updateDisplay(ST.displayValue);
    ST.memoryRecallPressed++;
    return;
  }
  if (memory === "M-" && ST.memoryNumber === 0) {
    return;
  }
  else if (memory === "M-") {
    ST.memoryNumber = (Number(ST.memoryNumber) - Number(ST.displayValue));
    ST.displayValue = ST.memoryNumber.toString();
    return;
  }
  if (memory === "M+" && ST.memoryPlusPressed === 0) {
    ST.memoryNumber = ST.displayValue;
    ST.memoryPlusPressed++;
    ST.displayValue = "";
  } else if (memory === "M+" && ST.memoryPlusPressed !== 0) {
    ST.memoryNumber = (Number(ST.displayValue) + Number(ST.memoryNumber));
    ST.displayValue = ST.memoryNumber.toString();
    ST.memoryPlusPressed++;
  }
}