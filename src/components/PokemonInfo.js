import React, { useEffect, useRef, useState } from "react";
import classes from "./PokemonInfo.module.css";
import Photo from "../images/7.png";
import Loader1 from "./Loader1";
import "./animation.css";

const PokemonInfo = (props) => {
  console.log(props);
  const [animatedSprite, setAnimatedSprite] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const prevSprite = useRef("");

  var pokemon;
  if (props.currentPokemonInfo !== undefined)
    pokemon = props.currentPokemonInfo.pokemonName;
  // else pokemon = Photo;

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://pokeapi.co/api/v2/pokemon/" +
        `${pokemon !== undefined ? pokemon : ""}`
    )
      .then(function (response) {
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
      props.setIsClicked(false);
      setIsLoading(false);
    }, 3000);
  }, [pokemon]);

  useEffect(() => {
    prevSprite.current = animatedSprite;
  }, [animatedSprite]);

  return (
    <div>
      {pokemon !== undefined ? <Loader1 /> : ""}
      <div
        className={`${classes.pokeInfo} ${
          props.isClicked ? "slideOut" : "slideIn"
        }`}
      >
        {/* INITIAL TILE */}
        {!pokemon && (
          <div>
            <img src={Photo} className={classes.img} />
            <p>Select a pokemon to display here</p>
          </div>
        )}

        {/* PREVIOUS POKEMON TILE */}
        {pokemon && isLoading && (
          <div>
            <img src={prevSprite.current} className={classes.sprite} />
            <div className={classes.pokemonData}>
              
            </div>
          </div>
        )}

        {/* NEXT POKEMON TILE */}
        {pokemon && !isLoading && (
          <div>
            <img src={animatedSprite} className={classes.sprite} />
            <div className={classes.pokemonData}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonInfo;

// return data.sprites.versions['generation-v']['black-white'].animated.front_default;
// https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon}.gif
// https://user-images.githubusercontent.com/64331991/172648450-5b8c8115-f938-4e67-8933-edd4b6ac281d.png
