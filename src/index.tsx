import { StrictMode, Suspense } from "react";
import { Root, createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { App } from "./components/App/App";
import { Main } from "./pages/Main";
import { Welcome } from "./components/Welcome/Welcome";
import "./index.sass";

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
					<Suspense fallback={<b>"Loading..."</b>}>
						<Main />
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
		<Welcome />
		{/* <RouterProvider router={router} /> */}
	</StrictMode>
);
