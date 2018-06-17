class Preload extends Phaser.State {

  preload() {
    /* Preload required assets */
    this.game.load.image('road', '../static/assets/road.jpg');
    
    this.game.load.audio('coin', '../static/assets/coin.wav');
    this.game.load.audio('coin1', '../static/assets/coin1.wav');
    this.game.load.audio('coin2', '../static/assets/coin2.wav');
    this.game.load.audio('coin3', '../static/assets/coin3.wav');
    this.game.load.audio('coin4', '../static/assets/coin4.wav');
    this.game.load.audio('coin5', '../static/assets/coin5.wav');

    this.game.load.audio('bass1', '../static/assets/bass1.wav');
    this.game.load.audio('bass2', '../static/assets/bass2.wav');
    this.game.load.audio('bass3', '../static/assets/bass3.wav');
    this.game.load.audio('bass4', '../static/assets/bass4.wav');
    this.game.load.audio('bass5', '../static/assets/bass5.wav');
    this.game.load.audio('bass6', '../static/assets/bass6.wav');

    this.game.load.audio('treb1', '../static/assets/treb1.wav');
    this.game.load.audio('treb2', '../static/assets/treb2.wav');
    this.game.load.audio('treb3', '../static/assets/treb3.wav');
    this.game.load.audio('treb4', '../static/assets/treb4.wav');
    this.game.load.audio('treb5', '../static/assets/treb5.wav');
    this.game.load.audio('treb6', '../static/assets/treb6.wav');

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
 