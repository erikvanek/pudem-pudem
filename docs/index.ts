// import { InputDevice } from './types';
// import { isAkaiMidiMix, startLoggingAkaiMidiMix } from './akai-midi-mix';
// import { startLoggingElektron } from './elektron';
// import {
//     isArturiaKeyStep,
//     startLoggingArturiaKeyStep,
// } from './arturia-key-step';
import 'p5/lib/addons/p5.sound';
// import p5, { SoundFile } from 'p5';
import {runP5} from './p5';

p5 = 'yo'
console.log(globalThis.p5)

// const runWebMidiApi = () =>
//     navigator.requestMIDIAccess().then((midiAccess) => {
//         console.log('web midi api running');
//         for (const entry of midiAccess.inputs) {
//             const input = entry[1];
//             const device: InputDevice = { input, controls: [] };
//             if (isAkaiMidiMix(input)) {
//                 startLoggingAkaiMidiMix(device);
//             } else if (isArturiaKeyStep(input)) {
//                 startLoggingArturiaKeyStep(device);
//             } else {
//                 startLoggingElektron(device);
//             }
//         }
//     }, console.error);

// runWebMidiApi();

runP5();
