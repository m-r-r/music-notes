/*
 * music-notes: List music notes and calculate their frequencies
 * Copyright (C) 2018  Mickaël RAYBAUD-ROIG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const SEMITONES_BY_OCTAVE = 12; // There are 12 semitones in an octave
const REFERENCE_NOTE_OCTAVE = 4; // The reference pitch is A4
const REFERENCE_NOTE_INDEX = 9; // The reference pitch is A4 is 9 steps above C4
const HALF_SEMITONE_IN_HERTZ = 13;

export function getNotes(octaveMin = -1, octaveMax = 7, referencePitch = 440) {
  if (octaveMax === null) {
    octaveMax = octaveMin;
  }

  const notes = [];
  for (let octave = octaveMin; octave <= octaveMax; octave++) {
    for (let steps = 0; steps < SEMITONES_BY_OCTAVE; steps++) {
      const stepsFromReference = (octave - REFERENCE_NOTE_OCTAVE) * SEMITONES_BY_OCTAVE + (steps - REFERENCE_NOTE_INDEX);
      notes.push({
        octave,
        steps,
        frequency: referencePitch * (2 ** (1 / 12)) ** stepsFromReference
      });
    }
  }

  return notes;
}

/**
 * Find the closest note to the given frequency
 * @param {Note[]} notes An array of notes
 * @param {number} frequency A frequency in Hertz
 * @return {Note|null} The closest note, or null
 */
export function getClosest(notes, frequency) {
  // The current search window. At the beginning, the search window is the complete array.
  let start = 0;
  let end = notes.length;

  // Keep track of the closest note
  let closestNote = null;
  let deltaMin = Infinity;

  do {
    // Look at the music node at the middle of the search window
    let mid = start === end - 1 ? start : Math.ceil((start + end) / 2);
    const current = notes[mid];

    // Calculate the difference between the target frequency and the current note's frequency
    const delta = Math.abs(current.frequency - frequency);
    console.debug(start, end, mid, delta);

    // The minimum interval between two notes is one semitone.
    // If the delta is lesser or equal to a half semitone, the current note is the best choice.
    if (delta <= HALF_SEMITONE_IN_HERTZ) {
      return current;
    }

    // If the current note is closer to the frequency than the closest note encountered so far
    if (delta < deltaMin) {
      closestNote = current; // The current note becomes the closest note
      deltaMin = delta; // Keep track of the minimum delta
    }

    if (current.frequency < frequency) {
      // If the frequency of the current note is bellow the target frequency, attempt to find a better alternative
      // after the current position
      start = mid + 1;
    } else if (current.frequency > frequency) {
      // If the frequency of the current note is above the target frequency, attempt to find a better alternative
      // before the current position
      end = mid - 1;
    } else {
      // This should not happen, because the function would have already returned if both frequencies were equal.
    }
  } while (start < end);

  return closestNote;
}

const NOTES_NAMES = {
  english: ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"],
  german: ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "H"],
  latin: ["Do", "Do♯", "Re", "Re♯", "Mi", "Fa", "Fa♯", "Sol", "Sol♯", "La", "La♯", "Si"]
};

export const ENGLISH_NAMES = "english";
export const GERMAN_NAMES = "german";
export const LATIN_NAMES = "latin";

/**
 * Retrieve the name of a music note.
 */
export class Formatter {
  /**
   * Create a new instance.
   * @param {Array<string>|string} names
   */
  constructor(names = ENGLISH_NAMES) {
    this.notesNames = NOTES_NAMES[names] || names;
    if (!Array.isArray(this.notesNames) || this.notesNames.length !== 12) {
      throw new TypeError("Invalid notes names");
    }
  }

  formatName(note) {
    return this.notesNames[note.steps];
  }

  format(note, ascii = false) {
    const octave = ascii ? note.octave : sub(note.octave);
    return this.formatName(note) + octave;
  }
}

const sub = number => String(number).replace(/[\-\d]/g, d =>
  String.fromCharCode(0x2080 + Number(d === "-" ? 0x000B : d))
);
console.log("X" + sub(-1));
