class State {
    constructor() {
        this.board = Array(6).fill().map(() => Array(6).fill(null));
        this.blackStoneLives = 0;
        this.whiteStoneLives = 0;
        this.terminal = false;
        this.value = 0;
        this.move = "";
        this.previousMove = [0, 0];
    }
}