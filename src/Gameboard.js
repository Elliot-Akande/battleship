import Ship from "./Ship";

const Cell = () => ({
  isHit: false,
});

const Gameboard = () => {
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
  };

  return {
    getBoard,
    placeShip,
  };
};

export default Gameboard;
