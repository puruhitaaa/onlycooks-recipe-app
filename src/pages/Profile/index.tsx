import { useMutation, useQuery } from '@apollo/client'
import { HiRefresh } from 'react-icons/hi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import _ from 'lodash'
import {
  Alert,
  Avatar,
  Breadcrumbs,
  Carousel,
  SocialItem,
  Stat,
} from '../../components'
import {
  FETCH_USER_BY_USERNAME,
  FOLLOW_USER,
} from '../../graphql/operations/user'
import { IUser, Social } from '../../types/user'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

const Profile = () => {
  const navigate = useNavigate()
  const username = useParams()

  const [isFollowing, setIsFollowing] = useState(false)

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
  const { loading, data, error } = useQuery(FETCH_USER_BY_USERNAME, {
    onCompleted(result) {
      setIsFollowing(
        result.fetchUserByUsername.followers.some(
          (followingUser: IUser) => followingUser.id === user?.id
        )
      )
    },
    variables: username,
  })
  const [followUser, { loading: loadingFollow }] = useMutation(FOLLOW_USER, {
    onCompleted() {
      setIsFollowing(!isFollowing)
    },
    onError(error: any) {
      setUserError(error.message)
    },
    variables: { userId: data?.fetchUserByUsername?.id },
  })

  const handleFollow = () => {
    followUser()
    setTimeout(() => setIsFollowing(!isFollowing), 1000)
  }

  if (error) navigate('/notfound', { replace: true })

  return !loading ? (
    <>
      <section className='max-w-7xl mx-auto px-10 md:px-5'>
        <Breadcrumbs />
      </section>

      {isUserError && <Alert msg={errorMsg} />}

      <section className='flex flex-col p-5 items-center space-y-5 mx-auto my-10 max-w-7xl'>
        <Avatar url={data.fetchUserByUsername.avatar_url} />

        <div className='flex flex-col items-center'>
          <h2 className='text-2xl mb-1.5 font-semibold'>
            {data.fetchUserByUsername.fullName}
          </h2>

          {_.isEmpty(user) && (
            <Link
              className='btn btn-sm bg-base-200 mb-2.5 px-2 h-[1rem]'
              to={{
                pathname: '/login',
                search: `?redirect=profile/${data.fetchUserByUsername.username}`,
              }}
            >
              Follow
            </Link>
          )}

          {!_.isEmpty(user) && user?.id !== data.fetchUserByUsername.id && (
            <button
              className={`btn btn-sm mb-2.5 px-2 h-[1rem] ${
                isFollowing
                  ? 'bg-red-700 text-slate-50 hover:text-inherit'
                  : 'bg-base-200'
              }`}
              onClick={handleFollow}
            >
              {!isFollowing ? 'Follow' : 'Unfollow'}
            </button>
          )}

          {data.fetchUserByUsername.description && (
            <p>{data.fetchUserByUsername.description}</p>
          )}
          <div className='space-x-5 flex items-center'>
            {!_.isEmpty(data.fetchUserByUsername.socials) &&
              data.fetchUserByUsername.socials.map((social: Social) => (
                <SocialItem name={social.name} />
              ))}
          </div>
        </div>

        <Stat
          follower_count={data.fetchUserByUsername.followerCount}
          following_count={data.fetchUserByUsername.followingCount}
          recipe_count={data.fetchUserByUsername.recipeCount}
        />

        {!_.isEmpty(data.fetchUserByUsername.recipes) && (
          <div className='space-y-5 px-5'>
            <div className='indicator'>
              <h1 className='text-2xl text-center md:text-left font-semibold mr-5'>
                Recipes
              </h1>
              <span className='indicator-item indicator-middle badge bg-base-200'>
                {data.fetchUserByUsername.recipeCount}
              </span>
            </div>

            <Carousel recipes={data.fetchUserByUsername.recipes} />
          </div>
        )}

        {!_.isEmpty(data.fetchUserByUsername.liked_recipes) && (
          <div className='space-y-5 px-5'>
            <div className='indicator'>
              <h1 className='text-2xl text-center md:text-left font-semibold mr-5'>
                Liked Recipes
              </h1>
              <span className='indicator-item indicator-middle badge bg-base-200'>
                {data.fetchUserByUsername.likedRecipeCount}
              </span>
            </div>

            <Carousel recipes={data.fetchUserByUsername.liked_recipes} />
          </div>
        )}
      </section>
    </>
  ) : (
    <HiRefresh size={30} className='animate-spin my-10 mx-auto block' />
  )
}

export default Profile
