let active = false; // whether terminal mode is active
const activateKey = { shift: false, key: "x" }; // Shift+X to activate
const deactivateKey = { key: "z" }; // Shift+Ctrl+Z to deactivate

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
    // Track Shift for activation
    if (e.key === "Shift") activateKey.shift = true;

    // Activate terminal mode (Shift + X)
    if (activateKey.shift && e.key.toLowerCase() === activateKey.key) {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => console.error("Fullscreen failed:", err));
        }
        activateTerminal();
    }

    // Deactivate terminal mode (Shift + Ctrl + Z)
    if (active && e.shiftKey && e.ctrlKey && e.key.toLowerCase() === deactivateKey.key) {
        deactivateTerminal();
    }

    // While terminal active, block F11 and zoom shortcuts
    if (active) {
        const blocked = ["F11"];
        if (blocked.includes(e.key)) e.preventDefault();

        if (e.ctrlKey && ["+", "-", "0", "="].includes(e.key)) e.preventDefault();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Shift") activateKey.shift = false;
});

// Detect fullscreen exit (e.g., user pressed Esc)
document.addEventListener("fullscreenchange", () => {
    if (active && !document.fullscreenElement) {
        // Re-enter fullscreen immediately
        document.documentElement.requestFullscreen().catch(err => console.error("Fullscreen re-entry failed:", err));
    }
});

// Activate terminal mode sequence
function activateTerminal() {
    if (active) return;
    active = true;

    // Flash red
    flash.style.opacity = "1";
    setTimeout(() => {
        flash.style.opacity = "0";
        black.style.display = "flex";
    }, 800);
}

// Deactivate terminal mode sequence
function deactivateTerminal() {
    if (!active) return;
    active = false;

    black.style.display = "none";

    // Exit fullscreen
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.error(err));
    }
}
