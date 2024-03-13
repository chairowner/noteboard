import { MainMenu } from "@/components/MainMenu/MainMenu";
import { TypePage } from "@/types/TypePage";
import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";
import s from "./MainPage.module.scss";
import { Viewer } from "@/components/Viewer/Viewer";
import { IMainMenu } from "@/interfaces/IMainMenu";
import { IViewer } from "@/interfaces/IViewer";

const _debugPagesList: TypePage[] = [
	{
		id: v4(),
		create_date: new Date(),
		icon: "G",
		title: "first",
		body: "- [ ] Hello!",
		opened: false,
	},
	{
		id: v4(),
		create_date: new Date(),
		title: "second",
		body: "# fdsfsdf",
		opened: false,
		pages: [
			{
				id: v4(),
				create_date: new Date(),
				title: "second-first",
				body: "# Marked in Node.js\n\nRendered by **marked**.",
				opened: false,
			},
		],
	},
	{
		id: v4(),
		create_date: new Date(),
		title: "third",
		body: "",
		opened: false,
	},
];

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

const MainPage: FC = () => {
	const [pages, setPages] = useState<TypePage[]>([]);
	const [selectedPage, setSelectedPage] = useState<TypePage>(null);
	const [editMode, setEditMode] = useState<boolean>(false);

	const selectPage = (pageId: string | null): void => {
		if (!pageId) {
			setSelectedPage(null);
			return;
		}
		setSelectedPage(findPageRecursively(pages, pageId));
	};

	const togglePageList = (pageId: string): void => {
		setPages((pages) => toggleOpenPagesRecursively(pages, pageId));
	};

	const mainMenuProps: IMainMenu = {
		selectedPage,
		selectPage,
		togglePageList,
		pages,
	};

	const viewerProps: IViewer = {
		page: selectedPage,
		editMode,
	};

	useEffect(() => {
		setPages(_debugPagesList);
	}, []);

	return (
		<div className={s.container}>
			<MainMenu {...mainMenuProps} />
			<Viewer {...viewerProps} />
		</div>
	);
};

export default MainPage;
