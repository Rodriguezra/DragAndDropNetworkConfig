let cards = [];
let netconfig, F, C, D, A, B, E, Cybercrime, lockedComp, lockedOut;
let netconfigImg, FImg, CImg, DImg, AImg, BImg, EImg, CybercrimeImg, LockedComputerImg, LockedOutImg;
let center1, center2, center3, center4, center5, center6;
let screen = 0;
let widthConstraint, heightConstraint;
let alphaValue = 0;
let fadeSpeed = 5;
let confirm = false;
let cancel = false;

//start = 0
//instructions = 1
//game = 2
//restart = 3
//lose = 4

function setCardsoffScreen() {
  D.pos = { x: -100, y: -100 };
  C.pos = { x: -100, y: -100 };
  F.pos = { x: -100, y: -100 };
  E.pos = { x: -100, y: -100 };
  A.pos = { x: -100, y: -100 };
  B.pos = { x: -100, y: -100 };
  netconfig.pos = { x: -300, y: -300 };
  if (screen === 0) {
    Cybercrime.pos = { x: width / 2, y: 160 + 95 };
  }
  else {
    Cybercrime.pos = { x: -100000, y: -200 };
  }if (screen === 3) {
    lockedComp.pos = { x: width / 2 + 10, y: 160 + 85 };
  }
  else {
    lockedComp.pos = { x: -100000, y: -200 };
  }
  if (screen === 4) {
    lockedOut.pos = { x: width / 2, y: 160 + 85};
  }
  else {
    lockedOut.pos = { x: -100000, y: -200 };
  }
}

function mousePressed() {

  if (screen === 0) { //on the start screen
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 120 && mouseY < height / 2 + 160) {
      showInstructionScreen();
      screen = 1;
    }
  }
  else if (screen === 1 || screen === 3 || screen == 4) {// if on the instructions/restart/lose screen
    //press begin button or restart button pressed
    if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height / 2 + 120 && mouseY < height / 2 + 160) {
      screen = 2;
      F.position = createVector(width / 2 - 40, height - (height / 3) + 175);
      C.position = createVector(width / 2 + 40, height - (height / 3) + 175);
      D.position = createVector(width / 2 - 200, height - (height / 3) + 175);
      A.position = createVector(width / 2 - 120, height - (height / 3) + 175); 
      B.position = createVector(width / 2 + 120, height - (height / 3) + 175);
      E.position = createVector(width / 4 - 117, height - (height / 3) + 175);
      netconfig.pos = { x: 190, y: 285 };
      Cybercrime.pos = { x: width / 2, y: 160 + 95 };
    }
  }
  else if (screen == 2 && confirm && !cancel) {
    if (mouseX > width / 2 + 20 && mouseX < width / 2 + 140 && mouseY > height / 2 + 250 && mouseY < height / 2 + 290) {
      if (
        dist(F.x, F.y, center1.x, center1.y) < 1 &&
        dist(C.x, C.y, center2.x, center2.y) < 1 &&
        dist(D.x, D.y, center3.x, center3.y) < 1 &&
        dist(A.x, A.y, center4.x, center4.y) < 1 &&
        dist(B.x, B.y, center5.x, center5.y) < 1 &&
        dist(E.x, E.y, center6.x, center6.y) < 1
      ) {
        console.log("you win!");
        showScreenWin();
        screen = 3;
        confirm = false;
      }
      else {
        console.log("you lose!");
        showScreenLose();
        screen = 4;
        confirm = false;
      }
    }
    else if (mouseX > width / 2 - 120 && mouseX < width / 2 && mouseY > height / 2 + 250 && mouseY < height / 2 + 290) {
      confirm = false;
      cancel = true;
    }
  }

  //If on the game screen
  if (screen === 2) {
    // Check if the "Learn More" button is clicked
    if (mouseX > width - 150 && mouseX < width - 10 && mouseY > height - 45 && mouseY < height - 10) 
    {
      // Display a link to a website for further learning
      window.open('https://www.law.cornell.edu/uscode/text/18/part-I');
    }
  }
}


function handleDragging(card) {
  if (card.mouse.dragging()) { //The card is constrained within the game window
    cancel = false;
    confirm = false;
    widthConstraint = constrain(mouseX + card.mouse.x, card.width / 2, width - card.width / 2);
    heightConstraint = constrain(mouseY + card.mouse.y, card.height / 2, height - card.height / 2);
    card.position = createVector(widthConstraint, heightConstraint);
    card.rotationLock = true;
  } else {
    card.vel.x = 0;
    card.vel.y = 0;
    card.rotationLock = true;
  }
}

function snapToCenter(card) {
  // Snap into position and check if there is not already a card in the center position
  if (!mouseIsPressed) {
    let snapped = false;
    switch (true) {
      case dist(card.x, card.y, center1.x, center1.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center1.x, center1.y) < 40):
        card.position = center1;
        snapped = true;
        break;
      case dist(card.x, card.y, center2.x, center2.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center2.x, center2.y) < 40):
        card.position = center2;
        snapped = true;
        break;
      case dist(card.x, card.y, center3.x, center3.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center3.x, center3.y) < 40):
        card.position = center3;
        snapped = true;
        break;
      case dist(card.x, card.y, center4.x, center4.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center4.x, center4.y) < 40):
        card.position = center4;
        snapped = true;
        break;
      case dist(card.x, card.y, center5.x, center5.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center5.x, center5.y) < 40):
        card.position = center5;
        snapped = true;
        break;
        case dist(card.x, card.y, center6.x, center6.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center6.x, center6.y) < 40):
        card.position = center6;
        snapped = true;
        break;
      default:
        break;
    }

    if (!snapped) {
      // Return the card to its original position
      card.position = card.originalPosition;
    }
  }
}

function checkIfConfirm() {
  let numSnapped = 0;
  for (let card of cards) {
    if ((card.x == center1.x && card.y == center1.y) || (card.x == center2.x && card.y == center2.y) || (card.x == center3.x && card.y == center3.y) || (card.x == center4.x && card.y == center4.y) || (card.x == center5.x && card.y == center5.y) || (card.x == center6.x && card.y == center6.y)) {
      numSnapped++;
    }
  }
  if (numSnapped == 6) {
    confirm = true;
  }
}

function preload() {
  netconfigImg = loadImage('assets/NetConfig/1/netconfig.png');
  FImg = loadImage('assets/NetConfig/1/F.png');
  CImg = loadImage('assets/NetConfig/1/C.png');
  DImg = loadImage('assets/NetConfig/1/D.png');
  AImg = loadImage('assets/NetConfig/1/A.png');
  BImg = loadImage('assets/NetConfig/1/B.png');
  EImg = loadImage('assets/NetConfig/1/E.png');
  CybercrimeImg = loadImage('assets/CyberLaws/1/Cybercrime.png');
  LockedComputerImg = loadImage('assets/CyberLaws/1/lockedComputer.png');
  LockedOutImg = loadImage('assets/CyberLaws/1/lockedout.png');
}

function setup() {
  createCanvas(650, 620);

  ////////////////////////////////////////////
  ////////////////// GAME 1 //////////////////
  ////////////////////////////////////////////

  center1 = createVector(545, 160);
  center2 = createVector(545, 220);
  center3 = createVector(545, 285);
  center4 = createVector(545, 350);
  center5 = createVector(545, 415);
  center6 = createVector(545, 475);

  netconfig = new Sprite(width / 2 - 80, 285);
  netconfig.addImage(netconfigImg);
  netconfig.collider = 'k';
  netconfig.scale = 0.185;
  //netconfigImg.resize(300, 0);

  cards = new Group();
  cards.collider = 'k';

  Cybercrime = new Sprite(width / 2, 160 + 95);
  Cybercrime.addImage(CybercrimeImg);
  Cybercrime.collider = 'k';
  CybercrimeImg.resize(200, 0);

  lockedOut = new Sprite(width / 2, 160 + 95);
  lockedOut.addImage(LockedOutImg);
  lockedOut.collider = 'k';
  //LockedOutImg.resize(200,0);


  lockedComp = new Sprite(width / 2, 160 + 95);
  lockedComp.addImage(LockedComputerImg);
  lockedComp.collider = 'k';
  //LockedComputerImg.resize(200,0);


  F = new cards.Sprite(width / 2 - 40, height - (height / 3) + 175);
  F.addImage(FImg);
  F.scale = 0.6;
  cards[0] = F;
  F.originalPosition = createVector(width / 2 - 40, height - (height / 3) + 175);

  C = new cards.Sprite(width / 2 + 40, height - (height / 3) + 175);
  C.addImage(CImg);
  C.scale = 0.6;
  cards[1] = C;
  C.originalPosition = createVector(width / 2 + 40, height - (height / 3) + 175);

  D = new cards.Sprite(width / 2 - 200, height - (height / 3) + 175);
  D.addImage(DImg);
  D.scale = 0.6;
  cards[2] = D;
  D.originalPosition = createVector(width / 2 - 200, height - (height / 3) + 175);

  A = new cards.Sprite(width / 2 - 120, height - (height / 3) + 175);
  A.addImage(AImg);
  A.scale = 0.6;
  cards[3] = A;
  A.originalPosition = createVector(width / 2 - 120, height - (height / 3) + 175);

  B = new cards.Sprite(width / 2 + 120, height - (height / 3) + 175);
  B.addImage(BImg);
  B.scale = 0.6;
  cards[4] = B;
  B.originalPosition = createVector(width / 2 + 120, height - (height / 3) + 175);
  
  E = new cards.Sprite(width / 4 - 117, height - (height / 3) + 175);
  E.addImage(EImg);
  E.scale = 0.6;
  cards[5] = E;
  E.originalPosition = createVector(width / 4 - 117, height - (height / 3) + 175);


  D.pos = { x: -100, y: -100 };
  C.pos = { x: -100, y: -100 };
  F.pos = { x: -100, y: -100 };
  A.pos = { x: -100, y: -100 };
  B.pos = { x: -100, y: -100 };
  E.pos = { x: -100, y: -100 };
  netconfig.pos = { x: -400, y: -400 };
  Cybercrime.pos = { x: -400, y: -400 };
  lockedComp.pos = { x: -400, y: -400 };
  lockedComp.pos = { x: -400, y: -400 };

  ////////////////////////////////////////////
  ////////////////// GAME 2 //////////////////
  ////////////////////////////////////////////


}


function draw() {
  // Set up the screen
  clear();
  background("white");


  if (screen === 0) {
    showStartScreen();
  }
  else if (screen === 1) {
    showInstructionScreen();
  }
  else if (screen === 2) {
    // Define the text content
    // Set text properties
    const c = color(0, 179, 115);
    stroke(0);
    strokeWeight(1);
    fill(255);
    rect(20, 10, 620, 74, 10);
    // Display text content
    textSize(12);
    noStroke();
    fill(0);
    textAlign(CENTER, TOP); // Text alignment
    text("Consider the given network configurations. With the top most configuration being most secure and the bottom most configuration the least secure, rank the network configurations. Be sure to consider the following aspects of secure design. Isolation - Separate system components into various containers. Least Common Mechanism - Minimize the functionality that is shared by different users.", 30, 20, 600, 360);

    // Learn More Button Border
    stroke(255);
    strokeWeight(2);
    fill(255);
    rect(width - 150, height - 45, 140, 40, 10);
    // Learn More Button
    noStroke();
    fill(c);
    rect(width - 150 + 1, height - 45 + 1, 138, 38, 10);       // Learn More Button Text
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Learn More", width - 80, height - 25);

    fill(c);
    rect(20, 100, 620, 370, 10);

    fill(255);
    rect(40, 120, 310, 330, 10);

    fill(255);
    noStroke();
    circle (center1.x, center1.y, 35);
    circle (center2.x, center2.y, 35);
    circle (center3.x, center3.y, 35);
    circle (center4.x, center4.y, 35);
    circle (center5.x, center5.y, 35);
    circle (center6.x, center6.y, 35);

    fill(0);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text("1", center1.x - 1, center1.y + 2);
    text("2", center2.x, center2.y + 2);
    text("3", center3.x, center3.y + 2);
    text("4", center4.x, center4.y + 2);
    text("5", center5.x, center5.y + 2);
    text("6", center6.x, center6.y + 2);

    strokeWeight(5);
    stroke(0);
    line(365, center1.y, 440, center1.y);
    line(430, center1.y - 10, 440, center1.y);
    line(430, center1.y + 10, 440, center1.y);

    line(365, center2.y, 440, center2.y);
    line(430, center2.y - 10, 440, center2.y);
    line(430, center2.y + 10, 440, center2.y);

    line(365, center3.y, 440, center3.y);
    line(430, center3.y - 10, 440, center3.y);
    line(430, center3.y + 10, 440, center3.y);

    line(365, center4.y, 440, center4.y);
    line(430, center4.y - 10, 440, center4.y);
    line(430, center4.y + 10, 440, center4.y);

    line(365, center5.y, 440, center5.y);
    line(430, center5.y - 10, 440, center5.y);
    line(430, center5.y + 10, 440, center5.y);

    for (let card of cards) {
      handleDragging(card);
      snapToCenter(card);
    }
  }

  checkIfConfirm();
  //Check if we win!!!
  if (confirm && !cancel) {
    const c = color(0, 179, 115);
    fill(c);
    noStroke();
    rect((width / 2) - 140, height / 2 + 205, 300, 100, 10);
    fill(255);
    textSize(20);
    textAlign(LEFT);
    text('Submit Answer?', width / 2 - 60, height - 80);
    fill(255);
    rect(width / 2 + 20, height / 2 + 250, 120, 40, 10);
    fill(0);
    textSize(17);
    text("Submit", width / 2 + 52, height / 2 + 272);
    fill(255);
    rect(width / 2 - 120, height / 2 + 250, 120, 40, 10);
    fill(0);
    text("Cancel", width / 2 - 90, height / 2 + 272);
  }

  else if (screen === 3) {
    showScreenWin();
  }

  else if (screen === 4) {
    showScreenLose();
  }
}

function showStartScreen() {
  setCardsoffScreen();
  const c = color(0, 179, 115);
  background(c);

  // Set text properties
  fill(255); // White color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("Network Configuration\n\n", width / 2, height / 2 - 200);
  
  // Instructions button
  fill(255);
  noStroke();
  rect(width / 2 - 75, height / 2 + 120, 150, 40, 10);
  fill(0);
  textSize(20);
  text("Instructions", width / 2, height / 2 + 140);

  fill(255);
  rect(200, 100, 250, 300, 10);
}


function showInstructionScreen() {
  setCardsoffScreen();
  background("white");
  const c = color(0, 179, 115);
  // Set text properties
  fill(c); // Black color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("Instructions\n\n", width / 2, height / 2 - 200);

  // Begin button
  fill(c);
  rect(width / 2 - 50, height / 2 + 120, 100, 40, 10);
  fill(255);
  textSize(20);
  text("Begin", width / 2, height / 2 + 140);


  textSize(18); // Adjusted font size
  textAlign(CENTER, TOP); // Adjusted text alignment

  // Additional text
  fill(color(0));
  let textX = 50; // X position for the additional text
  let textY = height / 2 - 150; // Starting Y position for the additional text
  let textLeading = 24; // Line spacing
  let textWidth = width - 100; // Width of the text block
  let additionalText = "Your objective is to correctly place each card into its designated slot. To play, click and hold on a card, then drag it to the numbered slot where you think it belongs. Release the mouse to drop the card into place.\n\nRemember, each card has a specific slot it must occupy. When all cards have been placed, you'll see an option to check your answers. If you're correct, you'll have the option to play again.";

  text(additionalText, textX, textY, textWidth, height - textY); // Display additional text with specified width and height


}

function showScreenWin() {
  //Move extra icons off screen when win page is up
  const c = color(0, 179, 115);
  background(c);
  setCardsoffScreen();


  //Set text properties
  fill(255, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win!\n\nThanks for playing!", width / 2, height / 2 - 200);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //Display the secure computer image
  let imgX = 650 / 2 - lockedComp.width / 2;
  let imgY = height / 2 - lockedComp.height / 2 - 20;
  image(LockedComputerImg, imgX, imgY);

  //Restart button
  fill(255);
  rect(width / 2 - 50, height / 2 + 120, 100, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height / 2 + 140);


}

function showScreenLose() {
  const c = color(195, 16, 16);
  background(c);
  setCardsoffScreen();


  //Set text properties
  fill(255, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Not Quite!\n\nTry again?", width / 2, height / 2 - 230);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //display locked image
  let imgX = 650 / 2 - lockedOut.width / 2;
  let imgY = height / 2 - lockedOut.height / 2 - 20;
  image(LockedOutImg, imgX, imgY);

  //restart button
  fill(255);
  rect(width / 2 - 75, height / 2 + 120, 150, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height / 2 + 140);
}
