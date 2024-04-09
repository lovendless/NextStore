import { formatter } from "@/lib/utils"

interface CurrencyProps {
   value?: string | number
}

export const Currency: React.FC<CurrencyProps> = (
   {
      value
   }
   ) => {
   return (
      <div className="currency">
         {formatter.format(Number(value))}
      </div>
   )
}