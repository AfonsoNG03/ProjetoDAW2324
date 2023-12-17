import React from "react";

const MovieCard = ( {movie} ) => {
    return (
        <div className="movie">
            <p>{movie.year}</p>
            <p>{movie.rating}</p>
            <p>{movie.category}</p>
            <p>{movie.director}</p>
            <img src={movie.image} style={{ width: "300px", height: "450px" }}/>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
        </div>
    );
}

export default MovieCard;