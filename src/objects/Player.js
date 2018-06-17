// import LevelRestart from './LevelRestart';

class Player {

  constructor(game, xy){
    this.game = game;
    this.x = xy[0];
    this.y = xy[1];

    let circleSize = 20;
    let borderSize = 20;

    let graphics = game.add.graphics(0, 0);

    let col = 0xdacabf;
    if (this.x < this.game.width / 2) {
      col = 0x586A6A;
    }

    graphics.beginFill(col, 1);
    graphics.drawCircle(xy[0], xy[1], circleSize + borderSize);
    // graphics.beginFill(0x818D92, 1);
    // graphics.drawCircle(xy[0], xy[1], circleSize);

    this.sprite = game.add.sprite(xy[0], xy[1], graphics.generateTexture());
    this.sprite.anchor.setTo(0.5, 0.5);

    this.game.physics.arcade.enable(this.sprite);

    this.sprite.body.onCollide = new Phaser.Signal();
    

    graphics.destroy();

    this.update = this.update.bind(this);
  }

  getSprite() {
    return this.sprite;
  }

  update(x, y) {
    //console.log(this.sprite)
    // console.log(angle);
    // console.log(velocity)

    // this.sprite.angle = angle;

    // this.sprite.body.moves = false;



    this.sprite.x = Phaser.Math.clamp(this.x - (x * 3) ^ 0.5, this.x - this.game.width / 4, this.x + this.game.width / 4);
    this.sprite.y = Phaser.Math.clamp(this.y - (y * 3) ^ 0.5, 0, this.game.height / 3 * 2);
    this.sprite.body.angularVelocity = 0;

    // this.game.physics.arcade.velocityFromAngle(this.sprite.angle, this.sprite.body.velocity, this.sprite.body.velocity);
  }


}

export default Player;