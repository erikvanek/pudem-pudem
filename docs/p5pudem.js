let song, loaded, fft, mic, playingFromFile = false, frequencies, numberOfLines = 32;

const setupFromFile = (p) => {

    song = p.loadSound('eleonora.mp3', () => {
        loaded = true; fft = new p5.FFT();
        // song.amp(0.8);
    })
}

const setupFromMic = () => {
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
    loaded = true
}

const p5Init = () => {
    const sketch = (p) => {
        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight);
            p.background(40);
            playingFromFile ?
                setupFromFile(p)
                : setupFromMic()

            const audibleMin = 20
            // const audibleMax = 20000;
            const audibleMax = 10000;
            frequencies = []

            for (let index = 0; index < numberOfLines; index++) {
                frequencies.push({ frequency: Math.floor((audibleMax - audibleMin) / numberOfLines * index), energy: 0 })
            }

            console.log(frequencies)
        };

        p.draw = () => {
            if (loaded) {
                p.background(220);
                // paintWaveForm(p)
                // paintSpectrum(p)
                paintLines(p)
                p.text('tap to play', 20, 20);
            }
        };

        p.mousePressed = playingFromFile ? () => fileMousePresesd(song, loaded) : () => micMousePressed(p)
    };

    new p5(sketch);
};

const paintLines = (p) => {

    let fullBarHeight = p.height - 80;
    const xOffset = 20

    fft.analyze()
    for (const frequency of frequencies) {
        // UNCOMMENT ME TO HAVE SOME FUN
        // p.rectMode(p.RADIUS);
        // p.translate(p5.Vector.fromAngle(p.millis() / 5000, 30));
        const index = frequencies.findIndex(x => x.frequency === frequency.frequency)
        const lineWidth = p.width / numberOfLines
        const barX = lineWidth * index + xOffset
        let energy, previousFrequency;
        if (index > 0) {
            previousFrequency = frequencies[index - 1]
        }
        if (previousFrequency) {
            energy = fft.getEnergy(frequency.frequency, previousFrequency.frequency)
        } else {
            energy = fft.getEnergy(frequency.frequency)
        }
        const adjustedBarHeight = fullBarHeight * (energy / 255)
        const remainingSpace = p.height - adjustedBarHeight;

        frequencies[index] = { ...frequencies[index], energy }
        if (energy > 0) {
            p.fill(128, 64, 128)
            const barY = remainingSpace / 2;
            p.rect(barX, barY, 8, adjustedBarHeight)
            p.fill(256, 128, 256)
            p.rect(barX, barY, 5, adjustedBarHeight)
        }
        // if (energy > 100) {
        //     // console.log(index)
        //     console.log(frequencies[index])
        //     // console.log(frequencies)
        // }
        // console.log(frequencies)
    }
}

const paintSpectrum = (p) => {
    let spectrum = fft.analyze();
    p.noStroke();
    p.fill(255, 0, 255);
    for (let i = 0; i < spectrum.length; i++) {
        let x = p.map(i, 0, spectrum.length, 0, p.width);
        let h = -p.height + p.map(spectrum[i], 0, 255, p.height, 0);
        p.rect(x, p.height, p.width / spectrum.length, h)
    }

    p.noFill();
    p.stroke(20);

    for (let i = 0; i < spectrum.length; i++) {
        let x = p.map(i, 0, spectrum.length, 0, p.width);
        let h = -p.height + p.map(spectrum[i], 0, 255, p.height, 128);
        p.rect(x, p.height, p.width / spectrum.length, h)
    }
}

const paintWaveForm = (p) => {
    let waveform = fft.waveform();
    p.beginShape();
    for (let i = 0; i < waveform.length; i++) {
        let x = p.map(i, 0, waveform.length, 0, p.width);
        let y = p.map(waveform[i], -1, 1, 0, p.height);
        p.vertex(x, y);
    }
    p.endShape();
}

const fileMousePresesd = (song, loaded) => {
    if (!song.isPlaying() && loaded) {
        song.play()
    } else if (song.isPlaying()) {
        song.pause()
    }
}

const micMousePressed = (p) => {
    p.getAudioContext().resume();
}

const runP5 = () => {
    p5Init();
};

runP5()