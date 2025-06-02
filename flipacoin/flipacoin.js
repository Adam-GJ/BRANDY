var laststate = true;
var currentstate = true;

const ui = {
    buttons: {
        generate: document.getElementById("generateBtn")
    },
    outputs: {
        coin: document.getElementById("coin"),
        coin_video: document.getElementById("coin_video")
    }
}

ui.buttons.generate.addEventListener("click", () => {
    currentstate = Math.random() < 0.5;

    if (currentstate) {
        if (laststate) {
            ui.outputs.coin_video.style.backgroundImage = "url(img/heads.png)";
            ui.outputs.coin.src = "vid/h2h.mp4";
        }
        else {
            ui.outputs.coin_video.style.backgroundImage = "url(img/tails.png)";
            ui.outputs.coin.src = "vid/t2h.mp4";
        }
    } else {
        if (laststate) {
            ui.outputs.coin_video.style.backgroundImage = "url(img/heads.png)";
            ui.outputs.coin.src = "vid/h2t.mp4";
        }
        else {
            ui.outputs.coin_video.style.backgroundImage = "url(img/tails.png)";
            ui.outputs.coin.src = "vid/t2t.mp4";
        }
    }

    ui.outputs.coin_video.pause();
    ui.outputs.coin_video.currentTime = 0;
    ui.outputs.coin_video.load();

    laststate = currentstate;
});