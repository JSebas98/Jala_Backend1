import express from 'express';
import "reflect-metadata";

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
    response.status(200).json(gameServ.getCurrentGame());
});

// Restart game
app.post('/game/restart', (request, response) => {
    response.status(201).json(gameServ.restartGame());
})

// Make a move
app.post('/game/move', (request, response) => {
    let initialFile: File = request.body.currentSquare.file;
    let initialRank: Rank = request.body.currentSquare.rank;
    let goalFile: File = request.body.goalSquare.file;
    let goalRank: Rank = request.body.goalSquare.rank;
    
    response.send(gameServ.movePiece(initialFile, initialRank, goalFile, goalRank));
})

app.listen(port, () =>{
    console.log(`server listening on port ${port}`);
});
