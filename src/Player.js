import PubSub from "pubsub-js";
import Gameboard from "./Gameboard";

const Player = (name = "Player") => {
  const board = Gameboard();
  let opponent;

  const getName = () => name;

  const setOpponent = (value) => {
    opponent = value;
  };

  const receiveAttack = (x, y) => {
    board.receiveAttack(x, y);
    PubSub.publish("ATTACK_RECEIVED", { player: name, x, y });
  };

  const attack = (x, y) => opponent.receiveAttack(x, y);

  const placeShip = (msg, { x, y, length, axis, player }) => {
    if (player !== name) return;
    try {
      board.placeShip(
        parseInt(x, 10),
        parseInt(y, 10),
        parseInt(length, 10),
        axis
      );
      PubSub.publish("SHIP_PLACED", { player: name, x, y, length, axis });
    } catch {}
  };

  PubSub.subscribe("RQST_PLACE_SHIP", placeShip);

  return {
    ...board,
    getName,
    setOpponent,
    attack,
    receiveAttack,
  };
};

export default Player;
