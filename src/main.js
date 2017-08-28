/** 
 * Global variables
 **/
var board = [0,0,0,
			 0,0,0,
			 0,0,0];
var running = true;
var xTurn = true;
var folder = 'img';
const FULL_RECURSIVE_MINIMAX = false;

/*************
 * Functions *
 *************/

/** 
 * passTurn()
 * Verify the board and check for a winner, if the game continue and is the computer
 * turn, make a move. Then, pass the turn back to the player.
 **/
function passTurn(){
	var win = verifyBoard();
	if(win==-1){
		document.getElementById('output').innerHTML = "O - Wins!!!";
	}
	else if(win==1){
		document.getElementById('output').innerHTML = "X - Wins!!!";
	}
	else if(win==3){
		document.getElementById('output').innerHTML = "DRAW!!!";
	}
	else if(running && !xTurn){
		var opponent = document.gameOptions.list.value;
		if(opponent=='rsa'){
			document.getElementById('output').innerHTML = "Planning some random action!";
			rsaAction();
		}
		else if(opponent == 'twa'){
			document.getElementById('output').innerHTML = "Planning to not lose!";
			twaAction();
		}
		else if(opponent == 'minimax'){
			document.getElementById('output').innerHTML = "Here goes Minimax!";
			miniMax();
		}
		else if(opponent == 'fixed'){
			document.getElementById('output').innerHTML = "U'll loooose!";
			fixedAction();
		}
	}
	else if(xTurn){
		document.getElementById('output').innerHTML = "Do your move!";
	}
	else{
		document.getElementById('output').innerHTML = "Something happened...";
	}
}

/**
 * rsaAction()
 * Make a move based on the 'Random Selection AI' strategy, i.e., just select a 
 * random square.
 **/
function rsaAction(){
	var empty = [];
	for(var i=0; i<9; ++i){
		if(board[i]==0)empty.push(i);
	}
	clickSquare(empty[Math.floor(Math.random()*empty.length)]);
}
/**
 * fixedAction()
 * A fixed plan, based on game analysis.
 **/
function fixedAction(){
	if(board[4]==0) clickSquare(4);// Priority to play in the middle
	else if(board[0]==0 && board[2]==0 && board[6]==0 && board[8]==0) clickSquare(0);
	else if(board[4]>0 && board[8]>0 && board[0]<0 && board[6]==0) clickSquare(6);
	else if(board[4]<0 && board[0]>0 && board[8]>0 && board[1]==0) clickSquare(1);
	else if(board[4]<0 && board[2]>0 && board[6]>0 && board[1]==0) clickSquare(1);
	else twaAction();
}
/**
 * twaAction()
 * Make a move based on the 'Try to Win' strategy, i.e., just check if there is
 * a winning move or a move that avoid loosing, if so, do it, else, just call rsaAction().
 **/
function twaAction(){
	// Winning moves
	if(board[0]+board[1]==-2 && (board[2]==0)) clickSquare(2);
	else if(board[1]+board[2]==-2 && (board[0]==0)) clickSquare(0);
	else if(board[0]+board[2]==-2 && (board[1]==0)) clickSquare(1);
	else if(board[3]+board[4]==-2 && (board[5]==0)) clickSquare(5);
	else if(board[5]+board[4]==-2 && (board[3]==0)) clickSquare(3);
	else if(board[3]+board[5]==-2 && (board[4]==0)) clickSquare(4);
	else if(board[6]+board[7]==-2 && (board[8]==0)) clickSquare(8);
	else if(board[6]+board[8]==-2 && (board[7]==0)) clickSquare(7);
	else if(board[7]+board[8]==-2 && (board[6]==0)) clickSquare(6);
	else if(board[0]+board[3]==-2 && (board[6]==0)) clickSquare(6);
	else if(board[0]+board[6]==-2 && (board[3]==0)) clickSquare(3);
	else if(board[3]+board[6]==-2 && (board[0]==0)) clickSquare(0);
	else if(board[1]+board[4]==-2 && (board[7]==0)) clickSquare(7);
	else if(board[1]+board[7]==-2 && (board[4]==0)) clickSquare(4);
	else if(board[4]+board[7]==-2 && (board[1]==0)) clickSquare(1);
	else if(board[2]+board[5]==-2 && (board[8]==0)) clickSquare(8);
	else if(board[2]+board[8]==-2 && (board[5]==0)) clickSquare(5);
	else if(board[5]+board[8]==-2 && (board[2]==0)) clickSquare(2);
	else if(board[0]+board[4]==-2 && (board[8]==0)) clickSquare(8);
	else if(board[0]+board[8]==-2 && (board[4]==0)) clickSquare(4);
	else if(board[4]+board[8]==-2 && (board[0]==0)) clickSquare(0);
	else if(board[2]+board[4]==-2 && (board[6]==0)) clickSquare(6);
	else if(board[6]+board[2]==-2 && (board[4]==0)) clickSquare(4);
	else if(board[4]+board[6]==-2 && (board[2]==0)) clickSquare(2);
	// Avoid loosing
	else if(board[0]+board[1]==2 && (board[2]==0)) clickSquare(2);
	else if(board[1]+board[2]==2 && (board[0]==0)) clickSquare(0);
	else if(board[0]+board[2]==2 && (board[1]==0)) clickSquare(1);
	else if(board[3]+board[4]==2 && (board[5]==0)) clickSquare(5);
	else if(board[5]+board[4]==2 && (board[3]==0)) clickSquare(3);
	else if(board[3]+board[5]==2 && (board[4]==0)) clickSquare(4);
	else if(board[6]+board[7]==2 && (board[8]==0)) clickSquare(8);
	else if(board[6]+board[8]==2 && (board[7]==0)) clickSquare(7);
	else if(board[7]+board[8]==2 && (board[6]==0)) clickSquare(6);
	else if(board[0]+board[3]==2 && (board[6]==0)) clickSquare(6);
	else if(board[0]+board[6]==2 && (board[3]==0)) clickSquare(3);
	else if(board[3]+board[6]==2 && (board[0]==0)) clickSquare(0);
	else if(board[1]+board[4]==2 && (board[7]==0)) clickSquare(7);
	else if(board[1]+board[7]==2 && (board[4]==0)) clickSquare(4);
	else if(board[4]+board[7]==2 && (board[1]==0)) clickSquare(1);
	else if(board[2]+board[5]==2 && (board[8]==0)) clickSquare(8);
	else if(board[2]+board[8]==2 && (board[5]==0)) clickSquare(5);
	else if(board[5]+board[8]==2 && (board[2]==0)) clickSquare(2);
	else if(board[0]+board[4]==2 && (board[8]==0)) clickSquare(8);
	else if(board[0]+board[8]==2 && (board[4]==0)) clickSquare(4);
	else if(board[4]+board[8]==2 && (board[0]==0)) clickSquare(0);
	else if(board[2]+board[4]==2 && (board[6]==0)) clickSquare(6);
	else if(board[6]+board[2]==2 && (board[4]==0)) clickSquare(4);
	else if(board[4]+board[6]==2 && (board[2]==0)) clickSquare(2);
	else rsaAction();
}

/**
 * shuffle(array)
 * @return: array
 * Take a array, shuffle the content, give it back.
 */
function shuffle(array){
	var idx = array.length, temp, randIdx;
	while(idx!=0){
		// Get a random item from array
		randIdx = Math.floor(Math.random()*idx);
		idx-=1;
		// Switch
		temp = array[idx];
		array[idx]=array[randIdx];
		array[randIdx]=temp;
	}
	return array;
}

/**
 * copy(array)
 * @return: array
 * Recive a array, and create a copy of it.
 */
function copy(array){
	var newArray = [];
	var i = array.length;
	while(i--) newArray[i] = array[i];
	return newArray;
}

/**
 * miniMax()
 * Make a move based on the 'Minimax' strategy, i.e., create a tree of possibilities
 * and decide for the best move to get the best chance of winning.
 */
function miniMax(){
	var possibleMoves = [];
	var bestMove = null;
	var bestPoints = 0;
	var calls = 0;
	// Get a list of empty squares
	for(var i=0; i<9;++i){
		if(board[i]==0){
			possibleMoves.push(i);
		}
	}
	// shuffle the possible Moves, to avoid getting the same 'best move' everytime.
	possibleMoves = shuffle(possibleMoves);
	for(var i=0; i< possibleMoves.length;++i){
		// TODO: Avoid creating a copy of the board for every possible move.
		var stepBoard = copy(board);
		var move = possibleMoves[i];
		stepBoard[move] = -1;
		var points = miniMaxBoard(stepBoard, false);

		if(bestMove==null || bestPoints < points){
			bestMove = possibleMoves[i];
			bestPoints = points;
		}
	}

	if(bestMove != null){
		// If find a good move, do it
		clickSquare(bestMove);
	}
	else{
		// If doesn't find a good move, just call rsaAction(). (This shouldn't happen)
		rsaAction();
	}
}

function miniMaxBoard(boardCheck, Oturn){
	var boardRes = countBoardPoints(boardCheck);
	var pts=0;
	var calls=0;
	switch(boardRes){
		case -1:
			pts = 1;
			break;
		case 1:
			pts = -1;
			break;
		case 0:
			pts = 0;
			// Goes one step further, with the second movement.
			var possibleMoves = [];
			for(var i=0; i<9;++i){
				if(boardCheck[i]==0){
					possibleMoves.push(i);
				}
			}
			for(var i=0; i< possibleMoves.length;++i){
				var move = possibleMoves[i];
				var stepBoard = copy(board);
				stepBoard[move] = (Oturn)?-1:1;
				// TODO: Make the recursive method work!!!
				if(FULL_RECURSIVE_MINIMAX){
					// This is causing problems with a lot of recursion
					pts += miniMax(stepBoard, !Oturn);
				}
				// Here we use a 'brute force' minimax, without recursion, but with only one more step
				else{// Check the second movement.
					var board2Res = countBoardPoints(stepBoard);
					if(board2Res == -1)
						pts+=1;
					else if(board2Res == 1)
						pts+=-1;
					else{
						// Goes one step further, with the third movement.
						var possibleMoves3 = [];
						for(var j=0; j<9;++j){
							if(stepBoard[j]==0){
								possibleMoves3.push(j);
							}
						}
						for(var j=0; j<possibleMoves3.length; ++j){
							var move3 = possibleMoves3[j];
							var stepBoard3 = copy(stepBoard);
							stepBoard3[move] = (!Oturn)?-1:1;
							var board3Res = countBoardPoints(stepBoard3);
							// Check the third movement.
							if(board3Res == -1){
								pts+=1;
							}
							else if(board3Res == 1){
								pts+=-1;
							}
						}
					}
				}
			}
			break;
		default:
			break;
	}
	return pts;
}
/**
 * countBoardPoints(boardCheck)
 * returns:
 * 	-1 : O win
 * 	 1 : X win
 *	 3 : Draw
 *	 0 : Game is running
 */
function countBoardPoints(boardCheck){
	if(Math.abs(boardCheck[0]+boardCheck[1]+boardCheck[2])==3)	return boardCheck[0];
	else if(Math.abs(boardCheck[3]+boardCheck[4]+boardCheck[5])==3) return boardCheck[3];
	else if(Math.abs(boardCheck[6]+boardCheck[7]+boardCheck[8])==3) return boardCheck[6];
	else if(Math.abs(boardCheck[0]+boardCheck[3]+boardCheck[6])==3) return boardCheck[0];
	else if(Math.abs(boardCheck[1]+boardCheck[4]+boardCheck[7])==3) return boardCheck[1];
	else if(Math.abs(boardCheck[2]+boardCheck[5]+boardCheck[8])==3) return boardCheck[2];
	else if(Math.abs(boardCheck[0]+boardCheck[4]+boardCheck[8])==3) return boardCheck[0];
	else if(Math.abs(boardCheck[2]+boardCheck[4]+boardCheck[6])==3) return boardCheck[2];
	var sum = 0;
	for(var i=0;i<9;i++){
		sum += Math.abs(boardCheck[i]);
	}
	if(sum==9){
		return 3;
	}
	return 0;
}

function verifyBoard(){
	if(Math.abs(board[0]+board[1]+board[2])==3){
		running = false;
		document.getElementById('p0').className = "winsquare";
		document.getElementById('p1').className = "winsquare";
		document.getElementById('p2').className = "winsquare";
		return board[0];
	}
	else if(Math.abs(board[3]+board[4]+board[5])==3){
		running = false;
		document.getElementById('p3').className = "winsquare";
		document.getElementById('p4').className = "winsquare";
		document.getElementById('p5').className = "winsquare";
		return board[3];
	}
	else if(Math.abs(board[6]+board[7]+board[8])==3){
		running = false;
		document.getElementById('p6').className = "winsquare";
		document.getElementById('p7').className = "winsquare";
		document.getElementById('p8').className = "winsquare";
		return board[6];
	}
	else if(Math.abs(board[0]+board[3]+board[6])==3){
		running = false;
		document.getElementById('p0').className = "winsquare";
		document.getElementById('p3').className = "winsquare";
		document.getElementById('p6').className = "winsquare";
		return board[0];
	}
	else if(Math.abs(board[1]+board[4]+board[7])==3){
		running = false;
		document.getElementById('p1').className = "winsquare";
		document.getElementById('p4').className = "winsquare";
		document.getElementById('p7').className = "winsquare";
		return board[1];
	}
	else if(Math.abs(board[2]+board[5]+board[8])==3){
		running = false;
		document.getElementById('p2').className = "winsquare";
		document.getElementById('p5').className = "winsquare";
		document.getElementById('p8').className = "winsquare";
		return board[2];
	}
	else if(Math.abs(board[0]+board[4]+board[8])==3){
		running = false;
		document.getElementById('p0').className = "winsquare";
		document.getElementById('p4').className = "winsquare";
		document.getElementById('p8').className = "winsquare";
		return board[0];
	}
	else if(Math.abs(board[2]+board[4]+board[6])==3){
		running = false;
		document.getElementById('p2').className = "winsquare";
		document.getElementById('p4').className = "winsquare";
		document.getElementById('p6').className = "winsquare";
		return board[2];
	}

	var sum = 0;
	for(var i=0;i<9;i++){
		sum += Math.abs(board[i]);
	}
	if(sum==9){
		return 3;
	}
	return 0;
}

function getXImg(){
	var files = ["X1", "X2", "X3", "X4"];
	return folder+"/"+files[Math.floor(Math.random()*files.length)]+".png";
}

function getOImg(){
	var files = ["O1", "O2", "O3", "O4"];
	return folder+"/"+files[Math.floor(Math.random()*files.length)]+".png";
}

function selectRandomBoard(){
	var files = ["tictactoe1", "tictactoe2", "tictactoe3"];
	return files[Math.floor(Math.random()*files.length)];
}

function clickSquare(pos){
	var id = 'p' + pos;
	if(running && board[pos]==0){
		if(xTurn){
			board[pos]=1;
			document.getElementById(id).src = getXImg();
		}
		else{
			board[pos]=-1;
			document.getElementById(id).src = getOImg();
		}
		xTurn=!xTurn;
		passTurn();
	}
	else{
		document.getElementById('output').innerHTML = "That is not a valid move!";
	}
}

function resetBoard(){
	var design = document.gameDesign.list2.value;
	document.getElementById('output').innerHTML = "X Starts!";
	board = [0,0,0,
			 0,0,0,
			 0,0,0];
	running = true;
	xTurn = true;
	folder = ["img", "img_obj", "img_sing"][design];
	document.getElementById('board').className = selectRandomBoard();
	for(var i=0;i<9;++i){
		document.getElementById('p'+i).src = folder+"/Space.png";
		document.getElementById('p'+i).className = "square";
	}
}

/** 
 * Define buttons actions
 **/
document.getElementById('board').className = selectRandomBoard();
document.getElementById('p0').onclick = function(event){clickSquare(0)}
document.getElementById('p1').onclick = function(event){clickSquare(1)}
document.getElementById('p2').onclick = function(event){clickSquare(2)}
document.getElementById('p3').onclick = function(event){clickSquare(3)}
document.getElementById('p4').onclick = function(event){clickSquare(4)}
document.getElementById('p5').onclick = function(event){clickSquare(5)}
document.getElementById('p6').onclick = function(event){clickSquare(6)}
document.getElementById('p7').onclick = function(event){clickSquare(7)}
document.getElementById('p8').onclick = function(event){clickSquare(8)}
document.getElementById('resetbt').onclick = function(event){resetBoard()}
