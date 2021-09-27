import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MediaListDto {
	@Expose()
	id: string;

	@Expose()
	name: string;

	@Expose()
	created_at: Date;
}
