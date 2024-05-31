import * as CMD from "./src/modules/cpu/rom.js";

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
  }
}