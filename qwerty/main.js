// const playerOne = {name: 'Sergei'};
// const playerTwo = {name: 'Alex'};
const playerOne = {name: prompt('Игрок 1, введите имя:')};
const playerTwo = {name: prompt('Игрок 2, введите имя:')};

if (playerOne.name === null || playerOne.name === '') {
    playerOne.name = 'Игрок 1';
}
if (playerTwo.name === null || playerTwo.name === '') {
    playerTwo.name = 'Игрок 2';
}


class TicTacToe {
    field = [null, null, null, null, null, null, null, null, null];
    winPositions = [
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    players = []
    symbols = ["X", "O"]

    constructor(playerOne,playerTwo) {
        this.players.push(playerOne);
        this.players.push(playerTwo);
    }

    getSymbol(idx) {
        return this.symbols[idx];
    }

    getPlayer(idx) {
        return this.players[idx];
    }

    checkCells(Block) {
        for (let idx = 0; idx < this.field.length; idx++) {
            if (Block === cells[idx]){
                currentFieldPosition = idx;
                gameTurns.push(idx);
                console.log(gameTurns);
            }     
        }
    }

    makeMove(position, symbol) {
        if (!this.isPossibleMove(position)) {
            throw alert("Клетка уже занята!");
        }
        checkRollback = 0;
        this.field[position] = symbol;
    }

    isPossibleMove(position){
        for (let idx = 0; idx < gameTurns.length; idx++) 
        return position < this.field.length && this.field[position] === null;
    }

    printSymbol(idx, clickBlock) {
        (idx % 2) === 0 ? clickBlock.innerHTML = cross.outerHTML : clickBlock.innerHTML = circle.outerHTML;
    }

    checkIsWim(symbol) {
        let isWin = true;
    
        for (const position of this.winPositions) {
            isWin = true;
    
            for (const cell of position) {
                isWin = isWin && this.field[cell] === symbol;
            }

            if (isWin) {
                game.coloringCells(position);
                return true;
            }
        }
        game.gameDraw();
    }

    coloringCells(position) {
        for (const cell of position) {
            cells[cell].style.backgroundColor = 'red';
        }
    }

    gameDraw() {
        let draw = true;
        for (let idx = 0; idx < this.field.length; idx++) {
            draw = draw && this.field[idx] !== null;
        }

        if (draw) {
            text.innerHTML = "Ничья!";
            resultWnd.style.display = 'block';
            game.resetGame();
        }
    }

    showResult(idx) {
        text.innerHTML = `${game.getPlayer(idx % 2).name}\nпобедил!`;
        resultWnd.style.display = 'block';
        game.resetGame();
    }

    resetGame() {
        resetBtn.onclick = function() {
            location.reload(true);
            modal.style.display = 'none';
        }
    }

    recoilBtn(clickBlock, position) {
        for (let j = 0; j < this.field.length; j++) {
            if (clickBlock === gameField.querySelectorAll('.element')[j]) {
                cells[position].removeChild(gameField.querySelectorAll('.element')[j]);
            }
        }

        gameTurns.pop();

        let arr = gameTurns.filter((item, index) => { // удаление дубликатов в массиве gameTurns
            return gameTurns.indexOf(item) === index
        }); 

        for (let idx = 0; idx < arr.length; idx++) {
            currentFieldPosition = arr[idx];
        }

        this.field[position] = null;
        checkRollback = 1;
    }
}

const gameField = document.querySelector("#game-field");
const cells = document.querySelectorAll('.game-field_cell');
const cross = document.querySelector('#cross');
const circle = document.querySelector('#circle');
const text = document.querySelector('#textWindow');
const modal = document.querySelector('#modalWindow');
const overlay = document.querySelector('#overlay');
const resetBtn = document.querySelector('#reset-button');
const resultWnd = document.querySelector('#resultWindow');
const element = gameField.querySelectorAll('.element');

const newElement = document.createElement("input");
document.querySelector("#rollback").appendChild(newElement);
newElement.type = "button";
newElement.value = "Отменить ход";
newElement.classList.add('rollback');

gameField.onselectstart = () => false;
cells.onselectstart = () => false;

const gameTurns = []; // нужен для отмены хода, без него не придумал как
let currentFieldPosition = 0;
let idx = 0;
let checkRollback = 0;

const game = new TicTacToe(playerOne,playerTwo);

try {
    gameField.addEventListener("mouseup", clickBlock => {
        if(clickBlock.target.className = 'game-field_cell') {

            let currentPlayerSymbol = game.getSymbol(idx % 2);

            game.checkCells(clickBlock.target);
            console.log(clickBlock.target);
            game.makeMove(currentFieldPosition, currentPlayerSymbol);

            game.printSymbol(idx, clickBlock.target);

            if (game.checkIsWim(currentPlayerSymbol)) {
                game.showResult(idx);
            }

            idx++;

            newElement.onclick = function() {
                if (checkRollback == 0) {
                    game.recoilBtn(clickBlock.target.firstChild, currentFieldPosition);
                    idx--;
                }
            }
        }
    });
} catch {
    console.log(exc);
}




