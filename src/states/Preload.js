class Preload extends Phaser.State {

  preload() {
    /* Preload required assets */

    
    this.game.load.audio('bass1', '../static/assets/sounds/bass/1.ogg');
    this.game.load.audio('bass2', '../static/assets/sounds/bass/2.ogg');
    this.game.load.audio('bass3', '../static/assets/sounds/bass/3.ogg');
    this.game.load.audio('bass4', '../static/assets/sounds/bass/4.ogg');
    this.game.load.audio('bass5', '../static/assets/sounds/bass/5.ogg');
    this.game.load.audio('bass6', '../static/assets/sounds/bass/6.ogg');
    this.game.load.audio('bass7', '../static/assets/sounds/bass/7.ogg');
    this.game.load.audio('bass8', '../static/assets/sounds/bass/8.ogg');
    this.game.load.audio('bass9', '../static/assets/sounds/bass/9.ogg');
    this.game.load.audio('bass10', '../static/assets/sounds/bass/10.ogg');
    this.game.load.audio('bass11', '../static/assets/sounds/bass/11.ogg');


    this.game.load.audio('treb1', '../static/assets/sounds/treb/1.ogg');
    this.game.load.audio('treb2', '../static/assets/sounds/treb/2.ogg');
    this.game.load.audio('treb3', '../static/assets/sounds/treb/3.ogg');
    this.game.load.audio('treb4', '../static/assets/sounds/treb/4.ogg');
    this.game.load.audio('treb5', '../static/assets/sounds/treb/5.ogg');
    this.game.load.audio('treb6', '../static/assets/sounds/treb/6.ogg');
    this.game.load.audio('treb7', '../static/assets/sounds/treb/7.ogg');
    this.game.load.audio('treb8', '../static/assets/sounds/treb/8.ogg');
    this.game.load.audio('treb9', '../static/assets/sounds/treb/9.ogg');
    this.game.load.audio('treb10', '../static/assets/sounds/treb/10.ogg');
    this.game.load.audio('treb11', '../static/assets/sounds/treb/11.ogg');

    this.game.load.audio('lose', '../static/assets/sounds/lose.ogg');

  }

  update() {
    //NOTE: Change to GameTitle if required
    this.game.state.start("Main");
  }

  addText(text, colour, x, y, left, small) {
    let font = small ? '44' : '66';

    let textObject = this.game.add.text(x, y, text, {
        font: font + "px Raleway",
        fill: colour,
        align: "right"
    });


    if (left) {
      textObject.anchor.setTo(1, 0);
      textObject.x -= 10;
    }
    else {
      textObject.anchor.setTo(0, 0);
      textObject.x += 10;
    }

    return textObject;
  }



}

export default Preload;
 