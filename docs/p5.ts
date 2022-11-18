import p5 from 'p5';

const init = () => {
    const sketch = (s: p5) => {
        s.setup = () => {
            s.createCanvas(window.innerWidth, window.innerHeight);
            s.background(40);
        };
        
        s.draw = () => {
            s.ellipse(s.mouseX, s.mouseY, 20, 20);
            s.rect(s.mouseY, s.mouseX + 20, 50, 50);
            if (s.mouseIsPressed) {
                s.fill(128);
            } else {
                s.fill(64);
            }
        };
    };

    new p5(sketch);
};

export const runP5 = () => {
    init();
};
