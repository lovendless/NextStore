

export default function Textarea(
   {
      id,
      name,
      value,
      onChange
   }: {
      id: string,
      name: string,
      value: string,
      onChange: (e: any) => void
   }
) {
   return (
      <textarea
         className='textarea'
         id={id}
         name={name}
         value={value}
         autoComplete='on'
         onChange={onChange}
         required
      >
      </textarea>
   )
}
