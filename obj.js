class Particle {
    constructor(o={}) {
        this.x = o.x || Math.randRange(0, canvas.width - SIZE)
        this.y = o.y || Math.randRange(0, canvas.height - SIZE)
        this.type = o.type || Particle.types.random()
        this.i = Particle.all.length
        this.v = [0,0]
        Particle.all.push(this)
        // console.log(this.x, this.y)
    }

    get neighbors() {
        let result = []
        Particle.all.forEach((that, i) => {
            if (this.i == i) return
            let n = {}
            n.n = that
            n.dx = that.x - this.x
            n.dy = that.y - this.y
            n.d = Math.sqrt(n.dx**2+n.dy**2)
            result.push(n)
        })
        return result
    }

    calcVel() {
        this.v = [0,0]
        this.neighbors.forEach(n => {
            let that = n.n
            if (n.d > 0) {
                let g = this.type.g[that.type.color]
                let f = g*(1/n.d)*.25
                this.v[0] += f*n.dx
                this.v[1] += f*n.dy
            }
        })
    }

    move() {
        this.x += this.v[0]
        this.y += this.v[1]
        if (this.x < 0) {
            this.x = 1
            this.v[0] *= -1
            this.type = Particle.types.random()
        } else if (this.x > canvas.width-SIZE) {
            this.x = canvas.width-SIZE-1
            this.v[0] *= -1
            this.type = Particle.types.random()
        }
        if (this.y < 0) {
            this.y = 0+1
            this.v[1] *= -1
            this.type = Particle.types.random()
        } else if (this.y > canvas.height-SIZE) {
            this.y = canvas.height-SIZE-1
            this.v[1] *= -1
            this.type = Particle.types.random()
        }
    }

    render() {
        canvas.rect(this.x, this.y, SIZE, SIZE, {
            fill: this.type.color
        })
    }

    static all = []

    static randomizePhysics() {
        Particle.types.forEach((type, ti) => {
            Object.keys(type.g).forEach((k) => {
                Particle.types[ti].g[k] = Math.randRange(-DEFAULT_G, DEFAULT_G*Math.randRange(1,7))
            })
        })
    }

    static shakeUp() {
        Particle.all.forEach(p => {
            p.x = Math.randRange(0, canvas.width-SIZE)
            p.y = Math.randRange(0, canvas.height-SIZE)
            p.type = Particle.types.random()
        })
        Particle.randomizePhysics()
    }

    static setUpTypes() {
        Particle.types = []
        Particle.colors.forEach(c1 => {
            let type = {
                color: c1,
                g: {}
            }
            Particle.colors.forEach(c2 => {
                type.g[c2] = DEFAULT_G
            })
            Particle.types.push(type)
        })
    }

    static colors = [
        'cyan',
        'magenta',
        'yellow',
        'white',
        'green',
        'red',
    ]
}