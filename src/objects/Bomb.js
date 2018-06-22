class Bomb extends Phaser.Sprite {

  constructor(game, x, y, offset) {
    super(game, x, y + offset)

    this.game = game;
    this.initialX = x;
    this.initialY = y;

    let circleSize = (this.game.width / 23 / 1.3);

    let graphics = game.add.graphics(0, 0);

    graphics.beginFill(0xbb0000, 1);
    graphics.drawCircle(x, y, circleSize);
    // graphics.beginFill(0xff0000, 1);
    // graphics.drawCircle(x, y, circleSize);

    // this.sprite = game.add.sprite(x, y, graphics.generateTexture());
    this.anchor.setTo(0.5, 0.5);
    // this.scale.setTo(0.09, 0.09);

    this.game.physics.arcade.enable(this);

    this.body.velocity.y = 0;
    this.loadTexture(graphics.generateTexture())

    graphics.destroy();

    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(this.hitSprite, this);

    this.update = this.update.bind(this);
  }

  hitSprite(s1, s2) {
    // console.log('hit')
    // console.log(s1)
    // console.log(s2)
    // console.log('collisionHandler')
    
    s2.kill();
    s2.body.velocity.y = 0;
  }

  getSprite() {
    return this.sprite;
  }

  popUp() {
   
  }

  isBomb() {
    return !false;
  }

  isCoin() {
    return !true;
  }

  update() {
    let fadeTime = 300;

    if (this.body.position.y + this.height > this.game.height / 3 * 2) {
      // this.game.add.tween(this).to( { alpha: 0 }, fadeTime, Phaser.Easing.Linear.None, true, 0, 1000, true);

      // setTimeout(() => {
        this.destroy();
      // }, fadeTime);
    }
  }

}

export default Bomb;