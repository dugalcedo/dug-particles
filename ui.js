const ui = document.queryDir({
    noParticles: '#noParticles span',
    zoom: '#zoom span',
    zoomBtn1: '#zoom button:first-child',
    zoomBtn2: '#zoom button:last-child',
    noParticlesBtn1: '#noParticles button:first-child',
    noParticlesBtn2: '#noParticles button:last-child',
})

renderUI()
applySettings()

function renderUI() {
    ui.noParticles.innerText = Q
    ui.zoom.innerText = ZOOM + 'x'
}

function applySettings() {
    canvas.style.transform = `scale(${ZOOM})`
}

Object.entries({
    zoomBtn1: () => {
        if (ZOOM > 1) ZOOM --
    },
    zoomBtn2: () => {
        if (ZOOM < 5) ZOOM ++
    },
    noParticlesBtn1: () => {
        if (Q > 125) Q -= 125
    },
    noParticlesBtn2: () => {
        if (Q < 750) Q += 125 
    }
}).forEach(([k,v]) => ui[k].addEventListener('click', ()=>{
    v()
    renderUI()
    applySettings()
    restart()
}))