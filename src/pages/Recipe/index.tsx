import { useMutation, useQuery } from '@apollo/client'
import _ from 'lodash'
import { useState } from 'react'
import {
  HiHeart,
  HiOutlineHeart,
  HiOutlineStar,
  HiRefresh,
  HiStar,
} from 'react-icons/hi'
import ReactPlayer from 'react-player'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Breadcrumbs, Alert } from '../../components'
import {
  FETCH_RECIPE_BY_ID,
  LIKE_RECIPE,
  STAR_RECIPE,
} from '../../graphql/operations/recipes'
import { FOLLOW_USER } from '../../graphql/operations/user'
import { useAuth } from '../../hooks/useAuth'
import { useRecipe } from '../../hooks/useRecipe'
import { Ingredient } from '../../types/recipe'
import { IUser } from '../../types/user'

const Recipe = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isStarred, setIsStarred] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const navigate = useNavigate()

  const { id } = useParams()
  const {
    user,
    errorMsg,
    isError: isUserError,
    setError: setUserError,
  } = useAuth((state) => ({
    user: state.user,
    errorMsg: state.errorMsg,
    isError: state.isError,
    setError: state.setError,
  }))
  const { isError, error, setError } = useRecipe((state) => ({
    isError: state.isError,
    error: state.error,
    setError: state.setError,
  }))

  const {
    loading,
    data: queryData,
    error: fetchRecipeError,
  } = useQuery(FETCH_RECIPE_BY_ID, {
    onCompleted(result) {
      setIsLiked(
        result.fetchRecipeById.likes.some(
          (likingUser: IUser) => likingUser.id === user?.id
        )
      )
      setIsStarred(
        result.fetchRecipeById.stars.some(
          (starringUser: IUser) => starringUser.id === user?.id
        )
      )
      setIsFollowing(
        result.fetchRecipeById.author.followers.some(
          (followingUser: IUser) => followingUser.id === user?.id
        )
      )
    },
    variables: { recipeId: id },
  })

  const [likeRecipe] = useMutation(LIKE_RECIPE, {
    onCompleted() {
      setIsLiked(!isLiked)
    },
    onError(error: any) {
      setError(error.message)
    },
    variables: { recipeId: id },
  })

  const [starRecipe] = useMutation(STAR_RECIPE, {
    onCompleted() {
      setIsStarred(!isStarred)
    },
    onError(error: any) {
      setError(error.message)
    },
    variables: { recipeId: id },
  })

  const [followUser] = useMutation(FOLLOW_USER, {
    onCompleted() {
      setIsFollowing(true)
    },
    onError(error: any) {
      setUserError(error.message)
    },
    variables: { userId: queryData?.fetchRecipeById.author.id },
  })

  const handleFollow = () => {
    if (!_.isEmpty(user)) {
      followUser()
      setTimeout(() => setIsFollowing(!isFollowing), 1000)
    } else {
      navigate('/login')
    }
  }

  if (fetchRecipeError) navigate('/notfound', { replace: true })

  return !loading ? (
    <>
      <section className='max-w-7xl mx-auto px-10 md:px-5'>
        <Breadcrumbs />
      </section>

      {isError && <Alert msg={error} />}
      {isUserError && <Alert msg={errorMsg} />}

      <section className='flex flex-col items-center p-5 space-y-5 mx-auto mt-10 max-w-7xl'>
        <h1 className='text-2xl text-center md:text-left font-semibold'>
          {queryData.fetchRecipeById.name}
        </h1>
        <div className='relative px-5 w-full'>
          <ReactPlayer
            width='100%'
            controls
            url={queryData.fetchRecipeById.cook_video}
          />

          {!_.isEmpty(user) && (
            <div className='flex items-center space-x-3 absolute p-2.5 right-5'>
              {!isStarred ? (
                <HiOutlineStar
                  className='cursor-pointer'
                  size={30}
                  onClick={() => starRecipe()}
                />
              ) : (
                <HiStar
                  className='cursor-pointer'
                  size={30}
                  onClick={() => starRecipe()}
                />
              )}

              {!isLiked ? (
                <HiOutlineHeart
                  className='cursor-pointer'
                  size={30}
                  onClick={() => likeRecipe()}
                />
              ) : (
                <HiHeart
                  className='cursor-pointer'
                  size={30}
                  onClick={() => likeRecipe()}
                />
              )}
            </div>
          )}
        </div>

        <div className='flex space-x-5 p-2.5'>
          <div className='flex flex-col space-y-1.5 items-center'>
            <Link to={`/profile/${queryData.fetchRecipeById.author.username}`}>
              <img
                className='w-10 h-10 rounded-full object-cover'
                src={queryData.fetchRecipeById.author.avatar_url}
                alt={queryData.fetchRecipeById.author.username}
              />
            </Link>

            {!_.isEmpty(user) &&
              user?.id !== queryData.fetchRecipeById.author.id && (
                <button
                  className={`btn btn-xs px-2 h-[1rem] ${
                    isFollowing
                      ? 'bg-red-700 text-slate-50 hover:text-inherit'
                      : 'bg-base-200'
                  }`}
                  onClick={handleFollow}
                >
                  {!isFollowing ? 'Follow' : 'Unfollow'}
                </button>
              )}

            {_.isEmpty(user) && (
              <Link
                className='btn btn-sm bg-base-200 mb-2.5 px-2 h-[1rem]'
                to={{
                  pathname: '/login',
                  search: `?redirect=profile/${queryData.fetchRecipeById.author.username}`,
                }}
              >
                Follow
              </Link>
            )}
          </div>

          <div className='flex flex-col'>
            <h3 className='font-semibold text-lg'>
              {queryData.fetchRecipeById.author.username}
            </h3>
            <p className='text-sm mb-2'>
              {queryData.fetchRecipeById.author.followerCount} followers
            </p>
          </div>
        </div>

        <div className='stats stats-vertical md:stats-horizontal'>
          <div className='stat'>
            <div className='stat-title'>Price</div>
            <div className='stat-value'>
              ${queryData.fetchRecipeById.est_price}
            </div>
          </div>

          <div className='stat'>
            <div className='stat-title'>Stars</div>
            <div className='stat-value'>
              {queryData.fetchRecipeById.starCount}
            </div>
          </div>

          <div
            className='stat cursor-pointer'
            onClick={() => navigate('likes')}
          >
            <div className='stat-title'>Likes</div>
            <div className='stat-value'>
              {queryData.fetchRecipeById.likeCount}
            </div>
          </div>
        </div>

        <div className='flex justify-start sm:justify-center w-full py-5 space-x-5 overflow-x-scroll scrollbar-hide sm:overflow-hidden'>
          {queryData.fetchRecipeById.recipe_tags.length > 0 &&
            queryData.fetchRecipeById.recipe_tags.map((tag: string) => (
              <div key={tag} className='badge badge-ghost'>
                {tag}
              </div>
            ))}
        </div>

        {!_.isEmpty(queryData.fetchRecipeById.about) && (
          <div
            tabIndex={0}
            className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-full max-w-lg'
          >
            <div className='collapse-title text-xl font-medium'>About</div>
            <div className='collapse-content'>
              <p>{queryData.fetchRecipeById.about}</p>
            </div>
          </div>
        )}

        <div
          tabIndex={1}
          className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-full max-w-lg'
        >
          <div className='collapse-title text-xl font-medium'>Ingredients</div>
          <div className='collapse-content'>
            <ul className='menu menu-compact lg:menu-normal bg-base-100 p-2 rounded-box'>
              {queryData.fetchRecipeById.ingredients.map(
                (ingredient: Ingredient) => (
                  <li className='relative' key={ingredient.id}>
                    <p>{ingredient.name}</p>
                    <p className='absolute focus:text-gray-800 right-0 text-slate-400'>
                      {ingredient.qty}
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {!_.isEmpty(queryData.fetchRecipeById.steps) && (
          <div
            tabIndex={2}
            className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box w-full max-w-lg'
          >
            <div className='collapse-title text-xl font-medium'>Steps</div>
            <div className='collapse-content'>
              <ul className='steps w-full overflow-x-scroll scrollbar-hide'>
                {queryData.fetchRecipeById.steps.map((step: string) => (
                  <li key={step} className='step step-primary w-52 !text-left'>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </>
  ) : (
    <HiRefresh size={30} className='animate-spin my-10 mx-auto block' />
  )
}

export default Recipe
