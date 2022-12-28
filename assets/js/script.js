// Dados iniciais
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}
let playerTurn = '';
let warning = '';
let playing = false;

reset();

// Eventos
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
})

// Funções de ações dos eventos
function itemClick(event) {
    const el = event.target;
    let squareClicked = el.getAttribute('data-item');
    if(playing && square[squareClicked] === ''){
        square[squareClicked] = playerTurn;
        renderSquare();
        togglePlayer();
    }    
}

function reset(){
    warning = '';
    let random = Math.floor(Math.random() * 2);

    playerTurn = (random === 0) ? 'x' : 'o';

    for(let i in square){
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = playerTurn;
    document.querySelector('.resultado').innerHTML = warning;
}

function renderSquare() {
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }
    observerGame();
}

function togglePlayer(){
    if(playerTurn === ''){
        playerTurn = 'iiii PERDEU MENÓ'
        renderInfo();
        return;
    }

    playerTurn = (playerTurn === 'x') ? 'o' : 'x';
    renderInfo();
}

function observerGame(){
    if(checkWinner('x')) {
        playerTurn = '';
        warning = 'Player "x" winner';
        playing = false;
    } else if(checkWinner('o')) {
        playerTurn = '';
        warning = 'Player "o" winner';
        playing = false;
    } else if(isFull()) {
        warning = 'The game gave tie';
        playing = false;
    }
}

function checkWinner(player) {
    let possibilities = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    
    for(let win in possibilities) {
        let pArray = possibilities[win].split(','); // a1,a2 ... index = 0,1 ...
        let hasWon = pArray.every(option => square[option] === player) // Verificando se algum dos padrões de vitória foi atendido, ou seja, "true"
        if(hasWon) return true;
    }
    return false;
}

function isFull() {
    for(let i in square){
        if(square[i] === ''){
            return false;
        } 
    }
    return true;
}