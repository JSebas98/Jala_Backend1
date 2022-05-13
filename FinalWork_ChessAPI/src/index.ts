import express from 'express';
import "reflect-metadata";
import { Game } from '../entity/game';
import { Message } from '../entity/message';

import { BoardService } from '../service/board.service';
import { GameService } from '../service/game.service';
import { File, Rank } from '../shared/types';

// Server consts
const app = express();
app.use(express.json()); // for parsing application/json
const port = 3000;

const boardServ = new BoardService();
const gameServ = new GameService(boardServ);

// Endpoints

// Create new game
app.post('/game', (request, response) => {
    response.status(201).json(gameServ.createNewGame());
});

// Get current game
app.get('/game', (request, response) => {
    if (gameServ.getCurrentGame()) {
        response.status(200).json(gameServ.getCurrentGame());
    } else {
        response.status(204).json(new Message('No game has been created. Create a new game.'));
    }

});

// Restart game
app.post('/game/restart', (request, response) => {
    response.status(201).json(gameServ.restartGame());
})

// Make a move
app.post('/game/move', (request, response) => {
    // Make sure only one move is made.
    if (Array.isArray(request.body.currentSquare) ||
        Array.isArray(request.body.goalSquare)) {
        response.status(400).json(new Message('You can only make one move per turn. Try again with only one Current square and only one Goal square.'));
    } else {
        let initialFile: File = request.body.currentSquare.file;
        let initialRank: Rank = request.body.currentSquare.rank;
        let goalFile: File = request.body.goalSquare.file;
        let goalRank: Rank = request.body.goalSquare.rank;

        // Store result from calling movePiece
        let resMovePiece: Game | Message = gameServ.movePiece(initialFile, initialRank, goalFile, goalRank);
        
        // If result is some kind of error, return right status and message. Else, return Game.
        if (typeof resMovePiece === 'string') {
            response.status(400).json(resMovePiece);
        } else {  
            response.status(201).json(resMovePiece);
        }
    }
})

app.listen(port, () =>{
    console.log(`server listening on port ${port}`);
});
