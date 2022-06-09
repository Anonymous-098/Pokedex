import React from "react";
import classes from "./PokemonCompleteInfo.module.css";

const PokemonCompleteInfo = (props) => {
    if(props.data!== undefined){
        console.log(props.data.types)
    }

  const onImgLoad = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img;
    // console.log(offsetHeight, offsetWidth);
  };

  return (
    <div>
      <img
        onLoad={onImgLoad}
        src={props.pokemonSprite}
        className={classes.sprite}
      />
      <div className={classes.pokemonData}>
        <p className={classes.name}>{props.name}</p>
      </div>
    </div>
  );
};

export default PokemonCompleteInfo;
