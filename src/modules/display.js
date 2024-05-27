import { ST } from "./state.js";

export function updateDisplay(value) {
  if (ST.awaitingNewInput) {
    displayText.innerHTML = "";
    ST.awaitingNewInput = false;
  }
  ST.displayValue = value.toString();
  if (ST.displayValue.length > 14) {
    ST.displayValue = ST.displayValue.substring(0, 14);
  }
  if (displayText.innerHTML !== ST.displayValue) {
    displayText.innerHTML = ST.displayValue;
  }
}