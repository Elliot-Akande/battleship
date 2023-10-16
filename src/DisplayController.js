import PubSub from "pubsub-js";

const DisplayController = () => {
  const getCell = (x, y) => {
    const cell = document.createElement("div");
    cell.dataset.x = x;
    cell.dataset.y = y;
    cell.classList.add("cell");
    return cell;
  };

  const getGrid = (player) => {
    const grid = document.createElement("div");
    grid.classList.add("grid", player);
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
        grid.appendChild(getCell(x, y));
      }
    }
    return grid;
  };

  const newGrid = (player) => {
    const div = document.querySelector(".content");
    div.appendChild(getGrid(player));
  };

  const placeShip = (msg, data) => {
    if (data.player !== "playerOne") return;
    const { x, y, length, axis } = data;

    for (let i = 0; i < length; i += 1) {
      const deltaX = axis === "x" ? x + i : x;
      const deltaY = axis === "y" ? y - i : y;
      const cell = document.querySelector(
        `[data-x='${deltaX}'][data-y='${deltaY}']`
      );
      cell.classList.add("ship");
    }
  };

  PubSub.subscribe("SHIP_PLACED", placeShip);

  return {
    getCell,
    getGrid,
    newGrid,
  };
};

export default DisplayController;
