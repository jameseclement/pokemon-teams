document.addEventListener("DOMContentLoaded", ()=>{
  fetchTrainers()
})

function fetchTrainers(){
  fetch('http://localhost:3000/trainers')
  .then(res => res.json())
  .then(json => json.forEach(trainer => renderTrainer(trainer)))
}

function renderTrainer(trainer){
  let main = document.querySelector("#main")
  let trainerCard = document.createElement("div")
    trainerCard.classList.add("card")
    let trainerP = document.createElement("p")
      trainerP.innerHTML = trainer.name
      let ul = document.createElement("ul")
    let addButton = document.createElement("button")
      addButton.innerHTML = "Add Pokemon"
      addButton.addEventListener("click", (e) => addPokemon(e, trainer, ul))
    trainer.pokemons.forEach(pokemon => renderPokemon(trainer, ul, pokemon))
    trainerCard.append(trainerP, addButton, ul)
    main.appendChild(trainerCard)
}

function renderPokemon (trainer, ul, pokemon){
  let li = document.createElement("li")
  li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
  let button = document.createElement("button")
  button.classList.add("release")
  button.innerHTML = "Release"
  button.addEventListener("click", (e) => releasePokemon(e, pokemon, li))
  li.appendChild(button)
  ul.appendChild(li)
}

function addPokemon(e, trainer, ul){
  
  if(ul.childElementCount < 6)
  {
  let data = {trainer_id: trainer.id}
  fetch(`http://localhost:3000/pokemons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => renderPokemon(trainer, ul, json))
  }
  else{
    alert("You cant have more than 6 pokes")
  }
}

function releasePokemon(e, pokemon, li){
  fetch(`http://localhost:3000/pokemons/${pokemon.id}`,{
    method: "DELETE"
  })
  .then(li.remove())
}
