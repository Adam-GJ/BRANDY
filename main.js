const ui = {
    buttons: {
        settings:       document.getElementById("settingsBtn"),
        generate:       document.getElementById("generateBtn")
    },
    inputs: {
        minimum:        document.getElementById("min"),
        maximum:        document.getElementById("max"),
        delta_max:      document.getElementById("dmax"),
        k_factor:       document.getElementById("kval"),
        show_histogram: document.getElementById("show_histogram")
    },
    outputs: {
        result1: document.getElementById("result"),
        result2: document.getElementById("result_prev"),
        result3: document.getElementById("result_prev_2")
    },
    containers: {
        settings:       document.getElementById("settings")
    }
}

const rng = new brng(ui.inputs.minimum, ui.inputs.maximum, ui.inputs.k_factor, ui.inputs.delta_max, histogram_id="hcontainer");

ui.buttons.generate.addEventListener("click", () => {
    rng.generate();
    ui.outputs.result1.textContent = rng.get(0);
    ui.outputs.result2.textContent = rng.get(1);
    ui.outputs.result3.textContent = rng.get(2);
});
ui.buttons.settings.addEventListener("click", () => {ui.containers.settings.classList.toggle("hidden");});





// BRNG FUNCTIONS ETC //
/*

////// Initialisation //////

const <name> = new brng(min, max, k_factor, delta_max=-1)

rng.histogram(canvas_id, options)

-> -> -> options: {
    show_delta,
    background_color,
    border_color,
    border_width,
    title
}

rng.generate() -> integer
--> if min & max changed: reset values & counts arrays
--> 

*/