import { FC } from "react";
import s_lb from "./LoadingPageBackground.module.sass";
import s_l from "./LoadingPage.module.sass";
import classNames from "classnames";

export const LoadingPage: FC = () => {
	return (
		<div className={classNames(s_lb.container, s_lb.centered)}>
			<div className={classNames(s_lb.ellipse, s_lb.ellipse1)}></div>
			<div className={classNames(s_lb.ellipse, s_lb.ellipse3)}></div>
			<div className={classNames(s_lb.ellipse, s_lb.ellipse2)}></div>
			<div className={s_lb.backOverlay}></div>
			<span className={s_l.loader}></span>
		</div>
	);
};
