import AIPlayer from "./AIPlayer";
import Player from "./Player";

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

describe(".attack()", () => {
  let ai;
  let player;

  beforeEach(() => {
    player = Player();
    ai = AIPlayer();
    ai.setOpponent(player);
    player.setOpponent(ai);
  });

  test("Attacking increases hit count by 1", () => {
    const hitCount = () =>
      player
        .getBoard()
        .reduce(
          (prevRow, row) =>
            prevRow +
            row.reduce((prevCell, cell) => prevCell + (cell.isHit ? 1 : 0), 0),
          0
        );

    const prevHitCount = hitCount();
    ai.attack();

    expect(hitCount()).toBe(prevHitCount + 1);
  });
});
