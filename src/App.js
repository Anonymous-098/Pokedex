import React, { useEffect, useState } from "react";
import PokeBall from "./svgs/PokeBall";
import classes from "./App.module.css";
import Loader from "./components/Loader";
import PokemonList from "./components/PokemonList";
import PokemonInfo from "./components/PokemonInfo";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPokemonId, setCurrentPokemonId] = useState("");
  const [currentPokemon, setCurrentPokemon] = useState();

  const [isClicked, setIsClicked] = useState(false);

  var kantoLength = 151;

  //// PRIMARY SOLUTION
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=" + kantoLength)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        Promise.all(
          data.results.map((pokemon) => {
            return fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.name)
              .then(function (nestedResponse) {
                return nestedResponse.json();
              })
              .then(function (nestedData) {
                return fetch(
                  "https://pokeapi.co/api/v2/pokemon-species/" + nestedData.id
                )
                  .then(function (descResponse) {
                    return descResponse.json();
                  })
                  .then(function (descData) {
                    var desc = descData.flavor_text_entries.map(
                      (flavor_text_array) => {
                        if (flavor_text_array.language.name === "en") {
                          return flavor_text_array.flavor_text;
                        }
                      }
                    );
                    var finalDesc = desc.filter(function (element) {
                      return element !== undefined;
                    });
                    var pokemonObject = {
                      pokemonName: pokemon.name,
                      pokemonData: nestedData,
                      pokemonDesc: finalDesc[0],
                    };
                    sendData(pokemonObject);
                    return pokemonObject;
                  });
              });
          })
        );
      });
  }, []);

  function sendData(pokeObj) {
    var obj = pokeObj;
    setPokemons((prevState) => {
      return [...prevState, obj];
    });
    setIsLoading(false);
  }

  const getPokemonIdHandler = (id) => {
    for (var i = 0; i < pokemons.length; i++) {
      if (pokemons[i].pokemonData.id === id) {
        setCurrentPokemon(pokemons[i]);
      }
    }
    setCurrentPokemonId(id);
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && pokemons.length < kantoLength && <Loader />}
      {!isLoading && pokemons.length === kantoLength && (
        <>
          <div className={classes.pokeball}>
            <PokeBall />
          </div>
          <div className={classes.gridContainer}>
            <PokemonList
              getPokemonIdHandler={getPokemonIdHandler}
              pokemons={pokemons}
              setIsClicked={setIsClicked}
            />
            <PokemonInfo
              currentPokemonInfo={currentPokemon}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
            />
          </div>
        </>
      )}
    </>
  );
};

export default App;
