import Gameboard from "./Gameboard";

const Player = (name = "Player") => {
  const board = Gameboard();

  return {
    getBoard: () => board,
    getName: () => name,
  };
};

export default Player;
