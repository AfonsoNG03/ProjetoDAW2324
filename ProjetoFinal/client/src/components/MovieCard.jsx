import React from "react";
import "../css/movies.css"

const MovieCard = ( {movie} ) => {

    const renderCategories = (categories) => {
        const categoryArray = categories.split(",");
    
        const categoryButtons = categoryArray.map((category,index) => (
          <button key={index} className="transparent-button">
            {category.trim()}
          </button>
        ));
    
        return categoryButtons;
    };

    return (
        <div className="movie">
            <h2>{movie.title}</h2>
            <p>{movie.rating}   <i class='bx bx-star'></i></p>
            <img src={movie.image} style={{ width: "300px", height: "450px" }}/><br /><br />
            {renderCategories(movie.category)}
            <p>{movie.description}</p><hr />
            <p>Director: {movie.director}</p><hr />
            <p>Release Year: {movie.year}</p>
        </div>
    );
}

export default MovieCard;