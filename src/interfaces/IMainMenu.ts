import { TypePage } from "@/types/TypePage";
import { CSSProperties } from "react";

export interface IMainMenu {
	user?: string;
	selectedPage?: TypePage;
	pages: TypePage[];
	selectPage(pageId: string): void;
	togglePageList(pageId: string): void;
	toggleGlobalSettings?(): void;
	createNewPage?(): void;
}
