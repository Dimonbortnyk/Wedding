/**
 * Petal burst — turns a rectangle of the screen (the invitation letter) into falling petals.
 *
 * Drawn on one full-screen <canvas> that is created for the burst and removed when the
 * last petal has faded, so nothing is left running. Loaded on demand by main.js.
 */

const TAU = Math.PI * 2;
const LIFE = 2.4; // seconds a petal lives once released
const MAX_STAGGER = 0.35; // seconds between the first and the last petal letting go
const GRAVITY = 230; // px/s²
const DRAG = 1.15; // 1/s
const SPRITE = 64; // px, size of the pre-drawn petal images

const rand = (min, max) => min + Math.random() * (max - min);

/** Colours come from the site's own tokens, so the petals follow the palette. */
function palette() {
  const styles = getComputedStyle(document.documentElement);
  const token = (name) => styles.getPropertyValue(name).trim();
  return [
    { color: token('--sand'), alpha: 1, weight: 4 },
    { color: token('--blush'), alpha: 1, weight: 4 },
    { color: token('--linen'), alpha: 1, weight: 3 },
    { color: token('--ivory'), alpha: 1, weight: 2 },
    { color: token('--gold'), alpha: 0.5, weight: 1 },
  ];
}

/** One petal per colour, drawn once: a soft teardrop from two quadratic curves. */
function drawSprite(color) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SPRITE;
  const ctx = canvas.getContext('2d');
  const s = SPRITE * 0.86;
  ctx.translate(SPRITE / 2, SPRITE / 2);

  ctx.beginPath();
  ctx.moveTo(0, -s / 2);
  ctx.quadraticCurveTo(s * 0.62, -s * 0.04, 0, s / 2);
  ctx.quadraticCurveTo(-s * 0.62, -s * 0.04, 0, -s / 2);
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();
  // Slight inner gradient: light at the tip, a touch of shade at the base…
  const shade = ctx.createLinearGradient(0, -s / 2, 0, s / 2);
  shade.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
  shade.addColorStop(0.55, 'rgba(255, 255, 255, 0)');
  shade.addColorStop(1, 'rgba(122, 90, 70, 0.22)');
  ctx.fillStyle = shade;
  ctx.fill();
  // …and a hairline edge, so the palest petals still read against ivory.
  ctx.strokeStyle = 'rgba(122, 100, 84, 0.28)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  return canvas;
}

function pickWeighted(items) {
  let roll = Math.random() * items.reduce((sum, item) => sum + item.weight, 0);
  return items.find((item) => (roll -= item.weight) < 0) ?? items[0];
}

/**
 * @param {object} options
 * @param {HTMLElement} options.host    element the canvas is appended to (the open <dialog>)
 * @param {DOMRect}     options.rect    area to turn into petals, in viewport coordinates
 * @param {{x:number,y:number}} options.origin  where the guest clicked: petals nearest go first
 * @param {number}      options.count   how many petals
 * @returns {{ done: Promise<void>, cancel: () => void }}
 */
export function burstPetals({ host, rect, origin, count }) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;

  const canvas = document.createElement('canvas');
  canvas.className = 'petals';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  host.append(canvas);

  const colours = palette().map((entry) => ({ ...entry, sprite: drawSprite(entry.color) }));
  const centre = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  const reach = Math.hypot(rect.width, rect.height) || 1;

  // A jittered grid over the rectangle, so the petals cover the letter rather than clump.
  const cols = Math.max(1, Math.round(Math.sqrt((count * rect.width) / rect.height)));
  const rows = Math.max(1, Math.ceil(count / cols));
  const petals = Array.from({ length: count }, (_, i) => {
    const x = rect.left + (((i % cols) + rand(0.1, 0.9)) / cols) * rect.width;
    const y = rect.top + ((Math.floor(i / cols) + rand(0.1, 0.9)) / rows) * rect.height;
    const away = Math.atan2(y - centre.y, x - centre.x) + rand(-0.5, 0.5);
    const speed = rand(50, 210);
    const colour = pickWeighted(colours);
    return {
      x,
      y,
      vx: Math.cos(away) * speed,
      vy: Math.sin(away) * speed - rand(20, 70), // a small lift before gravity wins
      size: rand(8, 22),
      rotation: rand(0, TAU),
      spin: rand(-2.4, 2.4),
      swayPhase: rand(0, TAU),
      swaySpeed: rand(1.6, 3.2),
      swayReach: rand(14, 42),
      flipPhase: rand(0, TAU),
      flipSpeed: rand(2.2, 5),
      delay: Math.min(1, Math.hypot(x - origin.x, y - origin.y) / reach) * MAX_STAGGER,
      sprite: colour.sprite,
      alpha: colour.alpha,
    };
  });

  let frame = 0;
  let finished = false;
  let resolveDone;
  const done = new Promise((resolve) => {
    resolveDone = resolve;
  });

  function finish() {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(frame);
    canvas.remove();
    resolveDone();
  }

  const start = performance.now();
  let last = start;

  function tick(now) {
    const dt = Math.min((now - last) / 1000, 1 / 30);
    const elapsed = (now - start) / 1000;
    last = now;
    ctx.clearRect(0, 0, width, height);

    let alive = 0;
    for (const p of petals) {
      const age = elapsed - p.delay;
      if (age >= LIFE) continue;
      alive += 1;

      let flip = 1;
      let alpha = p.alpha;
      if (age > 0) {
        // Released: burst outward, then gravity, sway, spin and a slow flip.
        p.vy += GRAVITY * dt;
        p.vx -= p.vx * DRAG * dt;
        p.vy -= p.vy * DRAG * 0.55 * dt;
        p.x += (p.vx + Math.cos(age * p.swaySpeed + p.swayPhase) * p.swayReach) * dt;
        p.y += p.vy * dt;
        p.rotation += p.spin * dt;
        flip = Math.cos(age * p.flipSpeed + p.flipPhase);
        alpha *= 1 - (age / LIFE) ** 1.7;
      }

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale((p.size / SPRITE) * (Math.abs(flip) * 0.85 + 0.15), p.size / SPRITE);
      ctx.drawImage(p.sprite, -SPRITE / 2, -SPRITE / 2);
      ctx.restore();
    }

    if (alive) frame = requestAnimationFrame(tick);
    else finish();
  }

  frame = requestAnimationFrame(tick);
  return { done, cancel: finish };
}
