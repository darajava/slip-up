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
    let upperLimit = this.xStart + this.game.width / 4 - this.circleSize * 0.6;
    let lowerLimit = this.xStart - this.game.width / 4 + this.circleSize * 0.6;

    this.x = Phaser.Math.clamp(this.x, lowerLimit, upperLimit);

    // upperLimit = 75;
    // lowerLimit = 25;

    let x = this.x;
    let absoluteLimit = upperLimit - lowerLimit 
    console.log(absoluteLimit);
    let multiplicand = 100 / absoluteLimit;

    console.log(multiplicand)
    console.log(multiplicand * absoluteLimit)

    x = x - lowerLimit;
    x = (x / absoluteLimit) * this.game.width / 2;
    if (this.xStart > this.game.width / 2) x += this.game.width / 2;

    this.updateOutput(x);

  }

}
 
export default Controls;