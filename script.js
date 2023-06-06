const form = document.querySelector("form");
const output = document.querySelector("output");
const pokemonName = document.querySelector("#pokemon_name");
const pokemonImg = document.querySelector("#pokemon_img");
const abilityOne = document.querySelector("#ability_one");
const abilityTwo = document.querySelector("#ability_two");



// const card = document.querySelector(".card")


  form.addEventListener("submit", (event) => {
    event.preventDefault();
    output.innerHTML = "";
    const formData = new FormData(form);
    const name = formData.get("pokemon");

  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((pokemonData) => {
    pokemonName.innerHTML = `<h1>${pokemonData.name}</h1>`;
    pokemonImg.innerHTML = `<img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}"></img>`;
    abilityOne.innerHTML = `<p>${pokemonData.abilities[0].ability.name}</p>`
    abilityTwo.innerHTML = `<p>${pokemonData.abilities[1].ability.name}</p>`
    console.log(pokemonData);
    })
    
    .catch((error) => {
        console.error(error);
        if (error.message === "404") {
            output.textContent = `Couldn't find "${name}"`;
        } else {
            output.textContent = "Something went wrong";
        }
    });
});

