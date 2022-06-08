import React from "react";
import classes from "./Loader.module.css";
import PokeBall from "../svgs/PokeBall";

const Loader = (props) =>{
    return(
        <div className={classes.loader}>
            <PokeBall />
        </div>
    )
}

export default Loader;