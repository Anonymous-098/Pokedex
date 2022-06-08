import React, { useState } from "react";
import classes from "./PokemonTile.module.css";

const PokemonTile = (props) => {
  const types = props.pokemonData.types.map((type) => {
    return type.type.name;
  });
  
  const pokemon_types_colors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

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
        {types.length === 2 && (
          <div className={classes.temp}>
            <span
              className={classes.type1}
              style={{ backgroundColor: pokemon_types_colors[types[0]] }}
            >
              {types[0]}
            </span>
            <span
              className={classes.type2}
              style={{ backgroundColor: pokemon_types_colors[types[1]] }}
            >
              {types[1]}
            </span>
          </div>
        )}
        {types.length === 1 && (
          <span
            className={classes.singleType}
            style={{ backgroundColor: pokemon_types_colors[types[0]] }}
          >
            {types[0]}
          </span>
        )}
      </div>
    </li>
  );
};

export default PokemonTile;
