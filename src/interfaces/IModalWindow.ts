import { CSSProperties, ReactNode } from "react";

export interface IModalWindow {
	closeModalWindow(): void;
	children?: ReactNode;
	style?: CSSProperties;
}
