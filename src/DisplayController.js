const DisplayController = () => {
  const getCell = (x, y) => {
    const cell = document.createElement("div");
    cell.dataset.x = x;
    cell.dataset.y = y;
    cell.classList.add("cell");
    return cell;
  };

  return {
    getCell,
  };
};

export default DisplayController;
