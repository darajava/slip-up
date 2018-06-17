class Coin {

  constructor(game, x, y, player){
    this.game = game;
    this.x = x;
    this.y = y;

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

    this.sprite = game.add.sprite(x, y, graphics.generateTexture());
    this.sprite.anchor.setTo(0.5, 0.5);

    this.game.physics.arcade.enable(this.sprite);

    // this.sprite.body.velocity.y = 300;

    graphics.destroy();

    this.sprite.body.onCollide = new Phaser.Signal();
    this.sprite.body.onCollide.add(this.hitSprite, this);

    this.update = this.update.bind(this);
  }

  hitSprite(s1, s2) {

        // console.log('collisionHandler')
    this.sprite.kill();
    s2.body.velocity.y = 0;

    // if (typeof window.navigator !== 'undefined') {
    //   window.navigator.vibrate(10)
    // }

    if (this.x < this.game.width / 2) {
      console.log(this.x);
      console.log(this.game.width);
      this.game.sound.play('bass' + this.getX(this.x));
    } else {
      this.game.sound.play('treb' + this.getX(this.x - this.game.width / 2));
    }

    console.log()
  }

  getX(x) {
    return (Math.round((x - 27) / (this.game.width / 2 / 9)) % 6) + 1;
  }

  getSprite() {
    return this.sprite;
  }

  popUp() {
   
  }

  update() {
    console.log(this.sprite.y);

  }

}

export default Coin;