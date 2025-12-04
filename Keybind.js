let active = false; // whether terminal mode is active
const keybind = { shift: false, key: "x" };

// Create flash screen
const flash = document.createElement("div");
flash.id = "flash-screen";
Object.assign(flash.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "red",
    opacity: "0",
    pointerEvents: "none",
    transition: "opacity 0.3s",
    zIndex: "9999"
});
document.body.appendChild(flash);

// Create black screen (terminal)
const black = document.createElement("div");
black.id = "black-screen";
Object.assign(black.style, {
    display: "none",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "black",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    zIndex: "9998",
});
black.textContent = "Terminal Mode";
document.body.appendChild(black);

// Listen for key presses
document.addEventListener("keydown", (e) => {
    if (e.key === "Shift") keybind.shift = true;

    // Trigger Shift + X
    if (keybind.shift && e.key.toLowerCase() === keybind.key) {
        // Request fullscreen directly (user gesture)
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => console.error("Fullscreen failed:", err));
        }

        toggleMode();
    }

    // Block unwanted keys while terminal is active
    if (active) {
        const blocked = ["F11"];
        if (blocked.includes(e.key)) e.preventDefault();

        if (e.ctrlKey && ["+", "-", "0", "="].includes(e.key)) e.preventDefault();
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

    // Flash red
    flash.style.opacity = "1";
    setTimeout(() => {
        flash.style.opacity = "0";

        // Show black terminal immediately after flash
        black.style.display = "flex";
    }, 800); // red flash duration
}

function deactivateSequence() {
    active = false;

    black.style.display = "none";

    // Exit fullscreen
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.error(err));
    }
}
