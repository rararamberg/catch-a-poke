//============================
// Grab Elements
//============================
const playBtnEl = document.querySelector(".play-btn");
const gameScreenEl = document.querySelector(".game-background");
const pokeDeckContainerEL = document.querySelector(".pokemon-container");
const collectionEl = document.querySelector(".collection-container");
const modalEl = document.querySelector(".modal");
const overlayEl = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal");

//============================
// Functions
//============================

// pokemon move around within container of div
function movePoke(pokeObj) {
  pokeObj.style.top = `${Math.floor(
    Math.random() * (gameScreenEl.clientHeight * 0.85)
  )}px`;
  pokeObj.style.left = `${Math.floor(
    Math.random() * (gameScreenEl.clientWidth * 0.95)
  )}px`;
}

// API request(s) made to poke API
const fetchPoke = async (id) => {
  try {
    const respPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const respSpecies = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );

    if (respPoke.data && respSpecies.data)
      renderPokeCard(respPoke.data, respSpecies.data);
  } catch (error) {
    console.error(error);
  }
};

// pokemon is add to "collection"
function renderPokeCard(pokeObj, speciesObj) {
  const pokeCardEl = document.createElement("div");
  pokeCardEl.classList.add("collection-card");
  pokeCardEl.value = pokeObj.id;
  const pokeImgEl = document.createElement("img");
  pokeImgEl.classList.add("poke-img");
  pokeImgEl.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeObj.id}.png`;
  const pokeTitleEl = document.createElement("p");
  pokeTitleEl.classList.add("poke-name");
  pokeTitleEl.textContent = pokeObj.name.toUpperCase();

  pokeDeckContainerEL.appendChild(pokeCardEl);
  pokeCardEl.appendChild(pokeImgEl);
  pokeCardEl.appendChild(pokeTitleEl);

  //4. User clicks on pokemon card in collection
  pokeCardEl.addEventListener("click", function () {
    renderPokeModal(pokeObj, speciesObj);
    // modal and overlay is visible
    openModal();
  });
  // 5.  User clicks out of or clicks exit button
  closeModalBtn.addEventListener("click", closeModal);
}
// API request(s) made to poke API
// Poke data appends to modal window
const renderPokeModal = function (pokeObj, speciesObj) {
  console.log(speciesObj.flavor_text_entries);
  // renderEmojisEggs(speciesObj.egg_groups); // test
  //create container div for modals
  const pokeDivEl = document.createElement("div");
  const pokeBasicEl = document.createElement("div");
  const pokeDetailEl = document.createElement("div");
  const pokeActionEl = document.createElement("div");
  const pokeAbilityEl = document.createElement("div");
  const pokeMovesEl = document.createElement("div");
  const pokeEggEl = document.createElement("div");
  // add class names to containers
  pokeDivEl.classList.add("poke-modal-card");
  pokeBasicEl.classList.add("basic-info");
  pokeDetailEl.classList.add("detail-info");
  pokeActionEl.classList.add("action-container");
  pokeAbilityEl.classList.add("abilities");
  pokeMovesEl.classList.add("moves");
  pokeEggEl.classList.add("egg-groups");

  //Add and append context to sub-containers
  //basic
  const pokeNameEl = document.createElement("h2");
  pokeNameEl.textContent = pokeObj.name.toUpperCase();
  const pokeImgEl = document.createElement("img");
  pokeImgEl.src = pokeObj.sprites.front_default;
  pokeImgEl.alt = pokeObj.name;
  const pokeTextEl = document.createElement("p");
  pokeTextEl.textContent =
    speciesObj.flavor_text_entries.length > 0
      ? renderDescription(speciesObj.flavor_text_entries)
      : "";
  pokeBasicEl.appendChild(pokeNameEl);
  pokeBasicEl.appendChild(pokeImgEl);
  pokeBasicEl.appendChild(pokeTextEl);
  //abilities
  const abilitiesTitleEl = document.createElement("h4");
  abilitiesTitleEl.textContent = "Abilities";
  pokeAbilityEl.appendChild(abilitiesTitleEl);
  pokeObj.abilities.forEach((ability) => {
    const abilityEl = document.createElement("p");
    abilityEl.textContent = `• ${ability.ability.name}`;
    pokeAbilityEl.appendChild(abilityEl);
  });
  //moves
  if (pokeObj.moves.length > 0) {
    const movesTitleEl = document.createElement("h4");
    movesTitleEl.textContent = "Moves";
    pokeMovesEl.appendChild(movesTitleEl);
    for (let i = 0; i < 3; i++) {
      const moveEl = document.createElement("p");
      moveEl.textContent = `• ${pokeObj.moves[i].move.name}`;
      pokeMovesEl.appendChild(moveEl);
    }
  }
  //eggs
  const eggTitleEl = document.createElement("h4");
  eggTitleEl.textContent = "Egg Groups";
  const eggEmojisEl = document.createElement("p");
  eggEmojisEl.textContent =
    speciesObj.egg_groups.length > 0
      ? renderEmojisEggs(speciesObj.egg_groups)
      : "❓";
  pokeEggEl.appendChild(eggTitleEl);
  pokeEggEl.appendChild(eggEmojisEl);
  //append sub and overarching containers to modal
  pokeActionEl.appendChild(pokeAbilityEl);
  pokeActionEl.appendChild(pokeMovesEl);
  pokeDetailEl.appendChild(pokeActionEl);
  pokeDetailEl.appendChild(pokeEggEl);
  pokeDivEl.appendChild(pokeBasicEl);
  pokeDivEl.appendChild(pokeDetailEl);
  modalEl.appendChild(pokeDivEl);
};
//Open and close modal window
const openModal = function () {
  // modal and overlay display
  modalEl.classList.remove("hidden");
  overlayEl.classList.remove("hidden");
};
const closeModal = function () {
  //modal and overlay hidden
  modalEl.classList.add("hidden");
  overlayEl.classList.add("hidden");
  removePrevPokeInfo();
};

// previous data removed to allow new poke to render when clicked
const removePrevPokeInfo = function () {
  const prevPokeInfo = document.querySelector(".poke-modal-card");
  if (prevPokeInfo) modalEl.removeChild(prevPokeInfo);
};

const removePrevCollection = function () {
  const pokeCardContainer = document.querySelector(".pokemon-container");
  while (pokeCardContainer.firstChild) {
    pokeCardContainer.removeChild(pokeCardContainer.firstChild);
  }
};

// render emojis based on group
const renderEmojisEggs = function (eggArr) {
  let emojis = "";
  eggArr.forEach((egg) => {
    if (egg.name === "monster") emojis += " 👹 ";
    else if (egg.name === "amorphous") emojis += " ✨ ";
    else if (egg.name === "bug") emojis += " 🐛 ";
    else if (egg.name === "dragon") emojis += " 🐉 ";
    else if (egg.name === "ditto") emojis += " 🟣 ";
    else if (egg.name === "fairy") emojis += " 🧚‍♀️ ";
    else if (egg.name === "field" || egg.name === "ground") emojis += " 🏞 ";
    else if (egg.name === "flying") emojis += " 🦅 ";
    else if (egg.name === "grass") emojis += " 🌱 ";
    else if (egg.name === "human-like") emojis += " 🙆🏻 ";
    else if (egg.name === "mineral") emojis += " 🪨 ";
    else if (egg.name === "water1") emojis += " 🐸 ";
    else if (egg.name === "water2") emojis += " 🐟 ";
    else if (egg.name === "water3") emojis += " 🦀 ";
    else emojis += " ❓ ";
  });

  return emojis;
};

const renderDescription = function (flavorArr) {
  let descriptionText = "";
  let obj = flavorArr.find((entry) => {
    if (entry.language.name === "en") return entry;
  });
  descriptionText = obj.flavor_text;
  return descriptionText;
};
// check how many pokemon are left
const checkForLast = function () {
  const pokemons = document.querySelectorAll(".pokemon");
  //3. user clicks on last pokemon in game
  if (pokemons.length === 0) {
    // collection not hidden
    // user sees pokemon they collected
    collectionEl.classList.remove("hidden");
    // play button says "new game"
    playBtnEl.textContent = "NEW GAME";
    // 6. User clicks "new game" button (play)
    playBtnEl.disabled = false;
  }
};
//============================
// GAME STEPS
//============================
// 1. User clicks play button
playBtnEl.addEventListener("click", function () {
  // collection div hidden
  if (playBtnEl.textContent === "NEW GAME") {
    removePrevCollection();
    collectionEl.classList.add("hidden");
    playBtnEl.disabled = true;
    playBtnEl.textContent = "PLAY!";
  }
  let pokeArr = [];

  // generate random pokemon ids
  while (pokeArr.length < 4) {
    let randomPokeId = Math.trunc(Math.random() * 898) + 1;
    pokeArr.push({
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokeId}.png`,
      id: randomPokeId,
    });
  }

  // random pokemon sprites render on background screen
  pokeArr.forEach((poke) => {
    const pokemon = document.createElement("img");
    pokemon.classList.add("pokemon");
    pokemon.src = poke.img;
    pokemon.alt = poke.id;
    pokemon.setAttribute("id", poke.id);
    movePoke(pokemon);
    gameScreenEl.append(pokemon);

    // pokemon move around within container of div
    setInterval(function () {
      movePoke(pokemon);
    }, 1500);

    //2. User Clicks on pokemon
    pokemon.addEventListener("click", function () {
      //pokemon becomes pokeball
      pokemon.src =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
      //pokemon removed from screen
      setTimeout(function () {
        pokemon.remove();
        //3. user clicks on last pokemon in game
        checkForLast();
        fetchPoke(pokemon.id);
      }, 2000);
    });
  });
});
