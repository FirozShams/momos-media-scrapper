import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class MediaListDto {
	@Expose()
	id: string;

	@Expose()
	name: string;

	@Expose()
	@Transform(({ value }) => value.split('/')[0])
	type: string;

	@Expose()
	created_at: Date;
}
