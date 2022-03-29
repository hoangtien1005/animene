export const CHARACTER_HOME_DATA_QUERY = `
{
  birthday: Page(page: 1, perPage: 30) {
    characters(isBirthday: true) {
      id
      image {
        large
        medium
      }
      name {
        first
        middle
        last
        full
        native
        userPreferred
      }
      gender
      dateOfBirth {
        year
        month
        day
      }
      age
      bloodType
    }
  }
  mostFavorite: Page(page: 1, perPage: 30) {
    characters(sort: FAVOURITES_DESC) {
      id
      image {
        large
        medium
      }
      name {
        first
        middle
        last
        full
        native
        userPreferred
      }
      gender
      dateOfBirth {
        year
        month
        day
      }
      age
      bloodType
    }
  }
}
`

export const SEARCH_CHARACTERS_QUERY = `
query($search: String, $page: Int) {
  data: Page(page: $page, perPage: 50) {
    characters(search: $search) {
      id
      image {
        large
        medium
      }
      name {
        first
        middle
        last
        full
        native
        userPreferred
      }
      gender
      dateOfBirth {
        year
        month
        day
      }
      age
      bloodType
    }
  }
}
`
