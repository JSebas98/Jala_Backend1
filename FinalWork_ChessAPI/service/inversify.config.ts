import { Container } from "inversify";
import { IBoardService } from './IBoardService';
import { BoardService } from './board.service';
import { DITypes } from "../shared/inversify.types";
import { GameService } from "./game.service";
import { IGameService } from "./IGameService";

export const container = new Container();

container.bind<IBoardService>(DITypes.IBoardService).to(BoardService);
container.bind<IGameService>(DITypes.IGameService).to(GameService);
