import Gameboard from "./Gameboard";

const Player = (name = "Player") => {
  const board = Gameboard();
  let opponent;

  const setOpponent = (value) => {
    opponent = value;
  };

  const attack = (x, y) => opponent.receiveAttack(x, y);

  return {
    ...board,
    getName: () => name,
    setOpponent,
    attack,
  };
};

export default Player;
