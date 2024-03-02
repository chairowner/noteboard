import { FC } from "react";
import s_loading from "../LoadingPage/LoadingPageBackground.module.scss";
import s_welcome from "./WelcomePage.module.scss";
import classNames from "classnames";

const appName: string = "Noteboard";
const author: string = "chairowner";

export const WelcomePage: FC = () => {
	return (
		<div className={s_loading.container}>
			<div className={classNames(s_loading.ellipse, s_loading.ellipse1)}></div>
			<div className={classNames(s_loading.ellipse, s_loading.ellipse3)}></div>
			<div className={classNames(s_loading.ellipse, s_loading.ellipse2)}></div>
			<div className={s_loading.backOverlay}></div>
			<div>
				<h1 className={classNames(s_welcome.text, s_welcome.app)}>{appName}</h1>
				<i className={classNames(s_welcome.text, s_welcome.author)}>
					by <b>{author}</b>
				</i>
			</div>
		</div>
	);
};
