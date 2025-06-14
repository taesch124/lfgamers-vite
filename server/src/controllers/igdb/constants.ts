/* eslint-disable sort-keys */
const DEFAULT_BACKWARD_TIME_WIND = 3, // INFO: months
igdbGameFieldList = [
    'name',
    'release_dates.*',
    'first_release_date',
    'summary',
    'aggregated_rating',
    'genres.*',
    'platforms.*',
    'cover',
],
igdbGenres = {
    9: 'Puzzle',
    16: 'Turn-based strategy',
    5: 'Shooter',
    30: 'Pinball',
    10: 'Racing',
    31: 'Adventure',
    14: 'Sport',
    26: 'Quiz/Trivia',
    12: 'Role-playing Game',
    24: 'Tactical',
    2: 'Point-and-click',
    13: 'Simulator',
    8: 'Platformer',
    32: 'Indie',
    11: 'Real Time Strategy',
    4: 'Fighting',
    7: 'Music',
    15: 'Strategy',
    25: 'Hack and slash/Beat \'em up',
    33: 'Arcade',
}, igdbPlatforms = {
    166: 'Pokemon mini',
    7: 'Playstation',
    8: 'Playstation 2',
    9: 'PlayStation 3',
    48: 'Playstation 4',
    11: 'Xbox',
    12: 'Xbox 360',
    49: 'Xbox One',
    25: 'Amstrad CPC',
    30: 'Sega 32X',
    47: 'Virtual',
    6: 'PC (Windows)',
};

export {
    DEFAULT_BACKWARD_TIME_WIND,
    igdbGameFieldList,
    igdbGenres,
    igdbPlatforms,
};