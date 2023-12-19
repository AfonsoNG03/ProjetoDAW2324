import { useState, useEffect } from "react";
import TvShowCard from "../components/TvShowCard";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080";

function TvShows() {
	const navigate = useNavigate();
	const [tvShows, setTvShows] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredTvShows, setFilteredTvShows] = useState([]);
	const [favoriteTvShows, setFavoriteTvShows] = useState([]);
	const sessionID = sessionStorage.getItem('sessionID');
	const user = JSON.parse(sessionStorage.getItem('user'));

	useEffect(() => {
		getTvShows();
	}, []);

	useEffect(() => {
		// Filter tvshows based on the search term
		const filtered = tvShows.filter(tvShow =>
			tvShow.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredTvShows(filtered);
	}, [searchTerm, tvShows]);

	
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
		  console.log(updatedUser);
		} catch (error) {
		  console.error("Error adding tvShows to favorites:", error);
		}
	  };
	
	  const handleAddToFavorites = (tvShow) => {
		const updatedFavorites = [...favoriteTvShows, tvShow];
		setFavoriteTvShows(updatedFavorites);
		addTvShowToFavorites(updatedFavorites);
	  };

	return (
		<div className="App">
			<button onClick={() => navigate("/")}>Home</button>
			<button onClick={() => navigate("/movies")}>Movies</button>
			{/* Search bar */}
			<input
				type="text"
				placeholder="Search by name..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<div className="container">
				<div className="row">
					{filteredTvShows.map((tvShow) => (
						<div className="col-sm-3" key={tvShow._id}>
							<TvShowCard tvShow={tvShow} />
							{sessionID ? (
								<button onClick={() => handleAddToFavorites(tvShow)}>
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

export default TvShows;