let DATA = {};

async function loadData() {
  const res = await fetch('https://script.google.com/macros/s/AKfycbwnQy2RWtBkFhgAowI6hBEg557oOp3WKXqVxEl0VBsjmhTmQw4p6SIb6TF_ChpkP0k1/exec');
  const json = await res.json();
  DATA.consonants = json.consonants;
  DATA.vowels = json.vowels;
  DATA.numbers = json.numbers;
}

function loadPage(page) {
  if (page === 'consonants') renderConsonants();
  if (page === 'vowels') renderVowels();
  if (page === 'numbers') renderNumbers();
}

function renderConsonants() {
  const app = document.getElementById('app');
  let html = '<h2>子音表</h2><div class="grid">';
  DATA.consonants.forEach(c => {
    html += `<div class='card' onclick="play('${c.字母}')">
                <h3>${c.字母}</h3>
                <p>${c.種類}</p>
                <p>${c.代表單字} / ${c.音標} / ${c.意思}</p>
             </div>`;
  });
  html += '</div>';
  app.innerHTML = html;
}

function renderVowels() {
  const app = document.getElementById('app');
  let html = '<h2>母音表</h2><div class="grid">';
  DATA.vowels.forEach(v => {
    html += `<div class='card' onclick="play('${v.母音}')">
                <h3>${v.母音}</h3>
                <p>${v['長/短']}</p>
                <p>${v.音標}</p>
             </div>`;
  });
  html += '</div>';
  app.innerHTML = html;
}

function renderNumbers() {
  const app = document.getElementById('app');
  let html = '<h2>數字表</h2><div class="grid">';
  DATA.numbers.forEach(n => {
    html += `<div class='card' onclick="play('${n.字母}')">
                <h3>${n.字母}</h3>
                <p>${n.種類}</p>
                <p>${n.代表單字} / ${n.音標} / ${n.意思}</p>
             </div>`;
  });
  html += '</div>';
  app.innerHTML = html;
}

function play(text) {
  if (!text) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'th-TH';
  speechSynthesis.speak(utter);
}

loadData();
