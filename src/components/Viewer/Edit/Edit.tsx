import { IViewer } from "@/interfaces/IViewer";
import { FC, useEffect, useRef, useState } from "react";
import { View } from "../View/View";
import s from "./Edit.module.scss";
import { TypePage } from "@/types/TypePage";
import { IViewerView } from "@/interfaces/IViewerView";
import classNames from "classnames";

interface IEdit extends IViewer {
	changeEditBody(body: string): void;
	changeEditTitle(title: string): void;
	onSaveHandler(): void;
}

export const Edit: FC<IEdit> = ({
	page,
	editMode,
	changeEditBody,
	changeEditTitle,
	onSaveHandler,
	toggleEditMode,
}) => {
	if (!page) {
		return null;
	}

	const [editPage, setEditPage] = useState<TypePage>(page);

	const onChangeTextarea = (body: string): void => {
		setEditPage((page) => ({ ...page, body }));
		changeEditBody(body);
	};

	const onChangeTitle = (title: string): void => {
		setEditPage((page) => ({ ...page, title }));
		changeEditTitle(title);
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

	const turnOffEditMode = (): void => {
		if (!editMode) {
			return;
		}
		toggleEditMode();
	};

	useEffect(() => {
		setEditPage(page);
		changeEditBody(page.body);
	}, [page]);

	useEffect(() => {
		const keyPressEventListenerName: string = "keydown";

		const onKeyPress = (e: KeyboardEvent) => {
			if (e.ctrlKey) {
				if (["KeyS", "KeyE", "KeyQ", "KeyW"].includes(e.code)) {
					e.preventDefault();
					if (e.code === "KeyS") {
						onSaveHandler();
					}
					if (e.code === "KeyQ") {
						turnOffEditMode();
					}
				}
			}
		};

		document.addEventListener(keyPressEventListenerName, onKeyPress);

		return () => {
			document.removeEventListener(keyPressEventListenerName, onKeyPress);
		};
	}, []);

	return (
		<div className={s.container}>
			<input
				className={classNames(s.input, s.title, s.bold)}
				type="text"
				value={editPage.title}
				onChange={(e) => onChangeTitle(e.target.value)}
			/>
			<div className={s.blocks}>
				<textarea
					className={s.item}
					value={editPage?.body || ""}
					onScroll={(e) => onScroll(e.target)}
					onChange={(e) => onChangeTextarea(e.target.value)}
				/>
				<View {...viewProps} removeUseEffect={true} showTitle={false} />
			</div>
		</div>
	);
};
