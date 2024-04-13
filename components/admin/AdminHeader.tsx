import Link from "next/link";
import AdminNav from "./AdminNav";

export default function AdminHeader(
   {
      params
   }: {
      params: { userId: string }
   }
) {
   return (
      <header className="admin-menu" style={{ borderBottom: "1px solid #ccc" }}>
         <div className="admin-menu__inner flex">
            <div>
               <Link style={{ color: '#515151', fontWeight: "bold", letterSpacing: '1px' }} href={`/admin/${params.userId}`}>Admin Panel</Link>
            </div>
            <div>
               <AdminNav />
            </div>
            <div style={{ marginLeft: 'auto' }}>
               <Link style={{ color: '#515151', fontWeight: "bold", letterSpacing: '1px' }} href={'/'}>Store</Link>
            </div>
         </div>
      </header>
   )
}