import { InputDevice, Interaction, UserEvent } from './types';

export const onElektronMessage: (e: WebMidi.MIDIMessageEvent) => void = (e) => {
    const [userAction, controlId, value] = e.data;
    console.log([...e.data]);
    let interaction: Interaction | null = null;
    if (userAction === 144) {
        interaction = 'PushDown';
    } else if (userAction === 128) {
        interaction = 'PushUp';
    } else if (userAction === 176) {
        interaction = 'Tweak';
    }

    const event: UserEvent = {
        interaction,
        controlId,
        value,
    };

    console.log(event);
};

export const startLoggingElektron = (device: InputDevice) => {
    device.input.onmidimessage = onElektronMessage;
};
