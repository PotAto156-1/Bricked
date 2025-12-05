let active = false; // terminal mode
const activateKey = { shift: false, key: "x" };
const deactivateKey = { key: "z" };

// Create red flash overlay
const flash = document.createElement("div");
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

// Create black terminal overlay
const terminal = document.createElement("div");
Object.assign(terminal.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    background: "black",
    color: "lime",
    fontFamily: "monospace",
    fontSize: "3rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "10000",       // ensure overlay is on top
    pointerEvents: "all",  // block interaction with page
    userSelect: "none",
    display: "none"
});
terminal.textContent = "Access has been terminated. This device has been disabled following unauthorized activity directed toward a classified federal infrastructure.";
document.body.appendChild(terminal);

// Disable page scroll while terminal active
function lockPage() {
    document.body.style.overflow = "hidden";
}
function unlockPage() {
    document.body.style.overflow = "";
}

// Key listeners
document.addEventListener("keydown", (e) => {
    if (e.key === "Shift") activateKey.shift = true;

    // Activate terminal (Shift+X)
    if (activateKey.shift && e.key.toLowerCase() === activateKey.key) {
        activateTerminal();
    }

    // Deactivate terminal (Shift+Ctrl+Z)
    if (active && e.shiftKey && e.ctrlKey && e.key.toLowerCase() === deactivateKey.key) {
        deactivateTerminal();
    }

    // Block F11 and zoom shortcuts while terminal active
    if (active) {
        if (["F11"].includes(e.key)) e.preventDefault();
        if (e.ctrlKey && ["+", "-", "0", "="].includes(e.key)) e.preventDefault();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Shift") activateKey.shift = false;
});

// Activate terminal
function activateTerminal() {
    if (active) return;
    active = true;

    // Flash red first
    flash.style.opacity = "1";
    setTimeout(() => {
        flash.style.opacity = "0";
        terminal.style.display = "flex";
        lockPage();
    }, 800);
}

// Deactivate terminal
function deactivateTerminal() {
    if (!active) return;
    active = false;

    terminal.style.display = "none";
    unlockPage();
}
