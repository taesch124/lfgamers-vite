export enum IGDBGenreField {
    UUID = 'uuid',
    ID = 'id',
    NAME = 'name',
    SLUG = 'slug',
    URL = 'url',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updated_at',
    CHECKSUM = 'checksum',
}

export type IGDBGenreDTO = {
    [IGDBGenreField.UUID]: string;
    [IGDBGenreField.ID]: number;
    [IGDBGenreField.NAME]: string;
    [IGDBGenreField.SLUG]: string;
    [IGDBGenreField.URL]: string;
    [IGDBGenreField.CREATED_AT]: number;
    [IGDBGenreField.UPDATED_AT]: number;
    [IGDBGenreField.CHECKSUM]: string;
}