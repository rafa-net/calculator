import { calcState } from "../state.js";
import { handleSqrtOperation, handlePercentageOperation,
  handleRepeatLastOperation, handleStandardOperation
 } from "../mathOps.js";

export function handleOperator(symbol) {
  if (symbol === "sqrt") {
    handleSqrtOperation();
  } else if (symbol === '%' && !calcState.operator) {
    return;
  } else if (symbol === '%' && calcState.operator !== "%" && calcState.firstNumber !== null && calcState.displayValue !== "") {
    handlePercentageOperation();
  } else if (symbol === null && calcState.repeatLastOperation && calcState.secondNumber !== null) {
    handleRepeatLastOperation();
  } else {
    handleStandardOperation(symbol);
  }

  if (symbol === null) {
    calcState.repeatLastOperation = true;
  }
  calcState.awaitingNewInput = true;
  calcState.memoryRecallPressed = 0;
}
