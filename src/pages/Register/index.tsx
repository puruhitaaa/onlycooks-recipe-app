import { useMutation } from '@apollo/client'
import { HiEye, HiEyeOff, HiRefresh } from 'react-icons/hi'
import { useState } from 'react'
import { Alert, Breadcrumbs } from '../../components'
import { REGISTER_USER } from '../../graphql/operations/user'
import { useForm } from '../../hooks/useForm'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [isPasswordShown, setPasswordShown] = useState(false)
  const { register, isError, errorMsg, setError } = useAuth((state) => ({
    register: state.register,
    isError: state.isError,
    errorMsg: state.errorMsg,
    setError: state.setError,
  }))
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  }
  const { onChange, onSubmit, values } = useForm(registerCallback, initialState)
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      register(result.data.loginUser)
      navigate('/')
    },
    onCompleted(result) {
      localStorage.setItem('auth', JSON.stringify(result.registerUser))
    },
    onError(error: any) {
      setError(error.graphQLErrors[0].message)
    },
    variables: values,
  })
  const isInvalid =
    values.firstName!.trim() === '' ||
    values.lastName!.trim() === '' ||
    values.email!.trim() === '' ||
    values.username!.trim() === '' ||
    values.password!.trim() === ''

  function registerCallback() {
    registerUser()
  }

  return (
    <>
      <section className='max-w-7xl mx-auto px-10 md:px-5'>
        <Breadcrumbs />
      </section>

      <section className='flex justify-center mt-14 relative z-10 overflow-hidden'>
        <img
          className='absolute object-cover'
          src='https://api.lorem.space/image/pizza?w=1000&h=1000'
          alt='pizza'
        />
        <form
          className='flex flex-col items-center w-full h-screen max-w-xs px-2.5 py-5 relative sm:bg-gradient-to-b sm:from-base-100 sm:to-base-200'
          onSubmit={onSubmit}
        >
          <div className='form-control mb-5 w-full'>
            <label className='label'>
              <span className='label-text'>First name</span>
            </label>
            <input
              type='text'
              name='firstName'
              onChange={onChange}
              placeholder='Type your first name'
              className='input input-bordered w-full max-w-xs'
              value={values.firstName}
            />

            <label className='label'>
              <span className='label-text'>Last name</span>
            </label>
            <input
              type='text'
              name='lastName'
              onChange={onChange}
              placeholder='Type your last name'
              className='input input-bordered w-full max-w-xs'
              value={values.lastName}
            />

            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              name='email'
              onChange={onChange}
              placeholder='Type your email'
              className='input input-bordered w-full max-w-xs'
              value={values.email}
            />

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

            <label className='label'>
              <span className='label-text'>Confirm password</span>
            </label>
            <div className='relative'>
              <input
                minLength={6}
                type={isPasswordShown ? 'text' : 'password'}
                name='confirmPassword'
                onChange={onChange}
                placeholder='Confirm your password'
                className='input input-bordered w-full max-w-xs'
                value={values.confirmPassword}
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
            {!loading ? 'Send' : <HiRefresh className='w-5' />}
          </button>
        </form>

        {isError && <Alert msg={errorMsg} />}
      </section>
    </>
  )
}

export default Register
