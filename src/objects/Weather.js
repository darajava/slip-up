class Weather {
 
  constructor(game){
    this.game = game;

    this.rain = game.add.audio('rain');
    this.thunder = game.add.audio('thunder');
  }
 
  addRain(){
    this.thunder.volume = 0.3;
    this.thunder.play();    

    setTimeout(() => {
      this.rain.volume = 0.7;
      this.rain.fadeIn(2500, true);

      let rainParticle = this.game.add.bitmapData(15, 50);
   
      rainParticle.ctx.rect(0, 0, 15, 1000);
      rainParticle.ctx.fillStyle = '#7d7d7d';
      rainParticle.ctx.fill();

      this.emitter = this.game.add.emitter(this.game.world.centerX, -100, 400);
     
      this.emitter.width = this.game.world.width;
      this.emitter.angle = 4;
     
      this.emitter.makeParticles(rainParticle);
     
      this.emitter.minParticleScale = 0.3;
      this.emitter.maxParticleScale = 0.6;
     
      this.emitter.setYSpeed(1200, 2000);
      this.emitter.setXSpeed(0, 5);
     
      this.emitter.minRotation = 0;
      this.emitter.maxRotation = 1;
     
      this.emitter.start(false, 1600, 5, 0);

      let rainParticle2 = this.game.add.bitmapData(15, 50);
   
      rainParticle2.ctx.rect(0, 0, 15, 1000);
      rainParticle2.ctx.fillStyle = '#bbb';
      rainParticle2.ctx.fill();

      this.emitter2 = this.game.add.emitter(this.game.world.centerX, -100, 400);
     
      this.emitter2.width = this.game.world.width;
      this.emitter2.angle = 4;
     
      this.emitter2.makeParticles(rainParticle2);
     
      this.emitter2.minParticleScale = 0.3;
      this.emitter2.maxParticleScale = 0.6;
     
      this.emitter2.setYSpeed(1200, 2000);
      this.emitter2.setXSpeed(0, 5);
     
      this.emitter2.minRotation = 0;
      this.emitter2.maxRotation = 1;
     
      this.emitter2.start(false, 1600, 5, 0);

      this.emitterGroup = this.game.add.group();
      this.emitterGroup.add(this.emitter);
      this.emitterGroup.add(this.emitter2);

      this.emitterGroup.fixedToCamera = true;
    }, 2000)

  }
 
  removeRain() {
    this.emitter.kill();
  }
 
}
 
export default Weather;