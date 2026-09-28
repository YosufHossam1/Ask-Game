// All Elements
let qSection = document.querySelector(".question");
let option1 = document.querySelector(".a-1");
let option2 = document.querySelector(".a-2");
let option3 = document.querySelector(".a-3");
let option4 = document.querySelector(".a-4");
let qNumber = document.querySelector(".question-number");
let totalQ = document.querySelector(".total-questions");

let input = document.querySelectorAll(".card input");

let nextQuestion = document.querySelector(".next-question");
let cards = document.querySelectorAll(".card");
let answer = document.querySelectorAll("input:checked");
let allInputs = document.querySelectorAll(".card input");

let nextPerson = document.querySelector(".nextPerson");
let personName = document.querySelector(".person-name");
let personQ = document.querySelector(".person-q");
let personA = document.querySelector(".person-a");

let ready = document.querySelector(".ready");

// Settings
let currentQ = 0;
let choice = null;
let currentData = null;
let randomPlayerSelected = 1;
let currentHost = 0;
let currentGuest = 0;

let Yosuf = 0;
let Ekey = 0;
let AbdAllah = 0;
let Omar = 0;
let Eslam = 0;
let Body = 0;

// Get Data From Local Storage

play();
function play() {
  let players = GetPlayers();
  getData(players[0]);
  nextQ(players[0], players[1]);
  setNames(players[0], players[1]);
}

function GetPlayers() {
  let randomHosts = JSON.parse(localStorage.getItem("randomHosts"));
  let randomGuests = JSON.parse(localStorage.getItem("randomGuests"));

  let removeGuest = randomGuests.indexOf(randomHosts[currentHost]);
  randomGuests.splice(removeGuest, 1);
  localStorage.setItem("randomGuests", JSON.stringify(randomGuests));

  return [randomHosts, randomGuests];
}

// set names
function setNames(hosts, guests) {
  personQ.textContent = hosts[currentHost];
  personA.textContent = guests[currentGuest];
}

// Get Data
function getData(hosts) {
  fetch(`/jsons/${hosts[currentHost]}.json`)
    .then((res) => res.json())
    .then((data) => {
      currentData = data;
      getQForGame(data);
    });
}

// Get Q For Game
function getQForGame(data) {
  let qus = data[currentQ].question;
  qSection.textContent = qus;
  let options = data[currentQ].options;
  option1.textContent = options[0];
  option2.textContent = options[1];
  option3.textContent = options[2];
  option4.textContent = options[3];
  qNumber.textContent = data[currentQ].id;
  totalQ.textContent = data.length;
  reset();
}

// Reset question
function reset() {
  nextQuestion.style.opacity = "0.2";
  nextQuestion.disabled = true;
  choice = null;
  allInputs.forEach((input) => {
    input.checked = false;
  });
  input.forEach((input) => {
    input.onchange = (card) => {
      nextQuestion.style.opacity = "1";
      nextQuestion.disabled = false;
      choice = Number(card.target.id.match(/\d+/));
    };
  });
}

ready.onclick = () => {
  nextPerson.style.visibility = "hidden";
};

// Next Question

// Next Question
function nextQ(hosts, guests) {
  nextQuestion.onclick = () => {
    let currentGuestName = guests[currentGuest];

    if (choice === currentData[currentQ].correct) {
      if (currentGuestName === "Yosuf") {
        Yosuf++;
      } else if (currentGuestName === "Ekey") {
        Ekey++;
      } else if (currentGuestName === "AbdAllah") {
        AbdAllah++;
      } else if (currentGuestName === "Omar") {
        Omar++;
      } else if (currentGuestName === "Eslam") {
        Eslam++;
      } else if (currentGuestName === "Body") {
        Body++;
      }
    }

    if (currentGuest < guests.length - 1) {
      currentGuest++;
      setNames(hosts, guests);
      nextPerson.style.visibility = "visible";
      reset();
    } else {
      currentQ++;
      getData(hosts);
      currentGuest = 0;
      nextPerson.style.visibility = "visible";
      setNames(hosts, guests);
      reset();
    }
    if (currentQ === 2) {
      let playersScores = [
        { name: "Yosuf", score: Yosuf },
        { name: "Ekey", score: Ekey },
        { name: "AbdAllah", score: AbdAllah },
        { name: "Omar", score: Omar },
        { name: "Eslam", score: Eslam },
        { name: "Body", score: Body },
      ];

      playersScores.sort((a, b) => b.score - a.score);

      // let rank = 1;
      // for (let i = 0; i < playersScores.length; i++) {
      //   playersScores[i].rank = rank;
      //   rank++;
      // }

      playersScores.sort((a, b) => a.rank - b.rank);

      localStorage.setItem("currentHost", JSON.stringify(hosts[currentHost]));
      localStorage.setItem("playersScores", JSON.stringify(playersScores));
      let rounds = JSON.parse(localStorage.getItem("rounds")) || 1;
      localStorage.setItem(
        `playersScores${rounds}`,
        JSON.stringify(playersScores),
      );
      localStorage.setItem(`rounds`, JSON.stringify(rounds + 1));

      window.location.href = "/markap html/checkpoint.html";
    }
  };
}
/*
function nextQ(hosts, guest) {
  nextQuestion.addEventListener("click", () => {
    nextPerson.style.visibility = "visible";
    setNames(hosts, guest);
    if (choice === currentData[currentQ].correct) {
      if (guest[currentGuest] === "Yosuf") {
        Yosuf++;
      } else if (guest[currentGuest] === "Ekey") {
        Ekey++;
      } else if (guest[currentGuest] === "AbdAllah") {
        AbdAllah++;
      } else if (guest[currentGuest] === "Omar") {
        Omar++;
      } else if (guest[currentGuest] === "Eslam") {
        Eslam++;
      } else if (guest[currentGuest] === "Body") {
        Body++;
      }
      console.log(Yosuf, Ekey, AbdAllah, Omar, Eslam, Body);
    }
    currentGuest++;
    // currentQ++;
    if (currentQ < 10) {
      getData(hosts);
    } else {
      localStorage.setItem("", JSON.stringify());
    }
  });
}


if (currentGuest < guests.length && currentQ < currentData.length - 1) {
      currentQ++;
      getData(hosts); // جلب السؤال التالي
      setNames(hosts, guests); // تحديث الأسماء فورا للضيف الجديد
      nextPerson.style.visibility = "visible"; // إظهار شاشة الانتقال بين الأدوار
    } else {
      console.log("Game Over / Round Finished");
      localStorage.setItem("", JSON.stringify());
      // هنا يمكنك الانتقال لصفحة النتائج
    }

*/
