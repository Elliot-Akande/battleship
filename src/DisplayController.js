import PubSub from "pubsub-js";

const DisplayController = () => {
  const getCell = (x, y) => {
    const cell = document.createElement("div");
    cell.dataset.x = x;
    cell.dataset.y = y;
    cell.classList.add("cell");

    cell.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    });

    cell.addEventListener("drop", (event) => {
      event.preventDefault();

      const data = JSON.parse(event.dataTransfer.getData("text/plain"));
      const xCoord = parseInt(event.currentTarget.dataset.x, 10);
      const yCoord = parseInt(event.currentTarget.dataset.y, 10);

      PubSub.publish("RQST_PLACE_SHIP", {
        ...data,
        x: data.axis === "x" ? xCoord - data.cell : xCoord,
        y: data.axis === "y" ? yCoord + data.cell : yCoord,
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

    const ship = document.querySelector(`.ship[data-length='${length}']`);
    if (!ship) return;
    ship.remove();

    const shipDiv = document.querySelector(".shipDiv");
    if (!shipDiv.hasChildNodes()) {
      shipDiv.parentNode.remove();
      PubSub.publish("ALL_SHIPS_PLACED");
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

  const currentCellOffset = (event) => {
    const { axis, length } = event.currentTarget.dataset;
    if (axis === "x") {
      const cellSize = event.currentTarget.offsetHeight / length;
      return Math.floor(event.offsetY / cellSize);
    }

    const cellSize = event.currentTarget.offsetWidth / length;
    return Math.floor(
      (event.currentTarget.offsetWidth - event.offsetX) / cellSize
    );
  };

  const boardSetup = (player, ships) => {
    newGrid("playerOne");
    const container = document.querySelector(".content");
    const shipSelection = document.createElement("div");
    shipSelection.classList.add("shipSelection");

    const shipText = document.createElement("p");
    shipText.textContent = "Double click to rotate";

    const shipDiv = document.createElement("div");
    shipDiv.classList.add("shipDiv");

    ships.forEach((ship) => {
      const shipElement = document.createElement("div");
      shipElement.dataset.length = ship;
      shipElement.dataset.axis = "x";
      shipElement.classList.add("ship");
      shipElement.draggable = true;

      shipElement.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData(
          "text/plain",
          JSON.stringify({
            length: event.currentTarget.dataset.length,
            axis: event.currentTarget.dataset.axis,
            cell: currentCellOffset(event),
            player,
          })
        );
      });

      shipElement.addEventListener("dblclick", (event) => {
        const elem = event.currentTarget;
        elem.dataset.axis = elem.dataset.axis === "x" ? "y" : "x";
      });

      for (let i = 0; i < ship; i += 1) {
        const cell = document.createElement("div");
        shipElement.appendChild(cell);
      }

      shipDiv.appendChild(shipElement);
    });

    shipSelection.appendChild(shipText);
    shipSelection.appendChild(shipDiv);
    container.appendChild(shipSelection);
  };

  PubSub.subscribe("SHIP_PLACED", placeShip);
  PubSub.subscribe("ATTACK_RECEIVED", receiveAttack);
  PubSub.subscribe("GAME_OVER", gameOver);

  return {
    getCell,
    getGrid,
    newGrid,
    boardSetup,
  };
};

export default DisplayController;
