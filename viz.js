/* Gradient Text – dynamic controls */
(function () {
  const dscc = window.dscc;

  function safe(obj, path, fallback) {
    try {
      return path.reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj) ?? fallback;
    } catch (_) { return fallback; }
  }

  function render({ title, fontSize, color1, color2, angle }) {
    // Basic reset so our text sits cleanly
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "transparent";

    document.body.innerHTML = `
      <div style="
        display:flex;
        align-items:center;
        justify-content:center;
        width:100%;
        height:100%;
      ">
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
    const style = safe(message, ["style"], {});
    const title   = safe(style, ["title", "value"], "Customer Dashboard");
    const fontSz  = Number(safe(style, ["fontSize", "value"], 60)) || 60;
    const color1  = safe(style, ["color1", "value"], "#ff6600");
    const color2  = safe(style, ["color2", "value"], "#ffaa00");
    const angle   = Number(safe(style, ["angle", "value"], 90)) || 90;

    render({ title, fontSize: fontSz, color1, color2, angle });
  }

  if (dscc && typeof dscc.subscribeToData === "function") {
    dscc.subscribeToData(draw, { transform: dscc.tableTransform });
  } else {
    draw(null); // fallback for local testing
  }
})();
