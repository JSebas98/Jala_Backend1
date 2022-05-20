import express from 'express';
import "reflect-metadata";
import { Game } from '../entity/game';
import { Message } from '../entity/message';

import { BoardService } from '../service/board.service';
import { GameService } from '../service/game.service';
import { File, Rank } from '../shared/types';
import { PieceService } from '../service/piece.service';

const app = express();
app.use(express.json());
const port = 3000;

const pieceService = new PieceService();
const boardService = new BoardService(pieceService);
const gameService = new GameService(boardService);

app.post('/new', (request, response) => {
    response.status(201).json(gameService.createNewGame());
});

app.get('/game', (request, response) => {
    if (gameService.getCurrentGame()) {
        response.status(200).json(gameService.getCurrentGame());
    } else {
        response.status(204).json(new Message('No game has been created. Create a new game.'));
    }

});

app.post('/game/restart', (request, response) => {
    response.status(201).json(gameService.restartGame());
})

app.post('/game/move', (request, response) => {
    
    if (Array.isArray(request.body.currentSquare) ||
        Array.isArray(request.body.targetSquare)) {
        response.status(400).json(new Message('You can only make one move per turn. Try again with only one Current square and only one Target square.'));
    } else {
        let initialFile: File = request.body.currentSquare.file;
        let initialRank: Rank = request.body.currentSquare.rank;
        let targetFile: File = request.body.targetSquare.file;
        let targetRank: Rank = request.body.targetSquare.rank;

        let responseMovePiece: Game | Message = gameService.movePiece(initialFile, initialRank, targetFile, targetRank);
        
        if (responseMovePiece instanceof Message) {
            response.status(400).json(responseMovePiece);
        } else {  
            response.status(201).json(responseMovePiece);
        }
    }
})

app.listen(port, () =>{
    console.log(`server listening on port ${port}`);
});
