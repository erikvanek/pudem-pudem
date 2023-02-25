const rectangle = 'rectangle';
const triangle = 'triangle';
const circle = 'circle';
const arc = 'arc';
const quad = 'quad';
const ellipse = 'ellipse';

const rotateX = 'rotateX';
const rotateY = 'rotateY';
const rotateZ = 'rotateZ';

const transparency = 'transparency';
const r = 'r';
const g = 'g';
const b = 'b';

const rotationFactor = 'rotationFactor';
const sizeFactor = 'sizeFactor';

const clearSketch = 'clearSketch';
const invertStroke = 'invertStroke';

let device,
    objects = [];

const rotation = {
    rotateX: undefined,
    rotateY: undefined,
    rotateZ: undefined,
};

let transparencyFader = 0;
let rotationFactorFader = 1;
let sizeFactorFader = 1;
let sketchClearPressed = false;
let invertStrokePressed = false;

const rgb = {
    r: 0,
    g: 0,
    b: 0,
};

const initController = (p) => {
    if (!device) {
        p.clear()
        navigator.requestMIDIAccess().then(async (midiAccess) => {
            for (const entry of midiAccess.inputs) {
                const { connection } = entry[1];
                if (connection === 'closed') {
                    await entry[1].open();
                }
            }
            // should be open now
            for (const entry of midiAccess.inputs) {
                entry[1].onmidimessage = onMidiMessage;
            }
            device = midiAccess;
        }, console.error);
    }
};

export const drawNovationMusic = (p, fft, mic) => {
    initController(p);
    draw3DObjects(p, fft, mic);
};

const eighty = 80;
const oneSixty = 160;
const threeTwenty = 320;
const fourFourty = 440;
const sixFourty = 640;
const oneK = 1280;
const twoK = 2560;
// const frequencies = [20, 40, 80, 160, 320, 640, 1280, 2560, 5120, 12400];

const frequencies = new Map([
    [eighty, null],
    [oneSixty, null],
    [threeTwenty, null],
    [fourFourty, null],
    [sixFourty, null],
    [oneK, null],
    [twoK, null],
]);

const maxFaderValue = 128;
const draw3DObjects = (p, fft, mic) => {
    if (sketchClearPressed) {
        p.clear();
        sketchClearPressed = false;
    }
    const bars = fft.analyze();

    let data = '';
    for (const frequency of frequencies.keys()) {
        const f = fft.getEnergy(frequency);
        // data += `${frequency}: ${f}; `;
        frequencies.set(frequency, f);
    }

    // const bpm = mic.getBPM()
    // console.log(bars)

    const threeTwentyEnergy = frequencies.get(fourFourty);
    const oneSixtyEnergy = frequencies.get(eighty);
    const eightyEnergy = frequencies.get(oneK);

    // console.log(threeTwentyEnergy, oneSixtyEnergy, eightyEnergy)
    const duration = (p.millis() / 1000)
    // console.log(duration)
    // const rotationn = (duration * (255 - (255 % eightyEnergy)) % 255) / 255;
    // console.log(rotationn)
    // p.rotateZ(rotation)

    // const { rotateX, rotateY, rotateZ } = rotation;
    // if (rotateX) {
    // p.rotateX((maxFaderValue * 2) % threeTwentyEnergy * p.millis() / 100000);
    // }
    // if (rotateY) {
    // p.rotateY((maxFaderValue * 2) % oneSixtyEnergy * p.millis() / 100000);
    // }
    // if (rotateZ) {
    // p.rotateZ((maxFaderValue * 2) % eightyEnergy * p.millis() / 100000);

    // }
    // p.rotateX(p.millis() / 1000);
    // p.noStroke();
    // const millis = (-(Math.round((p.millis() / 1000) % 255) - 255) * 2) % 255;
    // // console.log(millis);
    // p.stroke(
    //     // p.color((millis % 255) * 4, (millis % 255) * 8, (millis % 255) * 4)
    //     p.color(16, 128, 16)
    // );
    // p.fill(p.color((millis % 255) * 4, millis, (millis % 255) * 4));
    // p.stroke(
    //     invertStrokePressed ? 255 - rgb.r : rgb.r,
    //     invertStrokePressed ? 255 - rgb.g : rgb.g,
    //     invertStrokePressed ? 255 - rgb.b : rgb.b,
    //     invertStrokePressed
    //         ? -(255 / transparencyFader - 255)
    //         : transparencyFader
    // );
    // p.fill(rgb.r, rgb.g, rgb.b, (transparencyFader / 4) % 255);

    const rStroke = threeTwentyEnergy / 2;
    const gStroke = oneSixtyEnergy / 2;
    const bStroke = eightyEnergy;
    // p.noFill();
    // p.lights()
    // p.ambientLight(128);
    // p.specularColor(128, 32, 16);
    // p.specularMaterial(150);
    // const lightPosX = p.mouseX - p.width / 2;
    // const lightPosY = p.mouseY - p.height / 2;
    // p.spotLight(0, 250, 0, lightPosX, lightPosY, 100, 0, 0, -1, Math.PI / 16);
    // // p.pointLight(200, 200, 200, lightPosX, lightPosY, 50); //
    // p.shininess(50);
    // p.strokeWeight(8);
    // setInterval(() => p.clear(), 1000)
    // p.clear()
    const transp = Number.parseInt(Math.random() * 255, 10)
    const rFill = frequencies.get(fourFourty);
    const gFill = frequencies.get(sixFourty);
    const bFill = frequencies.get(oneK);
    const transFil = frequencies.get(twoK);
    p.rotate(p.PI / 255 / transp)
    p.fill(rFill, gFill, bFill, 32);
    
    // console.log(frequencies.get(eighty));
    // const otherSizeFactor = sizeFactorFader;
    const otherSizeFactor = ((255 * 3) % (rStroke + gStroke + bStroke)) / 100;
    // p.sphere(Math.min(p.width / 3, p.height / 3) * otherSizeFactor, 8, 3);
    p.rotate(p.PI * duration / 10)
    p.sphere(Math.min(rFill, gFill) * otherSizeFactor, 8, 3);
    p.stroke(rgb.r, rgb.g, rgb.b, transp);
};

const objectMap = new Map([
    [36, rectangle],
    [37, triangle],
    [38, circle],
    [39, arc],
    [40, quad],
    [41, ellipse],
]);

// faders [16, 23]
const rotationFaders = new Map([
    [16, rotateX],
    [17, rotateY],
    [18, rotateZ],
]);

const colorFaders = new Map([
    [8, transparency],
    [9, r],
    [10, g],
    [11, b],
]);

const factors = new Map([
    [56, rotationFactor],
    [57, sizeFactor],
]);

const modifiers = new Map([
    [24, clearSketch],
    [25, invertStroke],
]);

const isPadsInteraction = (controlId) =>
    Array.from([...objectMap].keys()).includes(controlId);
const isRotationFadersInteraction = (controlId) =>
    Array.from([...rotationFaders.keys()]).includes(controlId);
const isColorsInteraction = (controlId) =>
    Array.from([...colorFaders.keys()]).includes(controlId);
const isFactorInteraction = (controlId) =>
    Array.from([...factors.keys()]).includes(controlId);

const isModifiersInteraction = (controlId) =>
    Array.from([...modifiers.keys()]).includes(controlId);

const onMidiMessage = (e) => {
    //144 push down, 128 push up for mode
    // controlId 36 - 43 pads
    const [mode, controlId, value] = e.data;
    const date = new Date();
    if (isPadsInteraction(controlId)) {
        objects.push({
            controlId,
            date,
            value,
        });
    } else if (isRotationFadersInteraction(controlId)) {
        // console.log('rotation');
        const rotationDirection = rotationFaders.get(controlId);
        rotation[rotationDirection] = value;
    } else if (isColorsInteraction(controlId)) {
        const fader = colorFaders.get(controlId);
        if (fader === transparency) {
            transparencyFader = value * 2;
        } else if (fader === r) {
            rgb.r = value * 2;
        } else if (fader === g) {
            rgb.g = value * 2;
        } else if (fader === b) {
            rgb.b = value * 2;
        }
    } else if (isFactorInteraction(controlId)) {
        const factor = factors.get(controlId);
        // console.log(factor, value);
        const decrease = value >= 64;
        if (factor === rotationFactor) {
            rotationFactorFader *= decrease ? 0.9 : 1.01;
            // rotationFactorFader * 1.1;
        } else if (factor === sizeFactor) {
            // sizeFactorFader * 1.1;
            sizeFactorFader *= decrease ? 0.9 : 1.01;
        }
        // console.log(rotationFactorFader, sizeFactorFader, value, decrease);
    } else if (isModifiersInteraction(controlId)) {
        const modifier = modifiers.get(controlId);
        console.log(invertStrokePressed, value);
        if (modifier === clearSketch) {
            sketchClearPressed = true;
        } else if (modifier === invertStroke) {
            // invertStrokePressed = !!value;
        }
    }
};

const drawOnPads = (p) => {
    p.background(128);

    for (const object of objects) {
        const shape = objectMap.get(object.controlId);
        const seconds = object.date.getSeconds();
        if (shape === rectangle) {
            p.rect(20, seconds * 2, 55, 55);
        } else if (shape === triangle) {
            p.triangle(30, seconds * 2, 49, seconds, 85, 77);
        } else if (shape === circle) {
            p.circle(seconds * 6, seconds * 6, seconds * 2);
        } else if (shape === arc) {
            p.noFill();
            p.arc(50, 55, 60, 60, p.HALF_PI, p.PI);
        } else if (shape === quad) {
            p.quad(38, 31, 86, 20, 69, 63, 30, 76);
        } else if (shape === ellipse) {
            p.ellipse(56, 46, 55, 75);
        }
    }
};
