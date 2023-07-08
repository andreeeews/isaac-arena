const canvasId = "main-canvas";
const canvas = document.getElementById(canvasId);
const hoverAudio = new Audio("/assets/sounds/MOUSE_HOVER.wav")
const selectAudio = new Audio("/assets/sounds/OPTION_SELECT.wav")



const game = new Game(canvasId)

window.addEventListener("keydown", (event) => {
    game.onKeyEvent(event)
});

window.addEventListener("keyup", (event) => {
    game.onKeyEvent(event)
});

document.getElementById("options").addEventListener("click", () => {
    selectAudio.play();
    document.getElementById("start").classList.add("hidden");
    document.getElementById("options").classList.add("hidden");
    document.getElementById("configForm").classList.add("visible");
})

document.getElementById("configForm").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("configForm").classList.remove("visible");
    document.getElementById("configForm").classList.add("non-visible");
    document.getElementById("start").classList.remove("hidden");
    document.getElementById("options").classList.remove("hidden");
    selectAudio.play();

    let playerSpeed = parseInt(document.getElementById("playerSpeed").value);
    let enemySpeed = parseInt(document.getElementById("enemySpeed").value);
    let bulletSpeed = parseInt(document.getElementById("bulletSpeed").value);
    let shootInterval = parseInt(document.getElementById("shootInterval").value);
    let maxEnemy = parseInt(document.getElementById("maxEnemy").value);
    let enemyFrequency = parseInt(document.getElementById("enemyFrequency").value);
    let debug = document.getElementById("debug").checked;

    PLAYER_SPEED = playerSpeed;
    ENEMY_SPEED = enemySpeed;
    BULLET_SPEED = bulletSpeed;
    SHOOT_INTERVAL = shootInterval;
    MAX_ENEMY = maxEnemy;
    ENEMY_FREQUENCY = enemyFrequency;

    DEBUG = debug;
    
});

const buttons = document.querySelectorAll('.buttons');

buttons.forEach(button => {
  button.addEventListener('mouseover', () => {
    hoverAudio.play();
  });
});



document.getElementById("start").addEventListener("click", () => {
    document.querySelector(".menu-container").classList.remove("visible")
    document.querySelector(".menu-container").classList.add("non-visible")
    document.querySelector(".game-container").classList.remove("hidden")
    document.querySelector(".game-container").classList.add("non-hidden")
    

    game.start();
    game.startTheme.volume = 0.3;
    game.startTheme.play();
})


