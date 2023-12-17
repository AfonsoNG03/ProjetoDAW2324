import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const API_BASE = "http://localhost:8080";

function Movies() {
    const [movies, setMovies] = useState([]);

	useEffect(() => {
		getMovies();
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

	return (
		<div className="App">
			<div className="container">
				<div className="row">
					{movies.map((movie) => (
						<div className="col-sm-3" key={movie._id}>
							<MovieCard movie={movie} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Movies;