import Boot from './states/Boot';
import Preload from './states/Preload';
import GameTitle from './states/GameTitle';
import Main from './states/Main';
import GameOver from './states/GameOver';
import Level1 from './states/Levels/Level1';
import Level2 from './states/Levels/Level2';

class Game extends Phaser.Game {

  constructor() {

    super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS);

    this.state.add('Boot', Boot, false);
    this.state.add('Preload', Preload, false);
    this.state.add('GameTitle', GameTitle, false);
    this.state.add('Main', Main, false);
    this.state.add('GameOver', GameOver, false);
    this.state.add('Level1', Level1, false);
    this.state.add('Level2', Level2, false);

    this.state.start('Boot');
  }

}

new Game();