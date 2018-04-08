import test from "tape";
import { Formatter, getClosest, getNotes } from "./music-notes";

test("getNotes()", test => {
  let notes = getNotes(3, 5);
  test.deepEqual(notes, [
    {
      octave: 3,
      steps: 0,
      frequency: 130.81278265029928
    },
    {
      octave: 3,
      steps: 1,
      frequency: 138.59131548843604
    },
    {
      octave: 3,
      steps: 2,
      frequency: 146.83238395870373
    },
    {
      octave: 3,
      steps: 3,
      frequency: 155.5634918610404
    },
    {
      octave: 3,
      steps: 4,
      frequency: 164.81377845643493
    },
    {
      octave: 3,
      steps: 5,
      frequency: 174.6141157165019
    },
    {
      octave: 3,
      steps: 6,
      frequency: 184.99721135581717
    },
    {
      octave: 3,
      steps: 7,
      frequency: 195.9977179908746
    },
    {
      octave: 3,
      steps: 8,
      frequency: 207.65234878997256
    },
    {
      octave: 3,
      steps: 9,
      frequency: 220
    },
    {
      octave: 3,
      steps: 10,
      frequency: 233.0818807590449
    },
    {
      octave: 3,
      steps: 11,
      frequency: 246.941650628062
    },
    {
      octave: 4,
      steps: 0,
      frequency: 261.6255653005986
    },
    {
      octave: 4,
      steps: 1,
      frequency: 277.1826309768721
    },
    {
      octave: 4,
      steps: 2,
      frequency: 293.6647679174075
    },
    {
      octave: 4,
      steps: 3,
      frequency: 311.12698372208087
    },
    {
      octave: 4,
      steps: 4,
      frequency: 329.6275569128699
    },
    {
      octave: 4,
      steps: 5,
      frequency: 349.2282314330039
    },
    {
      octave: 4,
      steps: 6,
      frequency: 369.99442271163434
    },
    {
      octave: 4,
      steps: 7,
      frequency: 391.99543598174927
    },
    {
      octave: 4,
      steps: 8,
      frequency: 415.3046975799451
    },
    {
      octave: 4,
      steps: 9,
      frequency: 440
    },
    {
      octave: 4,
      steps: 10,
      frequency: 466.1637615180899
    },
    {
      octave: 4,
      steps: 11,
      frequency: 493.8833012561241
    },
    {
      octave: 5,
      steps: 0,
      frequency: 523.2511306011974
    },
    {
      octave: 5,
      steps: 1,
      frequency: 554.3652619537442
    },
    {
      octave: 5,
      steps: 2,
      frequency: 587.3295358348151
    },
    {
      octave: 5,
      steps: 3,
      frequency: 622.2539674441618
    },
    {
      octave: 5,
      steps: 4,
      frequency: 659.25511382574
    },
    {
      octave: 5,
      steps: 5,
      frequency: 698.4564628660078
    },
    {
      octave: 5,
      steps: 6,
      frequency: 739.9888454232689
    },
    {
      octave: 5,
      steps: 7,
      frequency: 783.9908719634986
    },
    {
      octave: 5,
      steps: 8,
      frequency: 830.6093951598905
    },
    {
      octave: 5,
      steps: 9,
      frequency: 880
    },
    {
      octave: 5,
      steps: 10,
      frequency: 932.3275230361799
    },
    {
      octave: 5,
      steps: 11,
      frequency: 987.7666025122485
    }
  ]);
  test.end();
});

test("getClosest()", test => {
  test.doesNotThrow(() => {
    const notes = getNotes(3, 5);

    test.deepEqual(getClosest(notes, 445), {
      octave: 4,
      steps: 9,
      frequency: 440
    });

    test.deepEqual(getClosest(notes, 100), {
      octave: 3,
      steps: 0,
      frequency: 130.81278265029928
    });

    test.deepEqual(getClosest(notes, 1000), {
      octave: 5,
      steps: 11,
      frequency: 987.7666025122485
    });
  });
  test.end();
});
