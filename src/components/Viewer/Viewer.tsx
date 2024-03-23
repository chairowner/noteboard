import { IViewer } from "@/interfaces/IViewer";
import { FC, useEffect, useState } from "react";
import s from "./Viewer.module.scss";
import { View } from "./View/View";
import { Edit } from "./Edit/Edit";
import { Button } from "../Button/Button";

export const Viewer: FC<IViewer> = (props) => {
	const [render, setRender] = useState<JSX.Element>(null);

	let editBody: string = null;

	const onSaveHandler = (): void => {
		if (!props.editMode) {
			return;
		}
		props.savePageBody(editBody);
	};

	const changeEditBody = (body: string): void => {
		editBody = body;
	};

	const RenderButtonsBlock: FC = () => (
		<div className={s.buttons}>
			{props.editMode ? (
				<>
					<Button onClick={() => onSaveHandler()}>Сохранить</Button>
					<Button onClick={() => props.toggleEditMode()}>Отмена</Button>
				</>
			) : (
				<Button onClick={() => props.toggleEditMode()}>Редактировать</Button>
			)}
		</div>
	);

	const RenderDataBlock: FC<IViewer> = () => (
		<div className={s.render}>
			{props?.editMode ? (
				<Edit
					{...props}
					changeEditBody={changeEditBody}
					onSaveHandler={onSaveHandler}
				/>
			) : (
				<View {...props} />
			)}
		</div>
	);

	useEffect(() => {
		props.selectPage(props?.page?.id);
		if (props?.page === null) {
			setRender(null);
			return;
		}

		setRender(
			<>
				<RenderButtonsBlock />
				<RenderDataBlock {...props} />
			</>
		);
	}, [props?.page, props.editMode]);

	return <div className={s.container}>{render}</div>;
};
