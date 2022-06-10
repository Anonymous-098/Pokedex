import React, { useState } from "react";
import classes from "./PokemonTile.module.css";
import PokemonTypes from "./PokemonTypes";

const PokemonTile = (props) => {
  const wrapperFunction = () =>{
    props.getPokemonIdHandler(props.pokemonData.id);
    props.setIsClicked(true);
  }
  
  return (
    <li key={props.id} className={classes.tile} onClick={wrapperFunction} >
      <div className={classes.image}>
        <img src={props.pokemonData.sprites.front_default} />
      </div>
      <div className={classes.gridBox}>
        <span className={classes.id}>N° {props.pokemonData.id}</span>
        <span className={classes.name}>{props.pokemonName}</span>
        <PokemonTypes types={props.pokemonData.types}/>
      </div>
    </li>
  );
};

export default PokemonTile;
