import { FC } from "react";
import s from "./MainMenu.module.scss";
import classNames from "classnames";
import { TypeNoteType } from "@/types/TypeNoteType";
import { TypeMainMenuItem } from "@/types/TypeMainMenuItem";

interface IMainMenu {
	title: string;
	items: TypeMainMenuItem[];
	noteType: TypeNoteType;
	changeNoteType(): void;
}

export const MainMenu: FC<IMainMenu> = ({
	title,
	items,
	noteType,
	changeNoteType,
}) => {
	if (!items || !items.length) return "-";

	return (
		<div className={classNames(s.menu, s.textUpper)}>
			<div className={s.menu__wrapper}>
				<div className={s.container}>
					<div className={s.addition}></div>
					<div className={s.main}>
						<ul className={s.list}>
							{items.map((item) => {
								if (item.hidden) return false;
								return (
									<li
										key={item.command}
										className={classNames(s.cursorPointer)}
										onClick={() => changeNoteType()}
									>
										<span>{item.title}</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className={s.title}>{title}</div>
			</div>
		</div>
	);
};
