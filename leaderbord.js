let randomGuests = JSON.parse(localStorage.getItem("randomGuests"));
let playersScores1 = JSON.parse(localStorage.getItem("playersScores1")) || [];
let playersScores2 = JSON.parse(localStorage.getItem("playersScores2")) || [];
let playersScores3 = JSON.parse(localStorage.getItem("playersScores3")) || [];
let playersScores4 = JSON.parse(localStorage.getItem("playersScores4")) || [];
let playersScores5 = JSON.parse(localStorage.getItem("playersScores5")) || [];
let playersScores6 = JSON.parse(localStorage.getItem("playersScores6")) || [];

let playersScores = [
  ...playersScores1,
  ...playersScores2,
  ...playersScores3,
  ...playersScores4,
  ...playersScores5,
  ...playersScores6,
];

let lastArray = newArray();
let score = filter(lastArray);
sort(score);
setNames(score);

function newArray() {
  let AllScore = playersScores.reduce((acc, curr) => {
    const { name, score } = curr;
    if (!acc[name]) {
      acc[name] = { name, score: 0 };
    }
    acc[name].score += score;
    return acc;
  }, {});
  AllScore = Object.values(AllScore).sort((a, b) => b.score - a.score);
  return AllScore;
}

function filter(AllScore) {
  let filtered = AllScore.filter((obj) => {
    return randomGuests.includes(obj.name);
  });
  return filtered;
}

function sort(filtered) {
  let cards = document.querySelector(".cards");

  for (let i = 0; i < filtered.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");

    let rank = document.createElement("img");
    rank.setAttribute("src", "../images/rank" + (i + 1) + ".png");
    let photo = document.createElement("img");
    photo.setAttribute("src", `../images/${filtered[i].name}` + ".png");

    let name = document.createElement("h2");
    name.textContent = filtered[i].name;

    let score = document.createElement("span");
    score.textContent = `نقطة ${filtered[i].score}`;

    card.appendChild(rank);
    card.appendChild(photo);
    card.appendChild(name);
    card.appendChild(score);
    cards.appendChild(card);
  }
}

function setNames(filtered) {
  let top = document.querySelector(".top");
  top.textContent = filtered[0].name;
}

let restart = document.querySelector(".restart");
restart.onclick = () => {
  localStorage.clear();
  window.location.href = "../index.html";
};
