import React, {useEffect, useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Joke from "./Joke"

const JokeList = () => {
    const[jokeData, setJokesList]= useState([])
    
    const getData = () => {
        axiosWithAuth()
            .get('/api/jokes')
            .then(res => {
                console.log(res.data)
                setJokesList(res.data)
                console.log(jokeData)
            })
            .catch(err => { console.log(err) })
    }

    useEffect(() => {getData()}, [jokeData.length])

    return (
        <div>
            {jokeData.map(item=>{
                return(
                    <Joke key={item.id} data={item}/>
                )
            })}
        </div>
    );
};

export default JokeList;