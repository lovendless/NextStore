
export const Err = ({message}: {message: string}) => {

   return (
   <h3 className={message ? "errmsg" : "offscreen"} aria-live="assertive">
      {message}
   </h3>
   )
}