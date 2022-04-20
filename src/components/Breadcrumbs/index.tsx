import { Link, useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
  let { pathname } = useLocation()

  if (pathname.split('/').length === 3) {
    return (
      <div className='text-sm breadcrumbs capitalize scrollbar-hide'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <p>{pathname.split('/')[1]}</p>
          </li>
          <li>
            <Link to={`/${pathname.split('/')[1]}/${pathname.split('/')[2]}`}>
              {pathname.split('/')[2]}
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  if (pathname.split('/').length === 4) {
    return (
      <div className='text-sm breadcrumbs capitalize scrollbar-hide'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <p>{pathname.split('/')[1]}</p>
          </li>
          <li>
            <Link to={`/${pathname.split('/')[1]}/${pathname.split('/')[2]}`}>
              {pathname.split('/')[2]}
            </Link>
          </li>
          <li>
            <Link to={`/${pathname.split('/')[1]}/${pathname.split('/')[3]}`}>
              {pathname.split('/')[3]}
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <div className='text-sm breadcrumbs capitalize scrollbar-hide'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to=''>{pathname.split('/')}</Link>
        </li>
      </ul>
    </div>
  )
}

export default Breadcrumbs
