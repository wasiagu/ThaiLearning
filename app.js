let DATA = {};

async function loadData() {
  // 使用你 Google Apps Script 的 JSON URL
  const res = await fetch('https://script.google.com/macros/s/AKfycbwnQy2RWtBkFhgAowI6hBEg557oOp3WKXqVxEl0VBsjmhTmQw4p6SIb6TF_ChpkP0k1/exec');
  const json = await res.json();
  DATA = json; // 存整個 JSON
}

function loadPage(sheetName) {
  if (!DATA[sheetName] || DATA[sheetName].length === 0) {
    document.getElementById('app').innerHTML = '<p>沒有資料或 Sheet 名稱錯誤: ' + sheetName + '</p>';
    return;
  }

  const app = document.getElementById('app');
  let html = '<h2>' + sheetName + '</h2><div class="grid">';

  DATA[sheetName].forEach(item => {
    html += `<div class='card' onclick="play('${item.字母 || item.母音}')">`;
    
    // 子音或數字
    if(item.字母) {
      html += `<h3>${item.字母}</h3>`;
      html += `<p>${item.種類 || ''}</p>`;
      html += `<p>${item.代表單字 || ''} / ${item.音標 || ''} / ${item.意思 || ''}</p>`;
    }
    // 母音
    else if(item.母音) {
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

// 先載入 JSON
loadData();
