//console.log('this is working');

let allMyWords = [];
let size = 20; 
let titleSize = 70;

let canvas_w;
let canvas_h;

var canvas;

function setup() { 
  canvas = createCanvas(windowWidth, windowHeight);

  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas_w = width;
  canvas_h = height; 
  getData();

  //This time i don't need to specify the method bc GET is the default
  //This function retrieves current DB with words & position when the sketch starts.
  async function getData() {
    const responseList = await fetch('/api');
    const listWord = await responseList.json();
    //console.log(listWord);

    for (item of listWord) {
    allMyWords.push(new Draggable(item.wordIn, item.someX, item.someY, 20));
  }
  }

  //when click on save, send canvas to image DB. 
  document.getElementById("saveButton").addEventListener("click", async event => {
    canvas.loadPixels();

    const img64 = canvas.canvas.toDataURL();
    const data = { img64 }; 

    const options = {
    //Specify the method
    method: 'POST',
    //Specify the type of data sent
    headers: {
      'Content-Type': 'application/json'
    },
    //Convert JS object to JSON string
    body: JSON.stringify(data)    
};

  const response = await fetch('/memory', options);
  const myInput = await response.json();
  //console.log(myInput);

});

}
function draw() {
background(255, 0, 0);

textSize(titleSize); 
textAlign(CENTER);
noFill();
stroke(255, 170);
text("READ. DRAG. COMPOSE.", width/2, height/2);
for (var i = 0; i < allMyWords.length; i++) {
  allMyWords[i].displayWords();
  allMyWords[i].updatePos();
}
}

function mousePressed() {
  for (var i = 0; i < allMyWords.length; i++) {
  allMyWords[i].startDrag();
}
}

function mouseReleased() {
  for (var i = 0; i < allMyWords.length; i++) {
  result = allMyWords[i].stopDrag();
  //console.log("this word :" , allMyWords[i].word, "has changed to : ", result); 
  if(result == 1) {
    sendMessagePlease(allMyWords[i]);
    }
}
}

async function sendMessagePlease(update) {

const updateX = update.posX; 
const updateY = update.posY;
const updatedWord = update.word;

//console.log("word : ", updatedWord, " -- update X: ", updateX, " -- updateY : ", updateY);
   
const data = {updateX, updateY, updatedWord}; 
//console.log(data);

const sendUpdate = {
    //Specify the method
    method: 'POST',
    //Specify the type of data sent
    headers: {
      'Content-Type': 'application/json'
    },
    //Convert JS object to JSON string
    body: JSON.stringify(data)
  };

  //send the object 'options' to /api. 
  const response = await fetch('/dbUpdate', sendUpdate);
  const myInput = await response.json();
  //console.log(myInput);
    

}

function keyPressed() {
 if (key == 'a' | key == 'A') {
  //console.log("the key is A."); 


  

saveCanvas(canvas, 'niqueluisamere', 'png');

 }

  
}



