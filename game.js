// Initialize the state of the board.
const state = new State();

// Get the HTML elements.
const status = document.getElementById('status');
const displayResults = document.getElementById('results');


/**
 * 
 * @param {State} state the game state.
 */
function gameOver(state, copy) {

    if (!copy) {
        var count = 0;

        for (let i = 0; i < state.board.length; i++) {
            for (let j = 0; j < state.board[i].length; j++) {
                if (state.board[i][j] != null) {
                    count += 1;
                }
            }
        }

        var totalCells = state.board.length * state.board[0].length;

        if (count == totalCells) {
            // If the stones fill up all of the spots on the board, check
            // for the winner.
            if (state.blackStoneLives > state.whiteStoneLives) {
                console.log("Black Wins!")
                state.value = 1;

                displayResults.innerHTML = "Black Wins!";

            } else if (state.blackStoneLives < state.whiteStoneLives) {
                console.log("White Wins!")
                state.value = -1;

                displayResults.innerHTML = "White Wins!";
            } else {
                console.log("Draw")
                state.value = 0;

                displayResults.innerHTML = "Draw!";
            }

            // Set terminal state to true.
            state.terminal = true;

            console.log("Black", state.blackStoneLives);
            console.log("White", state.whiteStoneLives);
        }
    }
}

function countHorizontal(state, i, j, blackCount, whiteCount) {
    if (state.board[i][j] == 1) {
        // Count horizontal black stones. Reset white
        // stone counter.
        blackCount += 1;
        whiteCount = 0;
    }

    if (state.board[i][j] == 0) {
        // Count horizontal white stones. Reset black
        // stone counter.
        whiteCount += 1;
        blackCount = 0;
    }

    if (blackCount == 4) {
        // If there are 4 horizontal black stones, add a black
        // stone life and reset black stone counter.
        state.blackStoneLives += 1;
        blackCount = 0;
    }

    if (whiteCount == 4) {
        // If there are 4 horizontal white stones, add a white
        // stone life and reset white stone counter.
        state.whiteStoneLives += 1;
        whiteCount = 0;
    }

    return [blackCount, whiteCount];
}

function countVertical(state, i, j, blackCount, whiteCount) {
    if (state.board[j][i] == 1) {
        // Count vertical black stones. Reset white
        // stone counter.
        blackCount += 1;
        whiteCount = 0;
    }

    if (state.board[j][i] == 0) {
        // Count vertical white stones. Reset black
        // stone counter.
        whiteCount += 1;
        blackCount = 0;
    }

    if (blackCount == 4) {
        // If there are 4 vertical black stones, add a black
        // stone life and reset black stone counter.
        state.blackStoneLives += 1;
        blackCount = 0;
    }

    if (whiteCount == 4) {
        // If there are 4 vertical white stones, add a white
        // stone life and reset white stone counter.
        state.whiteStoneLives += 1;
        whiteCount = 0;
    }

    return [blackCount, whiteCount];
}

/**
 * 
 * @param {State} state state of the game.
 * @param {int} i outer loop iterator.
 * @param {int} j inner loop iterator.
 * @param {int} counter incrementer for making the traverse diagonal.
 * @param {int} blackCount number of black stones in row to row traversal.
 * @param {int} whiteCount number of white stones in row to row traversal.
 * @param {int} blackCount2 number of black stones in column to column traversal.
 * @param {*} whiteCount2 number of white stones in column to column traversal.
 */
function countDiagonal(state, i, j, counter, blackCount, whiteCount, blackCount2, whiteCount2) {
    if (i + counter < state.board.length) {
        if (state.board[i + counter][j] == 1) {
            blackCount += 1;
            whiteCount = 0;
        }
        if (state.board[i + counter][j] == 0) {
            whiteCount += 1;
            blackCount = 0;
        }
    }

    if (blackCount == 4) {
        state.blackStoneLives += 1;
        blackCount = 0;
    }

    if (whiteCount == 4) {
        state.whiteStoneLives += 1;
        whiteCount = 0;
    }

    if (i + counter < state.board.length && i != 0) {
        if (state.board[j][i + counter] == 1) {
            blackCount2 += 1;
            whiteCount2 = 0;
        }

        if (state.board[j][i + counter] == 0) {
            whiteCount2 += 1;
            blackCount2 = 0;
        }
    }

    if (blackCount2 == 4) {
        state.blackStoneLives += 1;
        blackCount2 = 0;
    }

    if (whiteCount2 == 4) {
        state.whiteStoneLives += 1;
        whiteCount2 = 0;
    }

    return [blackCount, whiteCount, blackCount2, whiteCount2]
}

function countInvertedDiagonal(state, i, j, counter, blackCount, whiteCount, blackCount2, whiteCount2) {

    if (state.board[j][i - counter] == 1) {
        blackCount += 1;
        whiteCount = 0;
    }

    if (state.board[j][i - counter] == 0) {
        whiteCount += 1;
        blackCount = 0;
    }


    if (blackCount == 4) {
        state.blackStoneLives += 1;
        blackCount = 0;
    }

    if (whiteCount == 4) {
        state.whiteStoneLives += 1;
        whiteCount = 0;
    }

    var start = state.board.length - 1;

    if (i + counter < state.board.length && i != 0) {
        if (state.board[i + counter][start - j] == 1) {
            blackCount2 += 1;
            whiteCount2 = 0;
        }

        if (state.board[i + counter][start - j] == 0) {
            whiteCount2 += 1;
            blackCount2 = 0;
        }

        if (blackCount2 == 4) {
            state.blackStoneLives += 1;
            blackCount2 = 0;
        }

        if (whiteCount2 == 4) {
            state.whiteStoneLives += 1;
            whiteCount2 = 0;
        }
    }


    return [blackCount, whiteCount, blackCount2, whiteCount2]
}

/**
 * 
 * @param {State} state the game state.
 */
function countLives(state, copy) {

    state.blackStoneLives = 0;
    state.whiteStoneLives = 0;

    for (let i = 0; i < state.board.length; i++) {
        var horizontalBlackCount = 0;
        var horizontalWhiteCount = 0;

        var verticalBlackCount = 0;
        var verticalWhiteCount = 0;

        var diagonalBlackCount = 0;
        var diagonalWhiteCount = 0;

        var diagonalBlackCount2 = 0;
        var diagonalWhiteCount2 = 0;

        var invertedDiagonalBlackCount = 0;
        var invertedDiagonalWhiteCount = 0;

        var invertedDiagonalBlackCount2 = 0;
        var invertedDiagonalWhiteCount2 = 0;

        let counter = 0;

        for (let j = 0; j < state.board[i].length; j++) {

            // Count the horizontal stones.
            var horizontalCounts = countHorizontal(state, i, j, horizontalBlackCount, horizontalWhiteCount);
            horizontalBlackCount = horizontalCounts[0];
            horizontalWhiteCount = horizontalCounts[1];

            // Count the vertical stones.
            var verticalCounts = countVertical(state, i, j, verticalBlackCount, verticalWhiteCount);
            verticalBlackCount = verticalCounts[0];
            verticalWhiteCount = verticalCounts[1];

            // Count the diagonal stones.
            var diagonalCounts = countDiagonal(state, i, j, counter, diagonalBlackCount,
                diagonalWhiteCount, diagonalBlackCount2, diagonalWhiteCount2);
            diagonalBlackCount = diagonalCounts[0];
            diagonalWhiteCount = diagonalCounts[1];
            diagonalBlackCount2 = diagonalCounts[2];
            diagonalWhiteCount2 = diagonalCounts[3];

            // Count the inverted diagonal stones.
            var invertedDiagonalCounts = countInvertedDiagonal(state, i, j, counter, invertedDiagonalBlackCount,
                invertedDiagonalWhiteCount, invertedDiagonalBlackCount2, invertedDiagonalWhiteCount2);
            invertedDiagonalBlackCount = invertedDiagonalCounts[0];
            invertedDiagonalWhiteCount = invertedDiagonalCounts[1];
            invertedDiagonalBlackCount2 = invertedDiagonalCounts[2];
            invertedDiagonalWhiteCount2 = invertedDiagonalCounts[3];

            counter++;

        }
    }

    if (!copy) {
        status.innerHTML = state.whiteStoneLives.toString() + " - " + state.blackStoneLives.toString();
    }
}

/**
 * 
 * @param {State} state game state.
 */
function stoneDifference(state) {
    // Set the state's value to the total white stone lives minus the
    // black stone lives.
    state.value = state.blackStoneLives - state.whiteStoneLives;
}

/**
 * 
 * @param {array} board game state board.
 */
function boardEmpty(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] != null) {
                // If board array has an element other than null inside
                // of it, return false.
                return false;
            }
        }
    }

    // If the array only contains null values, return true.
    return true;
}

function freedom(state) {
    var adjacentSpots = [];

    var row = state.previousMove[0];
    var col = state.previousMove[1];

    // console.log(state.previousMove);

    if (row + 1 < state.board.length) {
        adjacentSpots.push(state.board[row + 1][col]);
    }

    if (row - 1 >= 0) {
        adjacentSpots.push(state.board[row - 1][col]);
    }

    if (col + 1 < state.board[0].length) {
        adjacentSpots.push(state.board[row][col + 1]);
    }

    if (col - 1 >= 0) {
        adjacentSpots.push(state.board[row][col - 1]);
    }


    for (let i = 0; i < adjacentSpots.length; i++) {
        if (adjacentSpots[i] == null) {
            return false;
        }
    }

    return true;

}


/**
 * 
 * @param {State} state the game state.
 * @param {int} index the index of the board.
 * @param {boolean} human boolean representation of who placed the stone.
 * True represents the human player, and false represents the AI.
 */
function placeStone(state, index, human, copy) {

    // Get the row and column from the index.
    var row = parseInt(index.split('-')[0]);
    var col = parseInt(index.split('-')[1]);

    var prevRow = state.previousMove[0];
    var prevCol = state.previousMove[1];

    var placed = false;

    // console.log([row, col]);

    // Cell must be empty in order to place stone.
    if (state.board[row][col] == null) {

        if (boardEmpty(state.board) || freedom(state)) {
            var stone = 0;

            // If the current player is human, set the stone to 1, otherwise,
            // set it to 0.
            if (human) {
                stone = 0;
            } else {
                stone = 1;
            }

            // Set the position of the board array to the stone placed.
            state.board[row][col] = stone;

            if (!copy) {
                // If this is the real board and not a copy, call the 
                // display stone function.
                displayStone(index, human);
            }

            // Count the lives of the black and white stones.
            countLives(state, copy);

            // Get the difference of the stone lives for the AI function.
            stoneDifference(state);

            // Call the game over function.
            gameOver(state, copy);

            state.previousMove = [row, col];

            placed = true;

        } else {
            if ((prevRow == row + 1 && prevCol == col) ||
                (prevRow == row - 1 && prevCol == col) ||
                (prevRow == row && prevCol == col + 1) ||
                (prevRow == row && prevCol == col - 1)) {

                var stone = 0;

                // If the current player is human, set the stone to 1, otherwise,
                // set it to 0.
                if (human) {
                    stone = 0;
                } else {
                    stone = 1;
                }

                // Set the position of the board array to the stone placed.
                state.board[row][col] = stone;

                if (!copy) {
                    // If this is the real board and not a copy, call the 
                    // display stone function.
                    displayStone(index, human);
                }

                // Count the lives of the black and white stones.
                countLives(state, copy);

                // Get the difference of the stone lives for the AI function.
                stoneDifference(state);

                // Call the game over function.
                gameOver(state, copy);

                state.previousMove = [row, col];

                placed = true;
            }
        }
    }

    if (placed) {
        if (human && !copy) {
            results = minimax(state, 3, -Infinity, Infinity, true);
            var move = results[1];

            placeStone(state, move, false, false);
        }
    }

    return placed;
}

/**
 * 
 * @param {int} index the index of the board.
 * @param {boolean} human boolean representation of who placed the stone.
 * True represents the human player, and false represents the AI.
 */
function displayStone(index, human) {
    var img = document.getElementById(index + '-img');

    var stoneImg = new Image;

    stoneImg.onload = function() {
        img.src = this.src;
    }

    // If the current player is human, load the black stone, otherwise,
    // load the white stone.
    if (human) {
        stoneImg.src = "images/white_stone.jpg";
    } else {
        stoneImg.src = "images/black_stone.jpg";
    }
}