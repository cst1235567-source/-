const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const GAME_TITLE = 'BUBBLE BONK CARNIVAL';
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const GROUND_HEIGHT = 38;
const PIPE_WIDTH = 64;
const PIPE_CAP_HEIGHT = 20;
const PIPE_CAP_WIDTH = 78;
const PIPE_TOP_MARGIN = 84;
const PIPE_BOTTOM_MARGIN = 86;
const SPAWN_LEAD = 820;
const LEVEL_BANNER_DURATION = 140;
const HERO_START_X = 96;
const FRAME_MS = 1000 / 60;
const FONT_DISPLAY = 'bold 38px "Trebuchet MS", -apple-system, system-ui, sans-serif';
const FONT_TITLE = 'bold 22px "Trebuchet MS", -apple-system, system-ui, sans-serif';
const FONT_BODY = '17px "Trebuchet MS", -apple-system, system-ui, sans-serif';
const FONT_SMALL = '14px "Trebuchet MS", -apple-system, system-ui, sans-serif';
const HUD = {
  panelY: 16,
  panelHeight: 38,
  panelRadius: 18,
  panelPadding: 14,
  levelX: 16,
  levelWidth: 150,
  muteWidth: 38,
  muteHeight: 38,
  muteMargin: 16,
  scoreY: 70,
};

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const LEVELS = [
  {
    threshold: 0,
    label: 'I · Moonwake',
    subtitle: 'quiet ascent',
    gravity: 0.38,
    flap: -8.1,
    pipeGap: 178,
    pipeSpeed: 2.05,
    pipeInterval: 1650,
    skyTop: '#aee6ff',
    skyBottom: '#ffe6a7',
    horizon: '#ffd1fa',
    horizonGlow: '#ffffff',
    fog: '#ffffff',
    star: '#ffb3c6',
    moon: '#fff4b8',
    moonGlow: '#ffe9a9',
    pipeMain: '#ff9ec4',
    pipeShade: '#f5679d',
    pipeGlow: '#ffd0e6',
    rune: '#ffffff',
    ground: '#ffd4a3',
    groundGlow: '#ffb347',
    heroAura: '#ffe6ff',
    heroWing: '#fff9de',
    heroBody: '#fffcf2',
    heroCloak: '#ffb3c1',
    heroAccent: '#ff7aa2',
    heroFace: '#ffe0c7',
    heroWeapon: '#ffd54f',
    music: {
      notes: [220, 261.63, 293.66, 246.94],
      bells: [659.25, 587.33, 523.25],
      step: 2.7,
      padGain: 0.028,
      bassGain: 0.019,
      bellGain: 0.015,
      windGain: 0.018,
      filter: 760,
    },
  },
  {
    threshold: 7,
    label: 'II · Gloam Choir',
    subtitle: 'echoing arches',
    gravity: 0.42,
    flap: -8.45,
    pipeGap: 164,
    pipeSpeed: 2.45,
    pipeInterval: 1540,
    skyTop: '#ffccf9',
    skyBottom: '#ffe6b8',
    horizon: '#f6b8ff',
    horizonGlow: '#ffffff',
    fog: '#ffffff',
    star: '#ff9ecd',
    moon: '#fff2c2',
    moonGlow: '#ffe0e9',
    pipeMain: '#ffa3a3',
    pipeShade: '#ff6f91',
    pipeGlow: '#ffd1dc',
    rune: '#ffffff',
    ground: '#ffd1a9',
    groundGlow: '#ff9e7a',
    heroAura: '#ffe5ff',
    heroWing: '#fff7e0',
    heroBody: '#fff9f4',
    heroCloak: '#ff9ecb',
    heroAccent: '#ff6fb5',
    heroFace: '#ffe3cc',
    heroWeapon: '#ffcf5c',
    music: {
      notes: [196, 233.08, 293.66, 246.94],
      bells: [698.46, 622.25, 523.25],
      step: 2.45,
      padGain: 0.03,
      bassGain: 0.022,
      bellGain: 0.016,
      windGain: 0.022,
      filter: 980,
    },
  },
  {
    threshold: 15,
    label: 'III · Ashen Veil',
    subtitle: 'stormlit channels',
    gravity: 0.47,
    flap: -8.8,
    pipeGap: 150,
    pipeSpeed: 2.88,
    pipeInterval: 1440,
    skyTop: '#ffcf9f',
    skyBottom: '#ff9aa2',
    horizon: '#ffb38a',
    horizonGlow: '#fff1e6',
    fog: '#ffe7d9',
    star: '#ffeedd',
    moon: '#fff7c2',
    moonGlow: '#ffd7a3',
    pipeMain: '#ffb26b',
    pipeShade: '#ff8f5a',
    pipeGlow: '#ffe3b3',
    rune: '#ffffff',
    ground: '#ffb88c',
    groundGlow: '#ff8b6b',
    heroAura: '#ffe3d4',
    heroWing: '#fff1e5',
    heroBody: '#fff7ef',
    heroCloak: '#ff9b73',
    heroAccent: '#ff7b54',
    heroFace: '#ffe3d0',
    heroWeapon: '#ffd36b',
    music: {
      notes: [174.61, 220, 261.63, 207.65],
      bells: [587.33, 493.88, 440],
      step: 2.2,
      padGain: 0.033,
      bassGain: 0.024,
      bellGain: 0.018,
      windGain: 0.028,
      filter: 1240,
    },
  },
  {
    threshold: 24,
    label: 'IV · Starstorm',
    subtitle: 'the final crossing',
    gravity: 0.53,
    flap: -9.15,
    pipeGap: 138,
    pipeSpeed: 3.28,
    pipeInterval: 1360,
    skyTop: '#b3ecff',
    skyBottom: '#ffe6ff',
    horizon: '#9de2ff',
    horizonGlow: '#ffffff',
    fog: '#f0fbff',
    star: '#ffbdf2',
    moon: '#fff6bf',
    moonGlow: '#ffe29f',
    pipeMain: '#6ee7b7',
    pipeShade: '#22c55e',
    pipeGlow: '#a7f3d0',
    rune: '#ffffff',
    ground: '#ffd8b5',
    groundGlow: '#f97316',
    heroAura: '#ddf9ff',
    heroWing: '#fff9e5',
    heroBody: '#fefdf8',
    heroCloak: '#7dd3fc',
    heroAccent: '#fb7185',
    heroFace: '#ffe8d2',
    heroWeapon: '#facc15',
    music: {
      notes: [164.81, 220, 277.18, 246.94],
      bells: [783.99, 659.25, 554.37],
      step: 1.95,
      padGain: 0.036,
      bassGain: 0.026,
      bellGain: 0.019,
      windGain: 0.032,
      filter: 1500,
    },
  },
];

let state;
let hero;
let pipes;
let stars;
let motes;
let score;
let best;
let pipeTimer;
let animFrame;
let worldTime;
let lastTime;
let levelIndex;
let levelBanner;
let muteButtonBounds;

const storageFallback = {
  fb_best: '0',
  fb_muted: '0',
};

function safeStorageGet(key, fallback = '') {
  try {
    const value = window.localStorage.getItem(key);
    if (value !== null) return value;
  } catch (_error) {
  }

  return Object.prototype.hasOwnProperty.call(storageFallback, key)
    ? storageFallback[key]
    : fallback;
}

function safeStorageSet(key, value) {
  storageFallback[key] = value;

  try {
    window.localStorage.setItem(key, value);
  } catch (_error) {
  }
}

const audio = {
  ctx: null,
  master: null,
  windSource: null,
  windGain: null,
  windFilter: null,
  started: false,
  noteIndex: 0,
  nextNoteTime: 0,
  muted: safeStorageGet('fb_muted', '0') === '1',
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function colorAlpha(hex, alpha) {
  const normalized = hex.replace('#', '');
  const safeHex = normalized.length === 3
    ? normalized.split('').map(char => char + char).join('')
    : normalized;
  const value = parseInt(safeHex, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function roundedRect(x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}

function currentLevel() {
  return LEVELS[levelIndex];
}

function levelForScore(nextScore) {
  let nextLevel = 0;
  for (let i = 0; i < LEVELS.length; i += 1) {
    if (nextScore >= LEVELS[i].threshold) nextLevel = i;
  }
  return nextLevel;
}

function initStars() {
  stars = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height - GROUND_HEIGHT - 40),
    radius: Math.random() * 1.4 + 0.35,
    depth: Math.random() * 0.9 + 0.4,
    alpha: Math.random() * 0.55 + 0.25,
    twinkle: Math.random() * 0.04 + 0.01,
    phase: Math.random() * Math.PI * 2,
  }));
}

function initMotes() {
  motes = Array.from({ length: 18 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * (canvas.height - GROUND_HEIGHT - 20),
    radius: Math.random() * 7 + 4,
    drift: Math.random() * 0.4 + 0.2,
    speed: Math.random() * 0.35 + 0.1,
    phase: Math.random() * Math.PI * 2,
  }));
}

function createHero() {
  return {
    x: HERO_START_X,
    y: canvas.height * 0.46,
    vy: 0,
    width: 34,
    height: 34,
    wingPhase: 0,
    ribbonPhase: 0,
    auraPulse: 0,
    rotation: 0,
  };
}

function resetGame() {
  state = 'idle';
  hero = createHero();
  pipes = [];
  score = 0;
  levelIndex = 0;
  levelBanner = 0;
  pipeTimer = currentLevel().pipeInterval - SPAWN_LEAD;
  updateAudioLevel();
}

function triggerLevelUpdate() {
  const nextLevel = levelForScore(score);
  if (nextLevel !== levelIndex) {
    const oldLevel = currentLevel();
    const progressRatio = oldLevel.pipeInterval > 0
      ? clamp(pipeTimer / oldLevel.pipeInterval, 0, 0.84)
      : 0;

    levelIndex = nextLevel;
    pipeTimer = currentLevel().pipeInterval * progressRatio;
    levelBanner = LEVEL_BANNER_DURATION;
    updateAudioLevel();
  }
}

function spawnPipe() {
  const level = currentLevel();
  const maxTop = canvas.height - GROUND_HEIGHT - PIPE_BOTTOM_MARGIN - level.pipeGap;
  const topH = Math.random() * (maxTop - PIPE_TOP_MARGIN) + PIPE_TOP_MARGIN;
  pipes.push({
    x: canvas.width + 24,
    topH,
    gap: level.pipeGap,
    passed: false,
    moodIndex: levelIndex,
    speed: level.pipeSpeed,
    runeShift: Math.random() * Math.PI * 2,
  });
}

function flap() {
  if (state === 'dead') {
    resetGame();
    state = 'playing';
  } else if (state === 'idle') {
    state = 'playing';
  }

  if (state === 'playing') {
    hero.vy = currentLevel().flap;
    playFlapSound();
  }
}

function toggleMute() {
  audio.muted = !audio.muted;
  safeStorageSet('fb_muted', audio.muted ? '1' : '0');
  updateAudioMix();
}

function pointInMuteButton(x, y) {
  return x >= muteButtonBounds.x
    && x <= muteButtonBounds.x + muteButtonBounds.width
    && y >= muteButtonBounds.y
    && y <= muteButtonBounds.y + muteButtonBounds.height;
}

function handleAction(clientX, clientY) {
  if (typeof clientX === 'number' && typeof clientY === 'number') {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const localX = (clientX - rect.left) * scaleX;
    const localY = (clientY - rect.top) * scaleY;

    if (pointInMuteButton(localX, localY)) {
      toggleMute();
      return;
    }
  }

  ensureAudio();
  flap();
}

function checkCollision(pipe) {
  const hitbox = {
    x: hero.x - hero.width / 2 + 10,
    y: hero.y - hero.height / 2 + 8,
    width: hero.width - 20,
    height: hero.height - 14,
  };
  const pipeInnerX = pipe.x + 5;
  const pipeInnerWidth = PIPE_WIDTH - 10;
  const inPipeX = hitbox.x + hitbox.width > pipeInnerX && hitbox.x < pipeInnerX + pipeInnerWidth;

  if (!inPipeX) return false;

  return hitbox.y < pipe.topH - 4 || hitbox.y + hitbox.height > pipe.topH + pipe.gap + 4;
}

function createNoiseBuffer(audioContext) {
  const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 2, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function ensureAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  if (!audio.ctx) {
    audio.ctx = new AudioContextClass();
    audio.master = audio.ctx.createGain();
    audio.master.gain.value = 0;
    audio.master.connect(audio.ctx.destination);

    audio.windSource = audio.ctx.createBufferSource();
    audio.windSource.buffer = createNoiseBuffer(audio.ctx);
    audio.windSource.loop = true;

    audio.windFilter = audio.ctx.createBiquadFilter();
    audio.windFilter.type = 'bandpass';
    audio.windFilter.Q.value = 0.4;

    audio.windGain = audio.ctx.createGain();
    audio.windGain.gain.value = 0.0001;

    audio.windSource.connect(audio.windFilter);
    audio.windFilter.connect(audio.windGain);
    audio.windGain.connect(audio.master);
    audio.windSource.start();
  }

  if (audio.ctx.state === 'suspended') {
    audio.ctx.resume();
  }

  if (!audio.started) {
    audio.started = true;
    audio.noteIndex = 0;
    audio.nextNoteTime = audio.ctx.currentTime + 0.08;
  }

  updateAudioLevel();
  updateAudioMix();
}

function updateAudioMix() {
  if (!audio.ctx || !audio.master) return;
  const target = audio.muted ? 0.0001 : 0.2;
  audio.master.gain.setTargetAtTime(target, audio.ctx.currentTime, 0.08);
}

function updateAudioLevel() {
  if (!audio.ctx || !audio.windFilter || !audio.windGain) return;
  const level = currentLevel();
  audio.windFilter.frequency.setTargetAtTime(level.music.filter, audio.ctx.currentTime, 0.3);
  audio.windGain.gain.setTargetAtTime(level.music.windGain, audio.ctx.currentTime, 0.4);
}

function playFlapSound() {
  if (!audio.ctx || audio.muted) return;

  const now = audio.ctx.currentTime;
  const gain = audio.ctx.createGain();
  const osc = audio.ctx.createOscillator();
  const filter = audio.ctx.createBiquadFilter();

  filter.type = 'highpass';
  filter.frequency.setValueAtTime(420, now);

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(760, now);
  osc.frequency.exponentialRampToValueAtTime(420, now + 0.11);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.055, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audio.master);

  osc.start(now);
  osc.stop(now + 0.15);
}

function playScoreSound() {
  if (!audio.ctx || audio.muted) return;

  const now = audio.ctx.currentTime;
  const leadGain = audio.ctx.createGain();
  const leadOsc = audio.ctx.createOscillator();
  const sparkleGain = audio.ctx.createGain();
  const sparkleOsc = audio.ctx.createOscillator();

  leadOsc.type = 'sine';
  sparkleOsc.type = 'triangle';

  leadOsc.frequency.setValueAtTime(740, now);
  leadOsc.frequency.exponentialRampToValueAtTime(980, now + 0.16);
  sparkleOsc.frequency.setValueAtTime(1110, now + 0.02);
  sparkleOsc.frequency.exponentialRampToValueAtTime(1480, now + 0.18);

  leadGain.gain.setValueAtTime(0.0001, now);
  leadGain.gain.linearRampToValueAtTime(0.05, now + 0.02);
  leadGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

  sparkleGain.gain.setValueAtTime(0.0001, now + 0.02);
  sparkleGain.gain.linearRampToValueAtTime(0.032, now + 0.05);
  sparkleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

  leadOsc.connect(leadGain);
  sparkleOsc.connect(sparkleGain);
  leadGain.connect(audio.master);
  sparkleGain.connect(audio.master);

  leadOsc.start(now);
  sparkleOsc.start(now + 0.02);
  leadOsc.stop(now + 0.24);
  sparkleOsc.stop(now + 0.26);
}

function schedulePad(frequency, time, level) {
  if (!audio.ctx) return;

  const padGain = audio.ctx.createGain();
  const filter = audio.ctx.createBiquadFilter();
  const oscA = audio.ctx.createOscillator();
  const oscB = audio.ctx.createOscillator();
  const oscC = audio.ctx.createOscillator();
  const duration = level.music.step + 1.6;

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(level.music.filter + 320, time);
  filter.Q.value = 0.6;

  oscA.type = 'triangle';
  oscB.type = 'sine';
  oscC.type = 'sine';
  oscA.frequency.setValueAtTime(frequency, time);
  oscB.frequency.setValueAtTime(frequency * 1.5, time);
  oscC.frequency.setValueAtTime(frequency * 2, time);
  oscB.detune.value = 5;
  oscC.detune.value = -7;

  padGain.gain.setValueAtTime(0.0001, time);
  padGain.gain.linearRampToValueAtTime(level.music.padGain, time + 1.1);
  padGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  oscA.connect(filter);
  oscB.connect(filter);
  oscC.connect(filter);
  filter.connect(padGain);
  padGain.connect(audio.master);

  oscA.start(time);
  oscB.start(time);
  oscC.start(time + 0.02);
  oscA.stop(time + duration + 0.1);
  oscB.stop(time + duration + 0.1);
  oscC.stop(time + duration + 0.1);
}

function scheduleBass(frequency, time, level) {
  if (!audio.ctx) return;

  const gain = audio.ctx.createGain();
  const osc = audio.ctx.createOscillator();
  const filter = audio.ctx.createBiquadFilter();
  const duration = level.music.step + 0.8;

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(level.music.filter * 0.75, time);

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(frequency, time);

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.linearRampToValueAtTime(level.music.bassGain, time + 0.45);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audio.master);

  osc.start(time);
  osc.stop(time + duration + 0.08);
}

function scheduleBell(frequency, time, level) {
  if (!audio.ctx) return;

  const gain = audio.ctx.createGain();
  const oscA = audio.ctx.createOscillator();
  const oscB = audio.ctx.createOscillator();
  const duration = 2.2;

  oscA.type = 'sine';
  oscB.type = 'triangle';
  oscA.frequency.setValueAtTime(frequency, time);
  oscB.frequency.setValueAtTime(frequency * 2.01, time);
  oscB.detune.value = 4;

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.linearRampToValueAtTime(level.music.bellGain, time + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  oscA.connect(gain);
  oscB.connect(gain);
  gain.connect(audio.master);

  oscA.start(time);
  oscB.start(time + 0.01);
  oscA.stop(time + duration + 0.04);
  oscB.stop(time + duration + 0.04);
}

function scheduleMusic() {
  if (!audio.ctx || !audio.started || audio.muted) return;

  const now = audio.ctx.currentTime;
  while (audio.nextNoteTime < now + 0.8) {
    const level = currentLevel();
    const note = level.music.notes[audio.noteIndex % level.music.notes.length];
    const bell = level.music.bells[audio.noteIndex % level.music.bells.length];

    schedulePad(note, audio.nextNoteTime, level);
    scheduleBass(note / 2, audio.nextNoteTime + 0.16, level);
    scheduleBell(bell, audio.nextNoteTime + level.music.step * 0.55, level);

    audio.nextNoteTime += level.music.step;
    audio.noteIndex += 1;
  }
}

function updateBackdrop(dt) {
  const level = currentLevel();

  stars.forEach(star => {
    star.x -= level.pipeSpeed * 0.05 * star.depth * dt;
    if (star.x < -4) {
      star.x = canvas.width + 4;
      star.y = Math.random() * (canvas.height - GROUND_HEIGHT - 40);
    }
  });

  motes.forEach(mote => {
    mote.x -= mote.speed * dt;
    mote.y += Math.sin(worldTime * 0.018 + mote.phase) * mote.drift * dt;

    if (mote.x < -20) {
      mote.x = canvas.width + 20;
      mote.y = Math.random() * (canvas.height - GROUND_HEIGHT - 20);
    }
  });
}

function updateHero(dt) {
  hero.wingPhase += 0.24 * dt;
  hero.ribbonPhase += 0.17 * dt;
  hero.auraPulse += 0.06 * dt;

  if (state === 'idle') {
    hero.y = canvas.height * 0.46 + Math.sin(worldTime * 0.07) * 8;
    hero.rotation = Math.sin(worldTime * 0.05) * 0.08;
    hero.vy = 0;
    return;
  }

  if (state === 'dead') {
    hero.vy += currentLevel().gravity * 0.75 * dt;
    hero.y += hero.vy * dt;
    hero.rotation = clamp(hero.rotation + 0.04 * dt, -0.1, 1.25);
    const floor = canvas.height - GROUND_HEIGHT - hero.height / 2;
    if (hero.y > floor) hero.y = floor;
  }
}

function updateGame(dt) {
  const level = currentLevel();

  hero.vy += level.gravity * dt;
  hero.y += hero.vy * dt;
  hero.rotation = clamp(hero.vy * 0.08, -0.45, 1.15);

  pipeTimer += dt * FRAME_MS;
  if (pipeTimer >= level.pipeInterval) {
    spawnPipe();
    pipeTimer = 0;
  }

  for (let i = pipes.length - 1; i >= 0; i -= 1) {
    const pipe = pipes[i];
    pipe.x -= pipe.speed * dt;

    if (!pipe.passed && pipe.x + PIPE_WIDTH < hero.x) {
      pipe.passed = true;
      score += 1;
      playScoreSound();
      if (score > best) {
        best = score;
        safeStorageSet('fb_best', String(best));
      }
      triggerLevelUpdate();
    }

    if (pipe.x + PIPE_WIDTH < -24) {
      pipes.splice(i, 1);
    }
  }

  const hitGround = hero.y + hero.height / 2 >= canvas.height - GROUND_HEIGHT;
  const hitCeiling = hero.y - hero.height / 2 <= 0;
  const hitPipe = pipes.some(checkCollision);

  if (hitGround || hitCeiling || hitPipe) {
    state = 'dead';
    hero.vy = Math.max(hero.vy, 1.8);
  }
}

function drawBackground() {
  const level = currentLevel();
  const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
  sky.addColorStop(0, level.skyTop);
  sky.addColorStop(0.6, level.skyBottom);
  sky.addColorStop(1, level.ground);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const sunX = canvas.width * 0.2 + Math.sin(worldTime * 0.01) * 8;
  const sunY = 90 + Math.cos(worldTime * 0.015) * 6;
  const sunRadius = 34;
  const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 2.6);
  sunGlow.addColorStop(0, colorAlpha(level.moonGlow, 0.45));
  sunGlow.addColorStop(1, colorAlpha(level.moonGlow, 0));
  ctx.fillStyle = sunGlow;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = level.moon;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
  ctx.fill();

  stars.forEach(star => {
    const pulse = star.alpha + Math.sin(worldTime * star.twinkle + star.phase) * 0.2;
    ctx.fillStyle = colorAlpha(level.star, clamp(pulse, 0.3, 1));
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius + 0.4, 0, Math.PI * 2);
    ctx.fill();
  });

  motes.forEach(mote => {
    ctx.fillStyle = colorAlpha(level.fog, 0.18);
    ctx.beginPath();
    ctx.ellipse(
      mote.x,
      mote.y + Math.sin(worldTime * 0.03 + mote.phase) * 8,
      mote.radius * 2.4,
      mote.radius * 1.4,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  });

  const baseY = canvas.height - GROUND_HEIGHT - 60;
  ctx.fillStyle = colorAlpha(level.horizon, 0.9);
  ctx.beginPath();
  ctx.moveTo(0, baseY + 16);
  ctx.quadraticCurveTo(60, baseY - 18, 120, baseY + 8);
  ctx.quadraticCurveTo(180, baseY + 26, 240, baseY);
  ctx.quadraticCurveTo(310, baseY - 22, canvas.width, baseY + 10);
  ctx.lineTo(canvas.width, canvas.height - GROUND_HEIGHT + 12);
  ctx.lineTo(0, canvas.height - GROUND_HEIGHT + 12);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = colorAlpha(level.horizonGlow, 0.5);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, baseY + 6);
  ctx.quadraticCurveTo(60, baseY - 24, 120, baseY);
  ctx.quadraticCurveTo(180, baseY + 20, 240, baseY - 4);
  ctx.quadraticCurveTo(310, baseY - 26, canvas.width, baseY);
  ctx.stroke();

  for (let band = 0; band < 2; band += 1) {
    const y = 110 + band * 70 + Math.sin(worldTime * 0.02 + band) * 6;
    ctx.fillStyle = colorAlpha(level.fog, 0.12 + band * 0.05);
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.6, y, 190 - band * 24, 40 - band * 6, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPipe(pipe) {
  const mood = LEVELS[pipe.moodIndex];
  const bodyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bodyGradient.addColorStop(0, mood.pipeGlow);
  bodyGradient.addColorStop(0.4, mood.pipeMain);
  bodyGradient.addColorStop(1, mood.pipeShade);

  const bottomY = pipe.topH + pipe.gap;

  ctx.fillStyle = bodyGradient;
  roundedRect(pipe.x, 0, PIPE_WIDTH, pipe.topH - PIPE_CAP_HEIGHT, 18);
  ctx.fill();
  roundedRect(pipe.x, bottomY + PIPE_CAP_HEIGHT, PIPE_WIDTH, canvas.height - bottomY - PIPE_CAP_HEIGHT, 18);
  ctx.fill();

  ctx.fillStyle = colorAlpha(mood.pipeGlow, 0.55);
  const highlightWidth = 10;
  roundedRect(pipe.x + 6, 0, highlightWidth, pipe.topH - PIPE_CAP_HEIGHT, 12);
  ctx.fill();
  roundedRect(pipe.x + 6, bottomY + PIPE_CAP_HEIGHT, highlightWidth, canvas.height - bottomY - PIPE_CAP_HEIGHT, 12);
  ctx.fill();

  const capX = pipe.x - (PIPE_CAP_WIDTH - PIPE_WIDTH) / 2;
  ctx.fillStyle = mood.pipeGlow;
  roundedRect(capX, pipe.topH - PIPE_CAP_HEIGHT, PIPE_CAP_WIDTH, PIPE_CAP_HEIGHT + 4, 16);
  ctx.fill();
  roundedRect(capX, bottomY - 4, PIPE_CAP_WIDTH, PIPE_CAP_HEIGHT + 4, 16);
  ctx.fill();

  ctx.fillStyle = colorAlpha(mood.rune, 0.9);
  for (let step = 24; step < pipe.topH - 24; step += 40) {
    const shift = Math.sin(worldTime * 0.04 + pipe.runeShift + step) * 3;
    ctx.beginPath();
    ctx.arc(pipe.x + PIPE_WIDTH / 2 + shift, step, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let step = bottomY + 28; step < canvas.height - GROUND_HEIGHT - 10; step += 40) {
    const shift = Math.sin(worldTime * 0.04 + pipe.runeShift + step) * 3;
    ctx.beginPath();
    ctx.arc(pipe.x + PIPE_WIDTH / 2 + shift, step, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGround() {
  const level = currentLevel();
  const groundGradient = ctx.createLinearGradient(0, canvas.height - GROUND_HEIGHT, 0, canvas.height);
  groundGradient.addColorStop(0, colorAlpha(level.groundGlow, 0.6));
  groundGradient.addColorStop(0.5, level.ground);
  groundGradient.addColorStop(1, colorAlpha(level.ground, 0.95));

  ctx.fillStyle = groundGradient;
  ctx.fillRect(0, canvas.height - GROUND_HEIGHT, canvas.width, GROUND_HEIGHT);
  ctx.strokeStyle = colorAlpha(level.groundGlow, 0.9);
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - GROUND_HEIGHT + 1);
  ctx.lineTo(canvas.width, canvas.height - GROUND_HEIGHT + 1);
  ctx.stroke();

  ctx.fillStyle = colorAlpha(level.groundGlow, 0.3);
  for (let x = -20; x < canvas.width + 20; x += 26) {
    ctx.beginPath();
    ctx.arc(x + (worldTime * 0.5) % 26, canvas.height - GROUND_HEIGHT + 10, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawHero() {
  const level = currentLevel();
  const bounce = Math.sin(hero.auraPulse * 0.7) * 1.5;
  const wiggle = Math.sin(hero.wingPhase) * 4;
  const hammerSwing = Math.sin(hero.ribbonPhase) * 6;

  ctx.save();
  ctx.translate(hero.x, hero.y + bounce);
  ctx.rotate(hero.rotation * 0.9);

  const auraRadius = 22 + Math.sin(hero.auraPulse) * 3;
  const aura = ctx.createRadialGradient(0, -2, 0, 0, -2, auraRadius);
  aura.addColorStop(0, colorAlpha(level.heroAura, 0.55));
  aura.addColorStop(1, colorAlpha(level.heroAura, 0));
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(0, -2, auraRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = level.heroBody;
  ctx.beginPath();
  ctx.ellipse(0, 6, 9, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = level.heroAccent;
  ctx.beginPath();
  ctx.ellipse(0, 7, 5, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colorAlpha(level.ground, 0.85);
  ctx.beginPath();
  ctx.ellipse(-4, 11, 4, 2.4, 0, 0, Math.PI * 2);
  ctx.ellipse(4, 11, 4, 2.4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = level.heroFace;
  ctx.beginPath();
  ctx.arc(0, -6, 11, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colorAlpha(level.heroAccent, 0.6);
  ctx.beginPath();
  ctx.ellipse(-5.5, -2, 3, 1.6, 0, 0, Math.PI * 2);
  ctx.ellipse(5.5, -2, 3, 1.6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = level.heroCloak;
  ctx.beginPath();
  ctx.moveTo(-11, -8);
  ctx.quadraticCurveTo(-1, -14 - wiggle * 0.4, 11, -8);
  ctx.quadraticCurveTo(2, -4 - wiggle * 0.2, -11, -8);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = colorAlpha(level.heroAura, 0.8);
  ctx.beginPath();
  ctx.arc(-2, -11, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colorAlpha(level.ground, 0.95);
  ctx.beginPath();
  ctx.arc(-3.4, -6, 1.3, 0, Math.PI * 2);
  ctx.arc(3.4, -6, 1.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = colorAlpha(level.heroAura, 0.9);
  ctx.beginPath();
  ctx.arc(-3, -6.3, 0.6, 0, Math.PI * 2);
  ctx.arc(3.8, -6.3, 0.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = colorAlpha(level.ground, 0.9);
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(0, -3, 3, 0.15, Math.PI - 0.15);
  ctx.stroke();

  ctx.fillStyle = level.heroCloak;
  ctx.beginPath();
  ctx.moveTo(-8, 4);
  ctx.quadraticCurveTo(-16, 8 + hammerSwing * 0.2, -18, 2 + hammerSwing * 0.2);
  ctx.quadraticCurveTo(-10, 0, -8, 4);
  ctx.fill();

  ctx.save();
  ctx.translate(6, -1);
  ctx.rotate(0.4 + hammerSwing * 0.06);
  ctx.strokeStyle = colorAlpha(level.heroWeapon, 0.95);
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-2, 0);
  ctx.lineTo(12, 0);
  ctx.stroke();

  ctx.fillStyle = level.heroWeapon;
  roundedRect(8, -5, 12, 10, 4);
  ctx.fill();

  ctx.fillStyle = colorAlpha(level.heroAccent, 0.7);
  ctx.beginPath();
  ctx.ellipse(12, 0, 4, 2.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

function drawScore() {
  const level = currentLevel();
  ctx.textAlign = 'center';
  ctx.font = 'bold 46px "Trebuchet MS", -apple-system, system-ui, sans-serif';
  ctx.fillStyle = colorAlpha(level.heroAccent, 0.98);
  ctx.shadowColor = colorAlpha(level.heroAura, 0.55);
  ctx.shadowBlur = 16;
  ctx.fillText(score, canvas.width / 2, HUD.scoreY);
  ctx.shadowBlur = 0;
}

function drawLevelPanel() {
  const level = currentLevel();
  const nextLevel = LEVELS[levelIndex + 1];
  const panelX = HUD.levelX;
  const panelY = HUD.panelY;
  const panelW = HUD.levelWidth;

  ctx.fillStyle = colorAlpha(level.heroBody, 0.9);
  roundedRect(panelX, panelY, panelW, HUD.panelHeight, HUD.panelRadius);
  ctx.fill();

  ctx.strokeStyle = colorAlpha(level.heroAura, 0.65);
  ctx.lineWidth = 1;
  roundedRect(panelX, panelY, panelW, HUD.panelHeight, HUD.panelRadius);
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.font = 'bold 13px "Trebuchet MS", -apple-system, system-ui, sans-serif';
  ctx.fillStyle = level.heroAccent;
  ctx.fillText(level.label, panelX + HUD.panelPadding, panelY + 15);

  ctx.font = '12px "Trebuchet MS", -apple-system, system-ui, sans-serif';
  ctx.fillStyle = colorAlpha(level.ground, 0.85);
  const progressText = nextLevel
    ? `${score}/${nextLevel.threshold} · ${level.subtitle}`
    : `${score} · final parade`;
  ctx.fillText(progressText, panelX + HUD.panelPadding, panelY + 29);
}

function drawMuteButton() {
  const level = currentLevel();
  const buttonX = canvas.width - HUD.muteMargin - HUD.muteWidth;
  const buttonY = HUD.panelY;
  muteButtonBounds = { x: buttonX, y: buttonY, width: HUD.muteWidth, height: HUD.muteHeight };

  ctx.fillStyle = colorAlpha(level.heroBody, 0.9);
  roundedRect(buttonX, buttonY, HUD.muteWidth, HUD.muteHeight, 16);
  ctx.fill();

  ctx.strokeStyle = colorAlpha(level.heroAura, 0.65);
  ctx.lineWidth = 1;
  roundedRect(buttonX, buttonY, HUD.muteWidth, HUD.muteHeight, 16);
  ctx.stroke();

  ctx.strokeStyle = colorAlpha(level.heroAccent, 0.95);
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(buttonX + 12, buttonY + 21);
  ctx.lineTo(buttonX + 17, buttonY + 21);
  ctx.lineTo(buttonX + 22, buttonY + 16);
  ctx.lineTo(buttonX + 22, buttonY + 26);
  ctx.lineTo(buttonX + 17, buttonY + 21);
  ctx.stroke();

  if (audio.muted) {
    ctx.beginPath();
    ctx.moveTo(buttonX + 26, buttonY + 14);
    ctx.lineTo(buttonX + 32, buttonY + 28);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(buttonX + 24, buttonY + 21, 5, -0.8, 0.8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(buttonX + 24, buttonY + 21, 9, -0.8, 0.8);
    ctx.stroke();
  }
}

function drawLevelBanner() {
  if (levelBanner <= 0) return;

  const level = currentLevel();
  const alpha = clamp(levelBanner / LEVEL_BANNER_DURATION, 0, 1);
  const width = 206;
  const height = 54;
  const x = (canvas.width - width) / 2;
  const y = 104;

  ctx.fillStyle = colorAlpha(level.heroBody, 0.8 * alpha + 0.2);
  roundedRect(x, y, width, height, 18);
  ctx.fill();

  ctx.strokeStyle = colorAlpha(level.heroAura, 0.4 + alpha * 0.35);
  ctx.lineWidth = 1;
  roundedRect(x, y, width, height, 18);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = 'bold 20px "Trebuchet MS", -apple-system, system-ui, sans-serif';
  ctx.fillStyle = colorAlpha(level.heroAccent, 0.7 + alpha * 0.3);
  ctx.fillText(level.label, canvas.width / 2, y + 22);

  ctx.font = '13px "Trebuchet MS", -apple-system, system-ui, sans-serif';
  ctx.fillStyle = colorAlpha(level.ground, 0.8);
  ctx.fillText(level.subtitle, canvas.width / 2, y + 39);
}

function drawOverlay(title, lineOne, lineTwo) {
  const level = currentLevel();
  ctx.fillStyle = colorAlpha(level.skyBottom, 0.75);
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.fillStyle = level.heroAccent;
  ctx.font = FONT_DISPLAY;
  ctx.shadowColor = colorAlpha(level.heroAura, 0.65);
  ctx.shadowBlur = 18;
  ctx.fillText(title, canvas.width / 2, canvas.height * 0.44);
  ctx.shadowBlur = 0;

  ctx.font = FONT_BODY;
  ctx.fillStyle = colorAlpha(level.ground, 0.9);
  ctx.fillText(lineOne, canvas.width / 2, canvas.height * 0.5);

  if (lineTwo) {
    ctx.font = FONT_SMALL;
    ctx.fillStyle = colorAlpha(level.star, 0.9);
    ctx.fillText(lineTwo, canvas.width / 2, canvas.height * 0.5 + 30);
  }
}

function drawHud() {
  if (state === 'playing' || state === 'dead') drawScore();
  drawLevelPanel();
  drawMuteButton();
  drawLevelBanner();
}

function render() {
  drawBackground();
  pipes.forEach(drawPipe);
  drawGround();
  drawHero();
  drawHud();

  if (state === 'idle') {
    drawOverlay(
      GAME_TITLE,
      'Tap, click, or press Space to bonk.',
      `Best ${best} · top-right icon mutes the music`,
    );
  } else if (state === 'dead') {
    drawOverlay(
      'BONKED OUT OF BOUNDS!',
      `Score ${score} · Best ${best}`,
      'Tap, click, or press Space to try again',
    );
  }
}

function loop(timestamp = 0) {
  animFrame = requestAnimationFrame(loop);
  const dt = lastTime ? Math.min((timestamp - lastTime) / FRAME_MS, 2.2) : 1;
  lastTime = timestamp;
  worldTime += dt;

  updateBackdrop(dt);
  updateHero(dt);

  if (state === 'playing') {
    updateGame(dt);
  }

  if (levelBanner > 0) levelBanner -= dt;
  scheduleMusic();
  render();
}

best = parseInt(safeStorageGet('fb_best', '0'), 10);
worldTime = 0;
lastTime = 0;
levelIndex = 0;
levelBanner = 0;
muteButtonBounds = {
  x: canvas.width - HUD.muteMargin - HUD.muteWidth,
  y: HUD.panelY,
  width: HUD.muteWidth,
  height: HUD.muteHeight,
};

initStars();
initMotes();
resetGame();

canvas.addEventListener('click', event => {
  handleAction(event.clientX, event.clientY);
});

canvas.addEventListener('touchstart', event => {
  event.preventDefault();
  const touch = event.changedTouches[0];
  handleAction(touch.clientX, touch.clientY);
}, { passive: false });

document.addEventListener('keydown', event => {
  if ((event.code === 'Space' || event.code === 'KeyM') && event.repeat) {
    return;
  }

  if (event.code === 'Space') {
    event.preventDefault();
    ensureAudio();
    flap();
  }

  if (event.code === 'KeyM') {
    event.preventDefault();
    toggleMute();
  }
});

loop();
