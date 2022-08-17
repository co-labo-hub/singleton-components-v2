import * as Game from "./Game.js";
import * as Board from "./Board.js";

class Square {
  // singleton pattern (but multi instances)
  static getInstance(id) {
    if (!instances.has(id)) instances.set(id, new Square(id));
    return instances.get(id);
  }
  static getInstanceMap() {
    return instances;
  }

  // render (re-render unavailable. use root component render)
  render() {
    return /* html */ `
      <button
        class="square"
        onclick="window.components.get('${Square.name}').getInstance(${this._id}).handleClick()"
      >
        ${this._player}
      </button>
    `;
  }

  // define state
  constructor(id) {
    this._id = id; // state
    this._player = ""; // state
  }

  // initialize component
  init() {
    window.components.set(Square.name, Square); // because of no reference module from DOM
  }

  // event listener
  handleClick() {
    const game = Game.getInstance();
    if (this.getPlayer() || game.getWinner()) return;
    this.setPlayer(Board.getInstance().next());
    game.getWinner() ? game.setWinnerMessage() : game.setNextPlayerMessage();
  }

  // other methods
  getPlayer() {
    return this._player;
  }
  setPlayer(player) {
    this._player = player;
    Game.getInstance().render(); // re-render (cannot use this.render)
  }
}
// singleton pattern (but multi instances)
const instances = new Map();
export const { getInstance, getInstanceMap } = Square;
