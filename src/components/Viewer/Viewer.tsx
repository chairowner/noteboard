import { IViewer } from "@/interfaces/IViewer";
import { FC, useEffect, useState } from "react";
import s from "./Viewer.module.scss";
import { View } from "./View/View";
import { Edit } from "./Edit/Edit";
import { Button } from "../Button/Button";

const RenderButtonsBlock: FC<{ editMode: boolean }> = ({ editMode }) => (
	<div className={s.buttons}>
		{editMode ? (
			<>
				<Button>Сохранить</Button>
				<Button>Отмена</Button>
			</>
		) : (
			<>
				<Button onClick={() => console.log("onClick", "Редактировать")}>
					Редактировать
				</Button>
			</>
		)}
	</div>
);
const RenderDataBlock: FC<IViewer> = (props) => (
	<div className={s.render}>
		{props?.editMode ? <Edit {...props} /> : <View {...props} />}
	</div>
);

export const Viewer: FC<IViewer> = (props) => {
	const [render, setRender] = useState<JSX.Element>(null);

	useEffect(() => {
		if (props?.page === null) {
			setRender(null);
			return;
		}

		setRender(
			<>
				<RenderButtonsBlock editMode={props.editMode} />
				<RenderDataBlock {...props} />
			</>
		);
	}, [props?.page, props.editMode]);

	return <div className={s.container}>{render}</div>;
};
