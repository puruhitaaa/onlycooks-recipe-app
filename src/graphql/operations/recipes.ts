import gql from 'graphql-tag'

export const FETCH_RECIPES = gql`
  query fetchRecipes($limit: Int, $page: Int) {
    fetchRecipes(limit: $limit, page: $page) {
      id
      author {
        id
        avatar_url
        username
        fullName
      }
      name
      est_price
      cook_duration
      likes {
        id
        avatar_url
        username
      }
      stars {
        id
        avatar_url
        username
      }
      likeCount
      starCount
      meal_thumbnail
      recipe_tags
    }
  }
`

export const FETCH_RECIPE_BY_ID = gql`
  query fetchRecipeById($recipeId: ID) {
    fetchRecipeById(recipeId: $recipeId) {
      id
      author {
        id
        followers {
          id
        }
        avatar_url
        username
        followerCount
      }
      name
      est_price
      cook_duration
      cook_video
      ingredients {
        id
        name
        qty
        price
      }
      likes {
        id
        avatar_url
        username
      }
      stars {
        id
      }
      about
      steps
      likeCount
      starCount
      meal_thumbnail
      recipe_tags
    }
  }
`

export const LIKE_RECIPE = gql`
  mutation likeRecipe($recipeId: ID) {
    likeRecipe(recipeId: $recipeId) {
      id
      author {
        id
        avatar_url
        username
        fullName
      }
      name
      est_price
      cook_duration
      cook_video
      ingredients {
        name
        qty
        price
      }
      likeCount
      starCount
      meal_thumbnail
      recipe_tags
    }
  }
`

export const STAR_RECIPE = gql`
  mutation starRecipe($recipeId: ID) {
    starRecipe(recipeId: $recipeId) {
      id
      author {
        id
        avatar_url
        username
        fullName
      }
      name
      est_price
      cook_duration
      cook_video
      ingredients {
        name
        qty
        price
      }
      likeCount
      starCount
      meal_thumbnail
      recipe_tags
    }
  }
`

export const FETCH_RECIPE_LIKE_LIST = gql`
  query fetchRecipeById($recipeId: ID) {
    fetchRecipeById(recipeId: $recipeId) {
      id
      name
      meal_thumbnail
      likes {
        id
        avatar_url
        followerCount
        followingCount
        username
      }
      likeCount
    }
  }
`
