import { IViewer } from "./IViewer";

export interface IViewerView extends IViewer {
	className?: string;
	onScroll?(e: EventTarget): void;
}
