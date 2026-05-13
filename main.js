// ═══════════════════════════════════════════════
//  main.js  —  Entry point, wires everything
// ═══════════════════════════════════════════════

let _game = null;
window._game = null;

// ── Splash Screen Setup ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  let playerCount = 2;
  UI.renderPlayerSetup(playerCount);

  // Player count buttons
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playerCount = parseInt(btn.dataset.count);
      UI.renderPlayerSetup(playerCount);
    });
  });

  // Start game
  document.getElementById('start-game-btn').addEventListener('click', () => {
    const playerDefs = UI.getPlayerDefs();
    startGame(playerDefs);
  });

  // Modal backdrops close cards
  document.getElementById('modal-backdrop').addEventListener('click', UI.hidePropertyCard);
  document.getElementById('build-backdrop').addEventListener('click', UI.hideBuildModal);
});

function startGame(playerDefs) {
  _game = new Game(playerDefs);
  window._game = _game;

  document.getElementById('splash-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');

  // Render board
  renderBoard(_game);
  updateTokens(_game.players);
  updateBuildings(_game.players);

  // Apply board wrapper 3D perspective
  applyBoardPerspective();

  // Wire action buttons
  document.getElementById('roll-btn').addEventListener('click', handleRoll);
  document.getElementById('buy-btn').addEventListener('click', handleBuy);
  document.getElementById('build-btn').addEventListener('click', () => UI.showBuildModal(_game));
  document.getElementById('end-turn-btn').addEventListener('click', handleEndTurn);

  // Skip buy on end turn if phase is 'buy'
  document.getElementById('end-turn-btn').addEventListener('click', () => {
    if (_game.phase === 'buy') { _game.skipBuy(); }
  });

  // Forfeit button (keyboard: F)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
      if (_game && _game.phase !== 'ended') {
        if (confirm('End game early and determine winner by net worth?')) {
          _game.forfeit();
          fullUpdate();
          UI.showGameOver(_game);
        }
      }
    }
  });

  fullUpdate();
}

// ── Action Handlers ───────────────────────────
function handleRoll() {
  if (!_game || _game.phase !== 'roll') return;
  const rollBtn = document.getElementById('roll-btn');
  rollBtn.disabled = true;

  const die1El = document.getElementById('die1');
  const die2El = document.getElementById('die2');

  // Pre-roll dice values
  const dice = rollDice();
  _game.lastDice = dice; // store early for animation

  animateDice(die1El, die2El, dice.d1, dice.d2, () => {
    rollBtn.disabled = false;
    // Actually execute roll
    _game.lastDice = null; // reset so roll() recalculates
    _game.phase = 'roll';

    // Replay with same dice values (inject)
    _game.lastDice = dice;
    _game._movePlayer(_game.currentPlayer, dice.sum);
    _game._logMsg(`${_game.currentPlayer.name} rolled ${dice.d1}+${dice.d2}=${dice.sum}`);
    _game.phase = 'action';
    _game._applySquare(_game.currentPlayer, dice);

    // Highlight square
    highlightSquare(_game.currentPlayer.position);
    updateTokens(_game.players);

    fullUpdate();

    if (_game.phase === 'ended') {
      setTimeout(() => UI.showGameOver(_game), 800);
    }
  });
}

function handleBuy() {
  if (!_game) return;
  if (_game.phase === 'buy') {
    const sq = _game.pendingSquare;
    _game.buyProperty();
    fullUpdate();
    // Show purchased card briefly
    if (sq) {
      const cp = _game.players.find(p => p.properties.includes(sq.id));
      UI.showPropertyCard(sq, cp ? cp.name : '');
      setTimeout(UI.hidePropertyCard, 2000);
    }
  }
}

function handleEndTurn() {
  if (!_game) return;
  if (_game.phase === 'buy') _game.skipBuy();
  if (_game.phase === 'endturn') {
    _game.endTurn();
    document.querySelectorAll('.board-sq').forEach(el => el.classList.remove('sq-highlight'));
    document.getElementById('die1').textContent = '🎲';
    document.getElementById('die2').textContent = '🎲';
    document.getElementById('dice-sum').textContent = '';
    fullUpdate();
  }
}

// ── Full UI Refresh ───────────────────────────
function fullUpdate() {
  if (!_game) return;
  UI.updateHUD(_game);
  UI.updateActionPanel(_game);
  UI.updateLog(_game);
  updateTokens(_game.players);
  updateBuildings(_game.players);
}

// ── 3D Board Perspective ──────────────────────
function applyBoardPerspective() {
  const wrapper = document.getElementById('board-wrapper');
  // 3D tilt effect on the board
  wrapper.style.perspective = '1200px';

  const overlay = document.getElementById('board-overlay');
  overlay.style.transform = 'rotateX(18deg) rotateZ(-1deg)';
  overlay.style.transformOrigin = 'center center';
  overlay.style.transition = 'transform 0.4s ease';

  // Mouse parallax
  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    overlay.style.transform = `rotateX(${18 - dy * 8}deg) rotateY(${dx * 6}deg) rotateZ(-1deg)`;
  });

  wrapper.addEventListener('mouseleave', () => {
    overlay.style.transform = 'rotateX(18deg) rotateY(0deg) rotateZ(-1deg)';
  });
}
