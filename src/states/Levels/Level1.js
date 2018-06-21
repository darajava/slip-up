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


    this.level = level;


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
 
    // this.background = this.game.add.tileSprite(0, 0, 600, 100, 'road');
    // this.background.height = bottomY;
    // this.background.width = 600;

    // this.background.scale.x = (this.game.width / this.background.width);
    this.time = new Date();

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
    let spacing = 100;

    for (let i = 0; i < this.level.length; i++) {
      let item = this.level[i];

      let gridWidth = (this.game.width / 23);


      item.column = parseInt(item.x);
      item.x = Math.round(parseInt(item.x) * gridWidth + gridWidth / 2);
      item.y = parseInt(item.y) * -spacing;
    }
  }

  addToGroup() {
    for (let i = 0; i < this.level.length; i++) {
      if (
        this.onScreen(this.level[i]) 
        &&
        !this.groupContains(this.level[i])
      ) {
        this.addItem(this.level[i]);
      } else if (
        !this.onScreen(this.level[i]) 
        &&
        this.groupContains(this.level[i])
      ) {
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
    // console.log(item);

    // if (this.group.children.length > 2) return;

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

  onScreen(item) {
    // console.log(item);
    // console.log(this.plusPixels)
    // console.log(item.y > this.plusPixels);

    // if (Math.random() > 0.999) hello;
    // return true;
    return item.y + this.plusPixels > -100 && item.y + this.plusPixels < this.game.height; 
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

  drawLine(line) {
    let graphics = this.game.add.graphics(0,0);
    //var graphics=game.add.graphics(line.start.x,line.start.y);//if you have a static line
    graphics.lineStyle(10, 0x000000, 1);
    graphics.moveTo(line.start.x,line.start.y);//moving position of graphic if you draw mulitple lines
    graphics.lineTo(line.end.x,line.end.y);
    graphics.endFill();
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


    this.addToGroup();




    let loopCount = 0;
    while (this.getCoinAmount() < this.limit) {
      this.addNewDot();
      if (loopCount++ > 100) {
        break;
      }
    }

    let speed = 5;

    for (let i = 0; i < this.group.children.length; i++) {

      // Check if it's not a bomb
      if (this.group.children[i].alive  && this.group.children[i].isCoin() && this.group.children[i].outOfBounds()) {
        // this.game.state.start("Level1");
        // this.game.sound.play('lose');

        // this.group.children[i].kill();
        // this.collisionHandler();
      }

      if (!this.group.children[i].alive) {
        let spriteToRemove = this.group.children[i];
        // this.group.remove(spriteToRemove);
        spriteToRemove.kill();
      }

      if (this.group.children[i])
        this.group.children[i].body.position.y += speed;

    }
    
    this.plusPixels += speed;
  }

  getCoinAmount() {
    let coinAmount = 0;

    for (let i = 0; i < this.group.children.length; i++) {
      if (this.group.children[i].isCoin()) coinAmount++;
    }

    return coinAmount;
  }

  processHandler(player, coin) {
    return true;
  }

  collisionHandler(player, coin) {
    // console.log('collisionHandler')
    // coin.kill();
    // player.body.velocity.y = 0;
    // console.log('len', this.group.length);

    this.score++;
    if (parseInt(localStorage.getItem('highscore')) < this.score) {
      localStorage.setItem('highscore', this.score);
    }

    this.scoreText.text = this.score;
    this.hiScoreText.text = localStorage.getItem('highscore');

  }

  addNewDot() {
    // this.addAgain = !this.addAgain

    // if (this.addAgain) {
    {
      let startingPoint = this.lastCoinGenerated1;

      if (startingPoint < this.coins1.length) 
        do {
            this.addCoinRow(startingPoint, this.coins1[startingPoint]);
        } while(typeof this.coins1[startingPoint] !== 'undefined' && this.coins1[startingPoint++].length === 0)

      this.lastCoinGenerated1 = startingPoint;

      let startingPoint2 = this.lastCoinGenerated2;
      if (startingPoint2 < this.coins2.length) 
        do {
            this.addCoinRow(startingPoint2, this.coins2[startingPoint2], true);
        } while(typeof this.coins2[startingPoint2] !== 'undefined' && this.coins2[startingPoint2++].length === 0)

      this.lastCoinGenerated2 = startingPoint2;

    }
  }

}

export default Level1;
