import { useQuery } from '@apollo/client';
import { Alert, Card, Hero } from '../../components';
import { FETCH_RECIPES } from '../../graphql/operations/recipes';
import { useRecipe } from '../../hooks/useRecipe';
import { IRecipe } from '../../types/recipe';

const Home = () => {
  const { loading, data } = useQuery(FETCH_RECIPES);
  const { isError, error } = useRecipe((state) => ({
    isError: state.isError,
    error: state.error,
  }));

  return !loading ? (
    <>
      <Hero />

      {isError && <Alert msg={error} />}

      <section className="max-w-7xl mx-auto md:px-14 pt-5">
        <h1 className="text-2xl text-center md:text-left font-semibold">
          Latest recipes
        </h1>
      </section>

      <div className="grid gap-x-4 gap-y-16 mx-auto justify-items-center max-w-7xl lg:grid-cols-4 md:grid-cols-2 my-2.5 p-5">
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
  ) : null;
};

export default Home;
