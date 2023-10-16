import DisplayController from "./DisplayController";

let display;

beforeEach(() => {
  display = DisplayController();
});

describe(".getCell()", () => {
  test("happy path", () => {
    const cell = display.getCell(3, 7);
    expect(cell instanceof HTMLElement).toBeTruthy();
    expect(parseInt(cell.dataset.x, 10)).toBe(3);
    expect(parseInt(cell.dataset.y, 10)).toBe(7);
  });
});
