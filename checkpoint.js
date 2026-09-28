let playersScores = JSON.parse(localStorage.getItem("playersScores"));
let randomGuests = JSON.parse(localStorage.getItem("randomGuests"));
let currentHost = JSON.parse(localStorage.getItem("currentHost"));
let randomHosts = JSON.parse(localStorage.getItem("randomHosts"));

let hostPlace = document.querySelector(".host");
let guestPlace = document.querySelector(".guest");
let next = document.querySelector(".next-question");

Start();
function Start() {
  let newArray = filter();
  sort(newArray);
  setNames(newArray);
}

function filter() {
  let filtered = playersScores.filter((obj) => {
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
    rank.setAttribute("src", "/images/rank" + (i + 1) + ".png");
    let photo = document.createElement("img");
    photo.setAttribute("src", `/images/${filtered[i].name}` + ".png");

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
  hostPlace.textContent = currentHost;
  guestPlace.textContent = filtered[0].name;
}
SetHosts();
function SetHosts() {
  randomHosts.shift();
  localStorage.setItem("randomHosts", JSON.stringify(randomHosts));

  randomGuests.unshift(currentHost);
  localStorage.setItem("randomGuests", JSON.stringify(randomGuests));
}

next.onclick = () => {
  console.log(randomHosts.length);
  if (randomHosts.length == 0) {
    window.location.href = "/html/leaderbord.html";
  } else {
    window.location.href = "/html/game.html";
  }
};

let array = ["Yosuf", "Body", "Ekey", "AbdAllah", "Omar", "Eslam"];
console.log(array);
array.unshift("ss");
console.log(array);
/*

"Yosuf","Omar","Body"]
randomGuests	["Body","Omar"]
currentHost	"Omar"

shift
    (6) [{…}, {…}, {…}, {…}, {…}, {…}]
0
:
{name: 'Yosuf', score: 3, rank: 1}
1
:
{name: 'Body', score: 2, rank: 2}
2
:
{name: 'Ekey', score: 0, rank: 3}
3
:
{name: 'AbdAllah', score: 0, rank: 4}
4
:
{name: 'Omar', score: 0, rank: 5}
5
:
{name: 'Eslam', score: 0, rank: 6}
length
:
6
[[Prototype]]
:
Array(0)
  */
