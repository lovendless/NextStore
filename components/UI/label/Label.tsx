import { Check, X } from "lucide-react"

export default function Label(
   {
      htmlFor, label, value, validValue
   }: {
      htmlFor: string,
      label: string,
      value: string | number | undefined,
      validValue?: Boolean
   }
) {

   return (
      <label className="flex al-items-center" htmlFor={htmlFor} style={{ marginBottom: '10px' }} >
         <span>
            {label}:
         </span>
         <span style={{ paddingTop: "3px" }} className={!validValue || !value ? 'hide' : 'valid'}>
            <Check style={{ height: '20px', width: '20px' }}/>
         </span>
         <span style={{ paddingTop: "3px" }} className={validValue || !value ? 'hide' : 'invalid'} >
            <X style={{ height: '20px', width: '20px' }} />
         </span>
      </label>
   )
}


