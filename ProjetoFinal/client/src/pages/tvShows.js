import { useState, useEffect } from "react";
import TvShowCard from "../components/TvShowCard";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"
import  "../css/movies-show-interface.css";

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

	//Busca series na montagem do componente
	useEffect(() => {
		getTvShows();
	}, []);

	//Atualiza series filtradas com base no termo de pesquisa e metodo de ordenacao
	useEffect(() => {
		const filtradas = tvShows
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
		setFilteredTvShows(filtradas);
	}, [searchTerm, tvShows, sortingMethod]);

	//Carrega series favoritas do utilizador na carga da pagina
	useEffect(() => {
		if (user) {
			setFavoriteTvShows(user.favoriteTvShows);
		}
	}, []);

	//Funcao para buscar series na API
	const getTvShows = async () => {
		try {
			const resposta = await fetch(API_BASE + "/tvShows");
			const dados = await resposta.json();
			setTvShows(dados);
			console.log(dados);
		}
		catch (erro) {
			console.log(erro);
		}
	}

	//Funcao para adicionar series aos favoritos do utilizador
	const addTvShowToFavorites = async (tvShowsParaAdicionar) => {
		try {
			const resposta = await fetch(
				`${API_BASE}/users/${user._id}/favoriteTvShows`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ tvShows: tvShowsParaAdicionar }),
				}
			);
			const usuarioAtualizado = await resposta.json();
			sessionStorage.setItem('user', JSON.stringify(usuarioAtualizado));
			console.log(usuarioAtualizado);
		} catch (erro) {
			console.error("Erro ao adicionar series aos favoritos:", erro);
		}
	};

	//Função para lidar com adicao/remocao de series dos favoritos
	const handleAddToFavorites = (tvShow) => {
		const estaNaListaDeFavoritos = favoriteTvShows.some((favTvShow) => favTvShow._id === tvShow._id);

		if (estaNaListaDeFavoritos) {
			//Se a serie de TV ja estiver nos favoritos, remova-a
			const favoritosAtualizados = favoriteTvShows.filter((favTvShow) => favTvShow._id !== tvShow._id);
			setFavoriteTvShows(favoritosAtualizados);
			addTvShowToFavorites(favoritosAtualizados);
		} else {
			//Se a serie de TV nao estiver nos favoritos, adicione-a
			const favoritosAtualizados = [...favoriteTvShows, tvShow];
			setFavoriteTvShows(favoritosAtualizados);
			addTvShowToFavorites(favoritosAtualizados);
		}
	};

	//Funcao para lidar com a mudanca do metodo de ordenacao
	const handleSortChange = (e) => {
		setSortingMethod(e.target.value);
	};

	return (
		<div className="App">
			<Header />
			{/*<button onClick={() => navigate("/")}>Home</button>
			<button onClick={() => navigate("/movies")}>Movies</button>*/}
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