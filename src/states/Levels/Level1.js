// import Background from '../../objects/Background';
import Player from '../../objects/Player';
import Controls from '../../objects/Controls';
import Coin from '../../objects/Coin';
import Bomb from '../../objects/Bomb';
// import TextOverlay from '../../objects/TextOverlay';
// import LevelEnd from '../../objects/LevelEnd';
// import Level1 from '../objects/Level1';

// generated with parseLevel.js
import level from './level.json';

// todo: probably rename because i think there will only be one long level
class Level1 extends Phaser.State {

  create() {
    // this.game.world.scale.set(window.devicePixelRatio);
    this.game.stage.backgroundColor = "#fff";


    this.level = JSON.parse(JSON.stringify(level));
    this.frame = 0;

    this.speed = 4.5;


    this.drawRect(0, 0, this.game.width / 2, this.game.height, 0xB9A394, 0.5);
    this.drawRect(this.game.width / 2, 0, this.game.width / 2, this.game.height, 0x586A6A, 0.5);

    this.drawRect(0, this.game.height / 3 * 2, this.game.width / 2, this.game.height / 3, 0xB9A394, 0.5);
    this.drawRect(this.game.width / 2, this.game.height / 3 * 2, this.game.width / 2, this.game.height / 3, 0x586A6A, 0.5);

    this.score = 0;
    this.scoreDesc = this.addText('score', '#acb5b5', this.game.width / 2, 0, true);
    this.scoreText = this.addText(this.score, '#dcd1ca', this.game.width / 2, 0, false);

    this.hiScoreDesc = this.addText('high', '#acb5b5', this.game.width / 2, 78, true, true);
    this.hiScoreText = this.addText('', '#dcd1ca', this.game.width / 2, 78, false, true);

    if (!localStorage.getItem('highscore')) {
      localStorage.setItem('highscore', 0);
    }

    this.hiScoreText.text = parseInt(localStorage.getItem('highscore'));

    this.midX = window.innerWidth / 2;
    let midY = window.innerHeight / 2;
    let bottomY = window.innerHeight / 3 * 2;
    this.plusPixels = 0;
 
    this.line1 = new Phaser.Line(this.midX, 0, this.midX, window.innerHeight);
    this.line2 = new Phaser.Line(0, bottomY, window.innerWidth, bottomY);

    this.joysticks = [
      [
        this.midX / 2,
        (window.innerHeight + bottomY) / 2,
      ],
      [
        this.midX / 2 * 3,
        (window.innerHeight + bottomY) / 2,
      ],
    ];

    this.players = [
      new Player(this.game, Math.round(this.midX / 2), midY),
      new Player(this.game, Math.round(this.midX / 2 * 3), midY),
    ]

    let players = this.game.add.group();
    players.add(this.players[0]);
    players.add(this.players[1]);

    this.controls = [
      new Controls(this.game, this.joysticks[0], (x, y) => this.players[0].updatePos(x, y)),
      new Controls(this.game, this.joysticks[1], (x, y) => this.players[1].updatePos(x, y)),
    ];


    let controls = this.game.add.group();
    controls.add(this.controls[0]);
    controls.add(this.controls[1]);

    this.group = this.game.add.physicsGroup();


    this.cleanLevel();
    console.log(this.level);
    // this.addCoinRowToGroup = this.addCoinRowToGroup.bind(this)
  }

  cleanLevel() {
    let spacing = 25;

    for (let i = 0; i < this.level.length; i++) {
      let item = this.level[i];

      let gridWidth = (this.game.width / 23);


      item.column = parseInt(item.x);
      item.x = Math.round(parseInt(item.x) * gridWidth + gridWidth / 2);
      item.y = parseInt(item.y) * -spacing;
    }
  }

  refreshGroup() {
    for (let i = 0; i < this.level.length; i++) {
      if (this.onScreen(this.level[i]) && !this.groupContains(this.level[i])) {
        this.addItem(this.level[i]);
      } else if (!this.onScreen(this.level[i]) && this.groupContains(this.level[i])) {
        this.removeItem(this.level[i]);
      }
    }
  }

  groupContains(item) {
    for (let i = 0; i < this.group.children.length; i++) {
      if (this.group.children[i].initialX === item.x && this.group.children[i].initialY === item.y) {
        return true;
      }
    }

    return false;
  }


  addItem(item) {
    if (item.type === 'x') {
      this.group.add(new Coin(this.game, item.x, item.y, this.plusPixels, item.column))
    } else if (item.type === 'c') {
      this.group.add(new Bomb(this.game, item.x, item.y, this.plusPixels))
    }
  }

  removeItem(item) {
    for (let i = 0; i < this.group.children.length; i++) {
      if (this.group.children[i].initialX === item.x && this.group.children[i].initialY === item.y) {
        let x = this.group.children[i];
        this.group.remove(this.group.children[i]);
        x.destroy();
      }
    }
  }


  clearGroup() {
    for (let i = 0; i < this.group.children.length; i++) {
      let x = this.group.children[i];
      this.group.remove(this.group.children[i]);
      x.destroy();
    }
  }

  onScreen(item) {
    return item.y + this.plusPixels > -100 * this.speed && item.y + this.plusPixels < this.game.height; 
  }

  addText(text, colour, x, y, left, small) {
    let font = small ? '44' : '66';

    let textObject = this.game.add.text(x, y, text, {
        font: font + "px Raleway",
        fill: colour,
        align: "right"
    });


    if (left) {
      textObject.anchor.setTo(1, 0);
      textObject.x -= 10;
    }
    else {
      textObject.anchor.setTo(0, 0);
      textObject.x += 10;
    }

    return textObject;
  }


  drawRect(x, y, w, h, col, opacity) {
    let graphics = this.game.add.graphics(); // adds to the world stage
    graphics.beginFill(col, opacity);
    graphics.drawRect(x, y, w, h);
    graphics.endFill();
  }


  update() {

    this.game.physics.arcade.collide(
      this.players[0],
      this.group,
      this.collisionHandler,
      this.processHandler,
      this
    );

    this.game.physics.arcade.collide(
      this.players[1],
      this.group,
      this.collisionHandler,
      this.processHandler,
      this
    );


    if (this.frame++ % 100 === 0) {
      this.refreshGroup();
    }

    for (let i = 0; i < this.group.children.length; i++) {
      if (this.group.children[i])
        this.group.children[i].body.position.y += this.speed;
    }
    
    this.plusPixels += this.speed;
  }

  processHandler(player, coin) {
    return true;
  }

  collisionHandler(player, coin) {

    this.score++;
    if (parseInt(localStorage.getItem('highscore')) < this.score) {
      localStorage.setItem('highscore', this.score);
    }

    this.scoreText.text = this.score;
    this.hiScoreText.text = localStorage.getItem('highscore');

    if (this.score !== 0 && this.score % this.countCoins() === 0) {
      this.speed++;
      this.plusPixels = -100 * this.speed;
      this.clearGroup();
    }

  }

  countCoins() {
    // console.log(this.level);
    // return this.level.length;
    let result = 0;

    for (let i = 0; i < level.length; i++) {
      if (level[i].type === 'x') {
        result++;
      }
    }

    return result;
  }


}

export default Level1;
