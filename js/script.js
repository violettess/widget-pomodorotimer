let timer;
let isRunning = false;
let duration = 25 * 60; // 25 minutes
let remainingTime = duration;

const timerElement = document.getElementById('timer');
const startPauseButton = document.getElementById('start-pause');
const stopButton = document.getElementById('stop');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimer() {
  timerElement.textContent = formatTime(remainingTime);
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    timer = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        updateTimer();
      } else {
        clearInterval(timer);
        isRunning = false;
        startPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        alert('Time is up!');
      }
    }, 1000);
  } else {
    clearInterval(timer);
    isRunning = false;
    startPauseButton.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  remainingTime = duration;
  startPauseButton.innerHTML = '<i class="fas fa-play"></i>';
  updateTimer();
}

function setBreak(minutes) {
  clearInterval(timer);
  isRunning = false;
  remainingTime = minutes * 60;
  startPauseButton.innerHTML = '<i class="fas fa-play"></i>';
  updateTimer();
}

startPauseButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
shortBreakButton.addEventListener('click', () => setBreak(5));
longBreakButton.addEventListener('click', () => setBreak(10));

updateTimer();
