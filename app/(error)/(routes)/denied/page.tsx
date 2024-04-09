import Link from "next/link"

export default function DeniedPage() {
  return (
   <section>
    <h1>
      Your request has been denied!!
    </h1>
   <Link href="/">Go to home page</Link>
   </section>
  )
}
