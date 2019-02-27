//solution goes here
document.addEventListener("DOMContentLoaded", () =>{
//invoke fetching of trainers
fetchTrainers()

//declaring function to fetch trainers
function fetchTrainers(){
  fetch("http://localhost:3000/trainers")
  .then(res => res.json())
  .then(json => json.forEach(function(trainer){renderTrainer(trainer)}))
}

//declare function to render one trainer
function renderTrainer(trainer){
let main = document.querySelector("#main")
  let trainerCard = document.createElement("div")
  trainerCard.classList.add('card')
  let trainerName = document.createElement("p")
  trainerName = trainer.name
  let addPokemonButton = document.createElement("button")
  addPokemonButton.id = trainer.id
  addPokemonButton.innerHTML = "Add Pokemon"
  //add addEventListener to add Pokemon button
  addPokemonButton.addEventListener('click', addPokemon)

  let pokeUl = document.createElement('ul')


  let pokemons = trainer.pokemons
  // I need to figure out how to make the function
  // called here accessable when adding a new
  // pokemon
  pokemons.forEach((pokemon) => {

      let pokeLi = document.createElement('li')

         pokeLi.innerHTML = `${pokemon.nickname} (${pokemon.species})`
      let releaseButton = document.createElement("button")
          releaseButton.innerText = "Release"
          releaseButton.classList.add("release")
          releaseButton.id = `poke ${pokemon.id}`

          releaseButton.addEventListener("click", releasePokemon)

          pokeUl.appendChild(pokeLi)
          pokeLi.appendChild(releaseButton)
        })
  trainerCard.append(trainerName, addPokemonButton, pokeUl)
  main.appendChild(trainerCard)

}




//function to handle click of addPokemonButton
function addPokemon(e){
if (e.target.nextElementSibling.childElementCount < 6){
trainerId = e.target.id
data = {trainer_id : `${trainerId}`}

  fetch('http://localhost:3000/pokemons',{
    method: "POST",
    headers:
    {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(pokemon => renderPokemon(pokemon))
}else{
  alert("You cannot have more than six pokemon on your team.")
}
}

//this is only used when you are adding a new pokemon
//(need to figure out method for not having to repeat this here)
//---------------------------------------------
 function renderPokemon(pokemon){
   let targetUl = document.getElementById(`${pokemon.trainer_id}`).nextSibling
   let pokeLi = document.createElement('li')

      pokeLi.innerHTML = `${pokemon.nickname} (${pokemon.species})`
   let releaseButton = document.createElement("button")
       releaseButton.innerText = "Release"
       releaseButton.classList.add("release")
       releaseButton.id = `poke ${pokemon.id}`
       releaseButton.addEventListener("click", releasePokemon)
       targetUl.appendChild(pokeLi)
       pokeLi.appendChild(releaseButton)
     }
//-----------------------------------------------

function releasePokemon(e){
  e.target.parentElement.remove()
  fetch(`http://localhost:3000/pokemons/${e.target.id.split(' ')[1]}`,{
    method : 'DELETE'
  })
}





})
