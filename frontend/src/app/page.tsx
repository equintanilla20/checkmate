// pages/index.js (or app/page.js for App Router)
'use client';

import { useState, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

export default function Home() {
    const [game, setGame] = useState(new Chess());

    // Function to safely mutate the game state
    const safeGameMutate = useCallback((modify: (arg0: Chess) => void) => {
        setGame((oldGame) => {
        const newGame = new Chess(oldGame.fen()); // Create a new Chess instance from the old FEN
        modify(newGame);
        return newGame;
        });
    }, []);

    function onDrop(sourceSquare: any, targetSquare: any) {
        let move = null;
        safeGameMutate((game) => {
        try {
            move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q', // Always promote to a queen for simplicity, you'd add a promotion dialog
            });
        } catch (e) {
            // Handle invalid moves (e.g., if chess.js throws an error)
            console.error("Invalid move:", e);
        }
        });

        if (move === null) return false; // Illegal move

        // You might want to add AI move logic here if it's single player
        // setTimeout(makeRandomMove, 200); // Example for AI

        return true; // Valid move
    }

    // Example of a random move function for a simple AI (for single-player)
    // function makeRandomMove() {
    //   const possibleMoves = game.moves();
    //   if (game.game_over() || game.draw() || possibleMoves.length === 0) return; // Game over

    //   const randomIdx = Math.floor(Math.random() * possibleMoves.length);
    //   safeGameMutate((game) => {
    //     game.move(possibleMoves[randomIdx]);
    //   });
    // }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h1>Next.js Chess Game</h1>
        <div style={{ width: 'min(90vw, 500px)' }}> {/* Responsive chessboard */}
            <Chessboard
            id="PlayVsPlay"
            position={game.fen()}
            onPieceDrop={onDrop}
            />
        </div>
        <p>{game.pgn()}</p> {/* Display PGN (Portable Game Notation) of the game */}
        {game.isGameOver() && <p>Game Over!</p>}
        {game.isCheckmate() && <p>Checkmate!</p>}
        {game.isStalemate() && <p>Stalemate!</p>}
        {game.isDraw() && <p>Draw!</p>}
        </div>
    );
}