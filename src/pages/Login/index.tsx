import { useMutation } from '@apollo/client'
import { HiEye, HiEyeOff, HiRefresh } from 'react-icons/hi'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Alert, Breadcrumbs } from '../../components'
import { LOGIN_USER } from '../../graphql/operations/user'
import { useAuth } from '../../hooks/useAuth'
import { useForm } from '../../hooks/useForm'

const Login = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [isPasswordShown, setPasswordShown] = useState(false)
  const { login, isError, errorMsg, setError } = useAuth((state) => ({
    login: state.login,
    isError: state.isError,
    errorMsg: state.errorMsg,
    setError: state.setError,
  }))
  const initialState = {
    username: '',
    password: '',
  }
  const { onChange, onSubmit, values } = useForm(loginCallback, initialState)
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      login(result.data.loginUser)
      navigate('/')
    },
    onCompleted(result) {
      localStorage.setItem('auth', JSON.stringify(result.loginUser))
      if (searchParams.get('redirect'))
        navigate(`/${searchParams.get('redirect')}`)
    },
    onError(error: any) {
      setError(error.graphQLErrors[0].extensions.errors.general)
    },
    variables: values,
  })
  const isInvalid =
    values.username!.trim() === '' || values.password!.trim() === ''

  function loginCallback() {
    loginUser()
  }

  return (
    <>
      <section className='max-w-7xl mx-auto px-10 md:px-5'>
        <Breadcrumbs />
      </section>

      <section className='flex justify-center my-14 relative z-10 overflow-hidden'>
        <img
          className='absolute hidden sm:block object-cover'
          src='https://api.lorem.space/image/pizza?w=1000&h=1000'
          alt='pizza'
        />
        <form
          className='flex flex-col items-center sm:h-screen w-full max-w-xs px-2.5 py-5 relative sm:bg-base-100'
          onSubmit={onSubmit}
        >
          <div className='form-control mb-5 w-full'>
            <label className='label'>
              <span className='label-text'>Username</span>
            </label>
            <input
              minLength={5}
              type='text'
              name='username'
              onChange={onChange}
              placeholder='Type your username'
              className='input input-bordered w-full max-w-xs'
              value={values.username}
            />

            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <div className='relative'>
              <input
                minLength={6}
                type={isPasswordShown ? 'text' : 'password'}
                name='password'
                onChange={onChange}
                placeholder='Type your password'
                className='input input-bordered w-full max-w-xs'
                value={values.password}
              />
              <button
                type='button'
                onClick={() => setPasswordShown(!isPasswordShown)}
              >
                {isPasswordShown ? (
                  <HiEyeOff className='w-5 absolute right-4 top-4' />
                ) : (
                  <HiEye className='w-5 absolute right-4 top-4' />
                )}
              </button>
            </div>
          </div>

          <button
            disabled={isInvalid}
            className='btn btn-outline'
            type='submit'
          >
            {!loading ? 'Send' : <HiRefresh className='w-5 animate-spin' />}
          </button>
        </form>

        {isError && <Alert msg={errorMsg} />}
      </section>
    </>
  )
}

export default Login
