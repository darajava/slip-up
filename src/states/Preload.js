class Preload extends Phaser.State {

  preload() {
    /* Preload required assets */
    this.game.load.image('emoji0', '../static/assets/0.png');
    this.game.load.image('emoji1', '../static/assets/1.png');
    this.game.load.image('emoji2', '../static/assets/2.png');
    this.game.load.image('emoji3', '../static/assets/3.png');
    this.game.load.image('emoji4', '../static/assets/4.png');
    this.game.load.image('emoji5', '../static/assets/5.png');
    this.game.load.image('emoji6', '../static/assets/6.png');
    this.game.load.image('emoji7', '../static/assets/7.png');

    this.game.load.image('bomb', '../static/assets/bomb.png');
    
    // this.game.load.audio('bass1', '../static/assets/bass1.wav');
    // this.game.load.audio('bass2', '../static/assets/bass2.wav');
    // this.game.load.audio('bass3', '../static/assets/bass3.wav');
    // this.game.load.audio('bass4', '../static/assets/bass4.wav');
    // this.game.load.audio('bass5', '../static/assets/bass5.wav');
    // this.game.load.audio('bass6', '../static/assets/bass6.wav');

    // this.game.load.audio('treb1', '../static/assets/treb1.wav');
    // this.game.load.audio('treb2', '../static/assets/treb2.wav');
    // this.game.load.audio('treb3', '../static/assets/treb3.wav');
    // this.game.load.audio('treb4', '../static/assets/treb4.wav');
    // this.game.load.audio('treb5', '../static/assets/treb5.wav');
    // this.game.load.audio('treb6', '../static/assets/treb6.wav');

    this.game.load.audio('lose', '../static/assets/lose.mp3');
    this.game.load.audio('bomb', '../static/assets/bomb.wav');

    // Todo: rename

    // this.game.add.text(0, 0, '',  { font: "900 86px Raleway", fill: '#000' });
  }

  create() {
    //NOTE: Change to GameTitle if required
    this.game.state.start("Main");
  }

}

export default Preload;
 