const form = document.querySelector("form");
const pokemonNameHTML = document.querySelector("#pokemon_name");
const pokemonImgHTML = document.querySelector("#pokemon_img");
const abilityOneHTML = document.querySelector("#ability_one");
const abilityTwoHTML = document.querySelector("#ability_two");

 



// const card = document.querySelector(".card")


  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const user_pokemon = formData.get("pokemon");

  fetch(`https://pokeapi.co/api/v2/pokemon/${user_pokemon}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((pokemonData) => {
      const name = pokemonData.name;
      const image = pokemonData.sprites.front_default;
      const abilityOne = pokemonData.abilities[0].ability.name;
      const abilityTwo = pokemonData.abilities[1].ability.name;


      pokemonNameHTML.innerHTML = `<h1>${name}</h1>`;
      pokemonImgHTML.innerHTML = `<img src="${image}" alt="${name}"></img>`;
      abilityOneHTML.innerHTML = `<p>${abilityOne}</p>`;
      abilityTwoHTML.innerHTML = `<p>${abilityTwo}</p>`;
      
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

