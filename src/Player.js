import Gameboard from "./Gameboard";

const Player = (name = "Player") => {
  const board = Gameboard();

  return {
    ...board,
    getName: () => name,
  };
};

export default Player;
