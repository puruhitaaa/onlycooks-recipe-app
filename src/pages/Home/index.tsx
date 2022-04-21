import { useQuery } from '@apollo/client'
import { HiRefresh } from 'react-icons/hi'
import { Alert, Card, Explore, Hero } from '../../components'
import {
  FETCH_RECIPES_EXPLORE,
  FETCH_RECIPES_HOME,
} from '../../graphql/operations/recipes'
import { useModes } from '../../hooks/useModes'
import { useRecipe } from '../../hooks/useRecipe'
import { IRecipe } from '../../types/recipe'

const Home = () => {
  const isExploreMode = useModes((state) => state.isExploreMode)
  const { loading, data } = useQuery(
    isExploreMode ? FETCH_RECIPES_EXPLORE : FETCH_RECIPES_HOME
  )
  const { isError, error } = useRecipe((state) => ({
    isError: state.isError,
    error: state.error,
  }))

  return !loading ? (
    !isExploreMode ? (
      <>
        <Hero
          recipe={
            data.fetchRecipes[
              Math.floor(Math.random() * data.fetchRecipes.length)
            ]
          }
        />

        {isError && <Alert msg={error} />}

        <section className='max-w-7xl mx-auto md:px-14 pt-5'>
          <h1 className='text-2xl text-center md:text-left font-semibold'>
            Latest recipes
          </h1>
        </section>

        <div className='grid gap-x-4 gap-y-16 mx-auto justify-items-center max-w-7xl lg:grid-cols-4 md:grid-cols-2 mt-2.5 p-5'>
          {data.fetchRecipes.map((recipe: IRecipe) => (
            <Card
              id={recipe.id}
              meal_thumbnail={recipe.meal_thumbnail}
              author_name={recipe.author.fullName!}
              author_username={recipe.author.username!}
              author_img={recipe.author.avatar_url!}
              key={recipe.id}
              est_price={recipe.est_price}
              name={recipe.name}
              cook_duration={recipe.cook_duration}
              likes={recipe.likes}
              stars={recipe.stars}
            />
          ))}
        </div>
      </>
    ) : (
      <Explore recipes={data.fetchRecipes} />
    )
  ) : (
    <HiRefresh size={30} className='animate-spin my-10 mx-auto block' />
  )
}

export default Home
