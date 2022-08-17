import * as Square from "./Square.js";
import * as Game from "./Game.js";

class Board {
  // singleton pattern
  static getInstance() {
    return instance;
  }

  // render (re-render unavailable. use root component render)
  render() {
    return /* html */ `
      <div class="board-row">
        ${Square.getInstance(0).render()}
        ${Square.getInstance(1).render()}
        ${Square.getInstance(2).render()}
      </div>
      <div class="board-row">
        ${Square.getInstance(3).render()}
        ${Square.getInstance(4).render()}
        ${Square.getInstance(5).render()}
      </div>
      <div class="board-row">
        ${Square.getInstance(6).render()}
        ${Square.getInstance(7).render()}
        ${Square.getInstance(8).render()}
      </div>
    `;
  }

  // define state
  constructor() {
    this._nextPlayer = "X"; //state
  }

  // initialize component
  init() {
    [...new Array(9)].forEach((_, i) => Square.getInstance(i).init()); // initializing child components
    Game.getInstance().setNextPlayerMessage();
  }

  // other methods
  next() {
    const ret = this._nextPlayer;
    this._nextPlayer = this._nextPlayer === "X" ? "O" : "X";
    return ret;
  }
  current() {
    return this._nextPlayer;
  }
}
//singleton pattern
const instance = new Board();
export const { getInstance } = Board;
