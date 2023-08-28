let shakeUpInterval

start()

function restart() {
    Particle.all = []
    canvas.clear()
    spawn()
    Particle.randomizePhysics()
}

function spawn() {
    for (let i = 0; i < Q; i++) {
        new Particle()
    }
}

function start() {

    Particle.setUpTypes()
    Particle.randomizePhysics()

    spawn()

    function frame(t) {
        d = t-pt
        fps = 1000/d
        pt = t
        update()
        if (FRAME_STEP > 0) {
            setTimeout(() => {
                requestAnimationFrame(frame)
            }, FRAME_STEP);
        } else requestAnimationFrame(frame)
    }

    function update() {
        canvas.clear()
        Particle.all.forEach(p => {p.calcVel()})
        Particle.all.forEach(p => {
            p.move()
            p.render()
        })
    }

    shakeUpInterval = setInterval(() => {
        Particle.shakeUp()
    }, 7500);

    requestAnimationFrame(frame)
}