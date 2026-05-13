/* ============================================================
   BUSINESS INDIA — ALL‑IN‑ONE GAME ENGINE
   ------------------------------------------------------------
   • All logic lives in this single file.
   • The file is placed in the repository root (same level as index.html).
   ------------------------------------------------------------ */

/* ============================================================
   1️⃣ CONSTANTS & CONFIGURATION
   ============================================================ */
const DENOMINATIONS = [50, 100, 500, 1000, 2000, 5000, 10000];
const NOTES_PER_DENOM = 14;
const BOARD_SIZE = 700;
const CORNER_SIZE = 90;
const CELL_W = (BOARD_SIZE - 2 * CORNER_SIZE) / 8;
const CELL_H = CORNER_SIZE;
const STARTING_CASH = 74600; // 4 × (50+100+500+1000+2000+5000+10000)
const PASS_START_BONUS = 1500;

/* ============================================================
   2️⃣ TOKENS & COLOR GROUPS
   ============================================================ */
const TOKEN_COLORS = {
    red: { hex: '#e63946', label: 'Red', emoji: '🔴' },
    purple: { hex: '#7b2d8b', label: 'Purple', emoji: '🟣' },
    darkgreen: { hex: '#2d6a4f', label: 'Dark Green', emoji: '🟢' },
    rosepink: { hex: '#f4a0b5', label: 'Rose Pink', emoji: '🌸' },
};

const COLOR_GROUPS = {
    brown: { hex: '#8B4513', name: 'Brown' },
    skyblue: { hex: '#87CEEB', name: 'Sky Blue' },
    pink: { hex: '#FF69B4', name: 'Pink' },
    orange: { hex: '#FF8C00', name: 'Orange' },
    red: { hex: '#DC143C', name: 'Red' },
    yellow: { hex: '#FFD700', name: 'Yellow' },
    green: { hex: '#228B22', name: 'Green' },
    blue: { hex: '#00008B', name: 'Blue' },
    teal: { hex: '#008080', name: 'Teal' },
    violet: { hex: '#8A2BE2', name: 'Violet' },
};

/* ============================================================
   2️⃣ CITY CARDS (the full list you supplied)
   ============================================================ */
const CITY_CARDS = [
    // BROWN
    { id: 'c01', name: 'Patna', state: 'Bihar', group: 'brown', price: 1500, rent: 150, rent1h: 500, rent2h: 900, rent1hotel: 2500, houseCost: 500, hotelCost: 1000, mortgageHouse: 250, mortgageHotel: 500, mortgageCity: 750 },
    { id: 'c02', name: 'Bhopal', state: 'MP', group: 'brown', price: 1800, rent: 180, rent1h: 600, rent2h: 1000, rent1hotel: 2800, houseCost: 500, hotelCost: 1000, mortgageHouse: 250, mortgageHotel: 500, mortgageCity: 900 },
    // SKY BLUE
    { id: 'c03', name: 'Jaipur', state: 'Rajasthan', group: 'skyblue', price: 2200, rent: 220, rent1h: 750, rent2h: 1200, rent1hotel: 3200, houseCost: 700, hotelCost: 1400, mortgageHouse: 350, mortgageHotel: 700, mortgageCity: 1100 },
    { id: 'c04', name: 'Lucknow', state: 'UP', group: 'skyblue', price: 2400, rent: 240, rent1h: 800, rent2h: 1300, rent1hotel: 3500, houseCost: 700, hotelCost: 1400, mortgageHouse: 350, mortgageHotel: 700, mortgageCity: 1200 },
    { id: 'c05', name: 'Kanpur', state: 'UP', group: 'skyblue', price: 2600, rent: 260, rent1h: 900, rent2h: 1500, rent1hotel: 3800, houseCost: 700, hotelCost: 1400, mortgageHouse: 350, mortgageHotel: 700, mortgageCity: 1300 },
    // PINK
    { id: 'c06', name: 'Surat', state: 'Gujarat', group: 'pink', price: 3000, rent: 300, rent1h: 1000, rent2h: 1800, rent1hotel: 4500, houseCost: 1000, hotelCost: 2000, mortgageHouse: 500, mortgageHotel: 1000, mortgageCity: 1500 },
    { id: 'c07', name: 'Nagpur', state: 'Maharashtra', group: 'pink', price: 3200, rent: 320, rent1h: 1100, rent2h: 1900, rent1hotel: 4800, houseCost: 1000, hotelCost: 2000, mortgageHouse: 500, mortgageHotel: 1000, mortgageCity: 1600 },
    // ORANGE
    { id: 'c08', name: 'Ahmedabad', state: 'Gujarat', group: 'orange', price: 3600, rent: 360, rent1h: 1200, rent2h: 2200, rent1hotel: 5500, houseCost: 1200, hotelCost: 2400, mortgageHouse: 600, mortgageHotel: 1200, mortgageCity: 1800 },
    { id: 'c09', name: 'Pune', state: 'Maharashtra', group: 'orange', price: 3800, rent: 380, rent1h: 1300, rent2h: 2400, rent1hotel: 5800, houseCost: 1200, hotelCost: 2400, mortgageHouse: 600, mortgageHotel: 1200, mortgageCity: 1900 },
    { id: 'c10', name: 'Indore', state: 'MP', group: 'orange', price: 4000, rent: 400, rent1h: 1400, rent2h: 2600, rent1hotel: 6200, houseCost: 1200, hotelCost: 2400, mortgageHouse: 600, mortgageHotel: 1200, mortgageCity: 2000 },
    // RED
    { id: 'c11', name: 'Kochi', state: 'Kerala', group: 'red', price: 4500, rent: 450, rent1h: 1600, rent2h: 2800, rent1hotel: 6800, houseCost: 1500, hotelCost: 3000, mortgageHouse: 750, mortgageHotel: 1500, mortgageCity: 2250 },
    { id: 'c12', name: 'Coimbatore', state: 'TN', group: 'red', price: 4800, rent: 480, rent1h: 1700, rent2h: 3000, rent1hotel: 7200, houseCost: 1500, hotelCost: 3000, mortgageHouse: 750, mortgageHotel: 1500, mortgageCity: 2400 },
    // YELLOW
    { id: 'c13', name: 'Hyderabad', state: 'Telangana', group: 'yellow', price: 5200, rent: 520, rent1h: 1900, rent2h: 3400, rent1hotel: 8000, houseCost: 1800, hotelCost: 3600, mortgageHouse: 900, mortgageHotel: 1800, mortgageCity: 2600 },
    { id: 'c14', name: 'Chennai', state: 'TN', group: 'yellow', price: 5600, rent: 560, rent1h: 2100, rent2h: 3800, rent1hotel: 8600, houseCost: 1800, hotelCost: 3600, mortgageHouse: 900, mortgageHotel: 1800, mortgageCity: 2800 },
    { id: 'c15', name: 'Bangalore', state: 'Karnataka', group: 'yellow', price: 6000, rent: 600, rent1h: 2300, rent2h: 4200, rent1hotel: 9200, houseCost: 1800, hotelCost: 3600, mortgageHouse: 900, mortgageHotel: 1800, mortgageCity: 3000 },
    // GREEN
    { id: 'c16', name: 'Kolkata', state: 'WB', group: 'green', price: 6500, rent: 650, rent1h: 2600, rent2h: 4800, rent1hotel: 10000, houseCost: 2000, hotelCost: 4000, mortgageHouse: 1000, mortgageHotel: 2000, mortgageCity: 3250 },
    { id: 'c17', name: 'Visakhapatnam', state: 'AP', group: 'green', price: 7000, rent: 700, rent1h: 2800, rent2h: 5200, rent1hotel: 10500, houseCost: 2000, hotelCost: 4000, mortgageHouse: 1000, mortgageHotel: 2000, mortgageCity: 3500 },
    // BLUE
    { id: 'c18', name: 'Delhi', state: 'Delhi', group: 'blue', price: 8000, rent: 800, rent1h: 3200, rent2h: 6000, rent1hotel: 12000, houseCost: 2500, hotelCost: 5000, mortgageHouse: 1250, mortgageHotel: 2500, mortgageCity: 4000 },
    { id: 'c19', name: 'Mumbai', state: 'Maharashtra', group: 'blue', price: 9000, rent: 900, rent1h: 3600, rent2h: 7000, rent1hotel: 14000, houseCost: 2500, hotelCost: 5000, mortgageHouse: 1250, mortgageHotel: 2500, mortgageCity: 4500 },
    // TEAL
    { id: 'c20', name: 'Varanasi', state: 'UP', group: 'teal', price: 7500, rent: 750, rent1h: 3000, rent2h: 5500, rent1hotel: 11000, houseCost: 2200, hotelCost: 4400, mortgageHouse: 1100, mortgageHotel: 2200, mortgageCity: 3750 },
    { id: 'c21', name: 'Amritsar', state: 'Punjab', group: 'teal', price: 7800, rent: 780, rent1h: 3100, rent2h: 5700, rent1hotel: 11500, houseCost: 2200, hotelCost: 4400, mortgageHouse: 1100, mortgageHotel: 2200, mortgageCity: 3900 },
    { id: 'c22', name: 'Chandigarh', state: 'Punjab', group: 'teal', price: 8200, rent: 820, rent1h: 3300, rent2h: 6200, rent1hotel: 12500, houseCost: 2200, hotelCost: 4400, mortgageHouse: 1100, mortgageHotel: 2200, mortgageCity: 4100 },
    // VIOLET
    { id: 'c23', name: 'Goa', state: 'Goa', group: 'violet', price: 9500, rent: 950, rent1h: 3800, rent2h: 7500, rent1hotel: 15000, houseCost: 3000, hotelCost: 6000, mortgageHouse: 1500, mortgageHotel: 3000, mortgageCity: 4750 },
    { id: 'c24', name: 'Shimla', state: 'HP', group: 'violet', price: 10000, rent: 1000, rent1h: 4000, rent2h: 8000, rent1hotel: 16000, houseCost: 3000, hotelCost: 6000, mortgageHouse: 1500, mortgageHotel: 3000, mortgageCity: 5000 },
    { id: 'c25', name: 'Mysuru', state: 'Karnataka', group: 'violet', price: 10500, rent: 1050, rent1h: 4200, rent2h: 8500, rent1hotel: 17000, houseCost: 3000, hotelCost: 6000, mortgageHouse: 1500, mortgageHotel: 3000, mortgageCity: 5250 },
    // EXTRA CITIES (to fill the board)
    { id: 'c26', name: 'Ranchi', state: 'Jharkhand', group: 'brown', price: 1600, rent: 160, rent1h: 550, rent2h: 950, rent1hotel: 2600, houseCost: 500, hotelCost: 1000, mortgageHouse: 250, mortgageHotel: 500, mortgageCity: 800 },
    { id: 'c27', name: 'Jodhpur', state: 'Rajasthan', group: 'skyblue', price: 2300, rent: 230, rent1h: 780, rent2h: 1250, rent1hotel: 3350, houseCost: 700, hotelCost: 1400, mortgageHouse: 350, mortgageHotel: 700, mortgageCity: 1150 },
    { id: 'c28', name: 'Madurai', state: 'TN', group: 'red', price: 4600, rent: 460, rent1h: 1650, rent2h: 2900, rent1hotel: 7000, houseCost: 1500, hotelCost: 3000, mortgageHouse: 750, mortgageHotel: 1500, mortgageCity: 2300 },
];

/* ============================================================
   3️⃣ BOARD LAYOUT
   ============================================================ */
function buildBoardSquares() {
    const sq = new Array(36);

    // Corners
    sq[0] = { type: 'corner', key: 'start', label: 'START', color: '#f4c430' };
    sq[9] = { type: 'corner', key: 'jail', label: 'JAIL', color: '#ff6b6b' };
    sq[18] = { type: 'corner', key: 'club', label: 'CLUB', color: '#a8e6cf' };
    sq[27] = { type: 'corner', key: 'resthouse', label: 'REST HOUSE', color: '#ffd3b6' };

    // Specials (one per side)
    sq[4] = { type: 'special', key: 'income_tax', label: 'Income Tax', color: '#ff9999', icon: '📋' };
    sq[13] = { type: 'special', key: 'chance', label: 'Chance', color: '#ffe599', icon: '🎰' };
    sq[22] = { type: 'special', key: 'wealth_tax', label: 'Wealth Tax', color: '#b4edb4', icon: '💰' };
    sq[31] = { type: 'special', key: 'lottery', label: 'Lottery', color: '#cfe2f3', icon: '🎟️' };

    // Fill remaining slots with cities
    let ci = 0;
    for (let i = 0; i < 36; i++) {
        if (!sq[i]) {
            const c = CITY_CARDS[ci++];
            sq[i] = { type: 'city', ...c };
        }
    }
    return sq;
}
const BOARD_SQUARES = buildBoardSquares();

/* ============================================================
   4️⃣ UTILITY FUNCTIONS
   ============================================================ */
function notesToRupees(notes) {
    return DENOMINATIONS.reduce((sum, d) => sum + (notes[d] || 0) * d, 0);
}

function getSquarePosition(idx) {
    const C = CORNER_SIZE;
    const W = CELL_W;
    const B = BOARD_SIZE;

    if (idx === 0) return { x: 0, y: 0, w: C, h: C };
    if (idx === 9) return { x: B - C, y: 0, w: C, h: C };
    if (idx === 18) return { x: B - C, y: B - C, w: C, h: C };
    if (idx === 27) return { x: 0, y: B - C, w: C, h: C };

    if (idx >= 1 && idx <= 8) {
        const n = idx - 1;
        return { x: C + n * W, y: 0, w: W, h: C };
    }
    if (idx >= 10 && idx <= 17) {
        const n = idx - 10;
        return { x: B - C, y: C + n * W, w: C, h: W };
    }
    if (idx >= 19 && idx <= 26) {
        const n = idx - 19;
        return { x: B - C - (n + 1) * W, y: B - C, w: W, h: C };
    }
    if (idx >= 28 && idx <= 35) {
        const n = idx - 28;
        return { x: 0, y: B - C - (n + 1) * W, w: C, h: W };
    }

    return { x: 0, y: 0, w: C, h: C };
}

/* ============================================================
   5️⃣ DICE HELPERS
   ============================================================ */
const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']; // placeholder – actual faces are generated by rollDie()
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}
function rollDice() {
    const d1 = rollDie();
    const d2 = rollDie();
    return { d1, d2, sum: d1 + d2, isEven: (d1 + d2) % 2 === 0 };
}
function dieFace(val) {
    // map 1‑6 → face emojis (simple approach)
    const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return faces[val - 1];
}
function animateDice(d1El, d2El, v1, v2, onDone) {
    let ticks = 0;
    const max = 14;
    const interval = setInterval(() => {
        d1El.textContent = dieFace(rollDie());
        d2El.textContent = dieFace(rollDie());
        ticks++;
        if (ticks >= max) {
            clearInterval(interval);
            d1El.textContent = dieFace(v1);
            d2El.textContent = dieFace(v2);
            if (onDone) onDone();
        }
    }, 80);
}

/* ============================================================
   6️⃣ BANK CLASS
   ============================================================ */
class Bank {
    constructor() {
        this.notes = {};
        DENOMINATIONS.forEach(d => (this.notes[d] = NOTES_PER_DENOM));
    }
    get totalCash() {
        return notesToRupees(this.notes);
    }
    pay(amount, receiverNotes) {
        if (amount === 0) return true;
        const toGive = {};
        let remain = amount;
        for (let i = DENOMINATIONS.length - 1; i >= 0; i--) {
            const d = DENOMINATIONS[i];
            if (d <= remain && this.notes[d] > 0) {
                const cnt = Math.min(Math.floor(remain / d), this.notes[d]);
                if (cnt > 0) {
                    toGive[d] = cnt;
                    remain -= cnt * d;
                }
            }
        }
        if (remain > 0) {
            this._virtualPay(amount, receiverNotes);
            return true;
        }
        DENOMINATIONS.forEach(d => {
            if (toGive[d]) {
                this.notes[d] -= toGive[d];
                receiverNotes[d] = (receiverNotes[d] || 0) + toGive[d];
            }
        });
        return true;
    }
    receive(amount, giverNotes) {
        if (amount === 0) return true;
        let remain = amount;
        for (let i = DENOMINATIONS.length - 1; i >= 0; i--) {
            const d = DENOMINATIONS[i];
            const have = giverNotes[d] || 0;
            if (d <= remain && have > 0) {
                const cnt = Math.min(Math.floor(remain / d), have);
                if (cnt > 0) {
                    giverNotes[d] -= cnt;
                    this.notes[d] += cnt;
                    remain -= cnt * d;
                }
            }
        }
        if (remain > 0) {
            for (let i = 0; i < DENOMINATIONS.length && remain; i++) {
                const d = DENOMINATIONS[i];
                if (giverNotes[d]) {
                    giverNotes[d]--;
                    this.notes[d]++;
                    remain -= d;
                }
            }
        }
        return true;
    }
    _virtualPay(amount, rec) {
        let remain = amount;
        for (let i = DENOMINATIONS.length - 1; i >= 0 && remain > 0; i--) {
            const d = DENOMINATIONS[i];
            const cnt = Math.floor(remain / d);
            if (cnt > 0) {
                rec[d] = (rec[d] || 0) + cnt;
                remain -= cnt * d;
            }
        }
    }
}

/* ============================================================
   7️⃣ PLAYER CLASS
   ============================================================ */
class Player {
    constructor(id, name, tokenKey) {
        this.id = id;
        this.name = name;
        this.tokenKey = tokenKey;
        this.token = TOKEN_COLORS[tokenKey];
        this.position = 0; // board square index
        this.notes = {}; // denomination → count
        this.properties = []; // city ids owned
        this.buildings = {}; // cityId → { houses: 0‑2, hotels: 0‑1 }
        this.bankrupt = false;
    }
    get cash() {
        return notesToRupees(this.notes);
    }
    get netWorth() {
        let worth = this.cash;
        this.properties.forEach(cid => {
            const city = CITY_CARDS.find(c => c.id === cid);
            if (city) {
                worth += city.mortgageCity;
                const b = this.buildings[cid];
                if (b) {
                    worth += b.houses * city.mortgageHouse;
                    worth += b.hotels * city.mortgageHotel;
                }
            }
        });
        return worth;
    }
    ownsFullGroup(groupKey) {
        const group = CITY_CARDS.filter(c => c.group === groupKey);
        return group.every(c => this.properties.includes(c.id));
    }
    currentRent(cityId) {
        const city = CITY_CARDS.find(c => c.id === cityId);
        if (!city) return 0;
        const b = this.buildings[cityId];
        if (!b || (b.houses === 0 && b.hotels === 0)) return city.rent;
        if (b.hotels >= 1) return city.rent1hotel;
        if (b.houses >= 2) return city.rent2h;
        if (b.houses >= 1) return city.rent1h;
        return city.rent;
    }
    canBuild(cityId) {
        const city = CITY_CARDS.find(c => c.id === cityId);
        if (!city) return false;
        if (!this.properties.includes(cityId)) return false;
        if (!this.ownsFullGroup(city.group)) return false;
        const b = this.buildings[cityId] || { houses: 0, hotels: 0 };
        return b.hotels === 0 && (b.houses < 2 || b.hotels < 1);
    }
    buildHouse(cityId, bank) {
        const city = CITY_CARDS.find(c => c.id === cityId);
        if (!city) return false;
        if (!this.buildings[cityId]) this.buildings[cityId] = { houses: 0, hotels: 0 };
        const b = this.buildings[cityId];
        if (b.houses >= 2 || b.hotels >= 1) return false;
        if (this.cash < city.houseCost) return false;
        bank.receive(city.houseCost, this.notes);
        b.houses++;
        return true;
    }
    buildHotel(cityId, bank) {
        const city = CITY_CARDS.find(c => c.id === cityId);
        if (!city) return false;
        if (!this.buildings[cityId]) this.buildings[cityId] = { houses: 0, hotels: 0 };
        const b = this.buildings[cityId];
        if (b.hotels >= 1) return false;
        if (this.cash < city.hotelCost) return false;
        bank.receive(city.hotelCost, this.notes);
        b.hotels = 1;
        b.houses = 0;
        return true;
    }
    declareBankruptcy() {
        this.bankrupt = true;
    }
}

/* ============================================================
   8️⃣ GAME CLASS
   ============================================================ */
class Game {
    constructor(playerDefs) {
        this.bank = new Bank();
        this.players = playerDefs.map((p, i) => new Player(i, p.name, p.token));
        this.currentPlayerIndex = 0;
        this.phase = 'roll'; // roll | action | endturn | ended
        this.lastDice = null;
        this.pendingSquare = null;
        this.log = []; // for UI messages
        this.players.forEach(p => this.bank.pay(STARTING_CASH, p.notes));
    }
    get currentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
    get activePlayers() {
        return this.players.filter(p => !p.bankrupt);
    }

    // ---------- ROLL ----------
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

    _movePlayer(p, steps) {
        const prev = p.position;
        p.position = (p.position + steps) % 36;
        if (p.position < prev || (prev !== 0 && p.position === 0)) {
            this.bank.pay(PASS_START_BONUS, p.notes);
            this._logMsg(`${p.name} passed START! +₹${PASS_START_BONUS}`);
        }
    }

    _applySquare(p, dice) {
        const sq = BOARD_SQUARES[p.position];
        this.pendingSquare = sq;
        if (sq.type === 'corner') this._handleCorner(p, sq);
        else if (sq.type === 'city') this._handleCity(p, sq);
        else if (sq.type === 'special') this._handleSpecial(p, sq, dice);
    }

    _handleCorner(p, sq) {
        if (sq.key === 'start') {
            this.bank.pay(PASS_START_BONUS, p.notes);
            this._logMsg(`${p.name} landed on START! +₹${PASS_START_BONUS}`);
        } else if (sq.key === 'jail') {
            const fine = 500;
            this._logMsg(`${p.name} landed on JAIL! Pay ₹${fine} bail.`);
            const ok = this._playerPay(p, fine, null);
            if (!ok) this._checkBankruptcy(p);
        } else if (sq.key === 'club') {
            const fine = 50;
            this._logMsg(`${p.name} landed on CLUB! Pay ₹${fine}.`);
            const ok = this._playerPay(p, fine, null);
            if (!ok) this._checkBankruptcy(p);
        } else if (sq.key === 'resthouse') {
            const fine = 100;
            this._logMsg(`${p.name} landed on REST HOUSE! Pay ₹${fine}.`);
            const ok = this._playerPay(p, fine, null);
            if (!ok) this._checkBankruptcy(p);
        }
        this.phase = 'endturn';
    }

    _handleCity(p, sq) {
        const owner = this.players.find(pl => pl.properties.includes(sq.id) && !pl.bankrupt);
        if (!owner) {
            this._logMsg(`${p.name} landed on ${sq.name}. Price: ₹${sq.price}`);
            this.phase = 'buy';
        } else if (owner.id === p.id) {
            this._logMsg(`${p.name} is on their own property: ${sq.name}`);
            this.phase = 'endturn';
        } else {
            const rent = owner.currentRent(sq.id);
            this._logMsg(`${p.name} must pay ₹${rent} rent to ${owner.name} for ${sq.name}`);
            const ok = this._playerPay(p, rent, owner);
            if (!ok) this._checkBankruptcy(p);
            this.phase = 'endturn';
        }
    }

    _handleSpecial(p, sq, dice) {
        if (sq.key === 'income_tax') {
            const fine = p.properties.length * 50;
            this._logMsg(`${p.name} hit Income Tax! ${p.properties.length} cities × ₹50 = ₹${fine}`);
            if (fine) {
                const ok = this._playerPay(p, fine, null);
                if (!ok) this._checkBankruptcy(p);
            }
        } else if (sq.key === 'wealth_tax') {
            const gain = p.properties.length * 50;
            this._logMsg(`${p.name} hit Wealth Tax! Receives ₹${gain} from bank.`);
            if (gain) this.bank.pay(gain, p.notes);
        } else if (sq.key === 'chance') {
            const amount = (Math.floor(Math.random() * 10) + 1) * 500;
            if (dice.isEven) {
                this._logMsg(`${p.name} hit Chance (even roll)! Receives ₹${amount} from bank.`);
                this.bank.pay(amount, p.notes);
            } else {
                this._logMsg(`${p.name} hit Chance (odd roll)! Pays ₹${amount} to bank.`);
                const ok = this._playerPay(p, amount, null);
                if (!ok) this._checkBankruptcy(p);
            }
        } else if (sq.key === 'lottery') {
            const lucky = Math.random() < 0.5;
            if (lucky) {
                this._logMsg(`${p.name} hit Lottery! 🎉 Wins ₹5000 from bank!`);
                this.bank.pay(5000, p.notes);
            } else {
                this._logMsg(`${p.name} hit Lottery! 😬 Pays ₹5000 to bank.`);
                const ok = this._playerPay(p, 5000, null);
                if (!ok) this._checkBankruptcy(p);
            }
        }
        this.phase = 'endturn';
    }

    _playerPay(payer, amount, payee) {
        if (payer.cash < amount) {
            if (payee) {
                this.bank.receive(payer.cash, payer.notes);
                this.bank.pay(payer.cash, payee.notes);
            } else {
                this.bank.receive(payer.cash, payer.notes);
            }
            return false;
        }
        if (payee) {
            this.bank.receive(amount, payer.notes);
            this.bank.pay(amount, payee.notes);
        } else {
            this.bank.receive(amount, payer.notes);
        }
        return true;
    }

    _checkBankruptcy(p) {
        if (p.cash <= 0) {
            p.declareBankruptcy();
            this._logMsg(`💸 ${p.name} is BANKRUPT!`);
            p.properties = [];
            p.buildings = {};
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
        }
    }

    // ---------- BUY ----------
    buyProperty() {
        if (this.phase !== 'buy') return false;
        const player = this.currentPlayer;
        const sq = this.pendingSquare;
        if (!sq || sq.type !== 'city') return false;
        if (player.cash < sq.price) {
            this._logMsg(`${player.name} can\'t afford ${sq.name} (₹${sq.price})`);
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

    // ---------- END TURN ----------
    endTurn() {
        if (this.phase !== 'endturn') return;
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

    // ---------- FORFEIT ----------
    forfeit() {
        this.phase = 'ended';
        const ranked = this.activePlayers.sort((a, b) => b.netWorth - a.netWorth);
        if (!ranked.length) {
            this._logMsg('Game ended — no players left.');
        } else if (ranked[0].netWorth !== (ranked[1] ? ranked[1].netWorth : -1)) {
            this._logMsg(`🏆 ${ranked[0].name} wins by net worth: ₹${ranked[0].netWorth}`);
        } else {
            this._logMsg('🤝 Draw! Tied net worth.');
        }
    }

    // ---------- LOGGING ----------
    _logMsg(msg) {
        this.log.unshift({ msg, time: new Date().toLocaleTimeString() });
        if (this.log.length > 50) this.log.pop();
    }
}

/* ============================================================
   9️⃣ UI MODULE
   ============================================================ */
const UI = {
    updateHUD(game) {
        const hud = document.getElementById('hud-players');
        hud.innerHTML = game.players
            .map(p => `
            <div class="hud-player ${p.bankrupt ? 'bankrupt' : ''} ${p.id === game.currentPlayerIndex ? 'active-player' : ''}">
                <div class="hud-token" style="background:${p.token.hex}"></div>
                <div class="hud-info">
                    <div class="hud-name">${p.name}</div>
                    <div class="hud-cash">₹${p.cash.toLocaleString('en-IN')}</div>
                    <div class="hud-props">${p.properties.length} 🏙️</div>
                </div>
                ${p.bankrupt ? '<div class="bankrupt-badge">BANKRUPT</div>' : ''}
            </div>`)
            .join('');
    },

    updateActionPanel(game) {
        const cp = game.currentPlayer;
        document.getElementById('cp-token').style.background = cp.token.hex;
        document.getElementById('cp-name').textContent = cp.name;
        document.getElementById('cp-cash').textContent = '₹' + cp.cash.toLocaleString('en-IN');

        const rollBtn = document.getElementById('roll-btn');
        const buyBtn = document.getElementById('buy-btn');
        const buildBtn = document.getElementById('build-btn');
        const endTurnBtn = document.getElementById('end-turn-btn');

        rollBtn.classList.toggle('hidden', game.phase !== 'roll');
        endTurnBtn.classList.toggle('hidden', game.phase !== 'endturn');

        const showBuy = game.phase === 'buy';
        buyBtn.classList.toggle('hidden', !showBuy);
        if (showBuy && game.pendingSquare) {
            buyBtn.textContent = `Buy ${game.pendingSquare.name} ₹${game.pendingSquare.price}`;
            buyBtn.disabled = cp.cash < game.pendingSquare.price;
        }

        const canBuildAny = game.phase === 'endturn' && cp.properties.some(cid => cp.canBuild(cid));
        buildBtn.classList.toggle('hidden', !canBuildAny);

        if (game.lastDice) {
            document.getElementById('dice-sum').textContent = `Sum: ${game.lastDice.sum} (${game.lastDice.isEven ? 'Even' : 'Odd'})`;
        } else {
            document.getElementById('dice-sum').textContent = '';
        }
    },

    updateLog(game) {
        const el = document.getElementById('message-log');
        el.innerHTML = game.log.slice(0, 6).map((e, i) => `<div class="log-entry ${i === 0 ? 'log-latest' : ''}">${e.msg}</div>`).join('');
    },

    showPropertyCard(sq, owner) {
        const modal = document.getElementById('property-modal');
        const grp = COLOR_GROUPS[sq.group];
        const ownerName = owner || 'Unowned';
        document.getElementById('modal-card-content').innerHTML = `
            <div class="city-card" style="--card-color:${grp ? grp.hex : '#ccc'}">
                <div class="card-header">
                    <div class="card-color-bar"></div>
                    <div class="card-city-name">${sq.name}</div>
                    <div class="card-state">${sq.state}</div>
                </div>
                <div class="card-body">
                    <div class="card-price-row"><span>Price</span><span>₹${sq.price.toLocaleString('en-IN')}</span></div>
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
                    <div class="card-owner">Owner: <strong>${ownerName}</strong></div>
                </div>
            </div>`;
        modal.classList.remove('hidden');
    },

    hidePropertyCard() {
        document.getElementById('property-modal').classList.add('hidden');
    },

    showBuildModal(game) {
        const cp = game.currentPlayer;
        const buildable = cp.properties.filter(cid => cp.canBuild(cid));
        if (!buildable.length) return;
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
                        <div class="build-item" style="border-left:4px solid ${grp.hex}">
                            <div class="build-city-name">${city.name}</div>
                            <div class="build-current">Current: ${b.hotels ? '🏨 Hotel' : b.houses > 0 ? '🏠'.repeat(b.houses) : 'None'}</div>
                            <div class="build-actions">
                                <button class="build-action-btn" onclick="UI.doBuild('${cid}','house')" ${canHouse ? '' : 'disabled'}> 🏠 Build House (₹${city.houseCost}) </button>
                                <button class="build-action-btn" onclick="UI.doBuild('${cid}','hotel')" ${canHotel ? '' : 'disabled'}> 🏨 Build Hotel (₹${city.hotelCost}) </button>
                            </div>
                        </div>`;
                }).join('')}
            </div>
            <button class="primary-btn" onclick="UI.hideBuildModal()">Done</button>
        `;
        modal.classList.remove('hidden');
    },

    doBuild(cityId, type) {
        if (!window._game) return;
        const cp = window._game.currentPlayer;
        let ok = false;
        if (type === 'house') ok = cp.buildHouse(cityId, window._game.bank);
        if (type === 'hotel') ok = cp.buildHotel(cityId, window._game.bank);
        if (ok) {
            const city = CITY_CARDS.find(c => c.id === cityId);
            window._game._logMsg(`${cp.name} built a ${type} on ${city.name}!`);
            updateBuildings(window._game.players);
            UI.hideBuildModal();
            UI.updateHUD(window._game);
            UI.updateActionPanel(window._game);
            UI.updateLog(window._game);
            if (cp.properties.some(cid => cp.canBuild(cid))) {
                setTimeout(() => UI.showBuildModal(window._game), 300);
            }
        }
    },

    hideBuildModal() {
        document.getElementById('build-modal').classList.add('hidden');
    },

    showGameOver(game) {
        const modal = document.getElementById('gameover-modal');
        modal.classList.remove('hidden');
        const ranked = [...game.players].sort((a, b) => b.netWorth - a.netWorth);
        const title = document.getElementById('gameover-title');
        const body = document.getElementById('gameover-body');
        const winner = ranked[0];
        title.textContent = winner && !winner.bankrupt ? `🏆 ${winner.name} Wins!` : '🤝 Game Over — Draw!';
        body.innerHTML = `
            <table class="go-table">
                <thead>
                    <tr><th>Rank</th><th>Player</th><th>Cash</th><th>Properties</th><th>Net Worth</th></tr>
                </thead>
                <tbody>
                    ${ranked.map((p, i) => `
                        <tr class="${p.bankrupt ? 'go-bankrupt' : ''}">
                            <td>${i + 1}</td>
                            <td><span class="go-token" style="background:${p.token.hex}"></span>${p.name}</td>
                            <td>₹${p.cash.toLocaleString('en-IN')}</td>
                            <td>${p.properties.length}</td>
                            <td>₹${p.netWorth.toLocaleString('en-IN')}</td>
                        </tr>`).join('')
                </tbody>
            </table>
        `;
    },

    renderPlayerSetup(count) {
        const container = document.getElementById('player-setup-rows');
        const used = new Set();
        container.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const row = document.createElement('div');
            row.className = 'player-setup-row';
            const opts = Object.entries(TOKEN_COLORS)
                .filter(([k]) => !used.has(k))
                .map(([k, v]) => `<option value="${k}">${v.emoji} ${v.label}</option>`)
                .join('');
            row.innerHTML = `
                <div class="psr-label">Player ${i + 1}</div>
                <input type="text" class="psr-name" placeholder="Name" value="Player ${i + 1}" maxlength="16" />
                <select class="psr-token">${opts}</select>`;
            container.appendChild(row);
            const sel = row.querySelector('.psr-token');
            used.add(sel.value);
            sel.addEventListener('change', () => UI.renderPlayerSetup(count));
        }
    },

    getPlayerDefs() {
        const rows = document.querySelectorAll('.player-setup-row');
        return Array.from(rows).map(r => ({
            name: r.querySelector('.psr-name').value.trim() || 'Player',
            token: r.querySelector('.psr-token').value,
        }));
    },
};

/* ============================================================
   10️⃣ BOARD RENDERING HELPERS
   ============================================================ */
function renderBoard(game) {
    const overlay = document.getElementById('board-overlay');
    overlay.innerHTML = '';

    BOARD_SQUARES.forEach((sq, idx) => {
        const el = document.createElement('div');
        el.className = 'board-sq';
        el.dataset.index = idx;
        const pos = getSquarePosition(idx);
        el.style.left = pos.x + 'px';
        el.style.top = pos.y + 'px';
        el.style.width = pos.w + 'px';
        el.style.height = pos.h + 'px';

        if (idx >= 1 && idx <= 8) el.style.transform = 'rotate(180deg)';
        else if (idx >= 10 && idx <= 17) el.style.transform = 'rotate(-90deg)';
        else if (idx >= 28 && idx <= 35) el.style.transform = 'rotate(90deg)';

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
        } else if (sq.type === 'special') {
            el.classList.add('sq-special');
            el.style.setProperty('--sq-color', sq.color);
            el.innerHTML = `
                <div class="sq-special-icon">${sq.icon}</div>
                <div class="sq-label">${sq.label}</div>
            `;
        }

        el.addEventListener('click', () => onSquareClick(idx));
        overlay.appendChild(el);
    });

    // Logo in centre
    const logo = document.createElement('div');
    logo.id = 'board-logo';
    logo.innerHTML = `
        <div class="board-logo-inner">
            <div class="bl-title">Business</div>
            <div class="bl-subtitle">INDIA</div>
            <div class="bl-flag">🇮🇳</div>
        </div>`;
    logo.style.left = CORNER_SIZE + 'px';
    logo.style.top = CORNER_SIZE + 'px';
    logo.style.width = (BOARD_SIZE - 2 * CORNER_SIZE) + 'px';
    logo.style.height = (BOARD_SIZE - 2 * CORNER_SIZE) + 'px';
    overlay.appendChild(logo);
}

/* ============================================================
   11️⃣ TOKEN & BUILDING UPDATE HELPERS
   ============================================================ */
function updateTokens(players) {
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
            tok.style.top = (sqPos.y + sqPos.h / 2 - 10) + 'px';
            tok.title = p.name;
            wrapper.appendChild(tok);
        });
    });
}

function updateBuildings(players) {
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

/* ============================================================
   12️⃣ SQUARE INTERACTION & BOARD HIGHLIGHTING
   ============================================================ */
function highlightSquare(idx) {
    document.querySelectorAll('.board-sq').forEach(el => el.classList.remove('sq-highlight'));
    const el = document.querySelector(`.board-sq[data-index="${idx}"]`);
    if (el) el.classList.add('sq-highlight');
}

function onSquareClick(idx) {
    const sq = BOARD_SQUARES[idx];
    if (sq && sq.type === 'city') UI.showPropertyCard(sq);
}

/* ============================================================
   13️⃣ MAIN INITIALISATION & EVENT LISTENERS
   ============================================================ */
let _game = null;
window._game = null;

document.addEventListener('DOMContentLoaded', () => {
    let playerCount = 2;
    UI.renderPlayerSetup(playerCount);

    document.querySelectorAll('.count-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            playerCount = parseInt(btn.dataset.count);
            UI.renderPlayerSetup(playerCount);
        });
    });

    document.getElementById('start-game-btn').addEventListener('click', () => {
        startGame(UI.getPlayerDefs());
    });

    document.getElementById('modal-backdrop').addEventListener('click', UI.hidePropertyCard);
    document.getElementById('build-backdrop').addEventListener('click', UI.hideBuildModal);
});

/* ============================================================
   14️⃣ GAME START
   ============================================================ */
function startGame(playerDefs) {
    _game = new Game(playerDefs);
    window._game = _game;

    document.getElementById('splash-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');

    renderBoard(_game);
    updateTokens(_game.players);
    updateBuildings(_game.players);

    // Action button listeners
    document.getElementById('roll-btn').addEventListener('click', handleRoll);
    document.getElementById('buy-btn').addEventListener('click', handleBuy);
    document.getElementById('build-btn').addEventListener('click', () => UI.showBuildModal(_game));
    document.getElementById('end-turn-btn').addEventListener('click', handleEndTurn);

    // Keyboard shortcut – press "F" to forfeit
    document.addEventListener('keydown', e => {
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

/* ============================================================
   15️⃣ ACTION HANDLERS
   ============================================================ */
function handleRoll() {
    if (!_game || _game.phase !== 'roll') return;
    const rollBtn = document.getElementById('roll-btn');
    rollBtn.disabled = true;
    const d1El = document.getElementById('die1');
    const d2El = document.getElementById('die2');
    const dice = rollDice();
    _game.lastDice = dice;
    animateDice(d1El, d2El, dice.d1, dice.d2, () => {
        rollBtn.disabled = false;
        _game.lastDice = dice;
        _game._movePlayer(_game.currentPlayer, dice.sum);
        _game._logMsg(`${_game.currentPlayer.name} rolled ${dice.d1}+${dice.d2}=${dice.sum}`);
        _game.phase = 'action';
        _game._applySquare(_game.currentPlayer, dice);
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
        _game.buyProperty();
        fullUpdate();
        const sq = _game.pendingSquare;
        if (sq) {
            const owner = _game.players.find(p => p.properties.includes(sq.id));
            UI.showPropertyCard(sq, owner ? owner.name : '');
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

/* ============================================================
   16️⃣ FULL UI REFRESH
   ============================================================ */
function fullUpdate() {
    if (!_game) return;
    UI.updateHUD(_game);
    UI.updateActionPanel(_game);
    UI.updateLog(_game);
    updateTokens(_game.players);
    updateBuildings(_game.players);
}

/* ============================================================
   17️⃣ BOARD PERSPECTIVE (mouse‑drag 3‑D effect)
   ============================================================ */
function applyBoardPerspective() {
    const wrapper = document.getElementById('board-wrapper');
    wrapper.style.perspective = '1200px';
    const overlay = document.getElementById('board-overlay');
    overlay.style.transform = 'rotateX(18deg) rotateY(0deg) rotateZ(-1deg)';
    overlay.style.transition = 'transform 0.4s ease';
    wrapper.addEventListener('mousemove', e => {
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

/* ============================================================
   18️⃣ END OF FILE
   ============================================================ */