import React from "react";
import classes from "./PokemonCompleteInfo.module.css";
import PokemonTypes from "./PokemonTypes";

const PokemonCompleteInfo = (props) => {
  if (props.data !== undefined) {
    var allStats = props.data.stats;
    var stats = [];
    var statsName = ["HP", "ATK", "DEF", "SpA", "SpD", "SPD", "TOT"];
    var statsColor = [
      "#DF2140",
      "#FF994D",
      "#eecd3d",
      "#85DDFF",
      "#96da83",
      "#FB94A8",
      "#7195DC",
    ];

    var total = 0;

    for (var i = 0; i < statsName.length; i++) {
      if (statsName[i] === "TOT") {
        stats.push({
          statName: statsName[i],
          statValue: total,
          statColor: statsColor[i],
          id: i,
        });
      } else {
        stats.push({
          statName: statsName[i],
          statValue: allStats[i].base_stat,
          statColor: statsColor[i],
          id: i,
        });
        total = total + allStats[i].base_stat;
      }
    }

    var types = props.data.types;
    var height = (props.data.height / 10).toFixed(1);
    var weight = (props.data.weight / 10).toFixed(1);
    var abilities = props.data.abilities.map((ability) => {
      return ability.ability.name;
    });
  } else {
    types = [];
    height = 0;
    weight = 0;
    abilities = [];
  }

  const onImgLoad = ({ target: img }) => {
    const { offsetHeight, offsetWidth } = img;
    // console.log(offsetHeight, offsetWidth);
  };

  return (
    <div>
      {props.data!==undefined && <img
        // onLoad={onImgLoad}
        src={props.pokemonSprite}
        className={classes.sprite}
        height={70}
        width={65}
      />}
      {props.data !== undefined && (
        <div className={classes.pokemonData}>
          <p className={classes.id}>N° {props.data.id}</p>
          <p className={classes.name}>{props.name}</p>

          {/* TYPES */}
          <div className={classes.gridBox}>
            <PokemonTypes types={types} />
          </div>
          <p className={classes.pokedexEntry}>Pokedex Entry</p>
          <p className={classes.description}>{props.desc}</p>

          {/* HEIGHT AND WEIGHT */}
          <div className={classes.flex1}>
            <div className={classes.flex2}>
              <span className={classes.addBold}>Height</span>
              <span className={classes.flexSpan}>{height}m</span>
            </div>
            <div className={classes.flex2}>
              <span className={classes.addBold}>Weight</span>
              <span className={classes.flexSpan}>{weight}kg</span>
            </div>
          </div>

          {/* ABILITIES */}
          {
            <div style={{ marginTop: 15 }}>
              <span className={classes.addBold}>Abilities</span>
              <div className={classes.flex3}>
                {abilities.length === 1 && (
                  <>
                    <span className={classes.singleAbility}>
                      {abilities[0]}
                    </span>
                  </>
                )}
                {abilities.length >=2 && (
                  <>
                    <span className={classes.flexSpan}>{abilities[0]}</span>
                    <span className={classes.flexSpan}>{abilities[1]}</span>
                  </>
                )}
              </div>
            </div>
          }

          {/* STATS */}
          <div style={{ marginTop: 20 }}>
            <span className={classes.addBold}>Stats</span>
            <div className={classes.flex4} style={{ marginTop: 5 }}>
              {stats.map((stat) => {
                return (
                  <div
                    key={stat.id}
                    className={
                      stat.id !== 6
                        ? classes.allStatsBackground
                        : classes.totalStatBackground
                    }
                  >
                    <span
                      style={{
                        backgroundColor: stat.statColor,
                      }}
                      className={classes.statSpan}
                    >
                      {stat.statName}
                    </span>
                    <span>{stat.statValue}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default PokemonCompleteInfo;
