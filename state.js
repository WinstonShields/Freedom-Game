class State {
    constructor() {
        this.board = Array(6).fill().map(() => Array(6));
        this.blackStoneLives = 0;
        this.whiteStoneLives = 0;
        this.terminal = false;
        this.value = 0;
    }
}