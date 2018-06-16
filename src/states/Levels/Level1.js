import Background from '../../objects/Background';
import Player from '../../objects/Player';
import Controls from '../../objects/Controls';
import Coin from '../../objects/Coin';
import TextOverlay from '../../objects/TextOverlay';
import LevelEnd from '../../objects/LevelEnd';
// import Level1 from '../objects/Level1';


// todo: probably rename because i think there will only be one long level
class Level1 extends Phaser.State {

  create() {
    this.game.world.scale.set(window.devicePixelRatio);

    let midX = window.innerWidth / 2;
    let midY = window.innerHeight / 2;
    let bottomY = window.innerHeight / 3 * 2;

    this.background = this.game.add.tileSprite(0, 0, 600, 100, 'road');
    this.background.height = bottomY;
    // this.background.width = 600;

    this.background.scale.x = (this.game.width / this.background.width);

    this.line1 = new Phaser.Line(midX, 0, midX, window.innerHeight);
    this.line2 = new Phaser.Line(0, bottomY, window.innerWidth, bottomY);

    this.joysticks = [
      [
        midX / 2,
        (window.innerHeight + bottomY) / 2,
      ],
      [
        midX / 2 * 3,
        (window.innerHeight + bottomY) / 2,
      ],
    ];

    this.drawLine(new Phaser.Line(this.joysticks[0][0], this.joysticks[0][1], this.joysticks[1][0], this.joysticks[1][1]))

    this.players = [
      new Player(this.game, [midX / 2, midY]),
      new Player(this.game, [midX / 2 * 3, midY]),
    ]

    this.controls = [
      new Controls(this.game, this.joysticks[0], this.players[0].update),
      new Controls(this.game, this.joysticks[1], this.players[1].update),
    ]

    this.coins = [];

    for (let i = 0; i < 100; i++) {
      this.coins.push(new Coin(this.game, Math.random() * this.game.width, Math.random() * 10000 - 10000))
    }

    // // todo: figure this out in an elegant way
    // this.fixDensity();
  }

  drawLine(line) {
    let graphics = this.game.add.graphics(0,0);
    //var graphics=game.add.graphics(line.start.x,line.start.y);//if you have a static line
    graphics.lineStyle(10, 0xffd900, 1);
    graphics.moveTo(line.start.x,line.start.y);//moving position of graphic if you draw mulitple lines
    graphics.lineTo(line.end.x,line.end.y);
    graphics.endFill();
  }

  fixDensity() {
  
  }

  update() {
    this.drawLine(this.line1)
    this.drawLine(this.line2)
    this.background.tilePosition.y += 10;

  }

}

export default Level1;
