import AIPlayer from "./AIPlayer";

describe(".placeShip()", () => {
  let ai;
  beforeEach(() => {
    ai = AIPlayer();
  });

  test("Place ship w/ length 3 increases number of ship cells by 3", () => {
    const shipCellCount = () =>
      ai
        .getBoard()
        .reduce(
          (prevRow, row) =>
            prevRow +
            row.reduce(
              (prevCell, cell) =>
                prevCell +
                (Object.prototype.hasOwnProperty.call(cell, "ship") ? 1 : 0),
              0
            ),
          0
        );

    const prevShipCells = shipCellCount();
    ai.placeShip(3);

    expect(shipCellCount()).toBe(prevShipCells + 3);
  });
});
