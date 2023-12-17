import React from "react";

const TvShowCard = ( {tvShow} ) => {
    return (
        <div className="tvShow">
            <p>{tvShow.year}</p>
            <p>{tvShow.rating}</p>
            <p>{tvShow.category}</p>
            <p>{tvShow.director}</p>
            <img src={tvShow.image} style={{ width: "300px", height: "450px" }}/>
            <h2>{tvShow.title}</h2>
            <p>{tvShow.description}</p>
        </div>
    );
}

export default TvShowCard;