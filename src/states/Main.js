import Background from '../objects/Background';
import Player from '../objects/Player';
import Controls from '../objects/Controls';

class Main extends Phaser.State {

  create() {
    //Enable Arcade Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.densityFactor = window.devicePixelRatio / 3;

    // let levelWidth = this.game.width * 5;

    // this.background = new Background(this.game, levelWidth);

    // this.game.world.setBounds(0, 0, levelWidth, this.game.height);

    // this.controls = new Controls(this.game);
    // this.player = new Player(this.game, this.controls);

    // this.controls.setPlayerSprite(this.player.sprite);

    // this.level1 = new Level1(this.game, this.player, levelWidth);

    // this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON);

    // this.x = 0;

    this.game.state.start("Level1");
  }

  // update() {
  //   // this.level1.update();
  //   // this.player.update();
  //   // this.background.update({x: this.player.sprite.x});
  // }

}

export default Main;
