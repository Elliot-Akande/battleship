import PubSub from "pubsub-js";

const GameController = (playerOne, playerTwo, ships) => {
  playerOne.setOpponent(playerTwo);
  playerTwo.setOpponent(playerOne);

  const setup = () => {
    ships.forEach((ship) => playerTwo.placeShip(ship));
  };

  const play = (msg, { x, y }) => {
    playerOne.attack(x, y);
    if (playerTwo.hasNoShips()) {
      PubSub.publish("GAME_OVER", { winner: playerOne.getName() });
      return;
    }

    playerTwo.attack();
    if (playerOne.hasNoShips()) {
      PubSub.publish("GAME_OVER", { winner: playerTwo.getName() });
    }
  };

  PubSub.subscribe("ATTACK_CELL", play);

  return {
    setup,
    play,
  };
};

export default GameController;
