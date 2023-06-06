const form = document.querySelector("form");
const output = document.querySelector("output")

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    output.innerHTML = "";
    const formData = new FormData(form);
    const name = formData.get("pokemon");
    const data = Object.fromEntries(formData);

  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((pokemonData) => {
    const heading = document.createElement("h2");
    heading.textContent = pokemonData.name;

    const image = document.createElement("img");
    image.src = pokemonData.sprites.front_default;
    image.alt = "";

    const abilityOne = document.createElement("h3");
    abilityOne.textContent = pokemonData.abilities[0].ability.name;

    const abilityTwo = document.createElement("h3");
    abilityTwo.textContent = pokemonData.abilities[1].ability.name;

    output.append(heading, image, abilityOne, abilityTwo);
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

