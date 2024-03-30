import { TypePage } from "@/types/TypePage";

export interface IMainMenu {
	user?: string;
	selectedPage?: TypePage;
	pages: TypePage[];
	selectPage(pageId: string): void;
	togglePageList(pageId: string): void;
	mainMenuOpened: boolean;
	toggleMainMenu(): void;
	toggleGlobalSettings?(): void;
	createNewPage?(): void;
}
