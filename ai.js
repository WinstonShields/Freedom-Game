function getPossibleStates(state, human) {

    var possibleStates = [];

    for (let i = 0; i < state.board.length; i++) {
        for (let j = 0; j < state.board[i].length; j++) {
            if (state.board[i][j] == null) {
                // If the state's cell is empty, create a deepcopy
                // of the state.
                var possibleState = JSON.parse(JSON.stringify(state));

                // Create a string out of the current index.
                var index = i.toString() + '-' + j.toString();

                var placed = false;

                if (human) {
                    // Place a black stone in the empty index.
                    placed = placeStone(possibleState, index, true, true);
                } else {
                    // Place a white stone in the empty index.
                    placed = placeStone(possibleState, index, false, true);
                }

                if (placed) {
                    possibleState.move = i.toString() + "-" + j.toString();

                    // Push the possible state in the list of possible states.
                    possibleStates.push(possibleState);
                }

            }
        }
    }

    return possibleStates;
}

function minimax(state, depth, alpha, beta, maximizingPlayer) {

    if (depth == 0 || state.terminal) {
        return [state.value, state.move];
    }

    if (maximizingPlayer) {

        var maxEval = -Infinity;

        let possibleStates = getPossibleStates(state, false);

        var move = "";

        for (let i = 0; i < possibleStates.length; i++) {
            var results = minimax(possibleStates[i], depth - 1, alpha, beta, false);

            var eval = results[0];

            // maxEval = Math.max(maxEval, eval);

            if (maxEval < eval) {
                maxEval = eval;
                move = possibleStates[i].move
            }

            alpha = Math.max(alpha, eval);

            if (beta <= alpha) {
                break;
            }
        }
        return [maxEval, move];

    } else {
        var minEval = Infinity;

        let possibleStates = getPossibleStates(state, true);

        var move = "";

        for (let i = 0; i < possibleStates.length; i++) {
            var results = minimax(possibleStates[i], depth - 1, alpha, beta, true);
            var eval = results[0];

            if (minEval > eval) {
                minEval = eval;
                move = possibleStates[i].move;
            }
            beta = Math.min(beta, eval);
            if (beta <= alpha) {
                break;
            }
        }

        return [minEval, move];
    }
}