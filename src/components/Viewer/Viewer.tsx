import { IViewer } from "@/interfaces/IViewer";
import { FC, useEffect, useState } from "react";
import s from "./Viewer.module.scss";
import { View } from "./View/View";
import { Edit } from "./Edit/Edit";
import { Button } from "../Button/Button";
import { useWindowState } from "@/contexts/WindowState/WindowState.context";

export const Viewer: FC<IViewer> = (props) => {
	const { isMobile } = useWindowState();
	const [render, setRender] = useState<JSX.Element>(null);

	let editBody: string = null;
	let editTitle: string = null;

	const onSaveHandler = (): void => {
		if (!props.editMode) {
			return;
		}
		props.savePageBody(editBody, editTitle);
	};

	const changeEditBody = (body: string): void => {
		editBody = body;
	};

	const changeEditTitle = (title: string): void => {
		editTitle = title;
	};

	const RenderButtonsBlock: FC = () => (
		<div className={s.buttons}>
			{props.editMode ? (
				<>
					<Button onClick={() => onSaveHandler()}>Сохранить</Button>
					<Button onClick={() => props.toggleEditMode()}>Отмена</Button>
				</>
			) : (
				<>
					<Button onClick={() => props.toggleEditMode()}>Редактировать</Button>
					<Button onDoubleClick={() => props.removePage()} title="doubleClick">
						Удалить
					</Button>
				</>
			)}
		</div>
	);

	const RenderDataBlock: FC<IViewer> = () => (
		<div className={s.render}>
			{props?.editMode ? (
				<Edit
					{...props}
					changeEditBody={changeEditBody}
					changeEditTitle={changeEditTitle}
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

	const MobileHeader: FC = () => {
		return (
			<header className={s.header}>
				<button
					className={s.toggleButton}
					onClick={() => props?.toggleMainMenu()}
				>
					<svg
						width="20px"
						height="20px"
						viewBox="0"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4 6H20M4 12H14M4 18H9"
							stroke="var(--accent)"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</header>
		);
	};

	return (
		<div className={s.mainWrapper}>
			{isMobile ? <MobileHeader /> : null}
			<div className={s.container}>
				{render ? (
					render
				) : (
					<div className={s.applicationName__wrapper}>
						<b className={s.applicationName}>Noteboard</b>
					</div>
				)}
			</div>
		</div>
	);
};
