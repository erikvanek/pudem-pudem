let p, fft, mic;

export const drawChurch = (p5, fft5, mic5) => {
    p = p5;
    fft = fft5;
    mic = mic5;
    draw();
};

const a = {
    x: -50,
    y: 200,
};

const b = {
    x: 50,
    y: 200,
};

const c = {
    x: -30,
    y: 150,
};

const d = {
    x: 30,
    y: 150,
};

const control1 = {
    x: -150,
    y: -150,
};

const control2 = {
    x: 150,
    y: -150,
};

const drawLock = (index) => {
    fft.analyze();
    const twentyEnergy = fft.getEnergy(20) / 2;
    const thirtyEnergy = fft.getEnergy(30) / 2;
    const fortyEnergy = fft.getEnergy(40);
    const hundredEnergy = fft.getEnergy(1200) / 2;
    const g = 4 * index;
    console.log(g);
    p.stroke(
        // twentyEnergy + index * 2,
        // thirtyEnergy + index * 2,
        // hundredEnergy + index
        twentyEnergy ? twentyEnergy + index : 0,
        thirtyEnergy ? thirtyEnergy + index : 0,
        hundredEnergy ? hundredEnergy + index : 0
    );
    p.line(a.x, a.y + index, b.x, b.y + index);
    p.line(a.x, a.y + index, c.x, c.y);
    p.line(b.x, b.y + index, d.x, d.y);
    p.noFill();
    p.bezier(
        c.x,
        c.y,
        control1.x,
        control1.y - hundredEnergy - fortyEnergy - index,
        control2.x,
        control2.y - hundredEnergy - fortyEnergy - index,
        d.x,
        d.y
    );
};

const draw = () => {
    p.clear();
    for (let index = 1; index < 20; index++) {
        drawLock(index);
    }
};
