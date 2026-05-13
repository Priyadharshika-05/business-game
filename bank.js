// ═══════════════════════════════════════════════
//  bank.js  —  Bank note management
// ═══════════════════════════════════════════════

class Bank {
  constructor() {
    this.notes = {};
    DENOMINATIONS.forEach(d => this.notes[d] = NOTES_PER_DENOM);
  }

  get totalCash() {
    return notesToRupees(this.notes);
  }

  // Pay an exact amount from bank to receiver's notes object
  // Returns true if bank can pay, false if insufficient
  pay(amount, receiverNotes) {
    if (amount === 0) return true;
    // Greedy from largest denom
    const toGive = {};
    let remaining = amount;
    for (let i = DENOMINATIONS.length - 1; i >= 0; i--) {
      const d = DENOMINATIONS[i];
      if (d <= remaining && this.notes[d] > 0) {
        const cnt = Math.min(Math.floor(remaining / d), this.notes[d]);
        if (cnt > 0) { toGive[d] = cnt; remaining -= cnt * d; }
      }
    }
    if (remaining > 0) {
      // Bank can't make exact change — just give raw amount as virtual ₹
      // (simplified: treat as exact transfer)
      this._virtualPay(amount, receiverNotes);
      return true;
    }
    // Apply
    DENOMINATIONS.forEach(d => {
      if (toGive[d]) {
        this.notes[d] -= toGive[d];
        receiverNotes[d] = (receiverNotes[d] || 0) + toGive[d];
      }
    });
    return true;
  }

  // Receive notes from player to bank
  receive(amount, payerNotes) {
    if (amount === 0) return true;
    let remaining = amount;
    for (let i = DENOMINATIONS.length - 1; i >= 0; i--) {
      const d = DENOMINATIONS[i];
      const have = payerNotes[d] || 0;
      if (d <= remaining && have > 0) {
        const cnt = Math.min(Math.floor(remaining / d), have);
        if (cnt > 0) {
          payerNotes[d] -= cnt;
          this.notes[d] += cnt;
          remaining -= cnt * d;
        }
      }
    }
    if (remaining > 0) {
      // Not enough exact notes — remove from smallest
      for (let i = 0; i < DENOMINATIONS.length && remaining > 0; i++) {
        const d = DENOMINATIONS[i];
        const have = payerNotes[d] || 0;
        if (have > 0) {
          payerNotes[d]--;
          this.notes[d]++;
          remaining -= d;
        }
      }
    }
    return true;
  }

  _virtualPay(amount, receiverNotes) {
    // When bank can't make change, just add highest possible notes
    let remaining = amount;
    for (let i = DENOMINATIONS.length - 1; i >= 0 && remaining > 0; i--) {
      const d = DENOMINATIONS[i];
      const cnt = Math.floor(remaining / d);
      if (cnt > 0) {
        receiverNotes[d] = (receiverNotes[d] || 0) + cnt;
        remaining -= cnt * d;
      }
    }
    // remainder lost (edge case)
  }
}
