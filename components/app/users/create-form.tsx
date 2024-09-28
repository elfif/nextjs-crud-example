'use client'

import { UserFormState } from './schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createUser } from '@/app/actions/users'
import { Label } from '@radix-ui/react-label'
import { Checkbox } from '@/components/ui/checkbox'
import { useFormState } from 'react-dom'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
import { E164Number } from 'libphonenumber-js'
import '@/styles/react-phone-number-input/style.css'

export function UserCreateForm() {
  const [formState, action] = useFormState<UserFormState, FormData>(
    createUser,
    {
      errors: {},
    }
  )

  const [phone, setPhone] = useState<E164Number | undefined>()

  return (
    <form action={action}>
      {formState.errors._form && (
        <div className='text-red-500'>{formState.errors._form.join(',')}</div>
      )}
      <div className='flex flex-col gap-y-1 my-4'>
        <Label htmlFor='email'>Email</Label>
        <Input
          type='email'
          id='email'
          name='email'
          className={formState.errors.email && 'border-2 border-red-500'}
        />
        {formState.errors.email && (
          <div className='text-red-500'>
            {formState.errors.email?.join(', ')}
          </div>
        )}
      </div>
      <div className='flex flex-col gap-y-1 my-4'>
        <Label htmlFor='name'>Name</Label>
        <Input
          type='text'
          id='name'
          name='name'
          className={formState.errors.name && 'border-2 border-red-500'}
        />
        {formState.errors.name && (
          <div className='text-red-500'>
            {formState.errors.name?.join(', ')}
          </div>
        )}
      </div>
      <div className='flex flex-col gap-y-1 my-4'>
        <Label htmlFor='password'>Password</Label>
        <Input
          type='password'
          id='password'
          name='password'
          className={formState.errors.password && 'border-2 border-red-500'}
        />
        {formState.errors.password && (
          <div className='text-red-500'>
            {formState.errors.password?.join(', ')}
          </div>
        )}
      </div>
      <div className='flex flex-col gap-y-1 my-4'>
        <Label htmlFor='confirmPassword'>Confirm password</Label>
        <Input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          className={
            formState.errors.confirmPassword && 'border-2 border-red-500'
          }
        />
        {formState.errors.confirmPassword && (
          <div className='text-red-500'>
            {formState.errors.confirmPassword?.join(', ')}
          </div>
        )}
      </div>
      <input type='hidden' name='phone_number' value={phone} />
      <div className='flex flex-col gap-y-1 my-4'>
        <Label htmlFor='phone_number'>Phone number</Label>
        <PhoneInput value={phone} onChange={setPhone} defaultCountry='FR' />
      </div>
      {formState.errors.phone_number && (
        <div className='text-red-500'>
          {formState.errors.phone_number?.join(', ')}
        </div>
      )}
      <div className='flex flex-row items-center gap-x-4 my-4'>
        <Label htmlFor='admin'>Admin</Label>
        <Checkbox id='admin' name='admin' />
      </div>
      <Button type='submit'>Enregistrer</Button>
    </form>
  )
}
