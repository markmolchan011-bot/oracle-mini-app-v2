const ball = document.getElementById("ball");
const phraseEl = document.getElementById("phrase");
const characterEl = document.getElementById("character");
const rarityEl = document.getElementById("rarity");

const tap = document.getElementById("tap");
const rare = document.getElementById("rare");
const ultra = document.getElementById("ultra");

const tg = window.Telegram?.WebApp;
let lastPhrase = "";

const characters = [
  {
    name: "ГАНВЕСТ",
    weight: 3,
    image: "images/ganvest.png",
    phrases: [
      "пэпэ жизнь шнейне идёт",
      "ватафак пэпэ я понял",
      "шнейне брат пэпэ",
      "я в вайбе пэпэ",
      "пэпэ не тормози",
      "шнейне это знак",
      "пэпэ двигайся",
      "ватафак снова это",
      "шнейне живём",
      "пэпэ слышишь"
    ]
  },
  {
    name: "ПЭПЭ БОГАТЫЙ",
    weight: 2,
    image: "images/pepe-rich.png",
    phrases: [
      "ты уже знаешь ответ",
      "поздно сомневаться",
      "деньги любят тишину",
      "работай без шума",
      "вопрос не в цене",
      "ты опережаешь",
      "контроль у тебя",
      "всё идёт по плану",
      "не останавливайся",
      "ты готов"
    ]
  },
  {
    name: "ПЭПЭ БЕДНЫЙ",
    weight: 2,
    image: "images/pepe-poor.png",
    phrases: [
      "ну и ладно",
      "зато честно",
      "бывает",
      "день прошёл",
      "я старался",
      "ну зато опыт",
      "жизнь странная",
      "ещё не конец",
      "зато смешно",
      "поживём увидим"
    ]
  },
  {
    name: "ЭНТУС",
    weight: 1,
    image: "images/entus.png",
    phrases: [
      "АААА ЧТО ЭТО",
      "Я НЕ ГОТОВ",
      "ПОЧЕМУ ОНО ДВИГАЕТСЯ",
      "МНЕ НЕ НРАВИТСЯ",
      "ЭТО СТРАННО",
      "Я УХОЖУ",
      "НЕТ НЕТ НЕТ",
      "Я СЕЙЧАС УПАДУ",
      "ХВАТИТ",
      "ПРЕКРАТИ"
    ]
  },
  {
    name: "ШНЕЙН",
    weight: 1,
    image: "images/shnein.png",
    phrases: [
      "ты уже знаешь",
      "ответ внутри",
      "наблюдай",
      "это повтор",
      "не спеши",
      "пауза важна",
      "ты вовремя",
      "это не случайно",
      "прими",
      "дальше ясно"
    ]
  }
];

function weightedPick(arr) {
  const sum = arr.reduce((s, c) => s + c.weight, 0);
  let r = Math.random() * sum;
  for (const c of arr) {
    if (r < c.weight) return c;
    r -= c.weight;
  }
}

function haptic(type = "light") {
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred(type);
  else navigator.vibrate?.(20);
}

function pickPhrase(list) {
  let p;
  do {
    p = list[Math.floor(Math.random() * list.length)];
  } while (p === lastPhrase);
  lastPhrase = p;
  return p;
}

function play(sound) {
  sound.currentTime = 0;
  sound.play().catch(()=>{});
}

function press() {
  const roll = Math.random();
  const char = weightedPick(characters);

  characterEl.textContent = char.name;
  phraseEl.textContent = pickPhrase(char.phrases);
  ball.style.backgroundImage = `url(${char.image})`;

  ball.classList.add("shake");
  setTimeout(() => ball.classList.remove("shake"), 450);

  if (roll < 0.03) {
    rarityEl.textContent = "УЛЬТРА РЕДКО";
    document.body.classList.add("glitch");
    play(ultra);
    haptic("heavy");
    setTimeout(() => document.body.classList.remove("glitch"), 600);
  } else if (roll < 0.12) {
    rarityEl.textContent = "РЕДКО";
    play(rare);
    haptic("medium");
  } else {
    rarityEl.textContent = "";
    play(tap);
    haptic("light");
  }
}

ball.addEventListener("click", press);
ball.addEventListener("touchstart", e => {
  e.preventDefault();
  press();
});
