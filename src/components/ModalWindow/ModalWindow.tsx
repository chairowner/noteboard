import { IModalWindow } from "@/interfaces/IModalWindow";
import { FC } from "react";
import s from "./ModalWindow.module.scss";

export const ModalWindow: FC<IModalWindow> = ({
	children,
	closeModalWindow,
	...props
}) => {
	return (
		<div className={s.container}>
			<div className={s.background}></div>
			<div className={s.modalWindow} {...props}>
				<div className={s.close} onClick={() => closeModalWindow()}></div>
				<div className={s.content}>{children}</div>
			</div>
		</div>
	);
};
