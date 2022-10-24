import { InputDevice } from './types';
import { isAkaiMidiMix, startLoggingAkaiMidiMix } from './akai-midi-mix';
import { startLoggingElektron } from './elektron';
import {
    isArturiaKeyStep,
    startLoggingArturiaKeyStep,
} from './arturia-key-step';

const runWebMidiApi = () =>
    navigator.requestMIDIAccess().then((midiAccess) => {
        console.log('web midi api running');
        for (const entry of midiAccess.inputs) {
            const input = entry[1];
            const device: InputDevice = { input, controls: [] };
            if (isAkaiMidiMix(input)) {
                startLoggingAkaiMidiMix(device);
            } else if (isArturiaKeyStep(input)) {
                startLoggingArturiaKeyStep(device);
            } else {
                startLoggingElektron(device);
            }
        }
    }, console.error);

runWebMidiApi();
