# Atelier Access – TIC clasa a X-a

Site static (HTML + CSS + JavaScript, fără pas de build). Merge pe GitHub Pages și deschis direct din fișier.

## Structură
- `index.html` – pagina și stilurile
- `js/db.js` – baza de date de lucru „Biblioteca” (tabele, relații, date)
- `js/engine.js` – simulatorul de interogări (criterii, totaluri, parametri, SQL)
- `js/content-a.js` – orele 1–5 · `js/content-b.js` – orele 6–10 · `js/content-c.js` – orele 11–15, glosar, proiect
- `js/app.js` – interfața (lecții, exerciții, fișe, teste); la început: codul pentru Mod profesor și numărul de întrebări

## Cum adaug conținut
- O întrebare nouă: copiază un obiect din lista `test` a orei.
- Un exercițiu nou: copiază un obiect din `exercitii` și dă-i un `id` unic (ex.: `o10e9`).
- Codul „Mod profesor”: `codProfesor` în `js/app.js`.

## Publicare pe GitHub Pages
1. Creează în contul liceulcernabr un depozit nou, de exemplu `access-clasa-x`.
2. Încarcă tot conținutul acestui folder (Add file › Upload files).
3. Settings › Pages › Branch: main, folder / (root) › Save.
