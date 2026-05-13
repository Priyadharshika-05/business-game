// ═══════════════════════════════════════════════
//  ui.js  —  UI updates and modals
// ═══════════════════════════════════════════════

const UI = {

  // ── HUD ───────────────────────────────────────
  updateHUD(game) {
    const hud = document.getElementById('hud-players');
    hud.innerHTML = game.players.map(p => `
      <div class="hud-player ${p.bankrupt ? 'bankrupt' : ''} ${p.id === game.currentPlayerIndex ? 'active-player' : ''}">
        <div class="hud-token" style="background:${p.token.hex}"></div>
        <div class="hud-info">
          <div class="hud-name">${p.name}</div>
          <div class="hud-cash">₹${p.cash.toLocaleString('en-IN')}</div>
          <div class="hud-props">${p.properties.length} 🏙️</div>
        </div>
        ${p.bankrupt ? '<div class="bankrupt-badge">BANKRUPT</div>' : ''}
      </div>
    `).join('');
  },

  // ── Action Panel ──────────────────────────────
  updateActionPanel(game) {
    const cp = game.currentPlayer;
    document.getElementById('cp-token').style.background = cp.token.hex;
    document.getElementById('cp-name').textContent = cp.name;
    document.getElementById('cp-cash').textContent = '₹' + cp.cash.toLocaleString('en-IN');

    const rollBtn    = document.getElementById('roll-btn');
    const buyBtn     = document.getElementById('buy-btn');
    const buildBtn   = document.getElementById('build-btn');
    const endTurnBtn = document.getElementById('end-turn-btn');

    rollBtn.classList.toggle('hidden', game.phase !== 'roll');
    endTurnBtn.classList.toggle('hidden', game.phase !== 'endturn');

    // Buy button
    const showBuy = game.phase === 'buy';
    buyBtn.classList.toggle('hidden', !showBuy);
    if (showBuy && game.pendingSquare) {
      buyBtn.textContent = `Buy ${game.pendingSquare.name} ₹${game.pendingSquare.price}`;
      // Check affordability
      buyBtn.disabled = cp.cash < game.pendingSquare.price;
    }

    // Build button — show in endturn if player owns full group anywhere
    const canBuildAny = game.phase === 'endturn' && cp.properties.some(cid => cp.canBuild(cid));
    buildBtn.classList.toggle('hidden', !canBuildAny);

    // Dice display
    if (game.lastDice) {
      document.getElementById('dice-sum').textContent = `Sum: ${game.lastDice.sum} (${game.lastDice.isEven ? 'Even' : 'Odd'})`;
    } else {
      document.getElementById('dice-sum').textContent = '';
    }
  },

  // ── Message Log ───────────────────────────────
  updateLog(game) {
    const el = document.getElementById('message-log');
    el.innerHTML = game.log.slice(0, 6).map((entry, i) => `
      <div class="log-entry ${i === 0 ? 'log-latest' : ''}">${entry.msg}</div>
    `).join('');
  },

  // ── Property Card Modal ───────────────────────
  showPropertyCard(sq, ownerName) {
    const modal = document.getElementById('property-modal');
    const grp = COLOR_GROUPS[sq.group];
    const owner = ownerName || 'Unowned';
    document.getElementById('modal-card-content').innerHTML = `
      <div class="city-card" style="--card-color:${grp ? grp.hex : '#ccc'}">
        <div class="card-header">
          <div class="card-color-bar"></div>
          <div class="card-city-name">${sq.name}</div>
          <div class="card-state">${sq.state}</div>
        </div>
        <div class="card-body">
          <div class="card-price-row">
            <span>Price</span><span>₹${sq.price.toLocaleString('en-IN')}</span>
          </div>
          <hr/>
          <div class="card-section-title">RENT</div>
          <div class="card-row"><span>No buildings</span><span>₹${sq.rent}</span></div>
          <div class="card-row"><span>1 House</span><span>₹${sq.rent1h}</span></div>
          <div class="card-row"><span>2 Houses</span><span>₹${sq.rent2h}</span></div>
          <div class="card-row"><span>1 Hotel</span><span>₹${sq.rent1hotel}</span></div>
          <hr/>
          <div class="card-section-title">BUILD COST</div>
          <div class="card-row"><span>House</span><span>₹${sq.houseCost}</span></div>
          <div class="card-row"><span>Hotel</span><span>₹${sq.hotelCost}</span></div>
          <hr/>
          <div class="card-section-title">MORTGAGE</div>
          <div class="card-row"><span>House</span><span>₹${sq.mortgageHouse}</span></div>
          <div class="card-row"><span>Hotel</span><span>₹${sq.mortgageHotel}</span></div>
          <div class="card-row"><span>City</span><span>₹${sq.mortgageCity}</span></div>
          <hr/>
          <div class="card-owner">Owner: <strong>${owner}</strong></div>
        </div>
      </div>
    `;
    modal.classList.remove('hidden');
  },

  hidePropertyCard() {
    document.getElementById('property-modal').classList.add('hidden');
  },

  // ── Build Modal ───────────────────────────────
  showBuildModal(game) {
    const cp = game.currentPlayer;
    const buildable = cp.properties.filter(cid => cp.canBuild(cid));
    if (buildable.length === 0) return;

    const modal = document.getElementById('build-modal');
    const inner = document.getElementById('build-modal-inner');
    inner.innerHTML = `
      <h2>Build on Your Properties</h2>
      <p>You can build where you own the full colour group.</p>
      <div class="build-list">
        ${buildable.map(cid => {
          const city = CITY_CARDS.find(c => c.id === cid);
          const b = cp.buildings[cid] || { houses: 0, hotels: 0 };
          const grp = COLOR_GROUPS[city.group];
          const canHouse = b.houses < 2 && b.hotels === 0 && cp.cash >= city.houseCost;
          const canHotel = b.houses >= 1 && b.hotels === 0 && cp.cash >= city.hotelCost;
          return `
            <div class="build-item" style="border-left: 4px solid ${grp.hex}">
              <div class="build-city-name">${city.name}</div>
              <div class="build-current">Current: ${b.hotels > 0 ? '🏨 Hotel' : b.houses > 0 ? '🏠'.repeat(b.houses) : 'None'}</div>
              <div class="build-actions">
                <button class="build-action-btn" onclick="UI.doBuild('${cid}','house')" ${canHouse ? '' : 'disabled'}>
                  🏠 Build House (₹${city.houseCost})
                </button>
                <button class="build-action-btn" onclick="UI.doBuild('${cid}','hotel')" ${canHotel ? '' : 'disabled'}>
                  🏨 Build Hotel (₹${city.hotelCost})
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <button class="primary-btn" onclick="UI.hideBuildModal()">Done</button>
    `;
    modal.classList.remove('hidden');
  },

  doBuild(cityId, type) {
    if (!window._game) return;
    const cp = window._game.currentPlayer;
    let success = false;
    if (type === 'house') success = cp.buildHouse(cityId, window._game.bank);
    if (type === 'hotel') success = cp.buildHotel(cityId, window._game.bank);
    if (success) {
      const city = CITY_CARDS.find(c => c.id === cityId);
      window._game._logMsg(`${cp.name} built a ${type} on ${city.name}!`);
      updateBuildings(window._game.players);
      UI.hideBuildModal();
      UI.updateHUD(window._game);
      UI.updateActionPanel(window._game);
      UI.updateLog(window._game);
      // Re-open if still can build
      if (cp.properties.some(cid => cp.canBuild(cid))) {
        setTimeout(() => UI.showBuildModal(window._game), 300);
      }
    }
  },

  hideBuildModal() {
    document.getElementById('build-modal').classList.add('hidden');
  },

  // ── Game Over Modal ───────────────────────────
  showGameOver(game) {
    const modal = document.getElementById('gameover-modal');
    modal.classList.remove('hidden');

    const ranked = [...game.players].sort((a, b) => b.netWorth - a.netWorth);
    const title = document.getElementById('gameover-title');
    const body  = document.getElementById('gameover-body');

    const winner = ranked[0];
    if (!winner.bankrupt) {
      title.textContent = `🏆 ${winner.name} Wins!`;
    } else {
      title.textContent = '🤝 Game Over — Draw!';
    }

    body.innerHTML = `
      <table class="go-table">
        <thead><tr><th>Rank</th><th>Player</th><th>Cash</th><th>Properties</th><th>Net Worth</th></tr></thead>
        <tbody>
          ${ranked.map((p, i) => `
            <tr class="${p.bankrupt ? 'go-bankrupt' : ''}">
              <td>${i + 1}</td>
              <td><span class="go-token" style="background:${p.token.hex}"></span>${p.name}</td>
              <td>₹${p.cash.toLocaleString('en-IN')}</td>
              <td>${p.properties.length}</td>
              <td>₹${p.netWorth.toLocaleString('en-IN')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  },

  // ── Player Setup Rows ─────────────────────────
  renderPlayerSetup(count) {
    const container = document.getElementById('player-setup-rows');
    const usedTokens = new Set();
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const row = document.createElement('div');
      row.className = 'player-setup-row';

      const availableTokens = Object.entries(TOKEN_COLORS)
        .filter(([k]) => !usedTokens.has(k))
        .map(([k, v]) => `<option value="${k}">${v.emoji} ${v.label}</option>`)
        .join('');

      row.innerHTML = `
        <div class="psr-label">Player ${i + 1}</div>
        <input type="text" class="psr-name" placeholder="Name" value="Player ${i + 1}" maxlength="16"/>
        <select class="psr-token">${availableTokens}</select>
      `;
      container.appendChild(row);

      // Track selections
      const sel = row.querySelector('.psr-token');
      usedTokens.add(sel.value);
      sel.addEventListener('change', () => {
        // Re-render to prevent duplicate tokens
        UI.renderPlayerSetup(count);
        // Restore typed names
      });
    }
  },

  getPlayerDefs() {
    const rows = document.querySelectorAll('.player-setup-row');
    return Array.from(rows).map(row => ({
      name:  row.querySelector('.psr-name').value.trim() || 'Player',
      token: row.querySelector('.psr-token').value,
    }));
  },
};
