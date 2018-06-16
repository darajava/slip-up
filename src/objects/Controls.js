class Controls {



  constructor(game, xy, updateOutput) {
    this.game = game;

    this.updateOutput = updateOutput;

    this.x = xy[0];
    this.y = xy[1];

    let circleSize = 200;
    let borderSize = 20;

    let graphics = game.add.graphics(0, 0);

    graphics.beginFill(0x990000, 1);
    graphics.drawCircle(xy[0], xy[1], circleSize + borderSize);
    graphics.beginFill(0xFF0000, 1);
    graphics.drawCircle(xy[0], xy[1], circleSize);

    this.sprite = game.add.sprite(xy[0], xy[1], graphics.generateTexture());
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();
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


    let angle = Math.atan2(this.y - this.sprite.y, this.x - this.sprite.x) * 180 / Math.PI;
    this.updateOutput(-(this.x - this.sprite.x) * 4, -(this.y - this.sprite.y) * 4);

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