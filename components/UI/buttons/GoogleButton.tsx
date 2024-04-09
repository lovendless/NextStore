'use client'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useAuthForm } from '@/hooks/useAuthForm';

export default function GoogleButton() {
   const { isLoading, startLoading, endLoading } = useAuthForm();

   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get('callbackUrl') || "/profile";

   const handleClick = async () => {
      startLoading()

      await signIn('google', {
         callbackUrl
      })

      endLoading()
   }

   return (
      <button className='btn' disabled={isLoading} onClick={() => handleClick()}>
         Sign in with Google
      </button>
   )
}
