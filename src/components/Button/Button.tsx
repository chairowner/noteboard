import classNames from "classnames";
import { FC } from "react";
import s from "./Button.module.scss";
import { IButton } from "./IButton";
import { useTheme } from "@/contexts/Theme/Theme.context";

export const Button: FC<IButton> = ({
	children,
	className,
	style,
	...props
}) => {
	return (
		<button
			className={classNames(className, s.button)}
			style={style}
			{...props}
		>
			{children}
			<div className={s.button__border}></div>
		</button>
	);
};
