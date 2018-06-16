class LevelStart {

  constructor(game, levelWidth){
    this.game = game;

    this.fadeSprite = game.add.tileSprite(0,
      0,
      levelWidth,
      this.game.height,
      'backgroundSprite'
    );

    this.fadeSprite.alpha = 1;
  }

  fadeIn() {
    setTimeout(() => {
      let tween = this.game.add.tween(this.fadeSprite).to( { alpha : 0 }, 2000, null, true).onUpdateCallback(() => {
        this.game.sound.volume = 1 - this.fadeSprite.alpha;
      });
      tween.onComplete.add(() => {
        // this.game.sound.stopAll();
        this.fadeSprite.destroy();
        // this.game.state.start("Level1", true, false);
      });
    }, 500);
  }

}

export default LevelStart;