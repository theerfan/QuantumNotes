/* Interactive surface-code lattice for "2. Architectures for Fault tolerant QC".
   Vanilla JS + SVG, no dependencies. Every <figure class="sc" data-preset=…>
   with a .sc-mount inside gets its own independent lattice.

   Conventions follow the note: a data qubit on every edge; Z-bar is a column
   of Z's along a line of the grid (primal path); X-bar is a row of X's going
   through the lines (dual path, drawn from face to face across the edges it
   acts on). Stabilizers: plaquettes (Z on the edges around a square) and
   stars (X on the edges meeting at a vertex).

   Planar code of distance d: d vertical lines x = 0..d-1, vertices on rows
   y = 1..d-1; the vertical edges stick out at the top (y = 0) and bottom
   (y = d) — the "rough" boundaries where Z strings may end — while the left
   and right lines are the "smooth" boundaries where X strings may end.
   n = d² + (d-1)² qubits, d(d-1) stars + d(d-1) plaquettes, 1 logical qubit.
   Toric code (L = d): periodic in both directions, 2L² qubits, 2 logical
   qubits. */
(function () {
  "use strict";

  var SVGNS = "http://www.w3.org/2000/svg";
  var U = 60; /* viewBox units per lattice spacing */

  /* ---------- small DOM helpers ---------- */

  function h(tag, attrs, parent, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
  }

  function s(tag, attrs, parent) {
    var e = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function show(e, on) {
    if (on) e.removeAttribute("hidden");
    else e.setAttribute("hidden", "");
  }

  function bar(letter, sub) {
    return '<span class="sc-bar">' + letter + "</span>" + (sub ? "<sub>" + sub + "</sub>" : "");
  }

  function plural(n, one, many) {
    return n + " " + (n === 1 ? one : many || one + "s");
  }

  /* ---------- lattice ---------- */

  function Lattice(d, toric) {
    var lat = this;
    lat.d = d;
    lat.toric = toric;
    lat.qubits = [];
    lat.stars = [];
    lat.plaqs = [];
    var index = {};

    function key(kind, x, y) {
      return kind + "," + x + "," + y;
    }
    function q(kind, x, y) {
      if (toric) {
        x = ((x % d) + d) % d;
        y = ((y % d) + d) % d;
      }
      var i = index[key(kind, x, y)];
      return i == null ? -1 : i;
    }
    function addQ(kind, x, y) {
      var Q = { kind: kind, x: x, y: y, primal: [], dual: [], ghost: [] };
      if (kind === "v") {
        Q.primal.push([x, y, x, y + 1]);
        Q.mid = [x, y + 0.5];
        if (toric && x === 0) {
          Q.dual.push([0, y + 0.5, 0.5, y + 0.5], [d - 0.5, y + 0.5, d, y + 0.5]);
          Q.ghost.push([d, y, d, y + 1]);
        } else {
          Q.dual.push([x - 0.5, y + 0.5, x + 0.5, y + 0.5]);
        }
      } else {
        Q.primal.push([x, y, x + 1, y]);
        Q.mid = [x + 0.5, y];
        if (toric && y === 0) {
          Q.dual.push([x + 0.5, 0, x + 0.5, 0.5], [x + 0.5, d - 0.5, x + 0.5, d]);
          Q.ghost.push([x, d, x + 1, d]);
        } else {
          Q.dual.push([x + 0.5, y - 0.5, x + 0.5, y + 0.5]);
        }
      }
      Q.name =
        (kind === "v" ? "vertical" : "horizontal") + " edge at column " + (x + 1) + ", row " + (y + 1);
      index[key(kind, x, y)] = lat.qubits.length;
      lat.qubits.push(Q);
    }
    function clean(list) {
      return list.filter(function (i) {
        return i >= 0;
      });
    }

    var x, y;
    if (!toric) {
      for (x = 0; x < d; x++) for (y = 0; y < d; y++) addQ("v", x, y);
      for (y = 1; y < d; y++) for (x = 0; x < d - 1; x++) addQ("h", x, y);
      for (y = 1; y < d; y++)
        for (x = 0; x < d; x++)
          lat.stars.push({ x: x, y: y, pos: [[x, y]], edges: clean([q("v", x, y - 1), q("v", x, y), q("h", x - 1, y), q("h", x, y)]) });
      for (y = 0; y < d; y++)
        for (x = 0; x < d - 1; x++)
          lat.plaqs.push({ x: x, y: y, edges: clean([q("v", x, y), q("v", x + 1, y), q("h", x, y), q("h", x, y + 1)]) });
      lat.box = [-0.5, 0, d - 0.5, d];
      var c = (d - 1) >> 1;
      var r = (d - 1) >> 1;
      lat.c = c;
      lat.r = r;
      lat.logical = [
        {
          z: range(d).map(function (yy) { return q("v", c, yy); }),
          x: range(d).map(function (xx) { return q("v", xx, r); })
        }
      ];
    } else {
      for (x = 0; x < d; x++) for (y = 0; y < d; y++) addQ("v", x, y);
      for (y = 0; y < d; y++) for (x = 0; x < d; x++) addQ("h", x, y);
      for (y = 0; y < d; y++)
        for (x = 0; x < d; x++) {
          var pos = [[x, y]];
          if (x === 0) pos.push([d, y]);
          if (y === 0) pos.push([x, d]);
          if (x === 0 && y === 0) pos.push([d, d]);
          lat.stars.push({ x: x, y: y, pos: pos, edges: [q("v", x, y - 1), q("v", x, y), q("h", x - 1, y), q("h", x, y)] });
        }
      for (y = 0; y < d; y++)
        for (x = 0; x < d; x++)
          lat.plaqs.push({ x: x, y: y, edges: [q("v", x, y), q("v", x + 1, y), q("h", x, y), q("h", x, y + 1)] });
      lat.box = [0, 0, d, d];
      var ct = (d - 1) >> 1;
      lat.c = ct;
      lat.r = ct;
      lat.logical = [
        {
          z: range(d).map(function (yy) { return q("v", ct, yy); }),
          x: range(d).map(function (xx) { return q("v", xx, ct); })
        },
        {
          z: range(d).map(function (xx) { return q("h", xx, ct); }),
          x: range(d).map(function (yy) { return q("h", ct, yy); })
        }
      ];
    }
    lat.q = q;
    lat.n = lat.qubits.length;

    /* Which qubits each stabilizer is on, as membership lists per qubit. */
    lat.starsOf = lat.qubits.map(function () { return []; });
    lat.plaqsOf = lat.qubits.map(function () { return []; });
    lat.stars.forEach(function (st, i) {
      st.edges.forEach(function (e) { lat.starsOf[e].push(i); });
      st.name = "star (X check) at vertex column " + (st.x + 1) + ", row " + (st.y + 1);
    });
    lat.plaqs.forEach(function (p, i) {
      p.edges.forEach(function (e) { lat.plaqsOf[e].push(i); });
      p.name = "plaquette (Z check) at column " + (p.x + 1) + ", row " + (p.y + 1);
    });

    /* Hit targets in lattice coordinates (ghost copies resolve to the same item). */
    lat.targets = [];
    lat.qubits.forEach(function (Q, i) {
      lat.targets.push({ t: "q", i: i, x: Q.mid[0], y: Q.mid[1] });
      Q.ghost.forEach(function (g) {
        lat.targets.push({ t: "q", i: i, x: (g[0] + g[2]) / 2, y: (g[1] + g[3]) / 2 });
      });
    });
    lat.stars.forEach(function (st, i) {
      st.pos.forEach(function (p) { lat.targets.push({ t: "s", i: i, x: p[0], y: p[1] }); });
    });
    lat.plaqs.forEach(function (p, i) {
      lat.targets.push({ t: "p", i: i, x: p.x + 0.5, y: p.y + 0.5 });
    });
  }

  function range(n) {
    var a = [];
    for (var i = 0; i < n; i++) a.push(i);
    return a;
  }

  function parityOver(bits, list) {
    var p = 0;
    for (var i = 0; i < list.length; i++) p ^= bits[list[i]];
    return p;
  }

  /* ---------- presets ---------- */

  var PRESETS = {
    outline: { d: 5, showZ: true, showX: true, mode: "X" },
    deform: {
      d: 5,
      showZ: true,
      showX: true,
      mode: "Z",
      /* plaquettes multiplied into Z-bar and stars into X-bar (lattice coords) */
      deformZ: [[2, 0], [2, 1], [1, 3], [1, 4]],
      deformX: [[3, 3], [4, 3]]
    },
    syndrome: {
      d: 5,
      showZ: false,
      showX: false,
      mode: "Z",
      chains: true,
      /* a loop S = product of four plaquettes, an open Z string, one X error */
      errorPlaqs: [[1, 1], [2, 1], [1, 2], [2, 2]],
      errorsZ: [["v", 4, 1], ["v", 4, 2]],
      errorsX: [["v", 1, 0], ["v", 2, 0]]
    }
  };

  /* ---------- widget ---------- */

  var uid = 0;

  function Widget(figure) {
    var preset = PRESETS[figure.getAttribute("data-preset")] || PRESETS.outline;
    this.preset = preset;
    this.fig = figure;
    this.mount = figure.querySelector(".sc-mount") || h("div", { class: "sc-mount" }, figure);
    this.id = "sc" + ++uid;
    this.d = preset.d;
    this.toric = false;
    this.pair = 0;
    this.mode = preset.mode || "X";
    this.chains = preset.chains !== false;
    this.p = 0.06;
    this.noise = "depol";
    this.cursor = null;
    this.buildChrome();
    this.rebuild(true);
  }

  Widget.prototype.buildChrome = function () {
    var w = this;
    var m = this.mount;
    m.innerHTML = "";
    var controls = h("div", { class: "sc-controls" }, m);

    function group(label, aria) {
      var g = h("div", { class: "sc-group", role: "group", "aria-label": aria || label }, controls);
      if (label) h("span", { class: "sc-label", "aria-hidden": "true" }, g, label);
      return g;
    }
    function btn(g, html, title, onClick, pressed) {
      var b = h("button", { type: "button", class: "sc-btn", title: title }, g, html);
      if (pressed != null) b.setAttribute("aria-pressed", pressed ? "true" : "false");
      if (title) b.setAttribute("aria-label", title);
      b.addEventListener("click", onClick);
      return b;
    }

    var gMode = group("Tap edge:", "Pauli applied when you tap an edge");
    this.modeBtns = {};
    [["X", "x"], ["Z", "z"], ["Y", "y"]].forEach(function (pair) {
      w.modeBtns[pair[0]] = btn(gMode, '<span class="sc-chip ' + pair[1] + '"></span>' + pair[0],
        "Apply " + pair[0] + " errors when tapping an edge", function () { w.setMode(pair[0]); }, w.mode === pair[0]);
    });

    var gD = group("d =", "Code distance");
    this.dBtns = {};
    [3, 4, 5, 6, 7].forEach(function (d) {
      w.dBtns[d] = btn(gD, String(d), "Distance " + d, function () {
        if (w.d === d) return;
        w.d = d;
        w.rebuild(false);
        w.say("Distance " + d + ": " + w.describeCode());
      }, w.d === d);
    });

    var gB = group("", "Boundary conditions");
    this.planarBtn = btn(gB, "Planar", "Planar code (open boundaries)", function () { w.setToric(false); }, true);
    this.toricBtn = btn(gB, "Toric", "Toric code (periodic boundaries)", function () { w.setToric(true); }, false);

    var gL = group("Show:", "Logical operators");
    this.zBtn = btn(gL, bar("Z"), "Show logical Z-bar", function () { w.toggleLogical("z"); }, false);
    this.xBtn = btn(gL, bar("X"), "Show logical X-bar", function () { w.toggleLogical("x"); }, false);
    this.crossBtn = btn(gL, bar("X") + bar("Z") + " = \u2212" + bar("Z") + bar("X") + "?",
      "Check that X-bar and Z-bar anticommute", function () { w.checkCrossing(); });
    this.chainBtn = btn(gL, "Chains", "Show error chains", function () {
      w.chains = !w.chains;
      w.render();
      w.say(w.chains ? "Error chains shown: Z errors along the lines, X errors through them." : "Error chains hidden (only the error badges are shown).");
    }, this.chains);

    this.pairGroup = group("Logical qubit:", "Which logical qubit of the torus");
    this.pairBtns = [1, 2].map(function (k) {
      return btn(w.pairGroup, String(k), "Logical qubit " + k, function () { w.setPair(k - 1); }, k === 1);
    });

    var gR = group("", "Noise and reset");
    var pid = this.id + "-p";
    h("label", { for: pid, class: "sc-label" }, gR, "p");
    this.range = h("input", { id: pid, class: "sc-range", type: "range", min: "0", max: "0.3", step: "0.01", value: String(this.p), "aria-label": "Error rate p" }, gR);
    this.pval = h("span", { class: "sc-pval", "aria-hidden": "true" }, gR);
    this.range.addEventListener("input", function () {
      w.p = parseFloat(w.range.value) || 0;
      w.pval.textContent = w.p.toFixed(2);
    });
    this.pval.textContent = this.p.toFixed(2);
    this.noiseSel = h("select", { class: "sc-select", "aria-label": "Noise type" }, gR,
      '<option value="depol">X, Y, Z (p/3 each)</option><option value="x">X only</option><option value="z">Z only</option>');
    this.noiseSel.addEventListener("change", function () { w.noise = w.noiseSel.value; });
    btn(gR, "Random errors", "Replace the errors with random errors at rate p", function () { w.randomize(); });
    btn(gR, "Reset", "Clear errors and restore the straight logical operators", function () {
      w.rebuild(false);
      w.say("Reset: no errors, straight " + bar("Z") + " and " + bar("X") + ".");
    });

    this.stage = h("div", { class: "sc-stage" }, m);
    this.svg = s("svg", {
      class: "sc-svg",
      tabindex: "0",
      role: "application",
      "aria-roledescription": "surface code lattice",
      "aria-describedby": this.id + "-help"
    }, this.stage);
    h("p", { id: this.id + "-help", class: "sc-sr" }, m,
      "Arrow keys move between qubits, stars and plaquettes; Enter or Space applies the selected Pauli to a qubit, or multiplies in the stabilizer under the cursor. Keys X, Y and Z pick the Pauli.");

    var readout = h("div", { class: "sc-readout" }, m);
    this.stateLine = h("div", { class: "sc-state" }, readout);
    this.actionLine = h("div", { class: "sc-action", "aria-live": "polite" }, readout);

    h("div", { class: "sc-legend", "aria-hidden": "true" }, m,
      '<span><svg viewBox="0 0 22 14"><line x1="1" y1="7" x2="21" y2="7" stroke="var(--sc-z)" stroke-width="3"/></svg>Z error</span>' +
      '<span><svg viewBox="0 0 22 14"><line x1="1" y1="7" x2="21" y2="7" stroke="var(--sc-x)" stroke-width="3" stroke-dasharray="6 3"/></svg>X error (through the line)</span>' +
      '<span><svg viewBox="0 0 22 14"><line x1="1" y1="7" x2="21" y2="7" stroke="var(--sc-z)" stroke-opacity=".35" stroke-width="9" stroke-linecap="round"/></svg>' + bar("Z") + '</span>' +
      '<span><svg viewBox="0 0 22 14"><line x1="1" y1="7" x2="21" y2="7" stroke="var(--sc-x)" stroke-opacity=".35" stroke-width="9" stroke-linecap="round"/></svg>' + bar("X") + '</span>' +
      '<span><svg viewBox="0 0 22 14"><rect x="4" y="1" width="14" height="12" rx="2" fill="var(--sc-def)" fill-opacity=".32" stroke="var(--sc-def)" stroke-width="1.5"/></svg>violated plaquette</span>' +
      '<span><svg viewBox="0 0 22 14"><circle cx="11" cy="7" r="5" fill="var(--sc-def)"/></svg>violated star</span>');

    this.svg.addEventListener("mousedown", function (ev) {
      ev.preventDefault(); /* keyboard focus only: no focus ring on clicks */
    });
    this.svg.addEventListener("pointerdown", function () {
      w.lastPointer = Date.now();
      w.kbd = false;
      show(w.cursorEl, false);
    });
    this.svg.addEventListener("click", function (ev) { w.onTap(ev); });
    this.svg.addEventListener("pointermove", function (ev) { w.onHover(ev); });
    this.svg.addEventListener("pointerleave", function () { w.setHover(null); });
    this.svg.addEventListener("keydown", function (ev) { w.onKey(ev); });
    this.svg.addEventListener("focus", function () {
      if (Date.now() - (w.lastPointer || 0) < 600) return; /* focused by a tap/click */
      w.kbd = true;
      if (!w.cursor) w.cursor = w.lat.targets[0];
      w.drawCursor();
    });
    this.svg.addEventListener("blur", function () { show(w.cursorEl, false); });
  };

  Widget.prototype.describeCode = function () {
    var L = this.lat;
    return (L.toric ? "toric" : "planar") + " code, " + L.n + " data qubits, " + L.stars.length + " stars, " +
      L.plaqs.length + " plaquettes, " + (L.toric ? "2 logical qubits" : "1 logical qubit") + ".";
  };

  /* Fresh lattice (distance / boundary change, reset); the preset's
     extras apply only on first load. */
  Widget.prototype.rebuild = function (first) {
    var P = this.preset;
    var L = (this.lat = new Lattice(this.d, this.toric));
    this.ex = new Uint8Array(L.n);
    this.ez = new Uint8Array(L.n);
    this.cursor = null;
    if (first) {
      this.showZ = !!P.showZ;
      this.showX = !!P.showX;
    }
    this.resetLogicals();
    if (first && !this.toric && this.d === P.d) {
      var w = this;
      (P.deformZ || []).forEach(function (c) { w.mulPlaq(w.plaqAt(c[0], c[1]), "logical"); });
      (P.deformX || []).forEach(function (c) { w.mulStar(w.starAt(c[0], c[1]), "logical"); });
      (P.errorPlaqs || []).forEach(function (c) { w.mulPlaq(w.plaqAt(c[0], c[1]), "error"); });
      (P.errorsZ || []).forEach(function (e) { var i = L.q(e[0], e[1], e[2]); if (i >= 0) w.ez[i] ^= 1; });
      (P.errorsX || []).forEach(function (e) { var i = L.q(e[0], e[1], e[2]); if (i >= 0) w.ex[i] ^= 1; });
    }
    this.draw();
    this.render();
    if (first) {
      var msg = "Tap an edge to apply " + this.mode + ". Tap a square (plaquette) or dot (star) to multiply in that stabilizer.";
      this.actionLine.innerHTML = msg;
    }
  };

  Widget.prototype.resetLogicals = function () {
    var L = this.lat;
    var pair = L.logical[Math.min(this.pair, L.logical.length - 1)];
    this.lz = new Uint8Array(L.n);
    this.lx = new Uint8Array(L.n);
    pair.z.forEach(function (i) { this.lz[i] = 1; }, this);
    pair.x.forEach(function (i) { this.lx[i] = 1; }, this);
    this.defZ = new Uint8Array(L.plaqs.length);
    this.defX = new Uint8Array(L.stars.length);
  };

  Widget.prototype.plaqAt = function (x, y) {
    var ps = this.lat.plaqs;
    for (var i = 0; i < ps.length; i++) if (ps[i].x === x && ps[i].y === y) return i;
    return -1;
  };
  Widget.prototype.starAt = function (x, y) {
    var ss = this.lat.stars;
    for (var i = 0; i < ss.length; i++) if (ss[i].x === x && ss[i].y === y) return i;
    return -1;
  };

  /* ---------- drawing ---------- */

  function pathOf(segs, ox, oy) {
    return segs
      .map(function (g) {
        return "M" + (g[0] * U + ox) + " " + (g[1] * U + oy) + "L" + (g[2] * U + ox) + " " + (g[3] * U + oy);
      })
      .join("");
  }

  Widget.prototype.draw = function () {
    var w = this;
    var L = this.lat;
    var svg = this.svg;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var pad = 0.55;
    var b = L.box;
    var ox = (pad - b[0]) * U;
    var oy = (pad - b[1] + 0.35) * U;
    this.ox = ox;
    this.oy = oy;
    var W = (b[2] - b[0] + 2 * pad) * U;
    var H = (b[3] - b[1] + 2 * pad + 0.35) * U;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    /* bigger lattices are drawn smaller: thicken marks and text to match */
    var k = (this.k = Math.max(0.9, Math.min(1.35, L.d / 5)));
    svg.style.setProperty("--k", String(k));
    svg.setAttribute("aria-label",
      "Surface code lattice, " + (L.toric ? "toric" : "planar") + ", distance " + L.d + ". " + this.describeCode());
    var title = s("title", null, svg);
    title.textContent = "Surface code lattice (distance " + L.d + ")";

    function X(v) { return v * U + ox; }
    function Y(v) { return v * U + oy; }

    var gPlaq = s("g", null, svg);
    var gLat = s("g", null, svg);
    var gBand = s("g", null, svg);
    var gChain = s("g", null, svg);
    var gRing = s("g", null, svg);
    var gStar = s("g", null, svg);
    var gQ = s("g", null, svg);
    var gFlash = s("g", null, svg);
    var gTop = s("g", null, svg);

    var inset = 0.12;
    this.plaqEls = L.plaqs.map(function (p) {
      return s("rect", { class: "plaq", x: X(p.x + inset), y: Y(p.y + inset), width: (1 - 2 * inset) * U, height: (1 - 2 * inset) * U, rx: 6 }, gPlaq);
    });

    L.qubits.forEach(function (Q) {
      s("path", { class: "lat", d: pathOf(Q.primal, ox, oy) }, gLat);
      if (Q.ghost.length) s("path", { class: "lat ghost", d: pathOf(Q.ghost, ox, oy) }, gLat);
    });
    if (!L.toric) {
      /* rough boundaries: open ends of the vertical edges */
      for (var x = 0; x < L.d; x++) {
        s("circle", { class: "bnd-dangling", cx: X(x), cy: Y(0), r: 3.5 * k }, gLat);
        s("circle", { class: "bnd-dangling", cx: X(x), cy: Y(L.d), r: 3.5 * k }, gLat);
      }
    }

    this.bandZ = [];
    this.bandX = [];
    this.chainZ = [];
    this.chainX = [];
    this.rings = [];
    this.qdots = [];
    this.badges = [];
    L.qubits.forEach(function (Q) {
      var prim = Q.primal.concat(Q.ghost);
      w.bandZ.push(s("path", { class: "band z", d: pathOf(prim, ox, oy), hidden: "" }, gBand));
      w.bandX.push(s("path", { class: "band x", d: pathOf(Q.dual, ox, oy), hidden: "" }, gBand));
      w.chainZ.push(s("path", { class: "chain z", d: pathOf(prim, ox, oy), hidden: "" }, gChain));
      w.chainX.push(s("path", { class: "chain x", d: pathOf(Q.dual, ox, oy), hidden: "" }, gChain));
      w.rings.push(s("circle", { class: "ring", cx: X(Q.mid[0]), cy: Y(Q.mid[1]), r: 15 * k, hidden: "" }, gRing));
      w.qdots.push(s("circle", { class: "qdot", cx: X(Q.mid[0]), cy: Y(Q.mid[1]), r: 4.5 * k }, gQ));
      var bg = s("g", { class: "badge", hidden: "" }, gQ);
      s("circle", { cx: X(Q.mid[0]), cy: Y(Q.mid[1]), r: 10 * k }, bg);
      var t = s("text", { x: X(Q.mid[0]), y: Y(Q.mid[1]) }, bg);
      w.badges.push({ g: bg, t: t });
    });

    this.starEls = L.stars.map(function (st) {
      return st.pos.map(function (p, j) {
        return s("circle", { class: "star" + (j ? " ghost" : ""), cx: X(p[0]), cy: Y(p[1]), r: 5 * k }, gStar);
      });
    });

    this.flashG = gFlash;

    /* operator labels, as on the board */
    this.lblZ = s("text", { class: "lbl z" }, gTop);
    this.lblX = s("text", { class: "lbl x" }, gTop);
    this.cursorEl = s("circle", { class: "cursor", r: 13, hidden: "" }, gTop);
    this.hoverEl = s("circle", { class: "hover", r: 12, hidden: "" }, gTop);
  };

  Widget.prototype.render = function () {
    var w = this;
    var L = this.lat;
    var starV = this.starViol = L.stars.map(function (st) { return parityOver(w.ez, st.edges); });
    var plaqV = this.plaqViol = L.plaqs.map(function (p) { return parityOver(w.ex, p.edges); });
    var crossing = 0;
    for (var i = 0; i < L.n; i++) {
      var x = this.ex[i], z = this.ez[i];
      show(this.chainZ[i], this.chains && z);
      show(this.chainX[i], this.chains && x);
      show(this.bandZ[i], this.showZ && this.lz[i]);
      show(this.bandX[i], this.showX && this.lx[i]);
      var cross = this.showZ && this.showX && this.lz[i] && this.lx[i];
      if (this.lz[i] && this.lx[i]) crossing++;
      show(this.rings[i], cross);
      var b = this.badges[i];
      if (x || z) {
        var P = x && z ? "Y" : x ? "X" : "Z";
        b.g.setAttribute("class", "badge " + P.toLowerCase());
        b.t.textContent = P;
        show(b.g, true);
      } else {
        show(b.g, false);
      }
    }
    this.crossing = crossing;
    this.plaqEls.forEach(function (el, i) { el.setAttribute("class", plaqV[i] ? "plaq viol" : "plaq"); });
    this.starEls.forEach(function (els, i) {
      els.forEach(function (el, k) { el.setAttribute("class", "star" + (k ? " ghost" : "") + (starV[i] ? " viol" : "")); });
    });

    /* labels at the ends of the logical strings */
    var sub = L.toric ? String(this.pair + 1) : "";
    /* Z-bar of the planar code / torus qubit 1 runs top to bottom, X-bar left
       to right; torus qubit 2 is the same picture turned by 90 degrees. */
    var turned = L.toric && this.pair === 1;
    this.placeLabel(this.lblZ, this.showZ, this.lz, "z", sub, turned ? "left" : "top");
    this.placeLabel(this.lblX, this.showX, this.lx, "x", sub, turned ? "top" : "left");

    /* buttons */
    for (var k in this.modeBtns) this.modeBtns[k].setAttribute("aria-pressed", String(this.mode === k));
    for (var dd in this.dBtns) this.dBtns[dd].setAttribute("aria-pressed", String(this.d === +dd));
    this.planarBtn.setAttribute("aria-pressed", String(!this.toric));
    this.toricBtn.setAttribute("aria-pressed", String(this.toric));
    this.zBtn.setAttribute("aria-pressed", String(this.showZ));
    this.xBtn.setAttribute("aria-pressed", String(this.showX));
    this.chainBtn.setAttribute("aria-pressed", String(this.chains));
    show(this.pairGroup, this.toric);
    this.pairBtns.forEach(function (b, k) { b.setAttribute("aria-pressed", String(w.pair === k)); });

    this.stateLine.innerHTML = this.stateText();
    if (this.cursor && this.kbd && document.activeElement === this.svg) this.drawCursor();
  };

  Widget.prototype.placeLabel = function (el, on, bits, kind, sub, side) {
    var L = this.lat;
    show(el, on);
    if (!on) return;
    var best = null;
    for (var i = 0; i < L.n; i++) {
      if (!bits[i]) continue;
      var Q = L.qubits[i];
      var segs = kind === "z" ? Q.primal : Q.dual;
      segs.forEach(function (g) {
        /* topmost (or leftmost) end of the string */
        var top = side === "top";
        var cand = top
          ? (g[1] < g[3] ? [g[0], g[1]] : [g[2], g[3]])
          : (g[0] < g[2] ? [g[0], g[1]] : [g[2], g[3]]);
        if (!best || (top ? cand[1] < best[1] || (cand[1] === best[1] && cand[0] < best[0]) : cand[0] < best[0] || (cand[0] === best[0] && cand[1] < best[1]))) best = cand;
      });
    }
    if (!best) { show(el, false); return; }
    var px = best[0] * U + this.ox, py = best[1] * U + this.oy;
    if (side === "top") { py -= 0.42 * U; if (kind === "x") px += 0.28 * U; }
    else { px -= 0.32 * U; py -= 0.32 * U; }
    el.setAttribute("x", px);
    el.setAttribute("y", py);
    el.textContent = "";
    var t1 = s("tspan", null, el);
    t1.textContent = kind === "z" ? "Z\u0304" : "X\u0304";
    if (sub) {
      var t2 = s("tspan", { "baseline-shift": "sub", "font-size": "70%" }, el);
      t2.textContent = sub;
    }
  };

  /* ---------- state text ---------- */

  Widget.prototype.stateText = function () {
    var L = this.lat;
    var nerr = 0, i;
    for (i = 0; i < L.n; i++) if (this.ex[i] || this.ez[i]) nerr++;
    var ns = this.starViol.reduce(function (a, b) { return a + b; }, 0);
    var np = this.plaqViol.reduce(function (a, b) { return a + b; }, 0);
    var parts = [];
    if (!nerr) {
      parts.push("No errors \u00b7 no checks violated.");
    } else {
      parts.push("Errors on " + plural(nerr, "qubit") + " \u00b7 syndrome: " +
        (ns + np === 0 ? "none" : '<span class="sc-td">' + plural(ns, "star") + ", " + plural(np, "plaquette") + "</span> violated") + ".");
      if (ns + np === 0) parts.push(this.logicalClass());
    }
    if (this.showZ && this.showX) {
      var k = this.crossing;
      var nz = 0, nx = 0;
      for (i = 0; i < L.n; i++) { nz += this.lz[i]; nx += this.lx[i]; }
      parts.push("<br>" + bar("Z") + " (" + nz + " qubits) and " + bar("X") + " (" + nx + " qubits) share " +
        plural(k, "qubit") + " \u21d2 (\u22121)<sup>" + k + "</sup> = " + (k % 2 ? "\u22121: they anticommute." : "+1: they commute."));
    }
    return parts.join(" ");
  };

  /* Logical action of a syndrome-free error, read off from its overlap with
     the straight logical operators of the conjugate type. */
  Widget.prototype.logicalClass = function () {
    var L = this.lat;
    var w = this;
    var acts = [];
    L.logical.forEach(function (pair, k) {
      var sub = L.toric ? String(k + 1) : "";
      var hasZ = parityOver(w.ez, pair.x);
      var hasX = parityOver(w.ex, pair.z);
      if (hasX && hasZ) acts.push(bar("Y", sub));
      else if (hasX) acts.push(bar("X", sub));
      else if (hasZ) acts.push(bar("Z", sub));
    });
    if (!acts.length) return "It is a product of stabilizers (closed loops), so it acts trivially: harmless.";
    return '<span class="sc-td">Undetectable logical error:</span> it acts as ' + acts.join(" \u00b7 ") +
      " (a string stretching across the lattice).";
  };

  Widget.prototype.say = function (html) {
    this.actionLine.innerHTML = html;
  };

  /* ---------- actions ---------- */

  Widget.prototype.setMode = function (m) {
    this.mode = m;
    this.render();
    this.say("Tapping an edge now applies " + m + ".");
  };

  Widget.prototype.setToric = function (t) {
    if (this.toric === t) return;
    this.toric = t;
    this.pair = 0;
    this.rebuild(false);
    this.say((t ? "Toric code: top is glued to bottom and left to right (dashed lines are copies of the first row/column). " : "Planar code: Z strings end on the top/bottom (open edge ends), X strings on the left/right. ") + this.describeCode());
  };

  Widget.prototype.setPair = function (k) {
    if (this.pair === k) return;
    this.pair = k;
    this.resetLogicals();
    this.render();
    this.say("Showing logical qubit " + (k + 1) + ": " + bar("Z", String(k + 1)) + " " +
      (k ? "runs around the torus horizontally" : "runs around the torus vertically") + ", " + bar("X", String(k + 1)) + " crosses it once.");
  };

  Widget.prototype.toggleLogical = function (kind) {
    if (kind === "z") this.showZ = !this.showZ;
    else this.showX = !this.showX;
    this.render();
    var on = kind === "z" ? this.showZ : this.showX;
    var L = kind === "z" ? "Z" : "X";
    this.say(on
      ? bar(L) + " shown. Tap a " + (kind === "z" ? "square (plaquette)" : "dot (star)") + " to multiply it into " + bar(L) + " and deform the string."
      : bar(L) + " hidden. Tapping a " + (kind === "z" ? "square" : "dot") + " now multiplies that stabilizer into the errors instead.");
  };

  Widget.prototype.checkCrossing = function () {
    this.showZ = true;
    this.showX = true;
    this.render();
    var k = this.crossing;
    this.say("Ringed: the " + plural(k, "qubit") + " where " + bar("X") + " meets " + bar("Z") + ". Each contributes XZ = \u2212ZX, everywhere else one of them is I, so " +
      bar("X") + bar("Z") + " = (\u22121)<sup>" + k + "</sup> " + bar("Z") + bar("X") + " = " + (k % 2 ? "\u2212" : "+") + bar("Z") + bar("X") + ".");
  };

  Widget.prototype.applyPauli = function (i) {
    var m = this.mode;
    if (m === "X" || m === "Y") this.ex[i] ^= 1;
    if (m === "Z" || m === "Y") this.ez[i] ^= 1;
    this.render();
    var L = this.lat;
    var Q = L.qubits[i];
    var now = this.ex[i] && this.ez[i] ? "Y" : this.ex[i] ? "X" : this.ez[i] ? "Z" : "no error";
    var flips = [];
    if (m !== "X") flips.push(plural(L.starsOf[i].length, "star"));
    if (m !== "Z") flips.push(plural(L.plaqsOf[i].length, "plaquette"));
    this.say("Applied " + m + " to the " + Q.name + " (now: " + now + "). It flips the " + flips.join(" and ") + " touching it.");
  };

  /* Multiply a plaquette (Z on its edges) into Z-bar ("logical") or the errors. */
  Widget.prototype.mulPlaq = function (pi, target) {
    if (pi < 0) return;
    var p = this.lat.plaqs[pi];
    var arr = target === "logical" ? this.lz : this.ez;
    p.edges.forEach(function (e) { arr[e] ^= 1; });
    if (target === "logical") this.defZ[pi] ^= 1;
  };
  Widget.prototype.mulStar = function (si, target) {
    if (si < 0) return;
    var st = this.lat.stars[si];
    var arr = target === "logical" ? this.lx : this.ex;
    st.edges.forEach(function (e) { arr[e] ^= 1; });
    if (target === "logical") this.defX[si] ^= 1;
  };

  /* Does the (deformed) logical still commute with every stabilizer? */
  Widget.prototype.logicalOk = function (kind) {
    var L = this.lat, w = this, bad = 0;
    if (kind === "z") L.stars.forEach(function (st) { bad += parityOver(w.lz, st.edges); });
    else L.plaqs.forEach(function (p) { bad += parityOver(w.lx, p.edges); });
    return bad === 0;
  };

  Widget.prototype.tapStabilizer = function (t) {
    var L = this.lat;
    var isPlaq = t.t === "p";
    var toLogical = isPlaq ? this.showZ : this.showX;
    var item = isPlaq ? L.plaqs[t.i] : L.stars[t.i];
    if (isPlaq) this.mulPlaq(t.i, toLogical ? "logical" : "error");
    else this.mulStar(t.i, toLogical ? "logical" : "error");
    this.flash(item, isPlaq);
    this.render();
    var Lt = isPlaq ? "Z" : "X";
    var count = (isPlaq ? this.defZ : this.defX).reduce(function (a, b) { return a + b; }, 0);
    if (toLogical) {
      var ok = this.logicalOk(isPlaq ? "z" : "x");
      var msg = "Multiplied the " + item.name + " into " + bar(Lt) + ". Now " + bar(Lt) + " = (straight " + bar(Lt) + ") \u00b7 S, with S a product of " +
        plural(count, isPlaq ? "plaquette" : "star") + ". " + (ok ? "It still commutes with every stabilizer, so it is still a valid " + bar(Lt) + "." : "It no longer commutes with every stabilizer!");
      if (this.showZ && this.showX) msg += " Crossings with " + bar(isPlaq ? "X" : "Z") + ": " + this.crossing + " (odd).";
      this.say(msg);
    } else {
      this.say("Multiplied the " + item.name + " into the errors (" + Lt + " on its " + item.edges.length +
        " edges). The syndrome is unchanged: a stabilizer acts trivially on the code. Show " + bar(Lt) + " to deform it instead.");
    }
  };

  Widget.prototype.flash = function (item, isPlaq) {
    var g = this.flashG;
    while (g.firstChild) g.removeChild(g.firstChild);
    var ox = this.ox, oy = this.oy;
    var el;
    if (isPlaq) {
      el = s("rect", { class: "flash", x: item.x * U + ox + 4, y: item.y * U + oy + 4, width: U - 8, height: U - 8, rx: 6 }, g);
    } else {
      var p = item.pos[0];
      el = s("circle", { class: "flash", cx: p[0] * U + ox, cy: p[1] * U + oy, r: 0.42 * U }, g);
    }
    clearTimeout(this.flashTimer);
    this.flashTimer = setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 700);
  };

  Widget.prototype.randomize = function () {
    var L = this.lat;
    this.ex = new Uint8Array(L.n);
    this.ez = new Uint8Array(L.n);
    var p = this.p, n = 0;
    for (var i = 0; i < L.n; i++) {
      var r = Math.random();
      if (r >= p) continue;
      n++;
      var kind = this.noise === "x" ? "X" : this.noise === "z" ? "Z" : ["X", "Y", "Z"][Math.min(2, Math.floor((r / p) * 3))];
      if (kind !== "Z") this.ex[i] = 1;
      if (kind !== "X") this.ez[i] = 1;
    }
    this.render();
    this.say("Random errors at p = " + p.toFixed(2) + ": " + plural(n, "qubit") + " hit (expected \u2248 " + (p * L.n).toFixed(1) + " of " + L.n + "). Lit checks mark the ends of the error chains.");
  };

  /* ---------- input ---------- */

  Widget.prototype.toLattice = function (ev) {
    var pt = this.svg.createSVGPoint();
    pt.x = ev.clientX;
    pt.y = ev.clientY;
    var m = this.svg.getScreenCTM();
    if (!m) return null;
    var p = pt.matrixTransform(m.inverse());
    return [(p.x - this.ox) / U, (p.y - this.oy) / U];
  };

  Widget.prototype.nearest = function (pos) {
    if (!pos) return null;
    var best = null, bd = 1e9;
    this.lat.targets.forEach(function (t) {
      var dx = t.x - pos[0], dy = t.y - pos[1];
      var dd = dx * dx + dy * dy;
      if (dd < bd) { bd = dd; best = t; }
    });
    return bd <= 0.5 * 0.5 ? best : null;
  };

  Widget.prototype.activate = function (t) {
    if (!t) return;
    if (t.t === "q") this.applyPauli(t.i);
    else this.tapStabilizer(t);
  };

  Widget.prototype.onTap = function (ev) {
    var t = this.nearest(this.toLattice(ev));
    if (!t) return;
    this.cursor = t;
    this.kbd = false;
    this.activate(t);
  };

  Widget.prototype.onHover = function (ev) {
    if (ev.pointerType && ev.pointerType !== "mouse") return;
    this.setHover(this.nearest(this.toLattice(ev)));
  };

  Widget.prototype.setHover = function (t) {
    if (!this.hoverEl) return;
    if (!t) { show(this.hoverEl, false); return; }
    this.hoverEl.setAttribute("cx", t.x * U + this.ox);
    this.hoverEl.setAttribute("cy", t.y * U + this.oy);
    this.hoverEl.setAttribute("r", t.t === "p" ? 0.36 * U : t.t === "s" ? 11 : 13);
    show(this.hoverEl, true);
  };

  Widget.prototype.drawCursor = function () {
    var t = this.cursor;
    if (!t) return;
    this.cursorEl.setAttribute("cx", t.x * U + this.ox);
    this.cursorEl.setAttribute("cy", t.y * U + this.oy);
    this.cursorEl.setAttribute("r", t.t === "p" ? 0.4 * U : 14);
    show(this.cursorEl, true);
  };

  Widget.prototype.describeTarget = function (t) {
    var L = this.lat;
    if (t.t === "q") {
      var x = this.ex[t.i], z = this.ez[t.i];
      return "Qubit, " + L.qubits[t.i].name + ": " + (x && z ? "Y error" : x ? "X error" : z ? "Z error" : "no error") +
        (this.lz[t.i] && this.showZ ? ", on Z-bar" : "") + (this.lx[t.i] && this.showX ? ", on X-bar" : "") + ".";
    }
    if (t.t === "s") return "Star (X check) at vertex column " + (L.stars[t.i].x + 1) + ", row " + (L.stars[t.i].y + 1) + ": " + (this.starViol[t.i] ? "violated" : "satisfied") + ".";
    return "Plaquette (Z check) at column " + (L.plaqs[t.i].x + 1) + ", row " + (L.plaqs[t.i].y + 1) + ": " + (this.plaqViol[t.i] ? "violated" : "satisfied") + ".";
  };

  Widget.prototype.onKey = function (ev) {
    var k = ev.key;
    var up = k.toUpperCase();
    this.kbd = true;
    if (up === "X" || up === "Y" || up === "Z") {
      if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
      ev.preventDefault();
      this.setMode(up);
      return;
    }
    var dirs = { ArrowLeft: [-0.5, 0], ArrowRight: [0.5, 0], ArrowUp: [0, -0.5], ArrowDown: [0, 0.5] };
    if (dirs[k]) {
      ev.preventDefault();
      var c = this.cursor || this.lat.targets[0];
      var dir = dirs[k];
      var best = null, bd = 1e9;
      this.lat.targets.forEach(function (t) {
        var dx = t.x - c.x, dy = t.y - c.y;
        var along = dx * dir[0] * 2 + dy * dir[1] * 2;
        if (along <= 0.01) return;
        var across = Math.abs(dir[0] ? dy : dx);
        var score = along + across * 2.5;
        if (score < bd) { bd = score; best = t; }
      });
      if (best) {
        this.cursor = best;
        this.drawCursor();
        this.say(this.describeTarget(best));
      }
      return;
    }
    if (k === "Enter" || k === " ") {
      ev.preventDefault();
      if (!this.cursor) this.cursor = this.lat.targets[0];
      this.activate(this.cursor);
      this.drawCursor();
    }
  };

  /* ---------- boot ---------- */

  function boot() {
    var figs = document.querySelectorAll("figure.sc[data-preset]");
    window.surfaceCodeWidgets = [];
    for (var i = 0; i < figs.length; i++) {
      try {
        window.surfaceCodeWidgets.push(new Widget(figs[i]));
      } catch (e) {
        if (window.console) console.error("surface-code-lattice:", e);
      }
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
