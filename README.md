# FPLMate Frontend

## Overview

FPLMate Frontend is a Next.js React application that provides an intuitive, responsive web interface for Fantasy Premier League (FPL) managers. It integrates with a Django REST API backend to present real-time player statistics, machine learning–based transfer suggestions, performance analytics, and team management tools. Designed with scalability and maintainability in mind, the codebase follows modular architecture and industry best practices.

---

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Installation](#installation)
   * [Configuration](#configuration)
   * [Running Locally](#running-locally)
5. [Project Structure](#project-structure)
6. [Component Breakdown](#component-breakdown)
7. [Scripts & Commands](#scripts--commands)
8. [Testing & Linting](#testing--linting)
9. [CI/CD](#ci-cd)
10. [Deployment](#deployment)
11. [Contributing](#contributing)
12. [License](#license)

---

## Features

* **Player Dashboard**: Real-time list of FPL players with search, sorting, and filters (position, team, price range).
* **Player Detail View**: In-depth statistics including historical performance charts, heatmaps, and expected metrics (xG, xA).
* **Team Builder**: Drag-and-drop interface to assemble squads, enforce budget and formation constraints, and preview upcoming fixtures.
* **Transfer Suggestions**: ML-powered recommendations highlighting high-potential transfers based on form, fixtures, and value.
* **League Analytics**: Compare performance across user leagues, view leaderboards, and analyze competitor teams.
* **Notifications & Alerts**: Real-time alerts for price changes, injuries, and recommended transfers via in-app toasts.
* **Authentication & Profiles**: Secure login, signup, and session management via Firebase Authentication, with personalized user settings.
* **Responsive Design**: Mobile-first layouts optimized for all screen sizes, ensuring usability on smartphones, tablets, and desktops.

---

## Architecture

The application follows a component-driven architecture:

* **Next.js Pages**: Routes under `pages/` map to URL endpoints, handling initial server-side rendering (SSR) and static generation (SSG) where appropriate.
* **API Layer**: Custom `pages/api/` routes implement proxy middleware for secure communication with the backend, including token injection and error normalization.
* **Global State**: React Context manages authentication state and global settings, while component-level state is handled via React Hooks.
* **Styling**: Tailwind CSS utilities, with `@apply` for shared component styles and CSS Modules for scoped overrides.
* **Data Fetching**: SWR (stale-while-revalidate) for client-side caching, polling, and automatic revalidation of key endpoints.

---

## Tech Stack

| Category             | Tools / Libraries                            |
| -------------------- | -------------------------------------------- |
| Framework            | Next.js (v14), React (v18)                   |
| Language             | TypeScript                                   |
| Styling              | Tailwind CSS, PostCSS                        |
| State Management     | React Context, Hooks, SWR                    |
| HTTP Client          | Axios                                        |
| Authentication       | Firebase Auth, React Firebase Hooks          |
| Data Visualization   | Recharts, D3.js (optional for custom charts) |
| Testing              | Jest, React Testing Library                  |
| Linting / Formatting | ESLint, Prettier                             |
| CI/CD                | GitHub Actions                               |

---

## Getting Started

### Prerequisites

* Node.js v18 or higher
* Yarn (preferred) or npm
* Active Firebase project with Web Authentication enabled
* Backend API URL and valid JWT token issuance configured

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/Ron111104/fplmate_frontend.git
   cd fplmate_frontend
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```

### Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Backend API base endpoint\ NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com

# Firebase configuration
NEXT_PUBLIC_FIREBASE_API_KEY=<your_firebase_api_key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your_project>.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your_project_id>

# Optional: custom environment flags
NEXT_PUBLIC_ENABLE_MOCK=false
```

> **Security**: Do not commit `.env.local` to version control. Add it to `.gitignore`.

### Running Locally

Start the development server with hot-reloading:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```text
fplmate_frontend/
├── components/        # Shared UI components (Buttons, Modals, Layout)
├── charts/            # Data visualization components (Recharts wrappers)
├── data/              # API client (axios) and data utilities
├── firebase/          # Firebase initialization and Auth utilities
├── hooks/             # Custom React hooks (useAuth, usePlayer, useTeam)
├── pages/             # Next.js pages and API routes
│   ├── api/           # API proxies (auth, players, teams, recommendations)
│   ├── _app.tsx       # Root App component with providers
│   ├── index.tsx      # Home/Landing page
│   ├── dashboard/     # Authenticated user dashboard pages
│   └── players/       # Player listing and detail pages
├── public/            # Static assets (images, icons, etc.)
├── styles/            # TailwindCSS config and global styles
├── tsconfig.json      # TypeScript configuration
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind configuration and theming
├── jest.config.js     # Jest test configuration
├── .eslintrc.js       # ESLint rules
└── .prettierrc        # Prettier formatting rules
```

---

## Component Breakdown

1. **Layout Components** (`components/layout/`)

   * `Header`, `Footer`, `Sidebar`, `Container`
   * Manage global site structure and navigation

2. **UI Elements** (`components/ui/`)

   * `Button`, `Card`, `Modal`, `Input`, `Toast`
   * Highly reusable building blocks

3. **Feature Components**

   * **PlayerCard**: Displays summary info and action buttons
   * **PlayerStatsChart**: Renders performance trends
   * **TeamBuilder**: Drag-and-drop list for squad assembly
   * **RecommendationWidget**: Shows ML suggestions

4. **Hooks** (`hooks/`)

   * `useAuth()`: Provides user, login, logout methods
   * `usePlayers()`: Fetches and paginates player data
   * `useRecommendations()`: Retrieves recommended transfers

---

## Scripts & Commands

| Command          | Description                                  |
| ---------------- | -------------------------------------------- |
| `npm run dev`    | Start development server at `localhost:3000` |
| `npm run build`  | Compile and optimize for production          |
| `npm run start`  | Run the production build locally             |
| `npm run lint`   | Lint code with ESLint                        |
| `npm run test`   | Run unit and integration tests with Jest     |
| `npm run format` | Format code with Prettier                    |

\-------------------|------------------------------------------------|
\| `yarn dev`        | Start development server at `localhost:3000`   |
\| `yarn build`      | Compile and optimize for production            |
\| `yarn start`      | Run the production build locally               |
\| `yarn lint`       | Lint code with ESLint                          |
\| `yarn test`       | Run unit and integration tests with Jest       |
\| `yarn format`     | Format code with Prettier                      |

---

## Testing & Linting

* **Unit Tests**: Located alongside components using `.test.tsx` suffix. Use Jest and React Testing Library.
* **Run Tests**:

  ```bash
  yarn test
  # or
  npm test
  ```
* **Linting**:

  ```bash
  yarn lint
  ```
* **Formatting**:

  ```bash
  yarn format
  ```

---

## CI/CD

Configured via GitHub Actions (`.github/workflows/ci.yml`):

1. **On Pull Request**:

   * Install dependencies
   * Run lint and tests
2. **On Merge to `main`**:

   * Run build
   * Deploy to Vercel (via Vercel integration)

---

## Deployment

The project is optimized for Vercel:

1. **Connect Repository**: Authorize GitHub and import project in Vercel.
2. **Set Environment Variables**: Add secrets matching `.env.local` keys.
3. **Automatic Builds**: Vercel will build on each push to `main`.
4. **Preview Deployments**: Enabled for feature branches.

Alternatively, you can export a static site and host on any static file server:

```bash
npm run build
npm run export
```

---

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository.
2. **Create Branch**: `git checkout -b feature/my-feature`.
3. **Implement** your changes, ensuring tests pass.
4. **Commit** with clear message: `git commit -m "feat: add my-feature"`.
5. **Push**: `git push origin feature/my-feature`.
6. **Open** a Pull Request for review.

Please adhere to existing code conventions and include tests for new functionality.

---

## Credits

Data sourced and adapted from [vaastav/Fantasy-Premier-League](https://github.com/vaastav/Fantasy-Premier-League).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
