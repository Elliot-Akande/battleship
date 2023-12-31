import Gameboard from "./Gameboard";

describe(".placeShip()", () => {
  let board;

  beforeEach(() => {
    board = Gameboard();
  });

  describe("Vertical ship", () => {
    test("Ship spans 3 cells", () => {
      board.placeShip(5, 5, 3, "y");
      expect(board.getBoard()[5][5]).toHaveProperty("ship");
      expect(board.getBoard()[5][4]).toHaveProperty("ship");
      expect(board.getBoard()[5][3]).toHaveProperty("ship");
    });

    test("Ship ship doesn't exceed length", () => {
      board.placeShip(5, 5, 3, "y");
      const { ship } = board.getBoard()[5][5];

      expect(board.getBoard()[5][5].ship).toBe(ship);
      expect(board.getBoard()[5][4].ship).toBe(ship);
      expect(board.getBoard()[5][3].ship).toBe(ship);

      expect(board.getBoard()[5][6].ship).not.toBe(ship);
      expect(board.getBoard()[5][2].ship).not.toBe(ship);
    });

    test("Throws error if ship overflows grid", () => {
      expect(() => board.placeShip(0, 0, 3, "y")).toThrow();
      expect(() => board.placeShip(0, 1, 3, "y")).toThrow();
      expect(() => board.placeShip(0, 2, 3, "y")).not.toThrow();
    });
  });

  describe("Horizontal ship", () => {
    test("Ship spans 3 cells", () => {
      board.placeShip(5, 5, 3, "x");
      expect(board.getBoard()[5][5]).toHaveProperty("ship");
      expect(board.getBoard()[6][5]).toHaveProperty("ship");
      expect(board.getBoard()[7][5]).toHaveProperty("ship");
    });

    test("Ship ship doesn't exceed length", () => {
      board.placeShip(5, 5, 3, "x");
      const { ship } = board.getBoard()[5][5];

      expect(board.getBoard()[5][5].ship).toBe(ship);
      expect(board.getBoard()[6][5].ship).toBe(ship);
      expect(board.getBoard()[7][5].ship).toBe(ship);

      expect(board.getBoard()[4][5].ship).not.toBe(ship);
      expect(board.getBoard()[8][5].ship).not.toBe(ship);
    });

    test("Throws error if ship overflows grid", () => {
      expect(() => board.placeShip(9, 9, 3, "x")).toThrow();
      expect(() => board.placeShip(8, 9, 3, "x")).toThrow();
      expect(() => board.placeShip(7, 9, 3, "x")).not.toThrow();
    });

    test("Throws error if ships overlap", () => {
      board.placeShip(4, 4, 3, "x");
      expect(() => board.placeShip(5, 5, 3, "y")).toThrow();
    });
  });
});

describe(".receiveAttack", () => {
  let board;

  beforeEach(() => {
    board = Gameboard();
    board.placeShip(5, 5, 4, "y");
    board.placeShip(1, 7, 2, "x");
    board.placeShip(1, 4, 3, "x");
    board.placeShip(3, 0, 5, "x");
    board.placeShip(6, 9, 3, "x");
    board.placeShip(8, 7, 3, "y");
  });

  test("Empty cell becomes hit", () => {
    board.receiveAttack(0, 0);
    expect(board.getBoard()[0][0].isHit).toBe(true);
  });

  test("Already hit cell throws error", () => {
    board.receiveAttack(0, 0);
    expect(() => board.receiveAttack(0, 0)).toThrow();
  });

  test("Targeted ship recieves hit", () => {
    const hits = board.getBoard()[5][5].ship.getHits();
    board.receiveAttack(5, 5);
    expect(board.getBoard()[5][5].ship.getHits()).toBe(hits + 1);
  });
});
