import { calcState } from "./modules/stateManagement";
import * as UI from "./modules/userInterface";
import * as IO from "./modules/userInteraction";

const displayText = document.getElementById("displayText"); // displayText, displayValue and displayText.innerHTML

// Launch UI
UI.toggleDarkMode();
UI.setSizeController();

// Input getters
IO.setupUserInteraction();
IO.handleUserInput();

