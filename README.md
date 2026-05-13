# 🇮🇳 Business India — 3D Web Board Game

A fully playable, browser-based 3D rendition of the classic **Business India** property-trading board game. Built with pure HTML, CSS, and JavaScript — no frameworks, no build tools. Just open `index.html` and play.

---

## 🎮 Features

- **2–4 players** on one device (hot-seat multiplayer)
- **Full 3D board** with CSS perspective + mouse parallax tilt
- **28 Indian cities** across 10 colour groups (Mumbai, Delhi, Kolkata, Goa, Shimla, and more)
- **Complete game rules**: rent, houses, hotels, income tax, wealth tax, chance, lottery
- **Animated dice** rolling
- **Property cards** showing full pricing, rent tiers, build costs & mortgage values
- **Build modal** for constructing houses and hotels
- **Note-based bank** system with denominations: ₹50, ₹100, ₹500, ₹1000, ₹2000, ₹5000, ₹10,000
- **Game over screen** with net-worth leaderboard

---

## 🗂️ Project Structure

```
business-india-3d/
├── index.html          # Entry point
├── css/
│   └── style.css       # All styles (3D board, modals, HUD, splash)
├── js/
│   ├── data.js         # All static data: cities, board layout, bank notes
│   ├── bank.js         # Bank note management
│   ├── player.js       # Player state (cash, properties, buildings)
│   ├── dice.js         # Dice roll + animation
│   ├── game.js         # Core game engine (rules, turns, special squares)
│   ├── board.js        # Board rendering & token positions
│   ├── ui.js           # UI updates, modals, property cards
│   └── main.js         # Entry point, wires everything together
└── README.md
```

---

## 🚀 How to Run

### Option 1 — Open directly
Just double-click `index.html` in your file manager. Works in any modern browser.

### Option 2 — Local dev server (recommended)
```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```
Then open `http://localhost:8080`

### Option 3 — GitHub Pages
1. Push to a GitHub repo
2. Go to **Settings → Pages → Source: main branch / root**
3. Your game will be live at `https://<username>.github.io/<repo>/`

---

## 🃏 Game Rules Summary

| Square | Effect |
|--------|--------|
| **START** (top-left) | Collect ₹1500 each time you pass or land |
| **Jail** (top-right) | Pay ₹500 bail to get out |
| **Club** (bottom-right) | Pay ₹50 entry fee |
| **Rest House** (bottom-left) | Pay ₹100 rest fee |
| **Income Tax** | Pay ₹50 × number of cities you own |
| **Wealth Tax** | Receive ₹50 × number of cities you own |
| **Chance** | Even dice sum → receive ₹500–₹5000; Odd → pay ₹500–₹5000 |
| **Lottery** | 50/50: receive ₹5000 or pay ₹5000 |
| **City (unowned)** | Buy it or skip |
| **City (opponent's)** | Pay rent (higher with houses/hotels) |
| **City (yours)** | Free — optionally build |

### Building
- Own the **full colour group** to build
- Up to **2 houses**, then upgrade to **1 hotel**
- Hotels maximise rent income

### Winning
- Last player not bankrupt wins
- Press **F** to end game early (winner by net worth)

---

## 🎨 Design

- **Theme**: Mughal-meets-modern jewel tones (deep greens, gold, saffron)
- **Fonts**: Cinzel Decorative (display) + Rajdhani (body)
- **3D Effect**: CSS `perspective` + `rotateX/Y` with mouse parallax

---

## 📜 License

MIT — free to use, fork, and modify.
