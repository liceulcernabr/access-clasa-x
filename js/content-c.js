/* =========================================================
   Conținut: orele 11–15, glosar, scurtături, proiect final
   ========================================================= */

/* ---------------- ORA 11 ---------------- */
LESSONS.push({
  id: 11, unit: "U4", titlu: "Câmpuri calculate, parametri și valori de top", titluScurt: "Calcule, parametri, top",
  rezumat: "Expresii în interogări, Generatorul de expresii, funcții, interogări cu parametri, Top valori.",
  obiective: [
    "creezi un <b>câmp calculat</b> cu sintaxa <code>Nume: expresie</code>;",
    "folosești funcțiile <b>Year</b>, <b>Date</b>, <b>Round</b>, <b>IIf</b> și operatorul <b>&amp;</b>;",
    "creezi o <b>interogare cu parametri</b>, care cere o valoare la rulare;",
    "afișezi primele N înregistrări cu <b>Top valori</b>."
  ],
  teorie: `
<h3>Câmpuri calculate</h3>
<p>Într-o coloană goală a grilei, în rândul <b>Câmp</b>, scrii un nume nou, două puncte și expresia. Numele câmpurilor din expresie se scriu între paranteze drepte.</p>
<pre class="sql">ValoareStoc: [Pret]*[Exemplare]
NumeComplet: [Nume] &amp; " " &amp; [Prenume]
Varsta: Year(Date()) - Year([DataNasterii])
TermenReturnare: [DataImprumut] + 14</pre>
<p>Dacă nu dai un nume, Access îl numește <code>Expr1</code>, <code>Expr2</code>… Câmpul calculat nu se păstrează în tabel: valoarea se calculează la fiecare rulare, deci este mereu actuală.</p>
<p>Pentru expresii lungi folosești <b>Generatorul de expresii</b> <span class="en">(Expression Builder)</span>: clic dreapta în celulă › <span class="ui">Generare…</span> sau <kbd>Ctrl</kbd> + <kbd>F2</kbd>. Acolo alegi câmpuri, funcții și operatori din liste.</p>
<div class="tblwrap"><table><thead><tr><th>Operator / funcție</th><th>Ce face</th><th>Exemplu</th></tr></thead><tbody>
<tr><td><code>+ - * /</code></td><td>operații aritmetice</td><td><code>[Pret]*1,19</code></td></tr>
<tr><td><code>&amp;</code></td><td>lipește texte (concatenare)</td><td><code>[Nume] &amp; " " &amp; [Prenume]</code></td></tr>
<tr><td><code>Date()</code></td><td>data de azi</td><td><code>Date()-[DataImprumut]</code> = zile de la împrumut</td></tr>
<tr><td><code>Year()</code>, <code>Month()</code>, <code>Day()</code></td><td>anul, luna, ziua unei date</td><td><code>Year([DataNasterii])</code></td></tr>
<tr><td><code>Round(x; n)</code></td><td>rotunjire la n zecimale</td><td><code>Round([Media];1)</code></td></tr>
<tr><td><code>IIf(cond; da; nu)</code></td><td>alege o valoare după o condiție</td><td><code>IIf([Media]&gt;=9;"Excelent";"Bine")</code></td></tr>
<tr><td><code>UCase()</code>, <code>Left()</code>, <code>Len()</code></td><td>majuscule, primele caractere, lungimea</td><td><code>Left([Prenume];1)</code></td></tr>
</tbody></table></div>
<div data-qbe='{"tables":["Carti"],"cols":[{"field":"Titlu"},{"field":"Pret"},{"field":"Exemplare"},{"field":"ValoareStoc: [Pret]*[Exemplare]","sort":"Descendent"}]}'></div>
<div class="box atentie"><div class="bt">Atenție</div><p>Cu setări regionale românești, argumentele se despart cu <b>;</b> iar zecimalele cu virgulă: <code>Round([Media];1)</code>, <code>[Pret]*1,1</code>. Simulatorul acceptă și virgula, și punctul.</p></div>
<h3>Interogări cu parametri</h3>
<p>În loc să scrii în criteriu o valoare fixă (<code>"X A"</code>), scrii între paranteze drepte un mesaj: <code>[Introduceți clasa:]</code>. Când rulezi interogarea, Access afișează o casetă în care utilizatorul scrie valoarea. Aceeași interogare servește pentru orice clasă.</p>
<div data-qbe='{"tables":["Elevi"],"cols":[{"field":"Nume"},{"field":"Prenume"},{"field":"Clasa","crit":"[Introduceți clasa:]"}]}'></div>
<ul>
<li>Interval cu doi parametri: <code>Between [Data de început:] And [Data de sfârșit:]</code>.</li>
<li>Căutare după o parte din text: <code>Like "*" &amp; [Scrieți un cuvânt din titlu:] &amp; "*"</code>.</li>
</ul>
<div class="box atentie"><div class="bt">Atenție</div><p>Textul parametrului trebuie să fie <b>diferit de numele oricărui câmp</b>. Dacă scrii <code>[Clasa]</code>, Access înțelege câmpul Clasa, nu un parametru. Dacă scrii greșit numele unui câmp într-o expresie, Access îl tratează ca parametru și îți cere o valoare: semn că ai o greșeală de scriere.</p></div>
<h3>Top valori</h3>
<p>În <span class="ui">Proiect interogare › Returnare</span> <span class="en">(Return)</span> alegi <b>5</b>, <b>25%</b> sau altă valoare. Access păstrează primele înregistrări <b>după sortare</b>, deci sortarea este obligatorie: pentru cele mai mari medii sortezi descendent după Media și alegi 3.</p>
<div class="box retine"><div class="bt">Reține</div><ul><li>Câmp calculat: <code>NumeNou: expresie</code>; câmpurile între <code>[ ]</code>.</li><li>Parametru: text între <code>[ ]</code> în rândul Criterii, diferit de numele câmpurilor.</li><li>Top valori funcționează împreună cu sortarea.</li></ul></div>`,
  exercitii: [
    { id: "o11e1", tip: "qbe", enunt: "Afișează un câmp calculat <b>NumeComplet</b> care lipește numele și prenumele cu un spațiu între ele (ex.: „Popescu Andrei”) și câmpul <b>Clasa</b>.", start: { tables: ["Elevi"] }, hint: "În rândul Câmp: <code>NumeComplet: [Nume] &amp; \" \" &amp; [Prenume]</code>", sol: { tables: ["Elevi"], cols: [{ field: 'NumeComplet: [Nume] & " " & [Prenume]' }, { field: "Clasa" }] } },
    { id: "o11e2", tip: "qbe", enunt: "Afișează <b>Titlu</b> și câmpul calculat <b>ValoareStoc</b> = preț × exemplare, de la cea mai mare valoare la cea mai mică.", start: { tables: ["Carti"] }, ordered: true, sol: { tables: ["Carti"], cols: [{ field: "Titlu" }, { field: "ValoareStoc: [Pret]*[Exemplare]", sort: "Descendent" }] } },
    { id: "o11e3", tip: "qbe", enunt: "Creează o interogare cu parametru care cere clasa și afișează <b>Nume</b>, <b>Prenume</b> și <b>Clasa</b> elevilor din clasa introdusă. La verificare se folosește clasa X B.", start: { tables: ["Elevi"] }, needParam: true, paramValue: "X B", sol: { tables: ["Elevi"], cols: [{ field: "Nume" }, { field: "Prenume" }, { field: "Clasa", crit: "[Introduceți clasa:]" }] } },
    { id: "o11e4", tip: "qbe", enunt: "Afișează <b>Nume</b>, <b>Prenume</b> și <b>Media</b> pentru <b>primii 3 elevi</b> după medie.", start: { tables: ["Elevi"] }, ordered: true, hint: "Sortare Descendent după Media și Top = 3 în bara de sus.", sol: { tables: ["Elevi"], top: "3", cols: [{ field: "Nume" }, { field: "Prenume" }, { field: "Media", sort: "Descendent" }] } },
    { id: "o11e5", tip: "qbe", enunt: "Afișează <b>Nume</b>, <b>Media</b> și câmpul <b>Situatie</b>, care are valoarea „Excelent” dacă media este cel puțin 9 și „Bine” în rest.", start: { tables: ["Elevi"] }, hint: "<code>Situatie: IIf([Media]&gt;=9;\"Excelent\";\"Bine\")</code>", sol: { tables: ["Elevi"], cols: [{ field: "Nume" }, { field: "Media" }, { field: 'Situatie: IIf([Media]>=9;"Excelent";"Bine")' }] } },
    { id: "o11e6", tip: "qbe", enunt: "Afișează <b>Nume</b> și câmpul calculat <b>AnNastere</b> (anul din DataNasterii) doar pentru elevii născuți în <b>2011</b>.", start: { tables: ["Elevi"] }, hint: "<code>AnNastere: Year([DataNasterii])</code> cu criteriul <code>2011</code>.", sol: { tables: ["Elevi"], cols: [{ field: "Nume" }, { field: "AnNastere: Year([DataNasterii])", crit: "2011" }] } },
    { id: "o11e7", tip: "fill", enunt: "Completează expresiile.", items: [
      { text: "Termenul de returnare, la 14 zile după împrumut: <code>Termen: [DataImprumut] ___ 14</code>", ans: ["+"] },
      { text: "Operatorul care lipește două texte este ___.", ans: ["&"] },
      { text: "Funcția care întoarce data de azi este ___.", ans: ["Date()", "Date"] },
      { text: "Pentru a vedea cele mai scumpe 5 cărți sortezi descendent după Pret și alegi la Returnare valoarea ___.", ans: ["5"] }] }
  ],
  fisa: {
    titlu: "Interogări care calculează și întreabă",
    cerinte: [
      { text: "<b>qry_ValoareFond</b>: Titlu, Pret, Exemplare și câmpul ValoareStoc. Care carte are cea mai mare valoare a stocului?", pct: 15, raspuns: true },
      { text: "<b>qry_Varste</b>: Nume, Prenume și Varsta (calculată din anul curent și anul nașterii), sortați după vârstă.", pct: 15 },
      { text: "<b>qry_Termen</b>: Nume, Titlu, DataImprumut și TermenReturnare (DataImprumut + 14), doar pentru cărțile nerestituite.", pct: 15 },
      { text: "<b>qry_ElevDinClasa</b>: interogare cu parametru pentru clasă. Rulează pentru XI A și notează câți elevi apar.", pct: 15, raspuns: true },
      { text: "<b>qry_CautaTitlu</b>: parametru care caută un cuvânt oriunde în titlu. Testează cu „noapte”.", pct: 15 },
      { text: "<b>qry_Top3Scumpe</b>: cele mai scumpe 3 cărți. Ce se întâmplă dacă uiți sortarea?", pct: 15, raspuns: true },
      { text: "Scrie în rândul Câmp expresia <code>[Pretul]*2</code> (cu o greșeală de scriere) și rulează. Ce face Access și de ce?", pct: 10, raspuns: true }
    ],
    verificare: ["Am dat nume clare câmpurilor calculate.", "Parametrul meu are un text diferit de numele câmpurilor.", "Am folosit Top valori împreună cu sortarea."],
    solutii: `<p>1. Amintiri din copilărie: 12 × 19,99 = 239,88 lei. 4. 4 elevi. 6. Fără sortare Access ia primele 3 înregistrări în ordinea din tabel. 7. Access cere o valoare pentru „Pretul”, pentru că nu găsește câmpul și îl tratează ca parametru.</p>`
  },
  test: [
    { q: "Cum se scrie corect un câmp calculat în grila de proiectare?", opts: ["ValoareStoc = Pret*Exemplare", "ValoareStoc: [Pret]*[Exemplare]", "[ValoareStoc]: Pret x Exemplare", "=Pret*Exemplare"], ans: 1, expl: "Nume, două puncte, expresia cu câmpuri între paranteze drepte." },
    { q: "Ce face operatorul & ?", opts: ["Adună numere", "Lipește texte", "Compară valori", "Înseamnă ȘI logic"], ans: 1, expl: "Concatenare: [Nume] & \" \" & [Prenume]." },
    { q: "Cum creezi un parametru?", opts: ["Scrii un text între paranteze drepte în rândul Criterii", "Scrii textul între ghilimele", "Bifezi Afișare", "Folosești Top valori"], ans: 0, expl: "Ex.: [Introduceți clasa:]" },
    { q: "De ce Access îți cere o valoare pentru [Pretul] când rulezi o interogare?", opts: ["Câmpul Pretul nu există, deci e tratat ca parametru", "Prețul este gol", "Interogarea e de actualizare", "Lipsește sortarea"], ans: 0, expl: "Numele scris greșit devine parametru." },
    { q: "Ce rezultat dă <code>IIf([Media]&gt;=9;\"Excelent\";\"Bine\")</code> pentru media 8,75?", opts: ["Excelent", "Bine", "8,75", "Eroare"], ans: 1, expl: "Condiția este falsă." },
    { q: "Top valori = 3 fără nicio sortare afișează:", opts: ["cele mai mari 3 valori", "primele 3 înregistrări în ordinea din tabel", "o eroare", "toate înregistrările"], ans: 1, expl: "Top are sens doar după sortare." },
    { q: "Care afirmații despre câmpurile calculate din interogări sunt adevărate?", opts: ["Valoarea se recalculează la fiecare rulare", "Se păstrează automat în tabel", "Pot folosi funcții precum Year și IIf", "Fără nume primesc Expr1, Expr2…"], ans: [0, 2, 3], expl: "Nu se păstrează în tabel." },
    { q: "Ce combinație de taste deschide Generatorul de expresii?", opts: ["Ctrl+F2", "Ctrl+E", "F11", "Shift+F9"], ans: 0, expl: "Ctrl+F2, sau clic dreapta › Generare." }
  ]
});

/* ---------------- ORA 12 ---------------- */
LESSONS.push({
  id: 12, unit: "U4", titlu: "Interogări de totaluri și analiză", titluScurt: "Interogări de totaluri",
  rezumat: "Grupare după, Sumă, Medie, Min, Max, Numărare, criterii pe totaluri, interogări încrucișate.",
  obiective: [
    "activezi rândul <b>Total</b> și grupezi înregistrările;",
    "calculezi sume, medii, minime, maxime și numărări pe grupuri;",
    "pui criterii pe grupuri și pe valorile totalizate;",
    "cunoști interogările încrucișate și expertele de găsire a dublurilor și neconcordanțelor."
  ],
  teorie: `
<p>O <b>interogare de totaluri</b> <span class="en">(totals query)</span> răspunde la întrebări de tipul „câți?”, „cât în total?”, „care este media?”, pentru fiecare grup de înregistrări: câți elevi are fiecare clasă, ce medie are fiecare clasă, câte cărți are fiecare gen.</p>
<div class="box pas"><div class="bt">Pas cu pas</div><ol>
<li>Creezi interogarea în Vizualizare proiect și adaugi câmpurile.</li>
<li>Apeși <span class="ui">Proiect interogare › Totaluri Σ</span>. În grilă apare rândul <b>Total</b>.</li>
<li>La câmpul după care grupezi lași <b>Grupare după</b> <span class="en">(Group By)</span>.</li>
<li>La câmpul calculat alegi funcția: Sumă, Medie, Min, Max, Numărare…</li>
<li>Rulezi. Fiecare grup devine un singur rând.</li>
</ol></div>
<div class="tblwrap"><table><thead><tr><th>Opțiune în rândul Total</th><th>Calculează</th></tr></thead><tbody>
<tr><td><b>Grupare după</b></td><td>formează grupurile (un rând pentru fiecare valoare distinctă)</td></tr>
<tr><td><b>Sumă</b> <span class="en">(Sum)</span> / <b>Medie</b> <span class="en">(Avg)</span></td><td>suma / media valorilor din grup</td></tr>
<tr><td><b>Min</b> / <b>Max</b></td><td>cea mai mică / cea mai mare valoare</td></tr>
<tr><td><b>Numărare</b> <span class="en">(Count)</span></td><td>numărul de valori completate din grup</td></tr>
<tr><td><b>Prima</b> / <b>Ultima</b> <span class="en">(First / Last)</span></td><td>valoarea din prima / ultima înregistrare a grupului</td></tr>
<tr><td><b>Unde</b> <span class="en">(Where)</span></td><td>câmpul se folosește doar pentru un criteriu aplicat <b>înainte</b> de grupare; nu se afișează</td></tr>
<tr><td><b>Expresie</b></td><td>un calcul care folosește funcții de totaluri, de ex. <code>Sum([Pret]*[Exemplare])</code></td></tr>
</tbody></table></div>
<p>Media pe clase și numărul de elevi din fiecare clasă:</p>
<div data-qbe='{"tables":["Elevi"],"totals":true,"cols":[{"field":"Clasa","total":"Grupare după","sort":"Ascendent"},{"field":"Media","total":"Medie"},{"field":"IdElev","total":"Numărare"}]}'></div>
<p>Access numește automat coloanele rezultate <code>MedieDeMedia</code>, <code>NumărDeIdElev</code>. Le poți redenumi: <code>MediaClasei: Media</code> în rândul Câmp.</p>
<h3>Criterii în interogările de totaluri</h3>
<dl class="term">
<dt>Criteriu sub un câmp cu funcție</dt><dd>Se aplică <b>după</b> calcul, pe valoarea totalizată: sub <i>Numărare</i> scrii <code>&gt;=3</code> → doar elevii cu cel puțin 3 împrumuturi. În SQL: <b>HAVING</b>.</dd>
<dt>Criteriu sub un câmp cu „Unde”</dt><dd>Se aplică <b>înainte</b> de grupare, pe înregistrări: Localitate cu <i>Unde</i> și criteriul <code>Brăila</code> → media pe clase calculată doar pentru elevii din Brăila. În SQL: <b>WHERE</b>.</dd>
</dl>
<div data-qbe='{"tables":["Elevi","Imprumuturi"],"totals":true,"cols":[{"field":"Nume","total":"Grupare după"},{"field":"Prenume","total":"Grupare după"},{"field":"IdImprumut","total":"Numărare","crit":">=2","sort":"Descendent"}]}'></div>
<h3>Alte interogări de analiză</h3>
<dl class="term">
<dt>Interogare încrucișată <span class="en">(Crosstab)</span></dt><dd>Afișează un tabel cu valori pe rânduri și pe coloane, ca un tabel pivot: clasele pe rânduri, genurile cărților pe coloane, numărul de împrumuturi în celule. Se creează cu <span class="ui">Creare › Expert interogare › Expert interogare încrucișată</span>.</dd>
<dt>Găsire dubluri <span class="en">(Find Duplicates)</span></dt><dd>Expertul găsește valorile care se repetă, de exemplu elevi înscriși de două ori.</dd>
<dt>Găsire neconcordanțe <span class="en">(Find Unmatched)</span></dt><dd>Expertul găsește înregistrările fără corespondent în alt tabel, de exemplu cărțile care nu au fost împrumutate niciodată.</dd>
</dl>
<div class="box retine"><div class="bt">Reține</div><ul><li>În interogările de totaluri, fiecare câmp are în rândul Total fie Grupare după, fie o funcție, fie Unde.</li><li>Nu pune în Grupare după câmpuri inutile: fiecare câmp în plus împarte grupurile în bucăți mai mici.</li></ul></div>`,
  exercitii: [
    { id: "o12e1", tip: "qbe", enunt: "Afișează fiecare <b>gen</b> de carte și <b>numărul de cărți</b> din acel gen.", start: { tables: ["Carti"] }, hint: "Apasă Σ Totaluri. Gen: Grupare după; IdCarte: Numărare.", sol: { tables: ["Carti"], totals: true, cols: [{ field: "Gen", total: "Grupare după" }, { field: "IdCarte", total: "Numărare" }] } },
    { id: "o12e2", tip: "qbe", enunt: "Afișează <b>media generală pe fiecare clasă</b>, cu clasele ordonate alfabetic.", start: { tables: ["Elevi"] }, ordered: true, sol: { tables: ["Elevi"], totals: true, cols: [{ field: "Clasa", total: "Grupare după", sort: "Ascendent" }, { field: "Media", total: "Medie" }] } },
    { id: "o12e3", tip: "qbe", enunt: "Afișează într-un singur rând <b>numărul total de exemplare</b> din bibliotecă (suma câmpului Exemplare).", start: { tables: ["Carti"] }, sol: { tables: ["Carti"], totals: true, cols: [{ field: "Exemplare", total: "Sumă" }] }, expl: "Fără Grupare după, tot tabelul formează un singur grup." },
    { id: "o12e4", tip: "qbe", enunt: "Afișează <b>Nume</b>, <b>Prenume</b> și <b>numărul de împrumuturi</b> doar pentru elevii care au <b>cel puțin 2 împrumuturi</b>.", start: { tables: ["Elevi", "Imprumuturi"] }, hint: "Criteriul <code>&gt;=2</code> se scrie sub coloana cu Numărare.", sol: { tables: ["Elevi", "Imprumuturi"], totals: true, cols: [{ field: "Nume", total: "Grupare după" }, { field: "Prenume", total: "Grupare după" }, { field: "IdImprumut", total: "Numărare", crit: ">=2" }] } },
    { id: "o12e5", tip: "qbe", enunt: "Afișează, pentru fiecare <b>gen</b>, <b>prețul cel mai mare</b> și <b>prețul cel mai mic</b>.", start: { tables: ["Carti"] }, hint: "Adaugă câmpul Pret de două ori: o dată cu Max, o dată cu Min.", sol: { tables: ["Carti"], totals: true, cols: [{ field: "Gen", total: "Grupare după" }, { field: "Pret", total: "Max" }, { field: "Pret", total: "Min" }] } },
    { id: "o12e6", tip: "qbe", enunt: "Afișează <b>media pe clase</b> calculată <b>doar pentru elevii din Brăila</b>.", start: { tables: ["Elevi"] }, hint: "Localitate cu Total = Unde și criteriul Brăila.", sol: { tables: ["Elevi"], totals: true, cols: [{ field: "Clasa", total: "Grupare după" }, { field: "Media", total: "Medie" }, { field: "Localitate", total: "Unde", crit: "Brăila" }] } },
    { id: "o12e7", tip: "select", enunt: "Ce funcție alegi în rândul Total?", options: ["Sumă", "Medie", "Min", "Max", "Numărare", "Grupare după"],
      items: [{ text: "Câți elevi are fiecare clasă?", ans: "Numărare" }, { text: "Care este cea mai mică medie din fiecare clasă?", ans: "Min" }, { text: "Câte exemplare are biblioteca în total?", ans: "Sumă" }, { text: "Ce medie are fiecare clasă?", ans: "Medie" }, { text: "Câmpul Clasa, ca să obții un rând pentru fiecare clasă", ans: "Grupare după" }, { text: "Care este cea mai recentă dată de împrumut?", ans: "Max" }] }
  ],
  fisa: {
    titlu: "Statisticile bibliotecii",
    context: "Raportul anual al bibliotecii are nevoie de cifre. Creează interogările de totaluri și notează rezultatele.",
    cerinte: [
      { text: "<b>qry_ElevipeClase</b>: numărul de elevi din fiecare clasă. Care clasă are cei mai mulți elevi?", pct: 10, raspuns: true },
      { text: "<b>qry_MediiClase</b>: media, media minimă și media maximă pe clase. Ce clasă are cea mai mare medie?", pct: 15, raspuns: true },
      { text: "<b>qry_FondPeGenuri</b>: pentru fiecare gen, numărul de titluri și numărul total de exemplare.", pct: 15, raspuns: true },
      { text: "<b>qry_ValoareFond</b>: valoarea totală a fondului de carte, cu expresia <code>Sum([Pret]*[Exemplare])</code>.", pct: 15, raspuns: true },
      { text: "<b>qry_CititoriActivi</b>: elevii cu cel puțin 2 împrumuturi, sortați descrescător după număr.", pct: 15, raspuns: true },
      { text: "<b>qry_ImprumuturiPeLocalitati</b>: numărul de împrumuturi pentru fiecare localitate a elevilor.", pct: 15, raspuns: true },
      { text: "Cu Expertul găsire neconcordanțe, află ce cărți nu au fost împrumutate niciodată.", pct: 15, raspuns: true }
    ],
    verificare: ["Am folosit butonul Totaluri Σ.", "Am pus criteriul pe valoarea totalizată.", "Am folosit opțiunea Unde."],
    solutii: `<ol><li>X A, X B și XI A au câte 4 elevi.</li><li>X A are media cea mai mare (8,85).</li><li>Roman: 6 titluri, 31 de exemplare; Poezie: 2, 15; Nuvelă: 2, 14; Teatru: 2, 10; Științific: 2, 3; SF: 1, 2; Memorialistică: 1, 12.</li><li>2.359,78 lei.</li><li>Ionescu și Constantin au câte 3; Popescu, Dumitru, Marin, Matei, Moldovan au câte 2.</li><li>Brăila 14, Galați 4, Ianca 3, Însurăței 2, Făurei 1, Chiscani 1.</li><li>Expertul nu întoarce nicio carte: toate cele 16 titluri au fost împrumutate cel puțin o dată. Pentru exercițiu, adaugă o carte nouă și rulează din nou expertul.</li></ol>`
  },
  test: [
    { q: "Ce buton afișează rândul Total în grila de proiectare?", opts: ["Σ Totaluri", "! Rulare", "Afișare tabel", "Generator"], ans: 0, expl: "Proiect interogare › Totaluri." },
    { q: "Ce opțiune formează grupurile?", opts: ["Sumă", "Grupare după", "Unde", "Expresie"], ans: 1, expl: "Un rând pentru fiecare valoare distinctă." },
    { q: "Ca să afli câți elevi are fiecare clasă folosești:", opts: ["Clasa: Grupare după; IdElev: Numărare", "Clasa: Sumă", "IdElev: Medie", "Clasa: Max"], ans: 0, expl: "Numărare numără valorile din grup." },
    { q: "Un criteriu scris sub o coloană cu funcția Numărare se aplică:", opts: ["înainte de grupare", "după calculul totalului", "doar la sortare", "niciodată"], ans: 1, expl: "Corespunde clauzei HAVING." },
    { q: "Opțiunea Unde din rândul Total:", opts: ["afișează câmpul de două ori", "folosește câmpul doar pentru un criteriu aplicat înainte de grupare", "calculează suma", "sortează"], ans: 1, expl: "Câmpul nu se afișează." },
    { q: "Ce expert găsește cărțile care nu au fost împrumutate niciodată?", opts: ["Găsire dubluri", "Găsire neconcordanțe", "Interogare încrucișată", "Interogare simplă"], ans: 1, expl: "Înregistrări fără corespondent în alt tabel." },
    { q: "Care sunt funcții disponibile în rândul Total?", opts: ["Sumă", "Medie", "Numărare", "Sortare"], ans: [0, 1, 2], expl: "Sortarea are rândul ei." },
    { q: "Interogarea încrucișată afișează datele:", opts: ["ca listă simplă", "ca tabel cu valori pe rânduri și pe coloane, asemănător unui tabel pivot", "ca diagramă", "ca formular"], ans: 1, expl: "Crosstab." }
  ]
});

/* ---------------- ORA 13 ---------------- */
LESSONS.push({
  id: 13, unit: "U4", titlu: "Interogări de acțiune", titluScurt: "Interogări de acțiune",
  rezumat: "Interogări de creare tabel, adăugare, actualizare și ștergere; măsuri de siguranță.",
  obiective: [
    "deosebești interogările de selecție de cele de acțiune;",
    "creezi interogări de <b>actualizare</b> și de <b>ștergere</b>;",
    "explici ce fac interogările de <b>creare tabel</b> și de <b>adăugare</b>;",
    "lucrezi în siguranță: copie de rezervă și verificare înainte de rulare."
  ],
  teorie: `
<p>Interogările de selecție doar <b>afișează</b> date. Interogările de <b>acțiune</b> <span class="en">(action queries)</span> <b>modifică</b> datele: creează tabele, adaugă, actualizează sau șterg înregistrări, multe deodată. Tipul se alege din <span class="ui">Proiect interogare › Tip interogare</span>.</p>
<div class="tblwrap"><table><thead><tr><th>Tip</th><th>Ce face</th><th>Exemplu</th><th>SQL</th></tr></thead><tbody>
<tr><td><b>Creare tabel</b> <span class="en">(Make Table)</span></td><td>salvează rezultatul într-un tabel nou</td><td>arhiva împrumuturilor din 2025</td><td><code>SELECT … INTO</code></td></tr>
<tr><td><b>Adăugare</b> <span class="en">(Append)</span></td><td>adaugă rezultatul la un tabel existent</td><td>mută împrumuturile vechi în arhivă</td><td><code>INSERT INTO</code></td></tr>
<tr><td><b>Actualizare</b> <span class="en">(Update)</span></td><td>modifică valori în înregistrările care îndeplinesc criteriile</td><td>scumpește romanele cu 10%</td><td><code>UPDATE … SET</code></td></tr>
<tr><td><b>Ștergere</b> <span class="en">(Delete)</span></td><td>șterge înregistrările care îndeplinesc criteriile</td><td>șterge împrumuturile restituite înainte de o dată</td><td><code>DELETE</code></td></tr>
</tbody></table></div>
<div class="box atentie"><div class="bt">Înainte de orice interogare de acțiune</div><ol>
<li>Fă o <b>copie de rezervă</b> a bazei de date. Modificările <b>nu se pot anula</b>.</li>
<li>Construiește întâi interogarea ca <b>selecție</b> și rulează: vezi exact ce înregistrări vor fi afectate.</li>
<li>Abia apoi schimbă tipul și rulează. Access afișează un mesaj cu numărul de rânduri; citește-l înainte să apeși Da.</li>
</ol></div>
<h3>Interogarea de actualizare</h3>
<p>După ce alegi tipul <b>Actualizare</b>, în grilă apare rândul <b>Actualizare la</b> <span class="en">(Update To)</span>. Scrii acolo valoarea nouă sau o expresie. Criteriile stabilesc ce înregistrări se modifică.</p>
<div data-qbe='{"tables":["Carti"],"type":"update","cols":[{"field":"Pret","update":"[Pret]*1,1"},{"field":"Gen","crit":"Roman"}]}'></div>
<p>Simulatorul îți arată valorile înainte și după, fără să modifice datele originale.</p>
<h3>Interogarea de ștergere</h3>
<p>Alegi tipul <b>Ștergere</b> și scrii criteriile. <b>Fără criterii se șterg toate înregistrările din tabel!</b> Dacă tabelul este în partea „unu” a unei relații fără ștergere în cascadă, Access refuză să șteargă înregistrările care au corespondent.</p>
<div data-qbe='{"tables":["Imprumuturi"],"type":"delete","cols":[{"field":"Restituit","crit":"Yes"},{"field":"DataRestituire","crit":"<#01.10.2026#"}]}'></div>
<h3>Recunoașterea în panoul de navigare</h3>
<p>Interogările de acțiune au pictograme diferite, cu semnul exclamării, ca să nu le rulezi din greșeală cu dublu clic. Access poate cere confirmare sau poate bloca rularea lor până activezi conținutul bazei de date.</p>
<div class="box retine"><div class="bt">Reține</div><ul><li>Selecție → doar afișează. Acțiune → modifică datele definitiv.</li><li>Întâi selecție, apoi acțiune. Întotdeauna cu copie de rezervă.</li></ul></div>`,
  exercitii: [
    { id: "o13e1", tip: "qbe", enunt: "Creează o interogare de <b>actualizare</b> care scumpește cu 10% cărțile din genul <b>Științific</b>.", start: { tables: ["Carti"], type: "update" }, hint: "Pret, Actualizare la: <code>[Pret]*1,1</code>; Gen, Criterii: <code>Științific</code>.", sol: { tables: ["Carti"], type: "update", cols: [{ field: "Pret", update: "[Pret]*1.1" }, { field: "Gen", crit: "Științific" }] } },
    { id: "o13e2", tip: "qbe", enunt: "Elevii din clasa <b>XII B</b> au absolvit. Actualizează câmpul <b>Clasa</b> la textul <b>Absolvent</b> pentru acești elevi.", start: { tables: ["Elevi"], type: "update" }, hint: "La Actualizare la, textul se scrie între ghilimele: <code>\"Absolvent\"</code>.", sol: { tables: ["Elevi"], type: "update", cols: [{ field: "Clasa", update: '"Absolvent"', crit: "XII B" }] } },
    { id: "o13e3", tip: "qbe", enunt: "Creează o interogare de <b>ștergere</b> pentru împrumuturile <b>restituite</b> înainte de <b>1 octombrie 2026</b> (DataRestituire mai mică decât 01.10.2026).", start: { tables: ["Imprumuturi"], type: "delete" }, sol: { tables: ["Imprumuturi"], type: "delete", cols: [{ field: "Restituit", crit: "Yes" }, { field: "DataRestituire", crit: "<#01.10.2026#" }] } },
    { id: "o13e4", tip: "qbe", enunt: "Dublează numărul de exemplare (<b>Exemplare</b> × 2) pentru cărțile care au <b>cel mult 2 exemplare</b>.", start: { tables: ["Carti"], type: "update" }, sol: { tables: ["Carti"], type: "update", cols: [{ field: "Exemplare", update: "[Exemplare]*2", crit: "<=2" }] } },
    { id: "o13e5", tip: "select", enunt: "Ce tip de interogare folosești?", options: ["Selecție", "Creare tabel", "Adăugare", "Actualizare", "Ștergere"],
      items: [{ text: "Toate cărțile primesc o reducere de 5 lei.", ans: "Actualizare" }, { text: "Vrei doar să vezi elevii bursieri.", ans: "Selecție" }, { text: "Vrei un tabel nou, ArhivaImprumuturi, cu împrumuturile din anul trecut.", ans: "Creare tabel" }, { text: "Elevii care au plecat din școală trebuie scoși din evidență.", ans: "Ștergere" }, { text: "Elevii înscriși într-un alt tabel, EleviNoi, trebuie puși la sfârșitul tabelului Elevi.", ans: "Adăugare" }] },
    { id: "o13e6", tip: "quiz", enunt: "Ce se întâmplă dacă rulezi o interogare de ștergere pe tabelul Carti <b>fără niciun criteriu</b>?", opts: ["Nu se întâmplă nimic", "Se șterg toate înregistrările din tabel (dacă relațiile permit)", "Se șterge doar prima carte", "Access creează o copie de rezervă automat"], ans: 1, expl: "Fără criterii, toate înregistrările îndeplinesc condiția." }
  ],
  fisa: {
    titlu: "Modificări în bloc, în siguranță",
    context: "Înainte de a începe: <span class=\"ui\">Fișier › Salvare ca › Copiere de rezervă bază de date</span>. Lucrează doar după ce ai copia.",
    cerinte: [
      { text: "Construiește ca <b>selecție</b> interogarea care afișează romanele, apoi transform-o în <b>actualizare</b> cu o scumpire de 5%. Câte rânduri anunță Access?", pct: 15, raspuns: true },
      { text: "Rulează din nou aceeași interogare de actualizare. Ce s-a întâmplat cu prețurile? Ce lecție tragi?", pct: 15, raspuns: true },
      { text: "<b>qry_ArhivaCreare</b>: creare tabel <b>ArhivaImprumuturi</b> cu împrumuturile restituite.", pct: 20 },
      { text: "<b>qry_StergeArhivate</b>: ștergere din Imprumuturi a împrumuturilor restituite. Verifică apoi că au rămas doar cele nerestituite.", pct: 20, raspuns: true },
      { text: "Încearcă să ștergi cu o interogare elevii din Brăila. Ce mesaj apare? Explică legătura cu integritatea referențială.", pct: 15, raspuns: true },
      { text: "Deschide în Vizualizare SQL interogarea de actualizare și copiaz-o.", pct: 15, raspuns: true }
    ],
    verificare: ["Am făcut o copie de rezervă înainte.", "Am verificat fiecare interogare de acțiune ca selecție.", "Am citit mesajul cu numărul de rânduri înainte de Da."],
    solutii: `<p>1. 6 rânduri. 2. Prețurile au crescut încă o dată: interogările de acțiune se rulează o singură dată. 5. Access nu poate șterge elevii care au împrumuturi (încălcări de cheie); ceilalți se șterg. 6. <code>UPDATE Carti SET Pret = [Pret]*1.05 WHERE Gen="Roman";</code></p>`
  },
  test: [
    { q: "Ce interogare modifică valorile din înregistrările existente?", opts: ["Selecție", "Actualizare", "Creare tabel", "Încrucișată"], ans: 1, expl: "UPDATE." },
    { q: "În ce rând scrii valoarea nouă într-o interogare de actualizare?", opts: ["Criterii", "Actualizare la", "Sortare", "Total"], ans: 1, expl: "Rândul apare după alegerea tipului." },
    { q: "Ce trebuie să faci înainte de a rula o interogare de acțiune?", opts: ["O copie de rezervă", "O rulare ca selecție, pentru verificare", "Să ștergi relațiile", "Să închizi Access"], ans: [0, 1], expl: "Modificările nu se pot anula." },
    { q: "Ce instrucțiune SQL corespunde interogării de ștergere?", opts: ["SELECT", "UPDATE", "DELETE", "INSERT INTO"], ans: 2, expl: "DELETE … FROM … WHERE." },
    { q: "Interogarea de adăugare:", opts: ["creează un tabel nou", "adaugă înregistrări la un tabel existent", "adaugă un câmp nou", "adaugă o relație"], ans: 1, expl: "INSERT INTO." },
    { q: "Se pot anula cu Ctrl+Z modificările făcute de o interogare de acțiune?", opts: ["Da", "Nu"], ans: 1, expl: "Sunt definitive." },
    { q: "Ai rulat de două ori o interogare care crește prețurile cu 10%. Cu cât au crescut prețurile față de început?", opts: ["10%", "20%", "21%", "0%"], ans: 2, expl: "1,1 × 1,1 = 1,21." }
  ]
});

/* ---------------- ORA 14 ---------------- */
LESSONS.push({
  id: 14, unit: "U5", titlu: "Formulare", titluScurt: "Formulare",
  rezumat: "Crearea formularelor, vizualizări, secțiuni, controale, proprietăți și subformulare.",
  obiective: [
    "creezi un formular rapid și un formular cu <b>Expertul</b>;",
    "lucrezi în vizualizările <b>Formular</b>, <b>Aspect</b> și <b>Proiect</b>;",
    "recunoști secțiunile și controalele unui formular;",
    "creezi un formular cu <b>subformular</b> pentru o relație 1:N."
  ],
  teorie: `
<p>Un <b>formular</b> <span class="en">(form)</span> este interfața prin care utilizatorii introduc și consultă datele, de obicei câte o înregistrare pe ecran. Bibliotecara nu lucrează direct în tabele: folosește formulare clare, cu liste derulante și butoane.</p>
<h3>Moduri de creare</h3>
<div class="tblwrap"><table><thead><tr><th>Comandă (fila Creare)</th><th>Rezultat</th></tr></thead><tbody>
<tr><td><b>Formular</b> <span class="en">(Form)</span></td><td>formular rapid cu toate câmpurile tabelului selectat în panoul de navigare</td></tr>
<tr><td><b>Expert formular</b> <span class="en">(Form Wizard)</span></td><td>alegi tabelele, câmpurile, aspectul (coloană, tabelar, foaie de date, stânga-dreapta) și titlul</td></tr>
<tr><td><b>Formular necompletat</b> / <b>Proiectare formular</b></td><td>pornești de la zero și adaugi controalele singur</td></tr>
<tr><td><b>Mai multe formulare › Mai multe elemente</b></td><td>mai multe înregistrări pe ecran, ca într-un tabel</td></tr>
<tr><td><b>Formular scindat</b> <span class="en">(Split Form)</span></td><td>sus o înregistrare în detaliu, jos foaia de date</td></tr>
</tbody></table></div>
<div class="box pas"><div class="bt">Pas cu pas: Expertul formular</div><ol>
<li><span class="ui">Creare › Expert formular</span>.</li>
<li>Alegi tabelul Elevi și muți câmpurile dorite în lista din dreapta (butonul &gt; sau &gt;&gt;).</li>
<li>Alegi aspectul: <b>Coloană</b>.</li>
<li>Scrii titlul „Fișa elevului” și alegi <b>Deschidere formular pentru a vizualiza sau introduce informații</b>.</li>
<li>Apeși <span class="ui">Terminare</span>.</li>
</ol></div>
<h3>Vizualizări</h3>
<dl class="term">
<dt>Vizualizare formular <span class="en">(Form View)</span></dt><dd>Folosești formularul: citești, adaugi, modifici date.</dd>
<dt>Vizualizare aspect <span class="en">(Layout View)</span></dt><dd>Muți și redimensionezi controalele văzând datele reale.</dd>
<dt>Vizualizare proiect <span class="en">(Design View)</span></dt><dd>Control complet: secțiuni, controale noi, proprietăți.</dd>
</dl>
<h3>Secțiuni și controale</h3>
<p>Un formular are <b>Antet formular</b> (titlu, logo), <b>Detaliu</b> (câmpurile înregistrării curente) și <b>Subsol formular</b> (totaluri, butoane).</p>
<div class="tblwrap"><table><thead><tr><th>Control</th><th>Rol</th></tr></thead><tbody>
<tr><td><b>Etichetă</b> <span class="en">(Label)</span></td><td>text fix: titluri, explicații</td></tr>
<tr><td><b>Casetă text</b> <span class="en">(Text Box)</span></td><td>afișează și editează valoarea unui câmp (control <b>legat</b>) sau un calcul: <code>=[Pret]*[Exemplare]</code> (control <b>calculat</b>)</td></tr>
<tr><td><b>Casetă combo</b> <span class="en">(Combo Box)</span></td><td>listă derulantă din care alegi o valoare</td></tr>
<tr><td><b>Casetă listă</b> <span class="en">(List Box)</span></td><td>listă de valori mereu vizibilă</td></tr>
<tr><td><b>Casetă de selectare</b> <span class="en">(Check Box)</span></td><td>pentru câmpuri Da/Nu</td></tr>
<tr><td><b>Buton de comandă</b> <span class="en">(Button)</span></td><td>execută o acțiune: înregistrare nouă, salvare, închidere</td></tr>
<tr><td><b>Imagine</b>, <b>Atașare</b></td><td>logo, fotografii</td></tr>
</tbody></table></div>
<p>Proprietățile oricărui control se văd în <b>Foaia de proprietăți</b> (<kbd>F4</kbd>): sursa datelor <span class="en">(Control Source)</span>, formatul, culorile, dacă se poate edita.</p>
<h3>Formular cu subformular</h3>
<p>Pentru o relație 1:N, formularul principal afișează partea „unu”, iar subformularul afișează înregistrările corelate. Exemplu: sus datele unui elev, jos lista împrumuturilor lui. Cu Expertul: alegi câmpuri din Elevi <b>și</b> din Imprumuturi, apoi <b>Formular cu subformulare</b>. Când treci la alt elev, subformularul se actualizează automat.</p>
<h3>Navigarea în formular</h3>
<p>Bara de jos are butoanele: prima înregistrare, anterioara, numărul înregistrării curente, următoarea, ultima și înregistrare nouă. Încearcă în exercițiul de mai jos.</p>
<div class="box retine"><div class="bt">Reține</div><ul><li>Formularul nu păstrează date: le citește și le scrie în tabel.</li><li>Control legat = câmp din tabel; control calculat = expresie care începe cu <code>=</code>.</li></ul></div>`,
  exercitii: [
    { id: "o14e1", tip: "select", enunt: "Ce control folosești în formular?", options: ["Etichetă", "Casetă text", "Casetă combo", "Casetă de selectare", "Buton de comandă"],
      items: [{ text: "Titlul „Fișa elevului” din antet", ans: "Etichetă" }, { text: "Câmpul Nume, care se poate modifica", ans: "Casetă text" }, { text: "Alegerea genului cărții dintr-o listă derulantă", ans: "Casetă combo" }, { text: "Câmpul Bursier (Da/Nu)", ans: "Casetă de selectare" }, { text: "„Adaugă elev nou”", ans: "Buton de comandă" }, { text: "Valoarea stocului, calculată cu =[Pret]*[Exemplare]", ans: "Casetă text" }] },
    { id: "o14e2", tip: "order", enunt: "Ordonează pașii Expertului formular.", steps: ["Creare › Expert formular", "Alegi tabelul și câmpurile", "Alegi aspectul formularului (de exemplu Coloană)", "Scrii titlul formularului", "Apeși Terminare"] },
    { id: "o14e3", tip: "formsim", enunt: "Formularul „Fișa cărții” afișează tabelul Carti. Navighează și răspunde.", table: "Carti", titlu: "Fișa cărții", fields: ["IdCarte", "Titlu", "Autor", "Gen", "AnAparitie", "Pret", "Exemplare"],
      questions: [{ q: "Ce titlu are înregistrarea 9?", ans: ["Maitreyi"] }, { q: "Câte exemplare are cartea „Cosmos”?", ans: ["1"] }, { q: "Cine este autorul ultimei cărți din tabel?", ans: ["Marin Sorescu"] }] },
    { id: "o14e4", tip: "quiz", enunt: "Vrei ca bibliotecara să vadă sus datele unui elev și jos toate împrumuturile lui. Ce creezi?", opts: ["Un raport cu grupare", "Un formular cu subformular", "O interogare de actualizare", "Un formular scindat pe tabelul Imprumuturi"], ans: 1, expl: "Subformularul afișează partea „mai mulți” a relației 1:N." },
    { id: "o14e5", tip: "select", enunt: "În ce vizualizare lucrezi?", options: ["Vizualizare formular", "Vizualizare aspect", "Vizualizare proiect"],
      items: [{ text: "Introduci un elev nou.", ans: "Vizualizare formular" }, { text: "Măresc caseta Titlu văzând titlurile reale.", ans: "Vizualizare aspect" }, { text: "Adaug un buton de comandă în subsolul formularului.", ans: "Vizualizare proiect" }, { text: "Răsfoiești înregistrările.", ans: "Vizualizare formular" }] },
    { id: "o14e6", tip: "fill", enunt: "Completează.", items: [
      { text: "Foaia de proprietăți se deschide cu tasta ___.", ans: ["F4"] },
      { text: "Un control calculat începe cu semnul ___.", ans: ["="] },
      { text: "Secțiunea în care apar câmpurile înregistrării curente se numește ___.", ans: ["Detaliu", "detaliu"] }] }
  ],
  fisa: {
    titlu: "Ecrane de lucru pentru bibliotecă",
    cerinte: [
      { text: "Creează un formular rapid pentru tabelul Carti. Salvează-l <b>frm_CartiRapid</b>.", pct: 10 },
      { text: "Cu Expertul, creează <b>frm_Elevi</b> (aspect Coloană) cu toate câmpurile, cu titlul „Fișa elevului”.", pct: 15 },
      { text: "În Vizualizare aspect, mărește caseta Nume și schimbă culoarea antetului.", pct: 10 },
      { text: "În Vizualizare proiect, adaugă în antet o etichetă cu numele liceului și în subsol un buton de comandă „Înregistrare nouă” (Expertul buton de comandă › Operații cu înregistrări › Adăugare înregistrare nouă).", pct: 20 },
      { text: "Creează <b>frm_ElevCuImprumuturi</b>: formular cu subformular (Elevi + Imprumuturi). Câte împrumuturi apar pentru eleva Constantin Ana?", pct: 25, raspuns: true },
      { text: "Adaugă în frm_CartiRapid o casetă text calculată <code>=[Pret]*[Exemplare]</code> cu eticheta „Valoare stoc”. Ce valoare are pentru „Baltagul”?", pct: 20, raspuns: true }
    ],
    verificare: ["Formularele sunt salvate cu prefixul frm_.", "Butonul adaugă o înregistrare nouă.", "Subformularul se schimbă când trec la alt elev."],
    solutii: `<p>5. 3 împrumuturi (Enigma Otiliei, Cosmos, Maitreyi). 6. 9 × 25 = 225,00 lei.</p>`
  },
  test: [
    { q: "La ce folosește un formular?", opts: ["La introducerea și consultarea comodă a datelor", "La păstrarea datelor", "La crearea relațiilor", "La comprimarea bazei de date"], ans: 0, expl: "Datele rămân în tabele." },
    { q: "Ce control folosești pentru o listă derulantă?", opts: ["Etichetă", "Casetă combo", "Buton de comandă", "Imagine"], ans: 1, expl: "Combo box." },
    { q: "Ce vizualizare îți permite să muți controalele văzând datele reale?", opts: ["Formular", "Aspect", "Foaie de date", "SQL"], ans: 1, expl: "Layout View." },
    { q: "Un subformular afișează de obicei:", opts: ["partea „unu” a relației", "înregistrările corelate din partea „mai mulți”", "doar etichete", "un raport"], ans: 1, expl: "De exemplu, împrumuturile elevului." },
    { q: "Ce tastă deschide Foaia de proprietăți?", opts: ["F1", "F4", "F11", "F12"], ans: 1, expl: "F4." },
    { q: "Care sunt secțiuni ale unui formular?", opts: ["Antet formular", "Detaliu", "Subsol formular", "Antet grup"], ans: [0, 1, 2], expl: "Antetul de grup este specific rapoartelor." },
    { q: "Expresia <code>=[Pret]*[Exemplare]</code> într-o casetă text face din ea un control:", opts: ["legat", "calculat", "nelegat fără valoare", "de tip etichetă"], ans: 1, expl: "Începe cu =." }
  ]
});

/* ---------------- ORA 15 ---------------- */
LESSONS.push({
  id: 15, unit: "U5", titlu: "Rapoarte", titluScurt: "Rapoarte",
  rezumat: "Raport rapid, Expertul raport, grupare și sortare, totaluri, secțiuni, etichete, export PDF.",
  obiective: [
    "creezi un raport rapid și un raport cu <b>Expertul</b>;",
    "grupezi și sortezi datele, cu totaluri pe grupuri;",
    "recunoști secțiunile unui raport;",
    "previzualizezi, tipărești și exporți un raport în PDF."
  ],
  teorie: `
<p>Un <b>raport</b> <span class="en">(report)</span> prezintă datele pentru citire și tipărire: liste ordonate, grupate, cu subtotaluri și totaluri. Spre deosebire de formular, raportul <b>nu permite modificarea datelor</b>. Sursa unui raport poate fi un tabel sau o interogare.</p>
<h3>Moduri de creare (fila Creare)</h3>
<ul>
<li><b>Raport</b>: raport rapid cu toate câmpurile obiectului selectat.</li>
<li><b>Expert raport</b> <span class="en">(Report Wizard)</span>: pas cu pas, cu grupare, sortare și rezumate.</li>
<li><b>Etichete</b> <span class="en">(Labels)</span>: etichete pentru plicuri sau ecusoane, după formate standard.</li>
<li><b>Raport necompletat</b> / <b>Proiectare raport</b>: pornești de la zero.</li>
</ul>
<div class="box pas"><div class="bt">Pas cu pas: Expertul raport</div><ol>
<li><span class="ui">Creare › Expert raport</span>; alegi tabelul sau interogarea și câmpurile.</li>
<li><b>Niveluri de grupare:</b> alegi câmpul după care grupezi (de exemplu Clasa).</li>
<li><b>Ordine de sortare:</b> până la 4 câmpuri în cadrul grupului (de exemplu Nume).</li>
<li><b>Opțiuni rezumat</b> <span class="en">(Summary Options)</span>: bifezi Sumă, Medie, Min, Max pentru câmpurile numerice; alegi Detaliu și rezumat sau Doar rezumat.</li>
<li>Alegi aspectul (În trepte, Bloc, Contur) și orientarea (Portret / Vedere).</li>
<li>Dai titlul și apeși <span class="ui">Terminare</span>. Raportul se deschide în Previzualizare înaintea imprimării.</li>
</ol></div>
<h3>Secțiunile unui raport</h3>
<div class="tblwrap"><table><thead><tr><th>Secțiune</th><th>Apare</th><th>Conține de obicei</th></tr></thead><tbody>
<tr><td><b>Antet raport</b></td><td>o singură dată, la început</td><td>titlul, logoul, data</td></tr>
<tr><td><b>Antet pagină</b></td><td>sus pe fiecare pagină</td><td>numele coloanelor</td></tr>
<tr><td><b>Antet grup</b></td><td>la începutul fiecărui grup</td><td>valoarea grupului: „Clasa X A”</td></tr>
<tr><td><b>Detaliu</b></td><td>pentru fiecare înregistrare</td><td>câmpurile</td></tr>
<tr><td><b>Subsol grup</b></td><td>la sfârșitul fiecărui grup</td><td>subtotaluri: <code>=Avg([Media])</code></td></tr>
<tr><td><b>Subsol pagină</b></td><td>jos pe fiecare pagină</td><td><code>="Pagina " &amp; [Page] &amp; " din " &amp; [Pages]</code></td></tr>
<tr><td><b>Subsol raport</b></td><td>o singură dată, la final</td><td>totaluri generale: <code>=Sum([Exemplare])</code>, <code>=Count(*)</code></td></tr>
</tbody></table></div>
<p>Gruparea se poate modifica oricând din <span class="ui">Proiectare raport › Grupare și sortare</span> <span class="en">(Group &amp; Sort)</span>, unde adaugi un grup, o sortare sau totaluri.</p>
<h3>Vizualizări și export</h3>
<ul>
<li><b>Vizualizare raport</b>: citești pe ecran, poți filtra.</li>
<li><b>Previzualizare înaintea imprimării</b>: vezi paginile exact cum se tipăresc; setezi marginile și orientarea.</li>
<li><b>Vizualizare aspect</b> și <b>Vizualizare proiect</b>: modifici raportul.</li>
<li>Export: din Previzualizare, <span class="ui">PDF sau XPS</span>; sau <span class="ui">Date externe › Export › PDF sau XPS</span>.</li>
</ul>
<div class="box atentie"><div class="bt">Probleme frecvente</div><ul><li>Câmpuri afișate ca <code>####</code>: caseta este prea îngustă.</li><li>Pagini goale la tipărire: raportul este mai lat decât pagina; micșorează lățimea sau alege orientarea Vedere.</li></ul></div>
<div class="box retine"><div class="bt">Reține</div><p>Formular = lucrezi cu datele pe ecran. Raport = prezinți datele pe hârtie sau în PDF, grupate și totalizate.</p></div>`,
  exercitii: [
    { id: "o15e1", tip: "reportsim", enunt: "Construiește raportul <b>„Situația pe clase”</b>: elevii grupați pe <b>Clasa</b>, sortați după <b>Nume</b>, cu <b>media</b> câmpului Media pe fiecare grup.", table: "Elevi", titlu: "Situația pe clase", show: ["Clasa", "Nume", "Prenume", "Localitate", "Media"], want: { g: "Clasa", s: "Nume", fn: "Medie", f: "Media" }, expl: "Exact asta faci în pașii 2–4 ai Expertului raport." },
    { id: "o15e2", tip: "reportsim", enunt: "Construiește raportul <b>„Fondul de carte pe genuri”</b>: cărțile grupate pe <b>Gen</b>, sortate după <b>Titlu</b>, cu <b>suma exemplarelor</b> pe fiecare gen.", table: "Carti", titlu: "Fondul de carte pe genuri", show: ["Gen", "Titlu", "Autor", "AnAparitie", "Exemplare"], want: { g: "Gen", s: "Titlu", fn: "Sumă", f: "Exemplare" } },
    { id: "o15e3", tip: "select", enunt: "În ce secțiune a raportului pui fiecare element?", options: ["Antet raport", "Antet pagină", "Antet grup", "Detaliu", "Subsol grup", "Subsol pagină", "Subsol raport"],
      items: [{ text: "Titlul „Situația împrumuturilor”, o singură dată", ans: "Antet raport" }, { text: "Numerotarea „Pagina 2 din 5”", ans: "Subsol pagină" }, { text: "Media fiecărei clase", ans: "Subsol grup" }, { text: "Numele și media fiecărui elev", ans: "Detaliu" }, { text: "Numele coloanelor, repetat pe fiecare pagină", ans: "Antet pagină" }, { text: "Totalul general al exemplarelor", ans: "Subsol raport" }, { text: "„Clasa X A” deasupra elevilor clasei", ans: "Antet grup" }] },
    { id: "o15e4", tip: "order", enunt: "Ordonează pașii Expertului raport.", steps: ["Alegi tabelul sau interogarea și câmpurile", "Adaugi nivelurile de grupare", "Alegi ordinea de sortare", "Bifezi opțiunile de rezumat (Sumă, Medie…)", "Alegi aspectul și orientarea", "Scrii titlul și apeși Terminare"] },
    { id: "o15e5", tip: "fill", enunt: "Completează expresiile din raport.", items: [
      { text: "Totalul exemplarelor în subsolul raportului: <code>=___([Exemplare])</code>", ans: ["Sum"] },
      { text: "Numărul de înregistrări: <code>=Count(___)</code>", ans: ["*"] },
      { text: "Numărul paginii curente se afișează cu câmpul <code>[___]</code>.", ans: ["Page"] }] },
    { id: "o15e6", tip: "quiz", enunt: "Prin ce se deosebește un raport de un formular?", opts: ["Raportul nu permite modificarea datelor și este făcut pentru prezentare și tipărire", "Raportul păstrează datele, formularul nu", "Formularul nu poate fi deschis pe ecran", "Nu există nicio diferență"], ans: 0, expl: "Formularele sunt pentru lucrul cu datele, rapoartele pentru prezentarea lor." }
  ],
  fisa: {
    titlu: "Rapoartele bibliotecii",
    cerinte: [
      { text: "Creează un raport rapid pentru tabelul Carti și observă aspectul. Salvează-l <b>rpt_CartiRapid</b>.", pct: 10 },
      { text: "Cu Expertul, creează <b>rpt_EleviPeClase</b>: grupare pe Clasa, sortare după Nume, Medie pentru Media, aspect În trepte. Ce medie are clasa X B?", pct: 20, raspuns: true },
      { text: "Creează <b>rpt_FondPeGenuri</b> cu grupare pe Gen și Sumă pentru Exemplare și Pret.", pct: 15 },
      { text: "Creează un raport pe baza interogării qry_CineCeCiteste (ora 9), grupat pe Clasa.", pct: 15 },
      { text: "În Vizualizare proiect, adaugă în subsolul raportului rpt_FondPeGenuri o casetă text <code>=Count(*)</code> cu eticheta „Număr de titluri”.", pct: 15 },
      { text: "Creează etichete (Creare › Etichete) cu numele, prenumele și clasa elevilor, pentru legitimațiile de bibliotecă.", pct: 10 },
      { text: "Exportă rpt_EleviPeClase în PDF și încarcă fișierul pe Classroom.", pct: 15 }
    ],
    verificare: ["Rapoartele au titlu și sunt salvate cu prefixul rpt_.", "Gruparea și totalurile sunt corecte.", "Am exportat un raport în PDF."],
    solutii: `<p>2. X B: (8,45 + 9,95 + 9,65 + 5,90) / 4 = 8,49.</p>`
  },
  test: [
    { q: "Pentru ce este făcut un raport?", opts: ["Pentru prezentarea și tipărirea datelor", "Pentru introducerea datelor", "Pentru crearea relațiilor", "Pentru importul din Excel"], ans: 0, expl: "Raportul nu modifică datele." },
    { q: "În ce secțiune se pune un subtotal pe fiecare clasă?", opts: ["Antet raport", "Subsol grup", "Antet pagină", "Detaliu"], ans: 1, expl: "Subsolul grupului apare după fiecare grup." },
    { q: "Ce expresie calculează suma exemplarelor într-un raport?", opts: ["=Sum([Exemplare])", "Sumă: Exemplare", "=Exemplare+", "[Exemplare].Sum"], ans: 0, expl: "Funcția Sum." },
    { q: "Ce secțiune apare o singură dată, la sfârșitul raportului?", opts: ["Subsol pagină", "Subsol raport", "Subsol grup", "Detaliu"], ans: 1, expl: "Totalurile generale stau în subsolul raportului." },
    { q: "Ce afișează <code>####</code> într-un raport?", opts: ["O eroare de date", "O casetă prea îngustă pentru valoare", "O valoare negativă", "Un câmp gol"], ans: 1, expl: "Mărește lățimea casetei." },
    { q: "Care sunt pași ai Expertului raport?", opts: ["Niveluri de grupare", "Ordine de sortare", "Opțiuni rezumat", "Impunere integritate referențială"], ans: [0, 1, 2], expl: "Integritatea ține de relații." },
    { q: "Sursa unui raport poate fi:", opts: ["doar un tabel", "un tabel sau o interogare", "doar un formular", "un fișier PDF"], ans: 1, expl: "Rapoartele pe interogări sunt foarte folosite." },
    { q: "Ce comandă creează etichete pentru plicuri sau ecusoane?", opts: ["Creare › Etichete", "Pornire › Etichete", "Date externe › Etichete", "Fișier › Etichete"], ans: 0, expl: "Fila Creare, grupul Rapoarte." }
  ]
});

/* ---------------- GLOSAR, SCURTĂTURI, PROIECT ---------------- */
window.EXTRA = {
  glosar: [
    ["Bază de date", "database", "Colecție de date organizate și legate între ele, despre un subiect."],
    ["SGBD", "DBMS", "Sistem de gestiune a bazelor de date: programul care creează și administrează baza de date (Access, MySQL)."],
    ["Tabel", "table", "Obiectul care păstrează datele despre un singur subiect, organizate pe rânduri și coloane."],
    ["Câmp", "field", "O coloană a tabelului; o caracteristică a entității."],
    ["Înregistrare", "record", "Un rând al tabelului; toate datele despre un element."],
    ["Entitate", "entity", "Obiect sau eveniment despre care păstrăm date; devine tabel."],
    ["Atribut", "attribute", "Caracteristică a unei entități; devine câmp."],
    ["Cheie primară", "primary key", "Câmpul cu valori unice și nenule care identifică fiecare înregistrare."],
    ["Cheie externă", "foreign key", "Câmp care conține cheia primară a altui tabel și realizează legătura."],
    ["Cheie compusă", "composite key", "Cheie primară formată din mai multe câmpuri."],
    ["Tip de date", "data type", "Felul valorilor acceptate de un câmp: Text scurt, Număr, Dată/Oră, Monedă etc."],
    ["Numerotare automată", "AutoNumber", "Tip de date care dă automat un număr unic fiecărei înregistrări noi."],
    ["Mască de intrare", "input mask", "Tiparul după care se introduc datele într-un câmp."],
    ["Regulă de validare", "validation rule", "Condiția pe care trebuie să o respecte o valoare ca să fie acceptată."],
    ["Valoare implicită", "default value", "Valoarea completată automat la o înregistrare nouă."],
    ["Index", "index", "Structură care accelerează căutarea; „fără dubluri” interzice valorile repetate."],
    ["Expert căutare", "Lookup Wizard", "Creează o listă derulantă de valori pentru un câmp."],
    ["Relație", "relationship", "Legătura dintre două tabele, prin chei."],
    ["Relație 1:N", "one-to-many", "Unei înregistrări dintr-un tabel îi corespund mai multe în celălalt."],
    ["Tabel de legătură", "junction table", "Tabel care transformă o relație M:N în două relații 1:N."],
    ["Integritate referențială", "referential integrity", "Reguli care împiedică înregistrările orfane între tabelele legate."],
    ["Ștergere în cascadă", "cascade delete", "Ștergerea automată a înregistrărilor corelate la ștergerea înregistrării principale."],
    ["Filtru", "filter", "Condiție care ascunde temporar înregistrările nepotrivite."],
    ["Interogare", "query", "Întrebare adresată bazei de date; rezultatul se recalculează din tabele."],
    ["Grila de proiectare", "QBE grid", "Zona din Vizualizarea proiect a interogării în care alegi câmpuri, sortări și criterii."],
    ["Criteriu", "criterion", "Condiție pe care trebuie să o îndeplinească înregistrările dintr-o interogare."],
    ["Câmp calculat", "calculated field", "Coloană a interogării obținută dintr-o expresie: ValoareStoc: [Pret]*[Exemplare]."],
    ["Parametru", "parameter", "Valoare cerută utilizatorului la rularea interogării: [Introduceți clasa:]."],
    ["Interogare de totaluri", "totals query", "Interogare care grupează înregistrările și calculează sume, medii, numărări."],
    ["Interogare încrucișată", "crosstab query", "Rezumat cu valori pe rânduri și coloane, asemănător unui tabel pivot."],
    ["Interogare de acțiune", "action query", "Interogare care modifică datele: creare tabel, adăugare, actualizare, ștergere."],
    ["SQL", "Structured Query Language", "Limbajul standard al bazelor de date relaționale: SELECT, UPDATE, DELETE, INSERT."],
    ["Formular", "form", "Interfață pentru introducerea și consultarea datelor."],
    ["Subformular", "subform", "Formular inclus în alt formular, care afișează înregistrările corelate."],
    ["Control", "control", "Element al unui formular sau raport: etichetă, casetă text, casetă combo, buton."],
    ["Raport", "report", "Obiect pentru prezentarea și tipărirea datelor, cu grupări și totaluri."],
    ["Import / Legare", "import / link", "Copierea datelor dintr-o sursă externă / folosirea lor direct din sursă."],
    ["Comprimare și reparare", "Compact & Repair", "Comandă care micșorează fișierul bazei de date și corectează erorile."]
  ],
  scurtaturi: [
    ["F11", "afișează sau ascunde panoul de navigare"],
    ["Ctrl + S", "salvează obiectul curent (structura)"],
    ["Ctrl + +", "înregistrare nouă"],
    ["Ctrl + -", "șterge înregistrarea curentă"],
    ["Ctrl + ;", "scrie data de azi"],
    ["Ctrl + '", "copiază valoarea din aceeași coloană a înregistrării anterioare"],
    ["Esc", "anulează modificările din câmpul sau înregistrarea curentă"],
    ["Tab", "trece la câmpul următor"],
    ["Ctrl + F", "Găsire"],
    ["Ctrl + H", "Înlocuire"],
    ["F2", "comută între editarea câmpului și selectarea lui"],
    ["Ctrl + F2", "deschide Generatorul de expresii"],
    ["Shift + F2", "deschide caseta Panoramare, pentru expresii lungi"],
    ["F4", "deschide Foaia de proprietăți (formulare, rapoarte)"],
    ["F5", "comută în Vizualizare formular"],
    ["Ctrl + P", "imprimare"]
  ],
  proiect: {
    titlu: "Proiect final: baza mea de date",
    durata: "4 ore de laborator + lucru acasă",
    intro: "Construiești individual o bază de date Access completă, de la proiectare la rapoarte, pe una dintre temele de mai jos sau pe o temă proprie aprobată de profesor. Predai fișierul .accdb, raportul exportat în PDF și o pagină de documentație.",
    continut: `
<h3>Teme propuse</h3>
<div class="tblwrap"><table><thead><tr><th>Temă</th><th>Tabele sugerate</th></tr></thead><tbody>
<tr><td>Clubul de robotică</td><td>Membri, Proiecte, Participari (membru–proiect, rol, ore lucrate)</td></tr>
<tr><td>Olimpiade și concursuri</td><td>Elevi, Concursuri, Rezultate (punctaj, premiu)</td></tr>
<tr><td>Cinematograful orașului</td><td>Filme, Sali, Proiectii (dată, oră, bilete vândute)</td></tr>
<tr><td>Magazin online de jocuri</td><td>Clienti, Jocuri, Comenzi (cantitate, dată, preț)</td></tr>
<tr><td>Campionatul școlar de fotbal</td><td>Echipe, Jucatori, Meciuri</td></tr>
<tr><td>Voluntariat</td><td>Voluntari, Actiuni, Prezente (ore)</td></tr>
</tbody></table></div>
<h3>Cerințe minime</h3>
<ol>
<li><b>Proiectare:</b> minimum 3 tabele, fiecare cu cheie primară, tipuri de date potrivite, fără câmpuri repetitive sau calculabile.</li>
<li><b>Proprietăți:</b> minimum 3 reguli de validare cu text de validare, o valoare implicită, un câmp obligatoriu, o listă derulantă (Expert căutare).</li>
<li><b>Date:</b> minimum 15 înregistrări în tabelele principale și 25 în tabelul de legătură; o parte importate din Excel.</li>
<li><b>Relații:</b> toate relațiile create, cu integritate referențială.</li>
<li><b>Interogări</b> (minimum 7): sortare pe două câmpuri; criterii cu ȘI; criterii cu SAU; Like sau Between; câmp calculat; parametru; totaluri cu grupare; o interogare de actualizare.</li>
<li><b>Formulare:</b> un formular cu Expertul, personalizat (titlu, buton de comandă) și un formular cu subformular.</li>
<li><b>Rapoarte:</b> un raport cu grupare, sortare și totaluri, exportat în PDF.</li>
<li><b>Documentație</b> (o pagină): scopul bazei de date, diagrama relațiilor (captură din fereastra Relații) și lista interogărilor cu ce face fiecare.</li>
</ol>
<div class="box atentie"><div class="bt">Predare</div><p>Fișierul se numește <code>Proiect_NumePrenume_Clasa.accdb</code>. Rulează <b>Comprimare și reparare</b> înainte de predare. Încarcă pe Classroom fișierul .accdb, PDF-ul raportului și documentația.</p></div>`,
    barem: [
      ["Proiectarea tabelelor: chei primare, tipuri de date, reguli de proiectare", 15],
      ["Proprietăți ale câmpurilor: validare, valoare implicită, obligatoriu, listă derulantă", 10],
      ["Datele: volum, corectitudine, import din Excel", 10],
      ["Relații cu integritate referențială", 10],
      ["Interogări (7 tipuri cerute, câte 3 puncte)", 21],
      ["Formulare: formular personalizat și formular cu subformular", 12],
      ["Raport cu grupare și totaluri, exportat în PDF", 12],
      ["Documentație și prezentare", 10]
    ]
  }
};
