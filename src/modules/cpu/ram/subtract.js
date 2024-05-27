import { ST } from "../../state.js";

export function memoryMinus() {
  if (ST.memoryNumber === 0) {
    return;
  }
  else {
    ST.memoryNumber = (Number(ST.memoryNumber) - Number(ST.displayValue));
    ST.displayValue = ST.memoryNumber.toString();
    return;
  }
}