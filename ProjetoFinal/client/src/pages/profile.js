import { useNavigate } from "react-router-dom";
import TvShowCard from "../components/TvShowCard";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header"
import { useState, useEffect } from "react";
const API_BASE = "http://localhost:8080";

function Profile() {
	//Estados para armazenar listas de series e filmes favoritos
	const [tvShows, setTvShows] = useState([]);
	const [movies, setMovies] = useState([]);

	//Hook para navegacao
	const navigate = useNavigate();

	//Recupera informacoes da sessao
	const sessionID = sessionStorage.getItem('sessionID');
	const user = JSON.parse(sessionStorage.getItem('user'));

	// Efeito para carregar series favoritas do utilizador
	useEffect(() => {
		if (user) {
			setTvShows(user.favoriteTvShows);
		}
	}, []);

	// Efeito para carregar filmes favoritos do utilizador
	useEffect(() => {
		if (user) {
			setMovies(user.favoriteMovies);
		}
	}, []);

	//Funcao para adicionar series aos favoritos do utilizador
	const addTvShowToFavorites = async (tvShowsToAdd) => {
		try {
			const response = await fetch(
				`${API_BASE}/users/${user._id}/favoriteTvShows`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ tvShows: tvShowsToAdd }),
				}
			);
			//Atualiza as informacoes do utilizador apos a adicao
			const updatedUser = await response.json();
			console.log(updatedUser);
			sessionStorage.setItem('user', JSON.stringify(updatedUser));
		} catch (error) {
			console.error("Erro ao adicionar series aos favoritos:", error);
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
			sessionStorage.setItem('user', JSON.stringify(updatedUser));
			// Do something with the updated user, e.g., update state or trigger a re-fetch
			console.log(updatedUser);
		} catch (error) {
			console.error("Error adding movie to favorites:", error);
		}
	};

	const handleAddMovieToFavorites = (movie) => {
		const isMovieInFavorites = movies.some((favMovie) => favMovie._id === movie._id);

		if (isMovieInFavorites) {
			// If the movie is already in favorites, remove it
			const updatedFavorites = movies.filter((favMovie) => favMovie._id !== movie._id);
			setMovies(updatedFavorites);
			addMovieToFavorites(updatedFavorites);
		} else {
			// If the movie is not in favorites, add it
			const updatedFavorites = [...movies, movie];
			setMovies(updatedFavorites);
			addMovieToFavorites(updatedFavorites);
		}
	};

	const handleAddTvShowToFavorites = (tvShow) => {
		const isTvShowInFavorites = tvShows.some((favTvShow) => favTvShow._id === tvShow._id);

		if (isTvShowInFavorites) {
			// If the movie is already in favorites, remove it
			const updatedFavorites = tvShows.filter((favTvShow) => favTvShow._id !== tvShow._id);
			setTvShows(updatedFavorites);
			addTvShowToFavorites(updatedFavorites);
		} else {
			// If the movie is not in favorites, add it
			const updatedFavorites = [...tvShows, tvShow];
			setTvShows(updatedFavorites);
			addTvShowToFavorites(updatedFavorites);
		}
	};


	return (
		<div>
			<Header />
			<button onClick={() => navigate("/")}>Home</button>
			<button onClick={() => navigate("/message/3")}>Logout</button>
			<h1>Favorite Movies</h1>
			<div className="row">
				{movies.map((movie) => (
					<div className="col-sm-3" key={movie._id}>
						<MovieCard movie={movie} />
						<button onClick={() => handleAddMovieToFavorites(movie)}>
							Remove from favorites
						</button>
					</div>
				))}
			</div>
			<h1>Favorite TV Shows</h1>
			<div className="row">
				{tvShows.map((tvShow) => (
					<div className="col-sm-3" key={tvShow._id}>
						<TvShowCard tvShow={tvShow} />
						<button onClick={() => handleAddTvShowToFavorites(tvShow)}>
							Remove from favorites
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Profile;