var audioCtx = new window.AudioContext

let osc = audioCtx.createOscillator()

osc.type = 'sin'
osc.frequency.value = 400
osc.connect(audioCtx.destination)

let gamma = {
	'do': 's'
}

setInterval(() => {
	osc.frequency.value = Math.random() * 700
}, 500)

osc.start()
