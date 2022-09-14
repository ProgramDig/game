const startBlock = document.querySelector(".start");
const gameArea = document.querySelector(".game");
const startGame = document.querySelector(".start-button");
const restartGame = document.querySelector(".restart-game");
const gameBlock = document.querySelector(".block");
const resultMessage = document.querySelector(".check");

let gameObj = {
  numItemArray: [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ],
  checkArray: [],
  isBuild: false,
  isWin: false,
  timerId: 0,
};

let resultObj = {
  time: 60,
  result: "",
  isBest: false,
};

let resultArr = [];

startGame.addEventListener("click", () => {
  if (!gameObj.isBuild) {
    startBlock.style = "visibility: hidden; position: fixed;";
    gameArea.style = "visibility: visible;";
    build();
  }
});

restartGame.addEventListener("click", () => {
  resultMessage.style = "visibility: hidden;";
  clearInterval(gameObj.timerId);
  gameObj = {
    numItemArray: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25,
    ],
    checkArray: [],
    isBuild: false,
    isWin: false,
    timerId: 0,
  };

  resultObj = {
    time: 60,
    result: "",
    isBest: false,
  };

  document.querySelectorAll(".item").forEach((item) => {
    item.remove();
  });

  build();
  console.log("remove");
});

function build() {
  let item;
  let shuffleArr = shuffle(gameObj.numItemArray);

  for (let i = 0; i < 25; i++) {
    item = document.createElement("div");
    item.classList.add("item");

    item.id = shuffleArr.pop();
    item.innerText = item.id;
    item.style += generateStyle();

    gameBlock.appendChild(item);

    console.log(`Add item ${i} from id ${item.id}`); // log
  }

  document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", () => {
      console.log(item.id); // log
      check(item.id);
    });
  });

  console.log("The game is built."); // log

  timer();

  gameObj.isBuild = true;
}

const shuffle = (arr) => {
  return arr.sort(() => Math.round(Math.random() * 25) - 13);
};

// fix
function generateStyle() {
  let fontWeigth = randomFontWeigth();
  let fontSize = randomFontSize();
  let color = randomColor();
  let style = `
	font-weight:${fontWeigth};
	font-size:${fontSize};
	color:${color};
	`;
  console.log(style); // log
  return style;
}
function randomFontWeigth() {
  const MAX_SIZE = 9;
  const MIN_SIZE = 1;
  const WEIGHT_COUNT = 100;

  let fontWeigth = `${
    Math.round(Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE) * WEIGHT_COUNT
  }`;
  return fontWeigth;
}

function randomFontSize() {
  const MAX_SIZE = 30;
  const MIN_SIZE = 14;

  let fontSize = `${Math.round(
    Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE
  )}px`;
  return fontSize;
}

function randomColor() {
  const COLOR_COUNT = 256;
  let color = "";

  let red = Math.floor(Math.random() * COLOR_COUNT);
  let green = Math.floor(Math.random() * COLOR_COUNT);
  let blue = Math.floor(Math.random() * COLOR_COUNT);

  color = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
  return color;
}

function check(item) {
  if (gameObj.checkArray.length === 0 && item == 1) {
    document.getElementById(item).classList.add("green");
    gameObj.checkArray.push(item);
    console.log("push ", gameObj.checkArray);
  } else if (gameObj.checkArray[item - 2] == item - 1 && item == 25) {
    document.getElementById(item).classList.add("green");
    gameObj.isWin = true;
    stopGame(); // win code ..
  } else if (gameObj.checkArray[item - 2] == item - 1) {
    document.getElementById(item).classList.add("green");
    gameObj.checkArray.push(item);
    console.log("push ", gameObj.checkArray);
  } else {
    document.getElementById(item).classList.add("red");
    gameObj.isWin = false;
    stopGame(); // lose code ..
  }
}

function timer() {
  let time = 60;
  console.log("Timer started.");
  let id = setInterval(() => {
    if (time == 0) {
      document.querySelector("#time").innerHTML = 0;
      gameObj.isWin = false;
      stopGame();
      // lose code
    } else {
      document.querySelector("#time").innerHTML = time--;
      resultObj.time = document.querySelector("#time").innerHTML;
    }
  }, 1000);
  gameObj.timerId = id;
}

function stopGame() {
  clearInterval(gameObj.timerId);

  document.querySelectorAll(".item").forEach((item) => {
    item.classList.add("remove");
  });

  switch (gameObj.isWin) {
    case false:
      resultMessage.innerHTML = "You Lose";
      resultMessage.style = "visibility: visible;";
      console.log("GAME OVER!");
      break;
    case true:
      resultMessage.innerHTML = "You Win";
      resultMessage.style = "visibility: visible;";
      console.log("YOU WIN!");
      break;
  }
  resultObj.result = resultMessage.innerHTML;
  generateResults();
}

function generateResults() {
  resultArr.push(resultObj);

  let index = "index" + resultArr.length;
  let ind = resultArr.length;
  const tr = document.createElement("tr");

  tr.classList.add(index);

  document.querySelector("table").appendChild(tr);

  const tdt = document.createElement("td");
  const tdr = document.createElement("td");
  const tdb = document.createElement("td");

  tdt.classList.add("time" + ind);
  tdr.classList.add("result" + ind);
  tdb.classList.add("is-best" + ind);

  let qS = `.${index}`;

  document.querySelector(qS).appendChild(tdt);
  document.querySelector(qS).appendChild(tdr);
  document.querySelector(qS).appendChild(tdb);

  document.querySelector(".time" + ind).innerHTML =
    resultArr[resultArr.length - 1].time;
  document.querySelector(".result" + ind).innerHTML =
    resultArr[resultArr.length - 1].result;
  document.querySelector(".is-best" + ind).innerHTML =
    resultArr[resultArr.length - 1].isBest;
}
