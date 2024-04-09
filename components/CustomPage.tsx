import React from 'react'
import SideMenu from './SideMenu'
import { getServerSession } from 'next-auth';
import { getFavIds } from '@/lib/actions';

export default async function CustomPage({
   children
}: {
   children: React.ReactNode
}) {

   const session = await getServerSession();

   const favIds = await getFavIds();

   return (
      <div className="page flex">
         <SideMenu session={session} favIds={favIds} />
         <main>
         {children}
         </main>
      </div>
   )
}
