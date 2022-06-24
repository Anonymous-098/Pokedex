import React, { useEffect, useRef, useState } from "react";
import PokeBall from "./svgs/PokeBall";
import classes from "./App.module.css";
import Loader from "./components/Loader";
import PokemonList from "./components/PokemonList";
import PokemonInfo from "./components/PokemonInfo";
import axios from "axios";
import Search from "./components/Search";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentPokemon, setCurrentPokemon] = useState();
  const [previousPokemon, setPreviousPokemon] = useState();
  const [enteredValue, setEnteredValue] = useState("");

  var kantoLength = 151;

  async function getPokemon() {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?limit=" + kantoLength
    );
    const data = await response.data;
    const result = await data.results;

    const promises = result.map(async (pokemon) => {
      const nestedResponse = await axios.get(pokemon.url);
      return nestedResponse;
    });

    const temp = await Promise.all(promises);

    const nestedPromises = temp.map(async (pokemon) => {
      const doubleNestedResponse = axios.get(
        "https://pokeapi.co/api/v2/pokemon-species/" + pokemon.data.id
      );
      return doubleNestedResponse;
    });

    var tempDesc = [];
    const temp1 = await Promise.all(nestedPromises);

    var desc = temp1.map((descData) => {
      const enDescriptions = descData.data.flavor_text_entries.map(
        (flavor_text_array) => {
          if (flavor_text_array.language.name === "en") {
            return flavor_text_array.flavor_text;
          }
        }
      );
      var finalDesc = enDescriptions.filter(function (element) {
        return element !== undefined;
      });
      tempDesc.push(finalDesc[0]);
    });

    for (var i = 0; i < tempDesc.length; i++) {
      var pokemonObject = {
        pokemonName: temp[i].data.name,
        pokemonData: temp[i].data,
        pokemonDesc: tempDesc[i],
        pokemonSprite:
          temp[i].data.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
      };
      sendData(pokemonObject);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getPokemon();
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

  const getEnteredValue = (val) => {
    setEnteredValue(val);
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
            <div className={classes.flexContainer}>
              <Search getEnteredValue={getEnteredValue} />
              <PokemonList
                getPokemonIdHandler={getPokemonIdHandler}
                pokemons={pokemons}
                setIsClicked={setIsClicked}
                enteredValue={enteredValue}
              />
            </div>
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
