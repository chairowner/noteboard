import { FC } from "react";
import s from "./MainMenu.module.sass";
import classNames from "classnames";

const mainMenuTitle = "Выбранная позиция";
const menuItems: string[] = [
	"Добавить группу",
	"Добавить заметку",
	"Сменить режим",
	"Параметры",
];

export const MainMenu: FC = () => {
	return (
		<div className={classNames(s.menu, s.textUpper)}>
			<div className={s.menu__wrapper}>
				<div className={s.container}>
					<div className={s.addition}></div>
					<div className={s.main}>
						<ul className={s.list}>
							{menuItems.map((item, index) => (
								<li key={index} className={classNames(s.cursorPointer)}>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className={s.title}>{mainMenuTitle}</div>
			</div>
		</div>
	);
};
