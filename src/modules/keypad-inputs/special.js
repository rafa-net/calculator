import * as CMD from "../cpu/rom.js";
import { handleOperatorInput } from "./operator.js";

export function handleSpecialInput(specialValue) {
  switch (specialValue) {
    case "AC":
      CMD.clearAll();
      break;
    case "CE":
      CMD.clearEntry();
    case "bksp":
      CMD.clearOne();
      break;
    case ".":
      CMD.addPoint();
      break;
    case "=":
      handleOperatorInput(null);
  }
}