/* Gradient Text – dynamic + robust */
(function () {
  const dscc = window.dscc;

  // Safe access helpers
  function s(obj, path, fallback) {
    try {
      let x = obj;
      for (const k of path) x = (x && k in x) ? x[k] : undefined;
      return (x === undefined || x === null || x === "") ? fallback : x;
    } catch { return fallback; }
  }
  function num(val, fallback) {
    const n = Number(val);
    return Number.isFinite(n) ? n : fallback;
  }

  function render({ title, fontSize, color1, color2, angle }) {
    // reset
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "transparent";
    document.body.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;">
        <div style="
          font-family: Inter, Arial, Helvetica, sans-serif;
          font-size: ${fontSize}px;
          font-weight: 800;
          line-height: 1.1;
          background: linear-gradient(${angle}deg, ${color1}, ${color2});
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          text-align: center;
          padding: 8px 12px;
          word-break: break-word;
        ">${title}</div>
      </div>
    `;
  }

  function draw(message) {
    const style = s(message, ["style"], {});

    // Read style controls (with sensible defaults)
    const title   = s(style, ["title", "value"], "Customer Dashboard");
    const fontSz  = num(s(style, ["fontSize", "value"], 60), 60);
    const color1  = s(style, ["color1", "value"], "#ff6600");
    const color2  = s(style, ["color2", "value"], "#ffaa00");
    const angle   = num(s(style, ["angle", "value"], 90), 90);

    render({ title, fontSize: fontSz, color1, color2, angle });
  }

  // Subscribe without a transform so we also get style-only updates
  if (dscc && typeof dscc.subscribeToData === "function") {
    dscc.subscribeToData(draw);
  } else {
    // Fallback for local testing
    draw(null);
  }
})();
