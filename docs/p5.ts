// import 'p5'
// console.log(p5)
import p5 from './p5/lib/index'
globalThis.p5 = p5
console.log(globalThis.p5)
// import 'p5/lib/addons/p5.sound'
// (window as any).p5 = p5;
// import 'p5/lib/addons/p5.sound'
// import SoundFile from 'p5';
// import p5 from 'p5';
// import  from 'p5';

// import {SoundFile, loadSound} from 'p5/lib/addons/p5.sound';
// console.log(p5)
// import {SoundFile} from 'p5/lib/addons/p5.sound';
// import {p5Sound} from 'p5/lib/addons/p5.sound';
// import {SoundFile} from 'p5';


const init = () => {
    const sketch = (p: p5) => {
        let song, loaded;
        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight);
            p.background(40);
            // const s = new SoundFile('eleonora.mp3', (s) => console.log(s))
            // console.log(s)
            // s.play()
            // new SoundFile('')
            // SoundFile
            // console.log(p5Sound)
            // p.loadSound('eleonora.mp3', (e) => console.log(e))
            // const sound = (p as p5.SoundFile).loadSound('eleonora.mp3')
            // sound.play()
            // const loadSound = (path: string) => ((p as any) as p5.SoundFile).loadSound(path);
            // const s: SoundFile = new SoundFile('yo')
            // console.log(s)
            // const yo = new s('eleonora.mp3');
            // s.play()
            // const bloopOne = loadSound('eleonora.mp3');
            // bloopOne.play()
            // p5.loadSound('')
            // p.loadJSON()
            // loadSound('eleonora.mp3', console.log)
        };

        song = loadSound('eleonora.mp3', () => (loaded = true));

        p.mousePressed = () => {
            console.log('now');
            if (!song.isPlaying() && loaded) {
                song.play();
            }
        };

        p.draw = () => {
            p.ellipse(p.mouseX, p.mouseY, 20, 20);
            p.rect(p.mouseY, p.mouseX + 20, 50, 50);
            if (p.mouseIsPressed) {
                p.fill(128);
            } else {
                p.fill(64);
            }
        };

        // p.loadBytes

        // let wut = p5.SoundFile
        // wut.load

        // p.preload = () => {
        //     // p5Sound
        //     p5Sound.loadSound('assets/beat.mp3');

        // }
    };

    const s = new p5(sketch);
    // p5.loadSound('eleonora.mp3')
    // const f = new SoundFile('eleonora.mp3', console.log);
    // console.log(window.loadSound)
};

export const runP5 = () => {
    init();
};
