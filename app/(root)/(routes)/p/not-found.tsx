import Link from 'next/link'
 
export default function NotFound() {
   
  return (
    <div style={{height: '100%'}} className='container flex al-items-center direction-col justify-content-center'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}

