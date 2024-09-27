import { z } from 'zod'
import { decode } from 'decode-formdata'

export const userFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(6),
  phone_number: z.string().min(10),
  address: z.string().min(3).optional(),
  address2: z.string().min(3).optional(),
  zipcode: z.string().min(5).optional(),
  city: z.string().min(3).optional(),
  state: z.string().min(3).optional(),
  country: z.string().min(3).optional(),
  admin: z.string().optional(),
})

export const userEntitySchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(6),
  phone_number: z.string().min(10),
  address: z.string().min(3).optional(),
  address2: z.string().min(3).optional(),
  zipcode: z.string().min(5).optional(),
  city: z.string().min(3).optional(),
  state: z.string().min(3).optional(),
  country: z.string().min(3).optional(),
  admin: z.boolean().optional(),
})

export const userFormDataDecoder = (formData: FormData) => {
  return decode(formData, {
    booleans: ['admin'],
  })
}
