function startParticleBackGround() {
    const canvasParticle = document.getElementById("canvasParticle");
    const ctxParticle = canvasParticle.getContext("2d");
    canvasParticle.width = window.innerWidth;
    canvasParticle.height = window.innerHeight;
    const cparticles = [];
    const num_particles = 200;
    
    function GetRandomColor() {
        var r = 0, g = 0, b = 0;
        while (r < 100 && g < 100 && b < 100)
        {
            r = Math.floor(Math.random() * 256);
            g = Math.floor(Math.random() * 256);
            b = Math.floor(Math.random() * 256);
        }
     
        return "rgb(" + r + "," + g + ","  + b + ")";
    }
    
    function GetColor() {
        return "rgb(" + 158 + "," + 158 + ","  + 158 + ")";
    }
    
    const Particle = function () {
            this.x = canvasParticle.width * Math.random();
            this.y = canvasParticle.height * Math.random();
            this.vx = 0.3 * Math.random();
            this.vy = 0.3 * Math.random();
            this.Color = GetColor();
    }
    
    Particle.prototype.Draw = function (ctx) {
        ctx.fillStyle = this.Color;
        ctx.fillRect(this.x, this.y, 2, 2);
    }
    
    Particle.prototype.Update = function () {
        this.x += this.vx;
        this.y += this.vy;
     
        if (this.x<0 || this.x > canvasParticle.width)
            this.vx = -this.vx;
     
        if (this.y < 0 || this.y > canvasParticle.height)
            this.vy = -this.vy;
    }
    
    function loop() {
        ctxParticle.clearRect(0, 0, canvasParticle.width, canvasParticle.height);
     
        for (let myi = 0; myi < num_particles; myi++) {
            cparticles[myi].Update();
            cparticles[myi].Draw(ctxParticle);
        }
        requestAnimationFrame(loop);
    }
    
    for (let ci = 0; ci < num_particles; ci++){
        cparticles.push(new Particle());
    }
    
    loop();
    }