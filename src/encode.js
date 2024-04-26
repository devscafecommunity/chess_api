class ChessBoard {
    constructor() {
        // Definindo a representação do tabuleiro como uma matriz 8x8
        this.board = [
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
        ];
    }

    // Método para converter o tabuleiro em uma string única
    boardToString() {
        let boardString = '';
        let emptyCount = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.board[i][j] === ' ') {
                    emptyCount++;
                } else {
                    if (emptyCount > 0) {
                        boardString += emptyCount + '';
                        emptyCount = 0;
                    }
                    boardString += this.board[i][j];
                }
            }
            if (emptyCount > 0) {
                boardString += emptyCount + 'x';
                emptyCount = 0;
            }
            if (i < 7) {
                boardString += '-';
            }
        }
        return boardString;
    }

    // Método para converter a string única de volta para o tabuleiro
    stringToBoard(boardString) {
        let board = [];
        let rows = boardString.split('-');
        for (let i = 0; i < 8; i++) {
            let row = [];
            let colIndex = 0;
            for (let j = 0; j < rows[i].length; j++) {
                if (!isNaN(parseInt(rows[i][j]))) {
                    let count = '';
                    while (j < rows[i].length && !isNaN(parseInt(rows[i][j]))) {
                        count += rows[i][j];
                        j++;
                    }
                    const emptyCount = parseInt(count);
                    for (let k = 0; k < emptyCount; k++) {
                        row.push(' ');
                        colIndex++;
                    }
                    j--; // Step back one character to handle next character correctly
                } else {
                    row.push(rows[i][j]);
                    colIndex++;
                }
            }
            board.push(row);
        }
        return board;
    }
}

// Teste da classe
const board = new ChessBoard();
const boardString = board.boardToString();
console.log('String única:', boardString);
const regeneratedBoard = board.stringToBoard(boardString);
console.log('Tabuleiro regenerado:');
console.log(regeneratedBoard);