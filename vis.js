(function () {
  const dscc = window.dscc;

  function drawViz() {
    // Nothing dynamic yet; just ensure it renders.
    // You can later read dscc data and update #title if you like.
  }

  if (dscc && dscc.subscribeToData) {
    dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
  } else {
    // Fallback render on load
    drawViz();
  }
})();

