/* global dscc */
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
root.appendChild(wrapper);

const heading = document.createElement('h1');
heading.className = 'gradient';
wrapper.appendChild(heading);

// Utility: read a style value with default
function S(style, key, fallback) {
  if (!style || !style[key]) return fallback;
  const v = style[key].value;
  return (v === undefined || v === null || v === '') ? fallback : v;
}

function draw(data) {
  const style = data.style || {};

  const text = S(style, 'textContent', 'Your Gradient Heading');
  const fontSize = Number(S(style, 'fontSize', 64));
  const fontWeight = S(style, 'fontWeight', '700');
  const textAlign = S(style, 'textAlign', 'center');
  const letterSpacing = Number(S(style, 'letterSpacing', 0));
  const startColor = S(style, 'startColor', '#ff7e5f');
  const endColor = S(style, 'endColor', '#feb47b');
  const angle = Number(S(style, 'angle', 90));
  const lineHeight = Number(S(style, 'lineHeight', 1.1));
  const padding = Number(S(style, 'padding', 8));

  heading.textContent = text;
  heading.style.fontSize = `${fontSize}px`;
  heading.style.fontWeight = String(fontWeight);
  heading.style.textAlign = textAlign;
  heading.style.letterSpacing = `${letterSpacing}px`;
  heading.style.lineHeight = String(lineHeight);
  wrapper.style.setProperty('--pad', `${padding}px`);

  // Gradient
  const gradient = `linear-gradient(${angle}deg, ${startColor}, ${endColor})`;
  heading.style.backgroundImage = gradient;

  // Layout: center vs left/right
  wrapper.style.justifyItems = (textAlign === 'left') ? 'start' :
                               (textAlign === 'right') ? 'end' : 'center';
}

// Subscribe to Looker Studio
if (window.dscc) {
  dscc.subscribeToData(draw, {transform: dscc.objectTransform});
} else {
  // Local preview fallback
  draw({style:{}});
}
