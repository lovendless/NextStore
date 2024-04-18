'use client'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useAuthForm } from '@/hooks/useAuthForm';
import { GithubIcon } from 'lucide-react';

export default function GitHubButton() {
   const { isLoading, startLoading, endLoading } = useAuthForm();

   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get('callbackUrl') || "/profile";

   const handleClick = async () => {
      startLoading()

      await signIn('github', {
         callbackUrl
      })

      endLoading()
   }

   return (
      <button className='btn github' disabled={isLoading} onClick={() => handleClick()}>
         <GithubIcon size={20}/>
         Sign in with GitHub
      </button>
   )
}
