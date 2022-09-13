import "./navbar.css";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
	const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>

				{isLoggedIn && (
					<li>
						<Link to="/posts">Posts</Link>
					</li>
				)}

				{isLoggedIn && (
					<li>
						<button onClick={logOutUser} className="logout">
							Logout
						</button>
					</li>
				)}

				{!isLoggedIn && (
					<li>
						<Link to="/signup">Signup</Link>
					</li>
				)}

				{!isLoggedIn && (
					<li>
						<Link to="/login">Login</Link>
					</li>
				)}
			</ul>
		</nav>
	);
}

export default Navbar;
