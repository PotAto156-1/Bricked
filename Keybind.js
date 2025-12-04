let active = false; // terminal mode
const activateKey = { shift: false, key: "x" };
const deactivateKey = { key: "z" };

// Flash overlay
const flash = document.createElement("div");
Object.assign(flash.style, {
    position: "fixed",
    top: "0", left: "0",
    width: "100%", height: "100%",
    background: "red",
    opacity: "0",
    pointerEvents: "none",
    transition: "opacity 0.3s",
    zIndex: "9999"
});
document.body.appendChild(flash);

// Black terminal overlay
const black = document.createElement("div");
Object.assign(black.style, {
    position: "fixed",
    top: "0", left: "0",
    width: "100%", height: "100%",
    background: "black",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    zIndex: "9998",
    display: "none",
});
black.textContent = "Terminal Mode";
document.body.appendChild(black);

// Disable scrolling when active
function disableScroll() {
    document.body.style.overflow = "hidden";
}
function enableScroll() {
    document.body.style.overflow = "";
}

// Key listeners
document.addEventListener("keydown", (e) => {
    if (e.key === "Shift") activateKey.shift = true;

    // Activate terminal
    if (activateKey.shift && e.key.toLowerCase() === activateKey.key) {
        activateTerminal();
    }

    // Deactivate terminal (Shift+Ctrl+Z)
    if (active && e.shiftKey && e.ctrlKey && e.key.toLowerCase() === deactivateKey.key) {
        deactivateTerminal();
    }

    // Block F11 and zoom
    if (active) {
        if (["F11"].includes(e.key)) e.preventDefault();
        if (e.ctrlKey && ["+", "-", "0", "="].includes(e.key)) e.preventDefault();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Shift") activateKey.shift = false;
});

function activateTerminal() {
    if (active) return;
    active = true;

    flash.style.opacity = "1";
    setTimeout(() => {
        flash.style.opacity = "0";
        black.style.display = "flex";
        disableScroll();
        // Optional: attempt fullscreen (may fail on Esc)
        document.documentElement.requestFullscreen().catch(()=>{});
    }, 800);
}

function deactivateTerminal() {
    if (!active) return;
    active = false;

    black.style.display = "none";
    enableScroll();
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(()=>{});
    }
}
