import axios from "axios";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

const API_URL = "http://localhost:5005";

function ProjectsPage() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [posts, setPosts] = useState([]);
	const [postsCopy, setPostsCopy] = useState(posts);

	const storedToken = localStorage.getItem("authToken");

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleDescription = (e) => {
		setDescription(e.target.value);
	};

	console.log("TOKENNNNN", storedToken);

	const getPosts = () => {
		axios
			.get(`${API_URL}/post`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				console.log(response);

				setPosts(response.data.posts);
			})
			.catch((err) => {
				console.log("SOMETHING WENT WRONG", err);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const info = { title, description };

		console.log("this is the token", storedToken);

		axios
			.post(`${API_URL}/post/create-post`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				console.log("THIS IS THE RESPONSE BIHH", response);

				setTitle("");
				setDescription("");
				getPosts();
			})
			.catch((err) => {
				console.log("OH NOOOOO", err);
			});
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div>
			{posts &&
				posts.map((post) => {
					return (
						<div key={post._id}>
							<p>{post.title}</p>
							<p>{post.description}</p>
							<button
								onClick={() => {
									axios
										.delete(`${API_URL}/post/delete/${post._id}`)
										.then(() => {
											getPosts();
										})
										.catch((err) => console.log(err));
								}}
							>
								delete
							</button>
						</div>
					);
				})}

			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						value={title}
						onChange={handleTitle}
					/>
				</div>

				<div>
					<label htmlFor="description">Description</label>
					<input
						type="text"
						name="description"
						value={description}
						onChange={handleDescription}
					/>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default ProjectsPage;
