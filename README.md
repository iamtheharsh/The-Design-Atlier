# The Design Atelier — Bespoke Architecture & Interior Design

An award-winning editorial interactive portfolio for **The Design Atelier**, a premium luxury interior design studio based in Mumbai. Built with a focus on immersive motion systems, typography mask reveals, and smooth scrolling aesthetics to mimic high-end architectural magazines (like *Architectural Digest* and *Awwwards* nominees).

---

## 🎨 Visual Brand Identity
The application incorporates a curated, high-contrast cool modern color palette designed to evoke architectural precision and warmth:
* **Background Primary**: White (`#FFFFFF`) — clean editorial canvas.
* **Background Secondary**: Pale Blue (`#EEF3F9`) — structural layout breaks.
* **Text Headings / Dark sections**: Deep Slate (`#253545`) — premium high-contrast base.
* **Body Text**: Muted Slate (`#4B5E70`) — optimal reading comfort.
* **Accents / Details**: Soft Blue (`#96B6D7`) — active indicators, highlights, and custom cursor trail.
* **Borders / Dividers**: Warm Ivory (`#F7F4EF`) — soft contrast lines.

---

## 🚀 Key Interactive Features

### 1. Advanced Motion Systems
* **Global Smooth Inertial Scroll**: Integrated using **Lenis**, synced directly to **GSAP ScrollTrigger** coordinates to eliminate rendering lag and layout thrashing.
* **Lag-Free Custom Cursor**: Built with GSAP `quickSetter` + LERP positioning, replacing heavy React render updates with hardware-accelerated movements.
* **Process Progress Timeline**: A scroll-scrubbed GSAP animation where the connector path dynamically grows as you scroll. Automatically adapts to horizontal scaling on desktop and vertical scaling on mobile viewports.
* **Parallax Depth Effects**: Smooth scroll-linked image scaling in the **Hero** section and vertical parallax translation (`yPercent: -15 to 15`) inside **Portfolio** cards.
* **Architectural Block Wipes**: Custom `clip-path` masks and sliding borders for the **Philosophy** and **Founder** sections, revealing media cleanly on scroll.
* **Staggered Reveals**: Seamless fade-and-rise entrance timelines for team members, client testimonials, and expertise service cards.
* **Framer Motion Layouts**: Spring-animated drawer menu, cross-fade slide transitions for client stories, and fluid height expands for the FAQ accordions.

### 2. Studio Sections
* **Hero Banner**: Large cinematic parallax background cover and mask-based headline reveal.
* **Why Us**: Live counter statistic tallies that trigger dynamically when scrolled into view.
* **Bespoke Services**: Clean, structured grid details highlighting design expertise.
* **Manifesto**: The core design values of the studio.
* **Founder's Corner**: Message and signature from the Creative Director.
* **Design Collective**: The team grid highlighting lead architects and designers.
* **Interactive FAQs**: Fluid accordion panel expansions for common consulting queries.
* **Contact & WhatsApp integration**: Clean lead generation form housed in a modern card container alongside instant messaging WhatsApp/Call action buttons.

---

## 🛠️ Technology Stack
* **Framework**: React 19 + Vite (Fast HMR compilation)
* **Styling**: Modern Vanilla CSS (with CSS Custom Properties)
* **Animation & Motion**:
  - GSAP (GreenSock Animation Platform)
  - GSAP ScrollTrigger
  - Lenis Smooth Scroll
  - Framer Motion

---

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/iamtheharsh/The-Design-Atlier.git
   cd The-Design-Atlier
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser to view the application.

4. Build the production bundle:
   ```bash
   npm run build
   ```
   This compiles and optimizes all assets, saving the static outputs into the `dist/` directory.

---

## 📂 Project Structure
```text
├── public/                 # Static assets (images, logos, icons)
│   ├── brand_assets/       # Premium studio logo variations
│   └── images/             # Organized photo folders (Kitchen, Living Room, Bedroom, Team, etc.)
├── src/
│   ├── assets/             # Internal React icons and defaults
│   ├── components/         # Modular portfolio page sections
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Services.jsx
│   │   ├── ContactForm.jsx
│   │   └── ...
│   ├── hooks/              # Custom React hooks (scroll intersections)
│   ├── App.jsx             # App layout wrapper (Lenis & GSAP scaffold)
│   ├── index.css           # Global typography, colors, and layout designs
│   └── main.jsx            # React mounting hook
├── vite.config.js          # Vite config
└── package.json            # Dependencies list
```
