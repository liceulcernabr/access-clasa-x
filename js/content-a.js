/* =========================================================
   Conținut: unitățile și orele 1–5
   Pentru a adăuga o întrebare: copiază un obiect din „test”.
   Pentru un exercițiu nou: copiază un obiect din „exercitii”
   și dă-i un id unic (ex.: "o3e7").
   ========================================================= */
window.LESSONS = window.LESSONS || [];
window.UNITS = [
  { cod: "U1", titlu: "Baze de date: noțiuni și proiectare" },
  { cod: "U2", titlu: "Tabele" },
  { cod: "U3", titlu: "Relații și organizarea datelor" },
  { cod: "U4", titlu: "Interogări" },
  { cod: "U5", titlu: "Formulare și rapoarte" }
];

/* ---------------- ORA 1 ---------------- */
LESSONS.push({
  id: 1, unit: "U1", titlu: "Ce este o bază de date", titluScurt: "Ce este o bază de date",
  rezumat: "Date și informații, tabel, câmp, înregistrare, SGBD și obiectele unei baze de date Access.",
  obiective: [
    "explici diferența dintre <b>date</b> și <b>informații</b>;",
    "recunoști într-un tabel <b>câmpurile</b>, <b>înregistrările</b> și <b>valorile</b>;",
    "spui ce este un <b>SGBD</b> și dai exemple;",
    "numești cele patru obiecte principale din Access și rolul fiecăruia."
  ],
  teorie: `
<p>În fiecare zi folosești baze de date fără să le vezi: catalogul electronic al școlii, lista de produse a unui magazin online, contactele din telefon, orarul trenurilor. Toate păstrează multe date organizate, ca să poată fi găsite și prelucrate rapid.</p>
<h3>Date și informații</h3>
<dl class="term">
  <dt>Date</dt><dd>Fapte brute, fără context: <code>9,25</code>, <code>Popescu</code>, <code>14.03.2010</code>.</dd>
  <dt>Informație</dt><dd>Date prelucrate care au un înțeles: „Andrei Popescu din X A are media 9,25 și primește bursă.”</dd>
  <dt>Bază de date</dt><dd>O colecție de date <b>organizate</b> și <b>legate între ele</b>, păstrate pe un suport de memorare, despre un anumit subiect.</dd>
</dl>
<h3>Tabelul: locul în care stau datele</h3>
<p>Într-o bază de date relațională, datele stau în <b>tabele</b>. Fiecare tabel descrie un singur subiect. Iată primele rânduri din tabelul <b>Elevi</b> al bazei de date cu care vom lucra tot anul:</p>
<div data-ds="Elevi" data-limit="5" data-cols="IdElev,Nume,Prenume,Clasa,Localitate,Media,Bursier"></div>
<div class="tblwrap"><table><thead><tr><th>Termen</th><th>În tabel este…</th><th>Exemplu</th></tr></thead><tbody>
<tr><td><b>Câmp</b> <span class="en">(field)</span></td><td>o coloană; descrie o caracteristică</td><td>Localitate</td></tr>
<tr><td><b>Înregistrare</b> <span class="en">(record)</span></td><td>un rând; toate datele despre un element</td><td>rândul elevului Ionescu Maria</td></tr>
<tr><td><b>Valoare</b></td><td>conținutul unei celule</td><td>Brăila</td></tr>
<tr><td><b>Cheie primară</b> <span class="en">(primary key)</span></td><td>câmpul care identifică unic fiecare înregistrare</td><td>IdElev</td></tr>
</tbody></table></div>
<div class="box retine"><div class="bt">Reține</div><p>Un <b>câmp</b> este o coloană, o <b>înregistrare</b> este un rând. Toate valorile dintr-un câmp au același tip (de exemplu, numai date calendaristice în câmpul DataNasterii).</p></div>
<h3>Sistemul de gestiune a bazelor de date (SGBD)</h3>
<p>Un <b>SGBD</b> <span class="en">(DBMS – Database Management System)</span> este programul care creează baza de date, păstrează datele în siguranță și permite adăugarea, modificarea, căutarea și ștergerea lor. Exemple: <b>Microsoft Access</b>, LibreOffice Base, MySQL, PostgreSQL, Microsoft SQL Server, Oracle.</p>
<p>Access este potrivit pentru baze de date mici și medii (o școală, o bibliotecă, un club) și are o interfață grafică prietenoasă. Fișierul unei baze de date Access are extensia <code>.accdb</code> (versiunile vechi foloseau <code>.mdb</code>). <b>Toate</b> obiectele bazei de date stau într-un singur fișier.</p>
<h3>De ce nu folosim doar Excel?</h3>
<ul>
<li><b>Mai puține repetări:</b> datele unui elev se scriu o singură dată, chiar dacă împrumută 20 de cărți.</li>
<li><b>Date corecte:</b> poți impune reguli (media între 1 și 10, data nașterii în trecut).</li>
<li><b>Legături între tabele:</b> Access nu te lasă să înregistrezi un împrumut pentru un elev care nu există.</li>
<li><b>Întrebări complexe:</b> „Ce cărți au împrumutat elevii din Brăila în octombrie?” se rezolvă cu o interogare.</li>
<li><b>Mai mulți utilizatori</b> pot lucra în același timp pe aceeași bază de date.</li>
</ul>
<h3>Obiectele unei baze de date Access</h3>
<div class="tblwrap"><table><thead><tr><th>Obiect</th><th>La ce folosește</th><th>În biblioteca noastră</th></tr></thead><tbody>
<tr><td><b>Tabel</b> <span class="en">(Table)</span></td><td>păstrează datele</td><td>Elevi, Carti, Imprumuturi</td></tr>
<tr><td><b>Interogare</b> <span class="en">(Query)</span></td><td>extrage, combină, calculează sau modifică date</td><td>„cărțile nereturnate”</td></tr>
<tr><td><b>Formular</b> <span class="en">(Form)</span></td><td>introducerea și vizualizarea comodă a datelor, câte o înregistrare</td><td>fișa de înscriere a unui elev</td></tr>
<tr><td><b>Raport</b> <span class="en">(Report)</span></td><td>prezentarea datelor pentru tipărire, cu grupări și totaluri</td><td>situația împrumuturilor pe clase</td></tr>
</tbody></table></div>
<p>Access mai are <b>macrocomenzi</b> <span class="en">(Macros)</span> și <b>module</b> <span class="en">(Modules – cod VBA)</span>, pentru automatizări. Nu fac parte din programa clasei a X-a.</p>
<div class="box stiai"><div class="bt">Știai că?</div><p>Modelul relațional, cu date organizate în tabele legate prin chei, a fost propus în 1970 de matematicianul Edgar F. Codd, cercetător la IBM. Aproape toate bazele de date folosite azi pornesc de la ideea lui.</p></div>`,
  exercitii: [
    { id: "o1e1", tip: "select", enunt: "Privește tabelul Elevi din teorie. Ce reprezintă fiecare element?", options: ["Câmp", "Înregistrare", "Valoare", "Cheie primară"],
      items: [{ text: "Coloana <b>Localitate</b>", ans: "Câmp" }, { text: "Rândul cu datele elevei Ionescu Maria", ans: "Înregistrare" }, { text: "<b>9,80</b>, media elevei Ionescu", ans: "Valoare" }, { text: "<b>IdElev</b>, cod diferit pentru fiecare elev", ans: "Cheie primară" }, { text: "Coloana <b>Media</b>", ans: "Câmp" }, { text: "<b>X A</b>, clasa lui Popescu Andrei", ans: "Valoare" }] },
    { id: "o1e2", tip: "select", enunt: "Ce obiect Access folosești în fiecare situație?", options: ["Tabel", "Interogare", "Formular", "Raport"],
      items: [{ text: "Vrei să păstrezi lista tuturor cărților din bibliotecă.", ans: "Tabel" }, { text: "Vrei să afli care elevi au media peste 9.", ans: "Interogare" }, { text: "Bibliotecara vrea un ecran comod în care să înscrie elevi noi, unul câte unul.", ans: "Formular" }, { text: "Directoarea cere o situație tipărită a împrumuturilor, grupată pe clase.", ans: "Raport" }, { text: "Vrei să afli câte cărți are fiecare gen literar.", ans: "Interogare" }] },
    { id: "o1e3", tip: "quiz", enunt: "Care dintre programele de mai jos sunt sisteme de gestiune a bazelor de date?", opts: ["Microsoft Access", "MySQL", "Microsoft PowerPoint", "Oracle", "Paint"], ans: [0, 1, 3], expl: "PowerPoint face prezentări, Paint editează imagini. Access, MySQL și Oracle gestionează baze de date." },
    { id: "o1e4", tip: "fill", enunt: "Completează spațiile libere.", items: [
      { text: "Fișierul unei baze de date Access 2007 sau mai nouă are extensia ___.", ans: [".accdb", "accdb"] },
      { text: "Un rând dintr-un tabel se numește ___.", ans: ["înregistrare", "inregistrare", "record"] },
      { text: "O coloană dintr-un tabel se numește ___.", ans: ["câmp", "camp", "field"] },
      { text: "Prescurtarea pentru sistem de gestiune a bazelor de date este ___.", ans: ["SGBD"] }] },
    { id: "o1e5", tip: "quiz", enunt: "Care propoziție descrie o <b>informație</b>, nu doar o dată?", opts: ["16,5", "Bacovia", "Volumul „Plumb” de George Bacovia costă 16,50 lei și biblioteca are 5 exemplare.", "1916"], ans: 2, expl: "Informația are context și înțeles; celelalte sunt valori izolate." }
  ],
  fisa: {
    titlu: "Analizăm baza de date a bibliotecii",
    context: "Deschide pagina <a href=\"#date\">Datele de lucru</a> și răspunde la cerințe privind tabelele bazei de date Biblioteca.",
    cerinte: [
      { text: "Scrie numele celor trei tabele ale bazei de date și subiectul descris de fiecare.", pct: 15, raspuns: true },
      { text: "Câte <b>câmpuri</b> și câte <b>înregistrări</b> are tabelul <b>Carti</b>?", pct: 10, raspuns: true },
      { text: "Care este cheia primară a tabelului <b>Imprumuturi</b>? De ce nu poate fi folosit câmpul IdElev drept cheie primară în acest tabel?", pct: 15, raspuns: true },
      { text: "Dă un exemplu de <b>dată</b> din tabelul Carti și transformă-l într-o <b>informație</b> (o propoziție cu înțeles).", pct: 10, raspuns: true },
      { text: "Pentru fiecare obiect (tabel, interogare, formular, raport) scrie câte o utilizare concretă pentru biblioteca școlii.", pct: 20, raspuns: true },
      { text: "Numește trei avantaje ale unei baze de date Access față de o listă ținută într-un singur tabel Excel.", pct: 20, raspuns: true },
      { text: "Gândește-te la o altă bază de date pe care o folosești (aplicație, site, joc). Ce tabele crezi că are?", pct: 10, raspuns: true }
    ],
    verificare: ["Am identificat corect câmpurile și înregistrările.", "Pot explica rolul cheii primare.", "Pot da exemple pentru fiecare obiect Access."],
    solutii: `<ol><li>Elevi (cititorii), Carti (fondul de carte), Imprumuturi (cine, ce carte și când a împrumutat).</li><li>Carti: 7 câmpuri, 16 înregistrări.</li><li>IdImprumut. IdElev se repetă (un elev poate avea mai multe împrumuturi), deci nu identifică unic un rând.</li><li>Ex.: dată <code>16,5</code>; informație: „Plumb costă 16,50 lei”.</li><li>Tabel: lista cărților; interogare: cărțile nereturnate; formular: înscrierea unui elev; raport: situația împrumuturilor lunare.</li><li>Fără repetarea datelor, reguli de validare, relații cu integritate, interogări, acces multiutilizator.</li><li>Răspuns liber (ex.: magazin online: Clienti, Produse, Comenzi).</li></ol><p>Barem: 100 de puncte, punctaj acordat proporțional cu corectitudinea.</p>`
  },
  test: [
    { q: "Ce este o bază de date?", opts: ["Un program de calcul tabelar", "O colecție de date organizate și legate între ele", "Un document Word cu tabele", "Un folder cu fișiere"], ans: 1, expl: "Baza de date conține date organizate și corelate, despre un subiect." },
    { q: "Într-un tabel, o înregistrare corespunde unui(unei):", opts: ["coloane", "rând", "celule", "fișier"], ans: 1, expl: "Înregistrarea este rândul cu toate datele unui element." },
    { q: "Ce obiect Access se folosește pentru a tipări date grupate și totalizate?", opts: ["Formularul", "Tabelul", "Raportul", "Interogarea"], ans: 2, expl: "Rapoartele sunt făcute pentru prezentare și tipărire." },
    { q: "Extensia fișierelor Access moderne este:", opts: [".xlsx", ".accdb", ".docx", ".pptx"], ans: 1, expl: ".accdb, de la Access 2007 încoace." },
    { q: "Care sunt SGBD-uri?", opts: ["MySQL", "Access", "Word", "SQL Server"], ans: [0, 1, 3], expl: "Word este procesor de text." },
    { q: "Cheia primară este câmpul care:", opts: ["conține cele mai multe caractere", "identifică unic fiecare înregistrare", "apare primul în tabel", "nu poate fi modificat de nimeni"], ans: 1, expl: "Valorile cheii primare nu se repetă și nu sunt goale." },
    { q: "Într-o bază de date Access, tabelele, interogările, formularele și rapoartele se păstrează:", opts: ["în fișiere separate", "într-un singur fișier .accdb", "doar în memoria RAM", "în foldere diferite"], ans: 1, expl: "Toate obiectele stau într-un singur fișier." },
    { q: "„Liceul are 620 de elevi, dintre care 312 fete.” Acesta este un exemplu de:", opts: ["dată brută", "informație", "câmp", "cheie primară"], ans: 1, expl: "Are context și înțeles, deci este informație." }
  ]
});

/* ---------------- ORA 2 ---------------- */
LESSONS.push({
  id: 2, unit: "U1", titlu: "Mediul de lucru Microsoft Access", titluScurt: "Mediul de lucru Access",
  rezumat: "Crearea și deschiderea unei baze de date, panglica, panoul de navigare și vizualizările.",
  obiective: [
    "creezi o bază de date necompletată și o salvezi cu un nume ales de tine;",
    "recunoști filele panglicii și panoul de navigare;",
    "treci de la <b>Vizualizare foaie de date</b> la <b>Vizualizare proiect</b> și invers;",
    "înțelegi cum salvează Access datele și obiectele."
  ],
  teorie: `
<h3>Crearea unei baze de date noi</h3>
<div class="box pas"><div class="bt">Pas cu pas</div><ol>
<li>Pornești Access și alegi <span class="ui">Bază de date necompletată</span> <span class="en">(Blank database)</span>.</li>
<li>În dreapta, la <b>Nume fișier</b>, scrii numele, de exemplu <code>Biblioteca_PopescuAndrei</code>.</li>
<li>Apeși pictograma dosar ca să alegi locația (de exemplu, folderul clasei).</li>
<li>Apeși <span class="ui">Creare</span>. Access creează fișierul și deschide un tabel nou, <b>Tabel1</b>.</li>
</ol></div>
<div class="box atentie"><div class="bt">Atenție, diferit de Word și Excel</div><p>Access îți cere numele și locul fișierului <b>înainte</b> să începi lucrul. Înregistrările se salvează <b>automat</b> în momentul în care treci la alt rând. Trebuie să salvezi (Ctrl+S) doar <b>structura obiectelor</b>: un tabel nou, o interogare, un formular.</p></div>
<h3>Deschiderea unei baze de date existente</h3>
<p><span class="ui">Fișier › Deschidere</span> sau dublu clic pe fișierul <code>.accdb</code>. Dacă apare bara galbenă <b>Avertisment de securitate</b>, apasă <span class="ui">Activare conținut</span> doar dacă ai încredere în sursa fișierului.</p>
<h3>Fereastra Access</h3>
<div class="tblwrap"><table><thead><tr><th>Element</th><th>Rol</th></tr></thead><tbody>
<tr><td><b>Fila Fișier</b> <span class="en">(File)</span></td><td>deschidere, salvare ca, Comprimare și reparare, opțiuni</td></tr>
<tr><td><b>Pornire</b> <span class="en">(Home)</span></td><td>vizualizări, copiere, sortare și filtrare, găsire, formatare text</td></tr>
<tr><td><b>Creare</b> <span class="en">(Create)</span></td><td>tabele, interogări, formulare, rapoarte</td></tr>
<tr><td><b>Date externe</b> <span class="en">(External Data)</span></td><td>import și export (Excel, text, PDF)</td></tr>
<tr><td><b>Instrumente bază de date</b> <span class="en">(Database Tools)</span></td><td>Relații, Comprimare și reparare</td></tr>
<tr><td><b>Panoul de navigare</b> <span class="en">(Navigation Pane)</span></td><td>lista tuturor obiectelor bazei de date, în stânga; se deschide sau se ascunde cu F11</td></tr>
<tr><td><b>Bara de navigare a înregistrărilor</b></td><td>jos, în foaia de date: Înregistrare 1 din 20, butoane pentru prima, anterioara, următoarea, ultima și una nouă</td></tr>
</tbody></table></div>
<h3>Vizualizări</h3>
<p>Fiecare obiect se poate deschide în mai multe vizualizări. Schimbi vizualizarea din <span class="ui">Pornire › Vizualizare</span> sau din colțul din dreapta jos al ferestrei.</p>
<dl class="term">
<dt>Vizualizare foaie de date <span class="en">(Datasheet View)</span></dt><dd>Vezi și modifici <b>datele</b>, ca într-un tabel Excel.</dd>
<dt>Vizualizare proiect <span class="en">(Design View)</span></dt><dd>Vezi și modifici <b>structura</b>: câmpuri, tipuri de date, proprietăți.</dd>
<dt>Vizualizare aspect <span class="en">(Layout View)</span></dt><dd>Pentru formulare și rapoarte: modifici aspectul văzând datele reale.</dd>
<dt>Previzualizare înaintea imprimării <span class="en">(Print Preview)</span></dt><dd>Vezi pagina exact cum va fi tipărită.</dd>
</dl>
<p>Așa arată tabelul Elevi în Vizualizare proiect:</p>
<div data-design="Elevi"></div>
<h3>Simboluri în foaia de date</h3>
<ul>
<li><b>✱</b> în selectorul de înregistrare: rândul nou, unde scrii o înregistrare nouă;</li>
<li><b>✎ (creion)</b>: înregistrarea curentă este în editare și nu a fost încă salvată;</li>
<li><b>(Nou)</b> în câmpul Numerotare automată: Access va da singur numărul.</li>
</ul>
<h3>Întreținerea bazei de date</h3>
<p>După ce ștergi multe date, fișierul rămâne mare. <span class="ui">Fișier › Informații › Comprimare și reparare bază de date</span> <span class="en">(Compact &amp; Repair)</span> îl micșorează și repară erorile mici. Fă o copie de siguranță cu <span class="ui">Fișier › Salvare ca › Copiere de rezervă bază de date</span>.</p>
<div class="box retine"><div class="bt">Reține</div><ul><li>Datele se salvează automat; structura obiectelor se salvează cu Ctrl+S.</li><li>Foaie de date = date. Vizualizare proiect = structură.</li></ul></div>`,
  exercitii: [
    { id: "o2e1", tip: "order", enunt: "Pune în ordine pașii pentru crearea unei baze de date noi.", steps: ["Pornești aplicația Microsoft Access", "Alegi Bază de date necompletată", "Scrii numele fișierului", "Alegi folderul în care se salvează", "Apeși butonul Creare"] },
    { id: "o2e2", tip: "select", enunt: "În ce filă a panglicii găsești fiecare comandă?", options: ["Pornire", "Creare", "Date externe", "Instrumente bază de date", "Fișier"],
      items: [{ text: "Proiectare interogare", ans: "Creare" }, { text: "Relații", ans: "Instrumente bază de date" }, { text: "Import din Excel", ans: "Date externe" }, { text: "Sortare ascendentă", ans: "Pornire" }, { text: "Salvare ca", ans: "Fișier" }, { text: "Expert raport", ans: "Creare" }, { text: "Filtru", ans: "Pornire" }] },
    { id: "o2e3", tip: "select", enunt: "Ce vizualizare folosești?", options: ["Vizualizare foaie de date", "Vizualizare proiect", "Previzualizare înaintea imprimării"],
      items: [{ text: "Vrei să schimbi tipul de date al câmpului Telefon.", ans: "Vizualizare proiect" }, { text: "Vrei să corectezi numele unui elev.", ans: "Vizualizare foaie de date" }, { text: "Vrei să vezi cum va arăta raportul pe hârtie.", ans: "Previzualizare înaintea imprimării" }, { text: "Vrei să stabilești cheia primară.", ans: "Vizualizare proiect" }, { text: "Vrei să adaugi o carte nouă.", ans: "Vizualizare foaie de date" }] },
    { id: "o2e4", tip: "quiz", enunt: "Ai introdus 10 elevi noi în tabelul Elevi și ai închis Access fără să apeși Ctrl+S. Ce se întâmplă?", opts: ["Toți cei 10 elevi se pierd", "Elevii sunt salvați: Access salvează automat fiecare înregistrare", "Se salvează doar primul elev", "Access nu permite închiderea"], ans: 1, expl: "Înregistrările se salvează când treci la alt rând sau închizi tabelul." },
    { id: "o2e5", tip: "fill", enunt: "Completează.", items: [
      { text: "Simbolul creion în selectorul de înregistrare arată că rândul este în ___.", ans: ["editare", "modificare", "curs de editare"] },
      { text: "Tasta care ascunde sau afișează panoul de navigare este ___.", ans: ["F11"] },
      { text: "Comanda care micșorează fișierul și repară erorile se numește Comprimare și ___.", ans: ["reparare"] }] }
  ],
  fisa: {
    titlu: "Prima mea bază de date",
    context: "Lucrezi în Microsoft Access. La final ai un fișier pe care îl vei folosi la toate orele următoare.",
    cerinte: [
      { text: "Creează o bază de date necompletată cu numele <code>Biblioteca_NumePrenume.accdb</code> în folderul clasei.", pct: 15 },
      { text: "Închide tabelul Tabel1 fără să-l salvezi. Ce observi în panoul de navigare?", pct: 10, raspuns: true },
      { text: "Parcurge filele panglicii și scrie câte două comenzi din filele <b>Creare</b> și <b>Date externe</b>.", pct: 15, raspuns: true },
      { text: "Creează un tabel nou (<span class=\"ui\">Creare › Tabel</span>) și treci în Vizualizare proiect. Ce îți cere Access înainte să schimbe vizualizarea?", pct: 15, raspuns: true },
      { text: "Salvează tabelul cu numele <b>Test</b>. Ce câmp a creat Access automat și ce tip de date are?", pct: 15, raspuns: true },
      { text: "Treci în Vizualizare foaie de date și scrie două înregistrări. Ce simbol apare în timpul editării?", pct: 10, raspuns: true },
      { text: "Șterge tabelul Test (clic dreapta în panoul de navigare › Ștergere), apoi rulează <span class=\"ui\">Comprimare și reparare bază de date</span>.", pct: 10 },
      { text: "Explică în 2–3 propoziții de ce Access cere numele fișierului la început.", pct: 10, raspuns: true }
    ],
    verificare: ["Fișierul .accdb este salvat cu numele cerut.", "Știu să trec între Vizualizare proiect și Foaie de date.", "Am rulat Comprimare și reparare."],
    solutii: `<ol><li>—</li><li>Panoul de navigare este gol: un tabel nesalvat nu devine obiect.</li><li>Creare: Tabel, Proiectare tabel, Proiectare interogare, Formular, Raport. Date externe: Import Excel, Fișier text, Export PDF.</li><li>Cere salvarea tabelului (numele).</li><li>Câmpul ID, Numerotare automată, cheie primară.</li><li>Creionul (înregistrare în editare).</li><li>—</li><li>Pentru că datele se salvează imediat pe disc, la fiecare înregistrare; fișierul trebuie să existe de la început.</li></ol>`
  },
  test: [
    { q: "Când îți cere Access numele fișierului unei baze de date noi?", opts: ["La prima salvare", "Înainte de a crea baza de date", "La închidere", "Niciodată"], ans: 1, expl: "Fișierul se creează de la început, pentru că datele se salvează imediat." },
    { q: "În ce vizualizare modifici tipul de date al unui câmp?", opts: ["Foaie de date", "Proiect", "Previzualizare", "Aspect"], ans: 1, expl: "Structura se modifică în Vizualizare proiect." },
    { q: "Ce comandă se află în fila Instrumente bază de date?", opts: ["Relații", "Formular", "Import Excel", "Sortare"], ans: 0, expl: "Relațiile și Comprimarea sunt în Instrumente bază de date." },
    { q: "Ce arată simbolul ✱ în selectorul de înregistrare?", opts: ["Înregistrarea a fost ștearsă", "Rândul nou, pentru o înregistrare nouă", "Eroare de date", "Înregistrare blocată"], ans: 1, expl: "Rândul cu steluță este locul pentru o înregistrare nouă." },
    { q: "Care afirmații despre salvare sunt adevărate?", opts: ["Înregistrările se salvează automat", "Structura unui tabel nou trebuie salvată", "Trebuie apăsat Ctrl+S după fiecare înregistrare", "Un tabel nesalvat nu apare în panoul de navigare"], ans: [0, 1, 3], expl: "Ctrl+S nu este necesar pentru înregistrări." },
    { q: "Panoul de navigare afișează:", opts: ["doar tabelele", "toate obiectele bazei de date", "doar înregistrările", "lista de fișiere de pe disc"], ans: 1, expl: "Tabele, interogări, formulare, rapoarte." },
    { q: "Comprimare și reparare bază de date:", opts: ["șterge toate datele", "micșorează fișierul și corectează erori", "creează o parolă", "exportă în PDF"], ans: 1, expl: "Recuperează spațiul ocupat de datele șterse." }
  ]
});

/* ---------------- ORA 3 ---------------- */
LESSONS.push({
  id: 3, unit: "U1", titlu: "Proiectarea unei baze de date", titluScurt: "Proiectarea bazei de date",
  rezumat: "Entități, atribute, chei primare și externe, reguli de proiectare corectă.",
  obiective: [
    "parcurgi etapele proiectării unei baze de date;",
    "identifici <b>entitățile</b> și <b>atributele</b> dintr-o situație reală;",
    "alegi o <b>cheie primară</b> potrivită și recunoști o <b>cheie externă</b>;",
    "recunoști greșelile de proiectare: repetări, câmpuri compuse, valori calculate stocate."
  ],
  teorie: `
<p>Înainte să deschizi Access, gândește pe hârtie. O bază de date proiectată greșit produce date repetate, contradictorii și greu de interogat. Un tabel bine proiectat se citește ca o propoziție: „Fiecare <b>elev</b> are un nume, un prenume, o clasă…”.</p>
<h3>Etapele proiectării</h3>
<div class="box pas"><div class="bt">Pas cu pas</div><ol>
<li><b>Analiza cerințelor:</b> ce trebuie să afle utilizatorii? (Ce cărți sunt împrumutate? De cine? Până când?)</li>
<li><b>Identificarea entităților:</b> obiectele despre care păstrăm date. Fiecare entitate devine un tabel.</li>
<li><b>Identificarea atributelor:</b> caracteristicile fiecărei entități. Fiecare atribut devine un câmp.</li>
<li><b>Alegerea cheilor primare.</b></li>
<li><b>Stabilirea relațiilor</b> dintre entități (ora 7).</li>
<li><b>Verificarea</b> regulilor de proiectare, apoi <b>implementarea</b> în Access.</li>
</ol></div>
<dl class="term">
<dt>Entitate</dt><dd>Un obiect sau un eveniment despre care păstrăm date: Elev, Carte, Împrumut.</dd>
<dt>Atribut</dt><dd>O caracteristică a entității: Nume, Titlu, DataImprumut.</dd>
<dt>Cheie primară</dt><dd>Atributul (sau grupul de atribute) cu valori unice și nenule, care identifică fiecare înregistrare: IdCarte.</dd>
<dt>Cheie externă <span class="en">(foreign key)</span></dt><dd>Un câmp care conține cheia primară a <b>altui</b> tabel și face legătura: IdElev din Imprumuturi.</dd>
</dl>
<div data-diagram="biblioteca" class="figure"></div>
<h3>Reguli de proiectare corectă</h3>
<div class="tblwrap"><table><thead><tr><th>Regulă</th><th>Greșit</th><th>Corect</th></tr></thead><tbody>
<tr><td><b>Un tabel, un subiect</b></td><td>Datele elevului și ale cărții în același tabel</td><td>Tabele separate Elevi și Carti, legate prin Imprumuturi</td></tr>
<tr><td><b>Valori atomice</b> (nedivizibile)</td><td>Câmpul <i>NumeComplet</i> = „Popescu Andrei”</td><td>Câmpuri separate Nume și Prenume</td></tr>
<tr><td><b>Fără grupuri repetitive</b></td><td>Câmpurile Carte1, Carte2, Carte3 în tabelul Elevi</td><td>Câte un rând în Imprumuturi pentru fiecare carte</td></tr>
<tr><td><b>Fără date calculabile</b></td><td>Câmpul <i>Varsta</i>, care se învechește în fiecare an</td><td>DataNasterii; vârsta se calculează într-o interogare</td></tr>
<tr><td><b>Fără redundanță</b></td><td>Autorul și prețul cărții scrise la fiecare împrumut</td><td>Datele cărții o singură dată în Carti</td></tr>
</tbody></table></div>
<div class="box exemplu"><div class="bt">Exemplu de tabel prost proiectat</div>
<div class="tblwrap"><table><thead><tr><th>Elev</th><th>Clasa</th><th>Carte</th><th>Autor</th><th>Pret</th></tr></thead><tbody>
<tr><td>Popescu Andrei</td><td>X A</td><td>Ion</td><td>Liviu Rebreanu</td><td>34,50</td></tr>
<tr><td>Popescu Andrei</td><td>X A</td><td>O scrisoare pierdută</td><td>I.L. Caragiale</td><td>21,50</td></tr>
<tr><td>Florea Andreea</td><td>XI A</td><td>Ion</td><td>L. Rebreanu</td><td>35,00</td></tr>
</tbody></table></div>
<p>Problemele: numele și clasa lui Popescu se repetă; dacă trece în clasa a XI-a, trebuie modificat în mai multe rânduri. Romanul „Ion” apare cu autorul scris diferit și cu prețuri diferite: <b>anomalii</b> de actualizare. Dacă ștergem ultimul împrumut al unei cărți, pierdem și datele cărții.</p></div>
<h3>Cum aleg cheia primară</h3>
<ul>
<li>Valorile trebuie să fie <b>unice</b> și <b>mereu completate</b>. Numele nu e bun: există doi „Popescu Andrei”.</li>
<li>Să nu se schimbe în timp. Numărul de telefon nu e bun.</li>
<li>Cel mai simplu: un cod numeric dat automat de Access (<b>Numerotare automată</b>), de exemplu IdElev.</li>
<li>Uneori cheia este formată din două câmpuri (<b>cheie compusă</b>), de exemplu IdElev + IdConcurs într-un tabel de participări.</li>
</ul>
<div class="box stiai"><div class="bt">Știai că?</div><p>Procesul prin care eliminăm repetările spărgând un tabel mare în tabele mai mici, legate între ele, se numește <b>normalizare</b>. O vei studia pe larg la clasele de informatică.</p></div>
<div class="box retine"><div class="bt">Reține</div><p>Entitate → tabel. Atribut → câmp. Cheia primară identifică rândurile; cheia externă leagă tabelele.</p></div>`,
  exercitii: [
    { id: "o3e1", tip: "select", enunt: "Se proiectează baza de date a unui concurs școlar. Cărei entități îi aparține fiecare atribut?", options: ["Elev", "Concurs", "Participare"],
      items: [{ text: "Data nașterii", ans: "Elev" }, { text: "Disciplina (matematică, TIC…)", ans: "Concurs" }, { text: "Punctajul obținut", ans: "Participare" }, { text: "Locul de desfășurare", ans: "Concurs" }, { text: "Clasa", ans: "Elev" }, { text: "Premiul obținut", ans: "Participare" }, { text: "Data concursului", ans: "Concurs" }] },
    { id: "o3e2", tip: "quiz", enunt: "Care câmp este cea mai bună cheie primară pentru tabelul Elevi?", opts: ["Nume", "Telefon", "IdElev (Numerotare automată)", "Clasa"], ans: 2, expl: "Numele se pot repeta, telefonul se poate schimba sau lipsi, clasa e comună multor elevi." },
    { id: "o3e3", tip: "select", enunt: "Proiectarea respectă regulile?", options: ["Corect", "Greșit: valoare neatomică", "Greșit: grup repetitiv", "Greșit: valoare calculabilă"],
      items: [{ text: "Câmpul <b>Adresa</b> = „Brăila, str. Mihai Eminescu nr. 5, ap. 3” într-un tabel în care trebuie să căutăm elevii după localitate.", ans: "Greșit: valoare neatomică" }, { text: "Câmpurile <b>Telefon1</b>, <b>Telefon2</b>, <b>Telefon3</b> în tabelul Elevi.", ans: "Greșit: grup repetitiv" }, { text: "Câmpul <b>VechimeCarte</b> = 2026 − AnAparitie, completat de mână.", ans: "Greșit: valoare calculabilă" }, { text: "Câmpurile separate <b>Nume</b> și <b>Prenume</b>.", ans: "Corect" }, { text: "Câmpul <b>IdElev</b> în tabelul Imprumuturi.", ans: "Corect" }] },
    { id: "o3e4", tip: "fill", enunt: "Completează.", items: [
      { text: "Într-o bază de date relațională, o entitate devine un ___.", ans: ["tabel"] },
      { text: "IdCarte din tabelul Imprumuturi este o cheie ___.", ans: ["externă", "externa", "străină", "straina"] },
      { text: "Eliminarea repetărilor prin împărțirea unui tabel în tabele mai mici se numește ___.", ans: ["normalizare"] }] },
    { id: "o3e5", tip: "quiz", enunt: "În tabelul prost proiectat din teorie, romanul „Ion” are două prețuri diferite. Cum se numește această problemă?", opts: ["Anomalie de actualizare (date contradictorii)", "Integritate referențială", "Cheie compusă", "Normalizare"], ans: 0, expl: "Datele repetate ajung să se contrazică atunci când sunt modificate doar într-un loc." }
  ],
  fisa: {
    titlu: "Proiectăm baza de date a concursurilor școlare",
    durata: "50 de minute, pe caiet sau în acest formular",
    context: "Liceul vrea să păstreze evidența elevilor care participă la concursuri și olimpiade: cine a participat, la ce concurs, ce punctaj și ce premiu a obținut.",
    cerinte: [
      { text: "Identifică <b>entitățile</b> (minimum 3) și scrie câte o propoziție despre fiecare.", pct: 15, raspuns: true },
      { text: "Pentru fiecare entitate, scrie lista de atribute (minimum 4 pe entitate).", pct: 20, raspuns: true },
      { text: "Alege cheia primară a fiecărui tabel și justifică alegerea.", pct: 15, raspuns: true },
      { text: "Precizează cheile externe și tabelele pe care le leagă.", pct: 15, raspuns: true },
      { text: "Un coleg propune câmpurile <code>Concurs1</code>, <code>Concurs2</code>, <code>Concurs3</code> în tabelul elevilor. Explică de ce soluția este greșită.", pct: 15, raspuns: true },
      { text: "Desenează pe caiet diagrama tabelelor (dreptunghiuri cu câmpuri, cheia primară subliniată, linii între chei).", pct: 10 },
      { text: "Scrie două întrebări la care baza ta de date poate răspunde (de exemplu: „Câte premii I are clasa X A?”).", pct: 10, raspuns: true }
    ],
    verificare: ["Fiecare tabel descrie un singur subiect.", "Nu am câmpuri repetitive sau calculabile.", "Am o cheie primară în fiecare tabel."],
    solutii: `<p><b>Model posibil:</b> Elevi(<u>IdElev</u>, Nume, Prenume, Clasa, DataNasterii, Email) · Concursuri(<u>IdConcurs</u>, Denumire, Disciplina, Etapa, Data, Locul) · Participari(<u>IdParticipare</u>, IdElev, IdConcurs, Punctaj, Premiu).</p><p>Chei externe: Participari.IdElev → Elevi; Participari.IdConcurs → Concursuri. Câmpurile Concurs1…3 limitează numărul de concursuri, lasă câmpuri goale și fac căutările dificile.</p>`
  },
  test: [
    { q: "O entitate dintr-o bază de date devine, în Access:", opts: ["un câmp", "un tabel", "o valoare", "un raport"], ans: 1, expl: "Entitate → tabel, atribut → câmp." },
    { q: "Ce este o cheie externă?", opts: ["Cheia primară a aceluiași tabel", "Un câmp care conține cheia primară a altui tabel", "Parola bazei de date", "Primul câmp din tabel"], ans: 1, expl: "Cheia externă leagă tabelul de alt tabel." },
    { q: "Care câmp NU respectă regula valorilor atomice?", opts: ["Prenume", "Localitate", "NumeComplet = „Popescu Andrei”", "Clasa"], ans: 2, expl: "Numele complet se poate împărți în Nume și Prenume." },
    { q: "De ce nu păstrăm câmpul Varsta în tabel?", opts: ["Pentru că ocupă prea mult spațiu", "Pentru că se schimbă în fiecare an și se poate calcula din DataNasterii", "Pentru că Access nu acceptă numere", "Pentru că e cheie primară"], ans: 1, expl: "Valorile calculabile se obțin în interogări." },
    { q: "Care sunt etape ale proiectării unei baze de date?", opts: ["Analiza cerințelor", "Identificarea entităților și atributelor", "Alegerea fontului", "Stabilirea relațiilor"], ans: [0, 1, 3], expl: "Fontul nu ține de proiectarea datelor." },
    { q: "O cheie primară formată din două câmpuri se numește:", opts: ["cheie dublă", "cheie compusă", "cheie externă", "index"], ans: 1, expl: "Cheie compusă, de exemplu IdElev + IdConcurs." },
    { q: "Ce problemă apare dacă datele unei cărți se scriu la fiecare împrumut?", opts: ["Redundanța și riscul de date contradictorii", "Baza de date devine mai rapidă", "Nu apare nicio problemă", "Se pierde cheia primară"], ans: 0, expl: "Repetarea datelor duce la anomalii." },
    { q: "Cheia primară trebuie să aibă valori:", opts: ["unice și nenule", "doar text", "repetate", "opționale"], ans: 0, expl: "Unice și mereu completate." }
  ]
});

/* ---------------- ORA 4 ---------------- */
LESSONS.push({
  id: 4, unit: "U2", titlu: "Crearea tabelelor și tipurile de date", titluScurt: "Tabele și tipuri de date",
  rezumat: "Proiectare tabel, alegerea tipului de date potrivit, stabilirea cheii primare.",
  obiective: [
    "creezi un tabel în <b>Vizualizare proiect</b>;",
    "alegi tipul de date potrivit pentru fiecare câmp;",
    "setezi și elimini <b>cheia primară</b>;",
    "salvezi și modifici structura unui tabel."
  ],
  teorie: `
<h3>Crearea unui tabel în Vizualizare proiect</h3>
<div class="box pas"><div class="bt">Pas cu pas</div><ol>
<li><span class="ui">Creare › Proiectare tabel</span> <span class="en">(Table Design)</span>.</li>
<li>În coloana <b>Nume câmp</b> scrii numele (maximum 64 de caractere; recomandat fără spații și fără diacritice, ex.: <code>DataNasterii</code>).</li>
<li>În coloana <b>Tip de date</b> alegi tipul din listă.</li>
<li>În <b>Descriere</b> (opțional) explici ce conține câmpul; textul apare în bara de stare.</li>
<li>Selectezi câmpul cheie și apeși <span class="ui">Proiect tabel › Cheie primară</span>. Apare simbolul cheie.</li>
<li>Salvezi cu <kbd>Ctrl</kbd> + <kbd>S</kbd> și dai numele tabelului (ex.: <code>Elevi</code>).</li>
</ol></div>
<p>Poți crea un tabel și din <span class="ui">Creare › Tabel</span>, direct în foaia de date, dar Vizualizarea proiect îți dă control complet asupra structurii.</p>
<h3>Tipurile de date</h3>
<div class="tblwrap"><table><thead><tr><th>Tip de date</th><th>Ce păstrează</th><th>Exemple</th></tr></thead><tbody>
<tr><td><b>Text scurt</b> <span class="en">(Short Text)</span></td><td>text sau cifre fără calcule, maximum 255 de caractere</td><td>Nume, Clasa, Telefon, CNP, cod poștal</td></tr>
<tr><td><b>Text lung</b> <span class="en">(Long Text)</span></td><td>texte lungi, peste 255 de caractere</td><td>Rezumatul unei cărți, observații</td></tr>
<tr><td><b>Număr</b> <span class="en">(Number)</span></td><td>numere folosite în calcule; dimensiunea se alege la proprietăți</td><td>Media, AnAparitie, Exemplare</td></tr>
<tr><td><b>Dată/Oră</b> <span class="en">(Date/Time)</span></td><td>date calendaristice și ore</td><td>DataNasterii, DataImprumut</td></tr>
<tr><td><b>Monedă</b> <span class="en">(Currency)</span></td><td>sume de bani, calculate exact, cu 2 zecimale</td><td>Pret, Salariu</td></tr>
<tr><td><b>Numerotare automată</b> <span class="en">(AutoNumber)</span></td><td>număr unic dat automat de Access la fiecare înregistrare nouă</td><td>IdElev, IdCarte</td></tr>
<tr><td><b>Da/Nu</b> <span class="en">(Yes/No)</span></td><td>doar două valori: Da/Nu, Adevărat/Fals; apare ca o casetă de selectare</td><td>Bursier, Restituit</td></tr>
<tr><td><b>Hyperlink</b></td><td>adrese web sau de e-mail</td><td>Site, pagina autorului</td></tr>
<tr><td><b>Atașare</b> <span class="en">(Attachment)</span></td><td>fișiere atașate: imagini, documente</td><td>Fotografia copertei</td></tr>
<tr><td><b>Obiect OLE</b></td><td>obiecte din alte aplicații (tip vechi; azi se preferă Atașare)</td><td>—</td></tr>
<tr><td><b>Calculat</b> <span class="en">(Calculated)</span></td><td>valoare calculată din alte câmpuri ale aceluiași tabel</td><td>[Pret]*[Exemplare]</td></tr>
<tr><td><b>Expert căutare…</b> <span class="en">(Lookup Wizard)</span></td><td>nu este un tip propriu-zis: creează o listă derulantă (ora 6)</td><td>Gen: F / M</td></tr>
</tbody></table></div>
<div class="box atentie"><div class="bt">Greșeala clasică</div><p><b>Telefonul, CNP-ul și codul poștal se scriu ca Text scurt</b>, nu ca Număr. Nu facem calcule cu ele, iar câmpul Număr ar șterge zeroul din față: <code>0740123456</code> ar deveni <code>740123456</code>. În plus, un CNP de 13 cifre depășește dimensiunea Întreg lung.</p></div>
<h3>Dimensiunile câmpului Număr</h3>
<div class="tblwrap"><table><thead><tr><th>Dimensiune câmp</th><th>Valori</th><th>Folosește pentru</th></tr></thead><tbody>
<tr><td>Octet <span class="en">(Byte)</span></td><td>0 … 255, întregi</td><td>Exemplare, numărul de ore</td></tr>
<tr><td>Întreg <span class="en">(Integer)</span></td><td>−32.768 … 32.767</td><td>AnAparitie</td></tr>
<tr><td>Întreg lung <span class="en">(Long Integer)</span></td><td>aproximativ ±2,1 miliarde</td><td>chei externe legate de Numerotare automată</td></tr>
<tr><td>Simplă / Dublă <span class="en">(Single / Double)</span></td><td>numere cu zecimale</td><td>Media, Înălțimea</td></tr>
</tbody></table></div>
<p>Structura tabelelor noastre, în Vizualizare proiect:</p>
<div data-design="Carti"></div>
<div data-design="Imprumuturi" style="margin-top:12px"></div>
<h3>Modificarea structurii</h3>
<ul>
<li><b>Inserare câmp:</b> clic dreapta pe un rând › <span class="ui">Inserare rânduri</span>.</li>
<li><b>Ștergere câmp:</b> selectezi rândul › <span class="ui">Ștergere rânduri</span>. Se șterg și toate datele din acel câmp!</li>
<li><b>Mutare:</b> tragi selectorul de rând în altă poziție.</li>
<li><b>Schimbarea tipului</b> pe un tabel care are date poate trunchia sau șterge valori; Access te avertizează.</li>
</ul>
<div class="box retine"><div class="bt">Reține</div><p>Întrebarea care decide tipul: <b>„Fac calcule cu acest câmp?”</b> Dacă nu, chiar dacă are cifre, e Text scurt. Banii → Monedă. Datele → Dată/Oră. Codurile unice → Numerotare automată.</p></div>`,
  exercitii: [
    { id: "o4e1", tip: "designer", enunt: "Proiectează tabelul <b>Elevi</b>: alege tipul de date pentru fiecare câmp și marchează cheia primară.", fields: [
      { name: "IdElev", desc: "cod unic, dat de Access", types: ["Numerotare automată"], pk: true },
      { name: "Nume", desc: "numele de familie", types: ["Text scurt"] },
      { name: "DataNasterii", desc: "ex.: 14.03.2010", types: ["Dată/Oră"] },
      { name: "Telefon", desc: "ex.: 0740123456", types: ["Text scurt"], why: "începe cu 0 și nu facem calcule cu el" },
      { name: "Media", desc: "ex.: 9,25", types: ["Număr"] },
      { name: "Bursier", desc: "primește sau nu bursă", types: ["Da/Nu"] }], expl: "Telefonul este Text scurt, pentru că păstrează zeroul din față." },
    { id: "o4e2", tip: "select", enunt: "Ce tip de date alegi?", options: TYPES_O4(),
      items: [{ text: "CNP-ul unui elev (13 cifre)", ans: "Text scurt" }, { text: "Prețul unei cărți", ans: "Monedă" }, { text: "Data împrumutului", ans: "Dată/Oră" }, { text: "Rezumatul unei cărți, de o pagină", ans: "Text lung" }, { text: "Cartea a fost restituită?", ans: "Da/Nu" }, { text: "Fotografia copertei", ans: "Atașare" }, { text: "Numărul de exemplare", ans: "Număr" }, { text: "Adresa site-ului editurii", ans: "Hyperlink" }] },
    { id: "o4e3", tip: "designer", enunt: "Proiectează tabelul <b>Carti</b>.", fields: [
      { name: "IdCarte", desc: "cod unic", types: ["Numerotare automată"], pk: true },
      { name: "Titlu", desc: "titlul cărții", types: ["Text scurt"] },
      { name: "AnAparitie", desc: "ex.: 1920", types: ["Număr"] },
      { name: "Pret", desc: "ex.: 34,50 lei", types: ["Monedă"] },
      { name: "Exemplare", desc: "câte exemplare are biblioteca", types: ["Număr"] },
      { name: "Rezumat", desc: "prezentarea cărții, pot fi 2000 de caractere", types: ["Text lung"] }] },
    { id: "o4e4", tip: "quiz", enunt: "Câmpul IdElev din tabelul Imprumuturi se leagă de IdElev (Numerotare automată) din Elevi. Ce tip și ce dimensiune trebuie să aibă?", opts: ["Numerotare automată", "Număr, Întreg lung", "Text scurt", "Număr, Octet"], ans: 1, expl: "Cheia externă legată de un câmp Numerotare automată este Număr cu dimensiunea Întreg lung." },
    { id: "o4e5", tip: "fill", enunt: "Completează.", items: [
      { text: "Un câmp Text scurt poate avea cel mult ___ caractere.", ans: ["255"] },
      { text: "Pentru câmpul Exemplare (valori între 0 și 100) cea mai mică dimensiune potrivită este ___.", ans: ["Octet", "byte"] },
      { text: "Comanda pentru crearea unui tabel în Vizualizare proiect este Creare › ___ tabel.", ans: ["Proiectare"] }] }
  ],
  fisa: {
    titlu: "Construim tabelele bibliotecii",
    context: "Deschide fișierul creat la ora 2. Folosește structura din pagina <a href=\"#date\">Datele de lucru</a> (secțiunea „Structura tabelului”).",
    cerinte: [
      { text: "Creează în Vizualizare proiect tabelul <b>Elevi</b> cu cele 10 câmpuri și tipurile indicate. Stabilește cheia primară IdElev.", pct: 20 },
      { text: "Creează tabelul <b>Carti</b> (7 câmpuri). Setează pentru AnAparitie dimensiunea Întreg și pentru Exemplare dimensiunea Octet.", pct: 20 },
      { text: "Creează tabelul <b>Imprumuturi</b> (6 câmpuri). IdElev și IdCarte sunt Număr, Întreg lung.", pct: 20 },
      { text: "Încearcă să scrii textul <code>doi</code> în câmpul AnAparitie, în Foaia de date. Ce mesaj afișează Access?", pct: 10, raspuns: true },
      { text: "Schimbă temporar tipul câmpului Telefon în Număr, scrie <code>0740123456</code> și observă ce se întâmplă. Revino la Text scurt. Explică.", pct: 15, raspuns: true },
      { text: "De ce nu putem scrie o valoare în câmpul IdElev când adăugăm un elev?", pct: 15, raspuns: true }
    ],
    verificare: ["Cele trei tabele au toate câmpurile, cu tipurile corecte.", "Fiecare tabel are cheie primară.", "Cheile externe sunt Număr, Întreg lung."],
    solutii: `<p>4. „Valoarea introdusă nu se potrivește cu tipul de date Număr din această coloană.” 5. Zeroul din față dispare; telefonul nu este un număr de calcul. 6. IdElev este Numerotare automată: Access dă singur valoarea.</p>`
  },
  test: [
    { q: "Ce tip de date are câmpul Telefon?", opts: ["Număr", "Text scurt", "Monedă", "Dată/Oră"], ans: 1, expl: "Păstrează zeroul din față; nu facem calcule." },
    { q: "Tipul potrivit pentru prețul unui produs este:", opts: ["Text scurt", "Monedă", "Da/Nu", "Hyperlink"], ans: 1, expl: "Monedă calculează exact sumele de bani." },
    { q: "Câte caractere poate avea cel mult un câmp Text scurt?", opts: ["64", "128", "255", "65.535"], ans: 2, expl: "255 de caractere." },
    { q: "Ce face tipul Numerotare automată?", opts: ["Numără înregistrările dintr-un raport", "Dă automat un număr unic fiecărei înregistrări noi", "Sortează automat tabelul", "Calculează media"], ans: 1, expl: "Este folosit pentru chei primare." },
    { q: "Care câmpuri ar trebui să fie de tip Text scurt?", opts: ["CNP", "Cod poștal", "Media", "Numărul de telefon"], ans: [0, 1, 3], expl: "Media este Număr." },
    { q: "Pentru o cheie externă legată de un câmp Numerotare automată folosim:", opts: ["Numerotare automată", "Număr, Întreg lung", "Număr, Octet", "Text lung"], ans: 1, expl: "Tipurile trebuie să fie compatibile." },
    { q: "Câmpul Da/Nu apare în foaia de date ca:", opts: ["o listă derulantă", "o casetă de selectare", "un buton", "un hyperlink"], ans: 1, expl: "Caseta bifată înseamnă Da." },
    { q: "Ce se întâmplă cu datele unui câmp atunci când ștergi câmpul din Vizualizare proiect?", opts: ["Se mută în alt câmp", "Se șterg definitiv", "Rămân ascunse", "Se copiază în clipboard"], ans: 1, expl: "Ștergerea unui câmp elimină și datele lui." }
  ]
});
function TYPES_O4() { return ["Text scurt", "Text lung", "Număr", "Dată/Oră", "Monedă", "Da/Nu", "Hyperlink", "Atașare"]; }

/* ---------------- ORA 5 ---------------- */
LESSONS.push({
  id: 5, unit: "U2", titlu: "Proprietățile câmpurilor și validarea datelor", titluScurt: "Proprietăți și validare",
  rezumat: "Dimensiune, format, mască de intrare, valoare implicită, reguli de validare, obligatoriu, indexat.",
  obiective: [
    "setezi <b>dimensiunea</b>, <b>formatul</b> și <b>legenda</b> unui câmp;",
    "scrii o <b>mască de intrare</b> simplă;",
    "folosești <b>valoarea implicită</b> pentru a scrie mai repede;",
    "scrii <b>reguli de validare</b> și <b>texte de validare</b>;",
    "faci un câmp <b>obligatoriu</b> sau <b>indexat fără dubluri</b>."
  ],
  teorie: `
<p>Proprietățile se văd în partea de jos a ferestrei Vizualizare proiect, în fila <b>General</b>, pentru câmpul selectat. Ele controlează cum arată datele și, mai ales, ce date sunt acceptate.</p>
<div class="tblwrap"><table><thead><tr><th>Proprietate</th><th>Ce face</th><th>Exemplu</th></tr></thead><tbody>
<tr><td><b>Dimensiune câmp</b> <span class="en">(Field Size)</span></td><td>numărul maxim de caractere (Text) sau tipul de număr</td><td>Clasa: 6; Exemplare: Octet</td></tr>
<tr><td><b>Format</b></td><td>cum se afișează valoarea (nu schimbă valoarea păstrată)</td><td>Dată scurtă; Monedă; <code>&gt;</code> = afișează cu majuscule</td></tr>
<tr><td><b>Zecimale</b> <span class="en">(Decimal Places)</span></td><td>câte zecimale se afișează</td><td>Media: 2</td></tr>
<tr><td><b>Mască de intrare</b> <span class="en">(Input Mask)</span></td><td>tiparul după care se scriu datele</td><td>Telefon: <code>0000 000 000</code></td></tr>
<tr><td><b>Legendă</b> <span class="en">(Caption)</span></td><td>textul afișat în antetul coloanei și în formulare</td><td>DataNasterii → „Data nașterii”</td></tr>
<tr><td><b>Valoare implicită</b> <span class="en">(Default Value)</span></td><td>valoarea completată automat la o înregistrare nouă</td><td><code>"Brăila"</code>; <code>Date()</code>; <code>0</code></td></tr>
<tr><td><b>Regulă de validare</b> <span class="en">(Validation Rule)</span></td><td>condiția pe care trebuie să o îndeplinească valoarea</td><td><code>Between 1 And 10</code></td></tr>
<tr><td><b>Text de validare</b> <span class="en">(Validation Text)</span></td><td>mesajul afișat când regula nu e respectată</td><td>„Media trebuie să fie între 1 și 10.”</td></tr>
<tr><td><b>Obligatoriu</b> <span class="en">(Required)</span></td><td>Da = câmpul nu poate rămâne gol</td><td>Nume: Da</td></tr>
<tr><td><b>Indexat</b> <span class="en">(Indexed)</span></td><td>accelerează căutarea; „Da (fără dubluri)” interzice valorile repetate</td><td>Telefon: Da (fără dubluri)</td></tr>
</tbody></table></div>
<h3>Reguli de validare</h3>
<p>Regula se scrie fără numele câmpului: Access o aplică automat valorii introduse. Folosești aceiași operatori ca la criteriile interogărilor (ora 10).</p>
<div class="tblwrap"><table><thead><tr><th>Regulă</th><th>Acceptă</th></tr></thead><tbody>
<tr><td><code>&gt;=0</code></td><td>numere pozitive sau zero (Exemplare, Pret)</td></tr>
<tr><td><code>Between 1 And 10</code> sau <code>&gt;=1 And &lt;=10</code></td><td>media unui elev</td></tr>
<tr><td><code>&lt;=Date()</code></td><td>date din trecut sau de azi (data nașterii, data împrumutului)</td></tr>
<tr><td><code>"F" Or "M"</code> sau <code>In("F";"M")</code></td><td>doar F sau M</td></tr>
<tr><td><code>Like "07########"</code></td><td>telefon mobil: 07 urmat de exact 8 cifre</td></tr>
<tr><td><code>Like "IX*" Or Like "X*"</code></td><td>clase care încep cu IX sau X</td></tr>
<tr><td><code>Between 1450 And Year(Date())</code></td><td>anul apariției unei cărți</td></tr>
</tbody></table></div>
<div class="box atentie"><div class="bt">Atenție</div><p>Un câmp lăsat gol (Null) trece de regula de validare. Dacă vrei să nu rămână gol, setează și <b>Obligatoriu: Da</b>.</p><p>Cu setări regionale românești, argumentele funcțiilor și elementele listelor se despart prin <b>punct și virgulă</b>: <code>In("F";"M")</code>.</p></div>
<h3>Măști de intrare</h3>
<div class="tblwrap"><table><thead><tr><th>Caracter</th><th>Înseamnă</th></tr></thead><tbody>
<tr><td><code>0</code></td><td>cifră obligatorie</td></tr><tr><td><code>9</code></td><td>cifră opțională</td></tr>
<tr><td><code>L</code></td><td>literă obligatorie</td></tr><tr><td><code>?</code></td><td>literă opțională</td></tr>
<tr><td><code>A</code> / <code>a</code></td><td>literă sau cifră, obligatorie / opțională</td></tr>
<tr><td><code>&amp;</code> / <code>C</code></td><td>orice caracter, obligatoriu / opțional</td></tr>
<tr><td><code>&gt;</code> / <code>&lt;</code></td><td>transformă literele următoare în majuscule / minuscule</td></tr>
</tbody></table></div>
<p>Exemple: CNP <code>0000000000000</code> (13 cifre obligatorii) · număr de înmatriculare <code>&gt;LL 00 LLL</code> (BR 12 ABC) · cod poștal <code>000000</code>. Pentru date poți folosi <b>Expertul mască de intrare</b> (butonul … din dreptul proprietății).</p>
<div class="box retine"><div class="bt">Reține</div><ul><li><b>Format</b> schimbă doar afișarea; <b>Mască de intrare</b> controlează scrierea; <b>Regulă de validare</b> decide ce se acceptă.</li><li>Fiecare regulă de validare are nevoie de un <b>text de validare</b> clar, care spune utilizatorului ce să corecteze.</li></ul></div>`,
  exercitii: [
    { id: "o5e1", tip: "rule", enunt: "Scrie regula de validare pentru câmpul <b>Media</b>: se acceptă doar valori între 1 și 10, inclusiv.", field: "Media", tipDate: "Număr", sol: "Between 1 And 10",
      tests: [{ v: "9.25", ok: true }, { v: "10", ok: true }, { v: "1", ok: true }, { v: "0", ok: false }, { v: "10.5", ok: false }, { v: "-3", ok: false }] },
    { id: "o5e2", tip: "rule", enunt: "Câmpul <b>Gen</b> acceptă doar literele F sau M.", field: "Gen", tipDate: "Text scurt", sol: 'In("F";"M")',
      tests: [{ v: "F", ok: true }, { v: "M", ok: true }, { v: "f", ok: true }, { v: "X", ok: false }, { v: "Fem", ok: false }] , expl: "Access compară textele fără să țină cont de majuscule." },
    { id: "o5e3", tip: "rule", enunt: "Câmpul <b>Telefon</b> trebuie să înceapă cu 07 și să aibă exact 10 cifre.", field: "Telefon", tipDate: "Text scurt", sol: 'Like "07########"',
      tests: [{ v: "0740123456", ok: true }, { v: "0799999999", ok: true }, { v: "0239123456", ok: false }, { v: "074012345", ok: false }, { v: "07401234567", ok: false }, { v: "07a0123456", ok: false }] },
    { id: "o5e4", tip: "rule", enunt: "Câmpul <b>AnAparitie</b> acceptă ani de la 1450 până în 2026.", field: "AnAparitie", tipDate: "Număr", sol: "Between 1450 And 2026",
      tests: [{ v: "1920", ok: true }, { v: "1450", ok: true }, { v: "2026", ok: true }, { v: "1300", ok: false }, { v: "2030", ok: false }] },
    { id: "o5e5", tip: "select", enunt: "Ce proprietate folosești?", options: ["Valoare implicită", "Regulă de validare", "Text de validare", "Mască de intrare", "Obligatoriu", "Indexat", "Legendă", "Format"],
      items: [{ text: "Majoritatea elevilor sunt din Brăila; vrei ca acest oraș să apară deja scris.", ans: "Valoare implicită" }, { text: "Numele elevului nu poate rămâne necompletat.", ans: "Obligatoriu" }, { text: "Doi elevi nu pot avea același număr de telefon.", ans: "Indexat" }, { text: "Vrei ca antetul coloanei DataNasterii să apară „Data nașterii”.", ans: "Legendă" }, { text: "Mesajul „Prețul nu poate fi negativ!”", ans: "Text de validare" }, { text: "CNP-ul se scrie doar ca 13 cifre, fără litere.", ans: "Mască de intrare" }, { text: "Prețul nu poate fi mai mic decât 0.", ans: "Regulă de validare" }, { text: "Data să se afișeze ca „14 martie 2010”.", ans: "Format" }] },
    { id: "o5e6", tip: "quiz", enunt: "Ce valoare implicită pui în câmpul DataImprumut ca să apară automat data zilei?", opts: ["Today", "=Azi", "Date()", "#azi#"], ans: 2, expl: "Funcția Date() întoarce data curentă." }
  ],
  fisa: {
    titlu: "Date corecte de la început",
    context: "Lucrezi în baza de date Biblioteca. Setează proprietățile în Vizualizare proiect, salvează, apoi testează în Foaia de date.",
    cerinte: [
      { text: "În Elevi: Nume și Prenume <b>Obligatoriu: Da</b>, dimensiune 30. Clasa: dimensiune 6, format <code>&gt;</code>.", pct: 10 },
      { text: "Media: regula <code>Between 1 And 10</code>, text de validare „Media trebuie să fie între 1 și 10.”, 2 zecimale.", pct: 15 },
      { text: "Gen: regula <code>In(\"F\";\"M\")</code> și un text de validare potrivit. Localitate: valoare implicită <code>\"Brăila\"</code>.", pct: 15 },
      { text: "DataNasterii: legenda „Data nașterii”, format Dată scurtă, regula <code>&lt;=Date()</code>.", pct: 15 },
      { text: "Telefon: mască de intrare <code>0000000000</code>, Indexat: Da (fără dubluri).", pct: 10 },
      { text: "În Carti: Pret și Exemplare cu regula <code>&gt;=0</code>. În Imprumuturi: DataImprumut cu valoarea implicită <code>Date()</code>.", pct: 15 },
      { text: "Introdu acum datele din pagina <a href=\"#date\">Datele de lucru</a> (sau doar 5 elevi). Notează un mesaj de eroare primit și cauza lui.", pct: 10, raspuns: true },
      { text: "Explică diferența dintre Format și Mască de intrare pe un exemplu.", pct: 10, raspuns: true }
    ],
    verificare: ["Regulile de validare au și text de validare.", "Am testat fiecare regulă cu o valoare greșită.", "Valorile implicite apar la o înregistrare nouă."],
    solutii: `<p>8. Formatul <code>&gt;</code> afișează „x a” ca „X A”, dar păstrează ce s-a scris; masca impune tiparul în timpul scrierii (nu poți scrie litere într-o mască de cifre).</p>`
  },
  test: [
    { q: "Ce proprietate afișează un mesaj când regula de validare nu este respectată?", opts: ["Legendă", "Text de validare", "Format", "Valoare implicită"], ans: 1, expl: "Textul de validare explică eroarea." },
    { q: "Regula <code>Between 1 And 10</code> acceptă valoarea 10?", opts: ["Da", "Nu"], ans: 0, expl: "Between include ambele capete." },
    { q: "În masca de intrare, caracterul 0 înseamnă:", opts: ["cifră opțională", "cifră obligatorie", "literă obligatorie", "orice caracter"], ans: 1, expl: "9 este cifra opțională." },
    { q: "Ce valoare implicită completează data curentă?", opts: ["Now", "Date()", "Today()", "Azi"], ans: 1, expl: "Date() întoarce data de azi." },
    { q: "Cum interzici valorile repetate într-un câmp care nu este cheie primară?", opts: ["Obligatoriu: Da", "Indexat: Da (fără dubluri)", "Format: >", "Valoare implicită: 0"], ans: 1, expl: "Indexul fără dubluri impune valori unice." },
    { q: "Care afirmații sunt adevărate?", opts: ["Formatul schimbă doar modul de afișare", "Legenda schimbă numele câmpului din structură", "Un câmp gol trece de regula de validare dacă nu e obligatoriu", "Regula de validare se scrie fără numele câmpului"], ans: [0, 2, 3], expl: "Legenda schimbă doar textul afișat, nu numele câmpului." },
    { q: "Regula <code>Like \"07########\"</code> acceptă:", opts: ["0740123456", "0239123456", "074012", "07-40-12"], ans: 0, expl: "07 urmat de exact 8 cifre." },
    { q: "Formatul <code>&gt;</code> aplicat unui câmp Text:", opts: ["interzice textele scurte", "afișează textul cu majuscule", "sortează descrescător", "acceptă doar numere mai mari"], ans: 1, expl: "Afișează literele mari." }
  ]
});
