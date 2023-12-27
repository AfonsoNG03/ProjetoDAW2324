import React from "react";
import "../css/movies.css";

const MovieCard = ({ movie, handleAddToFavorites, favoriteMovies }) => {
    const isMovieInFavorites = Array.isArray(favoriteMovies) && favoriteMovies.some(
        (favMovie) => favMovie._id === movie._id
    );

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
        <div className="card">
            <div className="card-image">
                <img src={movie.image} />
            </div>
            <div className="card-body">
                <span className="card-title">{movie.title}</span>
                <p>
                    <span>{movie.year}</span>
                    <span>{movie.director}</span>
                </p>
                <p>
                    <span> {renderCategories(movie.category)}</span>
                </p>
                <span clas="rating">{movie.rating}</span>
                <p class="card-description">
                    {movie.description}
                </p>
                {/* Add to Favorites button */}
                <button className="favorites" onClick={() => handleAddToFavorites(movie)}>
                    {isMovieInFavorites ? "Remove from favorites" : "Add to favorites"}
                </button>
            </div>
        </div>
    );
}

export default MovieCard;