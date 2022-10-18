class Particle {
    constructor(){
        this.x = random(0,width);
        this.y = random(0,height);
        this.r = random(1,8);
        this.xSpeed = random(-2,2);
        this.ySpeed = random(-1,1.5);
    }

    drawParticle(volume) {
        noStroke();
        fill('rgba(200,169,169,0.5)');
        circle(this.x,this.y,this.r*volume);
    }

    moveParticle(volume) {
        if(this.x < 0 || this.x > width)
            this.xSpeed*=-1;
        if(this.y < 0 || this.y > height)
            this.ySpeed*=-1;
        this.x+=this.xSpeed*volume;
        this.y+=this.ySpeed*volume;
    }

    joinParticles(particles) {
        particles.forEach(element =>{
            let dis = dist(this.x,this.y,element.x,element.y);
            if(dis<85) {
                stroke('rgba(255,255,255,0.04)');
                strokeWeight(dis/85*2)
                line(this.x,this.y,element.x,element.y);
            }
        });
    }
}

let particles = [];

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    for(let i = 0;i<width/10;i++){
        particles.push(new Particle());
    }
    canvas.style('z-index', '-1');
}

function draw() {

    background('#364d9a');
    const volume = max(get_volume(), 0.2)
    for(let i = 0;i<particles.length;i++) {
        particles[i].drawParticle(volume*1.4);
        particles[i].moveParticle(volume**5);
        particles[i].joinParticles(particles.slice(i));
    }
}