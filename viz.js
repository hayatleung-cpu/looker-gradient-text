const dscc = window.dscc;

function render(titleText, fontPx, color1, color2) {
  document.body.innerHTML = `
    <div style="
      font-family: Inter, Arial, Helvetica, sans-serif;
      font-size: ${fontPx}px;
      font-weight: 800;
      line-height: 1.1;
      background: linear-gradient(90deg, ${color1}, ${color2});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      text-align: center;
      padding: 16px;
    ">
      ${titleText}
    </div>
  `;
}

function drawViz(message) {
  const style = (message && message.style) ? message.style : {};
  const title = style.title && style.title.value ? style.title.value : "Total Calls & Appointments Booked";
  const fontSize = style.fontSize && style.fontSize.value ? Number(style.fontSize.value) : 48;
  const color1 = style.color1 && style.color1.value ? style.color1.value : "#ff6600";
  const color2 = style.color2 && style.color2.value ? style.color2.value : "#ffaa00";

  render(title, fontSize, color1, color2);
}

if (dscc && typeof dscc.subscribeToData === "function") {
  dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
} else {
  drawViz(null);
}
