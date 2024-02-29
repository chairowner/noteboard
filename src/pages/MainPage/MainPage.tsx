import { BlockPanel } from "@/components/MainScreen/BlockPanel/BlockPanel";
import { MainMenu } from "@/components/MainScreen/Menu/MainMenu";
import { FC } from "react";

const MainPage: FC = () => {
	return (
		<div style={{ position: "relative" }}>
			<MainMenu />
			{/* <BlockPanel /> */}
		</div>
	);
};
export default MainPage;
