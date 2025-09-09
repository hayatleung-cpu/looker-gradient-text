/* global dscc */
(function () {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);

  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  root.appendChild(wrapper);

  const heading = document.createElement('h1');
  heading.className = 'gradient';
  wrapper.appendChild(heading);

  // Helper to read a style control with a fallback
  function S(style, key, fallback) {
    if (!style || !style[key]) return fallback;
    const v = style[key].value;
    return (v === undefined || v === null || v === '') ? fallback : v;
  }

  function draw(data) {
    const style = data && data.style ? data.style : {};

    const text         = S(style, 'textContent', 'Your Gradient Heading');
    const fontSize     = Number(S(style, 'fontSize', 64));
    const fontWeight   = String(S(style, 'fontWeight', '700'));
    const textAlign    = S(style, 'textAlign', 'center');
    const letterSpacing= Number(S(style, 'letterSpacing', 0));
    const startColor   = S(style, 'startColor', '#ff7e5f');
    const endColor     = S(style, 'endColor', '#feb47b');
    const angle        = Number(S(style, 'angle', 90));
    const lineHeight   = Number(S(style, 'lineHeight', 1.1));
    const padding      = Number(S(style, 'padding', 8));

    heading.textContent = text;
    heading.style.fontSize = fontSize + 'px';
    heading.style.fontWeight = fontWeight;
    heading.style.textAlign = textAlign;
    heading.style.letterSpacing = letterSpacing + 'px';
    heading.style.lineHeight = String(lineHeight);
    wrapper.style.setProperty('--pad', padding + 'px');

    // Gradient
    const gradient = `linear-gradient(${angle}deg, ${startColor}, ${endColor})`;
    heading.style.backgroundImage = gradient;

    // Layout alignment
    wrapper.style.justifyItems =
      textAlign === 'left' ? 'start' :
      textAlign === 'right' ? 'end' : 'center';
  }

  if (window.dscc && dscc.subscribeToData) {
    dscc.subscribeToData(draw, { transform: dscc.objectTransform });
  } else {
    // Local fallback preview
    draw({ style: {} });
  }
})();
