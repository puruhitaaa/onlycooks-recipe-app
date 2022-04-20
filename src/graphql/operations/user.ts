import gql from 'graphql-tag'

export const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        username: $username
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      token
      createdAt
      isPrivate
    }
  }
`

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    loginUser(input: { username: $username, password: $password }) {
      id
      username
      token
      createdAt
      isPrivate
    }
  }
`

export const FETCH_USER_BY_USERNAME = gql`
  query fetchUserByUsername($username: String!) {
    fetchUserByUsername(username: $username) {
      id
      avatar_url
      description
      fullName
      email
      username
      gender
      followers {
        id
      }
      socials {
        name
        social_handle
        social_url
      }
      recipes {
        id
        name
        est_price
        cook_duration
        cook_video
        meal_thumbnail
        recipe_tags
      }
      liked_recipes {
        id
        name
        est_price
        cook_duration
        cook_video
        meal_thumbnail
        recipe_tags
      }
      likedRecipeCount
      recipeCount
      followerCount
      followingCount
      isPrivate
      createdAt
    }
  }
`

export const FETCH_FOLLOWERS_BY_USERNAME = gql`
  query fetchUserByUsername($username: String!) {
    fetchUserByUsername(username: $username) {
      id
      avatar_url
      username
      followerCount
      followers {
        id
        avatar_url
        username
        followingCount
        followerCount
      }
    }
  }
`

export const FETCH_FOLLOWINGS_BY_USERNAME = gql`
  query fetchUserByUsername($username: String!) {
    fetchUserByUsername(username: $username) {
      id
      avatar_url
      username
      followingCount
      followings {
        id
        avatar_url
        username
        followingCount
        followerCount
      }
    }
  }
`

export const FOLLOW_USER = gql`
  mutation followUser($userId: ID) {
    followUser(userId: $userId) {
      id
      username
      token
      followerCount
      isPrivate
      createdAt
    }
  }
`
