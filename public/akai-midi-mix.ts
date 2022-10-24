import { InputDevice } from "./types";

export type Fader = {
    controlId: number;
    min: number;
    max: number;
    marker: string;
}

type FaderData = {
    marker: string;
    id: number
}

const faderData: FaderData[] = [{
    marker: '1',
    id: 19,
},
{
    marker: '2',
    id: 23,
},
{
    marker: '3',
    id: 27,
},
{
    marker: '4',
    id: 31,
},
{
    marker: '5',
    id: 49,
}
    ,
{
    marker: '6',
    id: 53,
},
{
    marker: '7',
    id: 57,
},

{
    marker: '8',
    id: 61,
}
    ,
{
    marker: 'master',
    id: 62,
}]

type AkaiMidiMix = {
    faders: Fader[]
}

const faders: Fader[] = faderData.map(preset => ({
    controlId: preset.id,
    min: 0,
    max: 127,
    marker: preset.marker
}))

// todo sortout typings
// export const AkaiMidiMix: AkaiMidiMix & InputDevice = {
//     faders
// }