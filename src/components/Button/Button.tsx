import classNames from "classnames";
import { FC } from "react";
import s from "./Button.module.scss";
import { IButton } from "./IButton";

export const Button: FC<IButton> = ({ children, className, ...props }) => {
	return (
		<button className={classNames(className, s.button)} {...props}>
			{children}
			<div className={s.button__border}></div>
		</button>
	);
};
