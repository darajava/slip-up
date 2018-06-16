class LevelEnd {

  constructor(game, levelWidth){
    this.game = game;

    this.fadeSprite = game.add.tileSprite(0,
      0,
      levelWidth,
      this.game.height,
      'backgroundSprite'
    );

    this.fadeSprite.alpha = 0;
  }

  fadeOut(nextLevel) {
    setTimeout(() => {
      let tween = this.game.add.tween(this.fadeSprite).to( { alpha : 1 }, 2000, null, true).onUpdateCallback(() => {
        this.game.sound.volume = 1 - this.fadeSprite.alpha;
        console.log(this.game.sound.volume)
      });
      tween.onComplete.add(() => {
        this.game.sound.stopAll();
        this.game.state.start(nextLevel, true, false);
      });

    }, 5000);


    

  }

}

export default LevelEnd;