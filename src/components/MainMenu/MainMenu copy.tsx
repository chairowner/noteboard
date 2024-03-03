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
						let pageClass = [s.page];
						let childPagesListClass = [s.pages];
						let rightArrowClass = [s.rightArrow];

						if (selected) {
							pageClass.push(s.selected);
						}

						if (item.opened) {
							rightArrowClass.push(s.opened);
							childPagesListClass.push(s.opened);
						}

						return (
							<li key={item.id}>
								<div
									className={cns(pageClass)}
									onClick={() => selectPage(selected ? null : item.id)}
								>
									<div
										className={s.rightArrow__wrapper}
										onClick={() => togglePageList(item.id)}
									>
										<b className={cns(rightArrowClass)}></b>
									</div>

									{item?.icon ? <div>{item?.icon}</div> : null}

									<div>{item.title}</div>
								</div>

								<ul className={cns(childPagesListClass)}>
									{item?.pages && item?.pages?.length > 0
										? getPages(item.pages)
										: "Внутри нет страниц"}
								</ul>
							</li>
						);
					})}
				</>
			);
		};
		render_pages = <ul className={s.pages}>{getPages(pages)}</ul>;
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
