Im Client-Ordner eine .env.local anlegen mit folgendem Inhalt: 
VITE_MAPBOX_TOKEN=<TOKEN>

start db (docker img): im root 'docker-compose up -d'
start Backend: im server ordner 'npm run dev'
start Frontend: im client ordner 'npm run dev'