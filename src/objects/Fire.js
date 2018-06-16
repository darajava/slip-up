class Fire {

  constructor(game, posX, posY){

    function FireParticle(game, x, y) {
      Phaser.Particle.call(this, game, x, y, game.cache.getBitmapData('flame'));
    }

    FireParticle.prototype = Object.create(Phaser.Particle.prototype);
    FireParticle.prototype.constructor = FireParticle;

    function SmokeParticle(game, x, y) {
      Phaser.Particle.call(this, game, x, y, game.cache.getBitmapData('smoke'));
    }

    SmokeParticle.prototype = Object.create(Phaser.Particle.prototype);
    SmokeParticle.prototype.constructor = SmokeParticle;

    var pSize = game.world.width / 65;


    var bmpd2 = game.add.bitmapData(pSize, pSize);
    // Create a radial gradient, yellow-ish on the inside, orange
    // on the outside. Use it to draw a circle that will be used
    // by the FireParticle class.
    var grd2 = bmpd2.ctx.createRadialGradient(
      pSize / 2, pSize /2, 2,
      pSize / 2, pSize / 2, pSize * 0.5);
    grd2.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
    grd2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    bmpd2.ctx.fillStyle = grd2;
    
    bmpd2.ctx.arc(pSize / 2, pSize / 2 , pSize / 2, 0, Math.PI * 2);
    bmpd2.ctx.fill();
    let smokeEmitter = game.add.emitter(posX, posY - 20, 100);

    smokeEmitter.width = 3 * pSize;
    smokeEmitter.particleClass = SmokeParticle;
    // Magic happens here, bleding the colors of each particle
    // generates the bright light effect
    // smokeEmitter.blendMode = PIXI.blendModes.ADD;

    game.cache.addBitmapData('smoke', bmpd2);

    smokeEmitter.makeParticles();
    smokeEmitter.minParticleSpeed.set(-15, -80);
    smokeEmitter.maxParticleSpeed.set(15, -100);
    smokeEmitter.setRotation(0, 0);
    // Make the flames taller than they are wide to simulate the
    // effect of flame tongues
    smokeEmitter.setScale(3, 1, 7, 3, 12000, Phaser.Easing.Quintic.Out);
    smokeEmitter.gravity = -10;
    smokeEmitter.start(false, 2000, 50);


    var bmpd = game.add.bitmapData(pSize, pSize);
    // Create a radial gradient, yellow-ish on the inside, orange
    // on the outside. Use it to draw a circle that will be used
    // by the FireParticle class.
    var grd = bmpd.ctx.createRadialGradient(
      pSize / 2, pSize /2, 2,
      pSize / 2, pSize / 2, pSize * 0.5);
    grd.addColorStop(0, 'rgba(193, 170, 30, 0.6)');
    grd.addColorStop(1, 'rgba(255, 90, 20, 0)');
    bmpd.ctx.fillStyle = grd;
    
    bmpd.ctx.arc(pSize / 2, pSize / 2 , pSize / 2, 0, Math.PI * 2);
    bmpd.ctx.fill();
    
    game.cache.addBitmapData('flame', bmpd);
    
    // Generate 100 particles 
    let fireEmitter = game.add.emitter(posX, posY - 20, 100);

    fireEmitter.width = 3 * pSize;
    fireEmitter.particleClass = FireParticle;
    // Magic happens here, bleding the colors of each particle
    // generates the bright light effect
    fireEmitter.blendMode = PIXI.blendModes.ADD;



    fireEmitter.makeParticles();
    fireEmitter.minParticleSpeed.set(-15, -80);
    fireEmitter.maxParticleSpeed.set(15, -100);
    fireEmitter.setRotation(0, 0);
    // Make the flames taller than they are wide to simulate the
    // effect of flame tongues
    fireEmitter.setScale(3, 1, 5, 3, 12000, Phaser.Easing.Quintic.Out);
    fireEmitter.gravity = -1;
    fireEmitter.start(false, 2000, 50);


    // // Generate 100 particles 




  }

}

export default Fire;