import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

export const App: FC = () => {
	return (
		<>
			{/* <header>
				<Link to={"/"}>Main</Link>
			</header> */}
			<Outlet />
		</>
	);
};
