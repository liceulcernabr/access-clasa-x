/* =========================================================
   Atelier Access — interfața site-ului
   Navigare, lecții, exerciții interactive, fișe, teste
   ========================================================= */
(function () {
  const CONFIG = {
    codProfesor: "cerna2026",   // codul pentru „Mod profesor” (afișează soluțiile fișelor)
    intrebariMiniTest: 6,
    intrebariTestFinal: 20,
    minuteTestFinal: 30
  };
  const L = window.LESSONS.sort((a, b) => a.id - b.id);
  const UNITS = window.UNITS;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => [...(el || document).querySelectorAll(s)];
  const esc = (s) => String(s === null || s === undefined ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = (s) => String(s || "").trim().toLocaleLowerCase("ro").replace(/\s+/g, " ").replace(/[„”"']/g, "");
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const TYPES = ["Text scurt", "Text lung", "Număr", "Număr mare", "Dată/Oră", "Monedă", "Numerotare automată", "Da/Nu", "Obiect OLE", "Hyperlink", "Atașare", "Calculat"];

  /* ---------- stocare locală (progres) ---------- */
  const KEY = "atelier-access-x";
  let store = { ex: {}, test: {}, fisa: {}, tab: {}, teacher: false, nume: "" };
  try { const raw = localStorage.getItem(KEY); if (raw) store = Object.assign(store, JSON.parse(raw)); } catch (e) { }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { } }

  function toast(msg) {
    const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; t.setAttribute("role", "status");
    document.body.appendChild(t); setTimeout(() => t.remove(), 2200);
  }
  function copyText(text, fallbackHost) {
    const done = () => toast("Copiat în clipboard");
    const fallback = () => {
      const ta = document.createElement("textarea"); ta.value = text; ta.style.minHeight = "160px"; ta.readOnly = true;
      (fallbackHost || document.body).appendChild(ta); ta.focus(); ta.select();
      toast("Textul este selectat: apasă Ctrl+C");
    };
    try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
  }

  /* ---------- progres ---------- */
  function lessonProgress(les) {
    const ids = les.exercitii.map(e => e.id);
    const done = ids.filter(id => store.ex[id]).length;
    const t = store.test[les.id] ? 1 : 0;
    const total = ids.length + 1;
    return { done: done + t, total, pct: Math.round(100 * (done + t) / total) };
  }
  function ring(pct) {
    const r = 6.5, c = 2 * Math.PI * r;
    const col = pct >= 100 ? "var(--ok)" : "var(--accent)";
    return `<svg class="ring" viewBox="0 0 16 16" aria-label="${pct}% realizat"><circle cx="8" cy="8" r="${r}" fill="none" stroke="var(--line)" stroke-width="2.2"/><circle cx="8" cy="8" r="${r}" fill="none" stroke="${col}" stroke-width="2.2" stroke-dasharray="${c * pct / 100} ${c}" ${pct ? "" : 'opacity="0"'} transform="rotate(-90 8 8)" stroke-linecap="round"/></svg>`;
  }

  /* ---------- navigare ---------- */
  const NAV = [["acasa", "Acasă"], ["lectii", "Lecții"], ["laborator", "Laborator interogări"], ["date", "Datele de lucru"], ["test", "Test final"], ["proiect", "Proiect"], ["glosar", "Glosar"]];
  function renderTop(route) {
    $("#topnav").innerHTML = NAV.map(([k, t]) => `<a href="#${k === "lectii" ? "ora-1" : k}" class="${(route === k || (k === "lectii" && route.startsWith("ora-"))) ? "on" : ""}">${t}</a>`).join("");
  }
  function renderSide(route) {
    let h = `<div class="mnav">${NAV.map(([k, t]) => `<a class="lk ${route === k ? "on" : ""}" href="#${k === "lectii" ? "ora-1" : k}"><span></span><span>${t}</span><span></span></a>`).join("")}<div class="side-tools"></div></div>`;
    UNITS.forEach(u => {
      h += `<div class="unit-h">${esc(u.cod)} · ${esc(u.titlu)}</div>`;
      L.filter(l => l.unit === u.cod).forEach(l => {
        const p = lessonProgress(l);
        h += `<a class="lk ${route === "ora-" + l.id ? "on" : ""}" href="#ora-${l.id}"><span class="num">${String(l.id).padStart(2, "0")}</span><span>${esc(l.titluScurt || l.titlu)}</span>${ring(p.pct)}</a>`;
      });
    });
    h += `<div class="side-tools"><a class="lk ${route === "laborator" ? "on" : ""}" href="#laborator"><span class="num">▶</span><span>Laborator interogări</span><span></span></a><a class="lk ${route === "test" ? "on" : ""}" href="#test"><span class="num">✓</span><span>Test final</span><span></span></a></div>`;
    $("#side").innerHTML = h;
  }
  function closeMenu() { $("#side").classList.remove("open"); const s = $(".scrim"); if (s) s.remove(); $("#menuBtn").setAttribute("aria-expanded", "false"); }
  $("#menuBtn").addEventListener("click", () => {
    const side = $("#side");
    if (side.classList.contains("open")) return closeMenu();
    side.classList.add("open"); $("#menuBtn").setAttribute("aria-expanded", "true");
    const s = document.createElement("div"); s.className = "scrim"; s.addEventListener("click", closeMenu); document.body.appendChild(s);
  });

  function route() {
    const h = (location.hash || "#acasa").slice(1);
    closeMenu();
    renderTop(h); renderSide(h);
    const main = $("#main");
    let m;
    if ((m = h.match(/^ora-(\d+)$/)) && L.find(l => l.id === +m[1])) renderLesson(main, L.find(l => l.id === +m[1]));
    else if (h === "laborator") renderLab(main);
    else if (h === "date") renderData(main);
    else if (h === "test") renderFinal(main);
    else if (h === "glosar") renderGlosar(main);
    else if (h === "proiect") renderProiect(main);
    else renderHome(main);
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);

  function footer() {
    return `<div class="foot"><span>Atelier Access · TIC clasa a X-a · prof. Aura Ion · Liceul Teoretic „Panait Cerna” Brăila</span>
      <span class="row-gap" id="teacherSlot">${store.teacher ? `<span class="chip acc">Mod profesor activ</span><button class="btn sm ghost" data-act="teacher-off">Ieși din modul profesor</button>` : `<button class="btn sm ghost" data-act="teacher-on">Mod profesor</button>`}<button class="btn sm ghost" data-act="reset">Resetează progresul</button></span></div>`;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    const act = b.dataset.act; const slot = $("#teacherSlot");
    if (act === "teacher-on" && slot) {
      slot.innerHTML = `<label class="row-gap">Cod profesor <input type="text" id="tcode" autocomplete="off" style="width:130px"></label><button class="btn sm pri" data-act="teacher-ok">Activează</button><button class="btn sm ghost" data-act="cancel">Renunță</button>`;
      $("#tcode").focus();
      $("#tcode").addEventListener("keydown", ev => { if (ev.key === "Enter") $("[data-act=teacher-ok]").click(); });
    }
    if (act === "teacher-ok") { if ($("#tcode").value.trim() === CONFIG.codProfesor) { store.teacher = true; save(); route(); toast("Mod profesor activat: soluțiile fișelor sunt vizibile"); } else toast("Cod greșit"); }
    if (act === "teacher-off") { store.teacher = false; save(); route(); }
    if (act === "cancel") route();
    if (act === "reset" && slot) slot.innerHTML = `<span class="confirm">Ștergi tot progresul salvat în acest browser? <button class="btn sm pri" data-act="reset-ok">Da, șterge</button><button class="btn sm" data-act="cancel">Nu</button></span>`;
    if (act === "reset-ok") { store = { ex: {}, test: {}, fisa: {}, tab: {}, teacher: false, nume: "" }; save(); route(); toast("Progresul a fost șters"); }
  });

  /* ---------- foaie de date ---------- */
  function dsHTML(columns, tips, rows, opts) {
    opts = opts || {};
    const isNum = (t, v) => t === "Număr" || t === "Monedă" || t === "Numerotare automată" || typeof v === "number";
    let h = `<div class="ds-wrap">${opts.tools || ""}<div class="ds-scroll"><table class="ds"><thead><tr><th class="rs"></th>`;
    columns.forEach((c, i) => {
      const cls = [opts.sortable ? "sortable" : "", opts.selCol === i ? "csel" : ""].join(" ");
      const arrow = opts.sort && opts.sort.i === i ? (opts.sort.dir === "asc" ? " ▲" : " ▼") : "";
      h += `<th class="${cls}" data-ci="${i}" scope="col">${esc(c)}${arrow}</th>`;
    });
    h += `</tr></thead><tbody>`;
    if (!rows.length) h += `<tr><td class="rs"></td><td colspan="${columns.length}" style="color:var(--muted)">(nicio înregistrare)</td></tr>`;
    rows.forEach((r, ri) => {
      const rc = opts.rowClass ? opts.rowClass(ri) : "";
      h += `<tr class="${rc}"><td class="rs"></td>`;
      r.forEach((v, ci) => {
        const cls = [isNum(tips && tips[ci], v) ? "n" : "", opts.selCol === ci ? "csel" : "", opts.selCell && opts.selCell.r === ri && opts.selCell.c === ci ? "cellsel" : "", opts.cellClass ? opts.cellClass(ri, ci) : ""].join(" ");
        h += `<td class="${cls}" data-r="${ri}" data-c="${ci}" title="${esc(Engine.show(v, tips && tips[ci]))}">${esc(Engine.show(v, tips && tips[ci]))}</td>`;
      });
      h += `</tr>`;
    });
    h += `</tbody></table></div><div class="ds-foot"><span>Înregistrare: ${rows.length ? 1 : 0} din ${rows.length}</span>${opts.filtered ? `<span class="flt">Filtrat</span>` : `<span>Nefiltrat</span>`}${opts.footExtra || ""}</div></div>`;
    return h;
  }
  function tableData(t) {
    const f = DB.schema[t].campuri;
    return { columns: f.map(x => x.nume), tips: f.map(x => x.tip), rows: DB.tables[t].map(r => f.map(x => r[x.nume])) };
  }

  /* ---------- diagrama relațiilor ---------- */
  function relDiagram(compact) {
    const T = { Elevi: [20, 20], Imprumuturi: [250, 70], Carti: [480, 20] };
    const w = 150, hh = 20;
    let s = `<svg viewBox="0 0 650 ${compact ? 270 : 290}" role="img" aria-label="Fereastra Relații: Elevi 1 la mai mulți Imprumuturi, Carti 1 la mai mulți Imprumuturi">`;
    const pos = {};
    Object.entries(T).forEach(([t, [x, y]]) => {
      const fs = DB.schema[t].campuri;
      const h = 26 + fs.length * hh + 6;
      s += `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="var(--surface)" stroke="var(--line-strong)"/><path d="M${x} ${y + 26}h${w}" stroke="var(--line-strong)"/><path d="M${x + 6} ${y}h${w - 12}a6 6 0 0 1 6 6v20h-${w}v-20a6 6 0 0 1 6-6z" fill="var(--accent)"/><text x="${x + 10}" y="${y + 18}" fill="var(--accent-ink)" font-family="var(--f-body)" font-weight="700" font-size="13">${t}</text>`;
      fs.forEach((f, i) => {
        const yy = y + 26 + 6 + i * hh + 13;
        pos[t + "." + f.nume] = [x, y + 26 + 6 + i * hh + 9];
        s += `<text x="${x + 24}" y="${yy}" fill="var(--ink)" font-family="var(--f-body)" font-size="12.5" ${f.cheie ? 'font-weight="700"' : ""}>${f.nume}</text>`;
        if (f.cheie) s += `<g transform="translate(${x + 8} ${yy - 9})"><circle cx="3.5" cy="4" r="3" fill="none" stroke="var(--warn)" stroke-width="1.5"/><path d="M6 5.5l5 5M9 8.5l1.5-1.5" stroke="var(--warn)" stroke-width="1.5"/></g>`;
      });
      s += `</g>`;
    });
    // linii de relație
    const line = (a, b, flip) => {
      const [x1, y1] = pos[a], [x2, y2] = pos[b];
      const sx = flip ? x1 : x1 + w, ex = flip ? x2 + w : x2;
      const mx = (sx + ex) / 2;
      return `<path d="M${sx} ${y1}H${mx}V${y2}H${ex}" fill="none" stroke="var(--ink)" stroke-width="1.6"/>` +
        `<text x="${flip ? sx - 14 : sx + 6}" y="${y1 - 5}" font-size="13" font-weight="700" fill="var(--accent-text)" font-family="var(--f-mono)">1</text>` +
        `<text x="${flip ? ex + 4 : ex - 16}" y="${y2 - 5}" font-size="15" font-weight="700" fill="var(--accent-text)" font-family="var(--f-mono)">∞</text>`;
    };
    s += line("Elevi.IdElev", "Imprumuturi.IdElev", false);
    s += line("Carti.IdCarte", "Imprumuturi.IdCarte", true);
    return s + `</svg>`;
  }

  function designHTML(t) {
    const f = DB.schema[t].campuri;
    return `<div class="tblwrap"><table class="tbl" style="width:100%;border-collapse:collapse;font-size:.9rem"><thead><tr><th style="width:30px"></th><th>Nume câmp</th><th>Tip de date</th><th>Descriere / proprietăți</th></tr></thead><tbody>${f.map(c => `<tr><td style="text-align:center;color:var(--warn)">${c.cheie ? "🔑" : ""}</td><td><b>${c.nume}</b></td><td>${c.tip}${c.dim ? ` <span class="en">(${typeof c.dim === "number" ? "Dimensiune " + c.dim : c.dim})</span>` : ""}</td><td style="color:var(--muted)">${esc(c.desc || "")}</td></tr>`).join("")}</tbody></table></div>`;
  }

  // Completează elementele speciale din teorie (tabele de date, diagrame, grile demonstrative)
  function hydrate(root) {
    $$("[data-ds]", root).forEach(el => {
      const d = tableData(el.dataset.ds); const lim = +el.dataset.limit || d.rows.length;
      const cols = el.dataset.cols ? el.dataset.cols.split(",") : null;
      let { columns, tips, rows } = d;
      if (cols) { const idx = cols.map(c => columns.indexOf(c)); columns = cols; tips = idx.map(i => d.tips[i]); rows = rows.map(r => idx.map(i => r[i])); }
      el.innerHTML = dsHTML(columns, tips, rows.slice(0, lim), { footExtra: lim < d.rows.length ? `<span>se afișează primele ${lim}</span>` : "" });
    });
    $$("[data-diagram]", root).forEach(el => { el.innerHTML = relDiagram(true); });
    $$("[data-design]", root).forEach(el => { el.innerHTML = designHTML(el.dataset.design); });
    $$("[data-qbe]", root).forEach(el => { new Qbe(el, { spec: JSON.parse(el.dataset.qbe), autorun: true }); });
  }

  /* =========================================================
     Grila de proiectare a interogărilor (QBE)
     ========================================================= */
  const SORTS = ["", "Ascendent", "Descendent"];
  const TOTALS = ["Grupare după", "Sumă", "Medie", "Min", "Max", "Numărare", "Unde", "Expresie"];
  class Qbe {
    constructor(el, opts) {
      this.el = el; this.opts = opts || {};
      this.setSpec(this.opts.spec || { tables: [] });
      this.params = {}; this.result = null; this.error = null; this.needParams = null; this.showSQL = false;
      this.id = "q" + Math.random().toString(36).slice(2, 8);
      this.render();
      if (this.opts.autorun) this.run();
    }
    setSpec(spec) {
      const s = JSON.parse(JSON.stringify(spec));
      this.spec = Object.assign({ type: "select", tables: [], cols: [], totals: false, top: "" }, s);
      this.spec.cols = this.spec.cols.map(c => Object.assign({ field: "", sort: "", show: true, crit: "", or: ["", ""], total: "Grupare după", update: "" }, c, { or: (c.or || ["", ""]).concat(["", ""]).slice(0, 2) }));
    }
    fields() { const out = []; this.spec.tables.forEach(t => DB.schema[t].campuri.forEach(c => out.push(c.nume))); return out; }
    padCols() { const n = Math.max(this.opts.minCols || 5, this.spec.cols.filter(c => c.field).length + 1); while (this.spec.cols.length < n) this.spec.cols.push({ field: "", sort: "", show: true, crit: "", or: ["", ""], total: "Grupare după", update: "" }); }
    tableOf(field) {
      const f = field.trim().replace(/^\[|\]$/g, "");
      if (!f) return "";
      if (f.includes(":") || f.includes("(")) return "";
      if (f.includes(".")) return f.split(".")[0].replace(/[\[\]]/g, "");
      const t = this.spec.tables.find(t => DB.schema[t].campuri.some(c => c.nume.toLowerCase() === f.toLowerCase()));
      return t || "";
    }
    render() {
      this.padCols();
      const sp = this.spec, ro = this.opts.locked;
      const allT = Object.keys(DB.schema);
      const avail = allT.filter(t => !sp.tables.includes(t));
      let h = `<div class="qbe">`;
      h += `<div class="qbe-bar">
        <button class="btn sm run" data-q="run" title="Rulează interogarea"><b>!</b> Rulare</button>
        <span class="sep"></span>
        <label>Tip <select data-q="type" aria-label="Tipul interogării"><option value="select" ${sp.type === "select" ? "selected" : ""}>Selecție</option><option value="update" ${sp.type === "update" ? "selected" : ""}>Actualizare</option><option value="delete" ${sp.type === "delete" ? "selected" : ""}>Ștergere</option></select></label>
        <button class="btn sm ${sp.totals ? "pri" : ""}" data-q="totals" title="Totaluri (Σ)" ${sp.type !== "select" ? "disabled" : ""}>Σ Totaluri</button>
        <label>Top <select data-q="top" ${sp.type !== "select" ? "disabled" : ""}>${["", "1", "3", "5", "10", "25%"].map(v => `<option value="${v}" ${String(sp.top) === v ? "selected" : ""}>${v || "Toate"}</option>`).join("")}</select></label>
        <span class="sep"></span>
        <button class="btn sm ${this.showSQL ? "pri" : ""}" data-q="sql">SQL</button>
        <button class="btn sm ghost" data-q="clear">Golește grila</button>
      </div>`;
      h += `<div class="qbe-tables">`;
      sp.tables.forEach(t => {
        h += `<div class="flist"><div class="t"><span>${t}</span><button data-q="rmt" data-t="${t}" aria-label="Elimină tabelul ${t}">×</button></div><ul><li><button data-q="addf" data-f="${t}.*">*</button></li>${DB.schema[t].campuri.map(c => `<li><button data-q="addf" data-f="${c.nume}" data-tt="${t}"><span class="key">${c.cheie ? "⚷" : ""}</span>${c.nume}</button></li>`).join("")}</ul></div>`;
      });
      if (avail.length) h += `<div class="add-tbl"><span>Afișare tabel:</span><div class="row-gap">${avail.map(t => `<button class="btn sm" data-q="addt" data-t="${t}">+ ${t}</button>`).join("")}</div></div>`;
      if (sp.tables.length > 1) {
        const rels = DB.relatii.filter(r => sp.tables.includes(r.de) && sp.tables.includes(r.la));
        h += `<div class="qbe-joins">Asocieri automate (din fereastra Relații): ${rels.length ? rels.map(r => `${r.de}.${r.campDe} = ${r.la}.${r.campLa}`).join("; ") : "niciuna"}</div>`;
      }
      if (!sp.tables.length) h += `<div class="hint">Începe prin a adăuga un tabel, apoi apasă pe câmpuri ca să le pui în grilă.</div>`;
      h += `</div>`;
      // grila
      const dl = this.id + "-dl";
      h += `<datalist id="${dl}">${sp.tables.flatMap(t => [t + ".*", ...DB.schema[t].campuri.map(c => c.nume)]).map(f => `<option value="${f}">`).join("")}</datalist>`;
      h += `<div class="qgrid-wrap"><table class="qgrid"><tbody>`;
      h += `<tr><th></th>${sp.cols.map((c, i) => `<td class="colh"><button data-q="rmc" data-i="${i}" aria-label="Șterge coloana ${i + 1}" title="Șterge coloana">✕</button></td>`).join("")}</tr>`;
      const row = (label, cell) => `<tr><th scope="row">${label}</th>${sp.cols.map((c, i) => cell(c, i)).join("")}</tr>`;
      h += row("Câmp:", (c, i) => `<td><input type="text" list="${dl}" data-i="${i}" data-k="field" value="${esc(c.field)}" aria-label="Câmp coloana ${i + 1}" spellcheck="false"></td>`);
      h += row("Tabel:", (c) => `<td class="ro">${esc(this.tableOf(c.field))}</td>`);
      if (sp.totals && sp.type === "select") h += row("Total:", (c, i) => `<td><select data-i="${i}" data-k="total" aria-label="Total coloana ${i + 1}">${TOTALS.map(t => `<option ${c.total === t ? "selected" : ""}>${t}</option>`).join("")}</select></td>`);
      if (sp.type === "update") h += row("Actualizare la:", (c, i) => `<td><input type="text" data-i="${i}" data-k="update" value="${esc(c.update)}" aria-label="Actualizare la, coloana ${i + 1}" spellcheck="false"></td>`);
      if (sp.type === "select") {
        h += row("Sortare:", (c, i) => `<td><select data-i="${i}" data-k="sort" aria-label="Sortare coloana ${i + 1}">${SORTS.map(s => `<option value="${s}" ${c.sort === s ? "selected" : ""}>${s || "(nesortat)"}</option>`).join("")}</select></td>`);
        h += row("Afișare:", (c, i) => `<td class="cb"><input type="checkbox" data-i="${i}" data-k="show" ${c.show ? "checked" : ""} aria-label="Afișare coloana ${i + 1}"></td>`);
      }
      h += row("Criterii:", (c, i) => `<td><input type="text" data-i="${i}" data-k="crit" value="${esc(c.crit)}" aria-label="Criterii coloana ${i + 1}" spellcheck="false"></td>`);
      h += row("Sau:", (c, i) => `<td><input type="text" data-i="${i}" data-k="or0" value="${esc(c.or[0])}" aria-label="Sau coloana ${i + 1}" spellcheck="false"></td>`);
      h += row("", (c, i) => `<td><input type="text" data-i="${i}" data-k="or1" value="${esc(c.or[1])}" aria-label="Sau (al doilea rând) coloana ${i + 1}" spellcheck="false"></td>`);
      h += `</tbody></table></div>`;
      h += `<div class="q-params"></div><div class="q-out"></div></div>`;
      this.el.innerHTML = h;
      this.bind();
      this.renderOut();
    }
    bind() {
      const el = this.el;
      $$("[data-q]", el).forEach(b => {
        const ev = b.tagName === "SELECT" ? "change" : "click";
        b.addEventListener(ev, () => this.action(b.dataset.q, b));
      });
      $$("[data-k]", el).forEach(inp => {
        const k = inp.dataset.k, i = +inp.dataset.i;
        const upd = () => {
          const c = this.spec.cols[i];
          if (k === "show") c.show = inp.checked;
          else if (k === "or0") c.or[0] = inp.value; else if (k === "or1") c.or[1] = inp.value;
          else c[k] = inp.value;
          if (k === "field") { const td = inp.closest("tr").nextElementSibling.children[i + 1]; if (td) td.textContent = this.tableOf(inp.value); }
        };
        inp.addEventListener(inp.type === "checkbox" || inp.tagName === "SELECT" ? "change" : "input", upd);
        if (inp.tagName === "INPUT" && inp.type === "text") inp.addEventListener("keydown", e => { if (e.key === "Enter") { upd(); this.run(); } });
        if (k === "field") inp.addEventListener("change", () => { if (this.spec.cols.filter(c => c.field).length >= this.spec.cols.length) this.render(); });
      });
    }
    action(a, b) {
      const sp = this.spec;
      if (a === "run") return this.run();
      if (a === "type") { sp.type = b.value; if (sp.type !== "select") { sp.totals = false; sp.top = ""; } this.result = null; this.render(); }
      if (a === "totals") { sp.totals = !sp.totals; this.render(); }
      if (a === "top") { sp.top = b.value; }
      if (a === "sql") { this.showSQL = !this.showSQL; this.render(); }
      if (a === "clear") { sp.cols = []; this.result = null; this.error = null; this.render(); }
      if (a === "addt") { sp.tables.push(b.dataset.t); this.render(); }
      if (a === "rmt") { sp.tables = sp.tables.filter(t => t !== b.dataset.t); this.render(); }
      if (a === "rmc") { sp.cols.splice(+b.dataset.i, 1); this.render(); }
      if (a === "addf") {
        let f = b.dataset.f;
        // dacă numele există în mai multe tabele, folosim Tabel.Câmp
        if (!f.endsWith("*") && sp.tables.filter(t => DB.schema[t].campuri.some(c => c.nume === f)).length > 1) f = b.dataset.tt + "." + f;
        let c = sp.cols.find(x => !x.field.trim());
        if (!c) { sp.cols.push({ field: "", sort: "", show: true, crit: "", or: ["", ""], total: "Grupare după", update: "" }); c = sp.cols[sp.cols.length - 1]; }
        c.field = f; this.render();
      }
    }
    clean() {
      const sp = JSON.parse(JSON.stringify(this.spec));
      sp.cols = sp.cols.filter(c => c.field.trim());
      return sp;
    }
    run(silent) {
      this.error = null; this.result = null; this.needParams = null;
      try {
        this.result = Engine.run(this.clean(), this.params);
      } catch (e) {
        if (e instanceof Engine.ParamNeeded) { this.needParams = e.all || [e.param]; }
        else this.error = e instanceof Engine.AccessError ? e.message : ("Eroare: " + e.message);
      }
      this.renderOut();
      if (this.opts.onRun && !silent) this.opts.onRun(this);
    }
    renderOut() {
      const pbox = $(".q-params", this.el), out = $(".q-out", this.el);
      pbox.innerHTML = ""; out.innerHTML = "";
      if (this.needParams) {
        pbox.className = "q-params qbe-params";
        pbox.innerHTML = `<b>Introducere valoare parametru</b>${this.needParams.map((p, i) => `<div class="pbox"><label for="${this.id}p${i}">${esc(p)}</label><input type="text" id="${this.id}p${i}" data-p="${esc(p)}"></div>`).join("")}<div class="row-gap"><button class="btn sm pri" data-pp="ok">OK</button><button class="btn sm ghost" data-pp="cancel">Revocare</button></div>`;
        const first = $("input", pbox); if (first) first.focus();
        const ok = () => {
          $$("input[data-p]", pbox).forEach(inp => {
            const v = inp.value.trim(); let val = v;
            if (/^-?\d+([.,]\d+)?$/.test(v)) val = parseFloat(v.replace(",", "."));
            else if (/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(v)) val = Engine.parseDate(v);
            this.params[inp.dataset.p] = val;
          });
          this.run();
          this.params = {}; // Access cere din nou valorile la fiecare rulare
        };
        $("[data-pp=ok]", pbox).addEventListener("click", ok);
        $$("input", pbox).forEach(i => i.addEventListener("keydown", e => { if (e.key === "Enter") ok(); }));
        $("[data-pp=cancel]", pbox).addEventListener("click", () => { this.needParams = null; this.renderOut(); });
        return;
      }
      pbox.className = "q-params";
      if (this.error) { out.className = "q-out qbe-out"; out.innerHTML = `<div class="err"><b>Access afișează o eroare:</b> ${esc(this.error)}</div>`; return; }
      const r = this.result;
      if (!r) { out.className = "q-out"; if (this.showSQL) { out.className = "q-out qbe-out"; out.innerHTML = `<div class="hint">Rulează interogarea ca să vezi instrucțiunea SQL.</div>`; } return; }
      out.className = "q-out qbe-out";
      let h = "";
      r.warnings.forEach(w => h += `<div class="warnmsg">${esc(w)}</div>`);
      if (r.action === "select") {
        h += `<div class="ttl"><span class="eyebrow">Rezultat · Vizualizare foaie de date</span><span class="hint">${r.rows.length} înregistrări</span></div>` + dsHTML(r.columns, r.tips, r.rows);
      } else if (r.action === "delete") {
        h += `<div class="warnmsg">Access: „Sunteți pe cale să ștergeți ${r.count} rând(uri) din tabelul specificat. Odată ce faceți clic pe Da, nu mai puteți anula comanda.” În simulator datele originale nu se modifică.</div>`;
        h += `<div class="ttl"><span class="eyebrow">Înregistrările care ar fi șterse din ${r.table}</span><span class="hint">${r.count} din ${r.total}</span></div>` + dsHTML(r.columns, r.tips, r.rows, { rowClass: () => "del" });
      } else if (r.action === "update") {
        h += `<div class="warnmsg">Access: „Sunteți pe cale să actualizați ${r.count} rând(uri).” În simulator vezi efectul fără să modifici datele originale.</div>`;
        const cols = [r.key, ...r.upFields.flatMap(f => [f + " (înainte)", f + " (după)"])];
        const tips = [null, ...r.tips.flatMap(t => [t, t])];
        const rows = r.changes.map(c => [c.orig[r.key], ...r.upFields.flatMap(f => [c.orig[f], c.after[f]])]);
        h += `<div class="ttl"><span class="eyebrow">Înregistrări actualizate în ${r.table}</span><span class="hint">${r.count} din ${r.total}</span></div>` + dsHTML(cols, tips, rows, { cellClass: (ri, ci) => ci > 0 && ci % 2 === 0 ? "chg" : "" });
      }
      if (this.showSQL) h += `<div><div class="eyebrow" style="margin-bottom:6px">Vizualizare SQL</div><pre class="sql">${esc(r.sql)}</pre></div>`;
      out.innerHTML = h;
    }
    load(spec) { this.setSpec(spec); this.result = null; this.error = null; this.needParams = null; this.params = {}; this.render(); }
  }

  /* =========================================================
     Foaie de date interactivă (sortare și filtrare)
     ========================================================= */
  class Sheet {
    constructor(el, opts) {
      this.el = el; this.opts = opts; this.table = opts.table;
      const d = tableData(this.table);
      this.cols = opts.cols || d.columns;
      this.idx = this.cols.map(c => d.columns.indexOf(c));
      this.tips = this.idx.map(i => d.tips[i]);
      this.all = DB.tables[this.table];
      this.state = { sort: null, filters: [], selCol: null, selCell: null };
      this.render();
    }
    visible() {
      let rows = this.all.slice();
      this.state.filters.forEach(f => {
        const ast = Engine.parse(f.crit, { fields: [], implicit: true });
        rows = rows.filter(r => { const v = r[f.f]; const x = Engine.evaluate(ast, { row: r, value: v, params: {} }); return x !== null && x !== false && x !== 0; });
      });
      if (this.state.sort) {
        const { f, dir } = this.state.sort;
        rows.sort((a, b) => { const va = a[f], vb = b[f]; let c = va === null ? (vb === null ? 0 : -1) : vb === null ? 1 : Engine.compare(va, vb) || 0; return dir === "asc" ? c : -c; });
      }
      return rows;
    }
    render() {
      const st = this.state; let rows;
      let err = "";
      try { rows = this.visible(); } catch (e) { err = e.message; st.filters.pop(); rows = this.visible(); }
      const selName = st.selCol !== null ? this.cols[st.selCol] : null;
      const tools = `<div class="ds-tools">
        <button class="btn sm" data-s="asc" ${selName ? "" : "disabled"} title="Sortare ascendentă">A→Z Ascendent</button>
        <button class="btn sm" data-s="desc" ${selName ? "" : "disabled"} title="Sortare descendentă">Z→A Descendent</button>
        <button class="btn sm ghost" data-s="nosort" ${st.sort ? "" : "disabled"}>Elimină sortarea</button>
        <span class="sep"></span>
        <button class="btn sm" data-s="bysel" ${st.selCell ? "" : "disabled"} title="Filtru după selecție: Egal cu valoarea celulei">Filtru după selecție</button>
        <input type="text" data-s="crit" placeholder="${selName ? "criteriu pentru " + selName + ", ex.: >9" : "alege o coloană"}" ${selName ? "" : "disabled"} style="width:210px;font-family:var(--f-mono);font-size:.85rem" aria-label="Criteriu de filtrare">
        <button class="btn sm" data-s="apply" ${selName ? "" : "disabled"}>Aplică filtrul</button>
        <button class="btn sm ghost" data-s="nofilter" ${st.filters.length ? "" : "disabled"}>Elimină filtrele</button>
      </div>`;
      const sortI = st.sort ? this.cols.indexOf(st.sort.f) : -1;
      const flt = st.filters.map(f => `${f.f}: ${f.crit}`).join(" și ");
      this.el.innerHTML = (err ? `<div class="err" style="margin-bottom:8px">${esc(err)}</div>` : "") + dsHTML(this.cols, this.tips, rows.map(r => this.cols.map(c => r[c])), {
        tools, sortable: true, selCol: st.selCol, selCell: st.selCell, filtered: st.filters.length > 0, sort: sortI >= 0 ? { i: sortI, dir: st.sort.dir } : null,
        footExtra: (flt ? `<span class="mono">${esc(flt)}</span>` : "") + `<span>Clic pe antet = selectezi coloana · clic pe celulă = selectezi valoarea</span>`
      });
      this.rowsShown = rows;
      $$("th[data-ci]", this.el).forEach(th => th.addEventListener("click", () => { st.selCol = +th.dataset.ci; st.selCell = null; this.render(); }));
      $$("td[data-c]", this.el).forEach(td => td.addEventListener("click", () => { st.selCell = { r: +td.dataset.r, c: +td.dataset.c }; st.selCol = +td.dataset.c; this.render(); }));
      $$("[data-s]", this.el).forEach(b => {
        if (b.tagName === "INPUT") { b.addEventListener("keydown", e => { if (e.key === "Enter") this.act("apply"); }); return; }
        b.addEventListener("click", () => this.act(b.dataset.s));
      });
      if (this.opts.onChange) this.opts.onChange(this);
    }
    act(a) {
      const st = this.state; const col = st.selCol !== null ? this.cols[st.selCol] : null;
      if (a === "asc" || a === "desc") st.sort = { f: col, dir: a };
      if (a === "nosort") st.sort = null;
      if (a === "nofilter") st.filters = [];
      if (a === "bysel" && st.selCell) {
        const v = this.rowsShown[st.selCell.r][this.cols[st.selCell.c]];
        let crit;
        if (v === null) crit = "Is Null";
        else if (typeof v === "boolean") crit = v ? "Yes" : "No";
        else if (v instanceof Date) crit = "#" + Engine.fmt(v) + "#";
        else if (typeof v === "number") crit = String(v);
        else crit = '"' + v + '"';
        st.filters.push({ f: this.cols[st.selCell.c], crit }); st.selCell = null;
      }
      if (a === "apply") { const v = $("[data-s=crit]", this.el).value.trim(); if (v) st.filters.push({ f: col, crit: v }); }
      this.render();
    }
  }

  /* =========================================================
     Exerciții
     ========================================================= */
  function markDone(ex, card) {
    if (!store.ex[ex.id]) { store.ex[ex.id] = true; save(); renderSide((location.hash || "").slice(1)); }
    card.classList.add("done");
    const h = $(".ex-h", card); if (h && !$(".badge-ok", h)) h.insertAdjacentHTML("beforeend", `<span class="badge-ok">Rezolvat</span>`);
  }
  function fb(card, ok, msg) {
    let f = $(".fb", card); if (!f) { f = document.createElement("div"); f.className = "fb"; $(".ex-actions", card).before(f); }
    f.className = "fb " + (ok === null ? "info" : ok ? "ok" : "no"); f.innerHTML = msg; f.setAttribute("role", "status");
  }
  const KIND = { quiz: "Alegere", select: "Asociere", fill: "Completare", order: "Ordonare", qbe: "Interogare în simulator", datasheet: "Foaie de date", rule: "Regulă de validare", designer: "Proiectare tabel", formsim: "Formular", reportsim: "Raport" };

  function renderExercise(ex, n) {
    const card = document.createElement("section");
    card.className = "ex" + (store.ex[ex.id] ? " done" : "");
    card.innerHTML = `<div class="ex-h"><div><div class="k">Exercițiul ${n} · ${KIND[ex.tip]}</div><h4>${ex.enunt}</h4></div>${store.ex[ex.id] ? `<span class="badge-ok">Rezolvat</span>` : ""}</div><div class="ex-body"></div><div class="ex-actions row-gap"></div>`;
    const body = $(".ex-body", card), act = $(".ex-actions", card);
    const addBtn = (label, cls, fn) => { const b = document.createElement("button"); b.className = "btn " + (cls || ""); b.textContent = label; b.addEventListener("click", fn); act.appendChild(b); return b; };
    let tries = 0;
    const solBox = (html) => { if ($("details.sol", card)) return; card.insertAdjacentHTML("beforeend", `<details class="sol"><summary>Arată rezolvarea</summary><div style="margin-top:8px" class="prose">${html}</div></details>`); };

    if (ex.tip === "quiz") {
      const multi = Array.isArray(ex.ans);
      body.innerHTML = `<div class="opts">${ex.opts.map((o, i) => `<label class="opt"><input type="${multi ? "checkbox" : "radio"}" name="${ex.id}" value="${i}"><span>${o}</span></label>`).join("")}</div>${multi ? `<div class="hint">Pot fi mai multe răspunsuri corecte.</div>` : ""}`;
      addBtn("Verifică", "pri", () => {
        const sel = $$("input", body).filter(i => i.checked).map(i => +i.value);
        const good = multi ? ex.ans.slice().sort().join() === sel.sort().join() : sel[0] === ex.ans;
        $$(".opt", body).forEach((o, i) => { o.classList.remove("right", "wrong"); const isAns = multi ? ex.ans.includes(i) : ex.ans === i; const chosen = sel.includes(i); if (good && isAns) o.classList.add("right"); else if (chosen && !isAns) o.classList.add("wrong"); });
        if (!sel.length) return fb(card, null, "Alege un răspuns.");
        fb(card, good, good ? `<b>Corect.</b> ${ex.expl || ""}` : `<b>Nu încă.</b> Mai încearcă.${++tries >= 2 && ex.expl ? " Indiciu: " + ex.expl : ""}`);
        if (good) markDone(ex, card);
      });
    }

    if (ex.tip === "select") {
      const items = ex.shuffle === false ? ex.items : shuffle(ex.items);
      body.innerHTML = `<div class="sel-list">${items.map((it, i) => `<div class="sel-item" data-ans="${esc(it.ans)}"><span>${it.text}</span><select aria-label="Alege pentru elementul ${i + 1}"><option value="">— alege —</option>${ex.options.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>`).join("")}</div>`;
      addBtn("Verifică", "pri", () => {
        let ok = 0; const rows = $$(".sel-item", body);
        rows.forEach(r => { const v = $("select", r).value; const good = v === r.dataset.ans; r.classList.toggle("right", good); r.classList.toggle("wrong", !good && v !== ""); if (good) ok++; });
        const all = ok === rows.length;
        fb(card, all, all ? `<b>Excelent!</b> Toate cele ${ok} asocieri sunt corecte. ${ex.expl || ""}` : `<b>${ok} din ${rows.length}</b> asocieri corecte. Cele marcate cu roșu trebuie schimbate.`);
        if (all) markDone(ex, card); else if (++tries >= 2) solBox(`<ul>${ex.items.map(it => `<li>${it.text} → <b>${esc(it.ans)}</b></li>`).join("")}</ul>`);
      });
    }

    if (ex.tip === "fill") {
      body.innerHTML = ex.items.map((it, i) => `<p class="fill-line">${it.text.replace("___", `<input type="text" data-i="${i}" aria-label="Completează spațiul ${i + 1}" autocomplete="off" spellcheck="false">`)}</p>`).join("");
      addBtn("Verifică", "pri", () => {
        let ok = 0;
        $$("input", body).forEach(inp => { const it = ex.items[+inp.dataset.i]; const good = it.ans.some(a => norm(a) === norm(inp.value)); inp.classList.toggle("right", good); inp.classList.toggle("wrong", !good); if (good) ok++; });
        const all = ok === ex.items.length;
        fb(card, all, all ? `<b>Corect!</b> ${ex.expl || ""}` : `<b>${ok} din ${ex.items.length}</b> completări corecte.`);
        if (all) markDone(ex, card); else if (++tries >= 2) solBox(`<ul>${ex.items.map(it => `<li>${it.text.replace("___", `<b>${esc(it.ans[0])}</b>`)}</li>`).join("")}</ul>`);
      });
    }

    if (ex.tip === "order") {
      let cur = shuffle(ex.steps.map((s, i) => ({ s, i })));
      if (cur.every((x, i) => x.i === i)) cur.reverse();
      const draw = (mark) => {
        body.innerHTML = `<ol class="ord">${cur.map((x, k) => `<li class="${mark ? (x.i === k ? "right" : "wrong") : ""}"><span>${x.s}</span><span class="mv"><button data-u="${k}" aria-label="Mută mai sus" ${k === 0 ? "disabled" : ""}>↑</button><button data-d="${k}" aria-label="Mută mai jos" ${k === cur.length - 1 ? "disabled" : ""}>↓</button></span></li>`).join("")}</ol>`;
        $$("[data-u]", body).forEach(b => b.addEventListener("click", () => { const k = +b.dataset.u; [cur[k - 1], cur[k]] = [cur[k], cur[k - 1]]; draw(); }));
        $$("[data-d]", body).forEach(b => b.addEventListener("click", () => { const k = +b.dataset.d; [cur[k + 1], cur[k]] = [cur[k], cur[k + 1]]; draw(); }));
      };
      draw();
      addBtn("Verifică ordinea", "pri", () => {
        const good = cur.every((x, k) => x.i === k); draw(true);
        const ok = cur.filter((x, k) => x.i === k).length;
        fb(card, good, good ? `<b>Ordinea este corectă.</b> ${ex.expl || ""}` : `<b>${ok} din ${cur.length}</b> pași sunt la locul lor.`);
        if (good) markDone(ex, card);
      });
    }

    if (ex.tip === "qbe") {
      const host = document.createElement("div"); body.appendChild(host);
      if (ex.hint) body.insertAdjacentHTML("beforeend", `<p class="hint" style="margin-top:8px">Indiciu: ${ex.hint}</p>`);
      const q = new Qbe(host, { spec: ex.start || { tables: [] }, minCols: 5 });
      const paramVals = (spec) => {
        // rulează cu valoarea de test pentru orice parametru folosit
        const p = {};
        for (let k = 0; k < 4; k++) {
          try { return Engine.run(spec, p); } catch (e) { if (e instanceof Engine.ParamNeeded) (e.all || [e.param]).forEach(n => p[n] = ex.paramValue); else throw e; }
        }
      };
      addBtn("Verifică interogarea", "pri", () => {
        let mine, sol;
        try { mine = paramVals(q.clean()); } catch (e) { return fb(card, false, `<b>Interogarea are o eroare:</b> ${esc(e.message)}`); }
        sol = paramVals(ex.sol);
        if (ex.needParam) { const s = JSON.stringify(q.clean().cols); if (!/\[[^\]]+\]/.test(s.replace(/\[(Elevi|Carti|Imprumuturi|IdElev|IdCarte|IdImprumut|Nume|Prenume|Clasa|Gen|DataNasterii|Localitate|Telefon|Media|Bursier|Titlu|Autor|AnAparitie|Pret|Exemplare|DataImprumut|DataRestituire|Restituit)\]/gi, ""))) return fb(card, false, "<b>Lipsește parametrul.</b> Scrie în rândul Criterii un text între paranteze drepte, de exemplu <code>[Introduceți clasa:]</code>."); }
        if ((ex.sol.type || "select") !== (q.spec.type || "select")) return fb(card, false, `<b>Tipul interogării nu este cel cerut.</b> Alege din bara de sus tipul potrivit.`);
        let r;
        if (mine.action === "select") r = Engine.sameResult(mine, sol, !!ex.ordered);
        else if (mine.action === "delete") r = mine.count === sol.count && mine.rows.map(x => x[0]).join() === sol.rows.map(x => x[0]).join() ? { ok: true } : { ok: false, msg: `Interogarea ar șterge ${mine.count} înregistrări; ar trebui ${sol.count}.` };
        else if (mine.action === "update") {
          const sig = (u) => u.changes.map(c => c.orig[u.key] + ":" + u.upFields.map(f => Engine.show(c.after[f])).join("/")).join("|");
          r = mine.count !== sol.count ? { ok: false, msg: `Sunt actualizate ${mine.count} înregistrări; ar trebui ${sol.count}.` } : sig(mine) === sig(sol) && mine.upFields.join() === sol.upFields.join() ? { ok: true } : { ok: false, msg: "Înregistrările alese sunt corecte, dar valorile noi nu. Verifică rândul „Actualizare la”." };
        }
        q.run(true);
        fb(card, r.ok, r.ok ? `<b>Interogarea este corectă!</b> ${ex.expl || ""}` : `<b>Încă nu.</b> ${esc(r.msg)}`);
        if (r.ok) markDone(ex, card); else if (++tries >= 2) solBox(`<p>Instrucțiunea SQL a soluției:</p><pre class="sql">${esc(sol.sql)}</pre><p><button class="btn sm" data-load>Încarcă soluția în grilă</button></p>`);
        const lb = $("[data-load]", card); if (lb && !lb.dataset.b) { lb.dataset.b = 1; lb.addEventListener("click", () => { q.load(ex.sol); q.run(); }); }
      });
    }

    if (ex.tip === "datasheet") {
      const host = document.createElement("div"); body.appendChild(host);
      const sh = new Sheet(host, { table: ex.table, cols: ex.cols });
      const pk = DB.schema[ex.table].campuri[0].nume;
      addBtn("Verifică foaia de date", "pri", () => {
        const cols = [{ field: pk }];
        Object.entries(ex.expect.crit || {}).forEach(([f, c]) => cols.push({ field: f, crit: c }));
        if (ex.expect.sort) { const ex2 = cols.find(c => c.field === ex.expect.sort.f); const s = ex.expect.sort.dir === "asc" ? "Ascendent" : "Descendent"; if (ex2) ex2.sort = s; else cols.push({ field: ex.expect.sort.f, sort: s }); }
        const exp = Engine.run({ tables: [ex.table], cols }).rows.map(r => r[0]);
        const got = sh.rowsShown.map(r => r[pk]);
        const sameSet = exp.slice().sort().join() === got.slice().sort().join();
        let ok = sameSet && (!ex.expect.sort || exp.join() === got.join());
        let msg = ok ? `<b>Corect!</b> ${ex.expl || ""}` : !sameSet ? `<b>Înregistrările afișate nu corespund.</b> Sunt afișate ${got.length}; ar trebui ${exp.length}. Verifică filtrele.` : "<b>Filtrul este bun, dar sortarea nu.</b>";
        fb(card, ok, msg); if (ok) markDone(ex, card);
      });
    }

    if (ex.tip === "rule") {
      body.innerHTML = `<div class="row-gap"><label class="mono" for="${ex.id}-r">Regulă de validare pentru <b>${ex.field}</b> (${ex.tipDate}):</label><input type="text" id="${ex.id}-r" style="flex:1;min-width:220px;font-family:var(--f-mono)" spellcheck="false" placeholder="ex.: >=0"></div><div class="rule-tests" style="margin-top:10px">${ex.tests.map((t, i) => `<div class="rt" data-i="${i}"><span class="v">${esc(t.v === "" ? "(gol)" : t.v)}</span><small>trebuie ${t.ok ? "acceptată" : "respinsă"}</small><small class="res">—</small></div>`).join("")}</div>`;
      const inp = $("input", body);
      const test = () => {
        const rule = inp.value.trim(); if (!rule) return fb(card, null, "Scrie o regulă de validare.");
        let ok = 0;
        try {
          ex.tests.forEach((t, i) => {
            const r = Engine.testRule(rule, t.v, ex.tipDate);
            const box = $(`.rt[data-i="${i}"]`, body); const good = r.ok === t.ok;
            box.classList.toggle("right", good); box.classList.toggle("wrong", !good);
            $(".res", box).textContent = r.ok ? "Access acceptă" : "Access respinge"; if (good) ok++;
          });
        } catch (e) { return fb(card, false, `<b>Regula nu este scrisă corect:</b> ${esc(e.message)}`); }
        const all = ok === ex.tests.length;
        fb(card, all, all ? `<b>Regula funcționează pentru toate valorile.</b> ${ex.expl || ""}` : `<b>${ok} din ${ex.tests.length}</b> valori sunt tratate corect.`);
        if (all) markDone(ex, card); else if (++tries >= 3) solBox(`<p>O regulă posibilă: <code>${esc(ex.sol)}</code></p>`);
      };
      inp.addEventListener("keydown", e => { if (e.key === "Enter") test(); });
      addBtn("Testează regula", "pri", test);
    }

    if (ex.tip === "designer") {
      body.innerHTML = `<div class="tblwrap"><table class="design"><thead><tr><th>Cheie</th><th>Nume câmp</th><th>Tip de date</th><th>Ce va conține</th></tr></thead><tbody>${ex.fields.map((f, i) => `<tr data-i="${i}"><td class="k"><input type="radio" name="${ex.id}-pk" value="${i}" aria-label="Cheie primară ${f.name}"></td><td><b class="mono">${f.name}</b></td><td><select aria-label="Tip de date pentru ${f.name}"><option value="">— alege —</option>${TYPES.map(t => `<option>${t}</option>`).join("")}</select></td><td style="color:var(--muted);font-size:.88rem">${f.desc}</td></tr>`).join("")}</tbody></table></div><p class="hint" style="margin-top:6px">Alege tipul fiecărui câmp și marchează câmpul care devine cheie primară.</p>`;
      addBtn("Verifică structura", "pri", () => {
        let ok = 0; const pk = $(`input[name="${ex.id}-pk"]:checked`, body);
        $$("tr[data-i]", body).forEach(tr => { const f = ex.fields[+tr.dataset.i]; const v = $("select", tr).value; const good = f.types.includes(v); tr.classList.toggle("right", good); tr.classList.toggle("wrong", !good); if (good) ok++; });
        const pkOk = pk && ex.fields[+pk.value].pk;
        const all = ok === ex.fields.length && pkOk;
        let msg = all ? `<b>Structura este corectă.</b> ${ex.expl || ""}` : `<b>${ok} din ${ex.fields.length}</b> tipuri corecte.${pkOk ? "" : " Cheia primară nu este aleasă corect."}`;
        fb(card, all, msg); if (all) markDone(ex, card);
        else if (++tries >= 2) solBox(`<ul>${ex.fields.map(f => `<li><b>${f.name}</b>: ${f.types.join(" sau ")}${f.pk ? " (cheie primară)" : ""}${f.why ? " — " + f.why : ""}</li>`).join("")}</ul>`);
      });
    }

    if (ex.tip === "formsim") {
      const t = ex.table, rows = DB.tables[t], fs = ex.fields || DB.schema[t].campuri.map(c => c.nume);
      let i = 0;
      body.innerHTML = `<div class="formsim"><div class="fh">${esc(ex.titlu || t)}</div><div class="fd"></div><div class="nav"><span>Înregistrare:</span><button data-n="first" aria-label="Prima înregistrare">|◀</button><button data-n="prev" aria-label="Înregistrarea anterioară">◀</button><input type="text" aria-label="Numărul înregistrării" value="1"><span class="tot"></span><button data-n="next" aria-label="Înregistrarea următoare">▶</button><button data-n="last" aria-label="Ultima înregistrare">▶|</button></div></div><div style="display:grid;gap:8px;margin-top:12px">${ex.questions.map((q, k) => `<label class="sel-item" style="grid-template-columns:1fr minmax(140px,220px)" data-k="${k}"><span>${q.q}</span><input type="text" autocomplete="off"></label>`).join("")}</div>`;
      const draw = () => {
        const r = rows[i];
        $(".fd", body).innerHTML = fs.map(f => { const tip = Engine.tipOf(t + "." + f); return `<label>${f}</label><div class="ctl">${esc(Engine.show(r[f], tip))}</div>`; }).join("");
        $(".nav input", body).value = i + 1; $(".tot", body).textContent = `din ${rows.length}`;
      };
      $$("[data-n]", body).forEach(b => b.addEventListener("click", () => { const n = b.dataset.n; i = n === "first" ? 0 : n === "last" ? rows.length - 1 : n === "prev" ? Math.max(0, i - 1) : Math.min(rows.length - 1, i + 1); draw(); }));
      $(".nav input", body).addEventListener("change", e => { const v = parseInt(e.target.value, 10); if (v >= 1 && v <= rows.length) i = v - 1; draw(); });
      draw();
      addBtn("Verifică răspunsurile", "pri", () => {
        let ok = 0;
        $$("[data-k]", body).forEach(lb => { const q = ex.questions[+lb.dataset.k]; const v = $("input", lb).value; const good = q.ans.some(a => norm(a) === norm(v)); lb.classList.toggle("right", good); lb.classList.toggle("wrong", !good); if (good) ok++; });
        const all = ok === ex.questions.length;
        fb(card, all, all ? `<b>Toate răspunsurile sunt corecte.</b> ${ex.expl || ""}` : `<b>${ok} din ${ex.questions.length}</b> corecte. Navighează prin înregistrări cu butoanele formularului.`);
        if (all) markDone(ex, card);
      });
    }

    if (ex.tip === "reportsim") {
      const t = ex.table;
      const flds = DB.schema[t].campuri.map(c => c.nume);
      const numF = DB.schema[t].campuri.filter(c => ["Număr", "Monedă"].includes(c.tip) && !c.cheie).map(c => c.nume);
      body.innerHTML = `<div class="row-gap" style="margin-bottom:12px">
        <label>Grupare după <select data-r="g"><option value="">(fără grupare)</option>${flds.filter(f => !DB.schema[t].campuri.find(c => c.nume === f).cheie).map(f => `<option>${f}</option>`).join("")}</select></label>
        <label>Sortare în grup <select data-r="s"><option value="">(nesortat)</option>${flds.map(f => `<option>${f}</option>`).join("")}</select></label>
        <label>Rezumat <select data-r="fn"><option value="">(fără)</option><option>Sumă</option><option>Medie</option><option>Min</option><option>Max</option></select></label>
        <label>pentru <select data-r="f">${numF.map(f => `<option>${f}</option>`).join("")}</select></label>
      </div><div class="rep-host" style="overflow-x:auto"></div>`;
      const show = ex.show;
      const draw = () => {
        const g = $("[data-r=g]", body).value, s = $("[data-r=s]", body).value, fn = $("[data-r=fn]", body).value, f = $("[data-r=f]", body).value;
        let rows = DB.tables[t].slice();
        const cmp = (a, b, k) => Engine.compare(a[k], b[k]) || 0;
        rows.sort((a, b) => (g ? cmp(a, b, g) : 0) || (s ? cmp(a, b, s) : 0));
        const agg = (list) => { const v = list.map(r => r[f]).filter(x => x !== null); if (!v.length) return null; if (fn === "Sumă") return v.reduce((a, b) => a + b, 0); if (fn === "Medie") return v.reduce((a, b) => a + b, 0) / v.length; if (fn === "Min") return Math.min(...v); return Math.max(...v); };
        const cols = show.filter(c => c !== g);
        const tip = Engine.tipOf(t + "." + f);
        let h = `<div class="rep"><h4>${esc(ex.titlu)}</h4><div class="rsub">Biblioteca școlii · generat ${Engine.fmt(new Date())}</div><table><thead><tr>${g ? `<th>${g}</th>` : ""}${cols.map(c => `<th>${c}</th>`).join("")}</tr></thead><tbody>`;
        const groups = [];
        rows.forEach(r => { const k = g ? Engine.show(r[g]) : "_"; let gr = groups.find(x => x.k === k); if (!gr) { gr = { k, rows: [] }; groups.push(gr); } gr.rows.push(r); });
        groups.forEach(gr => {
          if (g) h += `<tr class="gh"><td colspan="${cols.length + 1}">${esc(gr.k)}</td></tr>`;
          gr.rows.forEach(r => { h += `<tr>${g ? "<td></td>" : ""}${cols.map(c => `<td>${esc(Engine.show(r[c], Engine.tipOf(t + "." + c)))}</td>`).join("")}</tr>`; });
          if (g && fn) h += `<tr class="gf"><td colspan="${cols.length + 1}">${fn} ${f} pentru ${esc(gr.k)}: ${esc(Engine.show(fn === "Medie" ? Math.round(agg(gr.rows) * 100) / 100 : agg(gr.rows), tip))} (${gr.rows.length} înregistrări)</td></tr>`;
        });
        if (fn) h += `<tr class="tot"><td colspan="${cols.length + 1}">Total general · ${fn} ${f}: ${esc(Engine.show(fn === "Medie" ? Math.round(agg(rows) * 100) / 100 : agg(rows), tip))}</td></tr>`;
        h += `</tbody></table><div class="pf"><span>${Engine.fmt(new Date())}</span><span>Pagina 1 din 1</span></div></div>`;
        $(".rep-host", body).innerHTML = h;
      };
      $$("select", body).forEach(s => s.addEventListener("change", draw)); draw();
      addBtn("Verifică raportul", "pri", () => {
        const v = { g: $("[data-r=g]", body).value, s: $("[data-r=s]", body).value, fn: $("[data-r=fn]", body).value, f: $("[data-r=f]", body).value };
        const w = ex.want; const errs = [];
        if (v.g !== (w.g || "")) errs.push("gruparea"); if (w.s && v.s !== w.s) errs.push("sortarea"); if ((w.fn || "") !== v.fn) errs.push("funcția de rezumat"); if (w.fn && v.f !== w.f) errs.push("câmpul rezumat");
        const ok = !errs.length;
        fb(card, ok, ok ? `<b>Raportul respectă cerința.</b> ${ex.expl || ""}` : `<b>Mai verifică:</b> ${errs.join(", ")}.`);
        if (ok) markDone(ex, card);
      });
    }
    return card;
  }

  /* =========================================================
     Pagini
     ========================================================= */
  // Afișul de introducere de pe pagina Acasă (foaie de caiet, scris de mână)
  function posterIntro() {
    const ol = items => items.map((t, i) => `<li><span class="pn">${i + 1}</span><span>${t}</span></li>`).join("");
    const terms = [
      ["Bază de date", "colecție de date organizate", "y"],
      ["Tabel", "păstrează datele pe rânduri și coloane", "p"],
      ["Câmp", "o singură informație (o coloană)", "g"],
      ["Înregistrare", "setul complet de câmpuri (un rând)", "o"],
      ["Interogare", "caută și filtrează datele", "v"],
      ["Formular", "fereastră pentru introducerea și vizualizarea datelor", "b"],
      ["Raport", "datele aranjate frumos, gata de tipărit", "g"],
      ["Cheie primară", "identifică în mod unic fiecare înregistrare", "p"]
    ];
    const ico = {
      db: `<svg viewBox="0 0 48 52"><ellipse cx="24" cy="9" rx="18" ry="6" fill="#bcd7f3"/><path d="M6 9v34c0 3.3 8 6 18 6s18-2.7 18-6V9" fill="#9cc3ec"/><path d="M6 20c0 3.3 8 6 18 6s18-2.7 18-6M6 31c0 3.3 8 6 18 6s18-2.7 18-6" fill="none" stroke="#1e3a8a" stroke-width="2"/><ellipse cx="24" cy="9" rx="18" ry="6" fill="none" stroke="#1e3a8a" stroke-width="2"/><path d="M6 9v34c0 3.3 8 6 18 6s18-2.7 18-6V9" fill="none" stroke="#1e3a8a" stroke-width="2"/></svg>`,
      tb: `<svg viewBox="0 0 48 52"><rect x="4" y="6" width="40" height="40" rx="2" fill="#fff" stroke="#1e3a8a" stroke-width="2"/><rect x="4" y="6" width="40" height="10" fill="#7fb3e6" stroke="#1e3a8a" stroke-width="2"/><path d="M4 26h40M4 36h40M17 6v40M30 6v40" stroke="#1e3a8a" stroke-width="1.6"/></svg>`,
      fm: `<svg viewBox="0 0 48 52"><rect x="8" y="4" width="34" height="44" rx="2" fill="#fff" stroke="#1e3a8a" stroke-width="2"/><rect x="14" y="11" width="22" height="6" rx="1" fill="none" stroke="#1e3a8a" stroke-width="1.6"/><rect x="14" y="22" width="22" height="6" rx="1" fill="none" stroke="#1e3a8a" stroke-width="1.6"/><rect x="14" y="33" width="22" height="6" rx="1" fill="none" stroke="#1e3a8a" stroke-width="1.6"/></svg>`,
      rp: `<svg viewBox="0 0 48 52"><path d="M8 4h24l10 10v34H8z" fill="#fff" stroke="#1e3a8a" stroke-width="2"/><path d="M32 4v10h10" fill="none" stroke="#1e3a8a" stroke-width="2"/><rect x="14" y="34" width="5" height="9" fill="#f2a63a"/><rect x="22" y="28" width="5" height="15" fill="#7fb3e6"/><rect x="30" y="31" width="5" height="12" fill="#f2a63a"/><path d="M13 27l7-6 6 4 9-9" fill="none" stroke="#b4271f" stroke-width="2"/></svg>`
    };
    return `<section class="poster" aria-labelledby="posterTitle">
      <div class="pp-holes" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="pp-in">
        <div class="pp-top"><span>Liceul Teoretic „Panait Cerna” Brăila</span><span class="pp-date">TIC · clasa a X-a</span></div>
        <h2 class="pp-title" id="posterTitle">Microsoft Access <span>– Introducere</span></h2>
        <h3 class="pp-h pp-blk">Ce este Access?</h3>
        <p class="pp-txt">Microsoft Access este un program de gestionare a bazelor de date, creat de Microsoft și inclus în pachetul Microsoft Office. Cu el creăm și administrăm baze de date în care <b>stocăm</b>, <b>organizăm</b> și <b>analizăm</b> informații.</p>
        <h3 class="pp-h">Caracteristici Access</h3>
        <ol class="pp-list">${ol([
          "Oferă șabloane gata făcute pentru baze de date.",
          "Permite crearea de tabele, interogări, formulare și rapoarte.",
          "Are instrumente simple pentru a stoca și gestiona multe date.",
          "Este util pentru sortarea, filtrarea și căutarea datelor.",
          "Ajută la crearea relațiilor dintre tabele.",
          "Salvează în format <i>.accdb</i> (sau vechiul <i>.mdb</i>) și exportă în PDF sau Excel."
        ])}</ol>
        <h3 class="pp-h">Termeni importanți</h3>
        <dl class="pp-terms">${terms.map(([t, d, c]) => `<div><dt class="hl-${c}">${t}</dt><dd><span class="hl-${c} soft">${d}</span></dd></div>`).join("")}</dl>
        <div class="pp-foot">
          <div>
            <h3 class="pp-h">La ce folosim Access?</h3>
            <ol class="pp-list">${ol([
              "Baze de date cu elevi și angajați.",
              "Gestionarea inventarului și a stocurilor.",
              "Evidența clienților.",
              "Sisteme de facturare.",
              "Evidența bibliotecii și a școlii.",
              "Analize și rapoarte pentru firme sau uz personal."
            ])}</ol>
          </div>
          <div class="pp-side">
            <div class="pp-icons">
              <figure>${ico.db}<figcaption>Bază de date</figcaption></figure>
              <figure>${ico.tb}<figcaption>Tabel</figcaption></figure>
              <figure>${ico.fm}<figcaption>Formular</figcaption></figure>
              <figure>${ico.rp}<figcaption>Raport</figcaption></figure>
            </div>
            <p class="pp-ribbon">Proiectează-ți ideile și <span class="nw">dă-le</span> viață cu Access! <span aria-hidden="true">★</span></p>
          </div>
        </div>
      </div>
    </section>`;
  }

  function renderHome(main) {
    const total = L.reduce((a, l) => a + l.exercitii.length, 0);
    const solved = Object.keys(store.ex).length;
    let h = `<div class="wrap wide">
      ${posterIntro()}
      <section class="hero">
        <div>
          <div class="eyebrow">Tehnologia informației și a comunicațiilor · clasa a X-a</div>
          <h1 style="margin-top:8px">Învață Access lucrând pe o bază de date adevărată</h1>
          <p class="lead">15 ore despre baze de date în Microsoft Access: teorie pe înțeles, exerciții care se verifică singure, un simulator de interogări care rulează în browser și fișe de lucru pentru laborator.</p>
          <div class="cta"><a class="btn pri" href="#ora-1">Începe cu Ora 1</a><a class="btn" href="#laborator">Deschide laboratorul</a></div>
          <div class="stats"><div><b>15</b><span>ore de curs</span></div><div><b>${total}</b><span>exerciții interactive</span></div><div><b>${solved}</b><span>rezolvate de tine</span></div></div>
        </div>
        <figure class="relwin" style="margin:0"><div class="cap"><span class="mono">Instrumente bază de date › Relații</span><span>Biblioteca.accdb</span></div>${relDiagram()}<figcaption class="hint" style="margin-top:6px">Baza de date de lucru: un elev împrumută mai multe cărți, o carte este împrumutată de mai mulți elevi.</figcaption></figure>
      </section>`;
    UNITS.forEach(u => {
      h += `<section class="unit"><div class="unit-head"><span class="tag">${u.cod}</span><h2>${esc(u.titlu)}</h2></div><div class="cards">`;
      L.filter(l => l.unit === u.cod).forEach(l => {
        const p = lessonProgress(l);
        h += `<a class="lcard" href="#ora-${l.id}"><div class="row"><span class="n">ORA ${String(l.id).padStart(2, "0")}</span>${p.pct >= 100 ? `<span class="chip ok">Finalizată</span>` : ""}</div><h3>${esc(l.titlu)}</h3><p>${esc(l.rezumat)}</p><div class="bar"><i style="width:${p.pct}%"></i></div></a>`;
      });
      h += `</div></section>`;
    });
    h += `<section class="unit"><div class="unit-head"><span class="tag">+</span><h2>Instrumente</h2></div><div class="tools">
      <a class="tool" href="#laborator"><h3>Laborator interogări</h3><p>Grila de proiectare din Access, cu criterii, totaluri, parametri și vizualizare SQL.</p></a>
      <a class="tool" href="#date"><h3>Datele de lucru</h3><p>Tabelele bazei Biblioteca, gata de copiat în Excel sau direct în Access.</p></a>
      <a class="tool" href="#test"><h3>Test final</h3><p>${CONFIG.intrebariTestFinal} întrebări din toate lecțiile, cu notă și rezultat de trimis profesorului.</p></a>
      <a class="tool" href="#proiect"><h3>Proiect final</h3><p>O bază de date construită de la zero, cu barem de evaluare.</p></a>
    </div></section>`;
    h += footer() + `</div>`;
    main.innerHTML = h;
  }

  function renderLesson(main, les) {
    const tab = store.tab[les.id] || "teorie";
    const p = lessonProgress(les);
    const unit = UNITS.find(u => u.cod === les.unit);
    const prev = L.find(l => l.id === les.id - 1), next = L.find(l => l.id === les.id + 1);
    const nEx = les.exercitii.length, nDone = les.exercitii.filter(e => store.ex[e.id]).length;
    main.innerHTML = `<div class="wrap">
      <header class="lhead">
        <div class="meta"><span class="chip acc">Ora ${les.id}</span><span class="chip">${esc(unit.cod)} · ${esc(unit.titlu)}</span>${p.pct >= 100 ? `<span class="chip ok">Finalizată</span>` : `<span class="chip">${p.pct}% realizat</span>`}</div>
        <h1>${esc(les.titlu)}</h1>
        <div class="obj"><div class="eyebrow">La sfârșitul orei vei ști să</div><ul>${les.obiective.map(o => `<li>${o}</li>`).join("")}</ul></div>
      </header>
      <nav class="tabs" role="tablist">
        ${[["teorie", "Teorie", ""], ["exercitii", "Exerciții", `${nDone}/${nEx}`], ["fisa", "Fișă de lucru", ""], ["test", "Mini-test", store.test[les.id] ? "nota " + store.test[les.id] : ""]].map(([k, t, c]) => `<button role="tab" aria-selected="${tab === k}" class="${tab === k ? "on" : ""}" data-tab="${k}">${t}${c ? `<span class="cnt">${c}</span>` : ""}</button>`).join("")}
      </nav>
      <div id="tabBody"></div>
      <div class="pager">${prev ? `<a class="btn" href="#ora-${prev.id}">← Ora ${prev.id}: ${esc(prev.titluScurt || prev.titlu)}</a>` : "<span></span>"}${next ? `<a class="btn pri" href="#ora-${next.id}">Ora ${next.id}: ${esc(next.titluScurt || next.titlu)} →</a>` : `<a class="btn pri" href="#test">Test final →</a>`}</div>
      ${footer()}
    </div>`;
    $$("[data-tab]", main).forEach(b => b.addEventListener("click", () => { store.tab[les.id] = b.dataset.tab; save(); renderLesson(main, les); }));
    const body = $("#tabBody", main);
    if (tab === "teorie") {
      body.innerHTML = `<article class="prose">${les.teorie}</article><div class="row-gap" style="margin-top:18px"><button class="btn pri" data-go="exercitii">Treci la exerciții →</button></div>`;
      hydrate(body);
      $("[data-go]", body).addEventListener("click", () => { store.tab[les.id] = "exercitii"; save(); renderLesson(main, les); window.scrollTo(0, 0); });
    }
    if (tab === "exercitii") {
      body.style.display = "grid"; body.style.gap = "16px";
      les.exercitii.forEach((ex, i) => body.appendChild(renderExercise(ex, i + 1)));
    }
    if (tab === "fisa") renderFisa(body, les);
    if (tab === "test") renderMiniTest(body, les);
  }

  function renderFisa(body, les) {
    const f = les.fisa; const st = store.fisa[les.id] || (store.fisa[les.id] = { ans: {}, chk: {} });
    const nume = st.nume !== undefined ? st.nume : (store.nume || "");
    let h = `<div class="sheet"><div class="sheet-h"><div class="row-gap" style="justify-content:space-between"><div><div class="eyebrow">Fișa de lucru nr. ${les.id} · ${esc(f.durata || "50 de minute")}</div><h2 style="margin-top:4px">${esc(f.titlu)}</h2></div><span class="chip">Total: ${f.cerinte.reduce((a, c) => a + (c.pct || 0), 0)} puncte</span></div>
      <div class="who"><label>Nume și prenume<input type="text" data-w="nume" value="${esc(nume)}"></label><label>Clasa<input type="text" data-w="clasa" value="${esc(st.clasa || "")}"></label><label>Data<input type="text" data-w="data" value="${esc(st.data || Engine.fmt(new Date()))}"></label></div>
      ${f.context ? `<p>${f.context}</p>` : ""}</div><div class="sheet-b">`;
    f.cerinte.forEach((c, i) => {
      h += `<div class="req"><div class="rn">${i + 1}</div><div class="rb"><div>${c.text}</div>${c.pct ? `<div class="pts">${c.pct} puncte</div>` : ""}${c.raspuns ? `<textarea data-a="${i}" placeholder="Răspunsul tău">${esc(st.ans[i] || "")}</textarea>` : ""}</div></div>`;
    });
    h += `</div></div>`;
    if (f.verificare) h += `<div class="ex"><div class="ex-h"><div><div class="k">Autoevaluare</div><h4>Bifează ce ai realizat în Access</h4></div></div><div class="chk">${f.verificare.map((v, i) => `<label><input type="checkbox" data-c="${i}" ${st.chk[i] ? "checked" : ""}><span>${v}</span></label>`).join("")}</div></div>`;
    h += `<div class="row-gap" id="fisaAct"><button class="btn pri" data-f="copy">Copiază răspunsurile</button><button class="btn ghost" data-f="clear">Golește fișa</button><span class="hint">Răspunsurile se salvează automat în acest browser. Copiază-le și trimite-le profesorului pe Classroom.</span></div>`;
    if (store.teacher && f.solutii) h += `<div class="teacher"><div class="bt">Rezolvare și barem (mod profesor)</div><div class="prose">${f.solutii}</div></div>`;
    body.innerHTML = h;
    $$("[data-w]", body).forEach(inp => inp.addEventListener("input", () => { st[inp.dataset.w] = inp.value; if (inp.dataset.w === "nume") store.nume = inp.value; save(); }));
    $$("[data-a]", body).forEach(t => t.addEventListener("input", () => { st.ans[t.dataset.a] = t.value; save(); }));
    $$("[data-c]", body).forEach(c => c.addEventListener("change", () => { st.chk[c.dataset.c] = c.checked; save(); }));
    $("[data-f=copy]", body).addEventListener("click", () => {
      let t = `FIȘA DE LUCRU NR. ${les.id} — ${f.titlu}\nElev: ${st.nume || store.nume || "-"} · Clasa: ${st.clasa || "-"} · Data: ${st.data || Engine.fmt(new Date())}\n\n`;
      f.cerinte.forEach((c, i) => { if (c.raspuns) t += `${i + 1}. ${c.text.replace(/<[^>]+>/g, "")}\nRăspuns: ${st.ans[i] || "(necompletat)"}\n\n`; });
      if (f.verificare) t += "Autoevaluare:\n" + f.verificare.map((v, i) => `[${st.chk[i] ? "x" : " "}] ${v.replace(/<[^>]+>/g, "")}`).join("\n");
      copyText(t, $("#fisaAct", body));
    });
    $("[data-f=clear]", body).addEventListener("click", (e) => {
      const a = $("#fisaAct", body);
      a.innerHTML = `<span class="confirm">Ștergi răspunsurile din această fișă? <button class="btn sm pri" data-ok>Da</button><button class="btn sm" data-no>Nu</button></span>`;
      $("[data-ok]", a).addEventListener("click", () => { store.fisa[les.id] = { ans: {}, chk: {} }; save(); renderFisa(body, les); });
      $("[data-no]", a).addEventListener("click", () => renderFisa(body, les));
    });
  }

  /* ---------- teste ---------- */
  function questionHTML(q, i, name) {
    const multi = Array.isArray(q.ans);
    return `<div class="qcard" data-qi="${i}"><div class="qn">Întrebarea ${i + 1}${multi ? " · mai multe răspunsuri corecte" : ""}</div><div style="font-weight:600">${q.q}</div><div class="opts">${q.opts.map((o, k) => `<label class="opt"><input type="${multi ? "checkbox" : "radio"}" name="${name}-${i}" value="${k}"><span>${o}</span></label>`).join("")}</div></div>`;
  }
  function gradeQuestions(container, qs) {
    let ok = 0; const res = [];
    $$(".qcard", container).forEach((card, i) => {
      const q = qs[i]; const multi = Array.isArray(q.ans);
      const sel = $$("input", card).filter(x => x.checked).map(x => +x.value);
      const good = multi ? q.ans.slice().sort().join() === sel.slice().sort().join() : sel[0] === q.ans;
      if (good) ok++; res.push(good);
      $$(".opt", card).forEach((o, k) => { const isA = multi ? q.ans.includes(k) : q.ans === k; if (isA) o.classList.add("right"); else if (sel.includes(k)) o.classList.add("wrong"); });
      $$("input", card).forEach(x => x.disabled = true);
      if (q.expl) card.insertAdjacentHTML("beforeend", `<div class="fb ${good ? "ok" : "no"}"><b>${good ? "Corect." : "Greșit."}</b> ${q.expl}</div>`);
    });
    const nota = Math.round((1 + 9 * ok / qs.length) * 100) / 100;
    return { ok, total: qs.length, nota, res };
  }
  function renderMiniTest(body, les) {
    const qs = shuffle(les.test).slice(0, CONFIG.intrebariMiniTest);
    body.innerHTML = `<div style="display:grid;gap:14px"><div class="hint">${qs.length} întrebări alese la întâmplare din ${les.test.length}. Nota se calculează din 10 (1 punct din oficiu). Reîncarcă testul pentru alte întrebări.</div><div id="mq" style="display:grid;gap:12px">${qs.map((q, i) => questionHTML(q, i, "mt" + les.id)).join("")}</div><div class="row-gap" id="mtAct"><button class="btn pri" data-m="done">Trimite răspunsurile</button><button class="btn ghost" data-m="new">Alte întrebări</button></div></div>`;
    $("[data-m=new]", body).addEventListener("click", () => renderMiniTest(body, les));
    $("[data-m=done]", body).addEventListener("click", () => {
      const r = gradeQuestions($("#mq", body), qs);
      const best = Math.max(r.nota, store.test[les.id] || 0);
      if (r.nota >= 5) { store.test[les.id] = best; save(); renderSide(location.hash.slice(1)); }
      $("#mtAct", body).innerHTML = `<div class="score" style="width:100%"><span class="big">${r.nota.toFixed(2).replace(".", ",")}</span><div><b>${r.ok} din ${r.total} răspunsuri corecte</b><div class="hint">${r.nota >= 5 ? "Mini-testul este promovat și apare în progresul lecției." : "Recitește teoria și încearcă din nou: ai nevoie de cel puțin nota 5."}</div></div><button class="btn" data-m2="again">Încearcă din nou</button></div>`;
      $("[data-m2]", body).addEventListener("click", () => renderMiniTest(body, les));
      $("#mtAct", body).scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  let timerId = null;
  function renderFinal(main) {
    clearInterval(timerId);
    main.innerHTML = `<div class="wrap"><header class="lhead"><div class="meta"><span class="chip acc">Evaluare</span></div><h1>Test final Access</h1><p class="hint" style="font-size:1rem">${CONFIG.intrebariTestFinal} întrebări extrase din toate cele 15 ore. Fiecare elev primește alt set de întrebări. La final copiezi rezultatul și îl trimiți profesorului.</p></header>
      <div class="ex"><div class="row-gap"><label style="display:grid;gap:4px;flex:1;min-width:220px">Nume și prenume<input type="text" id="fn" value="${esc(store.nume || "")}"></label><label style="display:grid;gap:4px;width:120px">Clasa<input type="text" id="fc"></label></div>
      <label class="row-gap"><input type="checkbox" id="ft" checked style="accent-color:var(--accent)"> Cu cronometru (${CONFIG.minuteTestFinal} de minute)</label><div><button class="btn pri" id="fstart">Începe testul</button></div></div>${footer()}</div>`;
    $("#fstart").addEventListener("click", () => {
      const nume = $("#fn").value.trim(), clasa = $("#fc").value.trim(), timed = $("#ft").checked;
      if (!nume) { $("#fn").focus(); return toast("Scrie-ți numele înainte de a începe"); }
      store.nume = nume; save();
      const pool = shuffle(L.flatMap(l => l.test.map(q => Object.assign({ ora: l.id }, q))));
      // câte o întrebare din fiecare oră, apoi completăm aleatoriu
      const pick = []; L.forEach(l => { const q = pool.find(x => x.ora === l.id && !pick.includes(x)); if (q) pick.push(q); });
      pool.forEach(q => { if (pick.length < CONFIG.intrebariTestFinal && !pick.includes(q)) pick.push(q); });
      const qs = shuffle(pick.slice(0, CONFIG.intrebariTestFinal));
      const start = Date.now();
      main.innerHTML = `<div class="wrap"><header class="lhead"><div class="row-gap" style="justify-content:space-between"><h2>Test final · ${esc(nume)}</h2>${timed ? `<span class="timer" id="tm" aria-live="off">${CONFIG.minuteTestFinal}:00</span>` : ""}</div></header><div id="fq" style="display:grid;gap:12px">${qs.map((q, i) => questionHTML(q, i, "ft")).join("")}</div><div class="row-gap" id="fAct"><button class="btn pri" id="fdone">Predă testul</button></div>${footer()}</div>`;
      const finish = () => {
        clearInterval(timerId);
        const r = gradeQuestions($("#fq"), qs);
        const min = Math.round((Date.now() - start) / 60000);
        const txt = `TEST FINAL ACCESS — clasa a X-a\nElev: ${nume}${clasa ? " · Clasa: " + clasa : ""}\nData: ${Engine.fmt(new Date())} · Durată: ${min} min\nRăspunsuri corecte: ${r.ok}/${r.total} · Nota: ${r.nota.toFixed(2)}\n\n` + qs.map((q, i) => `${i + 1}. [${r.res[i] ? "corect" : "greșit"}] (Ora ${q.ora}) ${q.q.replace(/<[^>]+>/g, "")}`).join("\n");
        $("#fAct").innerHTML = `<div class="score" style="width:100%"><span class="big">${r.nota.toFixed(2).replace(".", ",")}</span><div style="flex:1;min-width:200px"><b>${r.ok} din ${r.total} răspunsuri corecte</b><div class="hint">Mai jos vezi explicația fiecărei întrebări.</div></div><div class="row-gap"><button class="btn pri" id="fcopy">Copiază rezultatul</button><button class="btn" id="fagain">Test nou</button></div></div>`;
        $("#fcopy").addEventListener("click", () => copyText(txt, $("#fAct")));
        $("#fagain").addEventListener("click", () => renderFinal(main));
        $("#fAct").scrollIntoView({ behavior: "smooth", block: "center" });
        const tm = $("#tm"); if (tm) tm.textContent = "Predat";
      };
      $("#fdone").addEventListener("click", finish);
      if (timed) {
        const end = start + CONFIG.minuteTestFinal * 60000;
        timerId = setInterval(() => {
          const tm = $("#tm"); if (!tm) return clearInterval(timerId);
          const left = Math.max(0, end - Date.now()); const m = Math.floor(left / 60000), s = Math.floor(left % 60000 / 1000);
          tm.textContent = `${m}:${String(s).padStart(2, "0")}`; tm.classList.toggle("low", left < 180000);
          if (left <= 0) { toast("Timpul a expirat: testul a fost predat"); finish(); }
        }, 1000);
      }
      window.scrollTo(0, 0);
    });
  }

  function renderLab(main) {
    main.innerHTML = `<div class="wrap wide"><header class="lhead"><div class="meta"><span class="chip acc">Simulator</span></div><h1>Laborator interogări</h1><p class="hint" style="font-size:1rem;max-width:75ch">Construiește orice interogare pe baza de date Biblioteca, exact ca în <span class="ui">Creare › Proiectare interogare</span>. Adaugă tabele, pune câmpuri în grilă, scrie criterii și apasă <b>! Rulare</b> (sau Enter într-o celulă). Butonul <b>SQL</b> arată instrucțiunea echivalentă.</p></header>
      <div class="row-gap" id="labEx"><span class="eyebrow">Pornește de la un exemplu:</span></div>
      <div id="lab"></div>
      <details class="sol"><summary>Fișă rapidă: ce poți scrie în rândul Criterii</summary><div class="tblwrap" style="margin-top:10px"><table class="tbl" style="width:100%;border-collapse:collapse"><thead><tr><th>Criteriu</th><th>Înseamnă</th></tr></thead><tbody>
      ${[["Brăila", "egal cu textul Brăila (Access pune singur ghilimelele)"], [">=9", "mai mare sau egal cu 9"], ["Between 1900 And 1950", "între 1900 și 1950, inclusiv capetele"], ['Like "M*"', "începe cu M"], ['Like "*escu"', "se termină cu escu"], ['Like "?a*"', "a doua literă este a"], ['In("Ianca";"Făurei")', "una dintre valorile din listă"], ["Is Null", "câmp gol"], ["Not Brăila", "diferit de Brăila"], [">=#01.10.2026#", "dată de la 1 octombrie 2026 încolo"], ["Yes / No", "pentru câmpuri Da/Nu"], ["[Introduceți clasa:]", "parametru: Access cere valoarea la rulare"]].map(([a, b]) => `<tr><td><code>${esc(a)}</code></td><td>${b}</td></tr>`).join("")}
      </tbody></table></div><p class="hint" style="margin-top:8px">Câmpuri calculate în rândul Câmp: <code>Varsta: 2026-Year([DataNasterii])</code>, <code>NumeComplet: [Nume] &amp; " " &amp; [Prenume]</code>, <code>Situatie: IIf([Media]&gt;=9;"Excelent";"Bine")</code>.</p></details>
      ${footer()}</div>`;
    const lab = new Qbe($("#lab"), { spec: { tables: ["Elevi"], cols: [{ field: "Nume" }, { field: "Prenume" }, { field: "Clasa" }, { field: "Media", sort: "Descendent", crit: ">=9" }] }, autorun: true, minCols: 6 });
    const EXS = [
      ["Elevi cu media ≥ 9", { tables: ["Elevi"], cols: [{ field: "Nume" }, { field: "Prenume" }, { field: "Clasa" }, { field: "Media", sort: "Descendent", crit: ">=9" }] }],
      ["Cine a împrumutat ce", { tables: ["Elevi", "Imprumuturi", "Carti"], cols: [{ field: "Nume" }, { field: "Prenume" }, { field: "Titlu" }, { field: "DataImprumut", sort: "Ascendent" }] }],
      ["Cărți nereturnate", { tables: ["Elevi", "Imprumuturi", "Carti"], cols: [{ field: "Nume" }, { field: "Clasa" }, { field: "Titlu" }, { field: "Restituit", show: false, crit: "No" }] }],
      ["Media pe clase (Σ)", { tables: ["Elevi"], totals: true, cols: [{ field: "Clasa", total: "Grupare după", sort: "Ascendent" }, { field: "Media", total: "Medie" }, { field: "IdElev", total: "Numărare" }] }],
      ["Parametru: clasa", { tables: ["Elevi"], cols: [{ field: "Nume" }, { field: "Prenume" }, { field: "Clasa", crit: "[Introduceți clasa:]" }] }],
      ["Scumpire 10% (actualizare)", { tables: ["Carti"], type: "update", cols: [{ field: "Pret", update: "[Pret]*1.1" }, { field: "Gen", crit: "Roman" }] }]
    ];
    EXS.forEach(([t, s]) => { const b = document.createElement("button"); b.className = "btn sm"; b.textContent = t; b.addEventListener("click", () => { lab.load(s); lab.run(); }); $("#labEx").appendChild(b); });
  }

  function renderData(main) {
    const tabs = Object.keys(DB.schema);
    main.innerHTML = `<div class="wrap wide"><header class="lhead"><div class="meta"><span class="chip acc">Resurse</span></div><h1>Datele de lucru: Biblioteca.accdb</h1><p class="hint" style="font-size:1rem;max-width:75ch">Toate fișele folosesc aceeași bază de date. Construiește în Access tabelele cu structura de mai jos, apoi copiază datele: fie le lipești în Excel și folosești <span class="ui">Date externe › Import › Excel</span>, fie le lipești direct în Foaia de date a tabelului (selectează rândul nou, marcat cu *, apoi Ctrl+V).</p></header>
      <figure class="figure" style="margin:0">${relDiagram()}<figcaption>Relațiile dintre tabele, cu integritate referențială.</figcaption></figure>
      ${tabs.map(t => `<section style="display:grid;gap:10px"><div class="row-gap" style="justify-content:space-between"><div><h2>${t}</h2><p class="hint">${DB.schema[t].descriere} · ${DB.tables[t].length} înregistrări</p></div><div class="row-gap"><button class="btn sm pri" data-copy="${t}">Copiază datele (pentru Excel)</button><button class="btn sm" data-copyh="${t}">Copiază fără antet (pentru Access)</button></div></div><div data-cphost="${t}"></div>
        <details class="sol"><summary>Structura tabelului (Vizualizare proiect)</summary><div style="margin-top:10px">${designHTML(t)}</div></details>
        <div class="dsx" data-t="${t}"></div></section>`).join("")}
      ${footer()}</div>`;
    $$(".dsx", main).forEach(el => new Sheet(el, { table: el.dataset.t }));
    const tsv = (t, head) => {
      const f = DB.schema[t].campuri;
      const lines = DB.tables[t].map(r => f.map(c => { const v = r[c.nume]; if (v === null) return ""; if (typeof v === "boolean") return v ? "Da" : "Nu"; if (v instanceof Date) return Engine.fmt(v); if (typeof v === "number") return String(v).replace(".", ","); return v; }).join("\t"));
      return (head ? f.map(c => c.nume).join("\t") + "\n" : "") + lines.join("\n");
    };
    $$("[data-copy]", main).forEach(b => b.addEventListener("click", () => copyText(tsv(b.dataset.copy, true), $(`[data-cphost="${b.dataset.copy}"]`, main))));
    $$("[data-copyh]", main).forEach(b => b.addEventListener("click", () => copyText(tsv(b.dataset.copyh, false), $(`[data-cphost="${b.dataset.copyh}"]`, main))));
  }

  function renderGlosar(main) {
    const G = window.EXTRA.glosar, S = window.EXTRA.scurtaturi;
    main.innerHTML = `<div class="wrap"><header class="lhead"><div class="meta"><span class="chip acc">Referință</span></div><h1>Glosar și scurtături</h1></header>
      <div class="row-gap"><input type="text" id="gq" placeholder="Caută un termen…" style="flex:1;min-width:220px" aria-label="Caută în glosar"></div>
      <dl class="term" id="gl"></dl>
      <h2>Scurtături de tastatură în Access</h2>
      <div class="tblwrap"><table class="tbl" style="width:100%;border-collapse:collapse"><thead><tr><th>Taste</th><th>Ce face</th></tr></thead><tbody>${S.map(([k, d]) => `<tr><td>${k.split(" + ").map(x => `<kbd>${x}</kbd>`).join(" + ")}</td><td>${d}</td></tr>`).join("")}</tbody></table></div>
      ${footer()}</div>`;
    const draw = (q) => { $("#gl").innerHTML = G.filter(([t, en, d]) => !q || norm(t + en + d).includes(norm(q))).map(([t, en, d]) => `<dt>${t} <span class="en">${en}</span></dt><dd>${d}</dd>`).join("") || `<dd>Niciun termen găsit.</dd>`; };
    draw(""); $("#gq").addEventListener("input", e => draw(e.target.value));
  }

  function renderProiect(main) {
    const P = window.EXTRA.proiect;
    main.innerHTML = `<div class="wrap"><header class="lhead"><div class="meta"><span class="chip acc">Proiect final</span><span class="chip">${P.durata}</span></div><h1>${P.titlu}</h1><p style="font-size:1.05rem;max-width:72ch">${P.intro}</p></header>
      <section class="prose" style="max-width:none">${P.continut}</section>
      <h2>Barem de evaluare</h2>
      <div class="tblwrap"><table class="tbl" style="width:100%;border-collapse:collapse"><thead><tr><th>Criteriu</th><th style="width:90px">Puncte</th></tr></thead><tbody>${P.barem.map(([c, p]) => `<tr><td>${c}</td><td class="mono">${p}</td></tr>`).join("")}<tr><td><b>Total</b></td><td class="mono"><b>${P.barem.reduce((a, b) => a + b[1], 0)}</b></td></tr></tbody></table></div>
      ${footer()}</div>`;
  }

  route();
})();
