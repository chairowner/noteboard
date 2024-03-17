import { TypePage } from "@/types/TypePage";

export interface IViewer {
	page: TypePage;
	selectPage?(pageId: string | null): void;
	editMode: boolean;
	toggleEditMode?(): void;
	savePageBody?(body: string): void;
}
