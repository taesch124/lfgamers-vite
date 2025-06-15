export enum IGDBPlatformField {
    UUID = 'uuid',
    ID = 'id',
    ABBREVIATION = 'abbreviation',
    ALTERNATIVE_NAME = 'alternative_name',
    CATEGORY = 'category',
    CREATED_AT = 'created_at',
    GENERATION = 'generation',
    NAME = 'name',
    PLATFORM_LOGO = 'platform_logo',
    PLATFORM_FAMILY = 'platform_family',
    PLATFORM_TYPE = 'platform_type',
    SLUG = 'slug',
    UPDATED_AT = 'updated_at',
    URL = 'url',
    VERSIONS = 'versions',
    WEBSITES = 'websites',
    CHECKSUM = 'checksum',
}

export type IGDBPlatformDTO = {
    [IGDBPlatformField.UUID]: string;
    [IGDBPlatformField.ID]: number;
    [IGDBPlatformField.ABBREVIATION]: string;
    [IGDBPlatformField.ALTERNATIVE_NAME]: string;
    [IGDBPlatformField.CATEGORY]: number;
    [IGDBPlatformField.CREATED_AT]: number;
    [IGDBPlatformField.GENERATION]: number;
    [IGDBPlatformField.NAME]: string;
    [IGDBPlatformField.PLATFORM_LOGO]: number;
    [IGDBPlatformField.PLATFORM_FAMILY]: number;
    [IGDBPlatformField.PLATFORM_TYPE]: number;
    [IGDBPlatformField.SLUG]: string;
    [IGDBPlatformField.UPDATED_AT]: number;
    [IGDBPlatformField.URL]: string;
    [IGDBPlatformField.VERSIONS]: Array<number>;
    [IGDBPlatformField.WEBSITES]: Array<number>;
    [IGDBPlatformField.CHECKSUM]: string;
}