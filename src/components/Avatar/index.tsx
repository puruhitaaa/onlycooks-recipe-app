interface Props {
  url: string
}

const Avatar = ({ url }: Props) => {
  return (
    <div className='avatar'>
      <div className='w-24 rounded-full ring ring-base-content ring-offset-base-100 ring-offset-2'>
        <img alt='avatar' src={url} />
      </div>
    </div>
  )
}

export default Avatar
