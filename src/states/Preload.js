class Preload extends Phaser.State {

  preload() {
    /* Preload required assets */

    
    this.game.load.audio('bass1', '../static/assets/bass1.mp3');
    this.game.load.audio('bass2', '../static/assets/bass2.mp3');
    this.game.load.audio('bass3', '../static/assets/bass3.mp3');
    this.game.load.audio('bass4', '../static/assets/bass4.mp3');
    this.game.load.audio('bass5', '../static/assets/bass5.mp3');
    this.game.load.audio('bass6', '../static/assets/bass6.mp3');
    this.game.load.audio('bass7', '../static/assets/bass7.mp3');
    this.game.load.audio('bass8', '../static/assets/bass8.mp3');
    this.game.load.audio('bass9', '../static/assets/bass9.mp3');
    this.game.load.audio('bass10', '../static/assets/bass10.mp3');
    this.game.load.audio('bass11', '../static/assets/bass11.mp3');


    this.game.load.audio('treb1', '../static/assets/treb1.mp3');
    this.game.load.audio('treb2', '../static/assets/treb2.mp3');
    this.game.load.audio('treb3', '../static/assets/treb3.mp3');
    this.game.load.audio('treb4', '../static/assets/treb4.mp3');
    this.game.load.audio('treb5', '../static/assets/treb5.mp3');
    this.game.load.audio('treb6', '../static/assets/treb6.mp3');
    this.game.load.audio('treb7', '../static/assets/treb7.mp3');
    this.game.load.audio('treb8', '../static/assets/treb8.mp3');
    this.game.load.audio('treb9', '../static/assets/treb9.mp3');
    this.game.load.audio('treb10', '../static/assets/treb10.mp3');
    this.game.load.audio('treb11', '../static/assets/treb11.mp3');

    this.game.load.audio('lose', '../static/assets/lose.mp3');
  }

  create() {
    //NOTE: Change to GameTitle if required
    this.game.state.start("Main");
  }

}

export default Preload;
 