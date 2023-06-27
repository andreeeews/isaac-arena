const canvasId = "main-canvas";
const canvas = document.getElementById(canvasId);

const game = new Game(canvasId)

window.addEventListener("keydown", (event) => {
    game.onKeyEvent(event)
});

window.addEventListener("keyup", (event) => {
    game.onKeyEvent(event)
});


game.start();