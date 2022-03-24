export const HOME_DATA_QUERY = `
    query($currentSeason: MediaSeason, $nextSeason: MediaSeason, $currentYear: Int, $nextSeasonYear: Int) {
        topScore: Page(page: 1, perPage: 10) {
            media(type: ANIME, sort: SCORE_DESC) {
              id
              coverImage {
                extraLarge
                large
                medium
                color
              }
              title {
                english
                romaji
                native
              }
              genres
              meanScore
              popularity
              format
              episodes
              season
              seasonYear
              status
            }
        }
        mostPopular: Page(page: 1, perPage: 6) {
            media(type: ANIME, sort: POPULARITY_DESC) {
              id
              coverImage {
                extraLarge
                large
                medium
                color
              }
              title {
                english
                romaji
                native
              }
              genres
              meanScore
              popularity
              format
              episodes
              season
              seasonYear
              status
            }
        }
        mostPopularThisSeason: Page(page: 1, perPage: 6) {
            media(type: ANIME, sort: POPULARITY_DESC, season: $currentSeason, seasonYear: $currentYear) {
              id
              coverImage {
                extraLarge
                large
                medium
                color
              }
              title {
                english
                romaji
                native
              }
              genres
              meanScore
              popularity
              format
              episodes
              season
              seasonYear
              status
            }
        }
        mostPopularNextSeason: Page(page: 1, perPage: 6) {
            media(type: ANIME, sort: POPULARITY_DESC, season: $nextSeason, seasonYear: $nextSeasonYear) {
              id
              coverImage {
                extraLarge
                large
                medium
                color
              }
              title {
                english
                romaji
                native
              }
              genres
              meanScore
              popularity
              format
              episodes
              season
              seasonYear
              status
            }
        }
        trendingNow: Page(page: 1, perPage: 6) {
            media(type: ANIME, sort: TRENDING_DESC) {
              id
              coverImage {
                extraLarge
                large
                medium
                color
              }
              title {
                english
                romaji
                native
              }
              genres
              meanScore
              popularity
              format
              episodes
              season
              seasonYear
              status
            }
        }
    }
`

const QUERY_VARIABLES =
  "$season: MediaSeason, $seasonYear: Int, $status: MediaStatus" +
  "$search: String, $sort: [MediaSort], $page: Int, " +
  "$genre_in: [String], $format_in: [MediaFormat]"

export const SEARCH_ANIMES_QUERY = `
    query(${QUERY_VARIABLES}) {
        data: Page(page: $page, perPage: 50) {
            media(type: ANIME, sort: $sort,
                season: $season, seasonYear: $seasonYear,
                search: $search, genre_in: $genre_in,
                format_in: $format_in, status: $status
            ) {
              id
              coverImage {
                extraLarge
                large
                medium
                color
              }
              title {
                english
                romaji
                native
              }
              genres
              meanScore
              popularity
              format
              description(asHtml: true)
              episodes
              season
              seasonYear
              status
            }
        }
    }
`
