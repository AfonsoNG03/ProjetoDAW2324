import React from "react";
import "../css/tvShows.css"

const TvShowCard = ( {tvShow} ) => {

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
        <div className="tvShow">
            <h2>{tvShow.title}</h2>
            <p>{tvShow.rating}   <i class='bx bx-star'></i></p>
            <img src={tvShow.image} style={{ width: "300px", height: "450px" }}/><br /><br />
            {renderCategories(tvShow.category)}
            <p>{tvShow.description}</p><hr />
            <p>Director: {tvShow.director}</p><hr />
            <p>Release Year: {tvShow.year}</p>
        </div>
    );
}

export default TvShowCard;