(function () {
  // Looker Studio provides dscc on window in the sandboxed iframe
  const dscc = window.dscc;

  // ---- CUSTOMISE THESE DEFAULTS IF YOU LIKE ----
  const DEFAULT_TEXT = "Total Calls & Appointments Booked";
  // Elyos-style orange gradient (dark -> light)
  const DEFAULT_GRADIENT = "linear-gradient(90deg, #ff6600, #ffaa00)";
  const DEFAULT_FONT_FAMILY = "Inter, Arial, Helvetica, sans-serif";
  const DEFAULT_FONT_SIZE_PX = 48;    // adjust for your canvas size
  const DEFAULT_FONT_WEIGHT = 800;    // 700–900 looks best for gradients
  const DEFAULT_ALIGN = "center";     // left | center | right
  // ------------------------------------------------

  function render() {
    // Clean slate each draw
    document.body.innerHTML = "";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.display = "flex";
    document.body.style.alignItems = "center";
    document.body.style.justifyContent = DEFAULT_ALIGN === "center" ? "center"
      : DEFAULT_ALIGN === "right" ? "flex-end" : "flex-start";
    document.body.style.height = "100%";
    document.body.style.width = "100%";
    document.body.style.background = "transparent";

    // Create the gradient text element
    const el = document.createElement("div");
    el.textContent = DEFAULT_TEXT;
    el.style.fontFamily = DEFAULT_FONT_FAMILY;
    el.style.fontSize = DEFAULT_FONT_SIZE_PX + "px";
    el.style.fontWeight = String(DEFAULT_FONT_WEIGHT);
    el.style.lineHeight = "1.1";
    el.style.whiteSpace = "pre-wrap";
    el.style.textAlign = DEFAULTALIGNCSS(DEFAULT_ALIGN);
    el.style.background = DEFAULT_GRADIENT;
    el.style.webkitBackgroundClip = "text";
    el.style.webkitTextFillColor = "transparent";
    el.style.backgroundClip = "text"; // for non-webkit
    el.style.color = "transparent";   // fallback

    // Optional padding so it’s not flush to edges
    el.style.padding = "4px 8px";

    document.body.appendChild(el);
  }

  function DEFAULTALIGNCSS(a) {
    if (a === "right") return "right";
    if (a === "center") return "center";
    return "left";
  }

  // No data needed; we just render the styled header
  function drawViz(/* data */) {
    render();
  }

  // Subscribe once; tableTransform is fine even if we don’t use data
  dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
})();
