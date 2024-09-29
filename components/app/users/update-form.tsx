'use client'

import { UserFormState } from './schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Checkbox } from '@/components/ui/checkbox'
import { useFormState } from 'react-dom'
import { User } from '@prisma/client'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
import { E164Number } from 'libphonenumber-js'
import '@/styles/react-phone-number-input/style.css'
import { formatDate, isE164Number } from '@/lib/utils'
import { DatePicker } from '@/components/ui/date-picker'

// Because we use bind in the edit/page.tsx file to automatically pass the id of the user to the updateUser function
// we need to redefine the tytpe of the updateAction function
// Otherwise typescript won't allow it....
export type UpdateAction = ( formState: UserFormState, formData: FormData) => Promise<UserFormState>

export function UserUpdateForm(props: { updateAction: UpdateAction, user: User }) {
  const [formState, action] = useFormState<UserFormState, FormData>(
    props.updateAction,
    {
      errors: {},
    }
  )
  const initialPhone = isE164Number(props.user.phone_number) ? props.user.phone_number : undefined
  const [phone, setPhone] = useState<E164Number | undefined>(initialPhone)
  const initialBirthDate = props.user.birthDate ? new Date(props.user.birthDate) : undefined
  const [birthDate, setBirthDate] = useState<Date | undefined>(initialBirthDate)

  return (
    <form action={action}>
      { formState.errors._form && <div className='text-red-500'>{formState.errors._form.join(',')}</div>}
      <div className='flex flex-col gap-y-1 my-4'>
        <Label htmlFor='name'>Name</Label>
        <Input
          type='text'
          id='name'
          name='name'
          className={formState.errors.name && 'border-2 border-red-500'}
          defaultValue={props.user.name}
        />
        {formState.errors.name && (
          <div className='text-red-500'>
            {formState.errors.name?.join(', ')}
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
      <div className='flex flex-col gap-y-1 my-4'>
        <Label htmlFor='name'>Date de naissance</Label>
        <DatePicker date={birthDate} setDate={setBirthDate} />  
        <input type='hidden' name='birthDate' value={formatDate(birthDate)} />
        {formState.errors.name && (
          <div className='text-red-500'>
            {formState.errors.name?.join(', ')}
          </div>
        )}
      </div>
      <div className='flex flex-row items-center gap-x-4 my-4'>
        <Label htmlFor='admin'>Admin</Label>
        <Checkbox id='admin' name='admin' defaultChecked={props.user.admin} />
      </div>
      <Button type='submit'>Enregistrer</Button>
    </form>
  )
}
