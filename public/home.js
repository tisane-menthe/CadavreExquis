
let cloudImg;
let onCloud = false;
let alphabet = ['P', 'o', 'e', 'm'];
let index = 0;
let letters = [];
let rain = false;
let timerLength = 50;
let timer;
let img_w = 250;
let img_h = 200;
let img_offset = 15;

function preload() {
    cloudImg = loadImage('/img/dithered.png');
}


function setup() {
    const holder = document.getElementById('sketch-holder-cloud');

    const w = holder.offsetWidth;
    const h = holder.offsetHeight;
    timer = timerLength;
    //
    canvas = createCanvas(w, h);
    canvas.parent('sketch-holder-cloud');


    const input = document.getElementById('wordInput');

    input.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Tab') {
            e.preventDefault();
        }
    });


//This happens everytime there is a new input > click on the 'submit' button.
    document.getElementById("submit").addEventListener("click", async event => {
      const someX = Math.floor(Math.random() * canvas_w/2); 
      const someY = Math.floor(Math.random() * canvas_h/2); 

      const wordIn = document.getElementById('wordInput').value;
      console.log(wordIn)
      const data = {someX,someY, wordIn}; 

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

  //send the object 'options' to /api. 
  const response = await fetch('/api', options);
  const myInput = await response.json();
  //console.log(myInput);

  window.location.replace("poem.html");


  });

  //this function retrieves all the words previously submitted by querying the DB on the server
//  getData();

  //This time i don't need to specify the method bc GET is the default
 /*
  async function getData() {
    const response_2 = await fetch('/api');
    const listWord = await response_2.json();
    console.log(listWord);

    for (item of listWord) {
    const root = document.createElement('p');
    const word = document.createElement('div');
    word.textContent = `user says: ${item.wordIn}`;

    const position = document.createElement('div'); 
    position.textContent = `and is located at: ${item.someX}, ${item.someY}`;


    root.append(word, position);
    document.getElementById("list").appendChild(root);

  }
  }
*/
}


function draw() {
    clear();

    for (var i = 0; i < letters.length; i++) {
        letters[i].updatePosition();
        letters[i].display();
        if(letters[i].y > height) {
            letters.splice(i, 1);
        }

    }

    image(cloudImg, 0, 0, img_w, img_h);
    let c = get(mouseX, mouseY); // [r, g, b, a]

    if (c[3] > 0) {
        cursor('pointer');
        if(!rain) {
            rain = true;
            initTimer();
        }

    } else {
        cursor('default');
        rain = false;
    }

    if(rain) {
        if(timer <= 0){
            let letterPick = alphabet[index];
            index++;
            index = index%4;
            print("current index: ", index)
            letters.push(new Letters(letterPick, 100));
            timer = timerLength;
        }
        timer--;
    }


}

function initTimer() {
    print("initializing timer");
    timer = 0;
}


class Letters {
    static l_velocity = 1;
    static l_color = 255;
    static l_size = 20;

    constructor (letter, x) {
        this.letter = letter;
        this.x = random(20, 170);
        this.y = height/2;
        this.rotation = random(-0.02, 0.02);

    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        textSize(Letters.l_size);
        fill(Letters.l_color);
        text(this.letter, 0, 0);
        pop();
    }

    updatePosition() {
        this.y+= Letters.l_velocity;
        if (this.rotation <=0 ) {
            this.rotation-= Letters.l_velocity / 100;
        } else if (this.rotation > 0) {
            this.rotation+= Letters.l_velocity / 100;
        }
    }


}