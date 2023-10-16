import PubSub from "pubsub-js";
import AIPlayer from "./AIPlayer";
import Player from "./Player";

const GameController = () => {
  const ships = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5];
  const playerOne = Player("Elliot");
  const playerTwo = AIPlayer();

  playerOne.setOpponent(playerTwo);
  playerTwo.setOpponent(playerOne);

  const setup = () => {
    ships.forEach((ship) => playerTwo.placeShip(ship));
    ships.forEach((ship) => {
      for (let i = 0; i < 100; i += 1) {
        try {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          const axis = Math.floor(Math.random() * 2) === 0 ? "x" : "y";
          playerOne.placeShip(x, y, ship, axis);
          return;
        } catch (error) {}
      }
    });
    PubSub.publish("SETUP COMPLETE");
  };

  const play = (x, y) => {
    playerOne.attack(x, y);

    if (playerTwo.hasNoShips()) console.log("Game over!");
    else {
      playerTwo.attack();
      if (playerOne.hasNoShips()) console.log("Game over!");
    }

  };

  return {
    setup,
    play,
  };
};

export default GameController;
