console.log('hello world');

let allMyWords = [];


function setup() {

//position is initalized at random, here in the window width & height
let canvas_w = windowWidth; 
let canvas_h = windowHeight;

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

  /*const newEntry = document.createElement('p');
  newEntry.textContent = `user says: ${myInput.data.wordIn}`
  const position = document.createElement('div');
  position.textContent = `and is located at: ${myInput.data.someX}, ${myInput.data.someY}`;

  newEntry.append(position);
  document.getElementById("list").appendChild(newEntry);
  */
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


