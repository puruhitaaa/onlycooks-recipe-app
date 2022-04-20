import { Link } from 'react-router-dom'
import { IRecipe } from '../../types/recipe'

interface Props {
  recipe: IRecipe
}

const Hero = ({ recipe }: Props) => {
  return (
    <div className='hero h-screen md:h-[40vh] bg-gradient-to-t from-base-200 to-base-500'>
      <div className='p-4 justify-between items-center flex flex-col space-y-10 w-full max-w-5xl md:space-y-0 md:flex-row-reverse'>
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
