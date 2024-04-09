
function AuthModal({ children }: {
   children: React.ReactNode
}) {

   return (
      <div className="authmodal">
         <div className="authmodal__content">
            {children}
         </div>
      </div>
   )
}

export default AuthModal