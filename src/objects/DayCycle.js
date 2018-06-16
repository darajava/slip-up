class DayCycle {
 
  constructor(game, dayLength){
    this.game = game;
    this.dayLength = dayLength;
    this.shading = false;
    this.sunSprite = false;
    this.moonSprite = false;

    this.dayGroup = this.game.add.group();
    this.dayGroup.fixedToCamera = true;
  }
 
  initSun(sprite) {
    this.sunSprite = sprite;
    this.sunset(sprite);
    this.dayGroup.add(this.sunSprite);
    this.dayGroup.fixedToCamera = true;
  }
 
  initMoon(sprite) {
    this.moonSprite = sprite;
    this.moonrise(sprite);
    this.dayGroup.add(this.moonSprite);
    this.dayGroup.fixedToCamera = true;
  }
 
  initShading(sprites){
    this.shading = sprites;
  }
 
  sunrise(sprite){
    sprite.position.x = this.game.width / 4 * 3;
   
    this.sunTween = this.game.add.tween(sprite).to( { y: -650 }, this.dayLength, null, true);
    this.sunTween.onComplete.add(this.sunset, this);
   
    if(this.shading){
      this.shading.forEach((sprite) => {
        this.tweenTint(sprite, false);
      });
    }
 
  }
 
  sunset(sprite) {
    sprite.position.x = this.game.width / 4;
 
    this.sunTween = this.game.add.tween(sprite).to( { y: this.game.world.height + 500 }, this.dayLength, null, true);
    this.sunTween.onComplete.add(this.sunrise, this);
 
    if(this.shading){
      this.shading.forEach((sprite) => {
        this.tweenTint(sprite, true);
      });
    }
  }
 
  moonrise(sprite) {
    sprite.position.x = this.game.width / 4 * 3;
 
    this.moonTween = this.game.add.tween(sprite).to( { y: -550 }, this.dayLength, null, true);
    this.moonTween.onComplete.add(this.moonset, this);     
  }
   
  moonset(sprite) {
    sprite.position.x = this.game.width / 4;
 
    this.moonTween = this.game.add.tween(sprite).to( { y: this.game.world.height + 500 }, this.dayLength, null, true);
    this.moonTween.onComplete.add(this.moonrise, this);    
  }
 
  tweenTint(spriteToTween, darker) {
    let maxAlpha = 1;

    let colorBlend = {alpha: darker ? 0 : 1};
        // alert();
 
    this.game.add.tween(colorBlend).to({alpha: darker ? 1 : 0}, this.dayLength, Phaser.Easing.Default, false)
      .onUpdateCallback(() => {
        if (spriteToTween.less !== true)
          spriteToTween.sprite.alpha = colorBlend.alpha;
        else
          spriteToTween.sprite.alpha = colorBlend.alpha / 2;

        if (spriteToTween.stars) {
          if (colorBlend.alpha < 0.6) {
            spriteToTween.sprite.alpha = 0;
          } else { 
            spriteToTween.sprite.alpha = colorBlend.alpha - 0.6;
          }
        }

        let val = 1 - Math.max(colorBlend.alpha, 0.3);

        let hexVal = (Math.floor((val) * 255)).toString(16);

        if (hexVal.length < 2) {
          hexVal =  '0' + hexVal;
        } 

        this.game.stage.backgroundColor = '#' + hexVal + '' + hexVal + '' + hexVal; 
        // console.log(hexVal)
      })
      .start()
 
  }
 
}
 
export default DayCycle;