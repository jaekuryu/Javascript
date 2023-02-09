function init() {
    const app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0x1099bb,
    });
    document.body.appendChild(app.view);

    const firecracker = PIXI.Sprite.from('firecracker.png');
    firecracker.anchor.set(0.5);
    firecracker.x = app.screen.width / 2;
    firecracker.y = app.screen.height / 2;
    app.stage.addChild(firecracker);

    let frames;
    firecracker.texture.baseTexture.on('loaded', () => {
        frames = [
            new PIXI.Rectangle(0, 0, firecracker.texture.width/4, firecracker.texture.height),
            new PIXI.Rectangle(firecracker.texture.width/4, 0, firecracker.texture.width/4, firecracker.texture.height),
            new PIXI.Rectangle(firecracker.texture.width/2, 0, firecracker.texture.width/4, firecracker.texture.height)
        ];
        let frameIndex = 0;
        let time = 0;
        app.ticker.add(delta => {
            time += delta;
            if(time > 20) { // delay of 20 seconds
                firecracker.texture.frame = frames[frameIndex];
                frameIndex = (frameIndex + 1) % frames.length;
                time = 0;
            }
        });
    });
    firecracker.texture.baseTexture.on('error', (event) => {
        console.log("Error loading image: ", event);
    });
}

document.addEventListener("DOMContentLoaded", init);


