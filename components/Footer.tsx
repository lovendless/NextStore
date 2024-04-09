

export default function Footer() {

   return (
         <footer className='footer'>
            <div className="footer__inner flex">
              <p>&copy; {new Date().getFullYear()} StoreName, Inc. All rights reserved.</p>
            </div>
         </footer>
   )
}
