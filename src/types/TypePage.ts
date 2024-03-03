export type TypePage = {
	id: string;
	create_date: Date;
	edit_date?: Date;
	title: string;
	icon?: string;
	body?: string;
	items?: TypePage[];
};
