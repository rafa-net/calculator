import { state } from "../state.js";
import { displayRefresh } from "../cpu/rom.js";

// zero against zero won't work
export function handleNumberInput(number) {

  if ((number === "0" || number === "00") && 
      displayText.innerHTML === "0" && 
      !state.numberBox.includes(".")) {
    return;
  }

  if (state.awaitingNewInput || state.repeatLastOperation) {
    state.numberBox = "";
    state.awaitingNewInput = false;
    state.repeatLastOperation = false;
  }

  state.numberBox += number;
  displayRefresh(state.numberBox);

  if (!state.operator) {
    state.firstNumber = state.numberBox;
  } else {
    state.secondNumber = state.numberBox;
  }
  
}
