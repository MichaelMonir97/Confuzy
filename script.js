const textarea = document.querySelector("textarea");
const tags = document.querySelector(".tags");

function onInput(e) {
  const userChoice = e.target.value.split(",").filter((c) => c.trim() != "");
  creaeteElements(userChoice);
}

textarea.oninput = (e) => {
  onInput(e);
};

function creaeteElements(array) {
  tags.innerHTML = "";
  array.map((choice) => {
    const span = document.createElement("span");
    span.textContent = choice;
    tags.appendChild(span);
  });
}

textarea.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (e.target.value != "") {
      textarea.oninput = () => {};
      setTimeout(() => (e.target.value = ""), 10);
      randomPicking();
    }
  }
});

function randomPicking() {
  const times = 30;
  let interval = setInterval(() => {
    let highlighted = pickRandom();
    highlight(highlighted);

    setTimeout(() => removehighlight(highlighted), 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const random = pickRandom();
      highlight(random);
      textarea.oninput = (e) => {
        onInput(e);
      };
    }, 150);
  }, times * 100);
}

function pickRandom() {
  const spans = document.querySelectorAll("span");
  console.log(spans);
  return spans[Math.floor(Math.random() * spans.length)];
}

function highlight(e) {
  e.classList.add("selected");
}
function removehighlight(e) {
  e.classList.remove("selected");
}
