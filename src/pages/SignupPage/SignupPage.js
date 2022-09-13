import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errMessage, setErrMessage] = useState(null);

	const handleName = (e) => {
		setName(e.target.value);
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = { name, email, password };

		axios
			.post(`${API_URL}/signup`, body)
			.then((response) => {
				console.log(response.data);
			})
			.catch((err) => {
				setErrMessage(err.response.data.message);
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Name</label>
				<input type="text" name="name" onChange={handleName}></input>
			</div>

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
				Signup
			</button>

			{errMessage && <p>{errMessage}</p>}
		</form>
	);
}

export default SignupPage;
