import { useQuery } from '@apollo/client';
import { HiRefresh } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components';
import { FETCH_FOLLOWERS_BY_USERNAME } from '../../graphql/operations/user';
import { IUser } from '../../types/user';

const FollowerList = () => {
  const { username } = useParams();

  const { loading, data, error } = useQuery(FETCH_FOLLOWERS_BY_USERNAME, {
    variables: { username },
  });

  return !loading ? (
    <>
      <section className="max-w-7xl mx-auto px-10 md:px-5">
        <Breadcrumbs />
      </section>

      <section className="flex flex-col max-w-7xl mx-auto items-center space-y-5 p-5">
        <h1 className="text-2xl text-center md:text-left font-semibold">
          {username}'s{' '}
          {data.fetchUserByUsername.followerCount > 1
            ? 'followers'
            : 'follower'}
        </h1>

        <ul className="menu bg-base-100 w-full max-w-2xl rounded-box overflow-hidden">
          {data.fetchUserByUsername.followers.map((follower: IUser) => (
            <div className="relative group" key={follower.id}>
              <li
                className="bg-slate-50 font-semibold rounded-full transition-colors group-hover:text-base-100 hover:bg-transparent z-40"
                key={follower.id}
              >
                <Link to={`/profile/${follower.username}`}>
                  {follower.username}
                </Link>
              </li>

              <img
                className="w-full h-full top-0 absolute rounded-full object-cover"
                src={follower.avatar_url}
                alt={follower.username}
              />

              <div className="absolute font-semibold flex space-x-5 group-hover:text-base-100 top-2.5 right-5 z-50">
                <p>
                  {follower.followerCount}{' '}
                  {follower.followerCount > 1 ? 'followers' : 'follower'}{' '}
                </p>
                <p>
                  {follower.followingCount}{' '}
                  {follower.followingCount > 1 ? 'followings' : 'following'}{' '}
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

export default FollowerList;
