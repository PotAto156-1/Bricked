let active = false;       // whether terminal mode is active
const keybind = { shift: false, key: "x" };

// Listen for Shift being held
document.addEventListener("keydown", (e) => {
    if (e.key === "Shift") keybind.shift = true;

    // Trigger Shift + X
    if (keybind.shift && e.key.toLowerCase() === keybind.key) {
        toggleMode();
    }

    // Block unwanted keys while in terminal
    if (active) {
        const blocked = ["F11"];

        // Block F11 fullscreen toggle
        if (blocked.includes(e.key)) {
            e.preventDefault();
        }

        // Block zoom shortcuts
        if (e.ctrlKey && ["+", "-", "0", "="].includes(e.key)) {
            e.preventDefault();
        }
    }
});

// Detect Shift released
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

async function activateSequence() {
    active = true;

    const flash = document.getElementById("flash-screen");
    const black = document.getElementById("black-screen");

    // Flash red
    flash.style.opacity = "1";
    setTimeout(() => {
        flash.style.opacity = "0";
         black.style.display = "flex";
    }, 800);

    // Enter fullscreen
    try {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
        }
    } catch (err) {
        console.error("Fullscreen failed:", err);
    }

    // Show terminal after delay
    setTimeout(() => {
        black.style.display = "flex";
    }, 2200);
}

async function deactivateSequence() {
    active = false;

    const black = document.getElementById("black-screen");
    black.style.display = "none";

    // Exit fullscreen
    if (document.fullscreenElement) {
        await document.exitFullscreen();
    }
}
