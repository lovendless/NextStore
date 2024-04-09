

export const Valid = ({message}: {message: string}) => {

   return (
   <h3 className={message ? "validmsg" : "offscreen"} aria-live="assertive">
      {message}
   </h3>
   )
}