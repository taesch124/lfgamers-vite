export enum IGDBReleaseDateField {
    UUID = 'uuid',
    ID = 'id',
    CATEGORY = 'category', // 0 = Release date, 1 = Alternative release date, 2 = Expected release date
    CREATED_AT = 'created_at',
    GAME = 'game', // Game ID
    HUMAN = 'human', // Human-readable date
    M = 'm', // Month
    Y = 'y', // Year
    PLATFORM = 'platform', // Platform ID
    REGION = 'region', // Region ID
    UPDATED_AT = 'updated_at',
    CHECKSUM = 'checksum',
    STATUS = 'status',
    DATE_FORMAT = 'date_format',
    RELEASE_REGION = 'release_region',
}

export type IGDBReleaseDateDTO = {
    [IGDBReleaseDateField.UUID]: string;
    [IGDBReleaseDateField.ID]: number;
    [IGDBReleaseDateField.CATEGORY]: number; // 0 = Release date, 1 = Alternative release date, 2 = Expected release date
    [IGDBReleaseDateField.CREATED_AT]: number;
    [IGDBReleaseDateField.GAME]: number; // Game ID    
    [IGDBReleaseDateField.HUMAN]: string; // Human-readable date
    [IGDBReleaseDateField.M]: number; // Month
    [IGDBReleaseDateField.Y]: number; // Year
    [IGDBReleaseDateField.PLATFORM]: number; // Platform ID
    [IGDBReleaseDateField.REGION]: number; // Region ID
    [IGDBReleaseDateField.UPDATED_AT]: number;
    [IGDBReleaseDateField.CHECKSUM]: string;
    [IGDBReleaseDateField.STATUS]: number;
    [IGDBReleaseDateField.DATE_FORMAT]: number;
    [IGDBReleaseDateField.RELEASE_REGION]: number;
};