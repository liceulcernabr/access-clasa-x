/* =========================================================
   Motorul de interogări (stil Access)
   - parser pentru criterii și expresii: Between…And, Like, In,
     Is Null, Not, And/Or, date #…#, funcții (Year, IIf, Round…)
   - rularea unei grile de proiectare (QBE): selecție, totaluri,
     sortare, Top, parametri, actualizare, ștergere
   - generarea instrucțiunii SQL echivalente
   ========================================================= */
window.Engine = (function () {
  const KW = ["AND", "OR", "NOT", "BETWEEN", "LIKE", "IN", "IS", "NULL", "TRUE", "FALSE", "YES", "NO", "DA", "NU", "MOD"];
  const CMP = ["=", "<>", "<", ">", "<=", ">="];

  class AccessError extends Error {}
  class ParamNeeded extends Error { constructor(n) { super("param"); this.param = n; } }

  /* ---------- Tokenizer ---------- */
  function tokenize(src) {
    const t = []; let i = 0; const s = String(src);
    const hasParen = s.includes("(");
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if (c === '"' || c === "'" || c === "„" || c === "”" || c === "“") {
        const close = (c === "„" || c === "“" || c === "”") ? /["”“]/ : new RegExp(c === '"' ? '"' : "'");
        let j = i + 1, v = "";
        while (j < s.length && !close.test(s[j])) { v += s[j]; j++; }
        if (j >= s.length) throw new AccessError("Lipsesc ghilimelele de închidere.");
        t.push({ k: "str", v }); i = j + 1; continue;
      }
      if (c === "#") {
        const j = s.indexOf("#", i + 1);
        if (j < 0) throw new AccessError("O dată calendaristică trebuie scrisă între două semne #.");
        t.push({ k: "date", v: parseDate(s.slice(i + 1, j)) }); i = j + 1; continue;
      }
      if (c === "[") {
        const j = s.indexOf("]", i + 1);
        if (j < 0) throw new AccessError("Lipsește paranteza dreaptă ] .");
        t.push({ k: "name", v: s.slice(i + 1, j).trim() }); i = j + 1; continue;
      }
      if (/[0-9]/.test(c) || (c === "." && /[0-9]/.test(s[i + 1] || ""))) {
        let j = i, v = "";
        while (j < s.length && /[0-9]/.test(s[j])) v += s[j++];
        if ((s[j] === "." || (s[j] === "," && !hasParen)) && /[0-9]/.test(s[j + 1] || "")) {
          v += "."; j++;
          while (j < s.length && /[0-9]/.test(s[j])) v += s[j++];
        }
        t.push({ k: "num", v: parseFloat(v) }); i = j; continue;
      }
      if (/[A-Za-zĂÂÎȘȚăâîșțŞŢşţ_]/.test(c)) {
        let j = i, v = "";
        while (j < s.length && /[A-Za-z0-9ĂÂÎȘȚăâîșțŞŢşţ_]/.test(s[j])) v += s[j++];
        const up = v.toUpperCase();
        if (KW.includes(up)) t.push({ k: "kw", v: up }); else t.push({ k: "id", v });
        i = j; continue;
      }
      const two = s.substr(i, 2);
      if (two === "<>" || two === "<=" || two === ">=") { t.push({ k: "op", v: two }); i += 2; continue; }
      if ("=<>+-*/\\&^(),;.!".includes(c)) { t.push({ k: "op", v: c === ";" ? "," : c }); i++; continue; }
      throw new AccessError(`Caracter nepermis: „${c}”.`);
    }
    return t;
  }

  function parseDate(str) {
    const s = str.trim(); let m;
    if ((m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) return new Date(+m[1], +m[2] - 1, +m[3]);
    if ((m = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/))) return new Date(+m[3], +m[2] - 1, +m[1]);
    if ((m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/))) return new Date(+m[3], +m[1] - 1, +m[2]); // format american lună/zi/an
    throw new AccessError(`Data „${s}” nu este recunoscută. Folosește #zz.ll.aaaa# sau #ll/zz/aaaa#.`);
  }

  /* ---------- Parser ---------- */
  function parse(src, opts) {
    opts = opts || {};
    const toks = tokenize(src); let p = 0;
    const fields = opts.fields || [];
    const fieldSet = new Set(fields.map(f => f.toLowerCase()));
    let depth = 0; // >0 = în interiorul unei funcții (fără operand implicit)
    const peek = () => toks[p];
    const isKw = (v) => toks[p] && toks[p].k === "kw" && toks[p].v === v;
    const isOp = (v) => toks[p] && toks[p].k === "op" && toks[p].v === v;
    const implicit = () => opts.implicit && depth === 0;
    function expect(v) { if (!isOp(v)) throw new AccessError(`Era așteptat „${v}”.`); p++; }

    function orE() { let l = andE(); while (isKw("OR")) { p++; l = { t: "or", l, r: andE() }; } return l; }
    function andE() { let l = notE(); while (isKw("AND")) { p++; l = { t: "and", l, r: notE() }; } return l; }
    function notE() { if (isKw("NOT")) { p++; return { t: "not", e: notE() }; } return pred(); }
    function pred() {
      const tk = peek();
      if (!tk) throw new AccessError("Expresia este incompletă.");
      if (implicit() && tk.k === "op" && CMP.includes(tk.v)) { p++; return { t: "cmp", op: tk.v, l: { t: "imp" }, r: add() }; }
      if (implicit() && tk.k === "kw" && ["BETWEEN", "LIKE", "IN", "IS"].includes(tk.v)) return post({ t: "imp" }, true);
      const left = add();
      const r = post(left, false);
      if (r) return r;
      if (implicit()) return { t: "cmp", op: "=", l: { t: "imp" }, r: left };
      return left;
    }
    function post(left, required) {
      const tk = peek();
      if (tk && tk.k === "op" && CMP.includes(tk.v)) { p++; return { t: "cmp", op: tk.v, l: left, r: add() }; }
      let neg = false;
      if (isKw("NOT") && toks[p + 1] && toks[p + 1].k === "kw" && ["BETWEEN", "LIKE", "IN"].includes(toks[p + 1].v)) { neg = true; p++; }
      if (isKw("BETWEEN")) { p++; const lo = add(); if (!isKw("AND")) throw new AccessError("După Between trebuie să urmeze „valoare And valoare”."); p++; const hi = add(); return { t: "between", e: left, lo, hi, neg }; }
      if (isKw("LIKE")) { p++; return { t: "like", e: left, pat: add(), neg }; }
      if (isKw("IN")) { p++; expect("("); const list = [add()]; while (isOp(",")) { p++; list.push(add()); } expect(")"); return { t: "in", e: left, list, neg }; }
      if (isKw("IS")) { p++; let n = false; if (isKw("NOT")) { n = true; p++; } if (!isKw("NULL")) throw new AccessError("După Is trebuie să urmeze Null sau Not Null."); p++; return { t: "isnull", e: left, neg: n }; }
      if (required) throw new AccessError("Criteriu incomplet.");
      return null;
    }
    function add() {
      let l = mul();
      while (peek() && peek().k === "op" && ["+", "-", "&"].includes(peek().v)) { const op = toks[p++].v; l = { t: "bin", op, l, r: mul() }; }
      return l;
    }
    function mul() {
      let l = una();
      while (peek() && ((peek().k === "op" && ["*", "/", "\\"].includes(peek().v)) || isKw("MOD"))) { const op = toks[p++].v; l = { t: "bin", op, l, r: una() }; }
      return l;
    }
    function una() { if (isOp("-")) { p++; return { t: "neg", e: una() }; } if (isOp("+")) { p++; return una(); } return pw(); }
    function pw() { let l = prim(); while (isOp("^")) { p++; l = { t: "bin", op: "^", l, r: prim() }; } return l; }
    function prim() {
      const tk = toks[p++];
      if (!tk) throw new AccessError("Expresia este incompletă.");
      if (tk.k === "num") return { t: "lit", v: tk.v };
      if (tk.k === "str") return { t: "lit", v: tk.v };
      if (tk.k === "date") return { t: "lit", v: tk.v };
      if (tk.k === "kw") {
        if (["TRUE", "YES", "DA"].includes(tk.v)) return { t: "lit", v: true };
        if (["FALSE", "NO", "NU"].includes(tk.v)) return { t: "lit", v: false };
        if (tk.v === "NULL") return { t: "lit", v: null };
        throw new AccessError(`Cuvântul „${tk.v}” nu poate apărea aici.`);
      }
      if (tk.k === "op" && tk.v === "(") { depth++; const e = orE(); depth--; expect(")"); return e; }
      if (tk.k === "name") {
        if (isOp(".") && toks[p + 1] && toks[p + 1].k === "name") { p++; const f = toks[p++].v; return { t: "field", name: tk.v + "." + f }; }
        return { t: "field", name: tk.v, bracket: true };
      }
      if (tk.k === "id") {
        if (isOp("(")) {
          p++; depth++; const args = [];
          if (!isOp(")")) { args.push(orE()); while (isOp(",")) { p++; args.push(orE()); } }
          depth--; expect(")");
          return { t: "fn", name: tk.v, args };
        }
        if (isOp(".") && toks[p + 1] && (toks[p + 1].k === "id" || toks[p + 1].k === "name")) { p++; const f = toks[p++].v; return { t: "field", name: tk.v + "." + f }; }
        if (fieldSet.has(tk.v.toLowerCase()) && !implicit()) return { t: "field", name: tk.v };
        if (implicit()) {
          // Access pune singur ghilimele în jurul textului scris fără ghilimele
          let v = tk.v;
          while (peek() && peek().k === "id") v += " " + toks[p++].v;
          return { t: "lit", v, auto: true };
        }
        return { t: "field", name: tk.v };
      }
      throw new AccessError(`Simbol neașteptat: „${tk.v}”.`);
    }

    const ast = orE();
    if (p < toks.length) throw new AccessError(`Text în plus după expresie: „${toks[p].v}”.`);
    return ast;
  }

  /* ---------- Evaluare ---------- */
  const isDate = (v) => v instanceof Date;
  function toNum(v) {
    if (v === null || v === undefined) return null;
    if (typeof v === "number") return v;
    if (typeof v === "boolean") return v ? -1 : 0;
    if (isDate(v)) return v.getTime();
    const n = parseFloat(String(v).replace(",", "."));
    return isNaN(n) ? NaN : n;
  }
  function lower(s) { return String(s).toLocaleLowerCase("ro"); }

  function compare(a, b) {
    if (a === null || a === undefined || b === null || b === undefined) return null;
    if (typeof a === "boolean" || typeof b === "boolean") {
      const x = typeof a === "boolean" ? a : toNum(a) !== 0; const y = typeof b === "boolean" ? b : toNum(b) !== 0;
      return x === y ? 0 : (x ? -1 : 1);
    }
    if (isDate(a) || isDate(b)) {
      const x = isDate(a) ? a : (typeof a === "string" ? safeDate(a) : null);
      const y = isDate(b) ? b : (typeof b === "string" ? safeDate(b) : null);
      if (!x || !y) return null;
      return Math.sign(x.getTime() - y.getTime());
    }
    if (typeof a === "number" && typeof b === "number") return Math.sign(a - b);
    if (typeof a === "number" || typeof b === "number") {
      const x = toNum(a), y = toNum(b);
      if (!isNaN(x) && !isNaN(y)) return Math.sign(x - y);
    }
    return Math.sign(String(a).localeCompare(String(b), "ro", { sensitivity: "accent" }));
  }
  function safeDate(s) { try { return parseDate(s); } catch (e) { return null; } }

  function likeToRegex(pat) {
    let r = "^"; const s = String(pat);
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c === "*") r += ".*";
      else if (c === "?") r += ".";
      else if (c === "#") r += "[0-9]";
      else if (c === "[") {
        const j = s.indexOf("]", i);
        if (j < 0) { r += "\\["; continue; }
        let cls = s.slice(i + 1, j);
        if (cls.startsWith("!")) cls = "^" + cls.slice(1);
        r += "[" + cls.replace(/\\/g, "\\\\") + "]"; i = j;
      } else r += c.replace(/[.+^${}()|\\]/g, "\\$&");
    }
    return new RegExp(r + "$", "i");
  }

  function lookupField(ctx, name) {
    const row = ctx.row || {};
    const key = Object.keys(row).find(k => k.toLowerCase() === name.toLowerCase());
    if (key !== undefined) return { ok: true, v: row[key] };
    if (ctx.alias) {
      const a = Object.keys(ctx.alias).find(k => k.toLowerCase() === name.toLowerCase());
      if (a !== undefined) return { ok: true, v: ctx.alias[a] };
    }
    return { ok: false };
  }

  function dateDiff(iv, a, b) {
    if (!isDate(a) || !isDate(b)) return null;
    iv = lower(iv);
    if (iv === "yyyy") return b.getFullYear() - a.getFullYear();
    if (iv === "m") return (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth();
    if (iv === "d" || iv === "y") return Math.round((b - a) / 86400000);
    if (iv === "ww") return Math.floor(Math.round((b - a) / 86400000) / 7);
    throw new AccessError(`Interval necunoscut în DateDiff: „${iv}”. Folosește "yyyy", "m" sau "d".`);
  }
  function roundHalfEven(x, d) { const f = Math.pow(10, d || 0); const y = x * f; const r = Math.round(y); const diff = Math.abs(y % 1); return (diff === 0.5 ? (r % 2 === 0 ? r : r - 1) : r) / f; }

  const FN = {
    year: (a) => isDate(a) ? a.getFullYear() : null,
    month: (a) => isDate(a) ? a.getMonth() + 1 : null,
    day: (a) => isDate(a) ? a.getDate() : null,
    weekday: (a) => isDate(a) ? a.getDay() + 1 : null,
    date: () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); },
    now: () => new Date(),
    round: (a, d) => a === null ? null : roundHalfEven(toNum(a), d ? toNum(d) : 0),
    int: (a) => a === null ? null : Math.floor(toNum(a)),
    fix: (a) => a === null ? null : Math.trunc(toNum(a)),
    abs: (a) => a === null ? null : Math.abs(toNum(a)),
    sqr: (a) => a === null ? null : Math.sqrt(toNum(a)),
    len: (a) => a === null ? null : String(a).length,
    left: (a, n) => a === null ? null : String(a).slice(0, toNum(n)),
    right: (a, n) => a === null ? null : (toNum(n) === 0 ? "" : String(a).slice(-toNum(n))),
    mid: (a, s, n) => a === null ? null : String(a).substr(toNum(s) - 1, n === undefined ? undefined : toNum(n)),
    ucase: (a) => a === null ? null : String(a).toLocaleUpperCase("ro"),
    lcase: (a) => a === null ? null : String(a).toLocaleLowerCase("ro"),
    trim: (a) => a === null ? null : String(a).trim(),
    instr: (a, b) => (a === null || b === null) ? null : lower(a).indexOf(lower(b)) + 1,
    val: (a) => { const n = parseFloat(String(a)); return isNaN(n) ? 0 : n; },
    str: (a) => a === null ? null : String(a),
    nz: (a, b) => (a === null || a === undefined) ? (b === undefined ? 0 : b) : a,
    datediff: (iv, a, b) => dateDiff(iv, a, b),
    dateadd: (iv, n, a) => {
      if (!isDate(a)) return null; const d = new Date(a); n = toNum(n); iv = lower(iv);
      if (iv === "yyyy") d.setFullYear(d.getFullYear() + n); else if (iv === "m") d.setMonth(d.getMonth() + n); else d.setDate(d.getDate() + n);
      return d;
    },
    format: (a, f) => fmt(a, f)
  };
  FN.lungime = FN.len;

  function fmt(v, f) {
    if (v === null || v === undefined) return "";
    f = f ? String(f) : "";
    if (isDate(v)) {
      const dd = String(v.getDate()).padStart(2, "0"), mm = String(v.getMonth() + 1).padStart(2, "0"), yy = v.getFullYear();
      const luni = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];
      if (/^mmmm$/i.test(f)) return luni[v.getMonth()];
      if (/^yyyy$/i.test(f)) return String(yy);
      if (/^mm$/i.test(f)) return mm;
      if (/long/i.test(f)) return `${v.getDate()} ${luni[v.getMonth()]} ${yy}`;
      return `${dd}.${mm}.${yy}`;
    }
    if (typeof v === "number") {
      if (/^(0\.00|fixed|standard|currency)$/i.test(f)) return v.toFixed(2);
      if (/^0$/.test(f)) return v.toFixed(0);
    }
    if (f === ">") return String(v).toLocaleUpperCase("ro");
    if (f === "<") return String(v).toLocaleLowerCase("ro");
    return String(v);
  }

  function truthy(v) { return v !== null && v !== undefined && v !== false && v !== 0 && !Number.isNaN(v); }

  function evaluate(n, ctx) {
    switch (n.t) {
      case "lit": return n.v;
      case "imp": return ctx.value;
      case "field": {
        const r = lookupField(ctx, n.name);
        if (r.ok) return r.v;
        if (n.name.includes(".")) { const r2 = lookupField(ctx, n.name.split(".").pop()); if (r2.ok) return r2.v; }
        const pk = Object.keys(ctx.params || {}).find(k => k.toLowerCase() === n.name.toLowerCase());
        if (pk !== undefined) return ctx.params[pk];
        if (ctx.collect) { ctx.collect.add(n.name); return null; }
        if (n.bracket) throw new ParamNeeded(n.name);
        throw new AccessError(`Câmpul „${n.name}” nu există. Scrie numele câmpurilor între paranteze drepte, de exemplu [Media].`);
      }
      case "neg": { const v = evaluate(n.e, ctx); return v === null ? null : -toNum(v); }
      case "bin": {
        const a = evaluate(n.l, ctx), b = evaluate(n.r, ctx);
        if (n.op === "&") return (a === null ? "" : (isDate(a) ? fmt(a) : (typeof a === "number" ? String(a).replace(".", ",") : String(a)))) + (b === null ? "" : (isDate(b) ? fmt(b) : (typeof b === "number" ? String(b).replace(".", ",") : String(b))));
        if (a === null || b === null) return null;
        if (n.op === "+" && typeof a === "string" && typeof b === "string" && isNaN(toNum(a))) return a + b;
        if ((n.op === "+" || n.op === "-") && isDate(a) && !isDate(b)) { const d = new Date(a); d.setDate(d.getDate() + (n.op === "+" ? 1 : -1) * toNum(b)); return d; }
        if (n.op === "-" && isDate(a) && isDate(b)) return Math.round((a - b) / 86400000);
        const x = toNum(a), y = toNum(b);
        if (isNaN(x) || isNaN(y)) throw new AccessError("Nepotrivire de tip de date în expresie (text folosit într-un calcul).");
        switch (n.op) {
          case "+": return x + y; case "-": return x - y; case "*": return x * y;
          case "/": if (y === 0) throw new AccessError("Împărțire la zero."); return x / y;
          case "\\": return Math.trunc(Math.round(x) / Math.round(y));
          case "MOD": return Math.round(x) % Math.round(y);
          case "^": return Math.pow(x, y);
        }
        return null;
      }
      case "cmp": {
        const c = compare(evaluate(n.l, ctx), evaluate(n.r, ctx));
        if (c === null) return null;
        return { "=": c === 0, "<>": c !== 0, "<": c < 0, ">": c > 0, "<=": c <= 0, ">=": c >= 0 }[n.op];
      }
      case "between": {
        const v = evaluate(n.e, ctx), lo = evaluate(n.lo, ctx), hi = evaluate(n.hi, ctx);
        const a = compare(v, lo), b = compare(v, hi);
        if (a === null || b === null) return null;
        const r = a >= 0 && b <= 0; return n.neg ? !r : r;
      }
      case "like": {
        const v = evaluate(n.e, ctx), pat = evaluate(n.pat, ctx);
        if (v === null || pat === null) return null;
        const r = likeToRegex(pat).test(isDate(v) ? fmt(v) : String(v)); return n.neg ? !r : r;
      }
      case "in": {
        const v = evaluate(n.e, ctx); if (v === null) return null;
        const r = n.list.some(x => compare(v, evaluate(x, ctx)) === 0); return n.neg ? !r : r;
      }
      case "isnull": { const v = evaluate(n.e, ctx); const r = v === null || v === undefined || v === ""; return n.neg ? !r : r; }
      case "and": { const a = evaluate(n.l, ctx); if (a === false) return false; const b = evaluate(n.r, ctx); if (b === false) return false; return (a === null || b === null) ? null : truthy(a) && truthy(b); }
      case "or": { const a = evaluate(n.l, ctx); if (truthy(a) && a !== null) return true; const b = evaluate(n.r, ctx); if (truthy(b) && b !== null) return true; return (a === null || b === null) ? null : false; }
      case "not": { const a = evaluate(n.e, ctx); return a === null ? null : !truthy(a); }
      case "fn": {
        const name = n.name.toLowerCase();
        if (name === "iif") {
          if (n.args.length !== 3) throw new AccessError("IIf are nevoie de 3 argumente: IIf(condiție; valoare dacă da; valoare dacă nu).");
          const c = evaluate(n.args[0], ctx);
          return evaluate(truthy(c) ? n.args[1] : n.args[2], ctx);
        }
        if (["sum", "avg", "count", "min", "max"].includes(name)) {
          if (!ctx.group) throw new AccessError(`Funcția ${n.name} se folosește doar în interogări de totaluri sau în rapoarte.`);
          const vals = ctx.group.map(r => evaluate(n.args[0] || { t: "lit", v: 1 }, Object.assign({}, ctx, { row: r, group: null })));
          return aggregate(name, vals, n.args[0] && n.args[0].t === "field" && n.args[0].name === "*");
        }
        const f = FN[name];
        if (!f) throw new AccessError(`Funcția „${n.name}” nu este cunoscută de simulator.`);
        return f.apply(null, n.args.map(a => evaluate(a, ctx)));
      }
    }
    throw new AccessError("Expresie necunoscută.");
  }

  function aggregate(fn, vals, star) {
    const nn = vals.filter(v => v !== null && v !== undefined);
    switch (fn) {
      case "count": return star ? vals.length : nn.length;
      case "sum": return nn.length ? nn.reduce((a, b) => a + toNum(b), 0) : null;
      case "avg": return nn.length ? nn.reduce((a, b) => a + toNum(b), 0) / nn.length : null;
      case "min": return nn.length ? nn.reduce((a, b) => compare(a, b) <= 0 ? a : b) : null;
      case "max": return nn.length ? nn.reduce((a, b) => compare(a, b) >= 0 ? a : b) : null;
      case "first": return vals.length ? vals[0] : null;
      case "last": return vals.length ? vals[vals.length - 1] : null;
    }
    return null;
  }

  /* ---------- Afișare valori ---------- */
  function show(v, tip) {
    if (v === null || v === undefined) return "";
    if (typeof v === "boolean") return v ? "☑" : "☐";
    if (isDate(v)) return fmt(v);
    if (typeof v === "number") {
      if (tip === "Monedă") return v.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " lei";
      return Number.isInteger(v) ? String(v) : String(Math.round(v * 10000) / 10000).replace(".", ",");
    }
    return String(v);
  }

  /* ---------- Rularea unei grile QBE ---------- */
  const AGG_RO = { "Grupare după": "group", "Sumă": "sum", "Medie": "avg", "Min": "min", "Max": "max", "Numărare": "count", "Prima": "first", "Ultima": "last", "Unde": "where", "Expresie": "expr" };
  const AGG_PREFIX = { sum: "SumăDe", avg: "MedieDe", min: "MinDe", max: "MaxDe", count: "NumărDe", first: "PrimaDe", last: "UltimaDe" };

  function fieldsOf(tables) {
    const out = [];
    tables.forEach(t => DB.schema[t].campuri.forEach(c => out.push(c.nume, t + "." + c.nume)));
    return out;
  }

  function joinRows(tables, warnings) {
    if (!tables.length) throw new AccessError("Adaugă cel puțin un tabel în interogare.");
    const qualify = (t, r) => { const o = {}; Object.keys(r).forEach(k => { o[t + "." + k] = r[k]; if (!(k in o)) o[k] = r[k]; }); return o; };
    let rows = DB.tables[tables[0]].map(r => qualify(tables[0], r));
    const used = [tables[0]];
    const rest = tables.slice(1);
    let guard = 0;
    while (rest.length && guard++ < 10) {
      let idx = rest.findIndex(t => DB.relatii.some(rl => (rl.de === t && used.includes(rl.la)) || (rl.la === t && used.includes(rl.de))));
      if (idx < 0) idx = 0;
      const t = rest.splice(idx, 1)[0];
      const rel = DB.relatii.find(rl => (rl.de === t && used.includes(rl.la)) || (rl.la === t && used.includes(rl.de)));
      const next = [];
      if (rel) {
        const [myField, otherT, otherField] = rel.de === t ? [rel.campDe, rel.la, rel.campLa] : [rel.campLa, rel.de, rel.campDe];
        rows.forEach(r => DB.tables[t].forEach(x => {
          if (compare(r[otherT + "." + otherField], x[myField]) === 0) { const q = qualify(t, x); next.push(Object.assign({}, q, r)); }
        }));
      } else {
        warnings.push(`Tabelul ${t} nu are relație cu celelalte tabele: Access combină fiecare rând cu fiecare (produs cartezian).`);
        rows.forEach(r => DB.tables[t].forEach(x => next.push(Object.assign({}, qualify(t, x), r))));
      }
      rows = next; used.push(t);
    }
    return rows;
  }

  // Interpretează textul din rândul „Câmp”
  function resolveColumn(col, fields, i) {
    const raw = (col.field || "").trim();
    if (!raw) return null;
    let alias = null, expr = raw;
    const m = raw.match(/^([^:\[\]"]+?)\s*:\s*(.+)$/);
    if (m && !/^\d/.test(m[1])) { alias = m[1].trim(); expr = m[2].trim(); }
    const bare = expr.replace(/^\[(.+)\]$/, "$1").replace(/^\[(.+)\]\.\[(.+)\]$/, "$1.$2");
    const hit = fields.find(f => f.toLowerCase() === bare.toLowerCase());
    if (hit && /^[\wĂÂÎȘȚăâîșț.]+$/.test(bare)) {
      return { kind: "field", key: hit, name: alias || hit.split(".").pop(), expr: hit, ast: { t: "field", name: hit }, alias: !!alias };
    }
    if (/\.\*$|^\*$/.test(bare)) return { kind: "star", table: bare.replace(/\.?\*$/, "") };
    const ast = parse(expr, { fields, implicit: false });
    return { kind: "expr", name: alias || ("Expr" + (i + 1)), expr, ast, alias: !!alias };
  }

  function run(spec, params) {
    params = params || {};
    const warnings = [];
    const tables = spec.tables || [];
    const fields = fieldsOf(tables);
    let cols = [];
    (spec.cols || []).forEach((c, i) => {
      const r = resolveColumn(c, fields, i);
      if (!r) return;
      if (r.kind === "star") {
        const ts = r.table ? [tables.find(t => t.toLowerCase() === r.table.toLowerCase())] : tables;
        ts.forEach(t => t && DB.schema[t].campuri.forEach(f => cols.push({ kind: "field", key: t + "." + f.nume, name: f.nume, ast: { t: "field", name: t + "." + f.nume }, src: c, show: c.show !== false, sort: "", crit: [], total: "group", tip: f.tip, starPart: true })));
        // criteriile/sortarea pe * nu se aplică (ca în Access)
        return;
      }
      const tip = r.kind === "field" ? tipOf(r.key) : null;
      const crits = [c.crit, ...(c.or || [])].map(x => (x || "").trim());
      cols.push(Object.assign(r, { k: "__c" + cols.length, src: c, show: c.show !== false, sort: c.sort || "", crit: crits, total: spec.totals ? (AGG_RO[c.total || "Grupare după"] || "group") : null, tip, update: c.update }));
    });
    if (!cols.length) throw new AccessError("Grila nu conține niciun câmp. Adaugă câmpuri în rândul „Câmp”.");

    // parametri: colectăm numele dintre paranteze care nu sunt câmpuri
    const need = new Set();
    const collector = { row: {}, params, collect: need };
    const critAsts = cols.map(c => (c.crit || []).map(s => s ? parse(s, { fields, implicit: true }) : null));
    const probe = (ast) => { try { scanParams(ast, fields, params, need); } catch (e) { } };
    cols.forEach((c, i) => { probe(c.ast); critAsts[i].forEach(a => a && probe(a)); if (c.update) probe(parse(c.update, { fields, implicit: false })); });
    const missing = [...need].filter(n => !Object.keys(params).some(k => k.toLowerCase() === n.toLowerCase()));
    if (missing.length) { const e = new ParamNeeded(missing[0]); e.all = missing; throw e; }

    let rows = joinRows(tables, warnings);
    const nCritRows = Math.max(...critAsts.map(a => a.length));
    const valueOf = (c, row, alias) => evaluate(c.ast, { row, params, alias });

    // calculează aliasurile (pot fi folosite în alte expresii)
    function rowAlias(row) {
      const a = {};
      cols.forEach(c => { if (c.kind === "expr" && !c.total) { try { a[c.name] = evaluate(c.ast, { row, params, alias: a }); } catch (e) { if (e instanceof AccessError) throw e; } } });
      return a;
    }

    const isAgg = (c) => spec.totals && c.total && !["group", "where"].includes(c.total) && c.total !== "expr";
    function rowPass(row, alias, part) {
      // part: "pre" (înainte de grupare) sau "post"
      let anyRowHasCrit = false;
      for (let r = 0; r < nCritRows; r++) {
        let has = false, ok = true;
        cols.forEach((c, i) => {
          const a = critAsts[i][r]; if (!a) return;
          const agg = isAgg(c);
          if ((part === "pre" && agg) || (part === "post" && !agg)) return;
          has = true;
          if (!ok) return;
          const v = part === "post" ? alias[c.k] : valueOf(c, row, alias);
          if (!truthy(evaluate(a, { row, params, alias, value: v }))) ok = false;
        });
        if (has) { anyRowHasCrit = true; if (ok) return true; }
      }
      return !anyRowHasCrit;
    }

    let out; // listă de {row, alias}
    if (spec.type === "update" || spec.type === "delete") {
      if (tables.length !== 1) throw new AccessError("În simulator, interogările de acțiune lucrează pe un singur tabel.");
      const matched = [];
      DB.tables[tables[0]].forEach((orig, idx) => {
        const row = joinRows([tables[0]], []).at(idx);
        const alias = rowAlias(row);
        if (rowPass(row, alias, "pre")) matched.push({ idx, row, alias, orig });
      });
      if (spec.type === "delete") {
        return { action: "delete", table: tables[0], columns: DB.schema[tables[0]].campuri.map(f => f.nume), tips: DB.schema[tables[0]].campuri.map(f => f.tip), rows: matched.map(m => DB.schema[tables[0]].campuri.map(f => m.orig[f.nume])), count: matched.length, total: DB.tables[tables[0]].length, warnings, sql: toSQL(spec, cols, critAsts, fields) };
      }
      const upCols = cols.filter(c => c.kind === "field" && (c.update || "").trim());
      if (!upCols.length) throw new AccessError("Completează rândul „Actualizare la” pentru cel puțin un câmp.");
      const changes = matched.map(m => {
        const after = {};
        upCols.forEach(c => { after[c.name] = evaluate(parse(c.update, { fields, implicit: false }), { row: m.row, params, alias: m.alias }); });
        return { orig: m.orig, after };
      });
      return { action: "update", table: tables[0], upFields: upCols.map(c => c.name), key: DB.schema[tables[0]].campuri[0].nume, changes, count: matched.length, total: DB.tables[tables[0]].length, tips: upCols.map(c => c.tip), warnings, sql: toSQL(spec, cols, critAsts, fields) };
    }

    if (spec.totals) {
      const pre = [];
      rows.forEach(row => { const alias = rowAlias(row); if (rowPass(row, alias, "pre")) pre.push({ row, alias }); });
      const groupCols = cols.filter(c => c.total === "group");
      const groups = new Map();
      pre.forEach(x => {
        const key = JSON.stringify(groupCols.map(c => { const v = valueOf(c, x.row, x.alias); return isDate(v) ? "D" + v.getTime() : v; }));
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(x);
      });
      if (!groupCols.length && !groups.size) groups.set("[]", []);
      out = [];
      groups.forEach(list => {
        const alias = {};
        cols.forEach(c => {
          if (c.total === "where") return;
          let v;
          if (c.total === "group") v = list.length ? valueOf(c, list[0].row, list[0].alias) : null;
          else if (c.total === "expr") v = evaluate(c.ast, { row: list[0] ? list[0].row : {}, params, alias, group: list.map(x => x.row) });
          else v = aggregate(c.total, list.map(x => valueOf(c, x.row, x.alias)), false);
          alias[c.k] = v; if (!(c.name in alias)) alias[c.name] = v;
        });
        out.push({ row: {}, alias });
      });
      // nume implicite pentru coloanele agregate fără alias
      cols.forEach(c => { if (isAgg(c) && !c.alias) c.dispName = AGG_PREFIX[c.total] + c.name; });
      out = out.filter(o => rowPass(o.row, o.alias, "post"));
      cols = cols.filter(c => c.total !== "where");
      cols.forEach(c => { c.get = (o) => o.alias[c.k]; });
    } else {
      out = [];
      rows.forEach(row => { const alias = rowAlias(row); if (rowPass(row, alias, "pre")) out.push({ row, alias }); });
      cols.forEach(c => { c.get = (o) => c.kind === "expr" ? o.alias[c.name] : valueOf(c, o.row, o.alias); });
    }

    // sortare
    const sortCols = cols.filter(c => c.sort);
    if (sortCols.length) {
      out.sort((a, b) => {
        for (const c of sortCols) {
          const va = c.get(a), vb = c.get(b);
          let cmp;
          if (va === null && vb === null) cmp = 0; else if (va === null) cmp = -1; else if (vb === null) cmp = 1; else cmp = compare(va, vb) || 0;
          if (cmp) return c.sort === "Descendent" ? -cmp : cmp;
        }
        return 0;
      });
    }
    // Top valori
    if (spec.top) {
      const t = String(spec.top).trim();
      let n = t.endsWith("%") ? Math.ceil(out.length * parseFloat(t) / 100) : parseInt(t, 10);
      if (n > 0 && n < out.length) {
        // Access include și valorile egale cu ultima
        const last = out[n - 1];
        while (n < out.length && sortCols.length && sortCols.every(c => compare(c.get(out[n]), c.get(last)) === 0)) n++;
        out = out.slice(0, n);
      }
    }
    const shown = cols.filter(c => c.show);
    if (!shown.length) throw new AccessError("Nicio coloană nu are bifată caseta „Afișare”.");
    // nume duplicate: Access afișează Tabel.Câmp
    const names = shown.map(c => c.dispName || c.name);
    const dup = names.map(n => names.filter(x => x === n).length > 1);
    return {
      action: "select",
      columns: shown.map((c, i) => dup[i] && c.key ? c.key : names[i]),
      tips: shown.map(c => (c.total === "count" ? null : c.tip || null)),
      rows: out.map(o => shown.map(c => c.get(o))),
      warnings, sql: toSQL(spec, cols, critAsts, fields)
    };
  }

  function scanParams(ast, fields, params, need) {
    if (!ast || typeof ast !== "object") return;
    if (ast.t === "field") {
      const nm = ast.name; const f = fields.find(x => x.toLowerCase() === nm.toLowerCase() || x.toLowerCase().endsWith("." + nm.toLowerCase()));
      if (!f && ast.bracket) need.add(nm);
      return;
    }
    ["l", "r", "e", "lo", "hi", "pat"].forEach(k => ast[k] && scanParams(ast[k], fields, params, need));
    (ast.args || []).forEach(a => scanParams(a, fields, params, need));
    (ast.list || []).forEach(a => scanParams(a, fields, params, need));
  }

  function tipOf(key) {
    const [t, f] = key.includes(".") ? key.split(".") : [null, key];
    const tabs = t ? [t] : Object.keys(DB.schema);
    for (const tb of tabs) { const c = DB.schema[tb] && DB.schema[tb].campuri.find(x => x.nume === f); if (c) return c.tip; }
    return null;
  }

  /* ---------- Generare SQL ---------- */
  function sqlLit(v) {
    if (v === null) return "Null";
    if (typeof v === "boolean") return v ? "True" : "False";
    if (isDate(v)) return `#${v.getMonth() + 1}/${v.getDate()}/${v.getFullYear()}#`;
    if (typeof v === "number") return String(v);
    return '"' + String(v).replace(/"/g, '""') + '"';
  }
  function sqlOf(n, imp) {
    const P = (x) => sqlOf(x, imp);
    switch (n.t) {
      case "lit": return sqlLit(n.v);
      case "imp": return imp;
      case "field": return n.name.includes(".") ? n.name.split(".").map(s => /[^\wĂÂÎȘȚăâîșț]/.test(s) ? `[${s}]` : s).join(".") : `[${n.name}]`;
      case "neg": return "-" + P(n.e);
      case "bin": return `${P(n.l)}${n.op === "&" ? " & " : n.op === "MOD" ? " Mod " : n.op}${P(n.r)}`;
      case "cmp": return `${P(n.l)}${n.op}${P(n.r)}`;
      case "between": return `${P(n.e)} ${n.neg ? "Not " : ""}Between ${P(n.lo)} And ${P(n.hi)}`;
      case "like": return `${P(n.e)} ${n.neg ? "Not " : ""}Like ${P(n.pat)}`;
      case "in": return `${P(n.e)} ${n.neg ? "Not " : ""}In (${n.list.map(P).join(",")})`;
      case "isnull": return `${P(n.e)} Is ${n.neg ? "Not " : ""}Null`;
      case "and": return `(${P(n.l)} And ${P(n.r)})`;
      case "or": return `(${P(n.l)} Or ${P(n.r)})`;
      case "not": return `Not ${P(n.e)}`;
      case "fn": return `${n.name}(${n.args.map(P).join(",")})`;
    }
    return "?";
  }
  function colRef(c) { return c.kind === "field" ? c.key : `(${sqlOf(c.ast, "")})`; }
  function toSQL(spec, cols, critAsts, fields) {
    try {
      const tables = spec.tables;
      let from = tables[0];
      const used = [tables[0]];
      tables.slice(1).forEach(t => {
        const rel = DB.relatii.find(rl => (rl.de === t && used.includes(rl.la)) || (rl.la === t && used.includes(rl.de)));
        if (rel) from = `(${from} INNER JOIN ${t} ON ${rel.de}.${rel.campDe} = ${rel.la}.${rel.campLa})`;
        else from = `${from}, ${t}`;
        used.push(t);
      });
      if (from.startsWith("(") && tables.length === 2) from = from.slice(1, -1);
      const isAgg = (c) => spec.totals && c.total && !["group", "where", "expr"].includes(c.total);
      const fnName = { sum: "Sum", avg: "Avg", min: "Min", max: "Max", count: "Count", first: "First", last: "Last" };
      const where = [], having = [];
      const nR = Math.max(0, ...critAsts.map(a => a.length));
      const wRows = [], hRows = [];
      for (let r = 0; r < nR; r++) {
        const w = [], h = [];
        cols.forEach((c, i) => {
          const a = critAsts[i] && critAsts[i][r]; if (!a) return;
          const ref = isAgg(c) ? `${fnName[c.total]}(${colRef(c)})` : colRef(c);
          (isAgg(c) ? h : w).push(sqlOf(a, ref));
        });
        if (w.length) wRows.push(w.join(" AND ")); if (h.length) hRows.push(h.join(" AND "));
      }
      if (wRows.length) where.push(wRows.length > 1 ? wRows.map(x => `(${x})`).join(" OR ") : wRows[0]);
      if (hRows.length) having.push(hRows.length > 1 ? hRows.map(x => `(${x})`).join(" OR ") : hRows[0]);
      const tbl = tables[0];
      if (spec.type === "delete") return `DELETE ${tbl}.*\nFROM ${tbl}${where.length ? "\nWHERE " + where[0] : ""};`;
      if (spec.type === "update") {
        const sets = cols.filter(c => c.kind === "field" && (c.update || "").trim()).map(c => `${c.key} = ${sqlOf(parse(c.update, { fields, implicit: false }), "")}`);
        return `UPDATE ${tbl}\nSET ${sets.join(", ")}${where.length ? "\nWHERE " + where[0] : ""};`;
      }
      const sel = cols.filter(c => c.show && c.total !== "where").map(c => {
        let ref = isAgg(c) ? `${fnName[c.total]}(${colRef(c)})` : colRef(c);
        if (c.total === "expr") ref = sqlOf(c.ast, "");
        const nm = c.dispName || c.name;
        const needAs = c.kind === "expr" || isAgg(c) || c.alias;
        return needAs ? `${ref} AS ${/[^\wĂÂÎȘȚăâîșț]/.test(nm) ? "[" + nm + "]" : nm}` : ref;
      });
      const starCols = cols.filter(c => c.starPart);
      let selTxt = sel.join(", ");
      if (starCols.length && starCols.length === cols.filter(c => c.show).length) selTxt = (tables.length === 1 ? "*" : starCols.map(c => c.key).join(", "));
      const group = spec.totals ? cols.filter(c => c.total === "group").map(colRef) : [];
      const order = cols.filter(c => c.sort).map(c => (isAgg(c) ? `${fnName[c.total]}(${colRef(c)})` : colRef(c)) + (c.sort === "Descendent" ? " DESC" : ""));
      let s = `SELECT ${spec.top ? "TOP " + String(spec.top).replace("%", " PERCENT") + " " : ""}${selTxt}\nFROM ${from}`;
      if (where.length) s += `\nWHERE ${where[0]}`;
      if (group.length) s += `\nGROUP BY ${group.join(", ")}`;
      if (having.length) s += `\nHAVING ${having[0]}`;
      if (order.length) s += `\nORDER BY ${order.join(", ")}`;
      return s + ";";
    } catch (e) { return "-- SQL indisponibil pentru această grilă"; }
  }

  /* ---------- Utilitare pentru exerciții ---------- */
  // Compară două rezultate: același număr de coloane și rânduri, aceleași valori
  function sameResult(a, b, ordered) {
    if (!a || !b) return { ok: false, msg: "Interogarea nu a rulat." };
    if (a.columns.length !== b.columns.length) return { ok: false, msg: `Rezultatul are ${a.columns.length} coloane afișate; sunt necesare ${b.columns.length}.` };
    if (a.rows.length !== b.rows.length) return { ok: false, msg: `Rezultatul are ${a.rows.length} înregistrări; ar trebui să aibă ${b.rows.length}.` };
    const norm = (v) => v === null || v === undefined ? "∅" : isDate(v) ? "D" + v.getTime() : typeof v === "number" ? String(Math.round(v * 1000) / 1000) : typeof v === "boolean" ? String(v) : lower(v);
    const key = (r) => r.map(norm).sort().join("|");
    const ka = a.rows.map(key), kb = b.rows.map(key);
    if (ordered) {
      for (let i = 0; i < ka.length; i++) if (ka[i] !== kb[i]) {
        const set = [...kb].sort().join("¦") === [...ka].sort().join("¦");
        return { ok: false, msg: set ? "Înregistrările sunt corecte, dar ordinea nu este cea cerută. Verifică rândul „Sortare”." : `Înregistrarea ${i + 1} nu corespunde cerinței.` };
      }
      return { ok: true };
    }
    const sa = [...ka].sort().join("¦"), sb = [...kb].sort().join("¦");
    return sa === sb ? { ok: true } : { ok: false, msg: "Numărul de înregistrări e bun, dar unele valori diferă. Verifică criteriile și câmpurile alese." };
  }

  // Testează o regulă de validare pe o valoare
  function testRule(rule, value, tip) {
    const ast = parse(rule, { fields: [], implicit: true });
    let v = value;
    if (v === "" || v === null) v = null;
    else if (tip === "Număr" || tip === "Monedă") { const n = toNum(v); if (isNaN(n)) return { ok: false, err: "Valoarea nu este un număr." }; v = n; }
    else if (tip === "Dată/Oră") { const d = safeDate(String(v)); if (!d) return { ok: false, err: "Data nu este validă." }; v = d; }
    const r = evaluate(ast, { row: {}, params: {}, value: v });
    return { ok: r === null ? true : truthy(r) }; // Access acceptă valorile goale (Null) dacă regula nu le exclude explicit
  }

  return { parse, evaluate, run, show, fmt, sameResult, testRule, compare, AccessError, ParamNeeded, tipOf, parseDate, likeToRegex };
})();
