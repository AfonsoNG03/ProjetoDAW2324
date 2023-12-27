import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import "../css/movies.css";
import  "../css/movies-show-interface.css";

// URL base da API
const API_BASE = "http://localhost:8080";

function Movies() {
	// Hook para navegacao
	const navigate = useNavigate();

	//Variaveis de estado usando o hook 'useState'
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const [sortingMethod, setSortingMethod] = useState("ranking"); // Método de ordenação padrão

	//Recupera informacoes da sessao
	const sessionID = sessionStorage.getItem("sessionID");
	const user = JSON.parse(sessionStorage.getItem("user"));

	//Busca filmes na montagem do componente
	useEffect(() => {
		getMovies();
	}, []);

	//Atualiza filmes filtrados com base no termo de pesquisa e metodo de ordenação
	useEffect(() => {
		const filtrados = movies
			.filter((filme) =>
				filme.title.toLowerCase().includes(searchTerm.toLowerCase())
			)
			.sort((a, b) => {
				if (sortingMethod === "ranking") {
					return b.rating - a.rating; //Ordena por ranking
				} else {
					return a.title.localeCompare(b.title); //Ordena alfabeticamente
				}
			});
		setFilteredMovies(filtrados);
	}, [searchTerm, movies, sortingMethod]);

	//Carrega filmes favoritos do utilizador na carga da página
	useEffect(() => {
		if (user) {
			setFavoriteMovies(user.favoriteMovies);
		}
	}, []);

	//Função para buscar filmes na API
	const getMovies = async () => {
		try {
			const resposta = await fetch(API_BASE + "/movies");
			const dados = await resposta.json();
			setMovies(dados);
			console.log(dados);
		} catch (erro) {
			console.log(erro);
		}
	};

	//Funcao para adicionar filmes aos favoritos do utilizador
	const addMovieToFavorites = async (filmesParaAdicionar) => {
		try {
			const resposta = await fetch(
				`${API_BASE}/users/${user._id}/favoriteMovies`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ movies: filmesParaAdicionar }), //Envia um array de filmes
				}
			);
			const usuarioAtualizado = await resposta.json();
			sessionStorage.setItem("user", JSON.stringify(usuarioAtualizado));
			//Faça algo com o utilizador atualizado, por exemplo, atualize o estado ou acione uma nova busca
			console.log(usuarioAtualizado);
		} catch (erro) {
			console.error("Erro ao adicionar filme aos favoritos:", erro);
		}
	};

	//Funcao para lidar com adicao/remocao de filmes dos favoritos
	const handleAddToFavorites = (filme) => {
		const filmeJaNosFavoritos = favoriteMovies.some(
			(filmeFav) => filmeFav._id === filme._id
		);

		if (filmeJaNosFavoritos) {
			// Se o filme ja estiver nos favoritos, remova-o
			const favoritosAtualizados = favoriteMovies.filter(
				(filmeFav) => filmeFav._id !== filme._id
			);
			setFavoriteMovies(favoritosAtualizados);
			addMovieToFavorites(favoritosAtualizados);
		} else {
			// Se o filme nao estiver nos favoritos, adicione-o
			const favoritosAtualizados = [...favoriteMovies, filme];
			setFavoriteMovies(favoritosAtualizados);
			addMovieToFavorites(favoritosAtualizados);
		}
	};

	//Funcao para lidar com a mudança do metodo de ordenacao
	const handleSortChange = (e) => {
		setSortingMethod(e.target.value);
	};

	return (
		<div className="App">
			<Header />
			{/*<button onClick={() => navigate("/")}>Home</button>
			<button onClick={() => navigate("/tvShows")}>tvShows</button>*/}

			{/* Search bar */}
			<div className="search-container">
				<div className="search-icon">
					<i class='bx bx-search icon'></i>
					<input className="input-field"
						type="text"
						placeholder="  Search by name..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>
			

			{/* Sorting dropdown */}
			<div style={{paddingInline: "40px"}}>
				<label htmlFor="sort" className="sort-label">Sort by:</label>
				<select className="sort-select" id="sort" value={sortingMethod} onChange={handleSortChange}>
					<option value="ranking">Ranking</option>
					<option value="alphabetical">Alphabetical</option>
				</select>
			</div>
			<div className="Container">
				{filteredMovies.map((movie) => (
					<div className="col-sm-6" key={movie._id}>
						<MovieCard
							movie={movie}
							handleAddToFavorites={handleAddToFavorites}
							favoriteMovies={favoriteMovies}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default Movies;
