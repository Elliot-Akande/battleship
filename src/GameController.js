import AIPlayer from "./AIPlayer";
import Player from "./Player";

const GameController = () => {
  const ships = [2, 2, 2, 2, 3, 3, 3, 4, 4, 5];
  const playerOne = Player("Elliot");
  const playerTwo = AIPlayer();
};

export default GameController;
