const STORAGE_KEY = "baseball-scoreboard-v1";

const defaults = {
  half: "Top",
  inning: 1,
  away: 0,
  home: 0,
  balls: 0,
  strikes: 0,
  outs: 0
};

let state = loadState();

const limits = {
  inning: { min: 1, max: 99 },
  away: { min: 0, max: 99 },
  home: { min: 0, max: 99 },
  balls: { min: 0, max: 3 },
  strikes: { min: 0, max: 2 },
  outs: { min: 0, max: 2 }
};

function loadState() {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return { ...defaults };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  for (const key of Object.keys(defaults)) {
    const el = document.getElementById(key === "half" ? "halfLabel" : key);
    if (el) el.textContent = state[key];
  }
  saveState();
}

function clamp(field, value) {
  const limit = limits[field];
  return Math.max(limit.min, Math.min(limit.max, value));
}

function changeNumber(field, direction) {
  const amount = direction === "increment" ? 1 : -1;
  state[field] = clamp(field, state[field] + amount);
  render();
}

function toggleHalf() {
  state.half = state.half === "Top" ? "Bottom" : "Top";
  render();
}

function resetCount() {
  state.balls = 0;
  state.strikes = 0;
}

function nextHalfInning() {
  resetCount();
  state.outs = 0;

  if (state.half === "Top") {
    state.half = "Bottom";
  } else {
    state.half = "Top";
    state.inning = clamp("inning", state.inning + 1);
  }

  render();
}

function addOut() {
  resetCount();

  if (state.outs >= 2) {
    nextHalfInning();
    return;
  }

  state.outs += 1;
  render();
}

function resetGame() {
  const shouldReset = window.confirm("Reset the whole game?");
  if (!shouldReset) return;
  state = { ...defaults };
  render();
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const { action, field } = button.dataset;
  if (action && field) changeNumber(field, action);
});

document.getElementById("halfToggle").addEventListener("click", toggleHalf);
document.getElementById("newBatter").addEventListener("click", () => {
  resetCount();
  render();
});
document.getElementById("addOut").addEventListener("click", addOut);
document.getElementById("nextHalf").addEventListener("click", nextHalfInning);
document.getElementById("resetGame").addEventListener("click", resetGame);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js");
  });
}

render();
