import { drawBars } from './bars.js';
import { drawNovation } from './novation.js';
import { drawNovationMusic } from './novationMusic.js';

let song,
    loaded,
    fft,
    mic,
    playingFromFile = false,
    frequencies,
    numberOfLines = 32,
    preset = 'novationMusic',
    interacted = false;

const setupFromFile = (p) => {
    song = p.loadSound('eleonora.mp3', () => {
        loaded = true;
        fft = new p5.FFT();
        // song.amp(0.8);
    });
};

const setupFromMic = () => {
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    loaded = true;
};

const novationInit = () => {
    const sketch = (p) => {
        p.setup = () => {};
    };
    new p5(sketch);
};

const sketchInit = () => {
    const sketch = (p) => {
        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
            // init for bars preset
            // p.createCanvas(window.innerWidth, window.innerHeight);
            p.background(40);
            p.frameRate(60);
            playingFromFile ? setupFromFile(p) : setupFromMic();

            const audibleMin = 20;
            // const audibleMax = 20000;
            const audibleMax = 10000;
            frequencies = [];

            for (let index = 0; index < numberOfLines; index++) {
                frequencies.push({
                    frequency: Math.floor(
                        ((audibleMax - audibleMin) / numberOfLines) * index
                    ),
                    energy: 0,
                });
            }
        };

        p.draw = () => {
            if (loaded) {
                // console.log(preset)
                if (preset === 'bars') {
                    drawBars(p, fft, frequencies, numberOfLines);
                } else if (preset === 'novation') {
                    drawNovation(p);
                } else if (preset === 'novationMusic') {
                    drawNovationMusic(p, fft, mic);
                }
            }
            if (!interacted) {
                p.text('tap to play', 20, 20);
            }
        };

        p.mousePressed = playingFromFile
            ? () => fileMousePresesd(song, loaded)
            : () => micMousePressed(p);
    };

    new p5(sketch);
};

const fileMousePresesd = (song, loaded) => {
    if (!song.isPlaying() && loaded) {
        song.play();
    } else if (song.isPlaying()) {
        song.pause();
    }
    interacted = true;
};

const micMousePressed = (p) => {
    p.getAudioContext().resume();
    interacted = true;
};

const runP5 = () => {
    document.addEventListener('DOMContentLoaded', () => {
        sketchInit();
        const select = document.getElementsByTagName('select')[0];
        select.addEventListener('change', (c) => {
            const { value } = c.target;
            preset = value;
        });
    });
};

runP5();
