'use client'

import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import Cookies from 'js-cookie'

export default function Template({ children }: { children: React.ReactNode }) {

  const toast = useToast()
  const toastKey = Cookies.get('toast') as string | undefined
  if (toastKey === 'user.created') {
    Cookies.remove('toast')
    toast?.toast({ description: 'User created' })
  }
  

  return (
    <div>
      {children}
      <Toaster />
    </div>
  )
}
