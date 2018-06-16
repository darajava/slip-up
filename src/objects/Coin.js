class Coin {

  constructor(game, x, y){
    this.game = game;
    this.x = x;
    this.y = y;

    let circleSize = 20;
    let borderSize = 20;

    let graphics = game.add.graphics(0, 0);

    graphics.beginFill(0x007700, 1);
    graphics.drawCircle(x, y, circleSize + borderSize);
    graphics.beginFill(0x00ff00, 1);
    graphics.drawCircle(x, y, circleSize);

    this.sprite = game.add.sprite(x, y, graphics.generateTexture());
    this.sprite.anchor.setTo(0.5, 0.5);

    this.game.physics.arcade.enable(this.sprite);

    this.sprite.body.velocity.y = 1000;

    graphics.destroy();

    this.update = this.update.bind(this);
  }

  fixDensity() {
    // this.spike.scale.setTo(this.densityFactor, 3 * this.densityFactor);
  }

  popUp() {
   
  }

  update() {

  }

}

export default Coin;