class GameState {
    constructor() {
        this.currentBoard = null;
        this.next = null;   // Linked list for next game state null if no next state
        this.prev = null;   // Linked list for previous game state null if no previous state
        this.moveFrom = null;
        this.moveTo = null;
        this.gameRound = 0;
    }

    // Navegar entre os estados
    forward() {
        if (this.next != null) {
            return this.next;
        }
        return this;
    }

    back() {
        if (this.prev != null) {
            return this.prev;
        }
        return this;
    }

    // Adicionar um novo estado
    addState(board, from, to) {
        let newstate = new GameState();
        newstate.currentBoard = board;
        newstate.moveFrom = from;
        newstate.moveTo = to;
        newstate.prev = this;
        this.next = newstate;
        return newstate;
    }

    // Codificar o estado do jogo em JSON
    encodeState() {
        return JSON.stringify({
            currentBoard: this.currentBoard,
            next: this.next != null ? true : false,
            prev: this.prev != null ? true : false,
            moveFrom: this.moveFrom,
            moveTo: this.moveTo,
            gameRound: this.gameRound
        });
    }

    // Decodificar o estado do jogo de JSON
    static decodeState(json) {
        let stateObj = JSON.parse(json);
        let state = new GameState();
        state.currentBoard = stateObj.currentBoard;
        state.next = stateObj.next;
        state.prev = stateObj.prev;
        state.moveFrom = stateObj.moveFrom;
        state.moveTo = stateObj.moveTo;
        state.gameRound = stateObj.gameRound;
        return state;
    }
}


/*
K - King
- Move-se uma casa em qualquer direção

Q - Queen
- Move-se qualquer número de casas em qualquer direção

R - Rook
- Move-se qualquer número de casas na vertical ou horizontal

N - Knight
- Move-se em forma de "L" (duas casas em uma direção e uma casa em outra)

B - Bishop
- Move-se qualquer número de casas na diagonal

P - Pawn
- Move-se uma casa para frente, exceto no primeiro movimento, quando pode mover duas casas
*/

let validMoves = {
    'K': [
        [0, 1], [0, -1], [1, 0], [-1, 0],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ],
    'Q': [
        [0, 1], [0, -1], [1, 0], [-1, 0],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ],
    'R': [
        [0, 1], [0, -1], [1, 0], [-1, 0]
    ],
    'N': [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ],
    'B': [
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ],
    'P': [
        [1, 0]
    ]
};


class ChessBoard {
    constructor(validMoves) {
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
        this.validMoves = validMoves;
    }

    // Método para imprimir o tabuleiro
    printBoard() {
        for (let i = 7; i >= 0; i--) {
            let row = (i+1) + ' |';
            for (let j = 0; j < 8; j++) {
                row += this.board[i][j] + '.';
            }
            console.log(row);
        }
        console.log('   ---------------');
        console.log('   a b c d e f g h');
    }

    // Método para verificar se um movimento é válido
    isValidMove(startPos, endPos) {
        const startCol = startPos.charCodeAt(0) - 'a'.charCodeAt(0);
        const startRow = parseInt(startPos[1]) - 1;
        const endCol = endPos.charCodeAt(0) - 'a'.charCodeAt(0);
        const endRow = parseInt(endPos[1]) - 1;

        // Verifica se as posições estão dentro do tabuleiro
        if (startRow < 0 || startRow > 7 || startCol < 0 || startCol > 7 ||
            endRow < 0 || endRow > 7 || endCol < 0 || endCol > 7) {
            console.log('Posições inválidas.');
            return false;
        }

        const piece = this.board[startRow][startCol];
        const targetPiece = this.board[endRow][endCol];

        // Verifica se a peça é válida
        if (piece === ' ') {
            console.log('Nenhuma peça na posição inicial.');
            return false;
        }

        // Verifica se a peça é do jogador atual
        if (piece === piece.toLowerCase()) {
            console.log('Não é a vez do jogador.');
            return false;
        }

        // Verifica se a peça pode se mover para a posição final
        const moves = this.validMoves[piece.toUpperCase()];
        for (let i = 0; i < moves.length; i++) {
            const move = moves[i];
            if (startRow + move[0] === endRow && startCol + move[1] === endCol) {
                return true;
            }
        }

        console.log('Movimento inválido.');
        return false;
    }

    // Método para mover uma peça
    movePiece(startPos, endPos) {
        const startCol = startPos.charCodeAt(0) - 'a'.charCodeAt(0);
        const startRow = parseInt(startPos[1]) - 1;
        const endCol = endPos.charCodeAt(0) - 'a'.charCodeAt(0);
        const endRow = parseInt(endPos[1]) - 1;

        // Verifica se as posições estão dentro do tabuleiro
        if (startRow < 0 || startRow > 7 || startCol < 0 || startCol > 7 ||
            endRow < 0 || endRow > 7 || endCol < 0 || endCol > 7) {
            console.log('Posições inválidas.');
            return;
        }

        // Move a peça
        this.board[endRow][endCol] = this.board[startRow][startCol];
        this.board[startRow][startCol] = ' ';
    }
}

// Teste da classe
const board = new ChessBoard(validMoves);
/*
board.printBoard();
board.movePiece('a2', 'h4');
console.log('\nDepois de mover a peça:');
board.printBoard();

// Teste de movimento inválido
console.log(board.isValidMove('a2', 'h5'));
board.movePiece('a2', 'h5');
console.log('\nDepois de tentar mover a peça:');
board.printBoard();
*/

// Teste de movimento válido
console.log(board.isValidMove('a2', 'a5'));
board.movePiece('a2', 'a3');
console.log('\nDepois de mover a peça:');
board.printBoard();

// Cria um novo estado do jogo
let currentState = new GameState();
/*
*/
currentState.currentBoard = board;
currentState.moveFrom = 'a2';
currentState.moveTo = 'a3';
currentState.gameRound = 1; 


// Codifica o estado do jogo em JSON
let encodedState = currentState.encodeState();
console.log(encodedState);

// Decodifica o estado do jogo de JSON
let decodedState = GameState.decodeState(encodedState);
console.log(decodedState);

// Navega para frente e para trás entre os estados do jogo
let nextState = currentState.forward();
let prevState = currentState.back();