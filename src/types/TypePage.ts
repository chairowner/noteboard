export type TypePage = {
	id: string;
	create_date: Date;
	edit_date?: Date;
	icon?: string;
	title: string;
	body: string;
	pages?: TypePage[];
	opened: boolean;
};
