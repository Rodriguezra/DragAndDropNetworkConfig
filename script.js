//Credits:
//Button sample by Mellau via freesound.org
//Card press sample by NenadSimic via freesound.org
//Card snap sample by alparbalazs via freesound.org
//Background music sample by joshuaempyre via freesound.org
//Win jingle music sample by sonically_sound via freesound.org

let cards = [];
let font;
let buttonPress, cardPress, cardSnap, gameMusic, winJingle;
let netconfig, F, C, D, A, B, E, Internet, lockedComp, lockedOut, Chip;
let netconfigImg, FImg, CImg, DImg, AImg, BImg, EImg, InternetImg, LockedComputerImg, LockedOutImg, ChipImg;
let center1, center2, center3, center4, center5, center6;
let screen = 0;
let widthConstraint, heightConstraint;
let alphaValue = 0;
let fadeSpeed = 5;
let confirm = false;
let cancel = false;
let cardPressed = false;
let playOnce = true;
audio = true;

//start = 0
//instructions = 1
//game = 2
//restart = 3
//lose = 4

function setCardsoffScreen() { //moves images based on which screen is displayed
  D.pos = { x: -100, y: -100 };
  C.pos = { x: -100, y: -100 };
  F.pos = { x: -100, y: -100 };
  E.pos = { x: -100, y: -100 };
  A.pos = { x: -100, y: -100 };
  B.pos = { x: -100, y: -100 };
  netconfig.pos = { x: -1000, y: -1000 };
  if (screen === 0) {
    Internet.scale = .0006 * width;
    Internet.pos = { x: width * .5, y: height * .5 };
  }
  else {
    Internet.pos = { x: -100000, y: -200 };
  } if (screen === 3) {
    lockedComp.pos = { x: width * .5, y: height * .5 };
  }
  else {
    lockedComp.pos = { x: -100000, y: -200 };
  }
  if (screen === 4) {
    lockedOut.pos = { x: width * .5, y: height * .5 };
  }
  else {
    lockedOut.pos = { x: -100000, y: -200 };
  }
}

function mousePressed() {

  if (screen === 0) { //on the start screen
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height - 80) {
      buttonPress.play();
      showInstructionScreen();
      screen = 1;
    }
  }
  else if (screen === 1 || screen === 3 || screen == 4) {// if on the instructions/restart/lose screen
    //press begin button or restart button pressed
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height - 80) {
      buttonPress.play();
      if (screen == 3) {
        winJingle.stop();
        gameMusic.loop();
      }
      screen = 2;
      A.position = createVector(width * .25, height - 39);
      B.position = createVector(width * .35, height - 39);
      C.position = createVector(width * .45, height - 39);
      D.position = createVector(width * .55, height - 39);
      E.position = createVector(width * .65, height - 39);
      F.position = createVector(width * .75, height - 39);
      netconfig.pos = { x: width * .28, y: height / 2 + 5 };
      Internet.pos = { x: width / 2, y: 160 + 95 };
    }
  }
  else if (screen == 2 && confirm && !cancel) { //checks if the user wins or loses from submit prompt
    if (mouseX > width / 2 + 20 && mouseX < width / 2 + 140 && mouseY > height - 80 && mouseY < height - 40) {
      buttonPress.play();
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
    else if (mouseX > width / 2 - 120 && mouseX < width / 2 && mouseY > height - 80 && mouseY < height - 40) { //cancel button
      buttonPress.play();
      confirm = false;
      cancel = true;
    }
  }

  //If on the game screen
  if (screen === 2) {
    cardPressed = true;
    // Check if the "Learn More" button is clicked
    if (mouseX > width - 150 && mouseX < width - 10 && mouseY > height - 55 && mouseY < height - 20) {
      buttonPress.play();
      // Display a link to a website for further learning
      window.open('https://cs.brown.edu/courses/cs227/archives/2001/groups/servers/chapter.pdf');
    }
  }
}


function handleDragging(card) {
  if (card.mouse.dragging()) { //The card is constrained within the game window
    if (cardPressed) {
      cardPress.play();
      cardPressed = false;
    }
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
        if (card.x != center1.x && card.y != center1.y) {
          cardSnap.play();
        }
        card.position = center1;
        snapped = true;
        break;
      case dist(card.x, card.y, center2.x, center2.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center2.x, center2.y) < 40):
        if (card.x != center2.x && card.y != center2.y) {
          cardSnap.play();
        }
        card.position = center2;
        snapped = true;
        break;
      case dist(card.x, card.y, center3.x, center3.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center3.x, center3.y) < 40):
        if (card.x != center3.x && card.y != center3.y) {
          cardSnap.play();
        }
        card.position = center3;
        snapped = true;
        break;
      case dist(card.x, card.y, center4.x, center4.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center4.x, center4.y) < 40):
        if (card.x != center4.x && card.y != center4.y) {
          cardSnap.play();
        }
        card.position = center4;
        snapped = true;
        break;
      case dist(card.x, card.y, center5.x, center5.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center5.x, center5.y) < 40):
        if (card.x != center5.x && card.y != center5.y) {
          cardSnap.play();
        }
        card.position = center5;
        snapped = true;
        break;
      case dist(card.x, card.y, center6.x, center6.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center6.x, center6.y) < 40):
        if (card.x != center6.x && card.y != center6.y) {
          cardSnap.play();
        }
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

function checkIfConfirm() { //submit screen appears if all 5 cards have been snapped to a position
  let numSnapped = 0;
  for (let card of cards) {
    if (
      dist(card.x, card.y, center1.x, center1.y) < 1 ||
      dist(card.x, card.y, center2.x, center2.y) < 1 ||
      dist(card.x, card.y, center3.x, center3.y) < 1 ||
      dist(card.x, card.y, center4.x, center4.y) < 1 ||
      dist(card.x, card.y, center5.x, center5.y) < 1 ||
      dist(card.x, card.y, center6.x, center6.y) < 1
    ) {
        numSnapped++;
    }
  }
  if (numSnapped == 6) {
    confirm = true;
  }
}

function preload() { //loads fonts, images, and sounds
  font = loadFont('assets/NetConfig/1/MechaRx20Regular-j9Zy9.otf');
  netconfigImg = loadImage('assets/NetConfig/1/netconfig.png');
  FImg = loadImage('assets/NetConfig/1/F.png');
  CImg = loadImage('assets/NetConfig/1/C.png');
  DImg = loadImage('assets/NetConfig/1/D.png');
  AImg = loadImage('assets/NetConfig/1/A.png');
  BImg = loadImage('assets/NetConfig/1/B.png');
  EImg = loadImage('assets/NetConfig/1/E.png');
  InternetImg = loadImage('assets/NetConfig/1/Internet.png');
  LockedComputerImg = loadImage('assets/CyberLaws/1/lockedComputer.png');
  LockedOutImg = loadImage('assets/CyberLaws/1/lockedout.png');
  ChipImg = loadImage('assets/NetConfig/1/Chip.png');
  buttonPress = loadSound('assets/NetConfig/1/buttonPress.wav');
  cardPress = loadSound('assets/NetConfig/1/cardPress.wav');
  cardSnap = loadSound('assets/NetConfig/1/cardSnap.wav');
  gameMusic = loadSound('assets/NetConfig/1/gameMusic.wav');
  winJingle = loadSound('assets/NetConfig/1/winJingle.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  center1 = createVector(width * .8, height * .285);
  center2 = createVector(width * .8, height * .385);
  center3 = createVector(width * .8, height * .485);
  center4 = createVector(width * .8, height * .585);
  center5 = createVector(width * .8, height * .685);
  center6 = createVector(width * .8, height * .785);

  soundFormats('wav');
  gameMusic.loop();

  netconfig = new Sprite(width / 2, height / 2 - 10);
  netconfig.addImage(netconfigImg);
  netconfig.collider = 'k';
  netconfig.scale = 0.000165 * width;

  Chip = new Sprite(width / 2, height * .5);
  Chip.addImage(ChipImg);
  Chip.collider = 'k';

  cards = new Group();
  cards.collider = 'k';

  Internet = new Sprite(width * .505, height * .5);
  Internet.addImage(InternetImg);
  Internet.collider = 'k';
  InternetImg.scale = 0.0006 * width;

  lockedOut = new Sprite(width / 2, height * .5);
  lockedOut.addImage(LockedOutImg);
  lockedOut.collider = 'k';

  lockedComp = new Sprite(width / 2, height * .5);
  lockedComp.addImage(LockedComputerImg);
  lockedComp.collider = 'k';

  F = new cards.Sprite(width * .75, height - 39);
  F.addImage(FImg);
  F.scale = 0.000425 * width;
  cards[0] = F;
  F.originalPosition = createVector(width * .75, height - 39);

  C = new cards.Sprite(width * .45, height - 39);
  C.addImage(CImg);
  C.scale = 0.000425 * width;
  cards[1] = C;
  C.originalPosition = createVector(width * .45, height - 39);

  D = new cards.Sprite(width * .55, height - 39);
  D.addImage(DImg);
  D.scale = 0.000425 * width;
  cards[2] = D;
  D.originalPosition = createVector(width * .55, height - 39);

  A = new cards.Sprite(width * .25, height - 39);
  A.addImage(AImg);
  A.scale = 0.000425 * width;
  cards[3] = A;
  A.originalPosition = createVector(width * .25, height - 39);

  B = new cards.Sprite(width * .35, height - 39);
  B.addImage(BImg);
  B.scale = 0.000425 * width;
  cards[4] = B;
  B.originalPosition = createVector(width * .35, height - 39);

  E = new cards.Sprite(width * .65, height - 39);
  E.addImage(EImg);
  E.scale = 0.000425 * width;
  cards[5] = E;
  E.originalPosition = createVector(width * .65, height - 39);


  D.pos = { x: -100, y: -100 };
  C.pos = { x: -100, y: -100 };
  F.pos = { x: -100, y: -100 };
  A.pos = { x: -100, y: -100 };
  B.pos = { x: -100, y: -100 };
  E.pos = { x: -100, y: -100 };
  netconfig.pos = { x: -400, y: -400 };
  Internet.pos = { x: -400, y: -400 };
  lockedComp.pos = { x: -400, y: -400 };
  lockedComp.pos = { x: -400, y: -400 };
  Chip.pos = { x: -400, y: -400 };
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
    playOnce = true;
    const c = color(48, 116, 180);
    background(c);

    let imgX = 0;
    let imgY = 0;
    scale(.00016 * width);
    image(ChipImg, imgX, imgY);
    scale(1 / (.00016 * width));

    noStroke();
    strokeWeight(1);
    fill(255);
    rectMode(CENTER);
    rect(width / 2, 60, width - 500, height * .15, 10);
    rectMode(CORNER);
    rect(200, 120, width - 400, height - 200, 10);
    // Define the text content
    // Set text properties
    // Display text content
    textSize(width * height * 0.000013);
    noStroke();
    fill(0);
    textAlign(CENTER, TOP); // Text alignment
    text("Consider the given network configurations. With the top-most configuration being most secure and the bottom-most configuration being the least secure, rank the network configurations. Be sure to consider the following aspects of secure design. Isolation - Separate system components into various containers. Least Common Mechanism - Minimize the functionality that is shared by different users.", width / 2 - 500, height / 35, 1000, 360);

    // Learn More Button Border
    stroke(255);
    strokeWeight(2);
    fill(255);
    // Learn More Button
    noStroke();
    fill(255);
    rect(width - 150 + 1, height - 54, 138, 38, 10);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Learn More", width - 80, height - 35);  // Learn More Button Text

    noStroke();
    const g = color(0, 204, 0);
    fill(g);
    circle(center1.x, center1.y, width * height * .000046);
    const gy = color(161, 215, 37);
    fill(gy);
    circle(center2.x, center2.y, width * height * .000046);
    const y = color(255, 222, 0);
    fill(y);
    circle(center3.x, center3.y, width * height * .000046);
    const lo = color(255, 196, 0);
    fill(lo);
    circle(center4.x, center4.y, width * height * .000046);
    const o = color(255, 119, 0);
    fill(o);
    circle(center5.x, center5.y, width * height * .000046);
    const r = color(195, 16, 16);
    fill(r);
    circle(center6.x, center6.y, width * height * .000046);

    fill(0);
    noStroke();
    textSize(width * height * 0.000023);
    textAlign(CENTER);
    textFont('Courier New');
    text("1", center1.x, center1.y + 2);
    text("2", center2.x, center2.y + 2);
    text("3", center3.x, center3.y + 2);
    text("4", center4.x, center4.y + 2);
    text("5", center5.x, center5.y + 2);
    text("6", center6.x, center6.y + 2);
    textFont(font);

    strokeWeight(5);
    stroke(0);
    line(center1.x * .6, center1.y, center1.x * .9, center1.y);
    line(center1.x * .88, center1.y - 20, center1.x * .9, center1.y);
    line(center1.x * .88, center1.y + 20, center1.x * .9, center1.y);

    line(center2.x * .6, center2.y, center2.x * .9, center2.y);
    line(center2.x * .88, center2.y - 20, center2.x * .9, center2.y);
    line(center2.x * .88, center2.y + 20, center2.x * .9, center2.y);

    line(center3.x * .6, center3.y, center3.x * .9, center3.y);
    line(center3.x * .88, center3.y - 20, center3.x * .9, center3.y);
    line(center3.x * .88, center3.y + 20, center3.x * .9, center3.y);

    line(center4.x * .6, center4.y, center4.x * .9, center4.y);
    line(center4.x * .88, center4.y - 20, center4.x * .9, center4.y);
    line(center4.x * .88, center4.y + 20, center4.x * .9, center4.y);

    line(center5.x * .6, center5.y, center5.x * .9, center5.y);
    line(center5.x * .88, center5.y - 20, center5.x * .9, center5.y);
    line(center5.x * .88, center5.y + 20, center5.x * .9, center5.y);

    line(center6.x * .6, center6.y, center6.x * .9, center6.y);
    line(center6.x * .88, center6.y - 20, center6.x * .9, center6.y);
    line(center6.x * .88, center6.y + 20, center6.x * .9, center6.y);

    for (let card of cards) {
      handleDragging(card);
      snapToCenter(card);
    }
  }

  checkIfConfirm();
  //Check if we win!!!
  if (confirm && !cancel) {
    const c = color(0, 179, 115);
    fill(255);
    noStroke();
    rect(width / 2 - 140, height - 130, 300, 110, 10);
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text('Submit Answer?', width / 2 - 95, height - 105);
    fill(c);
    rect(width / 2 + 20, height - 80, 120, 40, 10);
    fill(255);
    textSize(17);
    text("Submit", width / 2 + 42, height - 60);
    const r = color(195, 16, 16);
    fill(r);
    rect(width / 2 - 120, height - 80, 120, 40, 10);
    fill(255);
    text("Cancel", width / 2 - 105, height - 60);
  }

  else if (screen === 3) {
    showScreenWin();
  }

  else if (screen === 4) {
    showScreenLose();
  }
}

function windowResized() { //Adjusts size of canvas and screen elements based on screen size 
  resizeCanvas(windowWidth, windowHeight);
  netconfig.scale = .000165 * width;
  netconfig.pos = { x: width * .28, y: height / 2 + 5 };
  F.scale = 0.000425 * width;
  F.originalPosition = createVector(width * .75, height - 39);
  C.scale = 0.000425 * width;
  C.originalPosition = createVector(width * .45, height - 39);
  D.scale = 0.000425 * width;
  D.originalPosition = createVector(width * .55, height - 39);
  A.scale = 0.000425 * width;
  A.originalPosition = createVector(width * .25, height - 39);
  B.scale = 0.000425 * width;
  B.originalPosition = createVector(width * .35, height - 39);
  E.scale = 0.000425 * width;
  E.originalPosition = createVector(width * .65, height - 39);
  center1 = createVector(width * .8, height * .285);
  center2 = createVector(width * .8, height * .385);
  center3 = createVector(width * .8, height * .485);
  center4 = createVector(width * .8, height * .585);
  center5 = createVector(width * .8, height * .685);
  center6 = createVector(width * .8, height * .785);
}

function showStartScreen() {
  setCardsoffScreen();
  const c = color(48, 116, 180);
  background(c);

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rectMode(CENTER);
  rect(width / 2, height / 8, width * .75, height / 10, 10);
  rectMode(CORNER);

  // Set text properties
  fill(0); // Black color
  textSize(width * height * 0.000059); // Font size
  textFont(font);
  textAlign(CENTER, CENTER); // Text alignment
  text("Network Configuration\n\n", width / 2, height / 4.5);

  // Instructions button
  fill(255);
  noStroke();
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Instructions", width / 2, height - 100);

  fill(255);
  rect(width * .395, height * .25, width * .21, height * .5, 10);
}


function showInstructionScreen() {
  setCardsoffScreen();
  background("white");

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(0);
  rectMode(CENTER);
  rect(width / 2, height / 3.25, 600, height / 10, 10);
  rectMode(CORNER);

  const c = color(48, 116, 180);
  // Set text properties
  fill(c); // Blue color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("Instructions\n\n", width / 2, height * .36);

  // Begin button
  fill(0);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(255);
  textSize(20);
  text("Begin", width / 2, height - 100);


  textSize(18); // Adjusted font size
  textAlign(CENTER, TOP); // Adjusted text alignment

  // Additional text
  fill(color(0));
  let textX = width / 2 - 280; // X position for the additional text
  let textY = height / 2 - 60; // Starting Y position for the additional text
  let textLeading = 24; // Line spacing
  let textWidth = 575; // Width of the text block
  let additionalText = "Your objective is to correctly place each card into its designated slot. To play, click and hold on a card, then drag it to the slot where you think it belongs. Release the mouse to drop the card into place.\n\nRemember, each card has a specific slot it must occupy. When all cards have been placed, you'll see an option to check your answers. If you're correct, you'll have the option to play again.";

  text(additionalText, textX, textY, textWidth, height - textY); // Display additional text with specified width and height
}

function showScreenWin() {
  if (playOnce) {
    gameMusic.stop();
    winJingle.loop();
  }
  playOnce = false;
  const c = color(0, 179, 115);
  background(c);
  //Move extra icons off screen when win page is up
  setCardsoffScreen();

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rect(width * .33, height * .33, width * .35, height * .48, 10);

  //Set text properties
  fill(255, alphaValue);
  rect(width * .34, height * .1, width * .33, height * .2, 10);
  fill(0, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win!\n\nThanks for playing!", width / 2, height * .2);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //Restart button
  fill(255);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height - 100);

  //display win image
  let imgX2 = lockedComp.width + 14;
  let imgY2 = lockedComp.height - 55;
  scale(.00095 * width);
  image(LockedComputerImg, imgX2, imgY2);
}

function showScreenLose() {
  setCardsoffScreen();
  const r = color(195, 16, 16);
  background(r);

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rect(width * .33, height * .33, width * .35, height * .48, 10);

  //Set text properties
  fill(255, alphaValue);
  rect(width * .4, height * .1, width * .2, height * .2, 10);
  fill(0, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Not Quite!\n\nTry again?", width / 2, height * .2);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //Restart button
  fill(255);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height - 100);

  //display lose image
  let imgX2 = lockedOut.width + 20;
  let imgY2 = lockedOut.height - 20;
  scale(.001 * width);
  image(LockedOutImg, imgX2, imgY2);
}
