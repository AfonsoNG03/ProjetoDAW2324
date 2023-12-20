import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080";

function Movies() {
	const navigate = useNavigate();
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const [sortingMethod, setSortingMethod] = useState("ranking"); // Default sorting method
	const sessionID = sessionStorage.getItem("sessionID");
	const user = JSON.parse(sessionStorage.getItem("user"));

	useEffect(() => {
		getMovies();
	}, []);

	useEffect(() => {
		// Filter and sort movies based on the search term and sorting method
		const filtered = movies
		  .filter((movie) =>
			movie.title.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		  .sort((a, b) => {
			if (sortingMethod === "ranking") {
			  return b.rating - a.rating; // Sort by ranking
			} else {
			  return a.title.localeCompare(b.title); // Sort alphabetically
			}
		  });
		  setFilteredMovies(filtered);
		}, [searchTerm, movies, sortingMethod]);		  

	useEffect(() => {
		// Load user's favorite movies on page load
		if (user) {
			setFavoriteMovies(user.favoriteMovies);
		}
	}, []);

	const getMovies = async () => {
		try {
			const response = await fetch(API_BASE + "/movies");
			const data = await response.json();
			setMovies(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	const addMovieToFavorites = async (moviesToAdd) => {
		try {
			const response = await fetch(
				`${API_BASE}/users/${user._id}/favoriteMovies`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ movies: moviesToAdd }), // Send an array of movies
				}
			);
			const updatedUser = await response.json();
			sessionStorage.setItem("user", JSON.stringify(updatedUser));
			// Do something with the updated user, e.g., update state or trigger a re-fetch
			console.log(updatedUser);
		} catch (error) {
			console.error("Error adding movie to favorites:", error);
		}
	};
	

	const handleAddToFavorites = (movie) => {
		const isMovieInFavorites = favoriteMovies.some(
			(favMovie) => favMovie._id === movie._id
		);

		if (isMovieInFavorites) {
			// If the movie is already in favorites, remove it
			const updatedFavorites = favoriteMovies.filter(
				(favMovie) => favMovie._id !== movie._id
			);
			setFavoriteMovies(updatedFavorites);
			addMovieToFavorites(updatedFavorites);
		} else {
			// If the movie is not in favorites, add it
			const updatedFavorites = [...favoriteMovies, movie];
			setFavoriteMovies(updatedFavorites);
			addMovieToFavorites(updatedFavorites);
		}
	};

	const handleSortChange = (e) => {
		setSortingMethod(e.target.value);
	  };

	return (
		<div className="App">
			<button onClick={() => navigate("/")}>Home</button>
			<button onClick={() => navigate("/tvShows")}>tvShows</button>

			{/* Search bar */}
			<input
				type="text"
				placeholder="Search by name..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			{/* Sorting dropdown */}
			<label htmlFor="sort">Sort by:</label>
			<select id="sort" value={sortingMethod} onChange={handleSortChange}>
				<option value="ranking">Ranking</option>
				<option value="alphabetical">Alphabetical</option>
			</select>

			<div className="container">
				<div className="row">
					{filteredMovies.map((movie) => (
						<div className="col-sm-3" key={movie._id}>
							<MovieCard movie={movie} />
							{sessionID ? (
								<button onClick={() => handleAddToFavorites(movie)}>
									{favoriteMovies.some((favMovie) => favMovie._id === movie._id)
										? "Remove from favorites"
										: "Add to favorites"}
								</button>
							) : (
								<></>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Movies;
