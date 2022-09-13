import axios from "axios";
import { useState, useEffect, useContext } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const API_URL = "http://localhost:5005";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errMessage, setErrMessage] = useState(null);

	const { storeToken, authenticateUser } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = { email, password };

		axios
			.post(`${API_URL}/login`, body)
			.then((response) => {
				console.log("THIS IS THE TOKEN", response.data.authToken);
				storeToken(response.data.authToken);
				authenticateUser();
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
				setErrMessage(err.response.data.message);
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="email">Email</label>
				<input type="email" name="email" onChange={handleEmail}></input>
			</div>

			<div>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					onChange={handlePassword}
				></input>
			</div>

			<button type="submit" className="submit-btn">
				Login
			</button>

			{errMessage && <p>{errMessage}</p>}
		</form>
	);
}

export default LoginPage;
