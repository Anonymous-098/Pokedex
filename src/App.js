import React, { useEffect, useRef, useState } from "react";
import PokeBall from "./svgs/PokeBall";
import classes from "./App.module.css";
import Loader from "./components/Loader";
import PokemonList from "./components/PokemonList";
import PokemonInfo from "./components/PokemonInfo";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState();
  const [previousPokemon,setPreviousPokemon] = useState();

  var kantoLength = 15;

  //// PRIMARY SOLUTION
  useEffect(() => {
    setIsLoading(true);
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
                      pokemonSprite: nestedData.sprites.versions["generation-v"]["black-white"].animated.front_default
                    };
                    sendData(pokemonObject);
                    // return pokemonObject;
                  });
              });
          })
        );
      });
    setIsLoading(false);
  }, []);

  function sendData(pokeObj) {
    setPokemons((prevState) => {
      return [...prevState, pokeObj];
    });
  }

  const getPokemonIdHandler = (id) => {
    for (var i = 0; i < pokemons.length; i++) {
      if (pokemons[i].pokemonData.id === id) {
        setPreviousPokemon(currentPokemon);
        setCurrentPokemon(pokemons[i]);
      }
    }
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
              previousPokemonInfo={previousPokemon}
            />
          </div>
        </>
      )}
    </>
  );
};

export default App;