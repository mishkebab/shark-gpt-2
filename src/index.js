import { renderScreen1 } from "./scripts/screen1";
import { renderScreen2 } from "./scripts/screen2";
import { renderScreen3 } from "./scripts/screen3";
import { renderScreen4 } from "./scripts/screen4";

const canvasEl = document.getElementById("game-canvas");
const ctx = canvasEl.getContext("2d");
renderScreen1(canvasEl, ctx, renderScreen2, renderScreen3, renderScreen4);






