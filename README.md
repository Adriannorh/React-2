
## Get Started

### Installasjonsinstruksjoner

1. Klone dette repoet til din lokale maskin
2. Åpne terminalen og naviger til prosjektets rotmappe
3. Kjør kommandoen `npm install` for å installere nødvendige avhengigheter
4. Start serveren med `npm start`! 
5. Åpne en annen terminal og kjør `npm run dev` for å starte frontend-applikasjonen.
6. Åpne din nettleser og gå til `http://localhost:5173/` (eller den porten du har satt) for å se bloggsystemet i aksjon! Hvis problem se ##VIKTIG!

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Enkelt Bloggsystem

Dette prosjektet er et enkelt bloggsystem hvor brukere kan logge inn, vise, legge til og slette blogginnlegg.


## VIKTIG!!!!!  
Husk å endre server.js etter LocalHost på VITE! 
  ➜  Local:   http://localhost:5173/
  
## SERVER.JS
  app.use(cors({
    origin: 'http://localhost:5173', <- denne kan være 5173 eller 5174! eller noe annet! 
    credentials: true
}));


## Teknologier brukt

- **Backend**: Node.js med Express.js
- **Autentisering**: Passord hashing med SHA-256 og UUID for sesjonshåndtering.
- **Frontend**: React (inkludert bruk av `useState`, `useEffect`, `react-router-dom`, og `axios` for API-kall)
- **CSS**: 

## Hovedkomponenter

1. **LoginComponent**: Lar brukere logge inn.
2. **BlogViewer**: Viser alle publiserte blogginnlegg.
3. **BlogComponent**: Lar innloggede brukere legge til nye blogginnlegg og slette eksisterende innlegg.


### Forutsetninger

- Node.js installert
- NPM (Node Package Manager) installert
- 


## API-Endepunkter

- **GET** `/api/blogginnlegg`: Henter alle blogginnlegg.
- **POST** `/api/blogginnlegg`: Legger til et nytt blogginnlegg.
- **DELETE** `/api/blogginnlegg/:id`: Sletter et blogginnlegg med en bestemt ID.
- **POST** `/api/login`: Logger inn en bruker.

## Bidra
## Lisens
## Kontakt

Du vet hvordan du kontakter meg 
