import Ship from "./Ship";

const Cell = () => ({
  isHit: false,
});

const Gameboard = () => {
  let shipTotal = 0;

  const board = Array(10)
    .fill()
    .map(() => Array(10).fill(Cell()));

  const getBoard = () => board;

  const placeShip = (x, y, length, axis) => {
    if (axis === "x") {
      if (x + length - 1 > 9) throw new Error("Placement out of bounds");
    } else if (axis === "y") {
      if (y - length + 1 < 0) throw new Error("Placement out of bounds");
    } else {
      throw new Error("Invalid axis prop");
    }

    for (let i = 0; i < length; i += 1) {
      const deltaX = axis === "x" ? x + i : x;
      const deltaY = axis === "y" ? y - i : y;
      if (Object.prototype.hasOwnProperty.call(board[deltaX][deltaY], "ship")) {
        throw new Error("Invalid placement: Ships cannot overlap");
      }
    }

    const ship = Ship(length);
    for (let i = 0; i < length; i += 1) {
      const deltaX = axis === "x" ? x + i : x;
      const deltaY = axis === "y" ? y - i : y;
      board[deltaX][deltaY] = { ...board[deltaX][deltaY], ship };
    }

    shipTotal += 1;
  };

  const receiveAttack = (x, y) => {
    if (board[x][y].isHit) throw new Error("Cell has already been hit");
    if (Object.prototype.hasOwnProperty.call(board[x][y], "ship")) {
      board[x][y].ship.hit();
      if (board[x][y].ship.isSunk()) shipTotal -= 1;
    }
    board[x][y].isHit = true;
  };

  return {
    getBoard,
    placeShip,
    receiveAttack,
  };
};

export default Gameboard;
