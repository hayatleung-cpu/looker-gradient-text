const dscc = window.dscc;

function drawViz() {
  const container = document.createElement("div");
  container.innerHTML = `
    <div style="
      font-family: Inter, Arial, Helvetica, sans-serif;
      font-size: 48px;
      font-weight: 800;
      line-height: 1.1;
      background: linear-gradient(90deg, #ff6600, #ffaa00);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
      text-align: center;
    ">
      Total Calls & Appointments Booked
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
