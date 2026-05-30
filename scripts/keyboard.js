if (sessionStorage.getItem('babooPlayYardEntry') !== 'allowed') {
  window.location.replace('./index.html');
}

sessionStorage.removeItem('babooPlayYardEntry');

const letterData = {
  A: [
    { word: 'Apple', emoji: '🍎' },
    { word: 'Ant', emoji: '🐜' },
    { word: 'Airplane', emoji: '✈️' }
  ],
  B: [
    { word: 'Ball', emoji: '⚽' },
    { word: 'Bear', emoji: '🐻' },
    { word: 'Banana', emoji: '🍌' },
    { word: 'Balloon', emoji: '🎈' }
  ],
  C: [
    { word: 'Cat', emoji: '🐱' },
    { word: 'Car', emoji: '🚗' },
    { word: 'Cookie', emoji: '🍪' },
    { word: 'Cow', emoji: '🐮' }
  ],
  D: [
    { word: 'Dog', emoji: '🐶' },
    { word: 'Duck', emoji: '🦆' },
    { word: 'Dolphin', emoji: '🐬' }
  ],
  E: [
    { word: 'Elephant', emoji: '🐘' },
    { word: 'Egg', emoji: '🥚' }
  ],
  F: [
    { word: 'Fish', emoji: '🐟' },
    { word: 'Frog', emoji: '🐸' },
    { word: 'Flower', emoji: '🌸' },
    { word: 'Firetruck', emoji: '🚒' }
  ],
  G: [
    { word: 'Grapes', emoji: '🍇' },
    { word: 'Goat', emoji: '🐐' },
    { word: 'Gift', emoji: '🎁' }
  ],
  H: [
    { word: 'Heart', emoji: '💖' },
    { word: 'Horse', emoji: '🐴' },
    { word: 'House', emoji: '🏠' }
  ],
  I: [
    { word: 'Ice Cream', emoji: '🍦' },
    { word: 'Island', emoji: '🏝️' }
  ],
  J: [
    { word: 'Juice', emoji: '🧃' },
    { word: 'Jellyfish', emoji: '🪼' }
  ],
  K: [
    { word: 'Kite', emoji: '🪁' },
    { word: 'Koala', emoji: '🐨' },
    { word: 'Key', emoji: '🔑' }
  ],
  L: [
    { word: 'Lion', emoji: '🦁' },
    { word: 'Lemon', emoji: '🍋' },
    { word: 'Leaf', emoji: '🍃' }
  ],
  M: [
    { word: 'Monkey', emoji: '🐵' },
    { word: 'Moon', emoji: '🌙' },
    { word: 'Mouse', emoji: '🐭' }
  ],
  N: { word: 'Nest', emoji: '🪺' },
  O: { word: 'Orange', emoji: '🍊' },
  P: [
    { word: 'Penguin', emoji: '🐧' },
    { word: 'Pizza', emoji: '🍕' },
    { word: 'Puppy', emoji: '🐶' }
  ],
  Q: { word: 'Queen', emoji: '👸' },
  R: [
    { word: 'Rainbow', emoji: '🌈' },
    { word: 'Rabbit', emoji: '🐰' },
    { word: 'Robot', emoji: '🤖' }
  ],
  S: [
    { word: 'Sun', emoji: '☀️' },
    { word: 'Star', emoji: '⭐' },
    { word: 'Strawberry', emoji: '🍓' }
  ],
  T: [
    { word: 'Tiger', emoji: '🐯' },
    { word: 'Turtle', emoji: '🐢' },
    { word: 'Train', emoji: '🚂' }
  ],
  U: [
    { word: 'Umbrella', emoji: '☂️' },
    { word: 'Unicorn', emoji: '🦄' }
  ],
  V: { word: 'Violin', emoji: '🎻' },
  W: [
    { word: 'Whale', emoji: '🐋' },
    { word: 'Watermelon', emoji: '🍉' },
    { word: 'Worm', emoji: '🪱' }
  ],
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
let hasAskedFullscreenOnPlay = false;

const rows = ['1234567890', 'QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

const sillySmileys = ['😂', '😆', '🤣', '😁', '😹', '😄'];
const countingEmojis = [
  { name: 'star', emoji: '⭐' },
  { name: 'ball', emoji: '⚽' },
  { name: 'balloon', emoji: '🎈' },
  { name: 'cookie', emoji: '🍪' },
  { name: 'car', emoji: '🚗' }
];

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
  startFullscreenOnFirstPlay();

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
  if (count === 0) return '0 little things 🫙';

  const item = countingEmojis[Math.floor(Math.random() * countingEmojis.length)];
  const label = count === 1 ? item.name : `${item.name}s`;
  return `${count} little ${label} ${item.emoji.repeat(count)}`;
}

function friendlyLower(letter) {
  if (letter === 'A') return 'ɑ';
  if (letter === 'T') return 't';
  return letter.toLowerCase();
}

function getLetterExample(letter, useDefault = false) {
  const examples = letterData[letter];
  if (!examples) return null;
  if (!Array.isArray(examples)) return examples;
  return useDefault ? examples[0] : pickRandom(examples);
}

function updateLetter(letter, shouldPlaySound = true, useDefaultExample = false) {
  currentLetter = letter;
  const data = getLetterExample(letter, useDefaultExample);
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

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function playTone({
  type,
  startFrequency,
  peakFrequency,
  endFrequency,
  duration,
  volume,
  delay = 0
}) {
  const context = getAudioContext();

  const scheduleTone = () => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime + delay;

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

  const sound = pickRandom([
    () => playTone({
      type: 'sine',
      startFrequency: base,
      peakFrequency: base * 1.3,
      endFrequency: base * 1.12,
      duration: 0.26,
      volume: 0.14
    }),
    () => playTone({
      type: 'triangle',
      startFrequency: base * 1.15,
      peakFrequency: base * 1.7,
      endFrequency: base * 1.32,
      duration: 0.2,
      volume: 0.13
    }),
    () => {
      playTone({
        type: 'sine',
        startFrequency: base,
        peakFrequency: base * 1.22,
        endFrequency: base * 1.08,
        duration: 0.16,
        volume: 0.12
      });
      playTone({
        type: 'triangle',
        startFrequency: base * 1.5,
        peakFrequency: base * 1.75,
        endFrequency: base * 1.62,
        duration: 0.18,
        volume: 0.08,
        delay: 0.08
      });
    },
    () => playTone({
      type: 'square',
      startFrequency: base * 0.86,
      peakFrequency: base * 1.08,
      endFrequency: base * 0.94,
      duration: 0.14,
      volume: 0.07
    })
  ]);

  sound();
}

function playFunKeySound() {
  const sound = pickRandom([
    () => playTone({
      type: 'triangle',
      startFrequency: 520,
      peakFrequency: 780,
      endFrequency: 420,
      duration: 0.34,
      volume: 0.16
    }),
    () => {
      playTone({
        type: 'sine',
        startFrequency: 660,
        peakFrequency: 940,
        endFrequency: 580,
        duration: 0.16,
        volume: 0.12
      });
      playTone({
        type: 'sine',
        startFrequency: 440,
        peakFrequency: 720,
        endFrequency: 380,
        duration: 0.18,
        volume: 0.1,
        delay: 0.09
      });
    },
    () => playTone({
      type: 'sawtooth',
      startFrequency: 360,
      peakFrequency: 900,
      endFrequency: 300,
      duration: 0.22,
      volume: 0.08
    }),
    () => playTone({
      type: 'square',
      startFrequency: 240,
      peakFrequency: 520,
      endFrequency: 280,
      duration: 0.18,
      volume: 0.07
    })
  ]);

  sound();
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
  setTimeout(() => dot.remove(), 850);
});

async function goFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await enterFullscreen();
    } else {
      await document.exitFullscreen();
      document.body.classList.remove('fullscreen-mode');
      fullscreenBtn.textContent = 'Full Screen';
    }
  } catch (error) {
    console.log('Fullscreen not available', error);
  }
}

async function enterFullscreen() {
  if (document.fullscreenElement) return;

  try {
    await document.documentElement.requestFullscreen();
    document.body.classList.add('fullscreen-mode');
    fullscreenBtn.textContent = 'Exit Full Screen';
  } catch (error) {
    console.log('Fullscreen not available', error);
  }
}

function startFullscreenOnFirstPlay() {
  if (hasAskedFullscreenOnPlay || document.fullscreenElement) return;
  hasAskedFullscreenOnPlay = true;
  enterFullscreen();
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
updateLetter('A', false, true);
