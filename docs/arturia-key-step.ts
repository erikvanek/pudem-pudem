import { InputDevice, Interaction, UserEvent } from './types';

// 32 keys
const keys = [
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
];

// key is key :) and value is last timestamp it was pressed
let keysMap = new Map<number, number>();

export const isArturiaKeyStep = (input: WebMidi.MIDIInput) =>
    input.name === 'Arturia KeyStep 32 MIDI 1';

const getKeyDomNode = (key: number) => document.getElementById(key.toString());

export const onArturiaMessage: (e: WebMidi.MIDIMessageEvent) => void = (e) => {
    const [actionByte, controlId, value] = e.data;
    const timestamp = new Date().getTime();
    let interaction: Interaction | null = null;
    const domNode = getKeyDomNode(controlId)!;
    if (actionByte === 151) {
        domNode.style.transition = 'none';
        interaction = 'PushDown';
        keysMap.set(controlId, timestamp);
    } else if (actionByte === 135) {
        interaction = 'PushUp';
        const lastTimestamp = keysMap.get(controlId);
        const difference = timestamp - lastTimestamp!;
        domNode.style.transition = `background ${difference}ms`;
        console.log(difference);
        keysMap.delete(controlId);
    }

    const event: UserEvent = {
        interaction,
        controlId,
        value,
        timestamp,
    };
    redrawBox(event);
};

const redrawBox = (event: UserEvent) => {
    const div = getKeyDomNode(event.controlId);
    if (div) {
        if (event.interaction === 'PushDown') {
            div.classList.add('active');
        } else if (event.interaction === 'PushUp') {
            div.classList.remove('active');
        }
    }
};

const drawBoxes = () => {
    for (const key of keys) {
        const div = document.createElement('div');
        div.setAttribute('id', key.toString());
        div.setAttribute('class', 'key');
        const textNode = document.createTextNode(key.toString());
        div.appendChild(textNode);
        document.getElementById('main')?.appendChild(div);
    }
};

export const startLoggingArturiaKeyStep = (device: InputDevice) => {
    device.input.onmidimessage = onArturiaMessage;
    drawBoxes();
};
