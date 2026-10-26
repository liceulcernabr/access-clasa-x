/* =========================================================
   Baza de date de lucru: „Biblioteca școlii"
   Folosită de toate simulatoarele și de fișele de lucru.
   Datele sunt fictive, create pentru exersare.
   ========================================================= */
window.DB = (function () {
  // Structura tabelelor, cu tipurile de date din Access
  const schema = {
    Elevi: {
      descriere: "Elevii înscriși la biblioteca școlii",
      campuri: [
        { nume: "IdElev", tip: "Numerotare automată", cheie: true, desc: "Codul unic al elevului" },
        { nume: "Nume", tip: "Text scurt", dim: 30 },
        { nume: "Prenume", tip: "Text scurt", dim: 30 },
        { nume: "Clasa", tip: "Text scurt", dim: 6, desc: "Ex.: X A" },
        { nume: "Gen", tip: "Text scurt", dim: 1, desc: "F sau M" },
        { nume: "DataNasterii", tip: "Dată/Oră", desc: "Format: Dată scurtă" },
        { nume: "Localitate", tip: "Text scurt", dim: 30 },
        { nume: "Telefon", tip: "Text scurt", dim: 10, desc: "Text, nu Număr: începe cu 0" },
        { nume: "Media", tip: "Număr", dim: "Dublă", desc: "Media generală, între 1 și 10" },
        { nume: "Bursier", tip: "Da/Nu" }
      ]
    },
    Carti: {
      descriere: "Cărțile din fondul bibliotecii",
      campuri: [
        { nume: "IdCarte", tip: "Numerotare automată", cheie: true },
        { nume: "Titlu", tip: "Text scurt", dim: 80 },
        { nume: "Autor", tip: "Text scurt", dim: 50 },
        { nume: "Gen", tip: "Text scurt", dim: 20, desc: "Roman, Poezie, Nuvelă, Teatru, Științific, SF, Memorialistică" },
        { nume: "AnAparitie", tip: "Număr", dim: "Întreg" },
        { nume: "Pret", tip: "Monedă", desc: "Prețul unui exemplar, în lei" },
        { nume: "Exemplare", tip: "Număr", dim: "Octet" }
      ]
    },
    Imprumuturi: {
      descriere: "Împrumuturile de cărți făcute de elevi",
      campuri: [
        { nume: "IdImprumut", tip: "Numerotare automată", cheie: true },
        { nume: "IdElev", tip: "Număr", dim: "Întreg lung", desc: "Cheie externă → Elevi" },
        { nume: "IdCarte", tip: "Număr", dim: "Întreg lung", desc: "Cheie externă → Carti" },
        { nume: "DataImprumut", tip: "Dată/Oră" },
        { nume: "DataRestituire", tip: "Dată/Oră", desc: "Goală dacă nu a fost returnată" },
        { nume: "Restituit", tip: "Da/Nu" }
      ]
    }
  };

  const relatii = [
    { de: "Elevi", campDe: "IdElev", la: "Imprumuturi", campLa: "IdElev", tip: "1:N" },
    { de: "Carti", campDe: "IdCarte", la: "Imprumuturi", campLa: "IdCarte", tip: "1:N" }
  ];

  const elevi = [
    [1, "Popescu", "Andrei", "X A", "M", "2010-03-14", "Brăila", "0740123456", 9.25, true],
    [2, "Ionescu", "Maria", "X A", "F", "2010-07-02", "Brăila", "0751234567", 9.80, true],
    [3, "Dumitru", "Elena", "X B", "F", "2010-11-23", "Ianca", "0722345678", 8.45, false],
    [4, "Stan", "Mihai", "IX A", "M", "2011-01-30", "Galați", "0733456789", 7.90, false],
    [5, "Marin", "Ioana", "XI A", "F", "2009-05-17", "Brăila", "0744567890", 9.55, true],
    [6, "Radu", "Ștefan", "XII B", "M", "2008-09-08", "Însurăței", null, 8.10, false],
    [7, "Constantin", "Ana", "X B", "F", "2010-04-19", "Brăila", "0766789012", 9.95, true],
    [8, "Gheorghe", "Vlad", "IX B", "M", "2011-06-25", "Chiscani", "0777890123", 6.85, false],
    [9, "Munteanu", "Daria", "XI A", "F", "2009-12-01", "Făurei", "0788901234", 8.75, false],
    [10, "Tudor", "Alexandru", "X A", "M", "2010-02-11", "Brăila", "0799012345", 7.40, false],
    [11, "Matei", "Bianca", "XII B", "F", "2008-08-29", "Galați", "0720123987", 9.10, true],
    [12, "Ene", "Cristian", "IX A", "M", "2011-03-05", "Ianca", null, 8.00, false],
    [13, "Moldovan", "Irina", "X B", "F", "2010-10-10", "Brăila", "0741987654", 9.65, true],
    [14, "Barbu", "Darius", "XI A", "M", "2009-07-21", "Brăila", "0752876543", 6.50, false],
    [15, "Dobre", "Sara", "IX B", "F", "2011-09-14", "Însurăței", "0723765432", 9.30, true],
    [16, "Lungu", "Tudor", "XII B", "M", "2008-04-03", "Brăila", "0734654321", 7.75, false],
    [17, "Petrescu", "Alexia", "X A", "F", "2010-12-27", "Chiscani", "0745543210", 8.95, false],
    [18, "Nistor", "Robert", "X B", "M", "2010-05-06", "Făurei", "0756432109", 5.90, false],
    [19, "Florea", "Andreea", "XI A", "F", "2009-02-15", "Galați", "0727321098", 9.45, true],
    [20, "Vasile", "Matei", "IX A", "M", "2011-11-11", "Brăila", "0738210987", 8.60, false]
  ];

  const carti = [
    [1, "Ion", "Liviu Rebreanu", "Roman", 1920, 34.5, 6],
    [2, "Enigma Otiliei", "George Călinescu", "Roman", 1938, 42, 5],
    [3, "Moara cu noroc", "Ioan Slavici", "Nuvelă", 1881, 18.9, 8],
    [4, "Luceafărul", "Mihai Eminescu", "Poezie", 1883, 15, 10],
    [5, "O scrisoare pierdută", "Ion Luca Caragiale", "Teatru", 1884, 21.5, 7],
    [6, "Baltagul", "Mihail Sadoveanu", "Roman", 1930, 25, 9],
    [7, "Ultima noapte de dragoste, întâia noapte de război", "Camil Petrescu", "Roman", 1930, 38, 4],
    [8, "Amintiri din copilărie", "Ion Creangă", "Memorialistică", 1892, 19.99, 12],
    [9, "Maitreyi", "Mircea Eliade", "Roman", 1933, 36, 3],
    [10, "Plumb", "George Bacovia", "Poezie", 1916, 16.5, 5],
    [11, "Fundația", "Isaac Asimov", "SF", 1951, 49.9, 2],
    [12, "Micul prinț", "Antoine de Saint-Exupéry", "Nuvelă", 1943, 29, 6],
    [13, "1984", "George Orwell", "Roman", 1949, 45, 4],
    [14, "Scurtă istorie a timpului", "Stephen Hawking", "Științific", 1988, 55, 2],
    [15, "Cosmos", "Carl Sagan", "Științific", 1980, 59.9, 1],
    [16, "Iona", "Marin Sorescu", "Teatru", 1968, 20, 3]
  ];

  const imprumuturi = [
    [1, 1, 1, "2026-09-15", "2026-09-29", true],
    [2, 2, 4, "2026-09-15", "2026-09-22", true],
    [3, 3, 6, "2026-09-16", "2026-10-02", true],
    [4, 5, 13, "2026-09-17", null, false],
    [5, 7, 2, "2026-09-18", "2026-10-05", true],
    [6, 2, 9, "2026-09-22", "2026-10-06", true],
    [7, 9, 11, "2026-09-23", null, false],
    [8, 11, 14, "2026-09-24", "2026-10-12", true],
    [9, 4, 3, "2026-09-25", "2026-10-01", true],
    [10, 13, 7, "2026-09-29", null, false],
    [11, 1, 5, "2026-10-01", "2026-10-08", true],
    [12, 15, 12, "2026-10-01", "2026-10-09", true],
    [13, 7, 15, "2026-10-02", null, false],
    [14, 19, 1, "2026-10-05", "2026-10-19", true],
    [15, 10, 8, "2026-10-06", "2026-10-13", true],
    [16, 2, 10, "2026-10-07", null, false],
    [17, 17, 6, "2026-10-08", "2026-10-20", true],
    [18, 5, 2, "2026-10-09", null, false],
    [19, 20, 4, "2026-10-12", "2026-10-16", true],
    [20, 13, 13, "2026-10-13", null, false],
    [21, 6, 16, "2026-10-14", "2026-10-21", true],
    [22, 7, 9, "2026-10-15", null, false],
    [23, 12, 3, "2026-10-16", null, false],
    [24, 11, 5, "2026-10-19", null, false],
    [25, 3, 12, "2026-10-20", null, false]
  ];

  // Transformă rândurile în obiecte și datele calendaristice în obiecte Date
  function build(tabel, rows) {
    const f = schema[tabel].campuri;
    return rows.map(r => {
      const o = {};
      f.forEach((c, i) => {
        let v = r[i];
        if (c.tip === "Dată/Oră" && v) { const [y, m, d] = v.split("-").map(Number); v = new Date(y, m - 1, d); }
        o[c.nume] = v === undefined ? null : v;
      });
      return o;
    });
  }

  const tables = {
    Elevi: build("Elevi", elevi),
    Carti: build("Carti", carti),
    Imprumuturi: build("Imprumuturi", imprumuturi)
  };

  return { schema, relatii, tables, azi: new Date(2026, 9, 26) };
})();
