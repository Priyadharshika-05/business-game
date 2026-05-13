// ═══════════════════════════════════════════════
//  board.js  —  3D board rendering (CSS 3D)
// ═══════════════════════════════════════════════

const BOARD_SIZE = 700;       // px, total board square
const CORNER_SIZE = 90;       // px
const CELL_W = (BOARD_SIZE - 2 * CORNER_SIZE) / 8;   // width of each side cell
const CELL_H = CORNER_SIZE;   // height (same as corner for uniform look)

function renderBoard(game) {
  const wrapper = document.getElementById('board-overlay');
  wrapper.innerHTML = '';

  // We render 36 squares as positioned divs on a flat board
  // Positions: corners + side cells

  BOARD_SQUARES.forEach((sq, idx) => {
    const el = document.createElement('div');
    el.className = 'board-sq';
    el.dataset.index = idx;

    // Position
    const pos = getSquarePosition(idx);
    el.style.left   = pos.x + 'px';
    el.style.top    = pos.y + 'px';
    el.style.width  = pos.w + 'px';
    el.style.height = pos.h + 'px';

    // Rotation for side label readability
    if (idx >= 1 && idx <= 8) {
      // Top side — flip upside down so text reads from outside
      el.style.transform = 'rotate(180deg)';
    } else if (idx >= 10 && idx <= 17) {
      // Right side — rotate 90° CCW
      el.style.transform = 'rotate(-90deg)';
    } else if (idx >= 19 && idx <= 26) {
      // Bottom — normal
    } else if (idx >= 28 && idx <= 35) {
      // Left side — rotate 90° CW
      el.style.transform = 'rotate(90deg)';
    }

    // Color
    if (sq.type === 'city') {
      const grp = COLOR_GROUPS[sq.group];
      el.style.setProperty('--sq-color', grp ? grp.hex : '#ccc');
      el.innerHTML = `
        <div class="sq-color-bar"></div>
        <div class="sq-label">${sq.name}</div>
        <div class="sq-price">₹${sq.price}</div>
        <div class="sq-buildings" id="bld-${sq.id}"></div>
      `;
    } else if (sq.type === 'corner') {
      el.classList.add('sq-corner');
      el.style.setProperty('--sq-color', sq.color);
      el.innerHTML = `<div class="sq-corner-label">${sq.label}</div>`;
      el.style.transform = '';
    } else if (sq.type === 'special') {
      el.classList.add('sq-special');
      el.style.setProperty('--sq-color', sq.color);
      el.innerHTML = `
        <div class="sq-special-icon">${sq.icon}</div>
        <div class="sq-label">${sq.label}</div>
      `;
    }

    el.addEventListener('click', () => onSquareClick(idx));
    wrapper.appendChild(el);
  });

  // Center logo
  const logo = document.createElement('div');
  logo.id = 'board-logo';
  logo.innerHTML = `
    <div class="board-logo-inner">
      <div class="bl-title">Business</div>
      <div class="bl-subtitle">INDIA</div>
      <div class="bl-flag">🇮🇳</div>
    </div>`;
  logo.style.left   = CORNER_SIZE + 'px';
  logo.style.top    = CORNER_SIZE + 'px';
  logo.style.width  = (BOARD_SIZE - 2 * CORNER_SIZE) + 'px';
  logo.style.height = (BOARD_SIZE - 2 * CORNER_SIZE) + 'px';
  wrapper.appendChild(logo);
}

function getSquarePosition(idx) {
  const C = CORNER_SIZE;
  const W = CELL_W;
  const B = BOARD_SIZE;

  // Corners
  if (idx === 0)  return { x: 0,       y: 0,       w: C, h: C }; // TL Start
  if (idx === 9)  return { x: B - C,   y: 0,       w: C, h: C }; // TR Jail
  if (idx === 18) return { x: B - C,   y: B - C,   w: C, h: C }; // BR Club
  if (idx === 27) return { x: 0,       y: B - C,   w: C, h: C }; // BL RestHouse

  // Top side: 1-8, going left→right
  if (idx >= 1 && idx <= 8) {
    const n = idx - 1;
    return { x: C + n * W, y: 0, w: W, h: C };
  }
  // Right side: 10-17, going top→bottom
  if (idx >= 10 && idx <= 17) {
    const n = idx - 10;
    return { x: B - C, y: C + n * W, w: C, h: W };
  }
  // Bottom side: 19-26, going right→left
  if (idx >= 19 && idx <= 26) {
    const n = idx - 19;
    return { x: B - C - (n + 1) * W, y: B - C, w: W, h: C };
  }
  // Left side: 28-35, going bottom→top
  if (idx >= 28 && idx <= 35) {
    const n = idx - 28;
    return { x: 0, y: B - C - (n + 1) * W, w: C, h: W };
  }
  return { x: 0, y: 0, w: C, h: C };
}

function updateTokens(players) {
  // Remove existing tokens
  document.querySelectorAll('.player-token').forEach(t => t.remove());

  const wrapper = document.getElementById('board-overlay');
  const grouped = {};
  players.filter(p => !p.bankrupt).forEach(p => {
    if (!grouped[p.position]) grouped[p.position] = [];
    grouped[p.position].push(p);
  });

  Object.entries(grouped).forEach(([pos, pls]) => {
    const sqPos = getSquarePosition(Number(pos));
    pls.forEach((p, i) => {
      const tok = document.createElement('div');
      tok.className = 'player-token';
      tok.style.background = p.token.hex;
      tok.style.left = (sqPos.x + 5 + i * 14) + 'px';
      tok.style.top  = (sqPos.y + sqPos.h / 2 - 10) + 'px';
      tok.title = p.name;
      wrapper.appendChild(tok);
    });
  });
}

function updateBuildings(players) {
  // Clear all building indicators
  document.querySelectorAll('.sq-buildings').forEach(el => el.innerHTML = '');

  players.forEach(p => {
    Object.entries(p.buildings).forEach(([cid, b]) => {
      const el = document.getElementById('bld-' + cid);
      if (!el) return;
      let html = '';
      if (b.hotels > 0) {
        html = '<span class="bld-hotel">🏨</span>';
      } else {
        for (let i = 0; i < b.houses; i++) html += '<span class="bld-house">🏠</span>';
      }
      el.innerHTML = html;
    });
  });
}

function highlightSquare(idx) {
  document.querySelectorAll('.board-sq').forEach(el => el.classList.remove('sq-highlight'));
  const el = document.querySelector(`.board-sq[data-index="${idx}"]`);
  if (el) el.classList.add('sq-highlight');
}

function onSquareClick(idx) {
  const sq = BOARD_SQUARES[idx];
  if (sq.type === 'city') {
    UI.showPropertyCard(sq);
  }
}
