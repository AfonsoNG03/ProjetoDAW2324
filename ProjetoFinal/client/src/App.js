import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Movies from './pages/movies';
import TvShows from './pages/tvShows';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

function App() {

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/tvShows" element={<TvShows />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/movies" element={<Movies />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
