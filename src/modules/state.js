export const state = {
  firstNumber: null,
  operator: null,
  secondNumber: null,
  previousOperand: null,
  previousOperator: null,
  awaitingNewInput: false,
  repeatLastOperation: false,
  numberBox: "",
  memoryNumber: 0,
  memoryRecallPressed: 0,
  memoryPlusPressed: 0,
  memoryMinusPressed: 0,
  grandTotal: 0
}; 

window.myCalculatorState = state;

