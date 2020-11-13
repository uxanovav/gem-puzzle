var fieldSize = '4';
var gameFlag = true;
var timer = {
    hours: "0",
    minuts: "0",
    seconds: "0"
};
var emptyCell = {
    left: 0,
    top: 0
};
var stepCount = 0;
let time = document.querySelector('#time');
let turns = document.querySelector('#turns');
const back = document.querySelector('#back');
const optionBoard = document.querySelector('.option-board');
const startScreen = document.querySelector('.start-screen');
const fieldScreen = document.querySelector('.field');
const startButton = document.querySelector('.menu-button[data-key="start"]');

startButton.addEventListener('click', () => {
    startScreen.style.display = "none";
    fieldScreen.style.display = "block";
    gameFlag = true;
    gameInit();
})

back.addEventListener('click', () => {
    startScreen.style.display = "block";
    fieldScreen.style.display = "none";
    gameFlag = false;
})

let arr = optionBoard.childNodes;
let active = document.querySelector('.active');

arr.forEach(el => {
    el.addEventListener('click', () => {
        fieldSize = el.dataset.key;
        active.classList.remove("active");
        el.classList.add("active");
        active = document.querySelector('.active');
    })
});

function initCellCount() {
    return fieldSize * fieldSize;
}

console.log(time);
function timerStart() {
    timer.seconds++;
    if (timer.seconds == 60) {
        timer.minuts++;
        timer.seconds = 0;
    }
    if (timer.minuts == 60) {
        timer.hours++;
        timer.minuts = 0;
    }
    time.innerHTML = `${timer.hours} : ${timer.minuts} : ${timer.seconds}`;
}

function gameInit() {
    setInterval(timerStart, 1000);
    var cellSize = 480 / Number(fieldSize);
    let cellCount = initCellCount();

    const state = [];
    state.push(emptyCell);

    function moveOnEmpty(i) {
        const cell = state[i];
        const empty = state[0];
        console.log(empty.top, cell.top);
        if (((Math.abs(empty.top - cell.top) <= 1) && (empty.left == cell.left)) || ((Math.abs(empty.left - cell.left) <= 1) && (empty.top == cell.top))) {
            cell.el.style.top = `${empty.top * cellSize}px`;
            cell.el.style.left = `${empty.left * cellSize}px`;
            let emptyCellTop = empty.top;
            let emptyCellLeft = empty.left;

            empty.top = cell.top;
            empty.left = cell.left;

            cell.top = emptyCellTop;
            cell.left = emptyCellLeft;
            stepCount++;
            turns.innerHTML = stepCount;
        }

    }

    for (let i = 1; i < cellCount; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = i;
        cell.style.width = `${cellSize - 5}px`;
        cell.style.height = `${cellSize - 5}px`;

        const left = i % fieldSize;
        const top = (i - left) / fieldSize;

        cell.style.top = `${top * cellSize}px`;
        cell.style.left = `${left * cellSize}px`;

        state.push({ left: left, top: top, el: cell });
        fieldScreen.append(cell);
        cell.addEventListener('click', () => {
            moveOnEmpty(i)
        });
        console.log(state);
    }
}