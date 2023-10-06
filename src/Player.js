import Gameboard from "./Gameboard";

const Player = (name = "Player") => {
  const board = Gameboard();
  let opponent;

  const getName = () => name;

  const setOpponent = (value) => {
    opponent = value;
  };

  const attack = (x, y) => opponent.receiveAttack(x, y);

  return {
    ...board,
    getName,
    setOpponent,
    attack,
  };
};

export default Player;
