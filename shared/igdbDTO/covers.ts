export enum IGDBCoverField {
    GAME = 'game',
    IMAGE_ID = 'image_id',
    URL = 'url',
    WIDTH = 'width',
    HEIGHT = 'height',
}

export type IGDBCoverDTO = {
    [IGDBCoverField.GAME]: string;
    [IGDBCoverField.IMAGE_ID]: string;
    [IGDBCoverField.URL]: string;
    [IGDBCoverField.WIDTH]: number;
    [IGDBCoverField.HEIGHT]: number;
}