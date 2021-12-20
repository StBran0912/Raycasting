import * as lb2d from "./lib2d.js";

class Wall {
    constructor(x1, y1, x2, y2) {
        this.a = lb2d.createVector(x1, y1);
        this.b = lb2d.createVector(x2, y2);
    }

    show() {
        lb2d.line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
}

class Particle {
    constructor(x, y) {
        this.pos = lb2d.createVector(x, y);
        this.rays = [];
        for (let i = 0; i < 360; i+= 1.5) {
            this.rays.push(lb2d.fromAngle(i * Math.PI*2/360, 1))      
        }
    }

    intersect(ray, wall) {
        let p = []; // p[0] = Point of intersection, p[1] = s
        const w = lb2d.subVector(wall.b, wall.a);
        const den1 = ray.cross(w);
        const den2 = w.cross(ray);
        if (den1 != 0) {
            const s = lb2d.subVector(wall.a, this.pos).cross(w) / den1;
            const u = lb2d.subVector(this.pos, wall.a).cross(ray) / den2;
            if (s > 0 && u > 0 && u < 1) {
                p.push(lb2d.addVector(this.pos, lb2d.multVector(ray, s)));
                p.push(s);
            }
        }
        return p;    
    }

    show() {
        lb2d.strokeGrd(220, this.pos.x, this.pos.y, 200);
        lb2d.circle(this.pos.x, this.pos.y, 2);
    }

    cast(walls) {
        for (const ray of this.rays) {
            let minDist = Infinity;
            let ClosestPt = null;
            for (const wall of walls) {
                const [pt, dist] = this.intersect(ray, wall);
                if (pt) {
                    if (dist < minDist) {
                        minDist = dist;
                        ClosestPt = pt;
                    }
                }
            }
            if (ClosestPt) {
                lb2d.line(this.pos.x, this.pos.y, ClosestPt.x, ClosestPt.y);                
            }
        }
    }

    update(x, y) {
        this.pos.set(x, y);
    }
}

function draw() {
    lb2d.background(0, 0, 0);
    //particle.update(lb2d.mouseX, lb2d.mouseY);
    xoff += 0.003; yoff += 0.006;;
    particle.update(lb2d.map(perlin.noise(xoff), 0, 1, 0, lb2d.getWidth()), lb2d.map(perlin.noise(yoff), 0, 1, 0, lb2d.getHeight()));
    lb2d.strokeColor(180);
    for (const wall of walls) {
        wall.show();        
    }
    particle.show();
    particle.cast(walls);    
}

function start() {
    lb2d.init(400, 400);
    
    walls.push(new Wall(0, 0, lb2d.getWidth(), 0));
    walls.push(new Wall(lb2d.getWidth(), 0, lb2d.getWidth(), lb2d.getHeight()));
    walls.push(new Wall(lb2d.getWidth(), lb2d.getHeight(), 0, lb2d.getHeight()));
    walls.push(new Wall(0, lb2d.getHeight(), 0, 0));
    for (let i = 0; i < 5; i++) {
        let x1 = lb2d.random(50, lb2d.getWidth());
        let x2 = lb2d.random(50, lb2d.getWidth());
        let y1 = lb2d.random(50, lb2d.getHeight());
        let y2 = lb2d.random(50, lb2d.getHeight());
        walls.push(new Wall(x1, y1, x2, y2));
      }
    
    lb2d.startAnimation(draw);          
}

const perlin = lb2d.perlinNoise();
let xoff = 0;
let yoff = 0;
const particle = new Particle(0, 0);
const walls = [];
start();

