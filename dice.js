// ═══════════════════════════════════════════════
//  dice.js  —  Dice rolling
// ═══════════════════════════════════════════════

const DICE_FACES = ['⚀','⚁','⚂','⚃','⚄','⚅'];

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollDice() {
  const d1 = rollDie();
  const d2 = rollDie();
  return { d1, d2, sum: d1 + d2, isEven: (d1 + d2) % 2 === 0 };
}

function dieFace(val) {
  return DICE_FACES[val - 1];
}

// Animated dice roll (visual)
function animateDice(die1El, die2El, finalD1, finalD2, onDone) {
  let ticks = 0;
  const max = 14;
  const interval = setInterval(() => {
    die1El.textContent = dieFace(rollDie());
    die2El.textContent = dieFace(rollDie());
    ticks++;
    if (ticks >= max) {
      clearInterval(interval);
      die1El.textContent = dieFace(finalD1);
      die2El.textContent = dieFace(finalD2);
      if (onDone) onDone();
    }
  }, 80);
}
