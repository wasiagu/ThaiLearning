let data = [];
let currentType = "consonant";

fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    renderCards();
  });

const tabs = document.querySelectorAll(".tabs button");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    currentType = tab.dataset.type;
    renderCards();
  });
});

function renderCards() {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  const filtered = data.filter(item => item.type === currentType);

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    let content = "";
    if(item.type === "consonant" || item.type === "vowel") {
      content = `<div style="font-size:40px">${item.symbol}</div><div>${item.example}</div>`;
    } else if(item.type === "word") {
      content = `<div style="font-size:30px">${item.text}</div><div>${item.translation}</div><div>${item.example_sentence}</div>`;
    } else if(item.type === "sentence") {
      content = `<div style="font-size:24px">${item.text}</div><div>${item.translation}</div>`;
    }

    card.innerHTML = content + `<div class="play-btn">🔊</div>`;
    container.appendChild(card);

    const playBtn = card.querySelector(".play-btn");
    playBtn.addEventListener("click", () => {
      const utterance = new SpeechSynthesisUtterance(item.symbol || item.text);
      utterance.lang = "th-TH";
      speechSynthesis.speak(utterance);
    });
  });
}
