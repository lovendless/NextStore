'use client'
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
   <button className="btn" onClick={() => signOut()}>
   <span>SignOut</span>
   </button>
  )
}
