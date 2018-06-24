class Coin extends Phaser.Sprite {

  constructor(game, x, y, offset, column){
    super(game, x, y + offset)

    this.column = column;
    this.game = game;
    this.initialX = x;
    this.initialY = y;

    this.circleSize = (this.game.width / 23);

    let graphics = game.add.graphics(0, 0);

    let col = 0xdacabf;
    if (x < this.game.width / 2) {
      col = 0x586A6A;
    }

    graphics.beginFill(col, 1);
    graphics.drawCircle(x, y, this.circleSize);
    // graphics.beginFill(col, 1);
    // graphics.drawCircle(x, y, circleSize);

    // this.sprite = game.add.sprite(x, y, graphics.generateTexture());
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(1.1, 1.1);

    this.loadTexture(graphics.generateTexture())

    this.game.physics.arcade.enable(this);

    // this.game.add.sprite(x, y, graphics.generateTexture());

    // this.sprite.body.velocity.y = 300;

    graphics.destroy();

    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(this.hitSprite, this);

    this.update = this.update.bind(this);
  }

  hitSprite(s1, s2) {
    this.stopChanging = true;

    this.kill();
    s2.body.velocity.y = 0;

    if ("vibrate" in window) {
      window.navigator.vibrate(10);
    }

    // if (this.x < this.game.width / 2) {
    //   this.game.sound.play('bass' + (this.column % 11 + 1));
    //   console.log('bass' + (this.column % 11 + 1))
    // } else {
    //   this.game.sound.play('treb' + (((this.column - 1) % 11 + 1) ));
    //   console.log('treb' + (((this.column - 1) % 11 + 1) ))
    // }

  }

  getX(x) {
    return this.x / (this.game.width / 23)
  }

  getSprite() {
    return this;
  }

  popUp() {
   
  }

  outOfBounds() {
    return this.body.position.y + this.height > this.game.height / 3 * 2;
  }

  isBomb() {
    return false;
  }

  isCoin() {
    return true;
  }


  update() {
    if (!this.playedSound && this.body.position.y > this.game.height / 2) {
      if (this.x < this.game.width / 2) {
        this.game.sound.play('bass' + (this.column % 11 + 1));
        console.log('bass' + (this.column % 11 + 1))
      } else {
        this.game.sound.play('treb' + (((this.column - 1) % 11 + 1) ));
        console.log('treb' + (((this.column - 1) % 11 + 1) ))
      }
      this.playedSound = true;
    }

    if (this.alive && !this.playedLose && this.body.position.y > this.game.height / 2 + this.circleSize) {
      // for (let i = 0; i < 5; i++) {
      //   this.game.sound.play((Math.random() > 0.5 ? 'treb' : 'bass') + Math.round(Math.random() * 11 + 1));

      // }
      this.game.sound.play('treb11');
      this.game.sound.play('treb10');
      this.game.sound.play('treb9');
      this.game.sound.play('bass5');
      this.game.sound.play('bass4');
      this.playedLose = true;
      // this.kill();
      this.game.state.start("Level1");

    }
  }

}

export default Coin;