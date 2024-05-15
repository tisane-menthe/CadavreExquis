class Draggable {
  constructor(word, posX, posY, txtSize) {
    this.word = word;
    this.posX = posX;
    this.posY = posY; 
    this.h = txtSize + 10;
    this.w = 0;
    this.dragged = false;
    this.size = txtSize;
    this.offset_x = 0;
    this.offset_y = 0;

  }

  displayWords() {
    textSize(this.size);
    this.w = textWidth(this.word) + 10;
    noStroke();
    fill(255);
    textAlign(CENTER, BOTTOM);
    text(this.word, this.posX, this.posY, this.w, this.h);
    rectMode(CORNER);
    noFill();
    stroke(255);
    rect(this.posX, this.posY, this.w, this.h);


  }

  updatePos() {
    if (this.dragged == true) {
      this.posX = mouseX - this.offset_x;
      this.posY = mouseY - this.offset_y;

    }
  }

  startDrag() {
    if(mouseX > this.posX && mouseX < this.posX + this.w) {
     if(mouseY > this.posY && mouseY < this.posY + this.h) {
      this.offset_x = mouseX - this.posX;
      this.offset_y = mouseY - this.posY;
      this.dragged = true;

     }
   }

  }

  stopDrag() {

    if(this.dragged) {
    this.dragged = false;
    return 1;
  }
  return 0;
}
}