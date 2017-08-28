# JSTicTacToe
A Tic-Tac-Toe Game made in JavaScript, with some Artificial Intelligence Tests
## Current Game Modes
The first player always is a human. The second player can be chosen as:
- Human
	- The opponent is a human player
- Random Selection AI
	- The Computer will just select a random move.
- Try Win AI
	- If a winning move is available, the computer do it, else, it use the 'Random Selection AI' strategy.
- Minimax
	- The computer will do a 3 level minimax search, if it doesn't succeed with a winning move, the computer will use the 'Try Win AI' strategy.
- Fixed
	- The computer has a fixed plan, and use the 'Try Win AI" strategy.