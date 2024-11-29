let startTime;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 1000);
        isRunning = true;
        toggleButtons();
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(intervalId);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        toggleButtons();
    }
}

function resetStopwatch() {
    clearInterval(intervalId);
    elapsedTime = 0;
    isRunning = false;
    displayTime(0);
    laps.innerHTML = '';
    toggleButtons();
}

function lapTime() {
    if (isRunning) {
        const li = document.createElement('li');
        li.textContent = display.textContent;
        laps.appendChild(li);
    }
}

function updateTime() {
    const time = Date.now() - startTime;
    displayTime(time);
}

function displayTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    display.textContent = 
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return unit.toString().padStart(2, '0');
}

function toggleButtons() {
    startButton.disabled = isRunning;
    pauseButton.disabled = !isRunning;
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapTime);
