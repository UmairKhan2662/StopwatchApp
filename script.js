let timerDisplay = document.querySelector(".timerDisplay");
let stopBtn = document.getElementById("stopBtn");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let lapBtn = document.getElementById("lapBtn");
let lapList = document.querySelector(".lapList");
const lapSound = document.getElementById("lapSound");
const startSound = document.getElementById("startSound");

let msec = 00;
let secs = 00;
let mins = 00;
let timerId = null;
let lapCount = 1;
let isRunning = false; // Added variable to track the running state

startBtn.addEventListener("click", function () {
  if (!isRunning) {
    timerId = setInterval(startTimer, 10);
    isRunning = true;
    startSound.play();
  }
  saveState();
});

stopBtn.addEventListener("click", function () {
  clearInterval(timerId);
  isRunning = false;
  startSound.pause();
  startSound.currentTime = 0; 
});

resetBtn.addEventListener("click", function () {
  clearInterval(timerId);
  timerDisplay.innerHTML = `00 : 00 : 00`;
  msec = secs = mins = 0;
  lapList.innerHTML = "";
  lapCount = 1;
  isRunning = false;
  startSound.pause();
  startSound.currentTime = 0;
});

function startTimer() {
  msec++;
  if (msec == 100) {
    msec = 0;
    secs++;
    if (secs == 60) {
      secs = 0;
      mins++;
    }
  }

  let msecString = msec < 10 ? `0${msec}` : msec;
  let secsString = secs < 10 ? `0${secs}` : secs;
  let minsString = mins < 10 ? `0${mins}` : mins;

  timerDisplay.innerHTML = `${minsString} : ${secsString} : ${msecString}`;
}

lapBtn.addEventListener("click", function () {
  if (timerId !== null) {
    let lapTime = timerDisplay.innerHTML;
    let lapItem = document.createElement("li");
    lapItem.innerText = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCount++;
    lapSound.play();
  }
});
loadState();


// for multiple stopwatches
// Function to create a new stopwatch instance
// function createStopwatch() {
//   let timerDisplay = document.createElement("div");
//   timerDisplay.className = "timerDisplay";

//   let stopBtn = document.createElement("button");
//   stopBtn.className = "btn stopBtn";
//   stopBtn.textContent = "Stop";

//   let startBtn = document.createElement("button");
//   startBtn.className = "btn startBtn";
//   startBtn.textContent = "Start";

//   let resetBtn = document.createElement("button");
//   resetBtn.className = "btn resetBtn";
//   resetBtn.textContent = "Reset";

//   let lapBtn = document.createElement("button");
//   lapBtn.className = "btn lapBtn";
//   lapBtn.textContent = "Lap";

//   let lapList = document.createElement("ul");
//   lapList.className = "lapList";

//   let container = document.createElement("div");
//   container.className = "stopwatch-container";
//   container.appendChild(timerDisplay);
//   container.appendChild(stopBtn);
//   container.appendChild(startBtn);
//   container.appendChild(resetBtn);
//   container.appendChild(lapBtn);
//   container.appendChild(lapList);

//   document.body.appendChild(container);

//   let msec = 0;
//   let secs = 0;
//   let mins = 0;
//   let timerId = null;
//   let lapCount = 1;
//   let isRunning = false;

//   startBtn.addEventListener("click", function () {
//     if (!isRunning) {
//       timerId = setInterval(startTimer, 10);
//       isRunning = true;
//     }
//   });

//   stopBtn.addEventListener("click", function () {
//     clearInterval(timerId);
//     isRunning = false;
//   });

//   resetBtn.addEventListener("click", function () {
//     clearInterval(timerId);
//     timerDisplay.innerHTML = `00 : 00 : 00`;
//     msec = secs = mins = 0;
//     lapList.innerHTML = "";
//     lapCount = 1;
//     isRunning = false;
//   });

//   function startTimer() {
//     msec++;
//     if (msec == 100) {
//       msec = 0;
//       secs++;
//       if (secs == 60) {
//         secs = 0;
//         mins++;
//       }
//     }

//     let msecString = msec < 10 ? `0${msec}` : msec;
//     let secsString = secs < 10 ? `0${secs}` : secs;
//     let minsString = mins < 10 ? `0${mins}` : mins;

//     timerDisplay.innerHTML = `${minsString} : ${secsString} : ${msecString}`;
//   }

//   lapBtn.addEventListener("click", function () {
//     if (timerId !== null) {
//       let lapTime = timerDisplay.innerHTML;
//       let lapItem = document.createElement("li");
//       lapItem.innerText = `Lap ${lapCount}: ${lapTime}`;
//       lapList.appendChild(lapItem);
//       lapCount++;
//     }
//   });
// }

// Create multiple stopwatch instances
// createStopwatch();
// createStopwatch();
// createStopwatch();

// Save Functionality:
function saveState() {
    const stopwatchState = {
        msec,
        secs,
        mins,
        lapCount,
        isRunning
    };

    localStorage.setItem("stopwatchState", JSON.stringify(stopwatchState));
}

// Load Functionality:
function loadState() {
    const savedState = localStorage.getItem("stopwatchState");
    
    if (savedState) {
        const parsedState = JSON.parse(savedState);
        msec = parsedState.msec;
        secs = parsedState.secs;
        mins = parsedState.mins;
        lapCount = parsedState.lapCount;
        isRunning = parsedState.isRunning;

        if (isRunning) {
            timerId = setInterval(startTimer, 10);
        }

        // updateDisplay();
    }
}
