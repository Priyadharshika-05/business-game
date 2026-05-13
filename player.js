// ═══════════════════════════════════════════════
//  player.js  —  Player state
// ═══════════════════════════════════════════════

class Player {
  constructor(id, name, tokenKey) {
    this.id = id;
    this.name = name;
    this.tokenKey = tokenKey;
    this.token = TOKEN_COLORS[tokenKey];
    this.position = 0;       // board square index
    this.notes = {};
    DENOMINATIONS.forEach(d => this.notes[d] = 0);
    this.properties = [];    // array of city ids
    this.buildings = {};     // cityId -> { houses: 0-2, hotels: 0-1 }
    this.bankrupt = false;
    this.inJail = false;
    this.jailTurns = 0;
  }

  get cash() { return notesToRupees(this.notes); }

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
    // Can build if < 2 houses or < 1 hotel
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
    b.hotels = 1; b.houses = 0;
    return true;
  }

  declareBankruptcy() {
    this.bankrupt = true;
  }
}
