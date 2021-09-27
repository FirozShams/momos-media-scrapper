export interface IMedia {
	id?: string;
	name: string;
	type: string;
	content: number;
	source_uri: string;
	created_at: Date;
	submited_by?: string;
}