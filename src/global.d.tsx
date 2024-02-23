declare module "*.module.sass" {
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
}
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
	import { VFC, SVGProps } from "react";
	const SVG: VFC<SVGProps<SVGSVGElement>>;
	export default SVG;
}
