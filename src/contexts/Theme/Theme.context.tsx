import { FC, createContext, useContext, useState } from "react";
import { ITheme, TypeTheme } from "./Theme.model";
import { Themes } from "./Theme.config";

interface ThemeContextProps {
	themeType: TypeTheme;
	theme: ITheme;
	changeTheme(theme: TypeTheme): void;
}

const localStorageKey = "theme";

const detectTheme = (): TypeTheme => {
	let theme: TypeTheme = localStorage.getItem(localStorageKey) as TypeTheme;
	if (!theme) {
		theme =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
	}
	return theme;
};

const _defaultTheme: TypeTheme = detectTheme();

export const ThemeContext = createContext<ThemeContextProps>({
	themeType: _defaultTheme,
	theme: Themes[_defaultTheme],
} as ThemeContextProps);

export const ThemeProvider: FC<any> = ({ children }) => {
	const [currentTheme, setCurrentTheme] = useState<TypeTheme>(_defaultTheme);

	const changeTheme = (theme: TypeTheme): void => {
		setCurrentTheme(theme);
		localStorage.setItem(localStorageKey, theme);
	};

	return (
		<ThemeContext.Provider
			value={{
				themeType: currentTheme,
				theme: Themes[currentTheme],
				changeTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
