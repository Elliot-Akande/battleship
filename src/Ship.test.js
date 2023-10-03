import Ship from "./Ship";

describe(".hit()", () => {
  test("Increments and returns hits", () => {
    const ship = Ship(3);
    expect(ship.hit()).toBe(1);
    expect(ship.hit()).toBe(2);
    expect(ship.hit()).toBe(3);
  });
  test("Stops incrementing at max", () => {
    const ship = Ship(2);
    expect(ship.hit()).toBe(1);
    expect(ship.hit()).toBe(2);
    expect(ship.hit()).toBe(2);
  });
});
