import { MainMenu } from "@/components/MainMenu/MainMenu";
import { TypePageShort } from "@/types/TypePageShort";
import { FC, useEffect, useState } from "react";
import { v4 } from "uuid";

const _debugPagesList: TypePageShort[] = [
	{
		id: v4(),
		icon: "G",
		title: "first",
		opened: false,
	},
	{
		id: v4(),
		title: "second",
		opened: false,
		pages: [
			{
				id: v4(),
				title: "second-first",
				opened: false,
			},
		],
	},
	{
		id: v4(),
		title: "third",
		opened: false,
	},
];

const MainPage: FC = () => {
	const [pages, setPages] = useState<TypePageShort[]>([]);
	const [selectedPage, setSelectedPage] = useState<string | null>(null);

	useEffect(() => {
		setPages(_debugPagesList);
	}, []);

	const selectPage = (pageId: string | null): void => {
		if (pageId === selectedPage) return;
		setSelectedPage(pageId);
	};

	const toggleOpenPagesRecursively = (
		pages: TypePageShort[],
		pageId: string
	): TypePageShort[] => {
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

	const togglePageList = (pageId: string): void => {
		setPages((pages) => toggleOpenPagesRecursively(pages, pageId));
	};

	const mainMenuProps = {
		selectedPage,
		selectPage,
		togglePageList,
		pages,
	};

	return (
		<div style={{ position: "relative" }}>
			<MainMenu {...mainMenuProps} />
		</div>
	);
};
export default MainPage;
