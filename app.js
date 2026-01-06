const app = document.getElementById("app");
const ball = document.getElementById("ball");
const phraseEl = document.getElementById("phrase");
const nameEl = document.getElementById("name");

const clickSound = new Audio("click.mp3");
const rareSound = new Audio("rare.mp3");

let lastPhrase = "";

/* =======================
   ПЕРСОНАЖИ
======================= */
const characters = {
  ganvest: {
    name: "Ганвест",
    bgPos: "0% 0%",
    phrases: [
      "пэпэ сегодня всё пойдёт",
      "шнейне держи ритм",
      "пэпэ не суетись",
      "шнейне день твой",
      "пэпэ всё красиво",
      "шнейне путь открыт",
      "пэпэ фокус держи",
      "шнейне спокойно иди",
      "пэпэ момент поймал",
      "шнейне настрой верный",

      "пэпэ всё сложилось",
      "шнейне ты в потоке",
      "пэпэ не тормози",
      "шнейне баланс есть",
      "пэпэ движение верное",
      "шнейне всё реально"
    ],
    rare: [
      "пэпэ легендарный вайб",
      "шнейне ты выше игры",
      "пэпэ начинается большое"
    ]
  },

  pepeRich: {
    name: "Пэпэ богатый",
    bgPos: "25% 0%",
    phrases: [
      "деньги любят тишину",
      "всё идёт по плану",
      "ты сделал верный ход",
      "ресурсы на подходе",
      "время работает на тебя",
      "ты читаешь игру",
      "ставка сыграла",
      "баланс сохранён",
      "ты в плюсе",
      "ход сильный"
    ],
    rare: [
      "ты опередил всех",
      "ход десятилетия"
    ]
  },

  entus: {
    name: "Энтус",
    bgPos: "50% 0%",
    phrases: [
      "эээ…",
      "я не понял",
      "что происходит",
      "мне неловко",
      "я сломался",
      "ну такое",
      "я выхожу",
      "это странно",
      "я передумал",
      "ладно…"
    ],
    rare: [
      "энтус вошёл в истерику",
      "реальность дала сбой"
    ]
  },

  pepePoor: {
    name: "Пэпэ бедный",
    bgPos: "75% 0%",
    phrases: [
      "ничего, прорвёмся",
      "ты держишься",
      "это этап",
      "главное — идти",
      "путь длинный, но твой",
      "ты растёшь",
      "опыт тоже валюта",
      "всё впереди",
      "будет лучше",
      "ты не один"
    ],
    rare: [
      "дно — точка роста"
    ]
  },

  shnein: {
    name: "Шнейн",
    bgPos: "100% 0%",
    phrases: [
      "наблюдай внимательнее",
      "ответ уже есть",
      "пауза важна",
      "ты чувствуешь момент",
      "внутри есть ответ",
      "не спеши",
      "ясность придёт",
      "ты в балансе",
      "всё связано",
      "ты видишь больше"
    ],
    rare: [
      "ты понял суть",
      "дверь открылась"
    ]
  }
};

/* =======================
   ЛОГИКА
======================= */
function randomFrom(arr) {
  let pick;
  do {
    pick = arr[Math.floor(Math.random() * arr.length)];
  } while (pick === lastPhrase);
  lastPhrase = pick;
  return pick;
}

function getPhrase(char) {
  const isRare = Math.random() < 0.15;
  return {
    text: isRare ? randomFrom(char.rare) : randomFrom(char.phrases),
    rare: isRare
  };
}

/* =======================
   КЛИК
======================= */
ball.addEventListener("click", () => {
  ball.classList.add("shake");
  clickSound.currentTime = 0;
  clickSound.play();

  const keys = Object.keys(characters);
  const char = characters[keys[Math.floor(Math.random() * keys.length)]];

  const result = getPhrase(char);

  nameEl.textContent = char.name;
  phraseEl.textContent = result.text;
  phraseEl.classList.toggle("rare", result.rare);

  app.style.backgroundPosition = char.bgPos;

  if (navigator.vibrate) navigator.vibrate(result.rare ? 120 : 40);

  if (result.rare) {
    rareSound.currentTime = 0;
    rareSound.play();
    app.classList.add("flash");
    setTimeout(() => app.classList.remove("flash"), 300);
  }

  setTimeout(() => ball.classList.remove("shake"), 600);
});
