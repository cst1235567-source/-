const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;

const GRAVITY = 0.45;
const FLAP = -8.5;
const PIPE_WIDTH = 52;
const PIPE_GAP = 155;
const PIPE_SPEED = 2.4;
const PIPE_INTERVAL = 1600;

const COLORS = {
  sky: ['#1a1a2e', '#16213e'],
  ground: '#1a1a2e',
  groundLine: '#f39c12',
  pipe: '#27ae60',
  pipeDark: '#1e8449',
  pipeCap: '#2ecc71',
  bird: '#f1c40f',
  birdWing: '#e67e22',
  birdEye: '#ecf0f1',
  birdPupil: '#2c3e50',
  birdBeak: '#e67e22',
  scoreText: '#f39c12',
  overlay: 'rgba(10,10,26,0.75)',
  white: '#ecf0f1',
  dim: '#95a5a6',
  star: '#ffffff',
};

let state, bird, pipes, score, best, lastPipe, animFrame, stars;

function initStars() {
  stars = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.75,
    r: Math.random() * 1.5 + 0.3,
    alpha: Math.random() * 0.7 + 0.3,
  }));
}

function resetGame() {
  bird = { x: 90, y: canvas.height / 2, vy: 0, width: 34, height: 26, wingAngle: 0, wingDir: 1 };
  pipes = [];
  score = 0;
  lastPipe = Date.now() - PIPE_INTERVAL + 800;
  state = 'idle';
}

function flap() {
  if (state === 'idle') { state = 'playing'; }
  if (state === 'playing') { bird.vy = FLAP; }
  if (state === 'dead') { resetGame(); }
}

function spawnPipe() {
  const minY = 80, maxY = canvas.height - 80 - PIPE_GAP;
  const topH = Math.random() * (maxY - minY) + minY;
  pipes.push({ x: canvas.width + 10, topH, passed: false });
}

function checkCollision(p) {
  const bx = bird.x - bird.width / 2 + 4;
  const by = bird.y - bird.height / 2 + 4;
  const bw = bird.width - 8;
  const bh = bird.height - 8;
  const inXRange = bx + bw > p.x + 4 && bx < p.x + PIPE_WIDTH - 4;
  if (!inXRange) return false;
  return by < p.topH - 4 || by + bh > p.topH + PIPE_GAP + 4;
}

function drawGradientBg() {
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, COLORS.sky[0]);
  grad.addColorStop(1, COLORS.sky[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawStars() {
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.fill();
  });
}

function drawPipe(p) {
  const capH = 18, capW = PIPE_WIDTH + 8;
  const x = p.x, tw = PIPE_WIDTH;

  ctx.fillStyle = COLORS.pipe;
  ctx.fillRect(x, 0, tw, p.topH - capH);
  ctx.fillStyle = COLORS.pipeDark;
  ctx.fillRect(x + tw * 0.6, 0, tw * 0.15, p.topH - capH);
  ctx.fillStyle = COLORS.pipeCap;
  ctx.fillRect(x - (capW - tw) / 2, p.topH - capH, capW, capH);

  const botY = p.topH + PIPE_GAP;
  ctx.fillStyle = COLORS.pipe;
  ctx.fillRect(x, botY + capH, tw, canvas.height - botY - capH);
  ctx.fillStyle = COLORS.pipeDark;
  ctx.fillRect(x + tw * 0.6, botY + capH, tw * 0.15, canvas.height - botY - capH);
  ctx.fillStyle = COLORS.pipeCap;
  ctx.fillRect(x - (capW - tw) / 2, botY, capW, capH);
}

function drawBird() {
  const { x, y, vy, wingAngle } = bird;
  const tilt = Math.min(Math.max(vy * 3, -30), 70);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((tilt * Math.PI) / 180);

  ctx.fillStyle = COLORS.birdWing;
  ctx.beginPath();
  ctx.ellipse(-4, 4 + Math.sin(wingAngle) * 5, 10, 6, 0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = COLORS.bird;
  ctx.beginPath();
  ctx.ellipse(0, 0, bird.width / 2, bird.height / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = COLORS.birdEye;
  ctx.beginPath();
  ctx.arc(8, -5, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COLORS.birdPupil;
  ctx.beginPath();
  ctx.arc(9.5, -5, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = COLORS.birdBeak;
  ctx.beginPath();
  ctx.moveTo(14, -2);
  ctx.lineTo(22, 1);
  ctx.lineTo(14, 4);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawGround() {
  ctx.fillStyle = COLORS.ground;
  ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
  ctx.strokeStyle = COLORS.groundLine;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - 20);
  ctx.lineTo(canvas.width, canvas.height - 20);
  ctx.stroke();
}

function drawScore() {
  ctx.fillStyle = COLORS.scoreText;
  ctx.font = 'bold 42px Segoe UI';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(243,156,18,0.5)';
  ctx.shadowBlur = 12;
  ctx.fillText(score, canvas.width / 2, 68);
  ctx.shadowBlur = 0;
}

function drawOverlay(title, sub1, sub2) {
  ctx.fillStyle = COLORS.overlay;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;

  ctx.fillStyle = COLORS.scoreText;
  ctx.font = 'bold 38px Segoe UI';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(243,156,18,0.6)';
  ctx.shadowBlur = 16;
  ctx.fillText(title, cx, canvas.height / 2 - 60);
  ctx.shadowBlur = 0;

  ctx.fillStyle = COLORS.white;
  ctx.font = '20px Segoe UI';
  ctx.fillText(sub1, cx, canvas.height / 2);

  if (sub2) {
    ctx.fillStyle = COLORS.dim;
    ctx.font = '16px Segoe UI';
    ctx.fillText(sub2, cx, canvas.height / 2 + 34);
  }
}

function loop() {
  animFrame = requestAnimationFrame(loop);

  drawGradientBg();
  drawStars();

  if (state === 'playing') {
    bird.vy += GRAVITY;
    bird.y += bird.vy;
    bird.wingAngle += 0.25 * bird.wingDir;
    if (Math.abs(bird.wingAngle) > 0.8) bird.wingDir *= -1;

    if (Date.now() - lastPipe > PIPE_INTERVAL) {
      spawnPipe();
      lastPipe = Date.now();
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].x -= PIPE_SPEED;
      if (!pipes[i].passed && pipes[i].x + PIPE_WIDTH < bird.x) {
        pipes[i].passed = true;
        score++;
        if (score > best) best = score;
        localStorage.setItem('fb_best', best);
      }
      if (pipes[i].x + PIPE_WIDTH < -20) pipes.splice(i, 1);
    }

    const hitGround = bird.y + bird.height / 2 >= canvas.height - 20;
    const hitCeiling = bird.y - bird.height / 2 <= 0;
    const hitPipe = pipes.some(p => checkCollision(p));

    if (hitGround || hitCeiling || hitPipe) {
      state = 'dead';
    }
  }

  pipes.forEach(drawPipe);
  drawGround();
  drawBird();

  if (state === 'playing' || state === 'dead') drawScore();

  if (state === 'idle') {
    drawOverlay('FLAPPY BIRD', 'Tap / Space / Click to start', `Best: ${best}`);
  } else if (state === 'dead') {
    drawOverlay('GAME OVER', `Score: ${score}   Best: ${best}`, 'Tap / Space / Click to restart');
  }
}

best = parseInt(localStorage.getItem('fb_best') || '0');
initStars();
resetGame();

canvas.addEventListener('click', flap);
document.addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); flap(); }
});
document.addEventListener('touchstart', e => { e.preventDefault(); flap(); }, { passive: false });

loop();
