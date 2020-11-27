function getPossibleStates(state) {

    var possibleStates = [];

    for (let i = 0; i < state.board.length; i++) {
        for (let j = 0; j < state.board[i].length; j++) {
            if (state.board[i][j] == null) {
                // If the state's cell is empty, create a deepcopy
                // of the state.
                var possibleState = JSON.parse(JSON.stringify(state));

                // Create a string out of the current index.
                var index = i.toString() + '-' + j.toString();

                // Place a stone in the empty index.
                placeStone(possibleState, index, false, true);

                // Push the possible state in the list of possible states.
                possibleStates.push(possibleState);

                // console.log(possibleState.board);
            }
        }
    }

    return possibleStates;
}

// function minimax(state, depth, maximizingPlayer) {
//     if (depth == 0 || state.terminal) {

//     }

//     if (maximizingPlayer) {

//     } else {

//     }
// }