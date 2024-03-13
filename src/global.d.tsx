declare module "*.module.scss" {
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
}
declare module "*.txt";
declare module "*.md";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
	import { /* VFC, */ FC, SVGProps } from "react";
	const SVG: /* VFC */ FC<SVGProps<SVGSVGElement>>;
	export default SVG;
}
