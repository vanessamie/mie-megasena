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
    ulNumbers.classList.add('box');
    for(let i = 0; i < state.board.length; i++) {
        let currentNumber = state.board[i];

        let liNumber = document.createElement('li');
        liNumber.textContent = currentNumber;
        liNumber.classList.add('numbers');

        liNumber.addEventListener('click', handleNumberClick);

        if(isNumberInGame(currentNumber)) {
            liNumber.classList.add('selected-number');
        }

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

    console.log(state.currentNumber);
    render();
}

function renderButtons() {
    let divButtons = document.querySelector('#mega-sena-buttons');
    divButtons.innerHTML = '';
    
    let buttonNewGame = createNewGameButton();
    let buttonRandomGame = createRandomGameButton();
    let buttonSaveGame = createSaveGameButton();

    divButtons.appendChild(buttonNewGame);
    divButtons.appendChild(buttonRandomGame);
    divButtons.appendChild(buttonSaveGame);
}

function createNewGameButton() {
    let button = document.createElement('button');
    button.textContent = 'Novo Jogo';

    button.addEventListener('click', newGame);
    return button;
}

function createRandomGameButton() {
    let button = document.createElement('button');
    button.textContent = 'Jogo Aleat??rio';

    button.addEventListener('click', randomGame);
    return button;
}

function createSaveGameButton() {
    let button = document.createElement('button');
    button.textContent = 'Salvar Jogo';
    
    button.disabled = !isGameComplete();

    button.addEventListener('click', saveGame);
    return button;
}

function renderSavedGames() {
    let divSavedGames = document.querySelector('#mega-sena-saved-games');
    divSavedGames.innerHTML = '';

    if(state.savedGame.length === 0) {
        divSavedGames.innerHTML = `<p>Nenhum jogo salvo</p>`;
    } else {
        let ulSavedGames = document.createElement('ul');
        ulSavedGames.classList.add('saved-games')

        for(let i = 0; i < state.savedGame.length; i++) {
            let currentGame = state.savedGame[i];

            let liGame = document.createElement('li');
            liGame.textContent = currentGame;

            ulSavedGames.appendChild(liGame);
        }
        divSavedGames.appendChild(ulSavedGames)
    }
}

function addNumberToGame(numberToAdd) {
    if(numberToAdd < 1 || numberToAdd > 60) {
        console.error('N??mero inv??lido', numberToAdd);
        return;
    }

    if(state.currentGame.length >= 6) {
        console.error('O jogo j?? est?? completo.');
        return;
    }

    if(isNumberInGame(numberToAdd)) {
        console.error('Este n??mero j?? est?? no jogo', numberToAdd);
        return;
    }

    state.currentGame.push(numberToAdd);
}

function removeNumberFromGame(numberToRemove) {
    let newGame = [];

    if(numberToRemove < 1 || numberToRemove > 60) {
        console.error('N??mero inv??lido', numberToRemove);
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
        console.error('O jogo n??o est?? completo!');
        return;
    }

    state.savedGame.push(state.currentGame);
    newGame();

    console.log(state.savedGame)
}

function isGameComplete() {
    return state.currentGame.length === 6;
}

function resetGame() {
    state.currentGame = [];
}

function randomGame() {
    resetGame();

    while(!isGameComplete()) {
        let randomNumber = Math.ceil(Math.random() * 60);
        addNumberToGame(randomNumber);
    }
    console.log(state.currentGame)
    render();
}

start();