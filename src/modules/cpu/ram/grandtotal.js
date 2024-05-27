import { ST } from "../../state.js";
import { updateDisplay } from "../../display.js";

export function showGrandTotal() {
    ST.displayValue = ST.grandTotal;
    ST.firstNumber = ST.displayValue;
    updateDisplay(ST.displayValue);
    ST.displayValue = "";
}
