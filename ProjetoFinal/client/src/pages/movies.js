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
	const sessionID = sessionStorage.getItem('sessionID');
	const user = JSON.parse(sessionStorage.getItem('user'));

	useEffect(() => {
		getMovies();
	}, []);

	useEffect(() => {
		// Filter movies based on the search term
		const filtered = movies.filter(movie =>
			movie.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredMovies(filtered);
	}, [searchTerm, movies]);

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
		}
		catch (error) {
			console.log(error);
		}
	}

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
		  // Do something with the updated user, e.g., update state or trigger a re-fetch
		  console.log(updatedUser);
		} catch (error) {
		  console.error("Error adding movie to favorites:", error);
		}
	  };
	
	  const handleAddToFavorites = (movie) => {
		const updatedFavorites = [...favoriteMovies, movie];
		setFavoriteMovies(updatedFavorites);
		addMovieToFavorites(updatedFavorites);
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

			<div className="container">
				<div className="row">
					{filteredMovies.map((movie) => (
						<div className="col-sm-3" key={movie._id}>
							<MovieCard movie={movie} />
							{sessionID ? (
								<button onClick={() => handleAddToFavorites(movie)}>
								Add to Favorites
							</button>
							) : (<></>)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Movies;