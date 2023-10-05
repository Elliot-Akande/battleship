import Ship from "./Ship";

const Cell = () => ({
  isHit: false,
});

const Gameboard = () => {
  const board = Array(10)
    .fill()
    .map(() => Array(10).fill(Cell()));

  const placeShip = (x, y, length, axis) => {
    if (axis === "x") {
      if (x + length - 1 > 9) throw new Error("Placement out of bounds");
    } else if (axis === "y") {
      if (y - length + 1 < 0) throw new Error("Placement out of bounds");
    } else {
      throw new Error("Invalid axis prop");
    }

    const ship = Ship(length);
    for (let i = 0; i < length; i += 1) {
      if (axis === "x") {
        board[x + i][y] = { ...board[x + i][y], ship };
      } else {
        board[x][y - i] = { ...board[x][y - i], ship };
      }
    }
  };

  const getBoard = () => board;

  return {
    placeShip,
    getBoard,
  };
};

export default Gameboard;
