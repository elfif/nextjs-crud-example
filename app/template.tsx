'use client'

import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import Cookies from 'js-cookie'

export type ToastCookie = {
  key: string
  value: string
  type?: 'success' | 'error' | 'warning' | 'info'
}

export default function Template({ children }: { children: React.ReactNode }) {
  const toast = useToast()

  const entries: ToastCookie[] = [
    { key: 'user.created', value: 'Utilisateur créé', type: 'success' },
    { key: 'user.updated', value: 'Utilisateur mis à jour', type: 'success' },
    { key: 'user.deleted', value: 'Utilisateur supprimé', type: 'warning' },
  ]

  const toastKey = Cookies.get('toast') as string | undefined
  const toastData = entries.find(entry => entry.key === toastKey)
  if (toastData) {
    let className = ''
    switch (toastData.type) {
      case 'success':
        className = 'bg-green-500 text-white'
        break
      case 'error':
        className = 'bg-red-500 text-white'
        break
      case 'warning':
        className = 'bg-yellow-500 text-black'
        break
    }
    Cookies.remove('toast')
    toast?.toast({ description: toastData.value, className: className })
  }

  return (
    <div>
      {children}
      <Toaster />
    </div>
  )
}
