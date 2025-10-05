# 🧩 Pokemon Generation 1 App

A simple React web application that displays Pokemon from Generation 1 using the PokeAPI. Users can search, filter by type, view paginated lists, and open detail pages for each Pokemon.

## 🚀 Tech Stack

* **React** + **Vite**
* **React Router DOM**
* **Axios** (for API calls)
* **Tailwind CSS** (with custom glassmorphism styling)
* **Lucide Icons / React Icons**
* **PokeAPI** as data source

## 📦 Project Setup

### 1. Clone or extract project

```bash
git clone <repository-url>
cd pokemon-gen1
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Then open the URL printed in your terminal (default: http://localhost:5173).

## 🧠 Features

* ✅ Display Pokemon list (Generation 1)
* 🔍 Search Pokemon by name (with debounce)
* 🎨 Filter by Pokemon type
* 📄 Pagination with dynamic navigation
* 💎 Detail page with stats, types, and abilities
* 🌫️ Glassmorphism UI with smooth transitions

## 🗂️ Folder Structure

```
src/
├── components/
│   ├── core/
│   │   ├── SearchBar.jsx
│   │   ├── TypeFilter.jsx
│   │   ├── Pagination.jsx
│   │   └── LoadingSpinner.jsx
│   └── layouts/
│       └── Navbar.jsx
│
├── hooks/
│   └── useDebounce.js
│
├── pages/
│   ├── Pokemon/
│   │   ├── ListPokemonPage.jsx
│   │   └── DetailPokemonPage.jsx
│   └── Home/
│       └── HomePage.jsx
│
└── main.jsx
```

## 🌐 API Reference

**PokeAPI** — https://pokeapi.co/

Endpoints used:
* `https://pokeapi.co/api/v2/generation/1`
* `https://pokeapi.co/api/v2/pokemon/{id}`
* `https://pokeapi.co/api/v2/type`

## 🧩 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint code with ESLint |

## 🖼️ UI Style

All components use a **glassmorphism** theme:

```css
.glass {
  background: linear-gradient(135deg, rgba(40, 40, 40, 0.45), rgba(20, 20, 20, 0.25));
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(14px) saturate(160%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  border-radius: 16px;
  transition: all 0.3s ease;
}
```

## 🧑‍💻 Author

**Egy Chandra Legita**  
Frontend Developer — passionate about clean UI and efficient React development.

## 📜 License

This project is for educational and portfolio purposes. Data is provided by the public PokeAPI.