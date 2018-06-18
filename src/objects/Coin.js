class Coin extends Phaser.Sprite {

  constructor(game, x, y, player){
    super(game, x, y)

    this.game = game;
    // this.x = x;
    // this.y = y;

    let circleSize = 30;
    let borderSize = 30;

    let graphics = game.add.graphics(0, 0);

    let col = 0xdacabf;
    if (x < this.game.width / 2) {
      col = 0x586A6A;
    }

    graphics.beginFill(col, 1);
    graphics.drawCircle(x, y, circleSize + borderSize);
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

    if (this.x < this.game.width / 2) {
      this.game.sound.play('bass' + this.getX(this.x));
    } else {
      this.game.sound.play('treb' + this.getX(this.x - this.game.width / 2));
    }

  }

  getX(x) {
    return (Math.round((x - 27) / (this.game.width / 2 / 9)) % 6) + 1;
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
  }

}

export default Coin;