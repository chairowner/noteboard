import { TypePage } from "@/types/TypePage";

export interface IViewer {
	page: TypePage;
	selectPage?(pageId: string | null): void;
	editMode: boolean;
	toggleEditMode?(): void;
	removePage?(): void;
	savePageBody?(body: string, title: string): void;
	showTitle?: boolean;
}
