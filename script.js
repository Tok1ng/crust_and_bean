const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
const arrowRight = document.getElementById('arrowRight');
const arrowLeft  = document.getElementById('arrowLeft');
const bgA = document.getElementById('bgA');
const bgB = document.getElementById('bgB');

const FPS = 48;
const FRAME_DURATION = 1000 / FPS;

const allFrames = [];
let allLoaded   = 0;

const allStops = [0, 24, 48, 72];
let currentStop = 0;
let playing     = false;
let rafId       = null;
let lastFrameTs = 0;

let activeBg = 'a';
let bgZone   = '';

const gradients = {
  classic: 'radial-gradient(circle at center, #B9DCA9 30%, #4a7a3a 100%)',
  straw:   'radial-gradient(circle at center, #FA5053 0%, #c23a3c 100%)',
  coconut: 'radial-gradient(circle at center, #ffe8da 30%, #c97a52 100%)',
};

const zones = ['classic', 'straw', 'coconut'];

const header = document.querySelector('header');

function switchBg(zone) {
  if (zone === bgZone) return;
  bgZone = zone;
  const incoming = activeBg === 'a' ? bgB : bgA;
  const outgoing  = activeBg === 'a' ? bgA : bgB;
  incoming.style.background = gradients[zone];
  incoming.style.opacity = '1';
  outgoing.style.opacity  = '0';
  activeBg = activeBg === 'a' ? 'b' : 'a';
  header.className = `zone-${zone}`;
}

function resizeCanvas() {
  const img = allFrames.find(f => f?.complete && f.naturalWidth > 0);
  if (!img) return;
  canvas.width  = img.naturalWidth;
  canvas.height = img.naturalHeight;
}

function drawImg(img) {
  if (!img?.complete) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function playAllFrames(from, to, dir, onDone) {
  playing = true;
  cancelAnimationFrame(rafId);
  let i = from;
  function step(ts) {
    if (ts - lastFrameTs >= FRAME_DURATION) {
      lastFrameTs = ts;
      drawImg(allFrames[i]);
      if (i === to) { playing = false; onDone && onDone(); return; }
      i += dir;
    }
    rafId = requestAnimationFrame(step);
  }
  rafId = requestAnimationFrame(step);
}

arrowRight.addEventListener('click', () => {
  if (playing) return;

  if (currentStop >= allStops.length - 1) {
    currentStop = 0;
    drawImg(allFrames[0]);
  }

  const from = allStops[currentStop];
  const to   = allStops[currentStop + 1];
  const next = currentStop + 1;

  switchBg(zones[next % zones.length]);

  playAllFrames(from, to, 1, () => { currentStop = next; });
  currentStop = next;
});

arrowLeft.addEventListener('click', () => {
  if (playing) return;

  if (currentStop <= 0) {
    currentStop = allStops.length - 1;
    drawImg(allFrames[72]);
  }

  const prev = currentStop - 1;
  switchBg(zones[prev % zones.length]);

  const from = allStops[currentStop];
  const to   = allStops[currentStop - 1];

  playAllFrames(from, to, -1, () => { currentStop = prev; });
  currentStop = prev;
});

function tryStart() {
  if (allLoaded === 73) {
    resizeCanvas();
    drawImg(allFrames[0]);
    switchBg('classic');
  }
}

for (let i = 1; i <= 73; i++) {
  const img = new Image();
  img.src = `frames/All (${i}).webp`;
  img.onload = () => { allLoaded++; tryStart(); };
  allFrames[i - 1] = img;
}
