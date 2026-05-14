if (sessionStorage.getItem('babooPlayYardEntry') !== 'allowed') {
  window.location.replace('./index.html');
}

sessionStorage.removeItem('babooPlayYardEntry');

const letterData = {
  A: { word: 'Apple', emoji: '🍎' },
  B: { word: 'Ball', emoji: '⚽' },
  C: { word: 'Cat', emoji: '🐱' },
  D: { word: 'Dog', emoji: '🐶' },
  E: { word: 'Elephant', emoji: '🐘' },
  F: { word: 'Fish', emoji: '🐟' },
  G: { word: 'Grapes', emoji: '🍇' },
  H: { word: 'Heart', emoji: '💖' },
  I: { word: 'Ice Cream', emoji: '🍦' },
  J: { word: 'Juice', emoji: '🧃' },
  K: { word: 'Kite', emoji: '🪁' },
  L: { word: 'Lion', emoji: '🦁' },
  M: { word: 'Monkey', emoji: '🐵' },
  N: { word: 'Nest', emoji: '🪺' },
  O: { word: 'Orange', emoji: '🍊' },
  P: { word: 'Penguin', emoji: '🐧' },
  Q: { word: 'Queen', emoji: '👑' },
  R: { word: 'Rainbow', emoji: '🌈' },
  S: { word: 'Sun', emoji: '☀️' },
  T: { word: 'Tiger', emoji: '🐯' },
  U: { word: 'Umbrella', emoji: '☂️' },
  V: { word: 'Violin', emoji: '🎻' },
  W: { word: 'Whale', emoji: '🐋' },
  X: { word: 'Xylophone', emoji: '🎼' },
  Y: { word: 'Yarn', emoji: '🧶' },
  Z: { word: 'Zebra', emoji: '🦓' },
  '1': { word: 'One', emoji: '1️⃣' },
  '2': { word: 'Two', emoji: '2️⃣' },
  '3': { word: 'Three', emoji: '3️⃣' },
  '4': { word: 'Four', emoji: '4️⃣' },
  '5': { word: 'Five', emoji: '5️⃣' },
  '6': { word: 'Six', emoji: '6️⃣' },
  '7': { word: 'Seven', emoji: '7️⃣' },
  '8': { word: 'Eight', emoji: '8️⃣' },
  '9': { word: 'Nine', emoji: '9️⃣' },
  '0': { word: 'Zero', emoji: '0️⃣' }
};

const bigLetter = document.getElementById('bigLetter');
const wordLine = document.getElementById('wordLine');
const emojiPop = document.getElementById('emojiPop');
const keyboard = document.getElementById('keyboard');
const displayArea = document.getElementById('displayArea');
const soundBtn = document.getElementById('soundBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const caseBtn = document.getElementById('caseBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const mouseGlow = document.getElementById('mouseGlow');

let soundEnabled = true;
let rainbowMode = false;
let currentLetter = 'A';
let darkMode = false;
let letterMode = 'upper';
let audioCtx;

const rows = ['1234567890', 'QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

const sillySmileys = ['😂', '😆', '🤣', '😁', '😹', '😄'];
const countingEmojis = ['🍎', '⭐', '🌈', '🎈', '🧸', '🍪', '🚗', '⚽'];

function makeKeyboard() {
  rows.forEach(rowLetters => {
    const row = document.createElement('div');
    row.className = 'key-row';
    rowLetters.split('').forEach(letter => {
      const key = document.createElement('div');
      key.className = 'key';
      key.id = `key-${letter}`;
      key.textContent = letter;
      row.appendChild(key);
    });
    keyboard.appendChild(row);
  });
}

function handlePlayableKey(key) {
  if (letterData[key]) {
    updateLetter(key);
    return;
  }

  triggerFunKeyReaction();
}

function randomPastel() {
  const hues = [12, 35, 55, 95, 160, 200, 260, 310];
  const hue = hues[Math.floor(Math.random() * hues.length)];
  return `hsl(${hue} 90% 60%)`;
}

function getNumberEmojiDisplay(numberKey) {
  const count = Number(numberKey);
  if (count === 0) return '0 is for no emojis yet';

  const emoji = countingEmojis[Math.floor(Math.random() * countingEmojis.length)];
  return `${count} is for ${emoji.repeat(count)}`;
}

function friendlyLower(letter) {
  if (letter === 'A') return 'ɑ';
  if (letter === 'T') return 't';
  return letter.toLowerCase();
}

function updateLetter(letter, shouldPlaySound = true) {
  currentLetter = letter;
  const data = letterData[letter];
  if (!data) return;

  let displayLetter = letter;

  if (/[A-Z]/.test(letter)) {
    if (letterMode === 'lower') displayLetter = friendlyLower(letter);
    if (letterMode === 'both') displayLetter = `${letter} ${friendlyLower(letter)}`;
  }

  bigLetter.textContent = displayLetter;
  if (/^[0-9]$/.test(letter)) {
    wordLine.textContent = getNumberEmojiDisplay(letter);
  } else {
    wordLine.textContent = `${displayLetter} is for ${data.word} ${data.emoji}`;
  }
  emojiPop.textContent = data.emoji;
  emojiPop.style.animation = 'none';
  requestAnimationFrame(() => {
    emojiPop.style.animation = 'bounceIn 0.45s ease';
  });

  if (rainbowMode) {
    bigLetter.style.color = randomPastel();
    displayArea.style.background = darkMode
      ? `linear-gradient(180deg, #1f2937, ${randomPastel()}33)`
      : `linear-gradient(180deg, white, ${randomPastel()}22)`;
  } else {
    bigLetter.style.color = '';
    displayArea.style.background = '';
  }

  highlightKey(letter);
  spawnFloaters(data.emoji);
  if (soundEnabled && shouldPlaySound) playLetterSound(letter);
}

function highlightKey(letter) {
  document.querySelectorAll('.key.active').forEach(key => key.classList.remove('active'));
  const keyEl = document.getElementById(`key-${letter}`);
  if (keyEl) {
    keyEl.classList.add('active');
    setTimeout(() => keyEl.classList.remove('active'), 280);
  }
}

function spawnFloaters(symbol) {
  for (let i = 0; i < 6; i += 1) {
    const el = document.createElement('div');
    el.className = 'floating';
    el.textContent = i % 2 === 0 ? symbol : '✨';
    el.style.left = `${20 + Math.random() * 60}%`;
    el.style.bottom = `${18 + Math.random() * 18}%`;
    el.style.animationDelay = `${i * 0.04}s`;
    displayArea.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }
}

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }

  return audioCtx;
}

function playTone({ type, startFrequency, peakFrequency, endFrequency, duration, volume }) {
  const context = getAudioContext();

  const scheduleTone = () => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(startFrequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(peakFrequency, now + duration * 0.45);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + duration * 0.85);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  };

  if (context.state === 'suspended') {
    context.resume().then(scheduleTone).catch(() => {});
    return;
  }

  scheduleTone();
}

function playLetterSound(letter) {
  let base = 260;

  if (/^[A-Z]$/.test(letter)) {
    base = 260 + (letter.charCodeAt(0) - 65) * 12;
  } else if (/^[0-9]$/.test(letter)) {
    base = 320 + Number(letter) * 35;
  }

  playTone({
    type: 'sine',
    startFrequency: base,
    peakFrequency: base * 1.25,
    endFrequency: base * 1.12,
    duration: 0.28,
    volume: 0.15
  });
}

function playFunKeySound() {
  playTone({
    type: 'triangle',
    startFrequency: 520,
    peakFrequency: 780,
    endFrequency: 420,
    duration: 0.34,
    volume: 0.18
  });
}

function triggerFunKeyReaction() {
  const smiley = sillySmileys[Math.floor(Math.random() * sillySmileys.length)];
  emojiPop.textContent = smiley;
  emojiPop.style.animation = 'none';
  requestAnimationFrame(() => {
    emojiPop.style.animation = 'bounceIn 0.45s ease';
  });

  spawnFloaters(smiley);

  if (rainbowMode) {
    displayArea.style.background = darkMode
      ? `linear-gradient(180deg, #1f2937, ${randomPastel()}33)`
      : `linear-gradient(180deg, white, ${randomPastel()}22)`;
  }

  if (soundEnabled) playFunKeySound();
}

document.addEventListener('keydown', event => {
  let key = event.key;
  if (/^[a-zA-Z]$/.test(key)) key = key.toUpperCase();
  if (key.length === 1 || key === 'Enter' || key === 'Backspace' || key === 'Tab' || key === ' ') {
    handlePlayableKey(key);
  }
});

keyboard.addEventListener('click', event => {
  const keyEl = event.target.closest('.key');
  if (!keyEl) return;
  handlePlayableKey(keyEl.textContent);
});

document.addEventListener('mousemove', event => {
  mouseGlow.style.opacity = '1';
  mouseGlow.style.left = `${event.clientX}px`;
  mouseGlow.style.top = `${event.clientY}px`;

  const dot = document.createElement('div');
  dot.className = 'trail-dot';
  dot.style.left = `${event.clientX}px`;
  dot.style.top = `${event.clientY}px`;
  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 550);
});

async function goFullscreen() {
  const el = document.documentElement;
  try {
    if (!document.fullscreenElement) {
      await el.requestFullscreen();
      document.body.classList.add('fullscreen-mode');
      fullscreenBtn.textContent = 'Exit Full Screen';
    } else {
      await document.exitFullscreen();
      document.body.classList.remove('fullscreen-mode');
      fullscreenBtn.textContent = 'Full Screen';
    }
  } catch (error) {
    console.log('Fullscreen not available', error);
  }
}

fullscreenBtn.addEventListener('click', goFullscreen);

soundBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundBtn.textContent = `Sound: ${soundEnabled ? 'On' : 'Off'}`;
  if (soundEnabled) getAudioContext().resume().catch(() => {});
});

rainbowBtn.addEventListener('click', () => {
  rainbowMode = !rainbowMode;
  rainbowBtn.textContent = `Rainbow: ${rainbowMode ? 'On' : 'Off'}`;
  if (!rainbowMode) {
    bigLetter.style.color = '';
    displayArea.style.background = '';
  } else {
    updateLetter(currentLetter);
  }
});

caseBtn.addEventListener('click', () => {
  if (letterMode === 'upper') {
    letterMode = 'lower';
    caseBtn.textContent = 'Mode: lower';
  } else if (letterMode === 'lower') {
    letterMode = 'both';
    caseBtn.textContent = 'Mode: Aa';
  } else {
    letterMode = 'upper';
    caseBtn.textContent = 'Mode: UPPER';
  }

  updateLetter(currentLetter);
});

darkModeBtn.addEventListener('click', () => {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode', darkMode);
  darkModeBtn.textContent = `Dark: ${darkMode ? 'On' : 'Off'}`;
  updateLetter(currentLetter);
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    document.body.classList.remove('fullscreen-mode');
    fullscreenBtn.textContent = 'Full Screen';
  } else {
    document.body.classList.add('fullscreen-mode');
    fullscreenBtn.textContent = 'Exit Full Screen';
  }
});

makeKeyboard();
updateLetter('A', false);
goFullscreen();
