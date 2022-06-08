import React, { useEffect, useState } from "react";
import classes from "./PokemonInfo.module.css";
import Photo from "../images/7.png";
import Loader1 from "./Loader1";

const PokemonInfo = (props) => {
  const [animatedSprite, setAnimatedSprite] = useState();
  const [isLoading, setIsLoading] = useState(false);

  if (props.currentPokemonInfo !== undefined)
    var pokemon = props.currentPokemonInfo.pokemonName;

  useEffect(() => {
    setIsLoading(true);

    fetch(
      "https://pokeapi.co/api/v2/pokemon/" +
        `${pokemon !== undefined ? pokemon : "25"}`
    )
      .then(function (response) {
        // console.log(`${pokemon!==undefined?pokemon:'25'}`);
        return response.json();
      })
      .then(function (data) {
        setAnimatedSprite(
          data.sprites.versions["generation-v"]["black-white"].animated
            .front_default
        );
        return data
          .sprites.versions["generation-v"]["black-white"].animated.front_default;
      });

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [pokemon]);

  return (
    <div>
      <Loader1 />
      <div className={classes.pokeInfo}>
        {!pokemon && <img src={Photo} className={classes.img} />}
        {pokemon && isLoading && <p>Loading...</p>}
        {pokemon && !isLoading && <img src={animatedSprite} className={classes.sprite}></img>}
        <p>Select a pokemon to display here</p>
      </div>
    </div>
  );
};

export default PokemonInfo;

// return data.sprites.versions['generation-v']['black-white'].animated.front_default;
// https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon}.gif
