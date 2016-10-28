var audioCtx = new window.AudioContext

let osc = audioCtx.createOscillator()

osc.type = 'sine'
osc.frequency.value = 400
osc.connect(audioCtx.destination)

// let osc2 = audioCtx.createOscillator()
// console.log(osc2.type)
// osc2.frequency.value = 493
// osc2.connect(audioCtx.destination)


const tones = {
	'C': 261.63,
	'C#': 277.18,
	'D': 293.66,
	'D#': 311.13,
	'E': 329.63,
	'F': 349.23,
	'F#': 369.99,
	'G': 392.00,
	'G#': 415.30,
	'A': 440.00,
	'A#': 466.16,
	'B': 493.88
}

const gamma = []

let currentOctave = 4
for (let i = currentOctave; i <= 6; i++) {
	for (const tone in tones) {
		const noteTitle = tone + i
		const noteFrequency = tones[tone] * i / currentOctave
		console.log(noteTitle, noteFrequency)
	}
} 
	


function convertNoteToHz (note) {
	note = note.toUpperCase()
	return tones[note]
}

let i = 0;
setInterval(() => {
	osc.frequency.value = convertNoteToHz('C')
	i++
}, 500)

osc.start()
