/* =========================================================
   Conținut: orele 6–10
   ========================================================= */

/* ---------------- ORA 6 ---------------- */
LESSONS.push({
  id: 6, unit: "U2", titlu: "Introducerea datelor, liste de căutare, import și export", titluScurt: "Date, căutare, import/export",
  rezumat: "Lucrul în foaia de date, Expertul căutare, importul din Excel și exportul datelor.",
  obiective: [
    "adaugi, modifici și ștergi înregistrări în foaia de date;",
    "formatezi foaia de date: lățimea coloanelor, ascundere, înghețare;",
    "creezi o listă derulantă cu <b>Expertul căutare</b>;",
    "imporți date din Excel și exporți un tabel în Excel sau PDF."
  ],
  teorie: `
<h3>Lucrul în foaia de date</h3>
<ul>
<li><b>Înregistrare nouă:</b> scrii în rândul marcat cu ✱ sau apeși <span class="ui">Pornire › Nou</span> (<kbd>Ctrl</kbd> + <kbd>+</kbd>).</li>
<li><b>Deplasare:</b> <kbd>Tab</kbd> sau <kbd>Enter</kbd> la câmpul următor, săgețile între rânduri.</li>
<li><b>Ștergere înregistrare:</b> selectezi rândul (clic în selectorul din stânga) și apeși <kbd>Delete</kbd>. Access cere confirmare.</li>
<li><kbd>Ctrl</kbd> + <kbd>;</kbd> scrie data de azi; <kbd>Ctrl</kbd> + <kbd>'</kbd> copiază valoarea din înregistrarea de deasupra; <kbd>Esc</kbd> anulează modificările din înregistrarea curentă.</li>
</ul>
<div class="box atentie"><div class="bt">Atenție</div><p>Ștergerea unei înregistrări <b>nu se poate anula</b> cu Ctrl+Z. Valorile din Numerotare automată nu se refolosesc: dacă ștergi elevul 20, următorul elev nou primește 21.</p></div>
<h3>Aspectul foii de date</h3>
<p>Clic dreapta pe antetul unei coloane: <span class="ui">Lățime câmp</span>, <span class="ui">Ascundere câmpuri</span>, <span class="ui">Reafișare câmpuri</span>, <span class="ui">Înghețare câmpuri</span> (coloana rămâne vizibilă când derulezi la dreapta). Din fila Pornire schimbi fontul și culoarea rândurilor alternative. Aceste setări schimbă doar aspectul, nu datele.</p>
<h3>Expertul căutare: liste derulante</h3>
<p>În Vizualizare proiect, la tipul de date alegi <span class="ui">Expert căutare…</span> <span class="en">(Lookup Wizard)</span>. Ai două variante:</p>
<dl class="term">
<dt>Valori tastate de mine</dt><dd>Scrii lista o dată: <code>F</code>, <code>M</code>; sau genurile literare: Roman, Poezie, Nuvelă, Teatru…</dd>
<dt>Valori dintr-un tabel</dt><dd>Lista se ia din alt tabel. În Imprumuturi, câmpul IdElev poate afișa numele elevilor din tabelul Elevi, dar păstrează codul. Access creează automat și relația dintre tabele.</dd>
</dl>
<p>Bifa <b>Limitare la listă</b> <span class="en">(Limit to List)</span> interzice valorile care nu sunt în listă.</p>
<h3>Importul datelor</h3>
<div class="box pas"><div class="bt">Pas cu pas: import din Excel</div><ol>
<li>Pregătești foaia Excel: primul rând conține numele câmpurilor, fără rânduri goale și fără celule îmbinate.</li>
<li>În Access: <span class="ui">Date externe › Sursă de date nouă › Din fișier › Excel</span>.</li>
<li>Alegi fișierul și modul: <b>import într-un tabel nou</b>, <b>adăugare la un tabel existent</b> sau <b>legare</b>.</li>
<li>Bifezi <b>Primul rând conține titluri de coloane</b>.</li>
<li>Verifici tipurile de date propuse pentru fiecare coloană.</li>
<li>Alegi cheia primară (sau lași Access să adauge una) și dai numele tabelului.</li>
<li>Apeși <span class="ui">Terminare</span>. Poți salva pașii de import pentru data viitoare.</li>
</ol></div>
<dl class="term">
<dt>Import</dt><dd>Datele se <b>copiază</b> în baza de date. Modificările ulterioare din Excel nu se mai văd în Access.</dd>
<dt>Legare <span class="en">(Link)</span></dt><dd>Access afișează datele din fișierul extern, care rămâne sursa. Tabelul legat are o săgeată în panoul de navigare.</dd>
</dl>
<p>Poți importa și fișiere text (<code>.csv</code>, <code>.txt</code>), alte baze de date Access sau liste SharePoint.</p>
<h3>Exportul datelor</h3>
<p>Selectezi tabelul (sau interogarea, raportul) în panoul de navigare, apoi <span class="ui">Date externe › Export</span> › Excel, Fișier text, PDF sau XPS, Word (RTF). Exportul în PDF este util pentru rapoarte pe care le trimiți altora.</p>
<div class="box retine"><div class="bt">Reține</div><ul><li>Importul copiază datele, legarea le folosește de la sursă.</li><li>Expertul căutare reduce greșelile de scriere: utilizatorul alege din listă.</li></ul></div>`,
  exercitii: [
    { id: "o6e1", tip: "order", enunt: "Ordonează pașii pentru importul unei foi Excel într-un tabel nou.", steps: ["Verifici că primul rând din Excel conține numele coloanelor", "Date externe › Sursă de date nouă › Din fișier › Excel", "Alegi fișierul și opțiunea de import într-un tabel nou", "Bifezi Primul rând conține titluri de coloane", "Verifici tipurile de date ale coloanelor", "Alegi cheia primară și dai numele tabelului", "Apeși Terminare"] },
    { id: "o6e2", tip: "select", enunt: "Ce face fiecare combinație de taste în foaia de date?", options: ["scrie data de azi", "copiază valoarea din înregistrarea de deasupra", "anulează modificările din înregistrarea curentă", "trece la câmpul următor", "adaugă o înregistrare nouă"],
      items: [{ text: "<kbd>Ctrl</kbd> + <kbd>;</kbd>", ans: "scrie data de azi" }, { text: "<kbd>Ctrl</kbd> + <kbd>'</kbd>", ans: "copiază valoarea din înregistrarea de deasupra" }, { text: "<kbd>Esc</kbd>", ans: "anulează modificările din înregistrarea curentă" }, { text: "<kbd>Tab</kbd>", ans: "trece la câmpul următor" }, { text: "<kbd>Ctrl</kbd> + <kbd>+</kbd>", ans: "adaugă o înregistrare nouă" }] },
    { id: "o6e3", tip: "quiz", enunt: "Ai importat lista elevilor dintr-un fișier Excel. A doua zi, secretara modifică fișierul Excel. Ce se întâmplă cu tabelul din Access?", opts: ["Se actualizează automat", "Rămâne neschimbat: importul a copiat datele", "Se șterge", "Devine tabel legat"], ans: 1, expl: "Doar un tabel legat urmărește modificările din sursă." },
    { id: "o6e4", tip: "quiz", enunt: "Vrei ca în câmpul Gen din Carti să se poată alege doar dintre Roman, Poezie, Nuvelă, Teatru, Științific, SF și Memorialistică. Ce folosești?", opts: ["Mască de intrare", "Expert căutare cu valori tastate și Limitare la listă", "Format", "Numerotare automată"], ans: 1, expl: "Lista derulantă plus Limitare la listă împiedică valorile greșite." },
    { id: "o6e5", tip: "fill", enunt: "Completează.", items: [
      { text: "Pentru ca o coloană să rămână vizibilă când derulezi la dreapta folosești comanda ___ câmpuri.", ans: ["Înghețare", "inghetare"] },
      { text: "Un tabel care afișează datele direct din fișierul extern este un tabel ___.", ans: ["legat"] },
      { text: "Pentru a trimite un raport ca document care nu se poate modifica, îl exporți în format ___.", ans: ["PDF"] }] },
    { id: "o6e6", tip: "formsim", enunt: "Răsfoiește tabelul Elevi în formularul de mai jos, cu butoanele de navigare, și răspunde.", table: "Elevi", titlu: "Fișa elevului", fields: ["IdElev", "Nume", "Prenume", "Clasa", "Localitate", "Media", "Bursier"],
      questions: [{ q: "Din ce localitate este elevul cu IdElev 12?", ans: ["Ianca"] }, { q: "Ce medie are ultima înregistrare din tabel?", ans: ["8,6", "8.6", "8,60", "8.60"] }, { q: "Care este prenumele elevei Moldovan?", ans: ["Irina"] }] }
  ],
  fisa: {
    titlu: "Populăm baza de date",
    context: "Folosește pagina <a href=\"#date\">Datele de lucru</a>. Butonul „Copiază datele (pentru Excel)” pune tabelul în clipboard.",
    cerinte: [
      { text: "Copiază datele tabelului <b>Carti</b>, lipește-le în Excel (celula A1) și salvează fișierul <code>carti.xlsx</code>.", pct: 10 },
      { text: "Importă foaia în tabelul existent Carti (<i>Adăugare copie a înregistrărilor la tabel</i>). Verifică cele 16 înregistrări.", pct: 20 },
      { text: "Pentru Elevi și Imprumuturi folosește „Copiază fără antet”, selectează rândul nou ✱ al tabelului din Access și apasă Ctrl+V.", pct: 20 },
      { text: "Transformă câmpul <b>Gen</b> din Elevi într-o listă derulantă cu valorile F și M, cu Limitare la listă.", pct: 15 },
      { text: "În Imprumuturi, adaugă un împrumut nou folosind <kbd>Ctrl</kbd> + <kbd>;</kbd> pentru dată. Ce IdImprumut a primit?", pct: 10, raspuns: true },
      { text: "Îngheață coloanele Nume și Prenume din Elevi, ascunde coloana Telefon, apoi reafișeaz-o.", pct: 10 },
      { text: "Exportă tabelul Elevi în PDF. Ce probleme de aspect observi în fișierul obținut?", pct: 15, raspuns: true }
    ],
    verificare: ["Cele trei tabele conțin toate datele.", "Lista derulantă Gen funcționează.", "Am exportat un tabel în PDF."],
    solutii: `<p>5. Primul număr liber după cel mai mare număr dat vreodată (26, dacă nu s-au șters înregistrări). 7. Coloanele pot fi tăiate sau împărțite pe mai multe pagini; un raport (ora 15) e mai potrivit pentru tipărire.</p>`
  },
  test: [
    { q: "Se poate anula cu Ctrl+Z ștergerea unei înregistrări?", opts: ["Da", "Nu"], ans: 1, expl: "Ștergerea înregistrărilor este definitivă." },
    { q: "Ce scrie combinația Ctrl + ; într-un câmp?", opts: ["Ora curentă", "Data de azi", "Valoarea de deasupra", "Un punct și virgulă"], ans: 1, expl: "Ctrl + ; scrie data curentă." },
    { q: "Diferența dintre import și legare:", opts: ["Importul copiază datele; legarea folosește datele din fișierul sursă", "Nu există nicio diferență", "Legarea copiază datele; importul nu", "Importul funcționează doar pentru PDF"], ans: 0, expl: "Tabelul legat rămâne dependent de sursă." },
    { q: "Expertul căutare creează:", opts: ["o interogare", "o listă derulantă de valori pentru un câmp", "un raport", "o copie de siguranță"], ans: 1, expl: "Utilizatorul alege valoarea din listă." },
    { q: "Care sunt formate în care Access poate exporta date?", opts: ["Excel", "PDF", "Fișier text", "MP3"], ans: [0, 1, 2], expl: "MP3 este format audio." },
    { q: "Ai șters elevul cu IdElev 20 (ultimul). Ce cod primește următorul elev adăugat?", opts: ["20", "21", "1", "0"], ans: 1, expl: "Numerotarea automată nu refolosește valorile." },
    { q: "Ce condiție trebuie să îndeplinească foaia Excel înainte de import?", opts: ["Primul rând să conțină numele coloanelor", "Să aibă celule îmbinate", "Să aibă rânduri goale între date", "Să fie protejată cu parolă"], ans: 0, expl: "Celulele îmbinate și rândurile goale produc erori." }
  ]
});

/* ---------------- ORA 7 ---------------- */
LESSONS.push({
  id: 7, unit: "U3", titlu: "Relații între tabele și integritatea referențială", titluScurt: "Relații între tabele",
  rezumat: "Relații unu-la-unu, unu-la-mai-mulți, mai-mulți-la-mai-mulți; fereastra Relații; cascade.",
  obiective: [
    "recunoști tipurile de relații: <b>1:1</b>, <b>1:N</b>, <b>M:N</b>;",
    "creezi relații în fereastra <b>Relații</b>;",
    "explici ce înseamnă <b>integritatea referențială</b>;",
    "alegi când folosești actualizarea și ștergerea în cascadă."
  ],
  teorie: `
<p>Datele despre un elev stau în Elevi, datele despre o carte în Carti. Tabelul Imprumuturi le leagă prin chei externe. Ca Access să „știe” aceste legături, le declari în fereastra <b>Relații</b>.</p>
<h3>Tipuri de relații</h3>
<div class="tblwrap"><table><thead><tr><th>Tip</th><th>Înseamnă</th><th>Exemplu</th></tr></thead><tbody>
<tr><td><b>Unu-la-unu (1:1)</b></td><td>unei înregistrări din A îi corespunde cel mult una din B, și invers</td><td>Elev – Fișa medicală a elevului; Clasa – Sala de clasă atribuită</td></tr>
<tr><td><b>Unu-la-mai-mulți (1:N)</b></td><td>unei înregistrări din A îi corespund mai multe din B; fiecare din B aparține unei singure din A</td><td>Elev – Imprumuturi (un elev are mai multe împrumuturi)</td></tr>
<tr><td><b>Mai-mulți-la-mai-mulți (M:N)</b></td><td>o înregistrare din A se leagă de mai multe din B și invers</td><td>Elevi – Carti: un elev citește multe cărți, o carte e citită de mulți elevi</td></tr>
</tbody></table></div>
<div class="box retine"><div class="bt">Reține</div><p>Relația <b>M:N nu se poate crea direct</b>. Se folosește un <b>tabel de legătură</b> <span class="en">(junction table)</span> care conține cheile ambelor tabele. La noi, Imprumuturi este tabelul de legătură: Elevi 1:N Imprumuturi N:1 Carti.</p></div>
<div data-diagram="biblioteca" class="figure"></div>
<h3>Crearea relațiilor</h3>
<div class="box pas"><div class="bt">Pas cu pas</div><ol>
<li>Închizi toate tabelele deschise.</li>
<li><span class="ui">Instrumente bază de date › Relații</span> <span class="en">(Database Tools › Relationships)</span>.</li>
<li><span class="ui">Adăugare tabele</span> și alegi Elevi, Imprumuturi, Carti.</li>
<li>Tragi cheia primară <b>IdElev</b> din Elevi peste câmpul <b>IdElev</b> din Imprumuturi.</li>
<li>În fereastra <b>Editare relații</b> bifezi <b>Impunere integritate referențială</b> și apeși <span class="ui">Creare</span>.</li>
<li>Repeți pentru IdCarte din Carti și Imprumuturi. Salvezi aspectul (Ctrl+S) și închizi.</li>
</ol></div>
<p>Pe linia relației apar simbolurile <b>1</b> (partea „unu”, tabelul cu cheia primară) și <b>∞</b> (partea „mai mulți”, tabelul cu cheia externă).</p>
<h3>Integritatea referențială</h3>
<p>Este un set de reguli care împiedică apariția înregistrărilor „orfane”, care trimit spre ceva ce nu există:</p>
<ul>
<li>Nu poți adăuga în Imprumuturi un împrumut cu <b>IdElev = 99</b> dacă elevul 99 nu există în Elevi.</li>
<li>Nu poți șterge din Elevi un elev care are împrumuturi.</li>
<li>Nu poți modifica cheia primară a unui elev care are împrumuturi.</li>
</ul>
<p>Condiții: câmpurile legate au același tip de date (Numerotare automată ↔ Număr, Întreg lung), datele existente respectă deja regulile, iar câmpul din partea „unu” este cheie primară sau are index unic.</p>
<dl class="term">
<dt>Actualizare în cascadă câmpuri corelate</dt><dd>Dacă se schimbă cheia primară în Elevi, Access schimbă automat valoarea și în Imprumuturi.</dd>
<dt>Ștergere în cascadă înregistrări corelate</dt><dd>Dacă ștergi un elev, Access șterge automat și toate împrumuturile lui. Puternic, dar periculos: folosește-l cu grijă.</dd>
</dl>
<div class="box atentie"><div class="bt">Mesaje frecvente</div><ul><li>„Nu se poate adăuga sau modifica o înregistrare deoarece este necesară o înregistrare asociată în tabelul Elevi.” → ai scris un IdElev care nu există.</li><li>„Relația trebuie să se refere la același număr de câmpuri cu aceleași tipuri de date.” → tipurile câmpurilor nu se potrivesc.</li><li>„Nu se poate impune integritatea referențială…” → există deja date orfane; corectează-le mai întâi.</li></ul></div>
<div class="box stiai"><div class="bt">Știai că?</div><p>Când adaugi mai multe tabele într-o interogare, Access le leagă singur folosind relațiile din această fereastră. De aceea, relațiile se creează înainte de interogări.</p></div>`,
  exercitii: [
    { id: "o7e1", tip: "select", enunt: "Ce tip de relație există între entități?", options: ["1:1", "1:N", "M:N"],
      items: [{ text: "Clasă – Elevi (fiecare elev este într-o singură clasă)", ans: "1:N" }, { text: "Elevi – Concursuri (un elev participă la mai multe concursuri, la un concurs participă mulți elevi)", ans: "M:N" }, { text: "Țară – Capitală", ans: "1:1" }, { text: "Autor – Cărți (fiecare carte are un singur autor, în baza noastră)", ans: "1:N" }, { text: "Profesori – Clase (un profesor predă la mai multe clase, o clasă are mai mulți profesori)", ans: "M:N" }, { text: "Elev – Contul de e-mail școlar", ans: "1:1" }] },
    { id: "o7e2", tip: "quiz", enunt: "Integritatea referențială este impusă între Elevi și Imprumuturi. Încerci să adaugi în Imprumuturi o înregistrare cu IdElev = 99. Ce se întâmplă?", opts: ["Access adaugă automat elevul 99 în Elevi", "Access refuză înregistrarea, pentru că elevul 99 nu există", "Înregistrarea se salvează, dar fără IdElev", "Se șterge tabelul Elevi"], ans: 1, expl: "Este necesară o înregistrare asociată în tabelul din partea „unu”." },
    { id: "o7e3", tip: "order", enunt: "Ordonează pașii pentru crearea relației dintre Elevi și Imprumuturi.", steps: ["Închizi tabelele deschise", "Instrumente bază de date › Relații", "Adaugi tabelele Elevi și Imprumuturi", "Tragi IdElev din Elevi peste IdElev din Imprumuturi", "Bifezi Impunere integritate referențială", "Apeși Creare și salvezi aspectul"] },
    { id: "o7e4", tip: "select", enunt: "Pentru relația Elevi – Imprumuturi, alege corect:", options: ["Elevi", "Imprumuturi"], shuffle: false,
      items: [{ text: "Tabelul din partea „1”", ans: "Elevi" }, { text: "Tabelul din partea „∞”", ans: "Imprumuturi" }, { text: "Tabelul în care IdElev este cheie primară", ans: "Elevi" }, { text: "Tabelul în care IdElev este cheie externă", ans: "Imprumuturi" }, { text: "Cu ștergere în cascadă, la ștergerea unui elev se șterg automat înregistrări din tabelul…", ans: "Imprumuturi" }] },
    { id: "o7e5", tip: "quiz", enunt: "Cum se implementează relația M:N dintre Elevi și Carti?", opts: ["Se trage direct IdElev peste IdCarte", "Printr-un tabel de legătură (Imprumuturi) care conține IdElev și IdCarte", "Se adaugă în Elevi câmpurile Carte1, Carte2, Carte3", "Nu se poate implementa în Access"], ans: 1, expl: "Relația M:N devine două relații 1:N cu un tabel de legătură." },
    { id: "o7e6", tip: "fill", enunt: "Completează.", items: [
      { text: "Opțiunea care șterge automat împrumuturile unui elev șters se numește ștergere în ___.", ans: ["cascadă", "cascada"] },
      { text: "Pe linia relației, partea „mai mulți” este marcată cu simbolul ___.", ans: ["∞", "infinit", "infinity"] },
      { text: "Un câmp Numerotare automată se leagă de un câmp de tip Număr cu dimensiunea Întreg ___.", ans: ["lung"] }] }
  ],
  fisa: {
    titlu: "Legăm tabelele bibliotecii",
    cerinte: [
      { text: "Creează relațiile Elevi–Imprumuturi și Carti–Imprumuturi, cu integritate referențială. Salvează aspectul ferestrei Relații.", pct: 25 },
      { text: "Încearcă să adaugi în Imprumuturi un împrumut cu IdElev = 50. Copiază mesajul afișat de Access.", pct: 15, raspuns: true },
      { text: "Încearcă să ștergi din Elevi eleva Ionescu Maria (IdElev 2). Ce se întâmplă și de ce?", pct: 15, raspuns: true },
      { text: "Editează relația Elevi–Imprumuturi (dublu clic pe linie) și bifează <b>Ștergere în cascadă</b>. Fă o copie a bazei de date, apoi șterge în copie elevul 20. Ce s-a întâmplat cu împrumutul lui?", pct: 20, raspuns: true },
      { text: "Explică de ce ștergerea în cascadă poate fi periculoasă într-o bibliotecă reală.", pct: 10, raspuns: true },
      { text: "Propune un al patrulea tabel, <b>Edituri</b>, și scrie ce câmpuri are și cu ce tabel se leagă, prin ce tip de relație.", pct: 15, raspuns: true }
    ],
    verificare: ["Relațiile au simbolurile 1 și ∞.", "Am testat integritatea cu o valoare inexistentă.", "Am lucrat cu ștergerea în cascadă doar pe o copie."],
    solutii: `<p>2. „Nu se poate adăuga sau modifica o înregistrare deoarece este necesară o înregistrare asociată în tabelul «Elevi».” 3. Access refuză: eleva are împrumuturi asociate. 4. Împrumutul nr. 19 a fost șters automat. 5. Se pierde istoricul împrumuturilor. 6. Edituri(<u>IdEditura</u>, Denumire, Oras, Site); Carti primește câmpul IdEditura; relație Edituri 1:N Carti.</p>`
  },
  test: [
    { q: "Relația dintre Elevi și Imprumuturi este:", opts: ["1:1", "1:N", "M:N", "nu există"], ans: 1, expl: "Un elev are mai multe împrumuturi." },
    { q: "O relație M:N se implementează:", opts: ["direct, între cele două tabele", "printr-un tabel de legătură", "prin câmpuri repetitive", "printr-un raport"], ans: 1, expl: "Tabelul de legătură conține ambele chei." },
    { q: "Unde creezi relațiile în Access?", opts: ["Creare › Relații", "Instrumente bază de date › Relații", "Pornire › Relații", "Date externe › Relații"], ans: 1, expl: "Fila Instrumente bază de date." },
    { q: "Integritatea referențială împiedică:", opts: ["adăugarea unui împrumut pentru un elev inexistent", "sortarea tabelelor", "ștergerea unui elev care are împrumuturi (fără cascadă)", "introducerea numelor lungi"], ans: [0, 2], expl: "Previne înregistrările orfane." },
    { q: "Ștergerea în cascadă înseamnă că:", opts: ["se șterge tot tabelul", "la ștergerea unei înregistrări din partea „1” se șterg automat înregistrările corelate din partea „∞”", "se șterg doar câmpurile goale", "se golește coșul de reciclare"], ans: 1, expl: "Folosește-o cu grijă." },
    { q: "Simbolul ∞ pe linia relației marchează:", opts: ["partea „unu”", "partea „mai mulți”", "o eroare", "cheia primară"], ans: 1, expl: "Tabelul cu cheia externă." },
    { q: "Ce condiție trebuie îndeplinită pentru a lega două câmpuri?", opts: ["Tipuri de date compatibile", "Același nume obligatoriu", "Ambele să fie Text lung", "Ambele să fie chei primare"], ans: 0, expl: "Numele pot diferi, tipurile trebuie să se potrivească." },
    { q: "Exemplu de relație 1:1:", opts: ["Elev – Contul lui de e-mail școlar", "Clasă – Elevi", "Elevi – Cărți", "Autor – Cărți"], ans: 0, expl: "Fiecare elev are un singur cont, fiecare cont aparține unui singur elev." }
  ]
});

/* ---------------- ORA 8 ---------------- */
LESSONS.push({
  id: 8, unit: "U3", titlu: "Sortarea, căutarea și filtrarea datelor", titluScurt: "Sortare, căutare, filtre",
  rezumat: "Sortare ascendentă și descendentă, Găsire și înlocuire, filtre după selecție și după formular.",
  obiective: [
    "sortezi înregistrările după unul sau mai multe câmpuri;",
    "cauți și înlocuiești valori cu <b>Găsire și înlocuire</b>, inclusiv cu metacaractere;",
    "aplici <b>filtre după selecție</b>, filtre de text, număr și dată;",
    "folosești <b>Filtrare după formular</b> și <b>Comutare filtru</b>."
  ],
  teorie: `
<p>Interogările (orele 9–13) sunt instrumentul principal pentru extragerea datelor. Pentru o privire rapidă însă, poți sorta și filtra direct în foaia de date a unui tabel. Comenzile sunt în <span class="ui">Pornire › Sortare și filtrare</span>.</p>
<h3>Sortarea</h3>
<ul>
<li>Clic într-un câmp, apoi <span class="ui">Ascendent</span> (A→Z, 0→9, cele mai vechi date primele) sau <span class="ui">Descendent</span>.</li>
<li><b>Pe mai multe câmpuri:</b> așezi coloanele una lângă alta, în ordinea priorității (de exemplu Clasa, apoi Nume), le selectezi împreună și apeși Ascendent. Access sortează de la stânga la dreapta.</li>
<li><span class="ui">Eliminare sortare</span> readuce ordinea inițială (după cheia primară).</li>
</ul>
<h3>Găsire și înlocuire</h3>
<p><kbd>Ctrl</kbd> + <kbd>F</kbd> deschide <b>Găsire</b>, <kbd>Ctrl</kbd> + <kbd>H</kbd> deschide <b>Înlocuire</b>. Alegi unde cauți (câmpul curent sau tot documentul) și cum se potrivește: <b>Orice parte a câmpului</b>, <b>Câmpul întreg</b>, <b>Începutul câmpului</b>.</p>
<div class="tblwrap"><table><thead><tr><th>Metacaracter</th><th>Înlocuiește</th><th>Exemplu</th></tr></thead><tbody>
<tr><td><code>*</code></td><td>oricâte caractere</td><td><code>*escu</code> găsește Popescu, Ionescu, Petrescu</td></tr>
<tr><td><code>?</code></td><td>exact un caracter</td><td><code>?na</code> găsește Ana</td></tr>
<tr><td><code>#</code></td><td>o cifră</td><td><code>19##</code> găsește anii 1900–1999</td></tr>
<tr><td><code>[ ]</code></td><td>un caracter din listă</td><td><code>[MS]*</code> începe cu M sau S</td></tr>
</tbody></table></div>
<h3>Filtrele</h3>
<p>Un filtru ascunde temporar înregistrările care nu corespund condiției. În bara de navigare apare <b>Filtrat</b>.</p>
<dl class="term">
<dt>Filtru după selecție</dt><dd>Selectezi o valoare (ex.: Brăila) și apeși <span class="ui">Selecție › Egal cu „Brăila”</span>. Alte variante: Nu este egal cu, Conține, Nu conține.</dd>
<dt>Filtre comune</dt><dd>Săgeata din antetul coloanei: bifezi valorile dorite sau alegi <b>Filtre text</b> (începe cu, conține), <b>Filtre număr</b> (mai mare decât, între), <b>Filtre dată</b> (luna aceasta, înainte de).</dd>
<dt>Filtrare după formular</dt><dd><span class="ui">Complex › Filtrare după formular</span>: completezi condiții în mai multe câmpuri (se combină cu ȘI) și în fila <b>Sau</b> (se combină cu SAU).</dd>
<dt>Filtrare/sortare complexă</dt><dd>O grilă asemănătoare cu cea a interogărilor; filtrul se poate salva ca interogare.</dd>
<dt>Comutare filtru</dt><dd>Activează sau dezactivează ultimul filtru, fără să-l ștergi.</dd>
</dl>
<div class="box retine"><div class="bt">Reține</div><p>Mai multe filtre aplicate pe câmpuri diferite se combină cu <b>ȘI</b>: Localitate = Brăila <b>și</b> Media ≥ 9. Filtrul nu șterge date, doar le ascunde.</p></div>
<p>Exersează pe foaia de date de mai jos: clic pe un antet ca să selectezi coloana, clic pe o celulă pentru filtru după selecție.</p>
<div class="box exemplu"><div class="bt">Încearcă</div><p>Selectează coloana Media și apasă Z→A; apoi scrie criteriul <code>&gt;=9</code> și apasă „Aplică filtrul”.</p></div>`,
  exercitii: [
    { id: "o8e1", tip: "datasheet", enunt: "Afișează doar <b>romanele</b> (Gen = Roman), sortate <b>descrescător după preț</b>.", table: "Carti", expect: { crit: { Gen: "Roman" }, sort: { f: "Pret", dir: "desc" } }, expl: "Ai combinat un filtru după selecție cu o sortare." },
    { id: "o8e2", tip: "datasheet", enunt: "Afișează elevii din <b>Brăila</b> care au <b>media cel puțin 9</b>.", table: "Elevi", expect: { crit: { Localitate: "Brăila", Media: ">=9" } }, expl: "Două filtre pe câmpuri diferite se combină cu ȘI." },
    { id: "o8e3", tip: "datasheet", enunt: "Afișează împrumuturile <b>nerestituite</b>, de la cel mai vechi la cel mai nou.", table: "Imprumuturi", expect: { crit: { Restituit: "No" }, sort: { f: "DataImprumut", dir: "asc" } } },
    { id: "o8e4", tip: "datasheet", enunt: "Afișează elevii al căror nume <b>se termină cu „escu”</b>, sortați alfabetic după prenume.", table: "Elevi", expect: { crit: { Nume: 'Like "*escu"' }, sort: { f: "Prenume", dir: "asc" } }, expl: "Criteriul Like \"*escu\" folosește metacaracterul *." },
    { id: "o8e5", tip: "select", enunt: "Ce comandă folosești?", options: ["Găsire (Ctrl+F)", "Înlocuire (Ctrl+H)", "Filtru după selecție", "Filtrare după formular", "Sortare descendentă"],
      items: [{ text: "Toate aparițiile „Galati” trebuie corectate în „Galați”.", ans: "Înlocuire (Ctrl+H)" }, { text: "Vrei să vezi rapid toți elevii din clasa X A, plecând de la o celulă care conține X A.", ans: "Filtru după selecție" }, { text: "Vrei cărțile cele mai scumpe primele.", ans: "Sortare descendentă" }, { text: "Vrei elevii din Ianca SAU elevii bursieri din Brăila, cu condiții în mai multe câmpuri.", ans: "Filtrare după formular" }, { text: "Vrei să ajungi la înregistrarea elevului Nistor.", ans: "Găsire (Ctrl+F)" }] },
    { id: "o8e6", tip: "quiz", enunt: "Ce găsește căutarea <code>19##</code> în câmpul AnAparitie?", opts: ["Doar anul 1900", "Anii de la 1900 la 1999", "Anii care conțin 19", "Nimic, # nu este permis"], ans: 1, expl: "# înlocuiește exact o cifră." }
  ],
  fisa: {
    titlu: "Găsim repede informația",
    context: "Lucrezi direct în foile de date ale tabelelor din baza ta Biblioteca. Notează numărul de înregistrări afișat după fiecare filtru.",
    cerinte: [
      { text: "Sortează tabelul Elevi după Clasa, apoi după Nume (ambele ascendent). Cine este primul elev din listă?", pct: 10, raspuns: true },
      { text: "Folosind Filtru după selecție, afișează cărțile din genul Poezie. Câte sunt?", pct: 10, raspuns: true },
      { text: "Afișează cărțile apărute înainte de 1900 (Filtre număr › Mai mic decât). Care sunt?", pct: 15, raspuns: true },
      { text: "Cu Filtrare după formular, afișează elevii din Galați SAU elevii din Ianca. Câte înregistrări?", pct: 15, raspuns: true },
      { text: "Afișează elevii bursieri din clasa X B. Scrie numele lor.", pct: 15, raspuns: true },
      { text: "Cu Găsire și înlocuire, înlocuiește în Carti genul „SF” cu „Science-fiction”. Câte înlocuiri s-au făcut? Apoi revino la „SF”.", pct: 15, raspuns: true },
      { text: "Afișează împrumuturile din luna octombrie 2026 (Filtre dată › Între). Câte sunt?", pct: 20, raspuns: true }
    ],
    verificare: ["Știu să sortez după două câmpuri.", "Știu să aplic și să elimin un filtru.", "Am folosit Filtrare după formular cu fila Sau."],
    solutii: `<ol><li>Ene Cristian (IX A).</li><li>2 (Luceafărul, Plumb).</li><li>Moara cu noroc (1881), Luceafărul (1883), O scrisoare pierdută (1884), Amintiri din copilărie (1892).</li><li>5 (3 din Galați, 2 din Ianca).</li><li>Constantin Ana, Moldovan Irina.</li><li>1 înlocuire.</li><li>15 împrumuturi.</li></ol>`
  },
  test: [
    { q: "Unde găsești comenzile de sortare și filtrare?", opts: ["Creare", "Pornire › Sortare și filtrare", "Date externe", "Fișier"], ans: 1, expl: "Grupul Sortare și filtrare din fila Pornire." },
    { q: "Ce face un filtru?", opts: ["Șterge înregistrările care nu corespund", "Ascunde temporar înregistrările care nu corespund", "Mută înregistrările în alt tabel", "Sortează datele"], ans: 1, expl: "Datele nu se pierd." },
    { q: "Sortarea pe mai multe coloane alăturate se face:", opts: ["de la dreapta la stânga", "de la stânga la dreapta", "aleatoriu", "doar după cheia primară"], ans: 1, expl: "Prima coloană din stânga are prioritate." },
    { q: "Metacaracterul * înlocuiește:", opts: ["exact un caracter", "o cifră", "oricâte caractere", "doar litere mari"], ans: 2, expl: "? înlocuiește un singur caracter." },
    { q: "Combinația de taste pentru Înlocuire este:", opts: ["Ctrl+F", "Ctrl+H", "Ctrl+R", "Ctrl+I"], ans: 1, expl: "Ctrl+F este Găsire." },
    { q: "Două filtre aplicate pe câmpuri diferite se combină cu:", opts: ["SAU", "ȘI", "NU", "XOR"], ans: 1, expl: "Ambele condiții trebuie îndeplinite." },
    { q: "Care sunt variante ale filtrului după selecție?", opts: ["Egal cu", "Nu este egal cu", "Conține", "Calculează media"], ans: [0, 1, 2], expl: "Media se calculează în interogări de totaluri." },
    { q: "Cum știi că un tabel este filtrat?", opts: ["Apare mesajul Filtrat în bara de navigare a înregistrărilor", "Tabelul devine roșu", "Se închide panoul de navigare", "Access emite un sunet"], ans: 0, expl: "Bara de jos afișează Filtrat." }
  ]
});

/* ---------------- ORA 9 ---------------- */
LESSONS.push({
  id: 9, unit: "U4", titlu: "Interogări de selecție", titluScurt: "Interogări de selecție",
  rezumat: "Expertul interogare simplă, grila de proiectare, sortare, afișare, interogări pe mai multe tabele.",
  obiective: [
    "explici ce este o interogare și de ce o folosim;",
    "creezi o interogare cu <b>Expertul</b> și în <b>Vizualizare proiect</b>;",
    "folosești rândurile <b>Câmp</b>, <b>Tabel</b>, <b>Sortare</b>, <b>Afișare</b>;",
    "creezi interogări pe mai multe tabele legate."
  ],
  teorie: `
<p>O <b>interogare</b> <span class="en">(query)</span> este o întrebare pusă bazei de date: „Ce elevi au media peste 9?”, „Cine a împrumutat Baltagul?”. Rezultatul arată ca un tabel, dar <b>nu păstrează date proprii</b>: este recalculat din tabele de fiecare dată când rulezi interogarea. Dacă adaugi un elev nou, el apare automat în rezultatul interogării.</p>
<h3>Două moduri de creare</h3>
<dl class="term">
<dt>Expert interogare <span class="en">(Query Wizard)</span></dt><dd><span class="ui">Creare › Expert interogare › Expert interogare simplă</span>: alegi tabelele și câmpurile, apoi numele interogării. Rapid, dar fără criterii.</dd>
<dt>Proiectare interogare <span class="en">(Query Design)</span></dt><dd><span class="ui">Creare › Proiectare interogare</span>: adaugi tabelele și completezi grila de proiectare. Așa vom lucra de acum înainte.</dd>
</dl>
<h3>Grila de proiectare (QBE)</h3>
<div class="tblwrap"><table><thead><tr><th>Rând</th><th>Rol</th></tr></thead><tbody>
<tr><td><b>Câmp</b> <span class="en">(Field)</span></td><td>câmpul afișat sau folosit; dublu clic pe câmp în lista tabelului sau trage-l în grilă; <code>*</code> înseamnă toate câmpurile</td></tr>
<tr><td><b>Tabel</b></td><td>tabelul din care provine câmpul (se completează singur)</td></tr>
<tr><td><b>Sortare</b> <span class="en">(Sort)</span></td><td>Ascendent / Descendent; dacă sortezi după mai multe câmpuri, prioritatea o are cel din stânga</td></tr>
<tr><td><b>Afișare</b> <span class="en">(Show)</span></td><td>bifat = câmpul apare în rezultat; debifat = câmpul se folosește doar pentru criterii sau sortare</td></tr>
<tr><td><b>Criterii</b> și <b>Sau</b> <span class="en">(Criteria, Or)</span></td><td>condițiile pe care le îndeplinesc înregistrările (ora 10)</td></tr>
</tbody></table></div>
<p>Rulezi interogarea cu butonul <span class="ui">! Rulare</span> sau trecând în Vizualizare foaie de date. O salvezi cu Ctrl+S, cu un nume care spune ce face, de exemplu <code>qry_EleviDupaMedie</code>.</p>
<p>Încearcă direct aici: grila de mai jos afișează cărțile ordonate după anul apariției. Schimbă sortarea, debifează un câmp, apasă Rulare.</p>
<div data-qbe='{"tables":["Carti"],"cols":[{"field":"Titlu"},{"field":"Autor"},{"field":"AnAparitie","sort":"Ascendent"}]}'></div>
<h3>Interogări pe mai multe tabele</h3>
<p>Ca să afli <b>cine</b> (Elevi) a împrumutat <b>ce carte</b> (Carti), adaugi în interogare toate tabelele implicate, inclusiv tabelul de legătură Imprumuturi. Access folosește relațiile și afișează doar combinațiile care se potrivesc (<b>asociere internă</b>, <span class="en">inner join</span>).</p>
<div data-qbe='{"tables":["Elevi","Imprumuturi","Carti"],"cols":[{"field":"Nume"},{"field":"Prenume"},{"field":"Titlu"},{"field":"DataImprumut","sort":"Ascendent"}]}'></div>
<div class="box atentie"><div class="bt">Atenție</div><p>Dacă adaugi două tabele <b>fără relație</b> între ele, Access combină fiecare rând din primul cu fiecare rând din al doilea (20 de elevi × 16 cărți = 320 de rânduri fără sens). Verifică întotdeauna linia de asociere dintre tabele.</p></div>
<h3>Vizualizarea SQL</h3>
<p>Orice interogare este, de fapt, o instrucțiune în limbajul <b>SQL</b> <span class="en">(Structured Query Language)</span>. O vezi din <span class="ui">Vizualizare › Vizualizare SQL</span> (în simulator, butonul SQL):</p>
<pre class="sql">SELECT Titlu, Autor, AnAparitie
FROM Carti
ORDER BY AnAparitie;</pre>
<div class="box retine"><div class="bt">Reține</div><ul><li>Interogarea nu păstrează date; le extrage din tabele la fiecare rulare.</li><li>Pentru date din mai multe tabele, adaugă toate tabelele de pe drumul dintre ele.</li></ul></div>`,
  exercitii: [
    { id: "o9e1", tip: "qbe", enunt: "Afișează <b>Titlu</b>, <b>Autor</b> și <b>Pret</b> pentru toate cărțile, de la cea mai scumpă la cea mai ieftină.", start: { tables: ["Carti"] }, ordered: true, sol: { tables: ["Carti"], cols: [{ field: "Titlu" }, { field: "Autor" }, { field: "Pret", sort: "Descendent" }] } },
    { id: "o9e2", tip: "qbe", enunt: "Afișează <b>Nume</b>, <b>Prenume</b> și <b>Clasa</b> pentru toți elevii, sortați după <b>clasă</b>, iar în cadrul clasei <b>alfabetic după nume</b>.", start: { tables: ["Elevi"] }, ordered: true, hint: "Coloana Clasa trebuie să fie în stânga coloanei Nume, ca să aibă prioritate la sortare. Poți pune Clasa prima.", sol: { tables: ["Elevi"], cols: [{ field: "Clasa", sort: "Ascendent" }, { field: "Nume", sort: "Ascendent" }, { field: "Prenume" }] } },
    { id: "o9e3", tip: "qbe", enunt: "Afișează <b>numele elevului</b>, <b>prenumele</b> și <b>titlul cărții</b> pentru fiecare împrumut.", start: { tables: [] }, hint: "Ai nevoie de trei tabele: Elevi, Imprumuturi și Carti.", sol: { tables: ["Elevi", "Imprumuturi", "Carti"], cols: [{ field: "Nume" }, { field: "Prenume" }, { field: "Titlu" }] }, expl: "Access a folosit cele două relații ca să lege tabelele." },
    { id: "o9e4", tip: "qbe", enunt: "Afișează doar <b>Nume</b> și <b>Prenume</b> ale elevilor, ordonați <b>descrescător după medie</b>, fără să afișezi media.", start: { tables: ["Elevi"] }, ordered: true, hint: "Pune câmpul Media în grilă, alege sortarea Descendent și debifează Afișare.", sol: { tables: ["Elevi"], cols: [{ field: "Nume" }, { field: "Prenume" }, { field: "Media", sort: "Descendent", show: false }] } },
    { id: "o9e5", tip: "select", enunt: "Ce rând al grilei de proiectare folosești?", options: ["Câmp", "Sortare", "Afișare", "Criterii", "Tabel"],
      items: [{ text: "Vrei ca un câmp folosit pentru sortare să nu apară în rezultat.", ans: "Afișare" }, { text: "Vrei să alegi ce câmpuri apar în rezultat.", ans: "Câmp" }, { text: "Vrei rezultatul ordonat alfabetic.", ans: "Sortare" }, { text: "Vrei doar elevii din Brăila.", ans: "Criterii" }] },
    { id: "o9e6", tip: "quiz", enunt: "Ai salvat interogarea qry_Bursieri. Mâine adaugi un elev bursier nou în tabelul Elevi. Ce se întâmplă când deschizi interogarea?", opts: ["Elevul nou apare automat în rezultat", "Trebuie refăcută interogarea", "Elevul apare doar dacă îl adaugi în interogare", "Interogarea dă eroare"], ans: 0, expl: "Interogarea recalculează rezultatul din tabele la fiecare rulare." }
  ],
  fisa: {
    titlu: "Primele interogări",
    context: "Creează fiecare interogare în Access cu <span class=\"ui\">Creare › Proiectare interogare</span> și salveaz-o cu numele indicat. Poți încerca întâi în <a href=\"#laborator\">Laboratorul de interogări</a>.",
    cerinte: [
      { text: "<b>qry_ListaCarti</b>: Titlu, Autor, Gen, sortate după Gen, apoi după Titlu. Creeaz-o mai întâi cu Expertul, apoi adaugă sortarea în Vizualizare proiect.", pct: 15 },
      { text: "<b>qry_EleviPeClase</b>: Clasa, Nume, Prenume, sortați după clasă și nume. Care este ultimul elev?", pct: 15, raspuns: true },
      { text: "<b>qry_CartiNoi</b>: Titlu și AnAparitie, de la cea mai nouă carte la cea mai veche. Care este cea mai nouă?", pct: 10, raspuns: true },
      { text: "<b>qry_CineCeCiteste</b>: Nume, Prenume, Clasa, Titlu, DataImprumut, sortate după dată. Câte înregistrări are rezultatul?", pct: 20, raspuns: true },
      { text: "<b>qry_Cititori</b>: Nume și Prenume ale elevilor care au împrumuturi, fără a afișa alte câmpuri. Unii elevi apar de mai multe ori. De ce?", pct: 15, raspuns: true },
      { text: "Deschide qry_CineCeCiteste în Vizualizare SQL și copiază instrucțiunea.", pct: 15, raspuns: true },
      { text: "Adaugă în interogarea qry_CineCeCiteste și tabelul Carti de două ori. Ce observi? Elimină apoi tabelul în plus.", pct: 10, raspuns: true }
    ],
    verificare: ["Am salvat interogările cu nume clare.", "Știu să ascund un câmp folosit doar la sortare.", "Am creat o interogare pe trei tabele."],
    solutii: `<p>2. Radu Ștefan: ordinea alfabetică a claselor este IX A, IX B, X A, X B, XI A, XII B, iar în XII B ordinea este Lungu, Matei, Radu. 3. Scurtă istorie a timpului (1988). 4. 25 de înregistrări. 5. Fiecare împrumut produce un rând; elevii cu mai multe împrumuturi apar de mai multe ori. 6. SELECT Nume, Prenume, Clasa, Titlu, DataImprumut FROM (Elevi INNER JOIN Imprumuturi ON …) INNER JOIN Carti ON … ORDER BY DataImprumut;</p>`
  },
  test: [
    { q: "Ce este o interogare?", opts: ["Un tabel care păstrează o copie a datelor", "O întrebare pusă bazei de date, al cărei rezultat se recalculează din tabele", "Un formular de introducere", "Un fișier extern"], ans: 1, expl: "Interogarea nu păstrează date proprii." },
    { q: "Ce face debifarea casetei Afișare?", opts: ["Șterge câmpul din tabel", "Câmpul nu apare în rezultat, dar poate fi folosit la criterii sau sortare", "Ascunde tabelul", "Anulează sortarea"], ans: 1, expl: "Câmpul rămâne în grilă." },
    { q: "Ce semn din grilă înseamnă toate câmpurile unui tabel?", opts: ["#", "*", "?", "&"], ans: 1, expl: "Tabel.* adaugă toate câmpurile." },
    { q: "Pentru a afișa numele elevilor și titlurile cărților împrumutate ai nevoie de tabelele:", opts: ["Elevi și Carti", "Elevi, Imprumuturi și Carti", "doar Imprumuturi", "Elevi și Imprumuturi"], ans: 1, expl: "Imprumuturi face legătura." },
    { q: "Dacă sortezi după două câmpuri, prioritatea o are:", opts: ["câmpul din dreapta", "câmpul din stânga", "câmpul numeric", "cheia primară"], ans: 1, expl: "Sortarea se face de la stânga la dreapta." },
    { q: "Ce instrucțiune SQL corespunde unei interogări de selecție?", opts: ["UPDATE", "SELECT", "DELETE", "INSERT"], ans: 1, expl: "SELECT … FROM …" },
    { q: "Ce se întâmplă dacă adaugi într-o interogare două tabele fără relație?", opts: ["Access dă eroare", "Fiecare rând din primul se combină cu fiecare rând din al doilea", "Se afișează doar primul tabel", "Se creează automat relația"], ans: 1, expl: "Produs cartezian: multe rânduri fără sens." },
    { q: "Unde găsești comanda Proiectare interogare?", opts: ["Pornire", "Creare", "Date externe", "Instrumente bază de date"], ans: 1, expl: "Fila Creare." }
  ]
});

/* ---------------- ORA 10 ---------------- */
LESSONS.push({
  id: 10, unit: "U4", titlu: "Criterii în interogări", titluScurt: "Criterii în interogări",
  rezumat: "Operatori de comparare, Between, Like, In, Is Null, Not, date calendaristice, ȘI și SAU.",
  obiective: [
    "scrii criterii pentru text, numere, date și câmpuri Da/Nu;",
    "folosești <b>Between…And</b>, <b>Like</b>, <b>In</b>, <b>Is Null</b>, <b>Not</b>;",
    "combini condiții cu <b>ȘI</b> (același rând) și <b>SAU</b> (rânduri diferite);",
    "verifici rezultatul unei interogări numărând înregistrările."
  ],
  teorie: `
<p>Criteriile se scriu în rândul <b>Criterii</b>, sub câmpul la care se referă. Access compară valoarea fiecărei înregistrări cu criteriul și păstrează doar înregistrările care îl îndeplinesc.</p>
<h3>Criterii de bază</h3>
<div class="tblwrap"><table><thead><tr><th>Tip câmp</th><th>Criteriu</th><th>Rezultat</th></tr></thead><tbody>
<tr><td>Text</td><td><code>"Brăila"</code> sau <code>Brăila</code></td><td>Localitate egală cu Brăila (Access adaugă ghilimelele)</td></tr>
<tr><td>Număr</td><td><code>&gt;=9</code></td><td>media cel puțin 9</td></tr>
<tr><td>Număr</td><td><code>&lt;&gt;5</code></td><td>diferit de 5</td></tr>
<tr><td>Dată</td><td><code>&gt;=#01.10.2026#</code></td><td>de la 1 octombrie 2026; datele se scriu între semne <code>#</code></td></tr>
<tr><td>Da/Nu</td><td><code>Yes</code> / <code>No</code> (sau <code>True</code> / <code>False</code>)</td><td>bursierii / nebursierii</td></tr>
</tbody></table></div>
<p>Operatori de comparare: <code>=</code> egal, <code>&lt;&gt;</code> diferit, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.</p>
<h3>Operatori speciali</h3>
<div class="tblwrap"><table><thead><tr><th>Operator</th><th>Exemplu</th><th>Înseamnă</th></tr></thead><tbody>
<tr><td><b>Between … And</b></td><td><code>Between 1900 And 1950</code></td><td>în interval, inclusiv capetele</td></tr>
<tr><td><b>Like</b></td><td><code>Like "M*"</code> · <code>Like "*escu"</code> · <code>Like "*noapte*"</code> · <code>Like "?a*"</code></td><td>începe cu M · se termină cu escu · conține „noapte” · a doua literă este a</td></tr>
<tr><td><b>In</b></td><td><code>In("Ianca";"Făurei")</code></td><td>una dintre valorile din listă</td></tr>
<tr><td><b>Is Null</b> / <b>Is Not Null</b></td><td><code>Is Null</code></td><td>câmp necompletat / completat</td></tr>
<tr><td><b>Not</b></td><td><code>Not "Brăila"</code></td><td>orice în afară de Brăila</td></tr>
</tbody></table></div>
<h3>ȘI și SAU</h3>
<div class="box retine"><div class="bt">Regula de aur</div><ul>
<li>Criterii pe <b>același rând</b> → trebuie îndeplinite <b>toate</b> (ȘI).</li>
<li>Criterii pe <b>rânduri diferite</b> (Criterii, Sau) → este suficient <b>unul</b> (SAU).</li>
<li>În aceeași celulă: <code>"Brăila" Or "Galați"</code>, <code>&gt;=5 And &lt;=7</code>.</li>
</ul></div>
<p>Exemplu: elevii din <b>Brăila</b> ȘI cu media cel puțin 9: ambele criterii pe rândul Criterii.</p>
<div data-qbe='{"tables":["Elevi"],"cols":[{"field":"Nume"},{"field":"Prenume"},{"field":"Localitate","crit":"Brăila"},{"field":"Media","crit":">=9"}]}'></div>
<p>Exemplu: elevii din <b>Ianca</b> SAU elevii cu media sub 7: criteriile pe rânduri diferite.</p>
<div data-qbe='{"tables":["Elevi"],"cols":[{"field":"Nume"},{"field":"Prenume"},{"field":"Localitate","crit":"Ianca"},{"field":"Media","or":["<7"]}]}'></div>
<div class="box atentie"><div class="bt">Greșeli frecvente</div><ul>
<li>Criteriul scris sub alt câmp decât cel la care se referă.</li>
<li><code>Like "M"</code> fără steluță caută exact textul „M”.</li>
<li>Datele scrise fără <code>#</code>: <code>01.10.2026</code> nu este înțeles ca dată în toate situațiile.</li>
<li>O condiție de tip ȘI scrisă pe rânduri diferite produce prea multe rezultate.</li>
</ul></div>
<div class="box stiai"><div class="bt">Știai că?</div><p>În SQL, criteriile apar după cuvântul <b>WHERE</b>: <code>WHERE Localitate="Brăila" AND Media&gt;=9</code>. Apasă butonul SQL din simulator ca să vezi cum transformă Access grila în SQL.</p></div>`,
  exercitii: [
    { id: "o10e1", tip: "qbe", enunt: "Afișează <b>Nume</b>, <b>Prenume</b> și <b>Localitate</b> pentru elevii din <b>Galați</b>.", start: { tables: ["Elevi"] }, sol: { tables: ["Elevi"], cols: [{ field: "Nume" }, { field: "Prenume" }, { field: "Localitate", crit: "Galați" }] } },
    { id: "o10e2", tip: "qbe", enunt: "Afișează <b>Titlu</b> și <b>AnAparitie</b> pentru cărțile apărute <b>între 1900 și 1950</b>, inclusiv.", start: { tables: ["Carti"] }, sol: { tables: ["Carti"], cols: [{ field: "Titlu" }, { field: "AnAparitie", crit: "Between 1900 And 1950" }] } },
    { id: "o10e3", tip: "qbe", enunt: "Afișează <b>Nume</b> și <b>Prenume</b> pentru elevii al căror nume <b>se termină cu „escu”</b>.", start: { tables: ["Elevi"] }, sol: { tables: ["Elevi"], cols: [{ field: "Nume", crit: 'Like "*escu"' }, { field: "Prenume" }] } },
    { id: "o10e4", tip: "qbe", enunt: "Afișează <b>Nume</b>, <b>Clasa</b> și <b>Media</b> pentru elevii din clasele <b>X A</b> sau <b>X B</b> care au <b>media cel puțin 9</b>.", start: { tables: ["Elevi"] }, hint: "Fie scrii <code>In(\"X A\";\"X B\")</code> sub Clasa și <code>&gt;=9</code> sub Media, fie folosești două rânduri și repeți <code>&gt;=9</code> pe fiecare.", sol: { tables: ["Elevi"], cols: [{ field: "Nume" }, { field: "Clasa", crit: 'In("X A";"X B")' }, { field: "Media", crit: ">=9" }] } },
    { id: "o10e5", tip: "qbe", enunt: "Afișează <b>numele elevului</b> și <b>titlul cărții</b> pentru împrumuturile <b>nerestituite</b>. Câmpul Restituit nu trebuie să apară în rezultat.", start: { tables: ["Elevi", "Imprumuturi", "Carti"] }, sol: { tables: ["Elevi", "Imprumuturi", "Carti"], cols: [{ field: "Nume" }, { field: "Titlu" }, { field: "Restituit", crit: "No", show: false }] } },
    { id: "o10e6", tip: "qbe", enunt: "Afișează <b>Nume</b>, <b>Prenume</b> și <b>Telefon</b> pentru elevii care <b>nu au trecut numărul de telefon</b>.", start: { tables: ["Elevi"] }, sol: { tables: ["Elevi"], cols: [{ field: "Nume" }, { field: "Prenume" }, { field: "Telefon", crit: "Is Null" }] } },
    { id: "o10e7", tip: "qbe", enunt: "Afișează <b>IdImprumut</b>, <b>IdElev</b> și <b>DataImprumut</b> pentru împrumuturile făcute în <b>octombrie 2026</b>.", start: { tables: ["Imprumuturi"] }, hint: "Datele se scriu între #: <code>Between #01.10.2026# And #31.10.2026#</code>.", sol: { tables: ["Imprumuturi"], cols: [{ field: "IdImprumut" }, { field: "IdElev" }, { field: "DataImprumut", crit: "Between #01.10.2026# And #31.10.2026#" }] } },
    { id: "o10e8", tip: "select", enunt: "Ce criteriu se potrivește cerinței?", options: ['Like "M*"', 'Like "*a"', "Between 20 And 40", 'Not "Roman"', "Is Not Null", ">#31.12.1999#", 'In("Poezie";"Teatru")'],
      items: [{ text: "Titluri care încep cu M", ans: 'Like "M*"' }, { text: "Prețuri de la 20 la 40 de lei", ans: "Between 20 And 40" }, { text: "Toate genurile în afară de Roman", ans: 'Not "Roman"' }, { text: "Elevi care au completat telefonul", ans: "Is Not Null" }, { text: "Prenume care se termină cu a", ans: 'Like "*a"' }, { text: "Împrumuturi făcute după anul 1999", ans: ">#31.12.1999#" }, { text: "Cărți de poezie sau teatru", ans: 'In("Poezie";"Teatru")' }] }
  ],
  fisa: {
    titlu: "Întrebări precise pentru baza de date",
    context: "Pentru fiecare cerință creează o interogare, salveaz-o cu numele dat și scrie numărul de înregistrări obținut. Verifică-ți rezultatele în <a href=\"#laborator\">Laborator</a>.",
    cerinte: [
      { text: "<b>qry_EleviIanca</b>: Nume, Prenume, Clasa pentru elevii din Ianca.", pct: 10, raspuns: true },
      { text: "<b>qry_CartiIeftine</b>: Titlu, Pret pentru cărțile cu prețul sub 20 de lei.", pct: 10, raspuns: true },
      { text: "<b>qry_Clasici</b>: Titlu, Autor, AnAparitie pentru cărțile apărute înainte de 1900, sortate după an.", pct: 10, raspuns: true },
      { text: "<b>qry_TitluCuNoapte</b>: cărțile al căror titlu conține cuvântul „noapte”.", pct: 10, raspuns: true },
      { text: "<b>qry_BursieriBraila</b>: bursierii din Brăila (câmpul Bursier nu se afișează).", pct: 15, raspuns: true },
      { text: "<b>qry_ExtremeMedii</b>: elevii cu media sub 7 SAU peste 9,5.", pct: 15, raspuns: true },
      { text: "<b>qry_Restante</b>: Nume, Clasa, Titlu, DataImprumut pentru cărțile nerestituite împrumutate înainte de 10.10.2026.", pct: 20, raspuns: true },
      { text: "Explică de ce criteriile <code>Brăila</code> sub Localitate și <code>&gt;=9</code> sub Media dau rezultate diferite când sunt pe același rând și când sunt pe rânduri diferite.", pct: 10, raspuns: true }
    ],
    verificare: ["Am scris datele calendaristice între #.", "Am folosit Like cu metacaractere.", "Știu când pun criteriile pe același rând și când pe rânduri diferite."],
    solutii: `<ol><li>2 înregistrări (Dumitru, Ene).</li><li>4 (Moara cu noroc, Luceafărul, Amintiri din copilărie, Plumb).</li><li>4 cărți.</li><li>1 (Ultima noapte de dragoste…), criteriul <code>Like "*noapte*"</code>.</li><li>5 (Popescu, Ionescu, Marin, Constantin, Moldovan).</li><li>Media &lt;7: Gheorghe 6,85, Barbu 6,50, Nistor 5,90; &gt;9,5: Ionescu, Marin, Constantin, Moldovan → 7 înregistrări.</li><li>6 (împrumuturile 4, 7, 10, 13, 16 și 18).</li><li>Același rând = ȘI (doar elevii din Brăila cu media ≥ 9: 5); rânduri diferite = SAU (toți din Brăila plus toți cu media ≥ 9: 12).</li></ol>`
  },
  test: [
    { q: "Cum se scrie o dată calendaristică într-un criteriu?", opts: ["între ghilimele", "între semne #", "între paranteze drepte", "fără niciun semn"], ans: 1, expl: "Exemplu: #01.10.2026#." },
    { q: "Criteriul <code>Like \"*escu\"</code> găsește:", opts: ["nume care încep cu escu", "nume care se termină cu escu", "doar numele Escu", "nume de 4 litere"], ans: 1, expl: "* înlocuiește orice început." },
    { q: "Criterii scrise pe același rând al grilei se combină cu:", opts: ["SAU", "ȘI", "NU", "depinde de câmp"], ans: 1, expl: "Rânduri diferite = SAU." },
    { q: "<code>Between 10 And 20</code> include valorile 10 și 20?", opts: ["Da", "Nu", "Doar 10", "Doar 20"], ans: 0, expl: "Between include capetele." },
    { q: "Ce criteriu afișează câmpurile necompletate?", opts: ["=0", "Is Null", "\"\"", "Not"], ans: 1, expl: "Null înseamnă lipsa valorii." },
    { q: "Care criterii selectează elevii din Ianca sau Făurei?", opts: ["In(\"Ianca\";\"Făurei\")", "\"Ianca\" Or \"Făurei\"", "\"Ianca\" And \"Făurei\"", "Ianca pe rândul Criterii și Făurei pe rândul Sau"], ans: [0, 1, 3], expl: "Un câmp nu poate fi în același timp egal cu două valori diferite." },
    { q: "Pentru un câmp Da/Nu, criteriul care selectează valorile bifate este:", opts: ["Yes", "Null", "\"Bifat\"", "1"], ans: 0, expl: "Yes sau True." },
    { q: "Criteriul <code>Not \"Roman\"</code> sub câmpul Gen afișează:", opts: ["doar romanele", "toate cărțile care nu sunt romane", "nicio carte", "cărțile fără gen"], ans: 1, expl: "Not neagă condiția." }
  ]
});
