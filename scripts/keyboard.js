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
const phonicsBtn = document.getElementById('phonicsBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const mouseGlow = document.getElementById('mouseGlow');

let soundEnabled = true;
let rainbowMode = false;
let phonicsEnabled = false;
let currentLetter = 'A';
let darkMode = false;
let letterMode = 'upper';

const rows = ['1234567890', 'QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

const phonicsMap = {
  A: 'aah', B: 'buh', C: 'kuh', D: 'duh', E: 'eh', F: 'fff', G: 'guh', H: 'huh',
  I: 'ih', J: 'juh', K: 'kuh', L: 'lll', M: 'mmm', N: 'nnn', O: 'oh', P: 'puh',
  Q: 'kwuh', R: 'rrr', S: 'sss', T: 'tuh', U: 'uh', V: 'vvv', W: 'wuh', X: 'ks',
  Y: 'yuh', Z: 'zzz'
};

const sillySmileys = ['😂', '😆', '🤣', '😁', '😹', '😄'];

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

function friendlyLower(letter) {
  if (letter === 'A') return 'ɑ';
  if (letter === 'T') return 't';
  return letter.toLowerCase();
}

function updateLetter(letter) {
  currentLetter = letter;
  const data = letterData[letter];
  if (!data) return;

  let displayLetter = letter;

  if (/[A-Z]/.test(letter)) {
    if (letterMode === 'lower') displayLetter = friendlyLower(letter);
    if (letterMode === 'both') displayLetter = `${letter} ${friendlyLower(letter)}`;
  }

  bigLetter.textContent = displayLetter;
  wordLine.textContent = `${displayLetter} is for ${data.word} ${data.emoji}`;
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
  if (soundEnabled) playLetterSound(letter);
  if (phonicsEnabled) speakPhonics(letter, data.word);
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

function playLetterSound(letter) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;
  let base = 260;

  if (/^[A-Z]$/.test(letter)) {
    base = 260 + (letter.charCodeAt(0) - 65) * 12;
  } else if (/^[0-9]$/.test(letter)) {
    base = 320 + Number(letter) * 35;
  }

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(base, now);
  oscillator.frequency.exponentialRampToValueAtTime(base * 1.25, now + 0.12);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.15, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.28);
}

function playFunKeySound() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const now = audioCtx.currentTime;

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(520, now);
  oscillator.frequency.exponentialRampToValueAtTime(780, now + 0.08);
  oscillator.frequency.exponentialRampToValueAtTime(420, now + 0.22);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

  oscillator.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.34);
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

function getDisplayLetter(letter) {
  if (letterMode === 'lower') return letter.toLowerCase();
  if (letterMode === 'both') return `${letter} ${letter.toLowerCase()}`;
  return letter;
}

function speakPhonics(letter, word) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  let phrase = word;

  if (/^[A-Z]$/.test(letter)) {
    const displayLetter = getDisplayLetter(letter);
    const phonics = phonicsMap[letter] || letter.toLowerCase();
    phrase = `${displayLetter}. ${phonics}. ${word}`;
  } else if (/^[0-9]$/.test(letter)) {
    phrase = word;
  }

  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.rate = 0.82;
  utterance.pitch = 1.18;
  utterance.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(voice => /en/i.test(voice.lang) && /child|female|samantha|zira|google uk english female|aria/i.test(voice.name))
    || voices.find(voice => /en/i.test(voice.lang));
  if (preferredVoice) utterance.voice = preferredVoice;
  window.speechSynthesis.speak(utterance);
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
    }
  } catch (error) {
    console.log('Fullscreen not available', error);
  }
}

fullscreenBtn.addEventListener('click', goFullscreen);

soundBtn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundBtn.textContent = `Sound: ${soundEnabled ? 'On' : 'Off'}`;
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

phonicsBtn.addEventListener('click', () => {
  phonicsEnabled = !phonicsEnabled;
  phonicsBtn.textContent = `Phonics: ${phonicsEnabled ? 'On' : 'Off'}`;
  if (phonicsEnabled) {
    const data = letterData[currentLetter];
    if (data) speakPhonics(currentLetter, data.word);
  } else if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
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
  }
});

if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

makeKeyboard();
updateLetter('A');
goFullscreen();
