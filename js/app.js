(function () {
  const VV = window.VV;
  const page = document.body.dataset.page || "";

  const PAIRS = {
    eth: { src: "assets/pairs/ETH.svg", brand: "#627EEA" },
    nvda: { src: "assets/pairs/NVDA.svg", brand: "#76B900" },
    spcx: { src: "assets/pairs/SPCX.svg", brand: "#f2f2f2" },
    aapl: { src: "assets/pairs/AAPL.svg", brand: "#f2f2f2" },
    openai: { src: "assets/pairs/OPENAI.svg", brand: "#f2f2f2" },
    anthropic: { src: "assets/pairs/ANTHROPIC.svg", brand: "#e4e0d8" },
    usdg: { src: "assets/pairs/USDG.svg", photo: true },
    vibe: { src: "assets/pairs/vibevibe.webp", photo: true },
    family: { src: "assets/pairs/FAMILY.svg", brand: "#f2c14e" }
  };

  function pairKey(pair) {
    return { ETH: "eth", VIBEVIBE: "vibe", NVDA: "nvda", SPCX: "spcx", AAPL: "aapl", OPENAI: "openai", ANTHROPIC: "anthropic", USDG: "usdg", FAMILY: "family" }[pair] || "eth";
  }

  function mark(name) {
    const p = PAIRS[name] || PAIRS.eth;
    return `<span class="mk${p.photo ? " photo" : ""}" aria-hidden="true"><img src="${p.src}" alt=""/></span>`;
  }

  function fmtChg(n) {
    const sign = n > 0 ? "+" : n < 0 ? "−" : "";
    const abs = Math.abs(n).toFixed(1).replace(/\.0$/, ".0");
    return `${sign}${abs}%`;
  }

  function art(t) {
    if (t.image) return `<img class="logo" src="${t.image}" alt=""/>`;
    const h = t.hue;
    const bg = `hsl(${h} 70% 58%)`;
    const bg2 = `hsl(${(h + 30) % 360} 65% 42%)`;
    const ink = "#14160f";
    const shapes = {
      arrow: `<path d="M30 18h80l-10 18 10 18H30L18 36 30 18Z" fill="${bg2}"/><circle cx="150" cy="120" r="8" fill="#14301c"/><path d="M20 128 C70 120 120 110 170 78" fill="none" stroke="#14301c" stroke-width="4"/>`,
      dog: `<rect x="48" y="40" width="28" height="22" rx="4" fill="#5f6d78"/><rect x="124" y="40" width="28" height="22" rx="4" fill="#5f6d78"/><rect x="58" y="58" width="84" height="78" rx="10" fill="${bg}"/><rect x="70" y="86" width="60" height="18" rx="4" fill="#1b1e22"/><rect x="78" y="118" width="16" height="18" fill="#e07a3d"/><rect x="106" y="118" width="16" height="18" fill="#e07a3d"/>`,
      heart: `<path d="M100 128s-46-28-46-58a26 26 0 0 1 46-16 26 26 0 0 1 46 16c0 30-46 58-46 58Z" fill="${bg2}"/>`,
      face: `<circle cx="100" cy="86" r="46" fill="${bg2}"/><circle cx="84" cy="80" r="6" fill="${ink}"/><circle cx="116" cy="80" r="6" fill="${ink}"/><path d="M84 100c8 10 24 10 32 0" stroke="${ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`,
      bird: `<ellipse cx="100" cy="96" rx="46" ry="36" fill="${bg2}"/><circle cx="128" cy="84" r="8" fill="${ink}"/><path d="M138 90l22 6-22 8" fill="#f2d36b"/><path d="M70 120l-24 16 28-6" fill="${bg}"/>`,
      fox: `<path d="M40 70 L70 40 L90 78 L110 40 L140 70 L150 120 L50 120 Z" fill="${bg2}"/><circle cx="78" cy="96" r="5" fill="${ink}"/><circle cx="118" cy="96" r="5" fill="${ink}"/><path d="M92 108h16l-8 10z" fill="${ink}"/>`,
      house: `<path d="M40 100 L100 48 L160 100 V150 H40 Z" fill="${bg2}"/><rect x="88" y="112" width="24" height="38" fill="#1b1e22"/>`,
      sun: `<circle cx="100" cy="90" r="36" fill="#ffe56a"/><g stroke="#ffe56a" stroke-width="6" stroke-linecap="round">${[0,45,90,135,180,225,270,315].map((a) => {
        const r = a * Math.PI / 180; const x1 = 100 + Math.cos(r) * 48; const y1 = 90 + Math.sin(r) * 48; const x2 = 100 + Math.cos(r) * 64; const y2 = 90 + Math.sin(r) * 64;
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
      }).join("")}</g>`,
      blob: `<ellipse cx="100" cy="96" rx="62" ry="48" fill="${bg2}"/><circle cx="78" cy="90" r="7" fill="${ink}"/><circle cx="120" cy="86" r="7" fill="${ink}"/>`,
      monke: `<circle cx="100" cy="96" r="40" fill="${bg2}"/><circle cx="62" cy="96" r="16" fill="${bg}"/><circle cx="138" cy="96" r="16" fill="${bg}"/><ellipse cx="100" cy="108" rx="16" ry="10" fill="#f2d3b0"/>`,
      chip: `<rect x="48" y="58" width="104" height="72" rx="10" fill="${bg2}"/><rect x="70" y="74" width="60" height="40" rx="4" fill="#101214"/><path d="M48 78H32M48 96H32M48 114H32M152 78h16M152 96h16M152 114h16" stroke="${bg}" stroke-width="4"/>`
    };
    return `<svg class="art" viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="200" height="180" fill="${bg}"/>${shapes[t.style] || shapes.blob}</svg>`;
  }

  function spark(up) {
    const pts = up
      ? "0,28 16,26 32,24 48,22 64,18 80,20 100,8"
      : "0,10 16,14 32,12 48,18 64,16 80,22 100,26";
    const color = up ? "#5bd08a" : "#ef727b";
    return `<svg class="spark" viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
  }

  function shell(active) {
    const item = (href, label, cls, inner) =>
      `<a class="pill${cls || ""}${active === label ? " active" : ""}" href="${href}">${inner || label}</a>`;
    return `
      <a class="skip" href="#main">Skip to main content</a>
      <header class="topbar">
        <a class="brand" href="discover.html" aria-label="vibe/vibe · Discover">
          <img src="assets/logo.svg" alt="" width="28" height="28"/>
          <span class="wordmark">vibe<i>/</i>vibe</span>
        </a>
        <nav class="topnav" aria-label="Primary">
          ${item("discover.html", "Discover")}
          ${item("rankings.html", "Rankings")}
          ${item("guilds.html", "Guilds", "", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3.5 20 7v5c0 4-3.5 6.5-8 8.5C7.5 18.5 4 16 4 12V7l8-3.5Z"/><path d="m12 8 1.2 2.4 2.6.4-1.9 1.8.5 2.6L12 14.1 9.6 15.2l.5-2.6L8.2 10.8l2.6-.4L12 8Z"/></svg>Guilds`)}
          ${item("vibers.html", "vibe vibers", " lower")}
          <a class="plus" href="create.html" aria-label="Launch a token" title="Launch a token"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4.5v15M4.5 12h15"/></svg></a>
        </nav>
        <label class="search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m19.5 19.5-4.4-4.4"/></svg>
          <input class="search-input" placeholder="Search launches, tickers, creators…" aria-label="Search" maxlength="100"/>
          <kbd>Ctrl K</kbd>
          <div class="search-pop" role="listbox"></div>
        </label>
        <div class="top-right">
          <a class="icon-btn top-icons" href="https://testnet.vibevibe.fun/" title="Faucet" aria-label="Get testnet faucet ETH" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3s6 6.2 6 10a6 6 0 0 1-12 0c0-3.8 6-10 6-10Z"/></svg></a>
          <a class="icon-btn top-icons" href="guilds.html" aria-label="Guilds"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg></a>
          <a class="icon-btn top-icons" href="https://testnet.vibevibe.fun/" target="_blank" rel="noreferrer" aria-label="Docs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M7 3.5h7l5 5V20a1.5 1.5 0 0 1-1.5 1.5h-10.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"/><path d="M14 3.5V9h5.5"/></svg></a>
          <a class="icon-btn top-icons" href="https://x.com/2vibefun" target="_blank" rel="noreferrer" aria-label="vibe/vibe on X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.7 10.3 21.4 3h-1.6l-5.8 6.4L9.3 3H3.2l7 10.1L3.2 21h1.6l6.2-6.8L14.7 21h6.1l-7.3-10.7Zm-2.2 2.4-.7-1L5.4 4.2h2.4l4.6 6.4.7 1 6 8.2h-2.4l-4.8-6.7Z"/></svg></a>
          <a class="icon-btn top-icons" href="https://t.me/vibevibe_fun" target="_blank" rel="noreferrer" aria-label="vibe/vibe on Telegram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.7 4.3 2.9 11.1c-1.2.5-1.2 1.1-.2 1.4l4.6 1.4 10.6-6.7c.5-.3 1-.1.6.2l-8.6 7.8-.3 4.6c.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.2-.4-1.8-1.4-1.4Z"/></svg></a>
          <a class="icon-btn top-icons" href="https://discord.com" target="_blank" rel="noreferrer" aria-label="Discord"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.6 5.2A16 16 0 0 0 14.9 4l-.4.8a13 13 0 0 1 3.3 1.2 12 12 0 0 0-11.6 0A13 13 0 0 1 9.5 4L9.1 4a16 16 0 0 0-3.7 1.2C3.2 8.4 2.6 11.5 2.9 14.6A16.4 16.4 0 0 0 8 17l.6-.9a10.6 10.6 0 0 1-1.6-.8l.4-.3c3.2 1.5 6.6 1.5 9.8 0l.4.3a10.6 10.6 0 0 1-1.6.8l.6.9a16.4 16.4 0 0 0 5.1-2.4c.4-3.6-.6-6.7-2.1-9.4ZM9.7 13.2c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.6 1.7-1.5 1.7Zm4.6 0c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7Z"/></svg></a>
          <button class="connect" type="button">Connect wallet</button>
        </div>
      </header>`;
  }

  function tabbar(active) {
    const a = (href, key, label, icon) =>
      `<a href="${href}" class="${active === key ? "on" : ""}">${icon}<span>${label}</span></a>`;
    return `<nav class="tabbar" aria-label="Primary mobile">
      ${a("rankings.html", "Rankings", "Rankings", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V10M10 19V5M16 19v-7M22 19H2"/></svg>`)}
      <button type="button" class="js-search-jump"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m19.5 19.5-4.4-4.4"/></svg><span>Search</span></button>
      ${a("discover.html", "Discover", "Discover", `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z"/></svg>`)}
      ${a("create.html", "Create", "Create", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg>`)}
      ${a("portfolio.html", "Portfolio", "Portfolio", `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></svg>`)}
    </nav>`;
  }

  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2200);
  }

  function walletModal() {
    let scrim = document.querySelector(".scrim");
    if (!scrim) {
      scrim = document.createElement("div");
      scrim.className = "scrim";
      scrim.innerHTML = `
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="wallet-title">
          <h2 id="wallet-title">Connect wallet</h2>
          <p>Robinhood Chain testnet preview. This local copy does not open a real wallet.</p>
          ${[
            ["MetaMask", "#f6851b"],
            ["Rabby", "#7084ff"],
            ["Coinbase Wallet", "#0052ff"],
            ["WalletConnect", "#3b99fc"]
          ].map(([name, color]) => `<button class="wallet" type="button" data-wallet="${name}"><i style="background:${color}">${name[0]}</i>${name}</button>`).join("")}
        </div>`;
      document.body.appendChild(scrim);
      scrim.addEventListener("click", (e) => {
        if (e.target === scrim) scrim.classList.remove("open");
        const w = e.target.closest("[data-wallet]");
        if (w) {
          scrim.classList.remove("open");
          document.querySelectorAll(".connect").forEach((b) => {
            b.textContent = w.dataset.wallet.slice(0, 4) + "…" + "8f2a";
            b.classList.add("on");
          });
          toast("Preview only — no wallet is connected.");
        }
      });
    }
    scrim.classList.add("open");
  }

  function mountChrome() {
    const top = document.getElementById("top");
    const tab = document.getElementById("tab");
    if (top) top.innerHTML = shell(page === "create" ? "Create" : page[0] ? page[0].toUpperCase() + page.slice(1) : "");
    const activeMap = { discover: "Discover", rankings: "Rankings", create: "Create", portfolio: "Portfolio", guilds: "Guilds", vibers: "vibe vibers", token: "Discover" };
    if (top) top.innerHTML = shell(activeMap[page] || "");
    if (tab) tab.innerHTML = tabbar(activeMap[page] || "");
    document.querySelectorAll(".connect").forEach((b) => b.addEventListener("click", walletModal));
    const input = document.querySelector(".search-input");
    const pop = document.querySelector(".search-pop");
    if (!input || !pop) return;
    function renderHits(q) {
      const query = q.trim().toLowerCase();
      const hits = VV.tokens.filter((t) => !query || t.ticker.toLowerCase().includes(query) || t.name.toLowerCase().includes(query) || t.pair.toLowerCase().includes(query)).slice(0, 6);
      pop.innerHTML = hits.length
        ? hits.map((t) => `<a class="search-hit" href="token.html?t=${t.id}">${mark(pairKey(t.pair))}<span><b>$${t.ticker}</b><small>${t.name} · ${t.pair}</small></span><span class="chg ${t.chg >= 0 ? "up" : "down"}">${fmtChg(t.chg)}</span></a>`).join("")
        : `<div class="empty-search">No launches match that.</div>`;
      pop.classList.add("open");
    }
    input.addEventListener("input", () => renderHits(input.value));
    input.addEventListener("focus", () => renderHits(input.value));
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search")) pop.classList.remove("open");
    });
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        input.focus();
        renderHits(input.value);
      }
      if (e.key === "Escape") pop.classList.remove("open");
    });
    document.querySelectorAll(".js-search-jump").forEach((b) => b.addEventListener("click", () => {
      input.closest(".search").classList.add("force");
      input.focus();
      renderHits("");
    }));
  }

  function cardHTML(t, hidden) {
    const up = t.chg >= 0;
    return `<article class="card" data-id="${t.id}" data-pair="${t.pair}" data-progress="${t.progress}" data-change="${t.chg}" data-age="${t.ageN}" data-mcap="${t.mcapN}" data-grad="${t.graduated ? "1" : "0"}" ${hidden ? "hidden" : ""}>
      <a href="token.html?t=${t.id}" aria-label="${t.ticker} — ${t.name}, paired with ${t.pair}">
        <div class="card-media">
          ${art(t)}
          <div class="hover-stat"><span>VOL · 24H<b>${t.vol}</b></span><span>24H<b class="${up ? "up" : "down"}">${fmtChg(t.chg)}</b></span></div>
          ${spark(up)}
        </div>
        <div class="card-body">
          <div class="row1"><span class="ticker">$${t.ticker}</span><span class="mcap"><small>MCAP </small>${t.mcap}<span class="chg-m ${up ? "up" : "down"}">${fmtChg(t.chg)}</span></span></div>
          <div class="row2"><span class="name">${t.name}</span><span class="age">${t.age}</span></div>
          <div class="row3">
            <span class="pair-pill">${mark(pairKey(t.pair))}${t.pair}</span>
            <span class="tax"><i class="mini-tax"><i style="width:${Math.min(t.tax * 18, 100)}%"></i></i>${t.tax}%</span>
          </div>
          <div class="prog">
            <div class="prog-top"><span>${t.progress.toFixed(1)}%</span><span class="go">${t.remain}</span></div>
            <div class="bar ${t.progress >= 100 ? "done" : ""}"><i style="width:${Math.min(t.progress, 100)}%"></i></div>
          </div>
        </div>
      </a>
    </article>`;
  }

  function initDiscover() {
    const row = document.getElementById("pairs");
    const grid = document.getElementById("grid");
    row.innerHTML = VV.pairs.map((p, i) => `
      <button class="pair" type="button" data-pair="${p.id}" aria-pressed="${i === 0 ? "true" : "false"}">
        <span class="marks">${p.marks.map(mark).join("")}</span>
        <span class="count">${p.count}${p.kind ? `<span>${p.kind.toUpperCase()}</span>` : ""}</span>
        <span class="sym">${p.sym}</span>
      </button>`).join("");
    grid.innerHTML = VV.tokens.map((t, i) => cardHTML(t, i >= 8)).join("");
    const shown = () => [...grid.querySelectorAll(".card")].filter((c) => !c.hidden);
    const status = document.getElementById("status");
    function apply() {
      const pair = row.querySelector('[aria-pressed="true"]').dataset.pair;
      const tab = document.querySelector(".tabs .tab[aria-pressed='true']").dataset.tab;
      const minP = Number(document.getElementById("min-progress").value || 0);
      let list = [...grid.querySelectorAll(".card")];
      list.forEach((c) => { c.hidden = false; c.style.order = ""; });
      list = list.filter((c) => {
        const okPair = pair === "all" || c.dataset.pair === pair;
        const okProg = Number(c.dataset.progress) >= minP;
        const grad = c.dataset.grad === "1";
        const okTab = tab === "graduated" ? grad : tab === "final" ? Number(c.dataset.progress) >= 70 && !grad : true;
        return okPair && okProg && okTab;
      });
      grid.querySelectorAll(".card").forEach((c) => { if (!list.includes(c)) c.hidden = true; });
      if (tab === "new") list.sort((a, b) => Number(a.dataset.age) - Number(b.dataset.age));
      if (tab === "movers" || tab === "trending") list.sort((a, b) => Math.abs(Number(b.dataset.change)) - Math.abs(Number(a.dataset.change)));
      if (tab === "final") list.sort((a, b) => Number(b.dataset.progress) - Number(a.dataset.progress));
      list.forEach((c, i) => { c.style.order = i; c.hidden = i >= 8 && document.getElementById("more").dataset.open !== "1"; });
      const visible = list.filter((c) => !c.hidden).length;
      status.textContent = `${visible} of ${list.length} shown`;
      document.getElementById("more").hidden = visible >= list.length;
    }
    row.addEventListener("click", (e) => {
      const btn = e.target.closest(".pair");
      if (!btn) return;
      row.querySelectorAll(".pair").forEach((p) => p.setAttribute("aria-pressed", p === btn ? "true" : "false"));
      apply();
    });
    document.querySelector(".tabs").addEventListener("click", (e) => {
      const btn = e.target.closest(".tab");
      if (!btn) return;
      document.querySelectorAll(".tab").forEach((t) => t.setAttribute("aria-pressed", t === btn ? "true" : "false"));
      apply();
    });
    document.getElementById("filters").addEventListener("click", () => {
      document.getElementById("filter-panel").classList.toggle("open");
    });
    document.getElementById("min-progress").addEventListener("change", apply);
    document.getElementById("more").addEventListener("click", (e) => {
      e.currentTarget.dataset.open = "1";
      apply();
    });
    apply();
  }

  function tokenById(id) {
    return VV.tokens.find((t) => t.id === id) || VV.tokens[1];
  }

  function initToken() {
    const params = new URLSearchParams(location.search);
    const t = tokenById(params.get("t") || "burn");
    document.title = `${t.ticker} · vibe/vibe`;
    document.getElementById("tok-ava").innerHTML = art(t);
    document.getElementById("tok-name").textContent = t.name;
    document.getElementById("tok-ticker").textContent = "$" + t.ticker;
    document.getElementById("tok-pair").textContent = t.pair;
    document.getElementById("tok-price").textContent = t.price;
    document.getElementById("tok-mc").textContent = t.mcap;
    document.getElementById("tok-vol").textContent = t.vol;
    document.getElementById("tok-holders").textContent = t.holders.toLocaleString();
    const chg = document.getElementById("tok-chg");
    chg.textContent = fmtChg(t.chg);
    chg.className = t.chg >= 0 ? "up" : "down";
    document.getElementById("tok-prog").innerHTML = `<div class="prog-top"><span>${t.progress.toFixed(1)}%</span><span class="go">${t.remain}</span></div><div class="bar ${t.progress >= 100 ? "done" : ""}"><i style="width:${Math.min(t.progress, 100)}%"></i></div>`;
    document.getElementById("buy-label").textContent = "Buy " + t.ticker;
    document.getElementById("about-copy").textContent = `${t.name} ($${t.ticker}) is a testnet launch paired with ${t.pair}. Market cap ${t.mcap}. Curve progress ${t.progress.toFixed(1)}%. This page is a local UI copy — nothing here trades real funds.`;
    document.getElementById("wm").textContent = t.ticker;
    const quote = t.pair;
    document.querySelectorAll("[data-quote]").forEach((el) => { el.textContent = quote; });
    document.getElementById("trades").innerHTML = `<table><thead><tr><th>AGE</th><th>SIDE</th><th>WHO</th><th>PRICE USD</th><th>${quote}</th><th>${t.ticker}</th></tr></thead><tbody>
      ${VV.trades.map((r) => `<tr class="${r.side.toLowerCase()}"><td>${r.age}</td><td class="side">${r.side}</td><td>${r.who}</td><td>${r.px}</td><td>${r.quote}</td><td>${r.amt}</td></tr>`).join("")}
    </tbody></table>`;
    document.getElementById("holders").innerHTML = `<table><thead><tr><th>HOLDER</th><th>SHARE</th><th>AMOUNT</th></tr></thead><tbody>
      ${VV.holders.map((h) => `<tr><td>${h.who}</td><td>${h.pct}</td><td>${h.amt}</td></tr>`).join("")}
    </tbody></table>`;
    document.getElementById("top-traders").innerHTML = `<table><thead><tr><th>WALLET</th><th>REALIZED</th><th>BUYS / SELLS</th></tr></thead><tbody>
      ${VV.traders.slice(0, 5).map((r) => `<tr><td>${r.wallet}</td><td class="up">${r.realized}</td><td>${r.bs}</td></tr>`).join("")}
    </tbody></table>`;
    document.querySelectorAll(".trade-tabs button").forEach((btn) => btn.addEventListener("click", () => {
      document.querySelectorAll(".trade-tabs button").forEach((b) => b.classList.toggle("on", b === btn));
      document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("on", p.id === "panel-" + btn.dataset.panel));
    }));
    document.querySelectorAll(".tf").forEach((btn) => btn.addEventListener("click", () => {
      document.querySelectorAll(".tf").forEach((b) => b.classList.toggle("on", b === btn));
    }));
    const buyBtn = document.getElementById("buy-label");
    document.querySelectorAll(".side-toggle button").forEach((btn) => btn.addEventListener("click", () => {
      document.querySelectorAll(".side-toggle button").forEach((b) => b.classList.toggle("on", b === btn));
      const sell = btn.dataset.side === "sell";
      buyBtn.textContent = (sell ? "Sell " : "Buy ") + t.ticker;
      buyBtn.classList.toggle("sell", sell);
    }));
    buyBtn.addEventListener("click", () => toast("Connect a wallet on the real testnet to trade."));
    document.getElementById("connect-trade").addEventListener("click", walletModal);
    document.querySelectorAll(".quick button").forEach((b) => b.addEventListener("click", () => {
      document.getElementById("amt").value = b.dataset.amt;
    }));
    document.querySelectorAll(".copy").forEach((b) => b.addEventListener("click", () => toast("Address copied to the preview clipboard.")));
  }

  function initRankings() {
    const body = document.getElementById("rank-body");
    const side = document.getElementById("rank-side");
    function draw(list) {
      body.innerHTML = list.map((r, i) => `<tr data-i="${VV.traders.indexOf(r)}" class="${i === 0 ? "on" : ""}">
        <td class="no">${r.no}</td><td>${r.wallet}<div style="color:#8a939b;font-size:11px;max-width:180px;white-space:normal">${r.note}</div></td>
        <td>${r.tokens}</td><td>${r.bs}</td><td class="up">${r.realized}</td><td>${r.unreal}</td><td>${r.size}</td>
      </tr>`).join("");
      const first = list[0];
      if (first) show(first);
    }
    function show(r) {
      side.innerHTML = `
        <div class="who"><b>${r.wallet}</b><button class="copy" type="button">copy</button></div>
        <div class="pos">POSITION #${Number(r.no)}</div>
        <div class="pnl-label">All-time realized PnL</div>
        <div class="pnl">${r.pnl}</div>
        <div class="subhead">Portfolio</div>
        <p class="hint">Complete trading history is a preview in this copy.</p>
        <div class="mini-stats">
          <div><b>${r.vol}</b><span>VOLUME · ALL<br>${r.bs} buys / sells</span></div>
          <div><b>${r.win}</b><span>WIN RATE · ALL<br>${r.winN}</span></div>
          <div><b class="up">${r.realizedAll}</b><span>REALIZED · ALL</span></div>
          <div><b>${r.trades}</b><span>TRADES · ALL</span></div>
        </div>`;
      side.querySelector(".copy").addEventListener("click", () => toast(r.full));
    }
    draw(VV.traders);
    body.addEventListener("click", (e) => {
      const tr = e.target.closest("tr");
      if (!tr) return;
      body.querySelectorAll("tr").forEach((row) => row.classList.toggle("on", row === tr));
      show(VV.traders[Number(tr.dataset.i)]);
    });
    document.getElementById("rank-q").addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      draw(VV.traders.filter((r) => r.wallet.toLowerCase().includes(q) || r.full.toLowerCase().includes(q)));
    });
    document.querySelectorAll(".rank-tabs button").forEach((btn) => btn.addEventListener("click", () => {
      document.querySelectorAll(".rank-tabs button").forEach((b) => b.classList.toggle("on", b === btn));
      toast(btn.textContent.trim() + " is a preview of the same board.");
    }));
  }

  function initCreate() {
    let step = 1;
    const views = [...document.querySelectorAll(".step-view")];
    const dots = [...document.querySelectorAll(".steps span")];
    function paint() {
      views.forEach((v) => v.classList.toggle("on", Number(v.dataset.step) === step));
      dots.forEach((d) => d.classList.toggle("on", Number(d.dataset.step) === step));
      document.getElementById("back").disabled = step === 1;
      document.getElementById("next").textContent = step === 4 ? "Launch preview" : "Next →";
    }
    document.getElementById("next").addEventListener("click", () => {
      if (step < 4) { step += 1; paint(); return; }
      const name = document.getElementById("name").value || "Untitled";
      const ticker = (document.getElementById("ticker").value || "VIBE").toUpperCase();
      toast(`${ticker} preview saved locally. Nothing was deployed.`);
      document.getElementById("done").hidden = false;
      document.getElementById("done").innerHTML = `<b>$${ticker}</b> · ${name}<br><span style="color:#8a939b">Paired with ETH · testnet UI only</span>`;
    });
    document.getElementById("back").addEventListener("click", () => { if (step > 1) { step -= 1; paint(); } });
    document.querySelectorAll(".pair-cats button").forEach((btn) => btn.addEventListener("click", () => {
      document.querySelectorAll(".pair-cats button").forEach((b) => b.classList.toggle("on", b === btn));
      const label = btn.dataset.pair || btn.textContent.trim();
      document.getElementById("pair-choice").textContent = label;
      document.getElementById("pair-label").textContent = label;
    }));
    const file = document.getElementById("logo-file");
    document.getElementById("logo-drop").addEventListener("click", () => file.click());
    file.addEventListener("change", () => {
      const f = file.files && file.files[0];
      if (!f) return;
      const url = URL.createObjectURL(f);
      document.getElementById("logo-drop").innerHTML = `<img alt="Token logo preview" src="${url}"/>`;
    });
    const sliders = [...document.querySelectorAll("[data-tax]")];
    function taxes() {
      const vals = sliders.map((s) => Number(s.value));
      const sum = vals.reduce((a, b) => a + b, 0) || 1;
      sliders.forEach((s, i) => {
        const pct = Math.round((vals[i] / sum) * 100);
        s.parentElement.querySelector("output").textContent = pct + "%";
      });
    }
    sliders.forEach((s) => s.addEventListener("input", taxes));
    taxes();
    paint();
  }

  function initGuilds() {
    document.getElementById("guilds").innerHTML = VV.guilds.map((g) => `
      <a class="guild" href="discover.html">
        <span class="gmark" style="background:hsl(${g.hue} 80% 60%)">${g.tag}</span>
        <span><b>${g.name}</b><small>${g.members} members</small></span>
        <span class="meta">${g.vol}<small style="display:block;color:#8a939b">volume</small></span>
      </a>`).join("");
  }

  function initVibers() {
    document.getElementById("vibers").innerHTML = VV.vibers.map((v, i) => `
      <div class="viber"><span class="rank">${String(i + 1).padStart(2, "0")}</span><span><b>${v.name}</b><small style="color:#8a939b;display:block">${v.raids} raids</small></span><span style="margin-left:auto;font-family:var(--mono)">${v.score}</span></div>`).join("");
  }

  function initGate() {
    const box = document.getElementById("legal");
    const copy = {
      user: "The user agreement is the contract for using the testnet app. This local copy does not reproduce that document. Read it on the original site before using the live testnet.",
      privacy: "The privacy policy covers what the live app stores. This HTML fork keeps agreement state in localStorage on your machine and does not send data anywhere.",
      risk: "Testnet tokens have no real-world value. Prices, curves, and rankings on the original site are test activity. This page only copies the interface.",
      eligibility: "The live app restricts some jurisdictions. This preview does not check eligibility and does not connect a wallet."
    };
    document.querySelectorAll(".doc").forEach((btn) => btn.addEventListener("click", () => {
      box.hidden = false;
      box.innerHTML = `<b>${btn.textContent}</b><p>${copy[btn.dataset.doc]}</p><a href="https://testnet.vibevibe.fun/" target="_blank" rel="noreferrer">Open the original site</a>`;
    }));
    document.getElementById("agree").addEventListener("click", () => {
      localStorage.setItem("vv-legal", String(Date.now()));
      location.href = "discover.html";
    });
    document.getElementById("leave").addEventListener("click", () => {
      box.hidden = false;
      box.innerHTML = "<p>You can close this tab. Nothing was accepted.</p>";
    });
  }

  function startSparks() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = document.createElement("canvas");
    canvas.className = "spark-layer";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    const sparks = [];
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);
    let last = 0;
    let running = false;
    window.addEventListener("pointermove", (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const now = performance.now();
      if (now - last < 14) return;
      last = now;
      for (let i = 0; i < 4; i++) {
        const ang = Math.random() * Math.PI * 2;
        const speed = 0.35 + Math.random() * 1.8;
        sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed - 0.6,
          life: 1,
          decay: 0.016 + Math.random() * 0.028,
          r: 0.8 + Math.random() * 2.1,
          color: Math.random() > 0.4 ? "#dff902" : "#5bd08a"
        });
      }
      if (sparks.length > 220) sparks.splice(0, sparks.length - 220);
      if (!running) {
        running = true;
        requestAnimationFrame(frame);
      }
    });
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.015;
        s.vx *= 0.985;
        s.life -= s.decay;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(s.life, 0);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(s.r * s.life, 0.3), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = s.color;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 4, s.y - s.vy * 4);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (sparks.length) requestAnimationFrame(frame);
      else running = false;
    }
  }

  startSparks();

  if (page === "gate") {
    initGate();
    return;
  }
  if (page && page !== "gate") {
    try {
      if (!localStorage.getItem("vv-legal")) {
        location.replace("index.html");
        return;
      }
    } catch (e) {}
  }
  mountChrome();
  if (page === "discover") initDiscover();
  if (page === "token") initToken();
  if (page === "rankings") initRankings();
  if (page === "create") initCreate();
  if (page === "guilds") initGuilds();
  if (page === "vibers") initVibers();
})();
