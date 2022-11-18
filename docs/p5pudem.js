let song, loaded;

const p5Init = () => {
    const sketch = (p) => {
        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight);
            p.background(40);
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
        song = p.loadSound('eleonora.mp3', () => loaded = true, )

        p.mousePressed = () => {
            console.log('now')
            if (!song.isPlaying() && loaded) {
                song.play()
            }
        }

    };

    new p5(sketch);
};

const runP5 = () => {
    p5Init();
};

runP5()