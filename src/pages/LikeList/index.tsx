import { useQuery } from '@apollo/client';
import { HiRefresh } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components';
import { FETCH_RECIPE_LIKE_LIST } from '../../graphql/operations/recipes';
import { IUser } from '../../types/user';

const LikeList = () => {
  const { id } = useParams();

  const { loading, data, error } = useQuery(FETCH_RECIPE_LIKE_LIST, {
    variables: { recipeId: id },
  });

  return !loading ? (
    <>
      <section className="max-w-7xl mx-auto px-10 md:px-5">
        <Breadcrumbs />
      </section>

      {/* <img
        className="absolute opacity-80 w-full top-0 right-0 bottom-0 left-0 z-10"
        src={data.fetchRecipeById.meal_thumbnail}
        alt=""
      /> */}

      <section className="flex flex-col max-w-7xl mx-auto items-center space-y-5 p-5">
        <h1 className="text-2xl text-center md:text-left font-semibold">
          {data.fetchRecipeById.name}'s likes
        </h1>

        <ul className="menu bg-base-100 w-full max-w-2xl rounded-box overflow-hidden">
          {data.fetchRecipeById.likes.map((likingUser: IUser) => (
            <div className="relative group" key={likingUser.id}>
              <li
                className="bg-slate-50 font-semibold rounded-full transition-colors group-hover:text-base-100 hover:bg-transparent z-40"
                key={likingUser.id}
              >
                <Link to={`/profile/${likingUser.username}`}>
                  {likingUser.username}
                </Link>
              </li>

              <img
                className="w-full h-full top-0 absolute rounded-full object-cover"
                src={likingUser.avatar_url}
                alt={likingUser.username}
              />

              <div className="absolute font-semibold flex space-x-5 group-hover:text-base-100 top-2.5 right-5 z-50">
                <p>
                  {likingUser.followerCount}{' '}
                  {likingUser.followerCount > 1 ? 'followers' : 'follower'}{' '}
                </p>
                <p>
                  {likingUser.followingCount}{' '}
                  {likingUser.followingCount > 1 ? 'followings' : 'following'}{' '}
                </p>
              </div>
            </div>
          ))}
        </ul>
      </section>
    </>
  ) : (
    <HiRefresh size={30} className="animate-spin my-10 mx-auto block" />
  );
};

export default LikeList;
