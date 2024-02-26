import { FC, useState } from "react";
import s from "./Welcome.module.sass";
import classNames from "classnames";

const appName: string = "Noteboard";
const author: string = "chairowner";

export const Welcome: FC = () => {
	const [containerClassNames, setContainerClassNames] = useState<string[]>([
		s.container,
		s.default,
	]);
	return (
		<div className={classNames(containerClassNames)}>
			<div className={classNames(s.ellipse, s.ellipse1)}></div>
			<div className={classNames(s.ellipse, s.ellipse3)}></div>
			<div className={classNames(s.ellipse, s.ellipse2)}></div>
			<div className={s.backOverlay}></div>
			<div>
				<h1 className={classNames(s.text, s.app)}>{appName}</h1>
				<i className={classNames(s.text, s.author)}>
					by <b>{author}</b>
				</i>
			</div>
		</div>
	);
};
