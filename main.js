let state = {
    board: [],
    currentGame: [],
    savedGame: []
};

function start() {
    creatBoard();
    newGame();
    console.log(state.board);
}

function creatBoard() {
    state.board = [];

    for(let i = 1; i <= 60; i++) {
        state.board.push(i);
    }
}

function newGame() {
    resetGame();
    render();

    console.log(state.currentGame);
}

function render() {
    renderBoard();
    renderButtons();
    renderSavedGames();

}

function renderBoard() {
    let divBoard = document.querySelector('#mega-sena-board');
    divBoard.innerHTML = '';

    let ulNumbers = document.createElement('ul');
    for(let i = 0; i < state.board.length; i++) {
        let currentNumber = state.board[i];

        let liNumber = document.createElement('li');
        liNumber.textContent = currentNumber;

        liNumber.addEventListener('click', handleNumberClick);

        ulNumbers.appendChild(liNumber);
    }

    divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event) {
    let value = Number(event.currentTarget.textContent);

    if(isNumberInGame(value)) {
        removeNumberFromGame(value);
    } else {
        addNumberToGame(value)
    }

    console.log(state.currentGame);
}

function renderButtons() {
    let divButtons = document.querySelector('#mega-sena-buttons');
    divButtons.innerHTML = '';
    
    let buttonNewGame = createNewGameButton();

    divButtons.appendChild(buttonNewGame);
}

function createNewGameButton() {
    let button = document.createElement('button');
    button.textContent = 'Novo Jogo';

    button.addEventListener('click', newGame);
    return button;
}

function renderSavedGames() {

}

function addNumberToGame(numberToAdd) {
    if(numberToAdd < 1 || numberToAdd > 60) {
        console.error('Número inválido', numberToAdd);
        return;
    }

    if(state.currentGame.length >= 6) {
        console.error('O jogo já está completo.');
        return;
    }

    if(isNumberInGame(numberToAdd)) {
        console.error('Este número já está no jogo', numberToAdd);
        return;
    }

    state.currentGame.push(numberToAdd);
}

function removeNumberFromGame(numberToRemove) {
    let newGame = [];

    if(numberToRemove < 1 || numberToRemove > 60) {
        console.error('Número inválido', numberToRemove);
        return;
    }

    for(let i = 0; i < state.currentGame.length; i++) {
        let currentNumber = state.currentGame[i];

        if(currentNumber === numberToRemove) {
            continue;
        }

        newGame.push(currentNumber);
    }

    state.currentGame = newGame;
}

function isNumberInGame(numberToCheck) {
    return state.currentGame.includes(numberToCheck);
}

function saveGame() {
    if(!isGameComplete()) {
        console.error('O jogo não está completo!');
        return;
    }

    state.savedGame.push(state.currentGame);
}

function isGameComplete() {
    return state.currentGame.length === 6;
}

function resetGame() {
    state.currentGame = [];
}

start();