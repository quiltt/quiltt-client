import { z } from 'zod'

import { AuthStrategies } from '@quiltt/client'

export const LoginEmail = z.object({
  strategy: z.literal(AuthStrategies.Email),
  email: z
    .string({ required_error: 'Email is required', invalid_type_error: 'Email is required' })
    .refine((data) => data.length, 'Email is required')
    .refine((data) => data.match(/^\S+@\S+$/i), 'Email is invalid'),
})

export const LoginPhone = z.object({
  strategy: z.literal(AuthStrategies.Phone),
  phone: z
    .string({
      required_error: 'Cellphone is required',
      invalid_type_error: 'Cellphone is required',
    })
    .refine((data) => data.length, 'Cellphone is required')
    .refine((data) => data.length >= 10 && data.length <= 12, 'Cellphone must be a 10-digit number')
    .refine((data) => !/\W/.test(data), 'Cellphone must contain only digits')
    .refine((data) => data.match(/^[1-9]\d{1,14}$/), 'Cellphone format is invalid'),
})

export const LoginUsername = z.object({
  strategy: z.literal(AuthStrategies.Email).or(z.literal(AuthStrategies.Phone)),
  email: z
    .string({ required_error: 'Email is required', invalid_type_error: 'Email is required' })
    .refine((data) => data.length, 'Email is required')
    .refine((data) => data.match(/^\S+@\S+$/i), 'Email is invalid'),
  phone: z
    .string({
      required_error: 'Cellphone is required',
      invalid_type_error: 'Cellphone is required',
    })
    .refine((data) => data.length, 'Cellphone is required')
    .refine((data) => data.length >= 10 && data.length <= 12, 'Cellphone must be a 10-digit number')
    .refine((data) => !/\W/.test(data), 'Cellphone must contain only digits')
    .refine((data) => data.match(/^[1-9]\d{1,14}$/), 'Cellphone format is invalid'),
})

export const LoginPasscode = z.object({
  strategy: z.literal(AuthStrategies.Email).or(z.literal(AuthStrategies.Phone)),
  username: z.string(),
  passcode: z
    .string({
      required_error: 'Login code is required',
      invalid_type_error: 'Login code is required',
    })
    .refine((data) => data.length, 'Login code is required')
    .refine((data) => !/\W/.test(data), 'Login code must contain only digits')
    .refine((data) => data.match(/^\d{6}$/), 'Login code must be a 6-digit number'),
})
