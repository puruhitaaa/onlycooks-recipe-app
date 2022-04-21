import React, { useState } from 'react'

export const useForm = (callback: () => void, initialState = {}) => {
  const [values, setValues] = useState<{
    firstName?: string
    lastName?: string
    email?: string
    username?: string
    password?: string
    confirmPassword?: string
    search?: string
  }>(initialState)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    callback()
  }

  return {
    onChange,
    onSubmit,
    values,
  }
}
