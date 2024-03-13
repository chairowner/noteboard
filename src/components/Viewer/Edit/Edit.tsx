import { IViewer } from "@/interfaces/IViewer";
import { FC, useEffect, useRef, useState } from "react";
import { View } from "../View/View";
import s from "./Edit.module.scss";
import { TypePage } from "@/types/TypePage";
import { IViewerView } from "@/interfaces/IViewerView";

export const Edit: FC<IViewer> = ({ page, editMode }) => {
	if (!page) {
		return null;
	}

	const [editPage, setEditPage] = useState<TypePage>(null);

	useEffect(() => {
		setEditPage(page);
	}, [page]);

	const onChangeTextarea = (body: string): void => {
		setEditPage((page) => {
			return { ...page, body };
		});
	};

	const onScroll = (e: EventTarget): void => {
		console.log("onScroll", e);
	};

	const viewProps: IViewerView = {
		className: s.item,
		page: editPage,
		onScroll,
		editMode,
	};

	return (
		<div className={s.container}>
			<textarea
				className={s.item}
				value={editPage?.body || ""}
				onScroll={(e) => onScroll(e.target)}
				onChange={(e) => onChangeTextarea(e.target.value)}
			/>
			<View {...viewProps} />
		</div>
	);
};
