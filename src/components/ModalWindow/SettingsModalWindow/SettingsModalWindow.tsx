import { IModalWindow } from "@/interfaces/IModalWindow";
import { ModalWindow } from "../ModalWindow";
import { FC, useEffect, useState } from "react";
import { useTheme } from "@/contexts/Theme/Theme.context";
import { TypeTheme } from "@/contexts/Theme/Theme.model";
import { Select } from "@/components/Select/Select";

interface ISettingsModalWindow extends IModalWindow {}

interface OptionType {
	value: TypeTheme;
	label: string;
}

export const SettingsModalWindow: FC<ISettingsModalWindow> = ({
	style,
	closeModalWindow,
}) => {
	const options: OptionType[] = [
		{ value: "light", label: "Светлая" },
		{ value: "dark", label: "Тёмная" },
	];

	const { themeType, changeTheme, theme } = useTheme();

	const [selectedTheme, setSelectedTheme] = useState<OptionType>(null);

	const handleChange = (selectedTheme: OptionType) => {
		changeTheme(selectedTheme.value);
		setSelectedTheme(selectedTheme);
	};

	useEffect(() => {
		const listenerName: string = "keydown";

		const onKeyPress = (e: KeyboardEvent): void => {
			if (e.code === "Escape") {
				e.preventDefault();
				closeModalWindow();
			}
		};

		document.addEventListener(listenerName, onKeyPress);

		return () => {
			document.removeEventListener(listenerName, onKeyPress);
		};
	});

	useEffect(() => {
		setSelectedTheme(options.find((option) => option.value === themeType));
	}, [theme]);

	return (
		<ModalWindow style={style} closeModalWindow={closeModalWindow}>
			<p>Выбор темы</p>
			<Select value={selectedTheme} onChange={handleChange} options={options} />
		</ModalWindow>
	);
};
