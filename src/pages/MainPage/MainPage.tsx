import { MainMenu } from "@/components/MainMenu/MainMenu";
import { TypePage } from "@/types/TypePage";
import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
import s from "./MainPage.module.scss";
import { Viewer } from "@/components/Viewer/Viewer";
import { IMainMenu } from "@/interfaces/IMainMenu";
import { IViewer } from "@/interfaces/IViewer";
import { SettingsModalWindow } from "@/components/ModalWindow/SettingsModalWindow/SettingsModalWindow";

const localStoragePagesKey = "pages";

const toggleOpenPagesRecursively = (
	pages: TypePage[],
	pageId: string
): TypePage[] => {
	return pages.map((page) => {
		if (page.id === pageId) {
			return { ...page, opened: !page.opened };
		}

		if (page && page?.pages && page?.pages?.length > 0) {
			return {
				...page,
				pages: toggleOpenPagesRecursively(page?.pages, pageId),
			};
		}

		return page;
	});
};

const findPageRecursively = (pages: TypePage[], pageId: string): TypePage => {
	if (!pages || pages?.length === 0) {
		return null;
	}
	for (const page of pages) {
		if (page.id === pageId) {
			return page;
		}
		if (page?.pages && page?.pages.length > 0) {
			const foundPage = findPageRecursively(page.pages, pageId);
			if (foundPage) return foundPage;
		}
	}
	return null;
};

const updatePageBodyRecursively = (
	pages: TypePage[],
	pageId: string,
	body: string,
	title: string
): TypePage[] => {
	return pages.map((page) => {
		if (page.id === pageId) {
			return { ...page, body, title };
		}
		if (page?.pages && page?.pages?.length > 0) {
			return {
				...page,
				pages: updatePageBodyRecursively(page?.pages, pageId, body, title),
			};
		}
		return { ...page };
	});
};

const createNewPageRecursively = (
	pages: TypePage[],
	newPage: TypePage,
	selectedPageId: string | null
): TypePage[] => {
	if (!selectedPageId) {
		return [newPage, ...pages];
	}
	return pages.map((page) => {
		if (page.id === selectedPageId) {
			return {
				...page,
				pages:
					page?.pages && page?.pages?.length > 0
						? [newPage, ...page.pages]
						: [newPage],
			};
		}
		if (page?.pages && page?.pages?.length > 0) {
			return {
				...page,
				pages: createNewPageRecursively(page.pages, newPage, selectedPageId),
			};
		}
		return { ...page };
	});
};

const deletePageRecursively = (
	pages: TypePage[],
	selectedPageId: string | null
): TypePage[] => {
	if (!selectedPageId) return pages;
	return pages.filter((page) => {
		if (page.id === selectedPageId) {
			return false;
		} else {
			if (page?.pages && page?.pages?.length > 0) {
				page.pages = deletePageRecursively(page.pages, selectedPageId);
			}
			return true;
		}
	});
};

const getPagesFromLocalStorage = (): TypePage[] => {
	try {
		return JSON.parse(localStorage.getItem(localStoragePagesKey)) || [];
	} catch (error) {
		console.error("getPagesFromLocalStorage", error);
		return [];
	}
};

const setPagesToLocalStorage = (pages: TypePage[]): void => {
	try {
		localStorage.setItem(localStoragePagesKey, JSON.stringify(pages));
	} catch (error) {
		console.error("setPagesToLocalStorage", error);
	}
};

const MainPage: FC = () => {
	const [pages, setPages] = useState<TypePage[]>(getPagesFromLocalStorage());
	const [selectedPage, setSelectedPage] = useState<TypePage>(null);
	const [editMode, setEditMode] = useState<boolean>(false);
	const [showGlobalSettings, setShowGlobalSettings] = useState<boolean>(false);

	const selectPage = (pageId: string | null): void => {
		setSelectedPage(pageId ? findPageRecursively(pages, pageId) : null);
	};

	const togglePageList = (pageId: string): void => {
		setPages((pages) => toggleOpenPagesRecursively(pages, pageId));
	};

	const toggleEditMode = (): void => {
		setEditMode((editMode) => !editMode);
	};

	const removePage = (): void => {
		if (!selectedPage) return;
		setPages((pages) => deletePageRecursively(pages, selectedPage.id));
		selectPage(null);
	};

	const savePageBody = (body: string, title: string): void => {
		if (!selectedPage) {
			return;
		}
		setPages((pages) =>
			updatePageBodyRecursively(pages, selectedPage.id, body, title)
		);
		toggleEditMode();
	};

	const toggleGlobalSettings = (): void => {
		setShowGlobalSettings((show) => !show);
	};

	const createNewPage = (): void => {
		if (editMode) return;
		const newPage: TypePage = {
			id: v4(),
			create_date: new Date(),
			edit_date: null,
			icon: null,
			title: "Пустая страница",
			body: "",
			pages: null,
			opened: false,
		};
		setPages((pages) =>
			createNewPageRecursively(pages, newPage, selectedPage?.id)
		);
		// selectPage(newPage.id);
	};

	const mainMenuProps: IMainMenu = {
		selectedPage,
		selectPage,
		togglePageList,
		pages,
	};

	const viewerProps: IViewer = {
		toggleEditMode,
		savePageBody,
		selectPage,
		removePage,
		page: selectedPage,
		editMode,
	};

	useEffect(() => {
		viewerProps.page = selectedPage;
	}, [selectedPage]);

	useEffect(() => {
		setPagesToLocalStorage(pages);
	}, [pages]);

	return (
		<div className={s.container}>
			<MainMenu
				{...mainMenuProps}
				toggleGlobalSettings={toggleGlobalSettings}
				createNewPage={createNewPage}
			/>
			<Viewer {...viewerProps} />

			{showGlobalSettings ? (
				<SettingsModalWindow
					closeModalWindow={toggleGlobalSettings}
				></SettingsModalWindow>
			) : null}
		</div>
	);
};

export default MainPage;
