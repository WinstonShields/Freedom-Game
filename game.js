// Initialize the state of the board.
const state = new State();

// Get the HTML elements.
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

/**
 * 
 * @param {State} state the game state.
 */
function gameOver(state) {
    var count = 0;

    for (let i = 0; i < state.board.length; i++) {
        for (let j = 0; j < state.board[i].length; j++) {
            if (!isNaN(state.board[i][j])) {
                count += 1;
            }
        }
    }

    if (count == (state.board.length * state.board[0].length)) {
        // If the stones fill up all of the spots on the board, check
        // for the winner.
        if (state.blackStoneLives > state.whiteStoneLives) {
            console.log("Black Wins!")
            state.value = 1;
        } else if (state.blackStoneLives < state.whiteStoneLives) {
            console.log("White Wins!")
            state.value = -1;
        } else {
            console.log("Draw")
            state.value = 0;
        }

        // Set terminal state to true.
        state.terminal = true;
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
            whiteCount2 = 0;
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
function countLives(state) {

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
}


/**
 * 
 * @param {State} state the game state.
 * @param {int} index the index of the board.
 * @param {boolean} human boolean representation of who placed the stone.
 * True represents the human player, and false represents the AI.
 */
function placeStone(state, index, human) {

    // Get the row and column from the index.
    var row = index.split('-')[0];
    var col = index.split('-')[1];

    if (isNaN(state.board[row][col])) {

        var stone = 0;

        // If the current player is human, set the stone to 1, otherwise,
        // set it to 0.
        if (human) {
            stone = 1;
        } else {
            stone = 0;
        }

        // Set the position of the board array to the stone placed.
        state.board[row][col] = stone;

        // Call the display stone function.
        displayStone(index, human);

        // Count the lives of the black and white stones.
        countLives(state);

        // Call the game over function.
        gameOver(state);

        if (human) {
            // console.log("Black", state.blackStoneLives);

            for (let i = 0; i < state.board.length; i++) {
                for (let j = 0; j < state.board[i].length; j++) {
                    if (isNaN(state.board[i][j])) {
                        var index = i.toString() + '-' + j.toString();
                        placeStone(state, index, !human);
                        // console.log("White", state.whiteStoneLives);
                        return true;
                    }
                }
            }
        }
    }
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
        stoneImg.src = "images/black_stone.jpg";
    } else {
        stoneImg.src = "images/white_stone.jpg";
    }
}