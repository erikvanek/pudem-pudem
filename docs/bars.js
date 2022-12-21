export const paintLines = (p, fft, frequencies, numberOfLines) => {
    let fullBarHeight = p.height - 80;
    const xOffset = 20;

    fft.analyze();
    for (const frequency of frequencies) {
        // UNCOMMENT ME TO HAVE SOME FUN
        // p.rectMode(p.RADIUS);
        // p.translate(p5.Vector.fromAngle(p.millis() / 5000, 30));
        const index = frequencies.findIndex(
            (x) => x.frequency === frequency.frequency
        );
        const lineWidth = p.width / numberOfLines;
        const barX = lineWidth * index + xOffset;
        let energy, previousFrequency;
        if (index > 0) {
            previousFrequency = frequencies[index - 1];
        }
        if (previousFrequency) {
            energy = fft.getEnergy(
                frequency.frequency,
                previousFrequency.frequency
            );
        } else {
            energy = fft.getEnergy(frequency.frequency);
        }
        const adjustedBarHeight = fullBarHeight * (energy / 255);
        const remainingSpace = p.height - adjustedBarHeight;

        frequencies[index] = { ...frequencies[index], energy };
        if (energy > 0) {
            // UNCOMMENT ME TO HAVE SOME FUN
            //     p.rectMode(p.RADIUS);
            // p.translate(p5.Vector.fromAngle(p.millis() / 50000, 2));
            // p.rotate(p.millis() / p.PI / 10000 )
            p.fill(128, 64, 128);
            // console.log(p.millis() % 255)
            // p.fill(128, 64, Math.round(p.millis() % 255))
            const barY = remainingSpace / 2;
            p.rect(barX, barY, 8, adjustedBarHeight);
            const rColor = Math.round(((p.millis() / 100) % 16) * 16);
            const gColor = Math.round(((p.millis() / 100) % 64) * 4);
            const bColor = Math.round(((p.millis() / 100) % 128) * 2);
            // console.log(bColor)
            p.fill(rColor, gColor, bColor);
            p.rect(barX, barY, 5, adjustedBarHeight);
        }
        // if (energy > 100) {
        //     // console.log(index)
        //     console.log(frequencies[index])
        //     // console.log(frequencies)
        // }
        // console.log(frequencies)
    }
};

export const drawBars = (p, fft, frequencies, numberOfLines) => {
    p.background(220);
    paintWaveForm(p, fft);
    paintSpectrum(p, fft);
    paintLines(p, fft, frequencies, numberOfLines);
};

export const paintSpectrum = (p, fft) => {
    let spectrum = fft.analyze();
    p.noStroke();
    p.fill(255, 0, 255);
    for (let i = 0; i < spectrum.length; i++) {
        let x = p.map(i, 0, spectrum.length, 0, p.width);
        let h = -p.height + p.map(spectrum[i], 0, 255, p.height, 0);
        p.rect(x, p.height, p.width / spectrum.length, h);
    }

    p.noFill();
    p.stroke(20);

    for (let i = 0; i < spectrum.length; i++) {
        let x = p.map(i, 0, spectrum.length, 0, p.width);
        let h = -p.height + p.map(spectrum[i], 0, 255, p.height, 128);
        p.rect(x, p.height, p.width / spectrum.length, h);
    }
};

export const paintWaveForm = (p, fft) => {
    let waveform = fft.waveform();
    p.beginShape();
    for (let i = 0; i < waveform.length; i++) {
        let x = p.map(i, 0, waveform.length, 0, p.width);
        let y = p.map(waveform[i], -1, 1, 0, p.height);
        p.vertex(x, y);
    }
    p.endShape();
};
