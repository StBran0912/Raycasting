// Bibliothek lib2d
// von Stefan Brandner

// Instanzvariablen des Moduls 
const canv = document.querySelector('canvas');
const output = document.querySelector('#output');
const ctx = canv.getContext('2d');
export let mouseX = 0;
export let mouseY = 0;
let mouseStatus = 0;
let loop = true;

export function init(w, h) {
    canv.width = w;
    canv.height = h;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'grey'
    ctx.lineWidth = 1;
    ctx.save();
    canv.addEventListener("mousemove", updMousePos);
    canv.addEventListener("mousedown", setMouseDown);
    canv.addEventListener("mouseup", setMouseUp);
    canv.addEventListener("touchmove", updTouchPos);
    canv.addEventListener("touchstart", setTouchDown);
    canv.addEventListener("touchend", setTouchUp);
}

export function startAnimation(fnDraw) {
    let draw = fnDraw;
    loop = true;
    let animate = () => {
        draw();
        if (loop) {
            window.requestAnimationFrame(animate);
        }
    };
    window.requestAnimationFrame(animate);
}

export function getWidth() {
    return canv.width;
}

export function getHeight() {
    return canv.height;
}


export function noLoop() {
    loop = false;
}

function updMousePos(e) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
}

function setMouseDown() {
    mouseStatus = 1;
}

function setMouseUp() {
    mouseStatus = 2;
}

function updTouchPos(e) {
    e.preventDefault();
    mouseX = e.targetTouches[0].pageX - e.target.getBoundingClientRect().left;
    mouseY = e.targetTouches[0].pageY - e.target.getBoundingClientRect().top;
}

function setTouchDown(e) {
    mouseStatus = 1;

    e.preventDefault();
    mouseX = e.targetTouches[0].pageX - e.target.getBoundingClientRect().left;
    mouseY = e.targetTouches[0].pageY - e.target.getBoundingClientRect().top;
}

export function setTouchUp(e) {
    mouseStatus = 2;
}

export function isMouseDown() {
    if (mouseStatus == 1) {
        return true;
    }
    else {
        return false;
    }
}

export function isMouseUp() {
    if (mouseStatus == 2) {
        mouseStatus = 0;
        return true;
    }
    else {
        return false;
    }
    ;
}

export function createP(item) {
    const newItem = document.createElement('p');
    newItem.textContent = item;
    output.appendChild(newItem);
}

export function push() {
    ctx.save();
}

export function pop() {
    ctx.restore();
}

export function translate(x, y) {
    ctx.translate(x, y);
}

export function rotate(n) {
    ctx.rotate(n);
}

export function fillColor(...color) {
    let r; let g; let b;
    if (color.length == 1) {
        r = color[0];
        g = color[0];
        b = color[0];
    } else {
        r = color[0] || 0;
        g = color[1] || 0;
        b = color[2] || 0;
    }

    ctx.fillStyle = `RGB(${r},${g},${b})`
}

export function strokeGrd(color, x, y, max) {
    const grd = ctx.createRadialGradient(x, y, 5, x, y, max);
    grd.addColorStop(0, `RGB(${color},${color},${color})`);
    grd.addColorStop(1, `RGB(${0},${0},${0})`);
    ctx.strokeStyle = grd;
}

export function strokeColor(...color) {
    let r; let g; let b;
    if (color.length == 1) {
        r = color[0];
        g = color[0];
        b = color[0];
    } else {
        r = color[0] || 0;
        g = color[1] || 0;
        b = color[2] || 0;
    }

    ctx.strokeStyle = `RGB(${r},${g},${b})`
}

export function strokeWidth(w) {
    ctx.lineWidth = w;
}

export function background(...color) {
    let r; let g; let b;
    if (color.length == 1) {
        r = color[0];
        g = color[0];
        b = color[0];
    } else {
        r = color[0] || 0;
        g = color[1] || 0;
        b = color[2] || 0;
    }
    
    push();
    ctx.fillStyle = `RGB(${r},${g},${b})`
    ctx.fillRect(0, 0, canv.width, canv.height);
    pop();
}

export function rect(x, y, w, h, style = 0) {
    if (style == 0) {
        ctx.strokeRect(x, y, w, h);
    }
    if (style == 1) {
        ctx.fillRect(x, y, w, h);
    }
    if (style == 2) {
        ctx.strokeRect(x, y, w, h);
        ctx.fillRect(x, y, w, h);
    }
}

export function line(x1, y1, x2, y2) {
    const path = new Path2D();
    path.moveTo(x1, y1);
    path.lineTo(x2, y2);
    path.closePath();
    ctx.stroke(path);
}

export function triangle(x1, y1, x2, y2, x3, y3, style = 0) {
    const path = new Path2D();
    path.moveTo(x1, y1);
    path.lineTo(x2, y2);
    path.lineTo(x3, y3);
    path.closePath();
    if (style == 0) {
        ctx.stroke(path);
    }
    if (style == 1) {
        ctx.fill(path);
    }
    if (style == 2) {
        ctx.stroke(path);
        ctx.fill(path);
    }
}

export function rectangle(x1, y1, x2, y2, x3, y3, x4, y4, style = 0) {
    const path = new Path2D();
    path.moveTo(x1, y1);
    path.lineTo(x2, y2);
    path.lineTo(x3, y3);
    path.lineTo(x4, y4);
    path.closePath();
    if (style == 0) {
        ctx.stroke(path);
    }
    if (style == 1) {
        ctx.fill(path);
    }
    if (style == 2) {
        ctx.stroke(path);
        ctx.fill(path);
    }
}

export function circle(x, y, radius, style = 0) {
    const path = new Path2D();
    path.arc(x, y, radius, 0, 2 * Math.PI);
    path.closePath();
    if (style == 0) {
        ctx.stroke(path);
    }
    if (style == 1) {
        ctx.fill(path);
    }
    if (style == 2) {
        ctx.stroke(path);
        ctx.fill(path);
    }
}

export function perlinNoise() {
    const PERLIN_YWRAPB = 4
    const PERLIN_YWRAP = 1 << PERLIN_YWRAPB
    const PERLIN_ZWRAPB = 8
    const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB
    const PERLIN_SIZE = 4095
  
    let perlin_octaves = 4 // default to medium smooth
    let perlin_amp_falloff = 0.5 // 50% reduction/octave
  
    const scaled_cosine = (i) => 0.5 * (1.0 - Math.cos(i * Math.PI))
  
    let perlin // will be initialized lazily by noise() or noiseSeed()
  
    /**
     * @method noise
     * @param  {Number} x   x-coordinate in noise space
     * @param  {Number} [y] y-coordinate in noise space
     * @param  {Number} [z] z-coordinate in noise space
     * @return {Number}     Perlin noise value (between 0 and 1) at specified coordinates
     */ 
    const noise = function(x, y = 0, z = 0) {
      if (perlin == null) {
        perlin = new Array(PERLIN_SIZE + 1)
        for (let i = 0; i < PERLIN_SIZE + 1; i++) {
          perlin[i] = Math.random()
        }
      }
    
      if (x < 0) {
        x = -x
      }
      if (y < 0) {
        y = -y
      }
      if (z < 0) {
        z = -z
      }
    
      let xi = Math.floor(x),
        yi = Math.floor(y),
        zi = Math.floor(z)
      let xf = x - xi
      let yf = y - yi
      let zf = z - zi
      let rxf, ryf
    
      let r = 0
      let ampl = 0.5
    
      let n1, n2, n3
    
      for (let o = 0; o < perlin_octaves; o++) {
        let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB)
    
        rxf = scaled_cosine(xf)
        ryf = scaled_cosine(yf)
    
        n1 = perlin[of & PERLIN_SIZE]
        n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1)
        n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]
        n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2)
        n1 += ryf * (n2 - n1)
    
        of += PERLIN_ZWRAP
        n2 = perlin[of & PERLIN_SIZE]
        n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2)
        n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]
        n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3)
        n2 += ryf * (n3 - n2)
    
        n1 += scaled_cosine(zf) * (n2 - n1)
    
        r += n1 * ampl
        ampl *= perlin_amp_falloff
        xi <<= 1
        xf *= 2
        yi <<= 1
        yf *= 2
        zi <<= 1
        zf *= 2
    
        if (xf >= 1.0) {
          xi++
          xf--
        }
        if (yf >= 1.0) {
          yi++
          yf--
        }
        if (zf >= 1.0) {
          zi++
          zf--
        }
      }
      return r
    }
  
    /**
     * @method noiseDetail
     * @param {Number} lod number of octaves to be used by the noise
     * @param {Number} falloff falloff factor for each octave
     */
    const noiseDetail = function(lod, falloff) {
      if (lod > 0) {
        perlin_octaves = lod
      }
      if (falloff > 0) {
        perlin_amp_falloff = falloff
      }
    }
    
    /**
     * @method noiseSeed
     * @param {Number} seed   the seed value  
     */
    const noiseSeed = function(seed) {
      // Linear Congruential Generator
      // Variant of a Lehman Generator
      const lcg = (() => {
        // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes
        // m is basically chosen to be large (as it is the max period)
        // and for its relationships to a and c
        const m = 4294967296
        // a - 1 should be divisible by m's prime factors
        const a = 1664525
        // c and m should be co-prime
        const c = 1013904223
        let seed, z
        return {
          setSeed(val) {
            // pick a random seed if val is undefined or null
            // the >>> 0 casts the seed to an unsigned 32-bit integer
            z = seed = (val == null ? Math.random() * m : val) >>> 0
          },
          getSeed() {
            return seed
          },
          rand() {
            // define the recurrence relationship
            z = (a * z + c) % m
            // return a float in [0, 1)
            // if z = m then z / m = 0 therefore (z % m) / m < 1 always
            return z / m
          }
        }
      })()
    
      lcg.setSeed(seed)
      perlin = new Array(PERLIN_SIZE + 1)
      for (let i = 0; i < PERLIN_SIZE + 1; i++) {
        perlin[i] = lcg.rand()
      }
    }
    
    return {
      noise: noise,
      noiseDetail: noiseDetail,
      noiseSeed: noiseSeed
  
    }
}
  
export function random(n1, n2) {
    return Math.floor(Math.random() * (n2 - n1) + n1);
}

export function constrain(value, min, max) {
    return (Math.min(max, Math.max(min, value)));
}

export function map(n, start1, stop1, start2, stop2) {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (start2 < stop2) {
      return constrain(newval, start2, stop2);
    } else {
      return constrain(newval, stop2, start2);
    }
}

export function limitNum(number, limit) {
    const vorzeichen = number < 0 ? -1 : 1;
    let numberMag = Math.abs(number);
    if (numberMag > limit) {
        numberMag = limit;
    }
    return numberMag * vorzeichen;
}

export function drawArrow(v_base, v_target, myColor) {
    const v_heading = subVector(v_target, v_base);
    push();
    strokeColor(myColor);
    strokeWidth(3);
    fillColor(myColor);
    translate(v_base.x, v_base.y);
    line(0, 0, v_heading.x, v_heading.y);
    rotate(v_heading.heading());
    let arrowSize = 7;
    translate(v_heading.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }  

class Vector {
    
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    /**
     * @param {number} x
     * @param {number} y
     */
    set(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @returns {Vector}
     */
    copy() {
        return new Vector(this.x, this.y);
    }
    
    /**
     * @param {Vector} v
     */
    add(v) {
        this.x += v.x;
        this.y += v.y;
    }

    /**
     * @param {Vector} v
     */
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
    }
    
    /**
     * @returns {number}
     */
    magSq() {
        return this.x * this.x + this.y * this.y;
    }
    
    /**
     * @returns {number}
     */
    mag() {
        return Math.sqrt(this.magSq());
    }
    
    /**
     * @param {Vector} v 
     * @returns {number}
     */
    dist(v) {
        const vdist = this.copy();
        vdist.sub(v);
        return vdist.mag();
    }
    
    /**
     * @param {number} n 
     */
    mult(n) {
        this.x *= n;
        this.y *= n;
    }
    
    /**
     * @param {number} n 
     */
    div(n) {
        this.x /= n;
        this.y /= n;
    }
    
    normalize() {
        const len = this.mag();
        if (len != 0) {
            this.div(len);
        }
    }
    
    /**
     * @param {number} max 
     */
    limit(max) {
        const mSq = this.magSq();
        if (mSq > max * max) {
            this.normalize();
            this.mult(max);
        }
    }
    
    /**
     * @param {number} magnitude 
     */
    setMag(magnitude) {
        this.normalize();
        this.mult(magnitude);
    }
    
    /**
     * @param {Vector} v 
     * @returns {number}
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

        /**
     * @param {Vector} v 
     * @returns {number}
     */
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    
    /**
     * @returns {number}
     */
    heading() {
        const h = Math.atan2(this.y, this.x);
        return h;
    }
    
    /**
     * @param {Vector} base 
     * @param {number} n 
     */
    rotate(base, n) {
        const direction = this.copy();
        direction.sub(base);
        const newHeading = direction.heading() + n;
        const magnitude = direction.mag();
        this.x = base.x + Math.cos(newHeading) * magnitude;
        this.y = base.y + Math.sin(newHeading) * magnitude;
    }
    
    /**
     * @param {Vector} base 
     * @param {number} n 
     */
    rotateMatrix(base, n) {
        const direction = this.copy();
        direction.sub(base);
        const x = direction.x * Math.cos(n) - direction.y * Math.sin(n);
        const y = direction.x * Math.sin(n) + direction.y * Math.cos(n);
        this.x = x + base.x;
        this.y = y + base.y;
    }
    
    /**
     * @param {Vector} v 
     * @returns {number}
     */
    angleBetween(v) {
        const dotmagmag = this.dot(v) / (this.mag() * v.mag());
        const angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
        return angle;
    }

    /**
     * Creates Perpendicular Vector
     * @returns {Vector} v
     */
    perp() {
        return new Vector(-this.y, this.x);
    }
}

/** creates an vector
 * @param {number} x
 * @param {number} y
 * @returns {Vector}
 */
export function createVector(x, y) {
return new Vector(x, y);
}

/** creates Random Vector
 * @returns {Vector}
*/
export function VectorRandom2D() {
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle);
    const y = Math.sin(angle);
    return new Vector(x, y);
}

/** creates Vector with angle
 * @param {number} angle
 * @param {number} len
 * @returns {Vector}
*/
export function fromAngle(angle, len) {
    const x = len * Math.cos(angle);
    const y = len * Math.sin(angle);
    return new Vector(x, y);
}

/** adds vector v2 to vector v1 
 * @param {Vector} v1
 * @param {Vector} v2
 * @returns {Vector}
*/
export function addVector(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
}

/** substract vector v2 from vector v1 
 * @param {Vector} v1
 * @param {Vector} v2
 * @returns {Vector}
*/
export function subVector (v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
}

/** multiply vector with scalar 
 * @param {Vector} v
 * @param {number} n
 * @returns {Vector}
*/
export function multVector(v, n) {
    const vmult = v.copy();
    vmult.mult(n);
    return vmult;
}

/** divide vector by scalar n 
 * @param {Vector} v
 * @param {number} n
 * @returns {Vector}
*/
export function divVector(v, n) {
    const vdiv = v.copy();
    vdiv.div(n);
    return vdiv;
}

/** dot product of v1 and v2
 * @param {Vector} v1
 * @param {Vector} v2
 * @returns {number}
*/
export function dotVector(v1, v2) {
    return v1.dot(v2);
}

/** cross product of v1 and v2
 * @param {Vector} v1
 * @param {Vector} v2
 * @returns {number}
*/
export function crossVector(v1, v2) {
    return v1.cross(v2);
}

/** Point of intersection between 2 Lines
 * @param {Vector} a0 begin line1
 * @param {Vector} a1 end line1
 * @param {Vector} b0 begin line2
 * @param {Vector} b1 end line2
 * @returns {Vector} p Point of intersection
 */
export function intersect(a0, a1, b0, b1) {
    let p;
    const a = subVector(a1, a0);
    const b = subVector(b1, b0);
    const den1 = a.cross(b);
    const den2 = b.cross(a);
    
    if (den1 != 0) {
        const s = subVector(b0, a0).cross(b) / den1;
        const u = subVector(a0, b0).cross(a) / den2;
        if (s > 0 && s < 1 && u > 0 && u < 1) {
            p = addVector(a0, multVector(a, s));
        }
    }
    
    return p;
}

/** Mindistance between point p and line a
 * @param {Vector} p point
 * @param {Vector} a0 begin line
 * @param {Vector} a1 end line
 * @returns {Number} dist
 */
export function minDist(p, a0, a1) {
    let dist;

    //Vektor line a0 to a1
    const a0a1 = subVector(a1, a0);
    //Vektor imaginary line a0 to p
    const a0p = subVector(p, a0);
    //Magnitude of line a0 to a1
    const magnitude = a0a1.mag();

    //Scalarprojecton from line a0p to line a0a1
    a0a1.normalize();
    const sp = a0a1.dot(a0p);

    //Scalarprojection in magnitude of line a0a1?
    if (sp > 0 && sp <= magnitude) {
        a0a1.mult(sp);
        dist = subVector(a0p, a0a1).mag(); 
    }
    return dist;
}
