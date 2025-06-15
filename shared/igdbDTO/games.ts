import { IGDBGenreDTO } from "./genres";
import { IGDBPlatformDTO } from "./platforms";
import { IGDBReleaseDateDTO } from "./releaseDate";

export enum IGDBGameField {
    UUID = 'uuid',
    ID = 'id',
    AGGREGATED_RATING = 'aggregated_rating',
    COVER = 'cover',
    FIRST_RELEASE_DATE = 'first_release_date',
    GENRES = 'genres',
    NAME = 'name',
    PLATFORMS = 'platforms',
    RELEASE_DATES = 'release_dates',
    SUMMARY = 'summary',
    VERSION_PARENT = 'version_parent',
}

export type IGDBGameDTO = {
    [IGDBGameField.UUID]: string;
    [IGDBGameField.ID]: number;
    [IGDBGameField.AGGREGATED_RATING]: number;
    [IGDBGameField.COVER]: number;
    [IGDBGameField.FIRST_RELEASE_DATE]: number;
    [IGDBGameField.GENRES]: Array<IGDBGenreDTO>;
    [IGDBGameField.NAME]: string;
    [IGDBGameField.PLATFORMS]: Array<IGDBPlatformDTO>;
    [IGDBGameField.RELEASE_DATES]: Array<IGDBReleaseDateDTO>;
    [IGDBGameField.SUMMARY]: string;
    [IGDBGameField.VERSION_PARENT]: number | null; // Use null for no parent version
}