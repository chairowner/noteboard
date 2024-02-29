import { TypeNoteType } from "./TypeNoteType";

export type TypeNote = {
	id: string;
	type: TypeNoteType;
	create_date: Date;
	edit_date?: Date | undefined;
	title: string;
	body?: string | undefined;
};
