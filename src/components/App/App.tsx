import { Link, Outlet } from "react-router-dom";

export const App = () => {
	return (
		<>
			<header>
				<Link to={"/"}>Main</Link>
			</header>
			<div>
				<Outlet />
			</div>
		</>
	);
};
