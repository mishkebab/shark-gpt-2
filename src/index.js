import { renderScreen1 } from "./scripts/screen1.js";
import { renderScreen2 } from "./scripts/screen2.js";
import { renderScreen3 } from "./scripts/screen3.js";
import { renderScreen4 } from "./scripts/screen4.js";

const canvasEl = document.getElementById("game-canvas");
const ctx = canvasEl.getContext("2d");
renderScreen1(canvasEl, ctx, renderScreen2, renderScreen3, renderScreen4);






