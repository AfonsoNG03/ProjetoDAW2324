import React from "react";
import "../css/tvShows.css"
import "../css/movies.css";

const TvShowCard = ({ tvShow, handleAddToFavorites, favoriteTvShows }) => {
    const isTvShowInFavorites = Array.isArray(favoriteTvShows) &&
        favoriteTvShows.some((favTvShow) => favTvShow._id === tvShow._id);


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
                <img src={tvShow.image} />
            </div>
            <div className="card-body">
                <span className="card-title">{tvShow.title}</span>
                <p>
                    <span>{tvShow.year}</span>
                    <span>{tvShow.director}</span>
                    <span>{renderCategories(tvShow.category)}</span>
                </p>
                <span clas="rating">{tvShow.rating}</span>
                <p class="card-description">
                    {tvShow.description}
                </p>
                {/* Add to Favorites button */}
                <button className="favorites" onClick={() => handleAddToFavorites(tvShow)}>
                    {isTvShowInFavorites ? "Remove from favorites" : "Add to favorites"}
                </button>
            </div>
        </div>
    );
}

export default TvShowCard;