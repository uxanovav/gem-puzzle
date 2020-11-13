var fieldSize = '4';
var gameFlag = true;
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

function gameInit() {
    var cellSize = 480 / Number(fieldSize);
    let cellCount = initCellCount();
    for (let i = 1; i < cellCount; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = i;
        cell.style.width = `${cellSize - 5}px`;
        cell.style.height = `${cellSize - 5}px`;

        let left = i % fieldSize;
        let top = (i - left)/fieldSize;

        cell.style.top = `${top * cellSize}px`;
        cell.style.left = `${left * cellSize}px`;
        fieldScreen.append(cell);
    }
}