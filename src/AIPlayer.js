import Player from "./Player";

const AIPlayer = () => {
  const player = Player("CPU");

  const placeShip = (length) => {
    for (let i = 0; i < 100; i += 1) {
      try {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const axis = Math.floor(Math.random() * 2) === 0 ? "x" : "y";
        player.placeShip(x, y, length, axis);
        // console.table(
        //   player
        //     .getBoard()
        //     .getBoard()
        //     .map((row) =>
        //       row.map((cell) =>
        //         Object.prototype.hasOwnProperty.call(cell, "ship") ? "X" : ""
        //       )
        //     )
        // );
        return;
      } catch (error) {}
    }

    throw new Error("Unable to generate ship placement");
  };

  const attack = () => {
    for (let i = 0; i < 100; i += 1) {
      try {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        player.attack(x, y);
        return;
      } catch (error) {}
    }
  };

  return {
    ...player,
    placeShip,
    attack,
  };
};

export default AIPlayer;
