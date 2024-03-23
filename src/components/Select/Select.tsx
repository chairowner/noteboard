import ReactSelect, { ClassNamesConfig } from "react-select";
import s from "./Select.module.scss";

export const Select: ReactSelect = (props) => {
	const classNames: ClassNamesConfig = {
		container: () => s.container,
		valueContainer: () => s.valueContainer,
		control: () => s.control,
		singleValue: () => s.singleValue,
		menu: () => s.menu,
		option: (option) => {
			if (option.isSelected) {
				return s.selectedOption;
			}

			return option.isFocused ? s.focusedOption : null;
		},
	};
	return <ReactSelect {...props} classNames={classNames} />;
};
