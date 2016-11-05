var audioCtx = new window.AudioContext

class Osc {
  constructor () {
    this.osc = audioCtx.createOscillator()
    this.osc.type = 'sine'
    this.osc.frequency.value = 260
    this.osc.connect(audioCtx.destination)
  }

  play () {
    this.osc.start()
  }

  pause () {
    this.osc.stop()
  }

  changeNotePitch (pitch) {
    let pitchedNote = getNoteByFrequency(this.osc.frequency.value)
    const { title } = pitchedNote

    switch (pitch) {
      case  1: pitchedNote = getNextNote(title); break
      case -1: pitchedNote = getPreviousNote(title); break
      default: pitchedNote = getNote(title, pitch); break
    }
    console.log(pitchedNote)
    this.osc.frequency.value = pitchedNote.frequency
  }

}

let osc = new Osc()
osc.play()

const oscillators = []

const tones = {
  'C4': 261.63,
  'C#4': 277.18,
  'D4': 293.66,
  'D#4': 311.13,
  'E4': 329.63,
  'F4': 349.23,
  'F#4': 369.99,
  'G4': 392.00,
  'G#4': 415.30,
  'A4': 440.00,
  'A#4': 466.16,
  'B4': 493.88
}

// const orderedTones = [
//   'C', 'C#', 'D',
//   'D#', 'E', 'F',
//   'F#', 'G',' G#',
//   'A', 'A#', 'B'
// ]

// dva tona, poluton, tri tona, poluton
const gammas = {
  major: [2, 2, 1, 2, 2, 2, 1],
  minor: [2, 1, 2, 2, 1, 2, 2]
}

let notes = {

}

let currentOctave = 4
for (let i = currentOctave; i <= 8; i++) {
  for (const tone in tones) {
    // the title of the note
    // example: B4, C#6
    const title = tone + i 

    const toneWithoutOctave = tone.substr(0, tone.length - 1)
    const currentToneWithOctave = toneWithoutOctave + i

    // Copy the initial octave
    let previousToneWithOctave = toneWithoutOctave + (i - 1)
    if (i === currentOctave) {
      previousToneWithOctave = tone
    }

    console.log(previousToneWithOctave)
    

    // the frequency of the note
    let frequency = tones[previousToneWithOctave] * 2
    if (i === currentOctave) {
      frequency = tones[previousToneWithOctave]
    }


    tones[currentToneWithOctave] = frequency
    notes[currentToneWithOctave] = {
      title: currentToneWithOctave,
      frequency
    }
  }
} 

console.log(notes)
console.log(tones)


function convertNoteToHz (note) {
  note = note.toUpperCase()
  return tones[note]
}

function getNoteByFrequency (hz) {
  let distance = 100
  let _note = {}
  for (let note in notes) {
    // const title = note
    // const frequency = notes[note]
    const { title, frequency } = notes[note]

    _distance = Math.abs(frequency - hz)
    if (_distance < distance) {
      _note = notes[note]
      distance = _distance
    }
  }
  return _note
}

function getNote (title, pitch) {
  let i = pitch
  for (const _note in notes) {
    if (_note === title) break
    i++
  }

  let e = 0
  for (const _note in notes) {
    if (e === i) {
      return (notes[_note])
    }
    e++
  }

  return null
}

function getNextNote (title) {
  if (!title) throw new Error('No title provided')
  return getNote(title, +1)
}

function getPreviousNote (title) {
  if (!title) throw new Error('No title provided')
  return getNote(title, -1)
}

window.addEventListener('keydown', e => keydownHandler(e.keyCode))
function keydownHandler (keyCode) {
  switch (keyCode) {
    case 38: return osc.changeNotePitch(+2)
    case 40: return osc.changeNotePitch(-1)
  }
  // osc.frequency.value = notes[2].frequency
}

