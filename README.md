# OttoCares Projekt / Project

## Projektbeschreibung (Deutsch)

OttoCares ist eine moderne Cloud-Plattform, die Pflegekräfte und Familien zusammenbringt. Ziel ist es, die Suche nach Pflegekräften einfach, sicher und menschlich zu gestalten – unterstützt durch moderne Technologie.

### Hauptfunktionen

- Pflegekräfte auflisten, suchen, Profile verwalten
- Neue Pflegekraft registrieren
- Benutzerprofil-Verwaltung
- Anmeldung über AWS Cognito (OIDC)
- Responsives, mobilfreundliches Frontend
- Modernes, animiertes UI
- Integrierter Chat

### Technologiestack

- **Frontend:** Nuxt 3 (Vue 3), TypeScript, Tailwind CSS, SCSS
- **Backend:** Node.js (Express), Mongoose (MongoDB)
- **Authentifizierung:** AWS Cognito OIDC
- **Proxy:** Nginx (für Entwicklung & Deployment)
- **Deployment:** Docker, EC2 (AWS)
- **Sonstiges:** PM2, Stylelint, ESLint

### Hauptverzeichnisse

- `frontend/` – Nuxt 3 Vue App (UI, Routing, Auth)
- `backend/` – Express API, Mongoose Modelle, Session/Cookie
- `mongo-data/` – MongoDB Daten (Docker Volume)
- `docker-compose.yml` – Dev & Deployment Stack

### URLs

- **Frontend (Dev):** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Deployment (EC2):** https://16.171.144.204/

### Testbenutzer

- **Benutzername:** ottocares@ottocares.hu
- **Passwort:** Ottocares123456.?
- (Falls nicht funktionsfähig, bitte neuen Test-Account beim Admin anfragen oder selbst registrieren)

Für die Entwicklung:
### Entwicklung starten

1. Repository klonen und ins Projektverzeichnis wechseln
2. MongoDB & Backend starten:
   ```sh
   cd backend
   npm install
   npm run dev
   ```
3. Frontend starten:
   ```sh
   cd ../frontend
   npm install
   npm run dev
   ```
4. Im Browser öffnen: http://localhost:3000

### Sonstiges

- Das Projekt ist komplett mobilfreundlich.
- Die Sidebar ist als Hamburger-Menü auf Mobilgeräten, fix auf Desktop.
- Chat nur für eingeloggte User.
- Im Dev-Modus laufen alle APIs auf localhost.

---

## Project Description (English)

OttoCares is a modern cloud-based platform connecting caregivers and families. The goal is to make finding caregivers simple, safe, and human-centric, powered by modern technology.

### Main Features

- List/search caregivers, manage profiles
- Register new caregiver
- User profile management
- AWS Cognito (OIDC) login
- Responsive, mobile-friendly frontend
- Modern, animated UI
- Built-in chat

### Tech Stack

- **Frontend:** Nuxt 3 (Vue 3), TypeScript, Tailwind CSS, SCSS
- **Backend:** Node.js (Express), Mongoose (MongoDB)
- **Authentication:** AWS Cognito OIDC
- **Proxy:** Nginx (for dev & deployment)
- **Deployment:** Docker, EC2 (AWS)
- **Other:** PM2, Stylelint, ESLint

### Main Folders

- `frontend/` – Nuxt 3 Vue app (UI, routing, auth)
- `backend/` – Express API, Mongoose models, session/cookie
- `mongo-data/` – MongoDB data (Docker volume)
- `docker-compose.yml` – Dev & deployment stack

### URLs

- **Frontend (dev):** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Deployment (EC2):** https://16.171.144.204/

### Test User

- **Username:** ottocares@ottocares.hu
- **Password:** Ottocares123456.?
- (If not working, ask Otto for a new test account or register a new user in the app)

For developing:

### Getting Started (Development)

1. Clone the repo and enter the project root
2. Start MongoDB & backend:
   ```sh
   cd backend
   npm install
   npm run dev
   ```
3. Start frontend:
   ```sh
   cd ../frontend
   npm install
   npm run dev
   ```
4. Open http://localhost:3000 in your browser

### Other

- Fully mobile-friendly, all features available on mobile
- Sidebar is hamburger on mobile, fixed on desktop
- Chat is only for logged-in users
- In dev, all API endpoints run on localhost

---

For questions or bug reports, contact the development team!
