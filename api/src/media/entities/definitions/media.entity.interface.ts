export interface IMedia {
	id?: string;
	name: string;
	type: string;
	content: Buffer;
	source_uri: string;
	created_at?: Date;
	submited_by?: string;
}