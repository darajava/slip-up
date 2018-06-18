class Controls extends Phaser.Sprite {



  constructor(game, xy, updateOutput) {
    super(game, xy[0], xy[1]);

    this.game = game;

    this.updateOutput = updateOutput;

    this.xStart = xy[0];
    this.yStart = xy[1];

    this.circleSize = 200;
    let borderSize = 20;

    let graphics = game.add.graphics(0, 0);

    if (this.x < this.game.width / 2) {
      graphics.beginFill(0x818D92, 1);
    }
    else {
      graphics.beginFill(0xcabaaf, 1);
    }

    graphics.drawCircle(xy[0], xy[1], this.circleSize + borderSize);


    this.inputEnabled = true;
    this.input.enableDrag();
    this.input.setDragLock(true, false);
    this.anchor.setTo(0.5, 0.5);

    this.loadTexture(graphics.generateTexture())

    // this.events.onDragStart.add(this.onDragStart, this);
    this.events.onDragStop.add(this.onDragStop, this);
    this.events.onDragUpdate.add(this.onDragUpdate, this);

    this.game.physics.arcade.enable(this);
    this.onDragStop();
    graphics.destroy();

  }


  onDragStop() {
    this.x = this.xStart;
    this.y = this.yStart;
    this.updateOutput(this.x, 0);    
  }

  onDragUpdate() {
    // console.log('[' + Math.abs(this.x - this.x) + ',' + Math.abs(this.y - this.y) + ']');
    this.x = Phaser.Math.clamp(this.x, this.xStart - this.game.width / 4, this.xStart + this.game.width / 4);
    // this.y = this.yStart;
    // this.sprite.y = Phaser.Math.clamp(this.sprite.y, this.sprite.y - this.circleSize, this.sprite.y + this.circleSize);

    this.updateOutput(this.x);

  }

  setPlayerSprite(player) {
    this.player = player;
  }

  turnOn(key) {
    // alert(key)
    for (let i = 0; i < key.length; i++) {
      this.outputs[key[i]] = true;
    }
    
    // console.log('setting ' + key + ' to trueee');
  }
 
  turnOff(key) {
    // if(key[0] === 'jump') {
    //   this.jump1.events.onInputOver.removeAll();
    //   this.jump2.events.onInputOver.removeAll();
    //   this.jump1.events.onInputOver.add(() => this.turnOn(['jump', 'left']));
    //   this.jump2.events.onInputOver.add(() => this.turnOn(['jump', 'right']));

    //   this.jump1.events.onInputOut.removeAll();
    //   this.jump2.events.onInputOut.removeAll();
    //   this.jump1.events.onInputOut.add(() => this.turnOff(['jump']));
    //   this.jump2.events.onInputOut.add(() => this.turnOff(['jump']));
    // }

    for (let i = 0; i < key.length; i++) {
      this.outputs[key[i]] = false;
    }
      console.log('setting ' + key + ' to false');
  }

  getOutputs() {
    return this.outputs;
  }
 
}
 
export default Controls;