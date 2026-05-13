// ═══════════════════════════════════════════════
//  data.js  —  All static game data
// ═══════════════════════════════════════════════

const DENOMINATIONS = [50, 100, 500, 1000, 2000, 5000, 10000];
const NOTES_PER_DENOM = 14;

const TOKEN_COLORS = {
  red:       { hex: '#e63946', label: 'Red',        emoji: '🔴' },
  purple:    { hex: '#7b2d8b', label: 'Purple',     emoji: '🟣' },
  darkgreen: { hex: '#2d6a4f', label: 'Dark Green', emoji: '🟢' },
  rosepink:  { hex: '#f4a0b5', label: 'Rose Pink',  emoji: '🌸' },
};

// Color groups for cities
const COLOR_GROUPS = {
  brown:    { hex: '#8B4513', name: 'Brown' },
  skyblue:  { hex: '#87CEEB', name: 'Sky Blue' },
  pink:     { hex: '#FF69B4', name: 'Pink' },
  orange:   { hex: '#FF8C00', name: 'Orange' },
  red:      { hex: '#DC143C', name: 'Red' },
  yellow:   { hex: '#FFD700', name: 'Yellow' },
  green:    { hex: '#228B22', name: 'Green' },
  blue:     { hex: '#00008B', name: 'Blue' },
  teal:     { hex: '#008080', name: 'Teal' },
  violet:   { hex: '#8A2BE2', name: 'Violet' },
};

// ── City Cards ──────────────────────────────────
// Fields: id, name, state, group, price, rent, rent1h, rent2h, rent1hotel,
//         houseCost, hotelCost, mortgageHouse, mortgageHotel, mortgageCity
const CITY_CARDS = [
  // BROWN (cheapest)
  { id:'c01', name:'Patna',       state:'Bihar',       group:'brown',   price:1500, rent:150,  rent1h:500,  rent2h:900,  rent1hotel:2500, houseCost:500,  hotelCost:1000, mortgageHouse:250,  mortgageHotel:500,  mortgageCity:750  },
  { id:'c02', name:'Bhopal',      state:'MP',          group:'brown',   price:1800, rent:180,  rent1h:600,  rent2h:1000, rent1hotel:2800, houseCost:500,  hotelCost:1000, mortgageHouse:250,  mortgageHotel:500,  mortgageCity:900  },

  // SKY BLUE
  { id:'c03', name:'Jaipur',      state:'Rajasthan',   group:'skyblue', price:2200, rent:220,  rent1h:750,  rent2h:1200, rent1hotel:3200, houseCost:700,  hotelCost:1400, mortgageHouse:350,  mortgageHotel:700,  mortgageCity:1100 },
  { id:'c04', name:'Lucknow',     state:'UP',          group:'skyblue', price:2400, rent:240,  rent1h:800,  rent2h:1300, rent1hotel:3500, houseCost:700,  hotelCost:1400, mortgageHouse:350,  mortgageHotel:700,  mortgageCity:1200 },
  { id:'c05', name:'Kanpur',      state:'UP',          group:'skyblue', price:2600, rent:260,  rent1h:900,  rent2h:1500, rent1hotel:3800, houseCost:700,  hotelCost:1400, mortgageHouse:350,  mortgageHotel:700,  mortgageCity:1300 },

  // PINK
  { id:'c06', name:'Surat',       state:'Gujarat',     group:'pink',    price:3000, rent:300,  rent1h:1000, rent2h:1800, rent1hotel:4500, houseCost:1000, hotelCost:2000, mortgageHouse:500,  mortgageHotel:1000, mortgageCity:1500 },
  { id:'c07', name:'Nagpur',      state:'Maharashtra', group:'pink',    price:3200, rent:320,  rent1h:1100, rent2h:1900, rent1hotel:4800, houseCost:1000, hotelCost:2000, mortgageHouse:500,  mortgageHotel:1000, mortgageCity:1600 },

  // ORANGE
  { id:'c08', name:'Ahmedabad',   state:'Gujarat',     group:'orange',  price:3600, rent:360,  rent1h:1200, rent2h:2200, rent1hotel:5500, houseCost:1200, hotelCost:2400, mortgageHouse:600,  mortgageHotel:1200, mortgageCity:1800 },
  { id:'c09', name:'Pune',        state:'Maharashtra', group:'orange',  price:3800, rent:380,  rent1h:1300, rent2h:2400, rent1hotel:5800, houseCost:1200, hotelCost:2400, mortgageHouse:600,  mortgageHotel:1200, mortgageCity:1900 },
  { id:'c10', name:'Indore',      state:'MP',          group:'orange',  price:4000, rent:400,  rent1h:1400, rent2h:2600, rent1hotel:6200, houseCost:1200, hotelCost:2400, mortgageHouse:600,  mortgageHotel:1200, mortgageCity:2000 },

  // RED
  { id:'c11', name:'Kochi',       state:'Kerala',      group:'red',     price:4500, rent:450,  rent1h:1600, rent2h:2800, rent1hotel:6800, houseCost:1500, hotelCost:3000, mortgageHouse:750,  mortgageHotel:1500, mortgageCity:2250 },
  { id:'c12', name:'Coimbatore',  state:'TN',          group:'red',     price:4800, rent:480,  rent1h:1700, rent2h:3000, rent1hotel:7200, houseCost:1500, hotelCost:3000, mortgageHouse:750,  mortgageHotel:1500, mortgageCity:2400 },

  // YELLOW
  { id:'c13', name:'Hyderabad',   state:'Telangana',   group:'yellow',  price:5200, rent:520,  rent1h:1900, rent2h:3400, rent1hotel:8000, houseCost:1800, hotelCost:3600, mortgageHouse:900,  mortgageHotel:1800, mortgageCity:2600 },
  { id:'c14', name:'Chennai',     state:'TN',          group:'yellow',  price:5600, rent:560,  rent1h:2100, rent2h:3800, rent1hotel:8600, houseCost:1800, hotelCost:3600, mortgageHouse:900,  mortgageHotel:1800, mortgageCity:2800 },
  { id:'c15', name:'Bangalore',   state:'Karnataka',   group:'yellow',  price:6000, rent:600,  rent1h:2300, rent2h:4200, rent1hotel:9200, houseCost:1800, hotelCost:3600, mortgageHouse:900,  mortgageHotel:1800, mortgageCity:3000 },

  // GREEN
  { id:'c16', name:'Kolkata',     state:'WB',          group:'green',   price:6500, rent:650,  rent1h:2600, rent2h:4800, rent1hotel:10000,houseCost:2000, hotelCost:4000, mortgageHouse:1000, mortgageHotel:2000, mortgageCity:3250 },
  { id:'c17', name:'Visakhapatnam',state:'AP',         group:'green',   price:7000, rent:700,  rent1h:2800, rent2h:5200, rent1hotel:10500,houseCost:2000, hotelCost:4000, mortgageHouse:1000, mortgageHotel:2000, mortgageCity:3500 },

  // BLUE
  { id:'c18', name:'Delhi',       state:'Delhi',       group:'blue',    price:8000, rent:800,  rent1h:3200, rent2h:6000, rent1hotel:12000,houseCost:2500, hotelCost:5000, mortgageHouse:1250, mortgageHotel:2500, mortgageCity:4000 },
  { id:'c19', name:'Mumbai',      state:'Maharashtra', group:'blue',    price:9000, rent:900,  rent1h:3600, rent2h:7000, rent1hotel:14000,houseCost:2500, hotelCost:5000, mortgageHouse:1250, mortgageHotel:2500, mortgageCity:4500 },

  // TEAL
  { id:'c20', name:'Varanasi',    state:'UP',          group:'teal',    price:7500, rent:750,  rent1h:3000, rent2h:5500, rent1hotel:11000,houseCost:2200, hotelCost:4400, mortgageHouse:1100, mortgageHotel:2200, mortgageCity:3750 },
  { id:'c21', name:'Amritsar',    state:'Punjab',      group:'teal',    price:7800, rent:780,  rent1h:3100, rent2h:5700, rent1hotel:11500,houseCost:2200, hotelCost:4400, mortgageHouse:1100, mortgageHotel:2200, mortgageCity:3900 },
  { id:'c22', name:'Chandigarh',  state:'Punjab',      group:'teal',    price:8200, rent:820,  rent1h:3300, rent2h:6200, rent1hotel:12500,houseCost:2200, hotelCost:4400, mortgageHouse:1100, mortgageHotel:2200, mortgageCity:4100 },

  // VIOLET (most expensive)
  { id:'c23', name:'Goa',         state:'Goa',         group:'violet',  price:9500, rent:950,  rent1h:3800, rent2h:7500, rent1hotel:15000,houseCost:3000, hotelCost:6000, mortgageHouse:1500, mortgageHotel:3000, mortgageCity:4750 },
  { id:'c24', name:'Shimla',      state:'HP',          group:'violet',  price:10000,rent:1000, rent1h:4000, rent2h:8000, rent1hotel:16000,houseCost:3000, hotelCost:6000, mortgageHouse:1500, mortgageHotel:3000, mortgageCity:5000 },
  { id:'c25', name:'Mysuru',      state:'Karnataka',   group:'violet',  price:10500,rent:1050, rent1h:4200, rent2h:8500, rent1hotel:17000,houseCost:3000, hotelCost:6000, mortgageHouse:1500, mortgageHotel:3000, mortgageCity:5250 },
  // extra two to fill board
  { id:'c26', name:'Ranchi',      state:'Jharkhand',   group:'brown',   price:1600, rent:160,  rent1h:550,  rent2h:950,  rent1hotel:2600, houseCost:500,  hotelCost:1000, mortgageHouse:250,  mortgageHotel:500,  mortgageCity:800  },
  { id:'c27', name:'Jodhpur',     state:'Rajasthan',   group:'skyblue', price:2300, rent:230,  rent1h:780,  rent2h:1250, rent1hotel:3350, houseCost:700,  hotelCost:1400, mortgageHouse:350,  mortgageHotel:700,  mortgageCity:1150 },
  { id:'c28', name:'Madurai',     state:'TN',          group:'red',     price:4600, rent:460,  rent1h:1650, rent2h:2900, rent1hotel:7000, houseCost:1500, hotelCost:3000, mortgageHouse:750,  mortgageHotel:1500, mortgageCity:2300 },
];

// ── Board Layout ─────────────────────────────────
// 36 squares total: 4 corners + 32 edge squares (8 per side, 4 sides)
// corners at indices 0 (Start/TL), 9 (Jail/TR), 18 (Club/BR), 27 (RestHouse/BL)
// Side order: Top(0→9), Right(9→18), Bottom(18→27), Left(27→36→0)

function buildBoardSquares() {
  // We'll define 28 city slots + 4 corners + 4 special squares = 36
  // Distribute: each side has 8 squares between two corners
  // Specials per side: income tax, wealth tax, chance, lottery (one per side)
  // Cities fill the rest

  // City assignment (28 cities to 28 city slots)
  const cities = [...CITY_CARDS];

  // Build sides clockwise: top, right, bottom, left
  // Each side: [corner, c, c, special, c, c, c, c, corner]
  //  but corners are shared → side inner = 8 squares
  // Index layout: 0=Start, 1-8=top-side, 9=Jail, 10-17=right-side, 18=Club, 19-26=bottom-side, 27=RestHouse, 28-35=left-side

  const sq = new Array(36);

  // Corners
  sq[0]  = { type:'corner', key:'start',     label:'START',     color:'#f4c430' };
  sq[9]  = { type:'corner', key:'jail',      label:'JAIL',      color:'#ff6b6b' };
  sq[18] = { type:'corner', key:'club',      label:'CLUB',      color:'#a8e6cf' };
  sq[27] = { type:'corner', key:'resthouse', label:'REST HOUSE',color:'#ffd3b6' };

  // Specials placement (one per side, at midpoint of each side)
  // Top side: index 4 (midpoint between 0 and 9)
  sq[4]  = { type:'special', key:'income_tax',  label:'Income Tax',  color:'#ff9999', icon:'📋' };
  // Right side: index 13
  sq[13] = { type:'special', key:'chance',      label:'Chance',      color:'#ffe599', icon:'🎰' };
  // Bottom side: index 22
  sq[22] = { type:'special', key:'wealth_tax',  label:'Wealth Tax',  color:'#b4edb4', icon:'💰' };
  // Left side: index 31
  sq[31] = { type:'special', key:'lottery',     label:'Lottery',     color:'#cfe2f3', icon:'🎟️' };

  // Fill cities into remaining city slots
  let ci = 0;
  for (let i = 0; i < 36; i++) {
    if (!sq[i]) {
      const c = cities[ci++];
      sq[i] = { type:'city', ...c };
    }
  }

  return sq;
}

const BOARD_SQUARES = buildBoardSquares();

// Starting cash: 4 notes of each denomination
function getStartingCash() {
  const notes = {};
  DENOMINATIONS.forEach(d => notes[d] = 4);
  return notes;
}

function notesToRupees(notes) {
  return DENOMINATIONS.reduce((sum, d) => sum + (notes[d] || 0) * d, 0);
}

const STARTING_CASH = notesToRupees(getStartingCash()); // Should be 4*(50+100+500+1000+2000+5000+10000) = 4*18650 = 74600

const PASS_START_BONUS = 1500;
