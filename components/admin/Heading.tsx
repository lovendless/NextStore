'use client'

export default function AdminNav({
   title,
   description
}: {
   title: string,
   description: string
}) {
return (
   <div className="flex direction-col">
      <h2 style={{color: '#515151', fontWeight: 'bold', letterSpacing: '1px'}}>{title}</h2>
      <p style={{color: '#696969', letterSpacing: '1px'}}>{description}</p>
   </div>
)

}
