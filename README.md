# Web d’AG · Albert Guilemany

Codi públic de [albertguilemany.com](https://albertguilemany.com/), sincronitzat el **2026-11-01** a partir de les respostes originals del web publicat.

La sincronització incorpora **61 fitxers públics, incloses 36 pàgines HTML**. El repositori conserva l’historial de la còpia anterior del 19 de febrer de 2026.

## Estructura

| Ruta | Contingut |
|---|---|
| `index.html` i pàgines HTML de l’arrel | Web en català, serveis, AI Act Express, textos legals i pàgina de gràcies |
| `es/` | Pàgines en castellà |
| `en/` | Pàgines en anglès |
| `style.css`, `script.js` | Estils i comportament compartits |
| `images/` | Logotip, imatge de compartició i imatges dels serveis |
| Favicons, icones i `site.webmanifest` | Identitat del lloc al navegador i als dispositius |
| `robots.txt`, `sitemap.xml` | Fitxers públics d’indexació |
| `docs/public-sync-manifest.json` | Origen, mida i SHA-256 de cada fitxer recuperat, més el resum de validació |

## Abast de la còpia

Els 61 fitxers públics es conserven amb els bytes rebuts del servidor: la sincronització actualitza la còpia del repositori sense redissenyar les pàgines ni reescriure’n els textos.

El formulari utilitza un endpoint extern de Google Apps Script, que continua referenciat al codi publicat. El codi i la configuració d’aquest servei, la configuració privada d’IONOS, les regles del servidor i els registres del formulari es gestionen fora d’aquesta còpia pública.

El fitxer de verificació de domini que ja existia al repositori es conserva. En el moment de la revisió, aquest repositori no tenia GitHub Pages activat ni workflows de desplegament; l’allotjament del web es gestiona per separat.

## Revisar i continuar el projecte

1. Parteix de `main` i crea una branca per a cada canvi que vulguis revisar.
2. Mantén la correspondència entre les pàgines de l’arrel, `es/` i `en/` quan canviïs serveis, navegació o textos compartits.
3. Comprova les pàgines, les imatges, els enllaços i el comportament en mòbil abans de publicar una actualització al teu allotjament.
4. Revisa el formulari i les redireccions a les pàgines de gràcies quan en canviïs la configuració.

Per obrir una previsualització bàsica des d’aquesta carpeta:

```sh
python3 -m http.server 8000
```

Després obre `http://localhost:8000/`. Les URL absolutes del codi conserven el domini de producció; les comprovacions locals de fitxers s’han de complementar amb una revisió al domini de destinació abans de desplegar canvis.

## Validació de la sincronització

- 61 fitxers recuperats correctament i verificats amb SHA-256.
- 36 pàgines HTML revisades per detectar referències locals a fitxers absents: cap referència absent.
- Sintaxi de `script.js` comprovada amb `node --check`.
- `site.webmanifest` validat com a JSON.

La sincronització no envia formularis ni comprova el processament del servei extern de Google Apps Script.
