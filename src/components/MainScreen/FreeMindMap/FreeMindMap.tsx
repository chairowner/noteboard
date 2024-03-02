import { TypeNote } from "@/types/TypeNote";
import { TypeNoteType } from "@/types/TypeNoteType";
import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";

const typeNoteObject: TypeNote = {
	id: v4(),
	type: TypeNoteType.LineNote,
	title: "test note",
	create_date: new Date(),
};

export const FreeMindMap: FC = () => {
	const [notes, setNotes] = useState<TypeNote[]>([typeNoteObject]);

	useEffect(() => {
		const data = localStorage.getItem("notes");
		if (!data) return;
		const _notes = JSON.parse(data);
	}, []);

	return (
		<div>{notes.length > 0 ? <div>{JSON.stringify(notes)}</div> : ""}</div>
	);
};
