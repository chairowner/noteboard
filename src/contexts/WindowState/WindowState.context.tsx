import {
	CSSProperties,
	FC,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { IWindowState } from "./WindowState.model";

const detectMobile = (): boolean => {
	return window.innerWidth <= 768;
};

const _defaultIsMobile = detectMobile();

export const WindowStateContext = createContext<IWindowState>({
	isMobile: _defaultIsMobile,
} as IWindowState);

export const WindowStateProvider: FC<any> = ({ children }) => {
	const listener: string = "resize";
	const [isMobile, setIsMobile] = useState<boolean>(_defaultIsMobile);

	const onResize = () => {
		setIsMobile(detectMobile());
	};

	useEffect(() => {
		window.addEventListener(listener, onResize);
		return () => {
			window.removeEventListener(listener, onResize);
		};
	}, []);

	return (
		<WindowStateContext.Provider
			value={{
				isMobile,
			}}
		>
			{children}
		</WindowStateContext.Provider>
	);
};

export const useWindowState = (): IWindowState =>
	useContext(WindowStateContext);
