class LevelRestart {

  constructor(game, levelWidth){
    this.game = game;

    this.fadeSprite = game.add.tileSprite(0,
      0,
      levelWidth,
      this.game.height,
      'backgroundSprite'
    );

    game.world.bringToTop(this.fadeSprite);

    this.fadeSprite.alpha = 0;
  }

  restart() {
    setTimeout(() => {
      let tween = this.game.add.tween(this.fadeSprite).to( { alpha : 1 }, 2000, null, true).onUpdateCallback(() => {
        this.game.sound.volume = 1 - this.fadeSprite.alpha;
        console.log(this.game.sound.volume)
      });
      tween.onComplete.add(() => {
        this.game.sound.stopAll();
        this.game.state.start(this.game.state.current);
      });

    }, 1000);


    

  }

}

export default LevelRestart;