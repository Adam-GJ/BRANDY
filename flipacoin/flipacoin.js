var laststate = true;
var currentstate = true;

const ui = {
    buttons: {
        generate:           document.getElementById("generateBtn")
    },
    outputs: {
        coin:               document.getElementById("coin"),
        coin_video:         document.getElementById("coin_video"),
        coin_background:    document.getElementById("coin_background")
    }
}

ui.buttons.generate.addEventListener("click", () => {
    currentstate = Math.random() < 0.5;

    

    if (currentstate) {
        if (laststate) {
            ui.outputs.coin_background.style.backgroundImage = "url(img/heads.png)";
            ui.outputs.coin.src = "vid/h2h.webm";
        }
        else {
            ui.outputs.coin_background.style.backgroundImage = "url(img/tails.png)";
            ui.outputs.coin.src = "vid/t2h.webm";
        }
    } else {
        if (laststate) {
            ui.outputs.coin_background.style.backgroundImage = "url(img/heads.png)";
            ui.outputs.coin.src = "vid/h2t.webm";
        }
        else {
            ui.outputs.coin_background.style.backgroundImage = "url(img/tails.png)";
            ui.outputs.coin.src = "vid/t2t.webm";
        }
    }

    ui.outputs.coin_video.pause();
    ui.outputs.coin_video.currentTime = 0;
    ui.outputs.coin_video.load();
    setTimeout(() => {
        ui.outputs.coin_background.style.backgroundImage = "url(img/blank.png)";
    }, 25);
    laststate = currentstate;
});

ui.outputs.coin_background.style.backgroundImage = "url(img/heads.png)";
