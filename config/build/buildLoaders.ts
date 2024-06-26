import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders({ mode }: BuildOptions): ModuleOptions["rules"] {
	const isProd = mode === "production";

	const cssModuleLoader = {
		loader: "css-loader",
		options: {
			modules: {
				localIdentName: isProd ? "[hash:base64:12]" : "[path][name]__[local]",
			},
		},
	};

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isProd ? MiniCssExtractPlugin.loader : "style-loader",
			cssModuleLoader,
			"sass-loader",
		],
	};

	const babelLoader = buildBabelLoader();

	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: "asset/resource",
	};
	const svgrLoader = {
		test: /\.svg$/i,
		use: [
			{
				loader: "@svgr/webpack",
				options: {
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: "convertColors",
								params: {
									currentColor: true,
								},
							},
						],
					},
				},
			},
		],
	};

	const txtLoader = {
		test: /\.(txt|md)$/i,
		use: "raw-loader",
	};

	return [txtLoader, svgrLoader, assetLoader, scssLoader, babelLoader];
}
