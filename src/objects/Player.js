// import LevelRestart from './LevelRestart';

class Player extends Phaser.Sprite {

  constructor(game, x, y){
    super(game, x, y);
    this.game = game;

    this.xStart = x;
    this.yStart = y;

    this.circleSize = 50;
    let borderSize = 20;

    let graphics = game.add.graphics(0, 0);

    let col = 0xdacabf;
    if (this.x < this.game.width / 2) {
      col = 0x586A6A;
    }

    graphics.beginFill(col, 1);
    graphics.drawCircle(x, y, this.circleSize);
    // graphics.beginFill(0x818D92, 1);
    // graphics.drawCircle(xy[0], xy[1], circleSize);


    this.loadTexture(graphics.generateTexture())

    // this = game.add.sprite(xy[0], xy[1], graphics.generateTexture());
    this.anchor.setTo(0.5, 0.5);

    this.game.physics.arcade.enable(this);
    this.body.onCollide = new Phaser.Signal();
    

    graphics.destroy();

    this.update = this.update.bind(this);
  }

  updatePos(x, y) {

    console.log(x);
    let upperLimit = this.xStart + this.game.width / 4 - this.circleSize / 2;
    let lowerLimit = this.xStart - this.game.width / 4 + this.circleSize / 2;
    this.x = Phaser.Math.clamp(x, lowerLimit, upperLimit);
  }


}

export default Player;