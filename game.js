// ═══════════════════════════════════════════════
//  game.js  —  Core game engine
// ═══════════════════════════════════════════════

class Game {
  constructor(playerDefs) {
    this.bank = new Bank();
    this.players = playerDefs.map((p, i) => new Player(i, p.name, p.token));
    this.currentPlayerIndex = 0;
    this.phase = 'roll'; // roll | action | ended
    this.lastDice = null;
    this.pendingSquare = null;
    this.log = [];

    // Give starting cash from bank
    this.players.forEach(p => {
      this.bank.pay(STARTING_CASH, p.notes);
    });
  }

  get currentPlayer() { return this.players[this.currentPlayerIndex]; }

  get activePlayers() { return this.players.filter(p => !p.bankrupt); }

  // ── Roll phase ────────────────────────────────
  roll() {
    if (this.phase !== 'roll') return null;
    const dice = rollDice();
    this.lastDice = dice;
    this._movePlayer(this.currentPlayer, dice.sum);
    this._logMsg(`${this.currentPlayer.name} rolled ${dice.d1}+${dice.d2}=${dice.sum}`);
    this.phase = 'action';
    this._applySquare(this.currentPlayer, dice);
    return dice;
  }

  _movePlayer(player, steps) {
    const prev = player.position;
    player.position = (player.position + steps) % 36;
    // Passed or landed on START (index 0)
    if (player.position < prev || (prev !== 0 && player.position === 0)) {
      // passed start
      this.bank.pay(PASS_START_BONUS, player.notes);
      this._logMsg(`${player.name} passed START! +₹${PASS_START_BONUS}`);
    }
  }

  _applySquare(player, dice) {
    const sq = BOARD_SQUARES[player.position];
    this.pendingSquare = sq;

    if (sq.type === 'corner') {
      this._handleCorner(player, sq);
    } else if (sq.type === 'city') {
      this._handleCity(player, sq);
    } else if (sq.type === 'special') {
      this._handleSpecial(player, sq, dice);
    }
  }

  _handleCorner(player, sq) {
    if (sq.key === 'start') {
      // Landed on start exactly
      this.bank.pay(PASS_START_BONUS, player.notes);
      this._logMsg(`${player.name} landed on START! +₹${PASS_START_BONUS}`);
    } else if (sq.key === 'jail') {
      const fine = 500;
      this._logMsg(`${player.name} landed on JAIL! Pay ₹${fine} bail.`);
      const paid = this._playerPay(player, fine, null); // pay bank
      if (!paid) this._checkBankruptcy(player);
    } else if (sq.key === 'club') {
      const fine = 50;
      this._logMsg(`${player.name} landed on CLUB! Pay ₹${fine}.`);
      const paid = this._playerPay(player, fine, null);
      if (!paid) this._checkBankruptcy(player);
    } else if (sq.key === 'resthouse') {
      const fine = 100;
      this._logMsg(`${player.name} landed on REST HOUSE! Pay ₹${fine}.`);
      const paid = this._playerPay(player, fine, null);
      if (!paid) this._checkBankruptcy(player);
    }
    this.phase = 'endturn';
  }

  _handleCity(player, sq) {
    const owner = this.players.find(p => p.properties.includes(sq.id) && !p.bankrupt);
    if (!owner) {
      // Unowned: offer to buy
      this._logMsg(`${player.name} landed on ${sq.name}. Price: ₹${sq.price}`);
      this.phase = 'buy';
    } else if (owner.id === player.id) {
      this._logMsg(`${player.name} is on their own property: ${sq.name}`);
      this.phase = 'endturn';
    } else {
      // Pay rent
      const rent = owner.currentRent(sq.id);
      this._logMsg(`${player.name} must pay ₹${rent} rent to ${owner.name} for ${sq.name}`);
      const paid = this._playerPay(player, rent, owner);
      if (!paid) this._checkBankruptcy(player);
      this.phase = 'endturn';
    }
  }

  _handleSpecial(player, sq, dice) {
    if (sq.key === 'income_tax') {
      const fine = player.properties.length * 50;
      this._logMsg(`${player.name} hit Income Tax! ${player.properties.length} cities × ₹50 = ₹${fine}`);
      if (fine > 0) {
        const paid = this._playerPay(player, fine, null);
        if (!paid) this._checkBankruptcy(player);
      }
    } else if (sq.key === 'wealth_tax') {
      const gain = player.properties.length * 50;
      this._logMsg(`${player.name} hit Wealth Tax! Receives ₹${gain} from bank.`);
      if (gain > 0) this.bank.pay(gain, player.notes);
    } else if (sq.key === 'chance') {
      const amount = (Math.floor(Math.random() * 10) + 1) * 500; // 500-5000
      if (dice.isEven) {
        this._logMsg(`${player.name} hit Chance (even roll)! Receives ₹${amount} from bank.`);
        this.bank.pay(amount, player.notes);
      } else {
        this._logMsg(`${player.name} hit Chance (odd roll)! Pays ₹${amount} to bank.`);
        const paid = this._playerPay(player, amount, null);
        if (!paid) this._checkBankruptcy(player);
      }
    } else if (sq.key === 'lottery') {
      const lucky = Math.random() < 0.5;
      if (lucky) {
        this._logMsg(`${player.name} hit Lottery! 🎉 Wins ₹5000 from bank!`);
        this.bank.pay(5000, player.notes);
      } else {
        this._logMsg(`${player.name} hit Lottery! 😬 Pays ₹5000 to bank.`);
        const paid = this._playerPay(player, 5000, null);
        if (!paid) this._checkBankruptcy(player);
      }
    }
    this.phase = 'endturn';
  }

  // Returns false if player can't afford
  _playerPay(player, amount, toPlayer) {
    if (player.cash < amount) {
      // Pay what they can
      if (toPlayer) {
        this.bank.receive(player.cash, player.notes); // take all from player via bank as intermediary
        this.bank.pay(player.cash, toPlayer.notes);
      } else {
        this.bank.receive(player.cash, player.notes);
      }
      return false;
    }
    if (toPlayer) {
      this.bank.receive(amount, player.notes);
      this.bank.pay(amount, toPlayer.notes);
    } else {
      this.bank.receive(amount, player.notes);
    }
    return true;
  }

  _checkBankruptcy(player) {
    if (player.cash <= 0) {
      player.declareBankruptcy();
      this._logMsg(`💸 ${player.name} is BANKRUPT!`);
      // Return properties to bank (others can buy them)
      player.properties = [];
      player.buildings = {};
    }
    this._checkWin();
  }

  _checkWin() {
    const active = this.activePlayers;
    if (active.length <= 1) {
      this.phase = 'ended';
      const winner = active[0];
      if (winner) {
        this._logMsg(`🏆 ${winner.name} WINS the game!`);
      } else {
        this._logMsg('🤝 It\'s a draw!');
      }
      return true;
    }
    return false;
  }

  // ── Buy action ────────────────────────────────
  buyProperty() {
    if (this.phase !== 'buy') return false;
    const player = this.currentPlayer;
    const sq = this.pendingSquare;
    if (!sq || sq.type !== 'city') return false;
    if (player.cash < sq.price) {
      this._logMsg(`${player.name} can't afford ${sq.name} (₹${sq.price})`);
      this.phase = 'endturn';
      return false;
    }
    this.bank.receive(sq.price, player.notes);
    player.properties.push(sq.id);
    this._logMsg(`${player.name} bought ${sq.name} for ₹${sq.price}!`);
    this.phase = 'endturn';
    return true;
  }

  skipBuy() {
    this.phase = 'endturn';
  }

  // ── End turn ──────────────────────────────────
  endTurn() {
    if (this.phase !== 'endturn') return;
    // Advance to next active player
    let next = (this.currentPlayerIndex + 1) % this.players.length;
    let tries = 0;
    while (this.players[next].bankrupt && tries < this.players.length) {
      next = (next + 1) % this.players.length;
      tries++;
    }
    this.currentPlayerIndex = next;
    this.phase = 'roll';
    this.pendingSquare = null;
    this.lastDice = null;
  }

  // ── Forfeit (end game early) ──────────────────
  forfeit() {
    // Determine winner by net worth
    this.phase = 'ended';
    const ranked = this.activePlayers.sort((a, b) => b.netWorth - a.netWorth);
    if (ranked.length === 0) {
      this._logMsg('Game ended — no players left.');
    } else if (ranked.length === 1 || ranked[0].netWorth !== ranked[1].netWorth) {
      this._logMsg(`🏆 ${ranked[0].name} wins by net worth: ₹${ranked[0].netWorth}`);
    } else {
      this._logMsg('🤝 Draw! Tied net worth.');
    }
  }

  _logMsg(msg) {
    this.log.unshift({ msg, time: new Date().toLocaleTimeString() });
    if (this.log.length > 50) this.log.pop();
  }
}
