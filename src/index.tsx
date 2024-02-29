import { StrictMode, Suspense } from "react";
import { Root, createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "./components/App/App";
import { MainPage } from "./pages/MainPage";
import { WelcomePage } from "./pages/WelcomePage/WelcomePage";
import "./index.sass";
import { LoadingPage } from "./pages/LoadingPage/LoadingPage";

const root: HTMLElement = document.getElementById("root");

if (!root) {
	throw new Error("root not found");
}

const container: Root = createRoot(root);

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<LoadingPage />}>
						<MainPage />
					</Suspense>
				),
			},
			// {
			// 	path: "/about",
			// 	element: (
			// 		<Suspense fallback={<b>"Loading about..."</b>}>
			// 			<About />
			// 		</Suspense>
			// 	),
			// },
		],
	},
]);

container.render(
	<StrictMode>
		{/* <WelcomePage /> */}
		<RouterProvider router={router} />
	</StrictMode>
);
