# ZimID

Production-ready digital identity platform for Zimbabwean government services.

## Architecture

- **Frontend**: Flutter (Web + Mobile), deployed on **Netlify**
- **Backend**: Node.js + Express, deployed on **Render**
- **Database**: PostgreSQL

## Monorepo structure

- `/frontend` Flutter wallet-style citizen app
- `/backend` Express API with PostgreSQL persistence
- `/netlify.toml` Netlify deployment config
- `/render.yaml` Render deployment config

## Features implemented

- Digital wallet tray inspired by UAE ICP layout
- Flippable CR80 digital ID card
- Citizen registration form with photo upload
- Government services dashboard
- Passport application module
- Birth certificate module
- Driver’s license module

## Backend quick start

```bash
cd backend
cp .env.example .env
npm install
npm run migrate
npm run dev
```

## Frontend quick start

```bash
cd frontend
flutter pub get
flutter run -d chrome
```

## Security and production notes

- Helmet and CORS enabled
- Request payload and upload limits applied
- Parameterized SQL queries
- Strict environment-based configuration
