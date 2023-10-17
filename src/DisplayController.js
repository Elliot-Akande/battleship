import PubSub from "pubsub-js";

const DisplayController = () => {
  const getCell = (x, y) => {
    const cell = document.createElement("div");
    cell.dataset.x = x;
    cell.dataset.y = y;
    cell.classList.add("cell");

    cell.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "none";
    });

    cell.addEventListener("drop", (event) => {
      event.preventDefault();
      PubSub.publish("RQST_PLACE_SHIP", {
        ...JSON.parse(event.dataTransfer.getData("text/plain")),
        y: event.currentTarget.dataset.y,
        x: event.currentTarget.dataset.x,
      });
    });

    return cell;
  };

  const attackCell = (event) => {
    PubSub.publish("ATTACK_CELL", {
      x: event.currentTarget.dataset.x,
      y: event.currentTarget.dataset.y,
    });
    event.currentTarget.removeEventListener("click", attackCell);
  };

  const getGrid = (player) => {
    const grid = document.createElement("div");
    grid.classList.add("grid", player);
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
        const cell = getCell(x, y);
        if (player !== "playerOne") {
          cell.addEventListener("click", attackCell);
        }

        grid.appendChild(cell);
      }
    }
    return grid;
  };

  const newGrid = (player) => {
    const div = document.querySelector(".content");
    div.appendChild(getGrid(player));
  };

  const placeShip = (msg, { player, x, y, length, axis }) => {
    const board = document.querySelector(`.grid.${player}`);
    const xInt = parseInt(x, 10);
    const yInt = parseInt(y, 10);

    for (let i = 0; i < length; i += 1) {
      const deltaX = axis === "x" ? xInt + i : xInt;
      const deltaY = axis === "y" ? yInt - i : yInt;
      const cell = board.querySelector(
        `[data-x='${deltaX}'][data-y='${deltaY}']`
      );
      cell.classList.add("ship");
    }
  };

  const receiveAttack = (msg, { player, x, y }) => {
    const board = document.querySelector(`.grid.${player}`);
    const cell = board.querySelector(`[data-x='${x}'][data-y='${y}']`);
    cell.classList.add("hit");
  };

  const gameOver = (msg, { winner }) => {
    const cells = document.querySelectorAll(".playerTwo>.cell");
    cells.forEach((cell) => cell.removeEventListener("click", attackCell));

    const container = document.querySelector(".content");
    container.textContent = `Player ${
      winner === "playerOne" ? "One" : "Two"
    } wins!`;
  };

  PubSub.subscribe("SHIP_PLACED", placeShip);
  PubSub.subscribe("ATTACK_RECEIVED", receiveAttack);
  PubSub.subscribe("GAME_OVER", gameOver);

  return {
    getCell,
    getGrid,
    newGrid,
  };
};

export default DisplayController;
