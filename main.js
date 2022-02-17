const wordo = ["f", "l", "a", "m", "e"];
let guesses = [];
let currentGuess = [];

const processGuess = (letter) => {
  currentGuess.map((letter, i) => {
    const inWord = wordo.indexOf(letter.letter);
    letter.letterMatch = inWord > -1 ? true : false;
    letter.exactMatch = inWord === i ? true : false;
    return letter;
  });
};

const renderGuesses = () => {
  guesses.map((guess, index) => {
    const row = document.getElementById("board").querySelectorAll(".row")[
      index
    ];
    guess.map((letter, guessIndex) => {
      const tile = row.querySelectorAll(".tile")[guessIndex];
      tile.innerText = letter.letter;
      const key = document.querySelector(`.key.${letter.letter}`);

      // colorize tiles and keys
      switch (true) {
        case letter.exactMatch:
          tile.classList.add("yes");
          key.classList.add("yes");
          break;
        case letter.letterMatch:
          tile.classList.add("kinda");
          key.classList.add("kinda");
          break;
        default:
          tile.classList.add("no");
          key.classList.add("no");
      }
    });
  });
};

const handleLetter = (letter) => {
  if (letter === "enter") {
    if (currentGuess.length < 5) return;
    processGuess();
    guesses.push(currentGuess);
    renderGuesses();
    return (currentGuess = []);
  }

  if (letter === "backspace") {
    currentGuess.pop();
    const row = document.querySelectorAll(".row")[guesses.length];
    const tile = row.querySelectorAll(".tile")[currentGuess.length];
    tile.innerText = "";
    return currentGuess;
  }

  if (currentGuess.length < 5) {
    try {
      const row = document.querySelectorAll(".row")[guesses.length];
      const tile = row.querySelectorAll(".tile")[currentGuess.length];
      tile.innerText = letter;
      tile.classList.add("try");
      return currentGuess.push({ letter: letter });
    } catch (e) {
      console.log("poopy!");
    }
  }
};

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 13 && currentGuess.length === 5) {
    handleLetter(event.key.toLowerCase());
  }

  if (event.keyCode === 8 && currentGuess.length <= 5) {
    handleLetter(event.key.toLowerCase());
  }

  if (event.keyCode >= 65 && event.keyCode <= 90) {
    handleLetter(event.key);
  }
});

const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("click", (event) => {
    if (event.target.classList.contains("backspace")) {
      handleLetter("backspace");
    } else {
      handleLetter(event.target.innerText.toLowerCase());
    }
  });
});
