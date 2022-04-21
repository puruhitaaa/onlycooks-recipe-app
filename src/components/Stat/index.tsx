import { useNavigate } from 'react-router-dom'

interface Props {
  follower_count: number
  following_count: number
  recipe_count: number
}

const Stat = ({ follower_count, following_count, recipe_count }: Props) => {
  const navigate = useNavigate()

  return (
    <div className='stats stats-vertical bg-base-100 md:stats-horizontal'>
      <div
        className='stat cursor-pointer'
        onClick={() => navigate('followers')}
      >
        <div className='stat-title'>Followers</div>
        <div className='stat-value'>{follower_count}</div>
      </div>

      <div
        className='stat cursor-pointer'
        onClick={() => navigate('followings')}
      >
        <div className='stat-title'>Followings</div>
        <div className='stat-value'>{following_count}</div>
      </div>

      <div className='stat'>
        <div className='stat-title'>Recipes</div>
        <div className='stat-value'>{recipe_count}</div>
      </div>
    </div>
  )
}

export default Stat
