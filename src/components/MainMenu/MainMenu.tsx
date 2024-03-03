import { TypePageShort } from "@/types/TypePageShort";
import { FC } from "react";
import s from "./MainMenu.module.scss";
import cns from "classnames";
import classNames from "classnames";

interface IMainMenu {
	user?: string;
	selectedPage?: string;
	pages: TypePageShort[];
	selectPage(pageId: string): void;
	togglePageList(pageId: string): void;
}

type TypeMainMenuInfoItem = {
	id: number;
	icon?: string;
	title: string;
};

const mainMenuInfoList: TypeMainMenuInfoItem[] = [
	{
		id: 0,
		title: "Параметры",
	},
	{
		id: 1,
		icon: "[+]",
		title: "Новая страница",
	},
];

export const MainMenu: FC<IMainMenu> = ({
	user,
	pages,
	selectedPage,
	selectPage,
	togglePageList,
}) => {
	let render: JSX.Element = null;
	let render_userBlock: JSX.Element = null;
	let render_pages: JSX.Element = null;
	let render_pagesBlock: JSX.Element = null;
	let render_infoBlock: JSX.Element = null;

	if (typeof user !== "undefined") {
		render_userBlock = (
			<div>
				<b>^</b>
				<b>{user}</b>
			</div>
		);
	}

	if (typeof pages !== "undefined" && pages.length > 0) {
		const getPages = (pages: TypePageShort[]): JSX.Element => {
			return (
				<>
					{pages.map((item) => {
						const selected: boolean = item.id === selectedPage;

						let insidePagesItemClasses = [s.list, s.pages];
						let itemClasses = [s.item];
						let rightArrowClasses = [s.rightArrow];

						if (selected) {
							itemClasses.push(s.selected);
						}

						if (item.opened) {
							rightArrowClasses.push(s.opened);
						} else {
							insidePagesItemClasses.push(s.hidden);
						}

						return (
							<div key={item.id}>
								<div
									className={cns(itemClasses)}
									onClick={() => selectPage(selected ? null : item.id)}
								>
									<div
										className={s.rightArrow__wrapper}
										onClick={() => togglePageList(item.id)}
									>
										<b className={cns(rightArrowClasses)}></b>
									</div>

									{item?.icon ? <div>{item?.icon}</div> : null}

									<div>{item.title}</div>
								</div>

								<div className={cns(insidePagesItemClasses)}>
									{item?.pages && item?.pages?.length > 0 ? (
										getPages(item.pages)
									) : (
										<div className={s.item}>Внутри нет страниц</div>
									)}
								</div>
							</div>
						);
					})}
				</>
			);
		};
		render_pages = (
			<div className={cns(s.list, s.pages, s.firstItem)}>{getPages(pages)}</div>
		);
	}

	render_pagesBlock = (
		<div className={classNames(s.list, s.pagesBlock)}>
			<b className={s.title}>Страницы</b>
			{render_pages}
		</div>
	);

	render_infoBlock = (
		<div className={s.list}>
			{mainMenuInfoList.map((item) => (
				<div key={item.id} className={s.item}>
					{item?.icon ? <div>{item?.icon}</div> : null}
					<div>{item.title}</div>
				</div>
			))}
		</div>
	);

	render = (
		<div className={cns(s.container, s.list)}>
			{render_userBlock}
			{render_infoBlock}
			{render_pagesBlock}
		</div>
	);

	return render;
};
