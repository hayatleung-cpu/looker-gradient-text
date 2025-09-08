/* Gradient Text â€“ DEBUG: shows the style values we receive */
(function () {
  const dscc = window.dscc;

  function renderView(opts, debugText) {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "transparent";
    document.body.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;">
        <div style="
          font-family: Inter, Arial, Helvetica, sans-serif;
          font-size: ${opts.fontSize}px;
          font-weight: 800;
          line-height: 1.1;
          background: linear-gradient(${opts.angle}deg, ${opts.color1}, ${opts.color2});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          text-align: center;
          padding: 8px 12px;
          word-break: break-word;
        ">${opts.title}</div>
        <div style="
          margin-top:8px;
          font: 12px/1.4 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          color:#888;
          background:rgba(0,0,0,0.04);
          padding:6px 8px;
          border-radius:6px;
          max-width:90%;
          text-align:left;
          white-space:pre-wrap;
          word-break:break-word;
        ">${debugText}</div>
      </div>`;
  }

  function pick(obj, path, fallback) {
    try {
      let x = obj;
      for (let k of path) { x = (x && k in x) ? x[k] : undefined; }
      return (x === undefined || x === null || x === "") ? fallback : x;
    } catch { return fallback; }
  }

  function draw(message) {
    // Show exactly what the style payload looks like
    const styleObj = (message && message.style) ? message.style : {};
    const debugText = `style keys: ${Object.keys(styleObj).join(", ") || "(none)"}\n` +
                      `title.value: ${pick(styleObj, ["title","value"], "(missing)")}`;

    // Prefer style.title.value; otherwise fall back to first string style value; then default
    let title = pick(styleObj, ["title","value"], "");
    if (!title) {
      for (const k of Object.keys(styleObj)) {
        if (styleObj[k] && typeof styleObj[k].value === "string" && styleObj[k].value.trim() !== "") {
          title = styleObj[k].value;
          break;
        }
      }
    }
    if (!title) title = "Customer Dashboard";

    const fontSize = Number(pick(styleObj, ["fontSize","value"], 60)) || 60;
    const color1   = pick(styleObj, ["color1","value"], "#ff6600");
    const color2   = pick(styleObj, ["color2","value"], "#ffaa00");
    const angle    = Number(pick(styleObj, ["angle","value"], 90)) || 90;

    renderView({ title, fontSize, color1, color2, angle }, debugText);
  }

  if (dscc && typeof dscc.subscribeToData === "function") {
    // No transform so we also get style-only updates
    dscc.subscribeToData(draw);
  } else {
    draw(null);
  }
})();
