import AuthModal from '@/components/UI/modals/AuthModal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
   title: 'Auth | NextStore',
   description: 'Authentication',
}

export default function AuthLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <section className="container">
         <AuthModal>
            {children}
         </AuthModal>
      </section>
   )
}
