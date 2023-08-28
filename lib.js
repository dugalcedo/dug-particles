Math.randInt = function(n) {
    return Math.round(Math.random()*n)
}

Math.randRange = function(a, b, isInt) {
    let result = (Math.random()*(b-a)) + a
    if (isInt) result = Math.round(result)
    return result
}

Array.prototype.random = function() {
    return this[Math.randInt(this.length-1)]
}

HTMLCanvasElement.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height)
}

HTMLCanvasElement.prototype.rect = function(x, y, w, h, options={}) {
    this.ctx.beginPath()
    this.ctx.rect(x, y, w, h)
    if (options.stroke) {
        this.ctx.strokeStyle = options.stroke
        this.ctx.stroke()
    }
    if (options.fill) {
        this.ctx.fillStyle = options.fill
        this.ctx.fill()
    }
}

function createCanvas() {
    const canvas = document.querySelector('canvas#particles')
    function sizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth
        canvas.height = canvas.parentElement.offsetHeight
    }
    sizeCanvas()
    window.addEventListener('resize', sizeCanvas)
    canvas.ctx = canvas.getContext('2d')
    return canvas
}

document.querySelectorMultiple = function(ss) {
    let results = []
    ss.forEach(s => {
        results.push(document.querySelector(s))
    })
    return results
}

document.queryDir = function(m) {
    return Object.entries(m).reduce((acc, [name, selector]) => {
        acc[name] = document.querySelector(selector)
        return acc
    }, {})
}