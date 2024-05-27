import { memoryPlus, memoryMinus, memoryRecall, showGrandTotal } from "../cpu/ram/index.js"

export function handleMemoryInput(memory) {
  switch (memory) {
    case "M+":
      memoryPlus();
      break;
    case "M-":
      memoryMinus();
      break;
    case "MR":
      memoryRecall();
      break;
    case "GT":
      showGrandTotal();
      break;
  }
}