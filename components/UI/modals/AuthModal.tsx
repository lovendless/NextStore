
function AuthModal({ children }: {
   children: React.ReactNode
}) {

   return (
      <div className="authmodal">
         <h1 className="authmodal__title">NextStore</h1>
         <div className="authmodal__content">
            {children}
         </div>
      </div>
   )
}

export default AuthModal