
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
2. **InfoDisplay**: Viser informasjon.
3. **Members**: Lar innloggede brukere legge til nye og slette eksisterende innlegg etc.
4. **Races**: Lar innloggede brukere legge til nye og slette eksisterende innlegg etc.
5. **Results**: Lar innloggede brukere legge til nye og slette eksisterende innlegg etc.

## StøtteKomponenter
Det er flere støttekomponenter også.


### Forutsetninger

- Node.js installert
- NPM (Node Package Manager) installert
- 

# API Endepunkter

API-et tilbyr følgende endepunkter:

## Innlogging

- `POST /api/login` - Autentiser brukere.

## Medlemmer

- `GET /ga/members` - Hent alle medlemmer.
- `GET /ga/members/:id` - Hent et enkelt medlem ved ID.
- `POST /ga/members/` - Legg til et nytt medlem.
- `PUT /ga/members/:id` - Oppdater medlemsdetaljer ved ID.
- `DELETE /ga/members/:memberNumber` - Slett et medlem ved medlemsnummer.

## Løp

- `GET /ga/races` - Hent alle løp.
- `GET /ga/races/:id` - Hent et enkelt løp ved ID.
- `POST /ga/races/:id` - Legg til et nytt løp.
- `PUT /ga/races/:id` - Oppdater løpsdetaljer ved ID.
- `DELETE /ga/races/:id` - Slett et løp ved ID.

## Resultater

- `GET /ga/results` - Hent alle resultater.
- `GET /ga/members/:id/results` - Hent resultater for et medlem ved ID.
- `GET /ga/results/:distance` - Hent resultater ved distanse.

## CORS Konfigurasjon

CORS er konfigurert for å tillate forespørsler fra følgende opprinnelser:

- `http://localhost:5173`
- `http://localhost:5174`

Forespørsler fra andre opprinnelser vil bli blokkert med mindre de er lagt til i `tillatteOpprinnelser`-arrayet i CORS-konfigurasjonen.


## Til Dawood. 
- Litt informasjon.
Jeg ville bare gi deg en rask oppdatering om prosjekte og forklare hvorfor du vil se noen avvik i vår kode.

## Enkelt Commit:
Grunnet en uforutsett feil med min (Adrians) datamaskin, som til slutt krevde en tilbakestilling til fabrikkinnstillingene, måtte vi overføre hele prosjektarbeidet til Torills skole pc. Dette resulterte i at alt arbeidet vårt ble lastet opp i en enkelt commit. På den positive siden ga dette oss en fri passasje for å unngå git-konflikter. :P 

## API-problemer:
Vi har støtt på betydelige utfordringer med API-et, noe som har lagt en demper på vår evne til å holde koden så ryddig og strukturert som vi vanligvis liker. Til tross for disse hindringene har vi gjort vårt ytterste for å sikre at prosjektet fungerer så godt som mulig under de gitte omstendighetene.

## Prioriteringsendringer:

Med tidspresset hengende over oss og ønsket om å levere en fungerende applikasjon, bestemte vi oss for å sette Redux/useContext på vent. Dette var ikke en enkel avgjørelse, men vi mente det var nødvendig for å fokusere på de mer kritiske aspektene av prosjektet gitt den dårlig tiden vi hadde og for å kunne levere innen tidsfristen.

## Prosjektet generelt 
Dette prosjektet bygger videre på Egil sit arbeidskrav, Som Adrian leverte. Gunnen til dette er at vi hadde vanskeligheter med API og koden var satt opp strukturert.
Vi har slette alt vi ikke trengte fra Egil sitt arbeidskrav og lagt inn det vi trenger for dette arbeidskravet. Brukte det som en (Tempelet). 

## Avslutningsvis

Selv om koden ikke er så strømlinjeformet som vi hadde håpet, er vi trygge på at de valgene vi tok underveis var i prosjektets beste interesse. Vi ser frem til å diskutere prosjektet videre og er åpne for eventuelle spørsmål eller tilbakemeldinger du måtte ha.

Med vennlig hilsen,
Adrian og Torill 


## Bidra
## Lisens
## Kontakt

## Kontakt
- Du vet hvordan du kontakter oss.
