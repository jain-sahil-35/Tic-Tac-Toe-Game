let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newBtn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msgContainer");
let clickCount = 0;
let winnerFound = false;

const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8]
];

let turn = true;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("Box was clicked.");
    if(turn){
      box.innerText = "O";
      turn=false;
      clickCount++;
    }
    else{
      box.innerText = "X";
      turn=true;
      clickCount++;
    }
    box.disabled = true;
    checkWinner();
    if(winnerFound === false && clickCount === 9){
      msg.innerText = "Its a draw";
      msgContainer.classList.remove("hide");
      disablebtns();
      clickCount = 0;
    }
  });
});

const disablebtns = () => {
  for(let box of boxes){
    box.disabled = true;
  }
}

const enableboxes = () => {
  for(let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

const resetbtn = () => {
  turn = true;
  enableboxes();
  msgContainer.classList.add("hide");
}

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disablebtns();
  clickCount = 0;
  winnerFound = false;
}

const checkWinner = () => {
  for(let pattern of winPatterns){
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    // console.log(pos1Val, pos2Val, pos3Val);

    if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
      if(pos1Val===pos2Val && pos2Val===pos3Val){
        winnerFound = true;
        showWinner(pos1Val);
      }
    }
  }
}

resetBtn.addEventListener("click", resetbtn);
newGameBtn.addEventListener("click", resetbtn);