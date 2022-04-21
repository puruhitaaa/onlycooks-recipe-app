import { Link } from 'react-router-dom'
import { IRecipe } from '../../types/recipe'

interface Props {
  recipes: IRecipe[]
}

const Carousel = ({ recipes }: Props) => {
  return (
    <div className='carousel items-center carousel-center w-4xl max-w-4xl p-4 space-x-4 bg-base-100 rounded-box'>
      {recipes.map((recipe) => (
        <Link
          className='carousel-item max-h-44'
          to={`/recipe/${recipe.id}`}
          key={recipe.id}
        >
          <img
            alt={recipe.name}
            src={recipe.meal_thumbnail}
            className='rounded-box h-44 w-64 object-cover'
          />
        </Link>
      ))}
    </div>
  )
}

export default Carousel
