//STEPS
const playBtnEl = document.querySelector(".play-btn");
const gameScreenEl = document.querySelector(".game-background");
// console.log(`playBtnEl`, playBtnEl);
// console.log(`gameScreenEl`, gameScreenEl);

// 1. User clicks play button
playBtnEl.addEventListener("click", function () {
  // console.log("click");
  // random pokemon sprites render on background screen
  let pokeArr = [];

  while (pokeArr.length < 9) {
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

    pokemon.addEventListener("click", function () {
      console.log(pokemon.id);
      pokemon.src =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
    });
  });
});
// console.log(gameScreenEl.clientHeight);
// console.log(gameScreenEl.clientWidth);

// pokemon move around within container of div
function movePoke(pokeObj) {
  pokeObj.style.top = `${Math.floor(
    Math.random() * (gameScreenEl.clientHeight * 0.85)
  )}px`;
  pokeObj.style.left = `${Math.floor(
    Math.random() * (gameScreenEl.clientWidth * 0.95)
  )}px`;
}
//2. User Clicks on pokemon
//pokemon becomes pokeball
//pokemon removed from screen
// pokemon is add to "collection"

//3. user clicks on last pokemon in game
// collection not hidden
// user sees pokemon they collected
// play button says "new game"

//4. User clicks on pokemon card in collection
// API request(s) made to poke API
// Poke data appends to modal window
// modal and overlay is visible

//5. User clicks out of or clicks exit button
//modal and overlay hidden
// previous data removed to allow new poke to render when clicked

//6. User clicks "new game" button (play)
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
