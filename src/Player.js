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
    board.placeShip(x, y, length, axis);
    PubSub.publish("SHIP_PLACED", { player: name, x, y, length, axis });
  };

  return {
    ...board,
    getName,
    setOpponent,
    attack,
    placeShip,
    receiveAttack,
  };
};

export default Player;
