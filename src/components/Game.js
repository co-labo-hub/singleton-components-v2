import * as Board from "./Board.js";
import * as Square from "./Square.js";

class Game {
  // singleton pattern
  static getInstance() {
    return instance;
  }

  // render (re-render available)
  render() {
    this._root.innerHTML = /* html */ `
      <div class="status">
        ${this._message}
      </div>
      <div class="game">
        <div class="game-board">
          ${Board.getInstance().render()} <!-- child component -->
        </div>
      </div>
    `;
  }

  // define state
  constructor() {
    this._root = null;
    this._winner = null; //state
    this._message = ""; //state
  }

  // initialize component
  init(root) {
    this._root = root; // only root component
    Board.getInstance().init(); // initializing child component
    return this;
  }

  // other methods
  setNextPlayerMessage() {
    this._message = "Next player: " + Board.getInstance().current();
    this.render();
  }
  setWinnerMessage() {
    this._message = "Winner: " + this._winner;
    this.render();
  }
  getWinner() {
    const squares = Square.getInstanceMap();
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
      if (
        squares.has(a) &&
        squares.has(b) &&
        squares.has(c) &&
        squares.get(a).getPlayer() === squares.get(b).getPlayer() &&
        squares.get(a).getPlayer() === squares.get(c).getPlayer()
      ) {
        this._winner = squares.get(a).getPlayer();
        break;
      }
    }
    return this._winner;
  }
}
// singleton pattern
const instance = new Game();
export const { getInstance } = Game;
