const dscc = window.dscc;

function drawViz(data) {
  // Try to read custom title & font size from style
  const style = data && data.style ? data.style : {};
  const title = style.title && style.title.value ? style.title.value : "Total Calls & Appointments Booked";
  const fontSize = style.fontSize && style.fontSize.value ? style.fontSize.value + "px" : "48px";

  const container = document.createElement("div");
  container.innerHTML = `
    <div style="
      font-family: Inter, Arial, Helvetica, sans-serif;
      font-size: ${fontSize};
      font-weight: 800;
      line-height: 1.1;
      background: linear-gradient(90deg, #ff6600, #ffaa00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      text-align: center;
    ">
      ${title}
    </div>
  `;

  document.body.innerHTML = "";
  document.body.appendChild(container);
}

if (dscc && dscc.subscribeToData) {
  dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
} else {
  drawViz();
}
