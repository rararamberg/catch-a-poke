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
// console.log(`closeModalBtn`, closeModalBtn);
// console.log(`playBtnEl`, playBtnEl);
// console.log(`gameScreenEl`, gameScreenEl);
// console.log(`pokeDeckContainerEL`, pokeDeckContainerEL);
// console.log(`collectionEl`, collectionEl);
// console.log(`modalEl`, modalEl);
// console.log(`overlayEl`, overlayEl);

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
    const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    console.log(resp.data);
    if (resp.data) renderPokeCard(resp.data);
  } catch (error) {
    console.error(error);
  }
};

// pokemon is add to "collection"
function renderPokeCard(pokeObj) {
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
    console.log("card clicked");
    // modal and overlay is visible

    renderPokeModal(pokeObj);
    openModal();
  });
  // 5.  User clicks out of or clicks exit button
  closeModalBtn.addEventListener("click", closeModal);
}
// API request(s) made to poke API
// Poke data appends to modal window
const renderPokeModal = function (pokeObj) {
  console.log(pokeObj);
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
  pokeNameEl.textContent = pokeObj.name;
  const pokeImgEl = document.createElement("img");
  pokeImgEl.src = pokeObj.sprites.front_default;
  pokeImgEl.alt = pokeObj.name;
  const pokeTextEl = document.createElement("p");
  pokeTextEl.textContent = "FLAVOR TEXT GOES HERE"; //  FIX LATER  //
  pokeBasicEl.appendChild(pokeNameEl);
  pokeBasicEl.appendChild(pokeImgEl);
  pokeBasicEl.appendChild(pokeTextEl);
  //abilities
  const abilitiesTitleEl = document.createElement("h4");
  abilitiesTitleEl.textContent = "Abilities:";
  pokeAbilityEl.appendChild(abilitiesTitleEl);
  pokeObj.abilities.forEach((ability) => {
    const abilityEl = document.createElement("p");
    abilityEl.textContent = `• ${ability.ability.name}`;
    pokeAbilityEl.appendChild(abilityEl);
  });
  //moves
  if (pokeObj.moves.length > 0) {
    const movesTitleEl = document.createElement("h4");
    movesTitleEl.textContent = "Moves:";
    pokeMovesEl.appendChild(movesTitleEl);
    for (let i = 0; i < 3; i++) {
      const moveEl = document.createElement("p");
      moveEl.textContent = `• ${pokeObj.moves[i].move.name}`;
      pokeMovesEl.appendChild(moveEl);
    }
  }
  //eggs
  const eggTitleEl = document.createElement("h4");
  eggTitleEl.textContent = "Egg Groups:";
  const eggEmojisEl = document.createElement("p");
  eggEmojisEl.textContent = "🐣 🐣 🐣 "; // FIX LATER //
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
  const prevPokeInfo = document.querySelector(".collection-card");
  while (prevPokeInfo) pokeDeckContainerEL.removeChild(prevPokeInfo);
};

// check how many pokemon are left
const checkForLast = function () {
  const pokemons = document.querySelectorAll(".pokemon");
  console.log(`pokemons`, pokemons.length);
  //3. user clicks on last pokemon in game
  if (pokemons.length === 0) {
    console.log("Show collection");
    // collection not hidden
    // user sees pokemon they collected
    collectionEl.classList.remove("hidden");
    // play button says "new game"
    playBtnEl.disabled = false;
    playBtnEl.textContent = "NEW GAME";
  }
};
//============================
// GAME STEPS
//============================
// 1. User clicks play button
playBtnEl.addEventListener("click", function () {
  // console.log("click");
  // random pokemon sprites render on background screen
  collectionEl.classList.add("hidden");
  playBtnEl.disabled = true;
  playBtnEl.textContent = "PLAY!";
  let pokeArr = [];

  while (pokeArr.length < 4) {
    let randomPokeId = Math.trunc(Math.random() * 898) + 1;
    pokeArr.push({
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokeId}.png`,
      id: randomPokeId,
    });
  }
  console.log(`pokeArr`, pokeArr);

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
      console.log(pokemon.id);
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
  removePrevCollection();
});

//6. User clicks "new game" button (play)
//if text context says Play render poke
//else if says new game
//previous data in collection removed
// collection div hidden
//new game begins

//Prev notes
// const elem = document.createElement('div');
// elem.classList.add(`5`);
// console.log(elem.className);

// let pokeArr = [];

// while (pokeArr.length < 20) {
//   let randomPokeId = Math.trunc(Math.random() * 898) + 1;
//   pokeArr.push({
//     img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokeId}.png`,
//   });
// }

// console.log(pokeArr);

// const fetchPoke = async id => {
//   try {
//     const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
//     console.log(resp.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// fetchPoke(elem.className);
