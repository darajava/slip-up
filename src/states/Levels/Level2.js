import Background from '../../objects/Background';
import Player from '../../objects/Player';
import Controls from '../../objects/Controls';
// import Spike from '../../objects/Spike';
import Fire from '../../objects/Fire';
import TextOverlay from '../../objects/TextOverlay';
import LevelEnd from '../../objects/LevelEnd';
import LevelStart from '../../objects/LevelStart';
// import Level2 from '../objects/Level2';

class Level2 extends Phaser.State {

  create() {
    let levelWidth = this.game.width * 6;
    
    window.game = this.game;

    this.background = new Background(this.game, levelWidth);

    this.game.world.setBounds(0, 0, levelWidth, this.game.height);

    this.controls = new Controls(this.game);
    this.player = new Player(this.game, this.controls, levelWidth);

    this.player.sprite.x = this.game.width;

    this.controls.setPlayerSprite(this.player.sprite);

    this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON);

    this.breeze = this.game.add.audio('breeze');
    this.breeze.loop = true;
    this.breeze.volume = 0.6;
    this.breeze.play();

    this.squeak = this.game.add.audio('squeak');
    this.squeak.loop = true;
    this.squeak.volume = 0.2;

    let game = this.game;

    this.levelWidth = levelWidth;
    this.densityFactor = window.devicePixelRatio / 3;

    this.grass = game.add.tileSprite(0,
      game.height - game.cache.getImage('grass').height * this.densityFactor,
      levelWidth / this.densityFactor,
      game.cache.getImage('grass').height,
      'grass'
    );
    game.physics.enable(this.grass);
    this.grass.body.moves = false;
    this.grass.body.immovable = true;
    this.grass.body.collideWorldBounds = true;
    this.grass.body.setSize(this.grass.width, this.grass.height - 20, 0, 20);

    this.blockInitPos = game.width / 2 - game.cache.getImage('block').height * this.densityFactor * 7;
    this.block = game.add.sprite(this.blockInitPos,
      game.height * 0.8,
      'trolly'
    );

    var idle = this.block.animations.add('rolling', [0, 1, 2, 3, 4]);

    game.physics.enable(this.block);
    this.block.body.moves = true;
    this.block.body.immovable = false;
    this.block.body.collideWorldBounds = true;
    // this.block.body.drag.set(200);

    this.spikes = [];
    let spacing = 1100 * this.densityFactor;
    let lastPos = (this.game.width + this.game.width / 2);
    for (let i = 1; i < 35; i++) {
      this.spikes.push(new Spike(this.game, this.player, lastPos, this.game.height - this.grass.body.height));      
      lastPos += spacing;
      spacing *= 0.9;
    }

    // // spacing = 30 * this.densityFactor;
    // console.log(spacing);
    // for (let i = 25; i < 35; i++) {
    //   this.spikes.push(new Spike(this.game, this.player, this.game.width + this.game.width / 2 + spacing * i, this.game.height - this.grass.body.height));      
    // }

    // game.physics.enable(this.spike);
    // this.spike.body.moves = true;
    // this.spike.body.immovable = true ;
    // this.spike.body.setSize(this.spike.width, this.block.height - 20, 0, 20);
    
    this.fire = new Fire(game, levelWidth - 500, game.height - 20);
    game.world.bringToTop(this.grass);


    let levelStart = new LevelStart(this.game, this.levelWidth);
    levelStart.fadeIn();

    this.oldtext = [
      'Don\'t try jumping',
      'I said don\'t',
    ]

    this.newtext = [
      '',
      '',
    ]

    this.text1 = new TextOverlay(game, this.oldtext[0], 2 * game.width + game.width / 2)
    this.text2 = new TextOverlay(game, this.oldtext[1], 1.7 * game.width * 2 + game.width / 2)

    
    this.fixDensity();
  }

  fixDensity() {
    this.grass.scale.setTo(this.densityFactor, this.densityFactor);
    this.block.scale.setTo(this.densityFactor, this.densityFactor);
    // this.text1.scale.setTo(this.densityFactor, this.densityFactor);
    // this.text2.scale.setTo(this.densityFactor, this.densityFactor);
    // this.text3.scale.setTo(this.densityFactor, this.densityFactor);
    // this.text4.scale.setTo(this.densityFactor, this.densityFactor);
    // this.titleText.scale.setTo(this.densityFactor, this.densityFactor);
  }

  updatePlayerVelocity() {
    console.log('touching');
    if (this.block.body.touching.up) {
      this.text1.setText(this.newtext[0]);
      this.text2.setText(this.newtext[1]);
      this.player.addXVel(this.block.body.velocity.x);
    }
  }

  update() {
    this.text1.setText(this.oldtext[0]);
    this.text2.setText(this.oldtext[1]);

    let distanceFromEnd = this.levelWidth - this.player.sprite.x;

    if (this.block.body.velocity.x > this.player.pushSpeed) {
      this.block.body.velocity.x = this.player.pushSpeed;
    }

    if (this.block.body.x < this.blockInitPos) {
      this.block.body.x = this.blockInitPos;
      this.block.body.velocity.x = 0;
    } else {
      if (Math.abs(this.block.body.velocity.x) > 10 && !this.rolling) {
        this.rolling = true;
        this.block.animations.play('rolling', 15, true);
        this.squeak.play();
      } else if (Math.abs(this.block.body.velocity.x) < 10) {
        this.rolling = false;
        this.block.animations.stop();
        this.squeak.stop();
      }
    }

    this.game.physics.arcade.collide(this.player.sprite, this.grass);
    this.player.addXVel(0);
    this.game.physics.arcade.collide(this.block, this.player.sprite, () => {this.updatePlayerVelocity()});
    this.game.physics.arcade.collide(this.grass, this.block);

    this.player.update();
    this.text1.update(this.player.sprite.x);
    this.text2.update(this.player.sprite.x);
    // this.text3.update(this.player.sprite.x);
    this.background.update({x: this.player.sprite.x});

    if (distanceFromEnd < 500 && !this.sizzlePlaying) {
      // this.sizzle.play();
      this.player.disableControls();
      this.sizzlePlaying = true;
      let levelEnd = new LevelEnd(this.game, this.levelWidth);
      levelEnd.fadeOut('Level1');
    }

    for (let i = 0; i < this.spikes.length; i++)
      this.spikes[i].update();
  }

}

export default Level2;
