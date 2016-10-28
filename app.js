var audioCtx = new window.AudioContext

let osc = audioCtx.createOscillator()

osc.type = 'sine'
osc.frequency.value = 400
osc.connect(audioCtx.destination)

// let osc2 = audioCtx.createOscillator()
// console.log(osc2.type)
// osc2.frequency.value = 493
// osc2.connect(audioCtx.destination)

const oscillators = []

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

const notes = []

let currentOctave = 4
for (let i = currentOctave; i <= 6; i++) {
	for (const tone in tones) {
		const noteTitle = tone + i
		const noteFrequency = tones[tone] * i / currentOctave
		
		notes.push({
			title: noteTitle,
			frequency: noteFrequency
		})
	}
} 


function convertNoteToHz (note) {
	note = note.toUpperCase()
	return tones[note]
}

function getNoteByFrequency (hz) {
	let distance = 100
	let _note = {}
	notes.forEach(note => {
		const { title, frequency } = note
		_distance = Math.abs(frequency - hz)
		if (_distance < distance) {
			_note = note
			distance = _distance
		}
	})

	console.log(_note)
	return _note
}


osc.start()



getNoteByFrequency(445)



window.addEventListener('keydown', e => keydownHandler(e.keyCode))

function keydownHandler (keyCode) {
	switch (keyCode) {
		case 38: return changeNotePitch(osc, +1)
		case 40: return changeNotePitch(osc, -1)
	}
	// osc.frequency.value = notes[2].frequency
}

function changeNotePitch (osc, deltaPitch) {
	console.log('Pitch has been changed')
	osc.frequency.value += deltaPitch
}
