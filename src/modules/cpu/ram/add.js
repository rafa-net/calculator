import { ST } from "../../state.js";

export function memoryPlus() {
  if (ST.memoryPlusPressed === 0) {
    ST.memoryNumber = ST.displayValue;
    ST.memoryPlusPressed++;
    ST.displayValue = "";
  } else {
    ST.memoryNumber = (Number(ST.displayValue) + Number(ST.memoryNumber));
    ST.displayValue = ST.memoryNumber.toString();
    ST.memoryPlusPressed++;
  }
}