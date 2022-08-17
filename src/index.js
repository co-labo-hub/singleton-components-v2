import "./components/ComponentManager.js";
import * as Game from "./components/Game.js";

(() => {
  Game.getInstance().init(document.querySelector("#root")).render();
})();
