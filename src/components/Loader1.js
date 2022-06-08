import React from "react";
import classes from "./Loader1.module.css";
import PokeBall from "../svgs/PokeBall";

const Loader1 = (props) =>{
    return(
        <div className={classes.loader}>
            <PokeBall />
        </div>
    )
}

export default Loader1;