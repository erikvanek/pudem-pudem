import { InputDevice, Interaction, UserEvent } from "./types";

const listInputsAndOutputs = (midiAccess) => {
    console.log(midiAccess)
    let logging = false;
    for (const entry of midiAccess.inputs) {
        const input = entry[1];
        console.log(`Input port [type:'${input.type}']` +
            ` id:'${input.id}'` +
            ` manufacturer:'${input.manufacturer}'` +
            ` name:'${input.name}'` +
            ` version:'${input.version}'`);
        // startLoggingMIDIInput(midiAccess, input.type)
        if (!logging) {
            logging = true
            // startLoggingNovationInput(midiAccess, input.type)
            console.log(midiAccess)
        }
    }
}

const isAkaiMidiMix = (input: WebMidi.MIDIInput) => input.name === 'MIDI Mix' && input.manufacturer === 'AKAI'


const onElektronMessage: (e: WebMidi.MIDIMessageEvent) => void = (e) => {
    const [userAction, controlId, value] = e.data
    console.log([...e.data])
    let interaction: Interaction | null = null;
    if (userAction === 144) {
        interaction = 'PushDown'
    } else if (userAction === 128) {
        interaction = 'PushUp'
    } else if (userAction === 176) {
        interaction = 'Tweak'
    }

    const event: UserEvent = {
        interaction,
        controlId,
        value
    }

    // console.log(event)

}

const onMidiNovationMessage: (e: WebMidi.MIDIMessageEvent) => void = (e) => {
    const [userAction, controlId, value] = e.data
    // console.log(e.data)
    let interaction: Interaction | null = null;
    if (userAction === 144) {
        interaction = 'PushDown'
    } else if (userAction === 128) {
        interaction = 'PushUp'
    } else if (userAction === 176) {
        interaction = 'Tweak'
    }

    const event: UserEvent = {
        interaction,
        controlId,
        value
    }

    console.log(event)

}

const runWebMidiApi = () => navigator.requestMIDIAccess().then((midiAccess) => {
    console.log('web midi api running')
    for (const entry of midiAccess.inputs) {
        const input = entry[1];
        console.log(entry)
        const device: InputDevice = { input, controls: [] }
        // input.onmidimessage = onMidiNovationMessage
        if (isAkaiMidiMix(input)) {
            startLoggingAkaiMidiMix(device)
        }
        else {
            startLoggingElektron(device)
        }
    }
}, console.error);


const startLoggingAkaiMidiMix = (device: InputDevice) => {
    device.input.onmidimessage = onMidiNovationMessage
}
const startLoggingElektron = (device: InputDevice) => {
    device.input.onmidimessage = onElektronMessage
}



const runAudioApi = async () => {
    const media = await navigator.mediaDevices.getUserMedia({
        audio: true
    })
    const audioCtx = new AudioContext()
    var source = audioCtx.createMediaStreamSource(media);

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    source.connect(analyser);

    const canvas = document.getElementById("oscilloscope")! as HTMLCanvasElement;
    const canvasCtx = canvas.getContext("2d")!;

    function draw() {
        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = "rgb(200, 200, 200)";
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "rgb(0, 0, 0)";

        canvasCtx.beginPath();

        const sliceWidth = (canvas.width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * canvas.height) / 2;

            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
    }

    draw()

}

runWebMidiApi()

// runAudioApi()