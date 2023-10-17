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

  const placeShip = (x, y, length, axis) => {
    board.placeShip(
      parseInt(x, 10),
      parseInt(y, 10),
      parseInt(length, 10),
      axis
    );
    PubSub.publish("SHIP_PLACED", { player: name, x, y, length, axis });
  };

  PubSub.subscribe("RQST_PLACE_SHIP", (msg, { x, y, length, axis, player }) => {
    if (player !== name) return;
    try {
      placeShip(x, y, length, axis);
    } catch {}
  });

  return {
    ...board,
    getName,
    setOpponent,
    attack,
    receiveAttack,
    placeShip,
  };
};

export default Player;
