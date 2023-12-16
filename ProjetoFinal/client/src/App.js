import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const API_BASE = "http://localhost:8080";

function App() {

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
			<h1>Welcome</h1>
			<h4>ahhahahaha</h4>

			<div className="container">
				<div className="row">
					{movies.map((movie) => (
						<div className="col-sm-3" key={movie.id}>
							<MovieCard movie={movie} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
