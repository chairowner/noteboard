import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

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
