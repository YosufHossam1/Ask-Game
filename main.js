let players = document.querySelectorAll(".player");
let startGame = document.querySelector("button");
let playersName = [];

players.forEach((player) => {
  player.addEventListener("click", () => {
    player.classList.toggle("active");
    player.classList.toggle("unactive");
    if (player.classList.contains("active")) {
      let name = player.getAttribute("data-name");
      playersName.push(name);
    } else if (player.classList.contains("unactive")) {
      let name = player.getAttribute("data-name");
      let index = playersName.indexOf(name);
      playersName.splice(index, 1);
    }
  });
});

startGame.addEventListener("click", async () => {
  let playersHost = playersName;
  for (let i = playersHost.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playersHost[i], playersHost[j]] = [playersHost[j], playersHost[i]];
  }
  let randomHosts = playersHost;
  localStorage.setItem("randomHosts", JSON.stringify(randomHosts));

  let playersGuest = playersName;
  for (let i = playersGuest.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playersGuest[i], playersGuest[j]] = [playersGuest[j], playersGuest[i]];
  }
  let randomGuests = playersGuest;
  localStorage.setItem("randomGuests", JSON.stringify(randomGuests));

  if (playersName.length < 2) {
    alert("يجب ان يكون عدد اللاعبين اكثر من 2");
  } else {
    window.location.href = "/html/game.html";
  }
});
