import { TypeTheme, ITheme } from "./Theme.model";
import { LightTheme } from "./configs/Theme.Light.config";
import { DarkTheme } from "./configs/Theme.Dark.config";

export const Themes: Record<TypeTheme, ITheme> = {
	light: LightTheme,
	dark: DarkTheme,
};
