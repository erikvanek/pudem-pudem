export type InputDevice = {
    input: WebMidi.MIDIInput;
    controls: [];
};

export type Interaction = 'PushDown' | 'PushUp' | 'Tweak';

export type UserEvent = {
    interaction: Interaction | null;
    controlId: number;
    value: number;
    timestamp?: number;
};
