//STEPS
const playBtnEl = document.querySelector(".play-btn");
// console.log(`playBtnEl`, playBtnEl);

// 1. User clicks play button
playBtnEl.addEventListener("click", function () {
  console.log("click");
});
// random pokemon sprites render on background screen
// pokemon move around within container of div

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
