class TextOverlay {

  constructor(game, text, position, title){
    this.position = position;
    this.game = game;
    this.densityFactor = window.devicePixelRatio / 3;

    this.text = game.add.text(position, game.height / 4, text,  { font: "900 86px Raleway", fill: '#000' });
    this.text.fontSize = 200 * this.densityFactor;

    this.text.anchor.setTo(0.5, 0.5);


    if (title) {
      this.text.fontSize = 450 * this.densityFactor;
      this.text.position.y = game.height / 5;
      this.text.anchor.setTo(0, 0.5);
      this.text.font = "Raleway"
      this.text.fontWeight = "900"
    }

    //Do something
  }

  update(playerPosition) {
    let distance = Math.abs(playerPosition - this.text.x);

    let alpha = 0;
    if (distance === 0) {
      alpha = 1;
    } else {
      alpha = 1 - (distance / (this.game.width / 2));
    }

    if (alpha < 0) alpha = 0;

    this.text.alpha = alpha;

    // console.log(distance);
    // console.log(alpha);
  }

  setText(text) {
    this.text.setText(text);
  }

}

export default TextOverlay;