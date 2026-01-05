
const orb = document.getElementById("orb");
const card = document.getElementById("card");
const text = document.getElementById("text");
const avatar = document.getElementById("avatar");
const nameEl = document.getElementById("name");
const buttons = document.querySelectorAll(".characters button");

let currentChar = "ganvest";

const characters = {
  ganvest: {
    name: "Ганвест",
    color: "linear-gradient(135deg, #ff6a00, #ff2e2e)",
    phrases: [
      "Сегодня всё решается спокойно",
      "Не суетись — пойдёт само",
      "Ты уже в игре",
      "Фокус держи",
      "День твой",
      "Не дергайся раньше времени",
      "Поймай ритм"
    ],
    weeds: ["пэпэ", "шнейне", "фааа"]
  },

  pepeRich: {
    name: "Пэпэ богатый",
    color: "linear-gradient(135deg, #2aff9e, #0f9b5f)",
    phrases: [
      "Деньги любят тишину",
      "Хороший день для решений",
      "Ты мыслишь правильно",
      "Профит близко",
      "Спокойствие = рост"
    ]
  },

  pepePoor: {
    name: "Пэпэ бедный",
    color: "linear-gradient(135deg, #777, #444)",
    phrases: [
      "Ну бывает",
      "Сегодня без резких движений",
      "Опыт тоже валюта",
      "Живём дальше",
      "Не конец света"
    ]
  },

  shneyn: {
    name: "Шнейн",
    color: "linear-gradient(135deg, #7f7cff, #3a36d6)",
    phrases: [
      "Реальность сегодня странная",
      "Смысл появится позже",
      "Не анализируй",
      "Прими хаос",
      "Так надо"
    ]
  },

  watafa: {
    name: "Ватафа",
    color: "linear-gradient(135deg, #ff3c7e, #9b1d4a)",
    phrases: [
      "Что вообще происходит?",
      "Я не готов к этому",
      "Как мы сюда дошли",
      "Это точно нормально?",
      "Ладно, поехали"
    ]
  }
};

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function addWeeds(text, weeds) {
  return text
    .split(" ")
    .map(word =>
      Math.random() < 0.4 ? `${word} ${random(weeds)}` : word
    )
    .join(" ");
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentChar = btn.dataset.char;
  });
});

orb.addEventListener("click", () => {
  const character = characters[currentChar];
  let phrase = random(character.phrases);

  if (currentChar === "ganvest") {
    phrase = addWeeds(phrase, character.weeds);
  }

  nameEl.textContent = character.name;
  text.textContent = phrase;
  avatar.style.background = character.color;

  card.classList.remove("hidden");

  orb.style.transform = "scale(0.95)";
  setTimeout(() => {
    orb.style.transform = "scale(1)";
  }, 150);
});