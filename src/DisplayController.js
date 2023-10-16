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

  return {
    getCell,
    getGrid,
  };
};

export default DisplayController;
