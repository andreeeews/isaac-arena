const canvasId = "main-canvas";
const canvas = document.getElementById(canvasId);

function pruebas() {
    document.querySelector(".shop-items").classList.remove("non-visible");
}

const game = new Game(canvasId)


window.addEventListener("keydown", (event) => {
    game.onKeyEvent(event)
});

window.addEventListener("keyup", (event) => {
    game.onKeyEvent(event)
});

document.getElementById("options").addEventListener("click", () => {
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
    
    let playerSpeed = parseInt(document.getElementById("playerSpeed").value);
    let enemySpeed = parseInt(document.getElementById("enemySpeed").value);
    let bulletSpeed = parseInt(document.getElementById("bulletSpeed").value);
    let shootInterval = parseInt(document.getElementById("shootInterval").value);
    let maxEnemy = parseInt(document.getElementById("maxEnemy").value);
    let enemyFrequency = parseInt(document.getElementById("enemyFrequency").value);
    let debug = document.getElementById("debug").checked;
});

document.getElementById("start").addEventListener("click", () => {
    document.querySelector(".menu-container").classList.remove("visible")
    document.querySelector(".menu-container").classList.add("non-visible")
    
    game.start();
})

//document.getElementById("stop").addEventListener("click", () => {
//    game.stop();
//})


//game.start();

