import React, { useState } from "react";
import classes from "./Search.module.css";
import {FaSearch} from "react-icons/fa";

const Search = (props) =>{

    // const [enteredValue,setEnteredValue] = useState("");

    const inputHandler = (e) =>{
        props.getEnteredValue(e.target.value);
        // setEnteredValue(e.target.value);
    }

    const submitHandler = (e) =>{
        e.preventDefault();
    }

    return <form onSubmit={submitHandler} className={classes.form} >
        <input className={classes.input} onChange={inputHandler}></input>
        <button type="submit" className={classes.icon}><FaSearch /></button>
    </form>
}

export default Search;