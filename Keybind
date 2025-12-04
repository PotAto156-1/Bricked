let active = false;       // whether black-screen mode is active
const keybind = { shift: false, key: "x" };

document.addEventListener("keydown", (e) => {
    if (e.key === "Shift") keybind.shift = true;

    // Toggle when pressing Shift + X
    if (keybind.shift && e.key.toLowerCase() === keybind.key) {
        toggleMode();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Shift") keybind.shift = false;
});

function toggleMode() {
    if (!active) {
        activateSequence();
    } else {
        deactivateSequence();
    }
}

function activateSequence() {
    active = true;

    const flash = document.getElementById("flash-screen");
    const black = document.getElementById("black-screen");

    // Flash red
    flash.style.opacity = "1";
    setTimeout(() => {
        flash.style.opacity = "0";
    }, 200);

    // After flash, show black screen
    setTimeout(() => {
        black.style.display = "flex";
    }, 2200);
}

function deactivateSequence() {
    active = false;
    const black = document.getElementById("black-screen");
    black.style.display = "none";
}
