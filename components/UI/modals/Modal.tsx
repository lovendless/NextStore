import { X } from "lucide-react"

function Modal(
   {
      children,
      title,
      isOpen,
      onClose
   }: {
      children: React.ReactNode,
      title: string,
      isOpen: Boolean,
      onClose: () => void
   }) {

   return (
      <div className={isOpen ? `modal active` : 'modal'}>
         <div className="modal__content flex direction-col" onClick={e => e.stopPropagation()}>
            <div className="modal__content--header flex justify-end">
               <button onClick={onClose}>
                  <X style={{ height: "1.2rem" }} />
               </button>
            </div>
            <div className="modal__content--body flex align-items-center direction-col" style={{ gap: '10px' }}>
               <h1 style={{ textAlign: "start", color: '#000' }}>{title}</h1>
               {children}
            </div>
         </div>
      </div>
   )
}

export default Modal