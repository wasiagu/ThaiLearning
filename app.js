let DATA = {};

// 這裡放你公開的 CSV URL
const CSV_URLS = {
  Consonants: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSVeJINzJ9PNHuNJymHEle_ClecAuSKYdU5UgjovGsjuWDRMtIA5QQpmq59nZwKRDeqJlN_ACxyq3Mz/pub?gid=0&single=true&output=csv',
  Vowels:     'https://docs.google.com/spreadsheets/d/e/2PACX-1vSVeJINzJ9PNHuNJymHEle_ClecAuSKYdU5UgjovGsjuWDRMtIA5QQpmq59nZwKRDeqJlN_ACxyq3Mz/pub?gid=1209877284&single=true&output=csv',
  Numbers:    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSVeJINzJ9PNHuNJymHEle_ClecAuSKYdU5UgjovGsjuWDRMtIA5QQpmq59nZwKRDeqJlN_ACxyq3Mz/pub?gid=1402488737&single=true&output=csv'
};

// 把 CSV 轉成 JSON
async function loadCSV(url) {
  const res = await fetch(url);
  const text = await res.text();
  const rows = text.trim().split('\n').map(r => r.split(','));
  const header = rows[0];
  return rows.slice(1).map(row => {
    let obj = {};
    header.forEach((key, i) => obj[key] = row[i]);
    return obj;
  });
}

// 先載入所有 CSV
async function loadData() {
  for (const key in CSV_URLS) {
    DATA[key] = await loadCSV(CSV_URLS[key]);
  }
}

function loadPage(sheetName) {
  if (!DATA[sheetName] || DATA[sheetName].length === 0) {
    document.getElementById('app').innerHTML = `<p>沒有資料或 Sheet 名稱錯誤: ${sheetName}</p>`;
    return;
  }

  const app = document.getElementById('app');
  let html = `<h2>${sheetName}</h2><div class="grid">`;

  DATA[sheetName].forEach(item => {
    html += `<div class='card' onclick="play('${item.字母 || item.母音}')">`;

    if (item.字母) { // 子音或數字
      html += `<h3>${item.字母}</h3>`;
      html += `<p>${item.種類 || ''}</p>`;
      html += `<p>${item.代表單字 || ''} / ${item.音標 || ''} / ${item.意思 || ''}</p>`;
    } else if (item.母音) { // 母音
      html += `<h3>${item.母音}</h3>`;
      html += `<p>${item['長/短'] || ''}</p>`;
      html += `<p>${item.音標 || ''}</p>`;
    }

    html += `</div>`;
  });

  html += '</div>';
  app.innerHTML = html;
}

// Web Speech API 發音
function play(text) {
  if (!text) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'th-TH';
  speechSynthesis.speak(utter);
}

// 先載入資料
loadData();
