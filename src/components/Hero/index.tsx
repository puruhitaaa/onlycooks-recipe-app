import ReactPlayer from 'react-player/lazy'
import { Link } from 'react-router-dom'
import { IRecipe } from '../../types/recipe'

interface Props {
  recipe: IRecipe
}

const Hero = ({ recipe }: Props) => {
  return (
    <div className='hero relative h-screen md:h-[40vh] bg-transparent overflow-hidden'>
      <ReactPlayer
        playing
        loop
        muted
        width='100vw'
        height='100vh'
        controls={false}
        style={{ position: 'absolute' }}
        url={recipe.cook_video}
      />

      <span className='absolute top-0 right-0 bottom-0 left-0 bg-base-100/90 z-10 w-full h-full' />

      <div className='p-4 justify-between items-center flex flex-col space-y-10 w-full max-w-5xl md:space-y-0 md:flex-row-reverse z-20'>
        <Link to={`/profile/${recipe.author.username}`}>
          <img
            alt='random-pic'
            src={recipe.author.avatar_url}
            className='w-40 rounded-lg shadow-2xl'
          />
        </Link>
        <div>
          <h1 className='text-5xl font-bold'>{recipe.name}</h1>
          <p className='py-6'>
            Discover how {recipe.author.fullName} made {recipe.name}.
          </p>
          <Link className='btn btn-primary' to={`/recipe/${recipe.id}`}>
            Cook
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
