class Preload extends Phaser.State {

  preload() {
    /* Preload required assets */
    this.game.load.image('road', '../static/assets/road.jpg');
    
    this.game.load.audio('coin', '../static/assets/coin.wav');
    this.game.load.audio('lose', '../static/assets/lose.mp3');

    // Todo: rename

    // this.game.add.text(0, 0, '',  { font: "900 86px Raleway", fill: '#000' });
  }

  create() {
    //NOTE: Change to GameTitle if required
    this.game.state.start("Main");
  }

}

export default Preload;
 