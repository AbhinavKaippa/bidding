// let currentDice = "";

function repeat(string, repetation) {
  if (repetation < 1) {
    return "";
  }

  return string + repeat(string, repetation - 1);
}

function border(type, length, partition) {
  const size = length + 2;
  const midportion = Math.round(size / (partition + 1));
  let partitioner = type === "top" ? "┳" : "╋";
  let border = "";

  if (type === "bottom") {
    partitioner = "┻";
  }

  for (let count = 1; count <= length; count++) {
    border += count % midportion === 0 ? partitioner : "━";
  }

  return border;
}

function diceFormat(input) {
  const format1 = input === "form1" ? "⚪️" : "  ";
  const format2 = input === "form2" ? "⚪️" : "  ";

  return "\n" + "┃ " + format2 + format1 + format2 + " ┃";
}

function diceFace(number) {
  const top = "\n" + "╭" + border("top", 8, 0) + "╮";
  const bottom = "\n" + "╰" + border("bottom", 8, 0) + "╯";
  let middle = "";
  switch (number) {
    case "1":
      middle = diceFormat() + diceFormat("form1") + diceFormat();
      break;
    case "2":
      middle = diceFormat() + diceFormat("form2") + diceFormat();
      break;
    case "3":
      middle = diceFormat("form1") + diceFormat("form1") + diceFormat("form1");
      break;
    case "4":
      middle = diceFormat("form2") + diceFormat() + diceFormat("form2");
      break;
    case "5":
      middle = diceFormat("form2") + diceFormat("form1") + diceFormat("form2");
      break;
    case "6":
      middle = diceFormat("form2") + diceFormat("form2") + diceFormat("form2");
  }

  return top + middle + bottom;
}

function randomNum(from, to) {
  return from + Math.floor(Math.random() * (to - from + 1));
}

function dice(number) {
  currentDice = "" + randomNum(1, number);
  const face = diceFace(currentDice);

  return face;
}

function delay(number) {
  let repeat = number * 999999999;

  for (let count = 0; count < repeat; count++) {
  }
}

function animation() {
  let delayTime = 1;

  for (let i = 0; i < 99; i++) {
    console.clear();
    console.log(bidMessage(player1Bid), "\n\n", "dice :", dice(6));//--------------------------------------can call in single bid message

    delay(delayTime);

    if (i % 5 === 0) {
      delayTime = i > 47 ? delayTime * 2 : delayTime / 2;
    }
  }
}

function alligning(element, gap, allignment) {
  let noOfSpaces = gap - element.length;
  let spacing1 = allignment === "first" ? "" : repeat(" ", noOfSpaces);
  let spacing2 = allignment === "last" ? "" : repeat(" ", noOfSpaces);

  if (allignment === "middle") {
    spacing2 = repeat(" ", Math.floor(noOfSpaces / 2));
    spacing1 = repeat(" ", Math.ceil(noOfSpaces / 2));
  }

  return spacing1 + element + spacing2;
}

// function boxing()

function bidMessage(input) {
  const boxSize = 43;
  const noOfbox = 3;
  const elementSize = (boxSize - noOfbox - 1) / noOfbox;

  let element1 = input === "1" ? "💵💵" : "1";
  element1 = alligning(element1, elementSize, "middle");

  let element2 = input === "2" ? "💵💵" : "2";
  element2 = alligning(element2, elementSize, "middle");

  let element3 = input === "3" ? "💵💵" : "3";
  element3 = alligning(element3, elementSize, "middle");

  let element4 = input === "4" ? "💵💵" : "4";
  element4 = alligning(element4, elementSize, "middle");

  let element5 = input === "5" ? "💵💵" : "5";
  element5 = alligning(element5, elementSize, "middle");

  let element6 = input === "6" ? "💵💵" : "6";
  element6 = alligning(element6, elementSize, "middle");

  const balanceMsg = "player1 account Balance : " + player1Account + "₹";

  const line0 = "\n" + balanceMsg + "\n";
  const line1 = "┏" + border("top", boxSize - 2, noOfbox - 1) + "┓";
  const line3 = "┣" + border("mid", boxSize - 2, noOfbox - 1) + "┫";
  const line5 = "┗" + border("bottom", boxSize - 2, noOfbox - 1) + "┛";
  const line2 = "┃" + element1 + "┃" + element2 + "┃" + element3 + "┃"; // "┣ ┳ ┫ ┻ ┏ ┓ ┗ ┛ ╋ ┃ ━ ╭ ╮ ╰ ╯"
  const line4 = "┃" + element4 + "┃" + element5 + "┃" + element6 + "┃";

  return line0 + "\n" + line1 + "\n" + line2 + "\n" + line3 + "\n" + line4 + "\n" + line5;
}

function bidding() {
  if (player1Account <= 0) {
    const appology = prompt("\n 😭 Sorry you dont have any balance to play \n\n If you want to play again say 'sorry'")
    if (appology !== "sorry") {
      return;
    }

    player1Account = 400;
  }

  console.clear();

  // const balanceMsg = "player1 account Balance : " + player1Account;

  console.log(bidMessage(), "\n");//--------------------------------------------------------


  player1Bid = prompt("you can skip by pressing enter. \n place your bid in a box : ");
  const isValidBid = player1Bid >= 1 && player1Bid <= 6 && player1Bid.length === 1;
  player1BidAmount = isValidBid ? prompt("Amount : ", "100") : 0;

  while (player1BidAmount > player1Account) {
    const insufficient = "player1 you have insufficient account balance.";
    player1BidAmount = 0;
    player1BidAmount = prompt(insufficient + "\n" + "Amount : ", "100");
  }

  player1Account = player1Account - player1BidAmount;

  animation();

  const face = diceFace(currentDice);
  let status = isValidBid ? "😢 you Lose 😢" : "";
  if (currentDice === player1Bid) {
    status = "🏆 you Win 🏆";
    player1Account += player1BidAmount * 5;
  }
  console.clear();


  console.log(bidMessage(player1Bid), "\n\n", "dice :", face, "\n\n", status, "\n");//-----------------

  if (!confirm("Do you want to quit the game. ")) {
    return bidding();
  }

  // if (player1Account <= 0) {
  //   prompt("😭 Sorry you dont have any balance to play \n\n If you want to play again say 'sorry'")
  // }

  return;
}


// let delayTime = 1;
let currentDice = "";
let player1Bid = "";
let player1BidAmount = 0;
let player1Account = 1000;

bidding();

// console.log(dice());

// console.log(positioning("krishna", 12, "middle"));
// console.log(repeat("sdfghj ", 6.5));


//ToDo
//message together
// bid moreTimes
// 001 invalid bid
// negative amount bidding
// nan in amount
// minimum bidding
// can clear insufficient message by putting it in if else(recursion) and always add issufficient with the condition
