import "./App.css";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PostsPage from "./pages/PostsPage/PostsPage";
import IsPrivate from "./components/isPrivate";
import IsAnon from "./components/IsAnon";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/signup"
					element={
						<IsAnon>
							<SignupPage />
						</IsAnon>
					}
				/>
				<Route
					path="/login"
					element={
						<IsAnon>
							<LoginPage />
						</IsAnon>
					}
				/>
				<Route
					path="/posts"
					element={
						<IsPrivate>
							<PostsPage />
						</IsPrivate>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
