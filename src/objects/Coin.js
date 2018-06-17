class Coin {

  constructor(game, x, y, player){
    this.game = game;
    this.x = x;
    this.y = y;

    let circleSize = 30;
    let borderSize = 30;

    let graphics = game.add.graphics(0, 0);

    graphics.beginFill(0x007700, 1);
    graphics.drawCircle(x, y, circleSize + borderSize);
    graphics.beginFill(0x00ff00, 1);
    graphics.drawCircle(x, y, circleSize);

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

    this.game.sound.play('coin');

    console.log()
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