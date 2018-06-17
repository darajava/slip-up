class Controls {



  constructor(game, xy, updateOutput) {
    this.game = game;

    this.updateOutput = updateOutput;

    this.x = xy[0];
    this.y = xy[1];

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
    // graphics.beginFill(0x0000ff, 1);
    // graphics.drawCircle(xy[0], xy[1], this.circleSize);

    this.sprite = game.add.sprite(xy[0], xy[1], graphics.generateTexture());
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();
    this.sprite.input.setDragLock(true, false);
    this.sprite.anchor.setTo(0.5, 0.5);

    this.sprite.events.onDragStop.add(this.onDragStop, this);
    this.sprite.events.onDragUpdate.add(this.onDragUpdate, this);

    graphics.destroy();

  }

  onDragStop() {
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.updateOutput(0, 0);    
  }

  onDragUpdate() {
    // console.log('[' + Math.abs(this.x - this.sprite.x) + ',' + Math.abs(this.y - this.sprite.y) + ']');

    this.sprite.x = Phaser.Math.clamp(this.sprite.x, this.x - this.circleSize / 2, this.x + this.circleSize / 2);
    this.sprite.y = Phaser.Math.clamp(this.sprite.y, this.y - this.circleSize, this.y + this.circleSize);


    let angle = Math.atan2(this.y - this.sprite.y, this.x - this.sprite.x) * 180 / Math.PI;
    this.updateOutput(this.x - this.sprite.x, this.y - this.sprite.y);

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