import React, { useEffect, useRef, useState } from "react";
import classes from "./PokemonInfo.module.css";
import Photo from "../images/7.png";
import Loader1 from "./Loader1";
import "./animation.css";
import PokemonCompleteInfo from "./PokemonCompleteInfo";

const PokemonInfo = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  if (props.currentPokemonInfo !== undefined) {
    var currentPokemonSprite = props.currentPokemonInfo.pokemonSprite;
    var currentName = props.currentPokemonInfo.pokemonName;
    var currentData = props.currentPokemonInfo.pokemonData;
    var currentDesc = props.currentPokemonInfo.pokemonDesc;
  }
  if (props.previousPokemonInfo !== undefined) {
    var previousPokemonSprite = props.previousPokemonInfo.pokemonSprite;
    var previousName = props.previousPokemonInfo.pokemonName;
    var previousData = props.previousPokemonInfo.pokemonData;
    var previousDesc = props.previousPokemonInfo.pokemonDesc;
  }

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      props.setIsClicked(false);
      setIsLoading(false);
    }, 2000);
  }, [currentPokemonSprite]);

  return (
    <div>
      {currentPokemonSprite ? <Loader1 /> : ""}
      <div
        className={`${classes.pokeInfo} ${
          props.isClicked ? "slideOut" : "slideIn"
        }`}
      >

        {/* PREVIOUS POKEMON TILE */}
        {isLoading && (
          <PokemonCompleteInfo
            name={previousName}
            data={previousData}
            desc={previousDesc}
            pokemonSprite={previousPokemonSprite}
            photo={Photo}
            title={'Select a pokemon to display here'}
          />
        )}

        {/* NEXT POKEMON TILE */}
        {!isLoading && (
          <PokemonCompleteInfo
            name={currentName}
            data={currentData}
            desc={currentDesc}
            pokemonSprite={currentPokemonSprite}
          />
        )}
      </div>
    </div>
  );
};

export default PokemonInfo;

// return data.sprites.versions['generation-v']['black-white'].animated.front_default;
// https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon}.gif
// https://user-images.githubusercontent.com/64331991/172648450-5b8c8115-f938-4e67-8933-edd4b6ac281d.png
