import React from "react";
import PokemonTile from "./PokemonTile";
import classes from "./PokemonList.module.css";

const PokemonList = (props) => {
  return (
    <ul className={classes.list}>
      {props.pokemons.map((pokemon) => {
        // console.log(pokemon.pokemonName)
        return pokemon.pokemonName.includes(props.enteredValue) ? (
          <PokemonTile
            key={pokemon.pokemonData.id}
            pokemonName={pokemon.pokemonName}
            pokemonData={pokemon.pokemonData}
            getPokemonIdHandler={props.getPokemonIdHandler}
            setIsClicked={props.setIsClicked}
          />
        ) : (
          ""
        );
      })}
    </ul>
  );
};

export default PokemonList;
