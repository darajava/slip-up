import LevelRestart from './LevelRestart';

class Player {

  constructor(game, xy){
    this.game = game;
    this.x = xy[0];
    this.y = xy[1];

    let circleSize = 20;
    let borderSize = 20;

    let graphics = game.add.graphics(0, 0);

    graphics.beginFill(0x990000, 1);
    graphics.drawCircle(xy[0], xy[1], circleSize + borderSize);
    graphics.beginFill(0xFF0000, 1);
    graphics.drawCircle(xy[0], xy[1], circleSize);

    this.sprite = game.add.sprite(xy[0], xy[1], graphics.generateTexture());
    this.sprite.anchor.setTo(0.5, 0.5);

    this.game.physics.arcade.enable(this.sprite);

    graphics.destroy();

    this.update = this.update.bind(this);
  }

  update(x, y) {
    console.log(this.sprite)
    // console.log(angle);
    // console.log(velocity)

    // this.sprite.angle = angle;

    // this.sprite.body.moves = false;

    this.sprite.body.velocity.x = x;
    this.sprite.body.velocity.y = y;
    this.sprite.body.angularVelocity = 0;

    // this.game.physics.arcade.velocityFromAngle(this.sprite.angle, this.sprite.body.velocity, this.sprite.body.velocity);
  }


}

export default Player;