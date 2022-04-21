import { useMutation } from '@apollo/client'
import { useState } from 'react'
import {
  HiOutlineShare,
  HiOutlineStar,
  HiOutlineThumbUp,
  HiStar,
  HiThumbUp,
} from 'react-icons/hi'
import ReactPlayer from 'react-player'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LIKE_RECIPE, STAR_RECIPE } from '../../graphql/operations/recipes'
import { FOLLOW_USER } from '../../graphql/operations/user'
import { useAuth } from '../../hooks/useAuth'
import { useRecipe } from '../../hooks/useRecipe'
import { IRecipe } from '../../types/recipe'
import { IUser } from '../../types/user'

interface Props {
  recipe: IRecipe
}

export default function ExploreItem({ recipe }: Props) {
  const navigate = useNavigate()
  const { user } = useAuth((state) => ({
    user: state.user,
  }))
  const { setError } = useRecipe((state) => ({
    setError: state.setError,
  }))

  const [isLiked, setIsLiked] = useState(
    recipe.likes?.some((likingUser: IUser) => likingUser.id === user?.id)
  )
  const [isStarred, setIsStarred] = useState(
    recipe.stars?.some((starringUser: IUser) => starringUser.id === user?.id)
  )
  const [isFollowing, setIsFollowing] = useState(
    recipe.author?.followers?.some(
      (followingUser: IUser) => followingUser.id === user?.id
    )
  )

  const [likeRecipe] = useMutation(LIKE_RECIPE, {
    onCompleted() {
      setIsLiked(!isLiked)
      if (!isLiked) {
        toast.success('Recipe liked.', {
          theme: 'dark',
          position: 'bottom-right',
          autoClose: 1500,
        })
      } else {
        toast.error('Recipe unliked.', {
          theme: 'dark',
          position: 'bottom-right',
          autoClose: 1500,
        })
      }
    },
    onError(error: any) {
      setError(error.message)
    },
    variables: { recipeId: recipe?.id },
  })

  const [starRecipe] = useMutation(STAR_RECIPE, {
    onCompleted() {
      setIsStarred(!isStarred)
      if (!isStarred) {
        toast.success('Recipe starred.', {
          theme: 'dark',
          position: 'bottom-right',
          autoClose: 1500,
        })
      } else {
        toast.error('Recipe unstarred.', {
          theme: 'dark',
          position: 'bottom-right',
          autoClose: 1500,
        })
      }
    },
    onError(error: any) {
      setError(error.message)
    },
    variables: { recipeId: recipe?.id },
  })

  const [followUser] = useMutation(FOLLOW_USER, {
    onCompleted() {
      if (!isFollowing) {
        toast.success(`Followed ${recipe.author.username} successfully.`, {
          theme: 'dark',
          position: 'bottom-right',
          autoClose: 1500,
        })
      } else {
        toast.error(`Unfollowed ${recipe.author.username} successfully.`, {
          theme: 'dark',
          position: 'bottom-right',
          autoClose: 1500,
        })
      }
      setIsFollowing(!isFollowing)
    },
    onError() {
      toast.error('Unable to follow user', {
        theme: 'dark',
        position: 'bottom-right',
        autoClose: 1500,
      })
    },
    variables: { userId: recipe?.author?.id },
  })

  const handleShare = (id: string) => {
    navigator.clipboard.writeText(`${window.location.href}recipe/${id}`)
    toast.success('Recipe link copied.', {
      position: 'bottom-right',
      theme: 'dark',
    })
  }

  return (
    <div className='space-y-5'>
      <section className='flex flex-col items-center space-y-5 md:flex-row md:space-x-10 md:space-y-0'>
        <Link to={`/profile/${recipe.author.username}`}>
          <img
            className='w-20 h-20 md:w-16 md:h-16 object-cover rounded-full cursor-pointer'
            src={recipe.author.avatar_url}
            alt={recipe.author.username}
          />
        </Link>

        <div className='flex-1'>
          <div className='flex items-center space-x-5'>
            <h5 className='text-lg md:text-xl font-semibold'>
              {recipe.author.username}
            </h5>
            {/* <span className='badge'>
                    {formatDistance(parseInt(recipe?.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </span> */}
          </div>
          <p className='max-w-2xl'>{recipe.about}</p>
        </div>

        {user && recipe.author.id !== user.id ? (
          <button
            onClick={() => followUser()}
            className={`btn btn-outline ${
              isFollowing ? 'btn-error' : ''
            }`.trim()}
          >
            {!isFollowing ? 'Follow' : 'Unfollow'}
          </button>
        ) : (
          <button
            className='btn btn-outline'
            onClick={() => navigate('/login')}
          >
            Follow
          </button>
        )}
      </section>

      <section className='relative space-y-2.5 xl:space-y-0'>
        <div className='max-w-5xl mx-auto'>
          <ReactPlayer width='100%' url={recipe?.cook_video} />
        </div>
        <div className='flex justify-center items-center space-x-5 -bottom-10 left-5 xl:absolute xl:flex-col xl:items-start xl:space-y-5 xl:space-x-0 xl:top-10 xl:bottom-0 xl:left-0'>
          <button
            className='flex items-center space-x-3'
            onClick={() => likeRecipe()}
          >
            {isLiked ? (
              <HiThumbUp className='w-8 h-8' />
            ) : (
              <HiOutlineThumbUp className='w-8 h-8' />
            )}
            <p>{recipe.likeCount}</p>
          </button>

          <button
            className='flex items-center space-x-3'
            onClick={() => starRecipe()}
          >
            {isStarred ? (
              <HiStar className='w-8 h-8' />
            ) : (
              <HiOutlineStar className='w-8 h-8' />
            )}
            <p>{recipe.starCount}</p>
          </button>

          <button onClick={() => handleShare(recipe.id)}>
            <HiOutlineShare className='w-8 h-8' />
          </button>
        </div>
      </section>
    </div>
  )
}
