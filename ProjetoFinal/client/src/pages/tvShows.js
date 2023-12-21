import { useState, useEffect } from "react";
import TvShowCard from "../components/TvShowCard";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"

const API_BASE = "http://localhost:8080";

function TvShows() {
	const navigate = useNavigate();
	const [tvShows, setTvShows] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredTvShows, setFilteredTvShows] = useState([]);
	const [favoriteTvShows, setFavoriteTvShows] = useState([]);
	const [sortingMethod, setSortingMethod] = useState("ranking"); // Default sorting method
	const sessionID = sessionStorage.getItem('sessionID');
	const user = JSON.parse(sessionStorage.getItem('user'));

	useEffect(() => {
		getTvShows();
	}, []);

	useEffect(() => {
		const filtered = tvShows
		  .filter((tvShow) =>
			tvShow.title.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		  .sort((a, b) => {
			if (sortingMethod === "ranking") {
			  return b.rating - a.rating;
			} else {
			  return a.title.localeCompare(b.title);
			}
		  });
		  setFilteredTvShows(filtered);
		}, [searchTerm, tvShows, sortingMethod]);

	
	useEffect(() => {
		if (user) {
		  setFavoriteTvShows(user.favoriteTvShows);
		}
	  }, []);


	const getTvShows = async () => {
		try {
			const response = await fetch(API_BASE + "/tvShows");
			const data = await response.json();
			setTvShows(data);
			console.log(data);
		}
		catch (error) {
			console.log(error);
		}
	}

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
		  const updatedUser = await response.json();
		  sessionStorage.setItem('user', JSON.stringify(updatedUser));
		  console.log(updatedUser);
		} catch (error) {
		  console.error("Error adding tvShows to favorites:", error);
		}
	  };
	
	  const handleAddToFavorites = (tvShow) => {
		const isTvShowInFavorites = favoriteTvShows.some((favTvShow) => favTvShow._id === tvShow._id);
	
		if (isTvShowInFavorites) {
			// If the movie is already in favorites, remove it
			const updatedFavorites = favoriteTvShows.filter((favTvShow) => favTvShow._id !== tvShow._id);
			setFavoriteTvShows(updatedFavorites);
			addTvShowToFavorites(updatedFavorites);
		} else {
			// If the movie is not in favorites, add it
			const updatedFavorites = [...favoriteTvShows, tvShow];
			setFavoriteTvShows(updatedFavorites);
			addTvShowToFavorites(updatedFavorites);
		}
	};

	const handleSortChange = (e) => {
		setSortingMethod(e.target.value);
	  };

	return (
		<div className="App">
			<Header />
			<button onClick={() => navigate("/")}>Home</button>
			<button onClick={() => navigate("/movies")}>Movies</button>
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
					{filteredTvShows.map((tvShow) => (
						<div className="col-sm-3" key={tvShow._id}>
							<TvShowCard tvShow={tvShow} />
							{sessionID ? (
								<button onClick={() => handleAddToFavorites(tvShow)}>
								{favoriteTvShows.some((favTvShow) => favTvShow._id === tvShow._id) ? "Remove from favorites" :
								"Add to favorites"}
							</button>
							) : (<></>)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default TvShows;