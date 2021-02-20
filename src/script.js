// selected DOM elements
const containerBox = document.querySelector("#container");
const searchInp = document.querySelector("#search-input");
const outputSeen = document.querySelector(".out-seen");
const outputCaught = document.querySelector(".out-caught");
const popup = document.querySelector(".popup");

//global vaiables
let counterCaught = 0;
let counterSeen = 0;
const checked = "green-text";
let pokIDsSeen = [];
let pokIDsCaught = [];
/// this function can be called at console to empty the local storage ///
const localStorageReset = function () {
  localStorage.removeItem("savedIDsSeen");
  localStorage.removeItem("savedIDsCaught");
  localStorage.removeItem("caughtCounter");
  localStorage.removeItem("seenCounter");
};
////this function called when setting the local storage is needed ////
const setLocalStorage = function () {
  localStorage.setItem("savedIDsSeen", JSON.stringify(pokIDsSeen));
  localStorage.setItem("savedIDsCaught", JSON.stringify(pokIDsCaught));
  localStorage.setItem("caughtCounter", JSON.stringify(counterCaught));
  localStorage.setItem("seenCounter", JSON.stringify(counterSeen));
};
///this function is called at the loading of the page to get data from local storage ////
const getLocalStorage = function () {
  counterCaught = JSON.parse(localStorage.getItem("caughtCounter"));
  counterSeen = JSON.parse(localStorage.getItem("seenCounter"));

  const dataSeen = JSON.parse(localStorage.getItem("savedIDsSeen"));
  const dataCaught = JSON.parse(localStorage.getItem("savedIDsCaught"));
  if (dataCaught) {
    pokIDsCaught = dataCaught;
  }
  if (dataSeen) {
    pokIDsSeen = dataSeen;
  }
  outputSeen.value = counterSeen;
  outputCaught.value = counterCaught;
  if (!counterCaught) outputCaught.value = 0;
  if (!counterSeen) outputSeen.value = 0;
};
//// called when seen icon is clicked ////
const pokSeenChecker = (e) => {
  e.target.classList.add("green-text");
  counterSeen++;
  outputSeen.value = counterSeen;
  pokIDsSeen.push(e.target.id);
};
/// called when caught icon is clicked /////
const pokCaughtChecker = (e) => {
  e.target.classList.add("green-text");
  counterCaught++;
  outputCaught.value = counterCaught;
  pokIDsCaught.push(e.target.id);
};
////event listner to check for clicks on the seen and caught icons then saving them at local storage////
containerBox.addEventListener("click", (e) => {
  if ([...e.target.classList].includes("seen")) {
    pokSeenChecker(e);
  }
  if ([...e.target.classList].includes("caught")) {
    pokCaughtChecker(e);
  }
  //// setting the local storage /////
  setLocalStorage();
  if ([...e.target.classList].includes("img")) {
    popup.style.display = "block";

    popupDisplayer(e.target.id);
  }
});
//// showing the pokemon information and rendering the popup /////
const popupDisplayer = (id) => {
  const selectedPok = pokList.find((pok) => pok.id == id);

  const html = `<div class=" row">
  <div class=" close-button-row row " id="close-button-row"><div class="col s2"><i onclick=" closePopup()" class="small material-icons" id="close">cancel</i></div></div>
 
 <div class="row">
   <img class="col s2 offset-s5" src="${selectedPok?.sprites.front_default}">
   <p class="col s2 offset-s5 center-align pok-title">${selectedPok.name}</p>
   <hr class="col s12">
 </div>
 
 <div class="row">
   <div class="col s12 center-align type-title"><span class="stats ">Type(s)</span> </div>
   <div class="col s1 offset-s5 valign-wrapper type1 center-align"> ${
     selectedPok.types[0].type.name
   }</div>
   <div class="col s1 valign-wrapper ${
     selectedPok.types[1]?.type.name ? "type2" : ""
   } ">${
    selectedPok.types[1]?.type.name ? selectedPok.types[1].type.name : ""
  }</div>
   <hr class="col s12">
   <div class="row">
     <span class="col s12 center-align stats-title">states</span>
     <div class="row">
       <div class="col s2 center-align stats"><span stats >HP</span></div>
       <div class="col s10 #7986cb indigo left-align stats-bar" id="back-col">
         <div class="col #e53935 red darken-1 center-align" style="width: ${
           selectedPok.stats[0].base_stat
         }%;"><span>${selectedPok.stats[0].base_stat}%</span></div>
       </div>
     </div>
     <div class="row">
       <div class="col s2 center-align stats"><span>attack</span></div>
       <div class="col s10 #7986cb indigo left-align stats-bar"id="back-col">
         <div class="col #e53935 red darken-1 center-align" style="width:${
           selectedPok.stats[1].base_stat
         }%;"><span>${selectedPok.stats[1].base_stat}%</span></div>
       </div>
     </div>
     <div class="row">
       <div class="col s2 center-align stats"><span>defence</span></div>
       <div class="col s10 #7986cb indigo left-align stats-bar"id="back-col">
         <div class="col #e53935 red darken-1 center-align" style="width: ${
           selectedPok.stats[2].base_stat
         }%;"><span>${selectedPok.stats[2].base_stat}%</span></div>
       </div>
     </div>
     <div class="row">
       <div class="col s2 center-align stats"><span>special-attack</span></div>
       <div class="col s10 #7986cb indigo left-align stats-bar"id="back-col">
         <div class="col #e53935 red darken-1 center-align" style="width:${
           selectedPok.stats[3].base_stat
         }%;"><span>${selectedPok.stats[3].base_stat}%</span></div>
       </div>
     </div>
     <div class="row">
       <div class="col s2 center-align stats"><span>special-defence</span></div>
       <div class="col s10 #7986cb indigo left-align stats-bar"id="back-col">
         <div class="col #e53935 red darken-1 center-align" style="width:${
           selectedPok.stats[4].base_stat
         }%;"><span>${selectedPok.stats[4].base_stat}%</span></div>
       </div>
     </div>
     <div class="row">
       <div class="col s2 center-align stats"><span>speed</span></div>
       <div class="col s10 #7986cb indigo left-align stats-bar"id="back-col">
         <div class="col #e53935 red darken-1 center-align" style="width:${
           selectedPok.stats[5].base_stat
         }%;"><span>${selectedPok.stats[5].base_stat}%</span></div>
       </div>
     </div>
   </div>
 </div>
</div> `;
  popup.insertAdjacentHTML("beforeend", html);
};
//// this function attached to the close button at the popup////
const closePopup = () => {
  popup.style.display = "none";
  popup.innerHTML = "";
};
///// this function attached to the search input element ///////
const searchField = () => {
  containerBox.innerHTML = "";

  let pokListSearch = pokList
    .filter((p) => p.name.includes(searchInp.value))
    .sort(function (a, b) {
      return a.name < b.name ? -1 : 1;
    });

  pokListSearch.forEach((pokemon) => {
    insertingPok(pokemon);
  });
};

///// filling pokemon array with all the pokemons at the load of the page/////
let pokList = [];
const pokSearch = async () => {
  // the number 250 can be modified if the pokemons total number is changed
  for (let i = 1; i < 250; i++) {
    await pokFetcher2(i);
  }
};
pokSearch();

const pusher = (pok) => {
  pokList.push(pok);
};
////// function for rendering the pokemons object to the page //////
const insertingPok = function (pok) {
  const pokImg = pok.sprites.front_default;

  const name = pok.name[0].toUpperCase() + pok.name.slice(1);

  const html = `<div class="col s2 center-align" id="pok-card">
<div class="row" id="pok-img"><img id=${
    pok.id
  } src="${pokImg}" class="img"></div>
<div class="row valign-wrapper" id="pok-icon-container">
  <div class="col s6 "><i class="material-icons seen ${
    pokIDsSeen.includes(String(pok.id)) ? checked : ""
  } " id="${pok.id}">visibility</i></div>
  <div  class="col s6"><i class="material-icons caught ${
    pokIDsCaught.includes(String(pok.id)) ? checked : ""
  } " id="${pok.id}">check</i></div>
</div>
<div class="row #eeeeee grey lighten-3  " id="pok-name">${name}</div>`;

  containerBox.insertAdjacentHTML("beforeend", html);
};
/////////////////////////////////////////////////////////////////////

////// first five random pokemons//////
const randomPok = async function () {
  //get data from local storage
  getLocalStorage();

  for (let i = 0; i < 5; i++) {
    await pokFetcher(Math.floor((Math.random() + 1) * 100));
  }
};
randomPok();
///// API fetching functions  ///////
function pokFetcher(id) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => insertingPok(data))
    .catch((err) => console.error(err));
}
/// only to use diffrent types of AJAX calls ////
async function pokFetcher2(id) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await res.json();

    pusher(pokemon);
  } catch (err) {
    console.error(`${err} 💥`);

    // Reject promise returned from async function
    throw err;
  }
}
