import { z } from 'zod'
import { decode } from 'decode-formdata'

// Decoder is used to transform FormData into a plain object.
// We use it to automatically cast types that need be (booleans, dates...)
export const userFormDataDecoder = (formData: FormData) => {
  return decode(formData, {
    booleans: ['admin'],
    dates: ['birthDate'],
  })
}

// The schema is used to validate the form data after it got decoded server side
// because form duffers between create and edit we will have two different schemas
export const userCreateSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Vous devez saisir une adresse email valide' }),
    name: z.string().min(3),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    phone_number: z.string().min(10),
    address: z.string().min(3).optional(),
    address2: z.string().min(3).optional(),
    zipcode: z.string().min(5).optional(),
    city: z.string().min(3).optional(),
    state: z.string().min(3).optional(),
    country: z.string().min(3).optional(),
    admin: z.boolean().optional(),
    birthDate: z.date().optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Le mot de passe ne correspond pas',
        path: ['confirmPassword'],
      })
    }
  })

// The schema is used to validate the form data after it got decoded server side
export const userUpdateSchema = z
  .object({
    name: z.string().min(3),
    phone_number: z.string().min(10),
    address: z.string().min(3).optional(),
    address2: z.string().min(3).optional(),
    zipcode: z.string().min(5).optional(),
    city: z.string().min(3).optional(),
    state: z.string().min(3).optional(),
    country: z.string().min(3).optional(),
    admin: z.boolean().optional(),
    birthDate: z.date().optional(),
  })

// The FormState that contains all the validation errors
export type UserFormState = {
  errors: {
    email?: string[]
    name?: string[]
    password?: string[]
    confirmPassword?: string[]
    phone_number?: string[]
    address?: string[]
    address2?: string[]
    zipcode?: string[]
    city?: string[]
    state?: string[]
    country?: string[]
    admin?: string[]
    birthDate?: string[]
    _form?: string[]
  }
}
