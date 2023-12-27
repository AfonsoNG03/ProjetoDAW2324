import React from "react";
import "../css/movies.css";

const TvShowCard = ({ tvShow, handleAddToFavorites, favoriteTvShows }) => {
    const isTvShowInFavorites = Array.isArray(favoriteTvShows) &&
        favoriteTvShows.some((favTvShow) => favTvShow._id === tvShow._id);

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
                    <span>{tvShow.category}</span>
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