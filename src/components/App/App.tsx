import { useTheme } from "@/contexts/Theme/Theme.context";
import { CSSProperties, FC } from "react";
import { Outlet } from "react-router-dom";
import s from "./App.module.scss";

export const App: FC = () => {
	const { theme } = useTheme();
	return (
		<div style={{ ...(theme as CSSProperties) }} className={s.container}>
			{/* <header>
				<Link to={"/"}>Main</Link>
			</header> */}
			<Outlet />
		</div>
	);
};
