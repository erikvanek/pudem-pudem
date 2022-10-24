import { InputDevice, Interaction, UserEvent } from './types';

export const isArturiaKeyStep = (input: WebMidi.MIDIInput) =>
    input.name === 'Arturia KeyStep 32 MIDI 1';

export const onArturiaMessage: (e: WebMidi.MIDIMessageEvent) => void = (e) => {
    const [actionByte, controlId, value] = e.data;
    const timestamp = new Date().getTime();
    let interaction: Interaction | null = null;
    if (actionByte === 151) {
        interaction = 'PushDown';
    } else if (actionByte === 135) {
        interaction = 'PushUp';
    }

    const event: UserEvent = {
        interaction,
        controlId,
        value,
        timestamp,
    };

    console.log(event);
};

export const startLoggingArturiaKeyStep = (device: InputDevice) => {
    device.input.onmidimessage = onArturiaMessage;
};
