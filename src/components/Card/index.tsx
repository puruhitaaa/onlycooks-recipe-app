import { useMutation } from '@apollo/client';
import _ from 'lodash';
import { useState } from 'react';
import { HiHeart, HiOutlineHeart, HiOutlineStar } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { LIKE_RECIPE, STAR_RECIPE } from '../../graphql/operations/recipes';
import { useAuth } from '../../hooks/useAuth';
import { useRecipe } from '../../hooks/useRecipe';
import { IUser } from '../../types/user';

interface ICardProps {
  id: string;
  author_username: string;
  author_name: string;
  author_img: string;
  meal_thumbnail: string;
  name: string;
  est_price?: Number;
  cook_duration?: Number;
  recipe_tags?: [string];
  likes?: IUser[];
  stars?: IUser[];
}

const Card = ({
  id,
  author_username,
  author_name,
  author_img,
  name,
  est_price,
  cook_duration,
  meal_thumbnail,
  likes,
  stars,
}: ICardProps) => {
  const { user } = useAuth((state) => ({
    user: state.user,
  }));

  const [isLiked, setIsLiked] = useState(
    likes?.some((likingUser: IUser) => likingUser.id === user?.id)
  );
  const [isStarred, setIsStarred] = useState(
    stars?.some((starringUser: IUser) => starringUser.id === user?.id)
  );

  const { setError } = useRecipe((state) => ({
    setError: state.setError,
  }));

  const [likeRecipe] = useMutation(LIKE_RECIPE, {
    onCompleted() {
      setIsLiked(!isLiked);
    },
    onError(error: any) {
      setError(error.message);
    },
    variables: { recipeId: id },
  });

  const [starRecipe] = useMutation(STAR_RECIPE, {
    onCompleted() {
      setIsStarred(!isStarred);
    },
    onError(error: any) {
      setError(error.message);
    },
    variables: { recipeId: id },
  });

  return (
    <div className="card w-56 h-80 bg-base-100 shadow-xl group cursor-pointer">
      <figure className="relative max-h-32">
        <Link to={`/profile/${author_username}`}>
          <img
            className="absolute hover:scale-110 top-0 left-0 h-16 w-16 ring-4 duration-200 ring-base-100 object-cover rounded-r-full"
            src={author_img}
            alt={author_name}
          />
        </Link>

        <Link to={`/recipe/${id}`}>
          <img className="h-52 object-cover" src={meal_thumbnail} alt={name} />
        </Link>
      </figure>

      <div className="card-body relative bg-gradient-to-r from-neutral-content to-slate-500 group-hover:bg-gradient-to-l text-base-300">
        <h2 className="leading-7 text-lg font-semibold">{name}</h2>
        <h5>{author_name}</h5>
        <div className="flex items-center mb-2">
          <p>{cook_duration} mins</p>
          <p className="text-sm flex-1">${est_price}/portion</p>
        </div>

        {!_.isEmpty(user) && (
          <div className="absolute space-x-5 p-2.5 bottom-0 right-0">
            <button
              className="hover:scale-110 duration-200"
              onClick={() => likeRecipe()}
            >
              {isLiked ? <HiHeart size={20} /> : <HiOutlineHeart size={20} />}
            </button>
            <button
              className="hover:scale-110 duration-200"
              onClick={() => starRecipe()}
            >
              <HiOutlineStar size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
