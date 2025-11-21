let DATA = {};
async function loadData() {
  const r = await fetch('data/data.json');
  DATA = await r.json();
}
function loadPage(page) {
  if (page === 'alphabet') renderAlphabet();
  if (page === 'numbers') renderNumbers();
  if (page === 'vocab') renderVocab();
  if (page === 'sentences') renderSentences();
}
function renderAlphabet() {
  const app = document.getElementById('app');
  let html = '<h2>字母表</h2><div class="grid">';
  DATA.alphabet.forEach(a => {
    html += `<div class='card' onclick="play('${a.audio}')"><h3>${a.letter}</h3><p>${a.type}</p><p>${a.name}</p></div>`;
  });
  html += '</div>';
  app.innerHTML = html;
}
function renderNumbers() {
  const app = document.getElementById('app');
  let html = '<h2>泰文數字與單位</h2><div class="grid">';
  DATA.numbers.forEach(n => {
    html += `<div class='card' onclick="play('${n.audio}')"><h3>${n.th}</h3><p>${n.zh} / ${n.num}</p></div>`;
  });
  html += '</div>';
  app.innerHTML = html;
}
function renderVocab() {
  const app = document.getElementById('app');
  let saved = JSON.parse(localStorage.getItem('vocab') || '[]');
  let html = '<h2>單字本</h2><div class="grid">';
  saved.forEach(v => {
    html += `<div class='card'><h3>${v.th}</h3><p>${v.zh}</p></div>`;
  });
  html += '</div>';
  app.innerHTML = html;
}
function renderSentences() {
  const app = document.getElementById('app');
  let html = '<h2>例句造句</h2>';
  DATA.sentences.forEach(s => {
    html += `<div class='card' onclick="play('${s.audio}')"><p>${s.th}</p><p>${s.zh}</p></div>`;
  });
  app.innerHTML = html;
}
function play(src) {
  if (!src) return;
  new Audio(src).play();
}
loadData();
