import PubSub from "pubsub-js";
import GameController from "./GameController";
import DisplayController from "./DisplayController";
import Player from "./Player";
import AIPlayer from "./AIPlayer";
import "./style.css";

const ships = [2, 3, 3, 4, 5];
const playerOne = Player("playerOne");
const playerTwo = AIPlayer();

const game = GameController(playerOne, playerTwo, ships);
const display = DisplayController();

display.boardSetup(playerOne.getName(), ships);

PubSub.subscribe("ALL_SHIPS_PLACED", () => {
  game.setup();
  display.newGrid(playerTwo.getName());
});
