# Netflix UI Assessment

A Netflix-style media application built with React.js and Vite. This application features a modern, responsive UI with smooth animations, robust authentication, and offline support via Progressive Web App (PWA) capabilities.

## 🚀 Live Demo

[https://netflix-ui-assessment.vercel.app](https://netflix-ui-assessment.vercel.app)

## ✨ Features

- **Modern UI/UX:** Netflix-inspired design with premium aesthetics, smooth transitions, and dynamic micro-animations.
- **Media Previews:** Interactive movie preview modals.
- **User Authentication:** Secure login and registration flow powered by Firebase.
- **User Profiles & Watchlist:** Personalized user experiences including saved media.
- **Progressive Web App (PWA):** Offline support and native-like installable app experience using Service Workers.
- **Performant & Responsive:** Optimized for various screen sizes.

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 + Vite
- **Styling:** CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend & Auth:** Firebase
- **Routing:** React Router v7
- **PWA Integration:** `vite-plugin-pwa`

## 📦 Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher recommended) and npm installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <your-repo-url>
   cd "Netflix UI Assessment"
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Add your Firebase Configuration (if applicable) in your `.env` variables before running.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`.

### Build for Production

To build the project for production, run:

```bash
npm run build
```

This will generate a `dist` directory with the optimized production build. You can preview the production build locally with:

```bash
npm run preview
```

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
