import { FreeMindMap } from "@/components/MainScreen/FreeMindMap/FreeMindMap";
import { LineNote } from "@/components/MainScreen/LineNote/LineNote";
import { MainMenu } from "@/components/MainScreen/Menu/MainMenu";
import { TypeMainMenuItem } from "@/types/TypeMainMenuItem";
import { TypeNoteType } from "@/types/TypeNoteType";
import { FC, useEffect, useState } from "react";

interface INoteType {
	id: TypeNoteType;
	title: string;
}

const noteTypeList: INoteType[] = [
	{ id: TypeNoteType.LineNote, title: "LineNote" },
	{ id: TypeNoteType.FreeMindMap, title: "FreeMindMap" },
];

const MI_ADD_GROUP: string = "addGroup";
const MI_ADD_NOTE: string = "addNote";
const MI_CHANGE_MODE: string = "changeMode";
const MI_SHOW_PARAMS: string = "showParameters";

const defaultMenuItems: TypeMainMenuItem[] = [
	{ command: MI_ADD_GROUP, title: "Добавить группу", hidden: true },
	{ command: MI_ADD_NOTE, title: "Добавить заметку", hidden: false },
	{ command: MI_CHANGE_MODE, title: "Сменить режим", hidden: false },
	{ command: MI_SHOW_PARAMS, title: "Параметры", hidden: false },
];

const MainPage: FC = () => {
	const [noteType, setNoteType] = useState<TypeNoteType>(TypeNoteType.LineNote);
	const [menuTitle, setMenuTitle] = useState<string>("Выбранная позиция");
	const [menuItems, setMenuItems] = useState<TypeMainMenuItem[]>([]);

	useEffect(() => {
		setMenuItems(defaultMenuItems);
	}, []);

	let componentToRender: JSX.Element | null = null;

	switch (noteType) {
		case TypeNoteType.LineNote:
			componentToRender = <LineNote />;
			break;
		case TypeNoteType.FreeMindMap:
			componentToRender = <FreeMindMap />;
			break;
	}

	const changeNoteType = (): void => {
		const newType: TypeNoteType =
			noteType === TypeNoteType.LineNote
				? TypeNoteType.FreeMindMap
				: TypeNoteType.LineNote;
		setNoteType(newType);
	};

	return (
		<div style={{ position: "relative" }}>
			<MainMenu
				items={menuItems}
				title={menuTitle}
				noteType={noteType}
				changeNoteType={changeNoteType}
			/>
			{componentToRender}
		</div>
	);
};
export default MainPage;
